import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { ArrowRightIcon, BuildingsIcon, CloudIcon, CpuIcon } from '@phosphor-icons/react';
import { DEPLOY_OPTIONS, PILOT_PATH, type DeployMode } from '../content';
import { BounceIn, Container } from './ui';

// Deployment options band: the same Edge Kit, three places the data can live.
// Canvas visual in the style of the motion bands, driven by the selected option.

const COL = {
  grid: '#181818',
  line: '#313131',
  text: '#ededed',
  muted: '#a1a1a1',
  faint: '#6e6e6e',
  data: '#4cd7f6',
  accent: '#f97316',
  ok: '#4ade80',
};
const MONO = "'Geist Mono', ui-monospace, SFMono-Regular, Menlo, monospace";
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

type Pt = { x: number; y: number };
type Link = { key: string; a: () => Pt; b: () => Pt; lift: () => number; color: string; dots: number; speed: number };

const ICONS: Record<DeployMode, React.ElementType> = { edge: CpuIcon, onprem: BuildingsIcon, cloud: CloudIcon };

function useDeployCanvas(canvasRef: React.RefObject<HTMLCanvasElement | null>, modeRef: React.MutableRefObject<DeployMode>, reduce: boolean) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = false;
    const start = performance.now();
    // Smoothed activity per link and per node, so switching options cross fades.
    const act: Record<string, number> = {};
    const target = (key: string, mode: DeployMode) => {
      switch (key) {
        case 'kit-srv':
        case 'srv-use':
        case 'srv':
          return mode === 'onprem' ? 1 : 0;
        case 'kit-cloud':
        case 'cloud-use':
        case 'cloud':
          return mode === 'cloud' ? 1 : 0;
        default:
          return 1;
      }
    };

    const compact = () => w < 640;
    const X = () => (compact() ? { src: 0.1, kit: 0.37, srv: 0.63, cloud: 0.88 } : { src: 0.13, kit: 0.37, srv: 0.6, cloud: 0.84 });
    const mid = () => h * 0.44;
    const srcY = (i: number) => h * (0.16 + i * 0.13);
    const kit = (): Pt => ({ x: w * X().kit, y: mid() });
    const srv = (): Pt => ({ x: w * X().srv, y: mid() });
    const cloudP = (): Pt => ({ x: w * X().cloud, y: mid() - h * 0.06 });
    const useY = () => h * 0.8;
    const SOURCES = ['Line 1 PLC', 'Line 2 PLC', 'Energy meters', 'Vibration sensors', 'Line 3 PLC'];

    const links: Link[] = [
      ...SOURCES.map((_, i) => ({ key: `src${i}`, a: () => ({ x: w * X().src, y: srcY(i) }), b: kit, lift: () => 0, color: COL.data, dots: 2, speed: 0.32 })),
      { key: 'kit-use', a: kit, b: () => ({ x: kit().x, y: useY() }), lift: () => 0, color: COL.muted, dots: 2, speed: 0.4 },
      { key: 'kit-srv', a: kit, b: srv, lift: () => 0, color: COL.accent, dots: 3, speed: 0.35 },
      { key: 'srv-use', a: srv, b: () => ({ x: srv().x, y: useY() }), lift: () => 0, color: COL.muted, dots: 2, speed: 0.4 },
      { key: 'kit-cloud', a: kit, b: cloudP, lift: () => -h * 0.34, color: COL.accent, dots: 4, speed: 0.3 },
      { key: 'cloud-use', a: cloudP, b: () => ({ x: cloudP().x, y: useY() }), lift: () => 0, color: COL.muted, dots: 2, speed: 0.4 },
    ];

    const quad = (a: Pt, c: Pt, b: Pt, p: number): Pt => {
      const u = 1 - p;
      return { x: u * u * a.x + 2 * u * p * c.x + p * p * b.x, y: u * u * a.y + 2 * u * p * c.y + p * p * b.y };
    };
    const ctrl = (L: Link) => {
      const a = L.a();
      const b = L.b();
      if (L.key.startsWith('src')) return { x: (a.x + b.x) / 2, y: a.y };
      return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 + L.lift() };
    };

    const label = (text: string, sub: string, x: number, y: number, on: number, align: CanvasTextAlign = 'center') => {
      ctx.textAlign = align;
      ctx.textBaseline = 'top';
      ctx.font = `600 12px ${MONO}`;
      ctx.globalAlpha = 0.35 + 0.65 * on;
      ctx.fillStyle = COL.text;
      ctx.fillText(text, x, y);
      if (sub && !compact()) {
        ctx.font = `400 12px ${MONO}`;
        ctx.fillStyle = COL.muted;
        ctx.fillText(sub, x, y + 16);
      }
      ctx.globalAlpha = 1;
    };
    const roundRect = (x: number, y: number, rw: number, rh: number, r: number) => {
      ctx.beginPath();
      ctx.roundRect(x, y, rw, rh, r);
    };
    const dbIcon = (x: number, y: number, s: number, color: string) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.ellipse(x, y - s * 0.5 + i * s * 0.45, s * 0.6, s * 0.2, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
    };

    const draw = (t: number) => {
      const mode = modeRef.current;
      const k = Math.min(1, 0.06 + (reduce ? 1 : 0));
      ['kit-srv', 'srv-use', 'srv', 'kit-cloud', 'cloud-use', 'cloud', 'kit-use'].concat(SOURCES.map((_, i) => `src${i}`)).forEach((key) => {
        const tg = target(key, mode);
        act[key] = act[key] === undefined ? tg : act[key] + (tg - act[key]) * (reduce ? 1 : k * 2);
      });

      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = COL.grid;
      for (let x = 24; x < w; x += 32) for (let y = 24; y < h; y += 32) ctx.fillRect(x, y, 2, 2);

      // Plant boundary
      const bx = w * 0.03;
      const bRight = w * (X().srv + (X().cloud - X().srv) * 0.45);
      ctx.setLineDash([6, 6]);
      ctx.strokeStyle = COL.line;
      ctx.lineWidth = 1.5;
      roundRect(bx, h * 0.05, bRight - bx, h * 0.9, 16);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.font = `600 12px ${MONO}`;
      ctx.fillStyle = COL.faint;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillText('PLANT NETWORK', bx + 12, h * 0.05 + 10);

      // Links
      links.forEach((L) => {
        const a = L.a();
        const b = L.b();
        const c = ctrl(L);
        const on = act[L.key] ?? 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.quadraticCurveTo(c.x, c.y, b.x, b.y);
        ctx.strokeStyle = on > 0.5 ? L.color : COL.line;
        ctx.globalAlpha = 0.25 + 0.5 * on;
        ctx.lineWidth = 1.5;
        if (on < 0.5) ctx.setLineDash([4, 6]);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.globalAlpha = 1;
        if (on > 0.05) {
          for (let i = 0; i < L.dots; i++) {
            const frac = (((t * L.speed) / 1 + i / L.dots) % 1 + 1) % 1;
            const p = quad(a, c, b, easeOut(frac));
            ctx.globalAlpha = on * 0.3;
            ctx.fillStyle = L.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 7, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = on;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
          }
        }
      });

      // Encrypted crossing on the cloud path
      {
        const L = links.find((l) => l.key === 'kit-cloud')!;
        const on = act['kit-cloud'];
        if (on > 0.05) {
          const p = quad(L.a(), ctrl(L), L.b(), 0.72);
          ctx.globalAlpha = on;
          ctx.fillStyle = '#000000';
          ctx.strokeStyle = COL.accent;
          ctx.lineWidth = 1.5;
          const bw = compact() ? 64 : 92;
          roundRect(p.x - bw / 2, p.y - 11, bw, 22, 6);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = COL.accent;
          ctx.font = `600 11px ${MONO}`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(compact() ? 'TLS' : 'ENCRYPTED', p.x, p.y + 1);
          ctx.globalAlpha = 1;
        }
      }

      // Sources
      SOURCES.forEach((name, i) => {
        const x = w * X().src;
        const y = srcY(i);
        ctx.fillStyle = '#181818';
        ctx.strokeStyle = COL.data;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        if (!compact()) {
          ctx.font = `400 12px ${MONO}`;
          ctx.fillStyle = COL.muted;
          ctx.textAlign = 'right';
          ctx.textBaseline = 'middle';
          ctx.fillText(name, x - 14, y);
        }
      });
      if (compact()) label('PLCS', 'meters, sensors', w * X().src, useY(), 1);

      // Edge Kit with its own database (always active)
      {
        const p = kit();
        const s = compact() ? 40 : 52;
        const pulse = reduce ? 0 : 0.5 + 0.5 * Math.sin(t * 2.4);
        ctx.globalAlpha = 0.15 + 0.15 * pulse;
        ctx.fillStyle = COL.accent;
        ctx.beginPath();
        ctx.arc(p.x, p.y, s * 0.95, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#181818';
        ctx.strokeStyle = COL.accent;
        ctx.lineWidth = 2;
        roundRect(p.x - s / 2, p.y - s / 2, s, s, 10);
        ctx.fill();
        ctx.stroke();
        dbIcon(p.x, p.y + 2, s * 0.36, COL.accent);
        label('EDGE KIT', 'local database', p.x, p.y + s / 2 + 10, 1);
      }

      // Plant server
      {
        const p = srv();
        const on = act.srv;
        const sw = compact() ? 30 : 38;
        const sh = compact() ? 40 : 50;
        ctx.globalAlpha = 0.35 + 0.65 * on;
        ctx.fillStyle = '#181818';
        ctx.strokeStyle = on > 0.5 ? COL.accent : COL.line;
        ctx.lineWidth = 2;
        roundRect(p.x - sw / 2, p.y - sh / 2, sw, sh, 6);
        ctx.fill();
        ctx.stroke();
        for (let i = 0; i < 3; i++) {
          ctx.fillStyle = on > 0.5 ? COL.ok : COL.faint;
          ctx.fillRect(p.x - sw / 2 + 6, p.y - sh / 2 + 9 + i * (sh / 3.4), sw - 12, 3);
        }
        ctx.globalAlpha = 1;
        label('PLANT SERVER', 'on premise database', p.x, p.y + sh / 2 + 10, on);
      }

      // Cloud tenant
      {
        const p = cloudP();
        const on = act.cloud;
        const r = compact() ? 13 : 17;
        ctx.globalAlpha = 0.35 + 0.65 * on;
        ctx.fillStyle = '#181818';
        ctx.strokeStyle = on > 0.5 ? COL.accent : COL.line;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(p.x - r, p.y + 4, r * 0.8, Math.PI * 0.5, Math.PI * 1.5);
        ctx.arc(p.x - r * 0.2, p.y - r * 0.5, r, Math.PI, Math.PI * 1.85);
        ctx.arc(p.x + r, p.y + 2, r * 0.9, Math.PI * 1.4, Math.PI * 0.5);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.globalAlpha = 1;
        label('CLOUD', 'your tenant', p.x, p.y + r + 14, on);
      }

      // Consumers
      const consumer = (x: number, name: string, sub: string, key: string) => {
        const on = act[key];
        const y = useY();
        ctx.globalAlpha = 0.35 + 0.65 * on;
        ctx.fillStyle = '#181818';
        ctx.strokeStyle = on > 0.5 ? COL.ok : COL.line;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(x, y, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.globalAlpha = 1;
        label(name, sub, x, y + 14, on);
      };
      consumer(kit().x, compact() ? 'CONSOLE' : 'LAN CONSOLE', 'reports, dashboards', 'kit-use');
      consumer(srv().x, compact() ? 'MES' : 'PLANT DASHBOARDS', 'MES, ERP', 'srv-use');
      consumer(cloudP().x, compact() ? 'BI' : 'POWER BI', 'multi site', 'cloud-use');
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw((performance.now() - start) / 1000);
    };
    const loop = () => {
      draw(reduce ? 2 : (performance.now() - start) / 1000);
      raf = requestAnimationFrame(loop);
    };
    const play = () => {
      if (!raf && visible && !document.hidden) raf = requestAnimationFrame(loop);
    };
    const pause = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) play();
      else pause();
    });
    const ro = new ResizeObserver(resize);
    const onVis = () => (document.hidden ? pause() : play());
    io.observe(canvas);
    ro.observe(canvas);
    document.addEventListener('visibilitychange', onVis);
    resize();
    return () => {
      pause();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [canvasRef, modeRef, reduce]);
}

export const DeployOptions: React.FC = () => {
  const reduce = !!useReducedMotion();
  const [mode, setMode] = useState<DeployMode>('edge');
  const [userPicked, setUserPicked] = useState(false);
  const [paused, setPaused] = useState(false);
  const modeRef = useRef<DeployMode>('edge');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  modeRef.current = mode;
  useDeployCanvas(canvasRef, modeRef, reduce);

  // Cycle through the options like a carousel until someone picks one.
  useEffect(() => {
    if (reduce || userPicked || paused) return;
    const ids = DEPLOY_OPTIONS.map((o) => o.id);
    const timer = window.setInterval(() => setMode((m) => ids[(ids.indexOf(m) + 1) % ids.length]), 4500);
    return () => window.clearInterval(timer);
  }, [reduce, userPicked, paused]);

  const pick = (m: DeployMode) => {
    setUserPicked(true);
    setMode(m);
  };
  const active = DEPLOY_OPTIONS.find((o) => o.id === mode)!;

  return (
    <section id="deployment" aria-labelledby="deployment-heading" className="py-24">
      <Container className="flex flex-col items-center gap-4 pb-12 text-center">
        <BounceIn from="up">
          <h2 id="deployment-heading" className="heading-3 sm:heading-2 uppercase">
            <span className="block text-accent">Edge, on premise</span>
            <span className="block text-fg">or cloud</span>
          </h2>
        </BounceIn>
        <BounceIn from="up" index={1}>
          <p className="body-3 max-w-[680px] text-fg-muted">
            Choose where your data lives. Keep it on the Edge Kit, add a database on your own server, or send it to your
            cloud tenant, and change your mind as you grow. Every reading is stored on the Kit first, whatever you choose.
          </p>
        </BounceIn>
        <BounceIn from="up" index={2}>
          <div role="tablist" aria-label="Where the data lives" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} className="mt-2 grid grid-cols-3 gap-1 rounded-xl border border-line bg-panel p-1">
            {DEPLOY_OPTIONS.map((o) => {
              const Icon = ICONS[o.id];
              const on = o.id === mode;
              return (
                <button
                  key={o.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  aria-controls="deployment-visual"
                  onClick={() => pick(o.id)}
                  className={`flex items-center justify-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 button-sm transition active:scale-[0.98] ${
                    on ? 'bg-accent text-canvas' : 'text-fg-muted hover:bg-panel-2 hover:text-fg'
                  }`}
                >
                  <Icon size={16} aria-hidden="true" />
                  {o.name}
                </button>
              );
            })}
          </div>
        </BounceIn>
      </Container>

      <div id="deployment-visual" role="tabpanel" aria-label={`${active.name}: ${active.tagline}`} className="relative h-96 w-full overflow-hidden border-y border-line bg-canvas lg:h-[480px]">
        <canvas
          ref={canvasRef}
          role="img"
          aria-label={`Data flows from PLCs, meters and sensors into the Edge Kit's local database. ${active.name}: ${active.rows[0][1]}. ${active.rows[1][0]}: ${active.rows[1][1]}.`}
          className="block h-full w-full"
        />
        <span className="pointer-events-none absolute bottom-4 left-4 rounded-md border border-line-strong bg-canvas/80 px-2 py-0.5 caption-4 text-fg-muted backdrop-blur">
          Live visualization · sample data
        </span>
      </div>

      <Container className="flex flex-col gap-12 pt-12">
        <div className="grid gap-4 md:grid-cols-3" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          {DEPLOY_OPTIONS.map((o, i) => {
            const Icon = ICONS[o.id];
            const on = o.id === mode;
            return (
              <BounceIn key={o.id} from="up" index={i} className="h-full">
                <button
                  type="button"
                  onClick={() => pick(o.id)}
                  aria-pressed={on}
                  className={`flex h-full w-full flex-col gap-4 rounded-xl border p-6 text-left transition duration-500 hover:-translate-y-1 active:scale-[0.98] ${
                    on ? 'border-accent bg-panel' : 'border-line bg-panel hover:border-line-strong'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`flex h-10 w-10 items-center justify-center rounded-lg border ${on ? 'border-accent text-accent' : 'border-line-strong text-fg-muted'}`}>
                      <Icon size={20} aria-hidden="true" />
                    </span>
                    <span className="flex flex-col">
                      <span className="title-2 text-fg">{o.name}</span>
                      <span className="caption-5 text-fg-faint">{o.tagline}</span>
                    </span>
                  </div>
                  <dl className="flex flex-col">
                    {o.rows.map(([k, v]) => (
                      <div key={k} className="flex flex-col gap-1 border-t border-line py-2">
                        <dt className="caption-4 text-fg-faint">{k}</dt>
                        <dd className="body-6 text-fg">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </button>
              </BounceIn>
            );
          })}
        </div>

        <div className="flex flex-col gap-6 rounded-2xl border border-line p-6 sm:p-8">
          <div className="flex flex-col gap-2">
            <p className="caption-3 uppercase tracking-widest text-accent">Start small, then scale</p>
            <h3 className="heading-5 text-fg">Prove the value on one line before you invest in more</h3>
          </div>
          <ol className="grid gap-6 md:grid-cols-3">
            {PILOT_PATH.map((s, i) => (
              <li key={s.title} className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <BounceIn index={i} className="w-fit">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line-strong font-mono caption-3 text-accent">{i + 1}</span>
                  </BounceIn>
                  <span className="title-2 text-fg">{s.title}</span>
                  {i < PILOT_PATH.length - 1 && <ArrowRightIcon size={16} className="ml-auto hidden text-fg-faint md:block" aria-hidden="true" />}
                </div>
                <p className="body-6 text-fg-muted">{s.body}</p>
              </li>
            ))}
          </ol>
          <a href="#contact" className="w-fit rounded-lg button-sm text-accent transition-colors hover:text-accent-hover">
            Plan a pilot on one line →
          </a>
        </div>
      </Container>
    </section>
  );
};
