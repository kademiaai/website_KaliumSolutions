import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';
import { ASSETS } from '../content';
import { BounceIn, Container } from './ui';

// Full bleed motion band, modelled on the looping video sections of abvietnam.vn:
// a large two tone heading, then an edge to edge moving picture.
// Pass `video` (a muted mp4 of your own plant) to show footage; otherwise a live canvas visual is drawn.

type Scene = 'signals' | 'telemetry';

const COLORS = {
  grid: '#181818',
  line: '#272727',
  text: '#a1a1a1',
  faint: '#6e6e6e',
  data: '#4cd7f6',
  accent: '#f97316',
  ok: '#4ade80',
  watch: '#fbbf24',
  critical: '#f87171',
};
const MONO = "'Geist Mono', ui-monospace, SFMono-Regular, Menlo, monospace";

// Approximates the site's base curve, cubic-bezier(0.22, 1, 0.36, 1).
const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);

type Draw = (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => void;

// ---------- Scene 1: live vibration traces, one per asset ----------
function makeSignals(): Draw {
  const rows = ASSETS.slice(0, 5);
  const statusColor = { ok: COLORS.data, watch: COLORS.watch, critical: COLORS.critical } as const;
  const statusText = { ok: 'HEALTHY', watch: 'WATCH', critical: 'ACT NOW' } as const;

  return (ctx, w, h, t) => {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, w, h);
    const speed = 70; // px per second
    const shift = (t * speed) % 80;

    ctx.strokeStyle = COLORS.grid;
    ctx.lineWidth = 1;
    for (let x = -shift; x < w; x += 80) {
      ctx.beginPath();
      ctx.moveTo(Math.round(x) + 0.5, 0);
      ctx.lineTo(Math.round(x) + 0.5, h);
      ctx.stroke();
    }

    const rowH = h / rows.length;
    const compact = w < 640;
    rows.forEach((asset, r) => {
      const mid = rowH * r + rowH * 0.58;
      const amp = rowH * (asset.status === 'ok' ? 0.14 : asset.status === 'watch' ? 0.22 : 0.26);
      const color = statusColor[asset.status];

      ctx.strokeStyle = COLORS.line;
      ctx.beginPath();
      ctx.moveTo(0, Math.round(rowH * (r + 1)) + 0.5);
      ctx.lineTo(w, Math.round(rowH * (r + 1)) + 0.5);
      ctx.stroke();

      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.9;
      ctx.beginPath();
      for (let x = 0; x <= w; x += 2) {
        const s = x + t * speed;
        const isVibration = asset.signal === 'Vibration';
        // Temperature and current change slowly; only vibration carries high frequency content.
        let y = isVibration
          ? Math.sin(s * 0.09 + r) * 0.55 + Math.sin(s * 0.023 + r * 2) * 0.3 + Math.sin(s * 0.31 + r * 5) * 0.12
          : Math.sin(s * 0.012 + r) * 0.7 + Math.sin(s * 0.041 + r * 3) * 0.12 + Math.sin(s * 0.17 + r) * 0.04;
        if (isVibration && asset.status !== 'ok') {
          // Periodic impulses with decaying ring: the shape of a bearing defect.
          const period = asset.status === 'critical' ? 90 : 130;
          const phase = ((s % period) + period) % period;
          y += Math.exp(-phase / 9) * Math.sin(phase * 1.4) * (asset.status === 'critical' ? 1.6 : 1.2);
        }
        const py = mid - y * amp;
        if (x === 0) ctx.moveTo(x, py);
        else ctx.lineTo(x, py);
      }
      ctx.stroke();
      ctx.globalAlpha = 1;

      ctx.font = `500 12px ${MONO}`;
      ctx.textBaseline = 'top';
      ctx.fillStyle = COLORS.text;
      const label = compact ? asset.id : `${asset.id}  ${asset.name.toUpperCase()}  ·  ${asset.signal.toUpperCase()}`;
      ctx.fillText(label, 16, rowH * r + 12);
      const status = `${statusText[asset.status]}  ${asset.rulDays} D`;
      const tw = ctx.measureText(status).width;
      ctx.fillStyle = color;
      ctx.fillText(status, w - tw - 16, rowH * r + 12);
    });

    // Scan head at the right edge, like a live recorder.
    ctx.fillStyle = COLORS.accent;
    ctx.globalAlpha = 0.5 + 0.5 * Math.sin(t * 4);
    ctx.fillRect(w - 3, 0, 3, h);
    ctx.globalAlpha = 1;
  };
}

// ---------- Scene 2: edge gateways streaming to a broker and on to consumers ----------
function makeTelemetry(): Draw {
  const gateways = ['gw-l1-01', 'gw-l1-02', 'gw-l2-01', 'gw-l2-02', 'gw-l3-01', 'gw-l3-02'];
  const sinks = ['HISTORIAN', 'ML ENGINE', 'DASHBOARDS'];
  type Packet = { from: number; to: number; born: number; leg: 0 | 1; color: string };
  let packets: Packet[] = [];
  let lastSpawn = 0;
  let hubPulse = -10;

  const quad = (ax: number, ay: number, cx: number, cy: number, bx: number, by: number, p: number) => {
    const u = 1 - p;
    return [u * u * ax + 2 * u * p * cx + p * p * bx, u * u * ay + 2 * u * p * cy + p * p * by];
  };

  return (ctx, w, h, t) => {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, w, h);
    const compact = w < 640;
    const left = compact ? 40 : w * 0.14;
    const right = compact ? w - 40 : w * 0.86;
    const hub = { x: w * 0.5, y: h * 0.5 };
    const gw = gateways.map((_, i) => ({ x: left, y: (h / (gateways.length + 1)) * (i + 1) }));
    const sk = sinks.map((_, i) => ({ x: right, y: (h / (sinks.length + 1)) * (i + 1) }));
    const ctrl = (a: { x: number; y: number }, b: { x: number; y: number }) => ({ x: (a.x + b.x) / 2, y: a.y });

    // Dot grid
    ctx.fillStyle = COLORS.grid;
    for (let x = 24; x < w; x += 32) for (let y = 24; y < h; y += 32) ctx.fillRect(x, y, 2, 2);

    // Links
    ctx.strokeStyle = COLORS.line;
    ctx.lineWidth = 1.5;
    [...gw.map((g) => [g, hub] as const), ...sk.map((s) => [hub, s] as const)].forEach(([a, b]) => {
      const c = ctrl(a, b);
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.quadraticCurveTo(c.x, c.y, b.x, b.y);
      ctx.stroke();
    });

    // Spawn packets
    if (t - lastSpawn > 0.16) {
      lastSpawn = t;
      const fault = Math.random() < 0.12;
      packets.push({
        from: Math.floor(Math.random() * gw.length),
        to: fault ? 1 : Math.floor(Math.random() * sk.length),
        born: t,
        leg: 0,
        color: fault ? COLORS.accent : COLORS.data,
      });
    }

    const LEG = 1.3;
    packets = packets.filter((pk) => {
      const age = t - pk.born;
      const p = Math.min(age / LEG, 1);
      if (pk.leg === 0 && p >= 1) {
        pk.leg = 1;
        pk.born = t;
        hubPulse = t;
        return true;
      }
      if (pk.leg === 1 && p >= 1) return false;
      const a = pk.leg === 0 ? gw[pk.from] : hub;
      const b = pk.leg === 0 ? hub : sk[pk.to];
      const c = ctrl(a, b);
      const [x, y] = quad(a.x, a.y, c.x, c.y, b.x, b.y, easeOut(p));
      ctx.fillStyle = pk.color;
      ctx.globalAlpha = 0.25;
      ctx.beginPath();
      ctx.arc(x, y, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
      return true;
    });

    // Nodes
    const node = (x: number, y: number, r: number, stroke: string) => {
      ctx.fillStyle = '#181818';
      ctx.strokeStyle = stroke;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    };
    gw.forEach((g) => node(g.x, g.y, 6, COLORS.data));
    sk.forEach((s) => node(s.x, s.y, 7, COLORS.ok));
    const pulse = Math.max(0, 1 - (t - hubPulse) / 0.6);
    ctx.globalAlpha = 0.35 * pulse;
    ctx.fillStyle = COLORS.accent;
    ctx.beginPath();
    ctx.arc(hub.x, hub.y, 18 + 10 * (1 - pulse), 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
    node(hub.x, hub.y, 12, COLORS.accent);

    // Labels
    ctx.font = `500 12px ${MONO}`;
    ctx.textBaseline = 'middle';
    if (!compact) {
      ctx.fillStyle = COLORS.text;
      gw.forEach((g, i) => {
        const tw = ctx.measureText(gateways[i]).width;
        ctx.fillText(gateways[i], g.x - tw - 16, g.y);
      });
      sk.forEach((s, i) => ctx.fillText(sinks[i], s.x + 16, s.y));
    }
    ctx.fillStyle = COLORS.accent;
    const hubLabel = 'MQTT BROKER · SPARKPLUG B';
    const hw = ctx.measureText(hubLabel).width;
    ctx.fillText(hubLabel, hub.x - hw / 2, hub.y + 40);
  };
}

const CanvasScene: React.FC<{ scene: Scene; label: string }> = ({ scene, label }) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const draw = scene === 'signals' ? makeSignals() : makeTelemetry();
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = false;
    let start = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduce || !visible) draw(ctx, w, h, reduce ? 3 : (performance.now() - start) / 1000);
    };

    const loop = (now: number) => {
      draw(ctx, w, h, (now - start) / 1000);
      raf = requestAnimationFrame(loop);
    };
    const play = () => {
      if (reduce || raf || document.hidden) return;
      raf = requestAnimationFrame(loop);
    };
    const pause = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    // Run only while on screen and the tab is visible.
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) play();
      else pause();
    });
    const ro = new ResizeObserver(resize);
    const onVis = () => (document.hidden ? pause() : visible && play());
    io.observe(canvas);
    ro.observe(canvas);
    document.addEventListener('visibilitychange', onVis);
    resize();
    if (reduce) {
      // Static frame: run the scene forward so packets and traces are populated.
      for (let i = 0; i <= 60; i++) draw(ctx, w, h, i * 0.05);
    }
    return () => {
      pause();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [scene, reduce]);

  return <canvas ref={ref} role="img" aria-label={label} className="block h-full w-full" />;
};

export const MotionBand: React.FC<{
  id?: string;
  accent: string;
  title: string;
  caption: string;
  scene: Scene;
  sceneLabel: string;
  video?: string;
  poster?: string;
}> = ({ id, accent, title, caption, scene, sceneLabel, video, poster }) => (
  <section id={id} aria-label={`${accent} ${title}`} className="py-24">
    <Container className="flex flex-col items-center gap-4 pb-12 text-center">
      <BounceIn from="up">
        <h2 className="heading-3 sm:heading-2 uppercase">
          <span className="block text-accent">{accent}</span>
          <span className="block text-fg">{title}</span>
        </h2>
      </BounceIn>
      <BounceIn from="up" index={1}>
        <p className="body-3 max-w-[680px] text-fg-muted">{caption}</p>
      </BounceIn>
    </Container>
    <div className="relative h-96 w-full overflow-hidden border-y border-line bg-canvas lg:h-[480px]">
      {video ? (
        <video
          className="h-full w-full object-cover"
          src={video}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          aria-label={sceneLabel}
        />
      ) : (
        <CanvasScene scene={scene} label={sceneLabel} />
      )}
      <span className="pointer-events-none absolute bottom-4 left-4 rounded-md border border-line-strong bg-canvas/80 px-2 py-0.5 caption-4 text-fg-muted backdrop-blur">
        {video ? 'Plant footage' : 'Live visualization · sample data'}
      </span>
    </div>
  </section>
);
