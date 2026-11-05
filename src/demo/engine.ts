// Shared 3D engine for the product demo scenes.
// Ported from the Kademia KAD-IIoT twin artifacts and restyled to the Kalium site palette.
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DObject, CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

export { THREE };

// Site palette as 3D colors.
export const PAL = {
  bg: 0x000000,
  floor: 0x181818,
  grid: 0x272727,
  gridMajor: 0x313131,
  graphite: 0x1f1f1f,
  dark: 0x2a2a2a,
  steel: 0x6b7280,
  steelLight: 0x9ca3af,
  stainless: 0xc4c7cc,
  white: 0xededed,
  accent: 0xf97316,
  accentSoft: 0xffb690,
  data: 0x4cd7f6,
  ok: 0x4ade80,
  watch: 0xfbbf24,
  critical: 0xf87171,
};

export const GROUP_COLORS: Record<string, string> = {
  'Process line': '#c4c7cc',
  'Utility supply': '#9ca3af',
  'Utility meter': '#4cd7f6',
  'OT network': '#4cd7f6',
  'Edge Kit': '#f97316',
  'Factory LAN': '#a1a1a1',
  'Fleet operations': '#ffb690',
  'Simulation bench': '#4ade80',
  'Edge Kit hardware': '#a99cec',
  'Kit software · system': '#a99cec',
  'Kit software · data path': '#18c9d4',
  'Kit software · access': '#6c5ce7',
  'Kit software · fleet': '#4a37cc',
};

export interface ElementInfo {
  id: string;
  name: string;
  sub?: string;
  group: string;
  desc: string;
  rows: [string, string][];
  note?: string;
}

export interface AddOptions {
  layer?: string;
  labelY?: number;
  labelAt?: THREE.Vector3;
  pick?: boolean;
  key?: boolean;
  zone?: boolean;
  shadow?: boolean;
}

export interface Flow {
  curve: THREE.Curve<THREE.Vector3>;
  tube: THREE.Mesh;
  material: THREE.MeshStandardMaterial;
  dots: THREE.Mesh[];
  speed: number;
  paused: boolean;
}

export interface FlowConfig {
  points?: THREE.Vector3[];
  curve?: THREE.Curve<THREE.Vector3>;
  color: number;
  dotColor?: number;
  radius?: number;
  speed?: number;
  dots?: number;
  glow?: boolean;
  layer?: string;
  opacity?: number;
}

export interface StageOptions {
  home: { target: THREE.Vector3; dir: THREE.Vector3; dist: number };
  minDistance?: number;
  maxDistance?: number;
  maxPolar?: number;
  fog?: [number, number];
  // Per scene look, so a scene can keep the colors of the artifact it was ported from.
  theme?: { bg: number; floor: number; gridMajor: number; grid: number; gridSize?: number; gridDiv?: number; gridOpacity?: number };
  lights?: 'site' | 'artifact';
  // three.js r147 (used by the artifacts) treated hex colors as linear; true reproduces that look.
  legacyColors?: boolean;
  fov?: number;
  startPos?: THREE.Vector3;
  floor?: { w: number; d: number; round?: boolean };
  onSelect?: (info: ElementInfo | null) => void;
  reducedMotion?: boolean;
  autoRotate?: boolean;
}

interface Entry {
  info: ElementInfo;
  opts: AddOptions;
  obj: THREE.Object3D;
  label: CSS2DObject;
  chip: HTMLDivElement;
  subEl: HTMLSpanElement | null;
  mats: THREE.MeshStandardMaterial[];
}

export const mat = (color: number, o: THREE.MeshStandardMaterialParameters = {}) =>
  new THREE.MeshStandardMaterial({ color, roughness: 0.5, metalness: 0.2, ...o });
export const glowMat = (color: number, intensity = 1.2) =>
  new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: intensity, roughness: 0.4 });

export function box(w: number, h: number, d: number, m: THREE.Material, x = 0, y = 0, z = 0, parent?: THREE.Object3D) {
  const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
  b.position.set(x, y, z);
  b.castShadow = true;
  b.receiveShadow = true;
  parent?.add(b);
  return b;
}
export function cyl(rt: number, rb: number, h: number, m: THREE.Material, x = 0, y = 0, z = 0, parent?: THREE.Object3D, seg = 32) {
  const c = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), m);
  c.position.set(x, y, z);
  c.castShadow = true;
  c.receiveShadow = true;
  parent?.add(c);
  return c;
}
export function dome(r: number, m: THREE.Material) {
  return new THREE.Mesh(new THREE.SphereGeometry(r, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), m);
}
export function group(x = 0, y = 0, z = 0) {
  const g = new THREE.Group();
  g.position.set(x, y, z);
  return g;
}
export function polyCurve(pts: THREE.Vector3[]) {
  const path = new THREE.CurvePath<THREE.Vector3>();
  for (let i = 0; i < pts.length - 1; i++) path.add(new THREE.LineCurve3(pts[i], pts[i + 1]));
  return path;
}

// Text drawn onto a canvas texture, for screens and name plates inside the scene.
export function screenTexture(lines: [string, string][], w = 512, h = 300, bg = '#0a0a0a') {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const g = c.getContext('2d')!;
  g.fillStyle = bg;
  g.fillRect(0, 0, w, h);
  g.font = "500 22px 'Geist Mono', ui-monospace, monospace";
  lines.forEach(([text, color], i) => {
    g.fillStyle = color;
    g.fillText(text, 20, 44 + i * 36);
  });
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}
export function plateTexture(text: string, fg = '#000000', bg = '#f97316') {
  const c = document.createElement('canvas');
  c.width = 256;
  c.height = 64;
  const g = c.getContext('2d')!;
  g.fillStyle = bg;
  g.fillRect(0, 0, 256, 64);
  g.fillStyle = fg;
  g.font = "600 30px 'Geist', ui-sans-serif, sans-serif";
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText(text, 128, 34);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export function createStage(host: HTMLElement, opts: StageOptions) {
  const reduce = !!opts.reducedMotion;
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.domElement.style.display = 'block';
  renderer.domElement.style.touchAction = 'pan-y';
  host.appendChild(renderer.domElement);

  const labelRenderer = new CSS2DRenderer();
  labelRenderer.domElement.className = 'twin-labels';
  host.appendChild(labelRenderer.domElement);

  const scene = new THREE.Scene();
  const theme = opts.theme ?? { bg: PAL.bg, floor: PAL.floor, gridMajor: PAL.gridMajor, grid: PAL.grid };
  const col = (hex: number) => (opts.legacyColors ? new THREE.Color().setHex(hex, THREE.LinearSRGBColorSpace) : new THREE.Color(hex));
  scene.background = col(theme.bg);
  const [fogNear, fogFar] = opts.fog ?? [200, 420];
  scene.fog = new THREE.Fog(col(theme.bg), fogNear, fogFar);

  const camera = new THREE.PerspectiveCamera(opts.fov ?? 42, 1, 0.1, 800);
  const homePos = () => opts.home.target.clone().add(opts.home.dir.clone().normalize().multiplyScalar(opts.home.dist * aspectBoost()));
  let aspect = 1;
  const aspectBoost = () => (aspect < 0.8 ? 1.7 : aspect < 1.3 ? 1.25 : 1);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.minDistance = opts.minDistance ?? 6;
  controls.maxDistance = opts.maxDistance ?? 260;
  controls.maxPolarAngle = opts.maxPolar ?? Math.PI * 0.49;
  controls.autoRotateSpeed = 0.6;
  controls.autoRotate = !!opts.autoRotate && !reduce;
  // Wheel zoom only after the visitor clicks into the viewer, so the page keeps scrolling.
  controls.enableZoom = false;
  controls.target.copy(opts.home.target);

  // Lights
  if (opts.lights === 'artifact') {
    // Same rig as the KAD-IIoT bench artifacts.
    // Intensities times PI: r155+ dropped the legacy light units the artifacts were tuned for.
    scene.add(new THREE.HemisphereLight(col(0xdcd8ff), col(0x2a2660), 0.85 * Math.PI));
    const key = new THREE.DirectionalLight(0xffffff, 0.9 * Math.PI);
    key.position.set(8, 16, 10);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    Object.assign(key.shadow.camera, { left: -18, right: 18, top: 18, bottom: -18, near: 1, far: 50 });
    scene.add(key);
  } else {
  scene.add(new THREE.HemisphereLight(0xffffff, 0x1a1a1a, 0.7));
  const sun = new THREE.DirectionalLight(0xffffff, 1.1);
  sun.position.set(-30, 60, 35);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, { left: -90, right: 90, top: 70, bottom: -70, near: 1, far: 220 });
  sun.shadow.bias = -0.0005;
  scene.add(sun);
  const rim = new THREE.DirectionalLight(PAL.accentSoft, 0.35);
  rim.position.set(40, 20, -40);
  scene.add(rim);
  }

  // Floor
  if (opts.floor) {
    const { w, d, round } = opts.floor;
    const floorMat = new THREE.MeshStandardMaterial({ color: col(theme.floor), roughness: 0.95 });
    const floor = round
      ? new THREE.Mesh(new THREE.CircleGeometry(w / 2, 72), floorMat)
      : new THREE.Mesh(new THREE.BoxGeometry(w, 1.2, d), floorMat);
    if (round) floor.rotation.x = -Math.PI / 2;
    else floor.position.y = -0.6;
    floor.receiveShadow = true;
    scene.add(floor);
    const grid = new THREE.GridHelper(theme.gridSize ?? w, theme.gridDiv ?? Math.round(w / 2), col(theme.gridMajor), col(theme.grid));
    if (theme.gridOpacity !== undefined) {
      (grid.material as THREE.Material).transparent = true;
      (grid.material as THREE.Material).opacity = theme.gridOpacity;
    }
    if (!round) grid.scale.z = d / w;
    grid.position.y = 0.01;
    scene.add(grid);
  }

  // ---------- Element registry ----------
  const entries: Record<string, Entry> = {};
  const pickables: THREE.Object3D[] = [];
  const layers: Record<string, THREE.Object3D[]> = {};
  const layerOn: Record<string, boolean> = {};
  const toLayer = (name: string | undefined, ...objs: THREE.Object3D[]) => {
    const n = name ?? 'base';
    (layers[n] ??= []).push(...objs);
    if (layerOn[n] === undefined) layerOn[n] = true;
  };

  function makeLabel(info: ElementInfo, opts2: AddOptions) {
    const anchor = document.createElement('div');
    anchor.className = 'twin-anchor';
    const chip = document.createElement('div');
    chip.className = 'twin-chip' + (opts2.zone ? ' is-zone' : '');
    chip.tabIndex = opts2.zone ? -1 : 0;
    chip.setAttribute('role', 'button');
    chip.setAttribute('aria-label', info.name);
    const color = GROUP_COLORS[info.group] ?? '#a1a1a1';
    const dot = opts2.zone ? '' : `<span class="twin-dot" style="background:${color}"></span>`;
    chip.innerHTML = `${dot}<span><span class="twin-name"></span><span class="twin-sub"></span></span>`;
    chip.querySelector('.twin-name')!.textContent = info.name;
    const subEl = chip.querySelector('.twin-sub') as HTMLSpanElement;
    if (info.sub) subEl.textContent = info.sub;
    else subEl.remove();
    if (!opts2.zone) {
      chip.addEventListener('click', (e) => {
        e.stopPropagation();
        select(info.id, true);
      });
      chip.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          select(info.id, true);
        }
      });
      chip.addEventListener('pointerenter', () => hover(info.id));
      chip.addEventListener('pointerleave', () => hover(null));
    }
    anchor.appendChild(chip);
    return { label: new CSS2DObject(anchor), chip, subEl: info.sub ? subEl : null };
  }

  function add(obj: THREE.Object3D, info: ElementInfo, o: AddOptions = {}) {
    const mats: THREE.MeshStandardMaterial[] = [];
    obj.traverse((m) => {
      const mesh = m as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = o.shadow !== false;
        mesh.receiveShadow = true;
        mesh.userData.elId = info.id;
        if (o.pick !== false && !o.zone) pickables.push(mesh);
        const mm = mesh.material as THREE.MeshStandardMaterial;
        if (mm && (mm as THREE.MeshStandardMaterial).emissive && !mats.includes(mm)) mats.push(mm);
      }
    });
    scene.add(obj);
    const { label, chip, subEl } = makeLabel(info, o);
    label.position.copy(o.labelAt ?? new THREE.Vector3(0, o.labelY ?? 3, 0));
    obj.add(label);
    entries[info.id] = { info, opts: o, obj, label, chip, subEl, mats };
    toLayer(o.layer, obj);
    return obj;
  }

  // ---------- Flows: tubes with travelling dots ----------
  const flows: Flow[] = [];
  function flow(cfg: FlowConfig): Flow {
    const curve = cfg.curve ?? polyCurve(cfg.points!);
    const len = curve.getLength();
    const r = cfg.radius ?? 0.08;
    const material = new THREE.MeshStandardMaterial({
      color: cfg.color,
      roughness: 0.4,
      metalness: 0.1,
      transparent: cfg.opacity !== undefined,
      opacity: cfg.opacity ?? 1,
      emissive: cfg.glow ? cfg.color : 0x000000,
      emissiveIntensity: cfg.glow ? 0.35 : 0,
    });
    const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, Math.max(24, Math.round(len * 3)), r, 10, false), material);
    tube.castShadow = r > 0.2;
    tube.receiveShadow = true;
    scene.add(tube);
    const n = cfg.dots ?? Math.max(3, Math.round(len / 4));
    const dmat = new THREE.MeshBasicMaterial({ color: cfg.dotColor ?? cfg.color });
    const dgeo = new THREE.SphereGeometry(r * 1.9 + 0.06, 12, 8);
    const dots: THREE.Mesh[] = [];
    for (let i = 0; i < n; i++) {
      const d = new THREE.Mesh(dgeo, dmat);
      d.userData.t = i / n;
      curve.getPointAt(d.userData.t, d.position);
      scene.add(d);
      dots.push(d);
    }
    const f: Flow = { curve, tube, material, dots, speed: cfg.speed ?? 0.08, paused: false };
    flows.push(f);
    toLayer(cfg.layer, tube, ...dots);
    return f;
  }

  // ---------- Hover, select, fly ----------
  let hovered: string | null = null;
  let selected: string | null = null;
  // Materials are never tinted on hover or select: on near black surfaces any emissive tint reads as brown.
  // The label outline and the detail card show the selection instead.
  const setGlow = (id: string, on: boolean, strength: number) => {
    entries[id]?.mats.forEach((m) => {
      if (m.userData.baseE === undefined) {
        m.userData.baseE = m.emissiveIntensity;
        m.userData.baseC = m.emissive.getHex();
      }
      if (on) {
        m.emissive.setHex(PAL.accent);
        m.emissiveIntensity = strength;
      } else {
        m.emissive.setHex(m.userData.baseC);
        m.emissiveIntensity = m.userData.baseE;
      }
    });
  };
  function hover(id: string | null) {
    if (hovered === id) return;
    if (hovered && hovered !== selected) {
      setGlow(hovered, false, 0);
      entries[hovered]?.chip.classList.remove('is-hot');
    }
    hovered = id;
    if (id && id !== selected) {
      entries[id]?.chip.classList.add('is-hot');
    }
    renderer.domElement.style.cursor = id ? 'pointer' : 'grab';
  }

  let tween: { t: number; dur: number; fromP: THREE.Vector3; toP: THREE.Vector3; fromT: THREE.Vector3; toT: THREE.Vector3 } | null = null;
  function flyTo(pos: THREE.Vector3, target: THREE.Vector3, dur = 0.9) {
    if (reduce) {
      camera.position.copy(pos);
      controls.target.copy(target);
      controls.update();
      return;
    }
    tween = { t: 0, dur, fromP: camera.position.clone(), toP: pos, fromT: controls.target.clone(), toT: target };
  }
  function flyToObject(obj: THREE.Object3D) {
    const b = new THREE.Box3().setFromObject(obj);
    const center = b.getCenter(new THREE.Vector3());
    const size = b.getSize(new THREE.Vector3()).length();
    const d = THREE.MathUtils.clamp(size * 2.4, (controls.minDistance || 6) + 2, 45);
    const dir = camera.position.clone().sub(controls.target).normalize();
    if (dir.y < 0.35) {
      dir.y = 0.35;
      dir.normalize();
    }
    flyTo(center.clone().add(dir.multiplyScalar(d)), center);
  }

  // Scenes can react to selection; a hook returning true takes over the camera move.
  const selectHooks: ((id: string | null) => boolean | void)[] = [];
  function select(id: string | null, fly = false) {
    if (selected) {
      setGlow(selected, false, 0);
      entries[selected]?.chip.classList.remove('is-sel');
    }
    selected = id;
    if (!id || !entries[id]) {
      opts.onSelect?.(null);
      selectHooks.forEach((h) => h(null));
      return;
    }
    const e = entries[id];
    e.chip.classList.add('is-sel');
    opts.onSelect?.(e.info);
    const handled = selectHooks.map((h) => h(id)).some((r) => r === true);
    if (fly && !handled) flyToObject(e.obj);
  }

  function reset() {
    select(null);
    flyTo(homePos(), opts.home.target.clone(), 1.1);
  }

  // ---------- Picking (drags ignored) ----------
  const raycaster = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  const isShown = (o: THREE.Object3D | null) => {
    let p: THREE.Object3D | null = o;
    while (p) {
      if (!p.visible) return false;
      p = p.parent;
    }
    return true;
  };
  const pick = (ev: PointerEvent) => {
    const r = renderer.domElement.getBoundingClientRect();
    ndc.set(((ev.clientX - r.left) / r.width) * 2 - 1, -((ev.clientY - r.top) / r.height) * 2 + 1);
    raycaster.setFromCamera(ndc, camera);
    const hit = raycaster.intersectObjects(pickables.filter(isShown), false)[0];
    return hit ? (hit.object.userData.elId as string) : null;
  };
  let down: { x: number; y: number } | null = null;
  const onDown = (e: PointerEvent) => {
    down = { x: e.clientX, y: e.clientY };
    tween = null;
  };
  const onMove = (e: PointerEvent) => {
    if (e.pointerType === 'mouse') hover(pick(e));
  };
  const onUp = (e: PointerEvent) => {
    if (!down || Math.hypot(e.clientX - down.x, e.clientY - down.y) > 5) return;
    down = null;
    const id = pick(e);
    select(id, !!id);
  };
  renderer.domElement.addEventListener('pointerdown', onDown);
  renderer.domElement.addEventListener('pointermove', onMove);
  renderer.domElement.addEventListener('pointerup', onUp);
  controls.addEventListener('start', () => {
    tween = null;
  });

  // ---------- Layers, labels, alarms ----------
  function setLayer(name: string, on: boolean) {
    layerOn[name] = on;
    (layers[name] ?? []).forEach((o) => {
      o.visible = on;
      o.children.forEach((c) => {
        if (c instanceof CSS2DObject) c.visible = on;
      });
    });
    if (selected && !isShown(entries[selected]?.obj)) select(null);
  }
  const setSub = (id: string, text: string) => {
    const s = entries[id]?.subEl;
    if (s) s.textContent = text;
  };
  const setAlarm = (id: string, on: boolean) => entries[id]?.chip.classList.toggle('is-alarm', on);

  // ---------- Label declutter: overlapping labels fade, nearer and key ones win ----------
  let lastDeclutter = 0;
  const wp = new THREE.Vector3();
  function declutter(now: number) {
    if (now - lastDeclutter < 200) return;
    lastDeclutter = now;
    const items: { e: Entry; d: number }[] = [];
    for (const id in entries) {
      const e = entries[id];
      if (!isShown(e.obj)) continue;
      e.label.getWorldPosition(wp);
      const d = wp.distanceTo(camera.position);
      e.chip.classList.toggle('is-far', d > (opts.home.dist * 0.45) && !e.opts.zone);
      items.push({ e, d });
    }
    const rank = (e: Entry) => (e.info.id === selected ? 0 : e.opts.key ? 1 : 2);
    items.sort((a, b) => rank(a.e) - rank(b.e) || a.d - b.d);
    const placed: DOMRect[] = [];
    for (const it of items) {
      const r = it.e.chip.getBoundingClientRect();
      const hit = placed.some((p) => r.left < p.right - 2 && r.right > p.left + 2 && r.top < p.bottom - 2 && r.bottom > p.top + 2);
      it.e.chip.classList.toggle('is-dim', hit && it.e.info.id !== selected);
      if (!hit) placed.push(r);
    }
  }

  // ---------- Resize ----------
  function resize() {
    const w = host.clientWidth;
    const h = host.clientHeight;
    if (!w || !h) return;
    aspect = w / h;
    renderer.setSize(w, h);
    labelRenderer.setSize(w, h);
    camera.aspect = aspect;
    camera.updateProjectionMatrix();
  }
  const ro = new ResizeObserver(resize);
  ro.observe(host);
  resize();
  camera.position.copy(homePos());
  controls.update();

  // ---------- Loop: only while visible ----------
  const tickers: ((dt: number, t: number) => void)[] = [];
  const clock = new THREE.Clock();
  const tmp = new THREE.Vector3();
  let raf = 0;
  let visible = true;
  function frame() {
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.elapsedTime;
    if (tween) {
      tween.t += dt / tween.dur;
      const k = easeInOut(Math.min(tween.t, 1));
      camera.position.lerpVectors(tween.fromP, tween.toP, k);
      controls.target.lerpVectors(tween.fromT, tween.toT, k);
      if (tween.t >= 1) tween = null;
    }
    if (!reduce) {
      for (const f of flows) {
        if (f.paused) continue;
        const step = dt * f.speed * (20 / Math.max(f.curve.getLength(), 8));
        for (const d of f.dots) {
          d.userData.t = (d.userData.t + step) % 1;
          f.curve.getPointAt(d.userData.t, tmp);
          d.position.copy(tmp);
        }
      }
    }
    tickers.forEach((fn) => fn(dt, t));
    controls.update();
    declutter(performance.now());
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  }
  const play = () => {
    if (!raf && visible && !document.hidden) {
      clock.getDelta();
      raf = requestAnimationFrame(frame);
    }
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
  io.observe(host);
  const onVis = () => (document.hidden ? pause() : play());
  document.addEventListener('visibilitychange', onVis);

  // Intro: settle from a wider shot onto the home view.
  const home = homePos();
  if (opts.startPos && !reduce) {
    camera.position.copy(opts.startPos);
    controls.update();
    flyTo(home, opts.home.target.clone(), 1.8);
  } else if (!reduce) {
    camera.position.copy(home.clone().sub(opts.home.target).multiplyScalar(1.4).add(opts.home.target));
    flyTo(home, opts.home.target.clone(), 1.8);
  }
  play();

  function dispose() {
    pause();
    io.disconnect();
    ro.disconnect();
    document.removeEventListener('visibilitychange', onVis);
    renderer.domElement.removeEventListener('pointerdown', onDown);
    renderer.domElement.removeEventListener('pointermove', onMove);
    renderer.domElement.removeEventListener('pointerup', onUp);
    controls.dispose();
    scene.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.geometry) m.geometry.dispose();
      const mm = m.material as THREE.Material | THREE.Material[] | undefined;
      if (Array.isArray(mm)) mm.forEach((x) => x.dispose());
      else if (mm) {
        const map = (mm as THREE.MeshBasicMaterial).map;
        map?.dispose();
        mm.dispose();
      }
    });
    renderer.dispose();
    renderer.domElement.remove();
    labelRenderer.domElement.remove();
  }

  return {
    scene,
    camera,
    controls,
    add,
    flow,
    select,
    reset,
    setLayer,
    setSub,
    setAlarm,
    entries,
    onTick: (fn: (dt: number, t: number) => void) => tickers.push(fn),
    onSelectChange: (fn: (id: string | null) => boolean | void) => selectHooks.push(fn),
    setAutoRotate: (on: boolean) => {
      controls.autoRotate = on && !reduce;
    },
    flyTo: (pos: THREE.Vector3, target: THREE.Vector3, dur?: number) => flyTo(pos, target, dur),
    // Distance that fits a sphere of radius r in view, as in the artifacts' distFor().
    distFor: (r: number) => {
      const t = Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2);
      return (r * 1.1) / Math.min(t, t * camera.aspect) + 4.5;
    },
    setZoom: (on: boolean) => {
      controls.enableZoom = on;
    },
    zoomBy: (factor: number) => {
      const dir = camera.position.clone().sub(controls.target);
      const len = THREE.MathUtils.clamp(dir.length() * factor, controls.minDistance, controls.maxDistance);
      flyTo(controls.target.clone().add(dir.setLength(len)), controls.target.clone(), 0.4);
    },
    dispose,
    reduce,
  };
}

export type Stage = ReturnType<typeof createStage>;
