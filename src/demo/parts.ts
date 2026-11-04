// Reusable 3D models shared by the demo scenes.
import { THREE, PAL, box, cyl, group, mat, glowMat, screenTexture, plateTexture } from './engine';

// Edge Kit: fanless industrial PC with heatsink fins, front ports and a status LED.
// `scale` 1 matches the bench scenes; the Kit showcase uses a larger scale.
export function edgeKit(x: number, y: number, z: number, scale = 1, label = 'KALIUM') {
  const g = group(x, y, z);
  g.scale.setScalar(scale);
  const body = mat(PAL.graphite, { metalness: 0.65, roughness: 0.32 });
  box(1.4, 0.95, 0.85, body, 0, 0, 0, g);
  // fins on top
  for (let i = 0; i < 10; i++) box(0.05, 0.2, 0.83, mat(PAL.dark, { metalness: 0.7, roughness: 0.3 }), -0.6 + i * 0.133, 0.57, 0, g);
  // front name plate
  const plate = new THREE.Mesh(new THREE.PlaneGeometry(0.62, 0.15), new THREE.MeshBasicMaterial({ map: plateTexture(label) }));
  plate.position.set(-0.28, 0.24, 0.426);
  g.add(plate);
  // front ports, left to right: power, uplink, OT, USB, USB
  const leds = {
    power: box(0.12, 0.1, 0.04, glowMat(PAL.ok, 1.4), -0.5, -0.25, 0.43, g),
    uplink: box(0.16, 0.12, 0.04, mat(PAL.dark), -0.2, -0.25, 0.43, g),
    ot: box(0.16, 0.12, 0.04, glowMat(PAL.data, 0.6), 0.05, -0.25, 0.43, g),
    usb1: box(0.1, 0.05, 0.04, mat(0x111111), 0.35, -0.23, 0.43, g),
    usb2: box(0.1, 0.05, 0.04, mat(0x111111), 0.5, -0.23, 0.43, g),
    status: box(0.2, 0.05, 0.04, glowMat(PAL.accent, 1.6), 0.45, 0.28, 0.43, g),
  };
  return { g, leds };
}

// DIN rail mounting plate the Kit and panel parts sit on.
export function mountingPlate(w: number, h: number, parent: THREE.Object3D, y: number, z: number) {
  box(w, h, 0.08, mat(0x3a3a3a, { metalness: 0.2, roughness: 0.8 }), 0, y, z, parent);
}

// Managed OT switch on a small stand.
export function otSwitch(x: number, z: number, ports = 5, activePorts = 2) {
  const g = group(x, 0, z);
  box(0.25, 0.5, 0.25, mat(PAL.dark), 0, 0.25, 0, g);
  box(1.2, 0.2, 0.5, mat(0x26323a, { metalness: 0.4 }), 0, 0.6, 0, g);
  for (let i = 0; i < ports; i++) box(0.09, 0.06, 0.02, i < activePorts ? glowMat(PAL.data) : mat(0x111111), -0.4 + i * 0.2, 0.6, 0.26, g);
  return g;
}

// Laptop on a bench running the PLC simulators.
export function simulatorBench(x: number, z: number, lines: [string, string][]) {
  const g = group(x, 0, z);
  box(1.6, 0.06, 1.0, mat(0x3a3a3a, { roughness: 0.8 }), 0, 0.7, 0, g);
  [
    [-0.7, -0.4],
    [0.7, -0.4],
    [-0.7, 0.4],
    [0.7, 0.4],
  ].forEach(([lx, lz]) => box(0.05, 0.7, 0.05, mat(PAL.dark), lx, 0.35, lz, g));
  box(1.0, 0.04, 0.65, mat(PAL.graphite), 0, 0.75, 0.05, g);
  const lid = new THREE.Group();
  lid.position.set(0, 0.77, -0.27);
  lid.rotation.x = -0.25;
  g.add(lid);
  box(1.0, 0.62, 0.03, mat(PAL.graphite), 0, 0.31, 0, lid);
  const screenMat = new THREE.MeshBasicMaterial({ map: screenTexture(lines) });
  const scr = new THREE.Mesh(new THREE.PlaneGeometry(0.92, 0.54), screenMat);
  scr.position.set(0, 0.31, 0.017);
  lid.add(scr);
  return { g, screenMat };
}

// Server rack with front LEDs.
export function serverRack(x: number, z: number, h = 3.1) {
  const g = group(x, 0, z);
  box(1.5, h, 1.1, mat(PAL.graphite, { metalness: 0.45 }), 0, h / 2, 0, g);
  const n = Math.floor((h - 0.4) / 0.36);
  for (let i = 0; i < n; i++) {
    box(1.3, 0.28, 0.03, mat(PAL.dark), 0, 0.45 + i * 0.36, 0.56, g);
    box(0.06, 0.06, 0.02, glowMat(i % 3 === 0 ? PAL.ok : PAL.data, 1), 0.5, 0.45 + i * 0.36, 0.58, g);
    box(0.06, 0.06, 0.02, glowMat(PAL.accent, 0.8), 0.38, 0.45 + i * 0.36, 0.58, g);
  }
  return g;
}

// Floating service tile, used for the services running on the central gateway.
export function serviceTile(x: number, y: number, z: number, rotY = 0, color: number = PAL.dark) {
  const g = group(x, y, z);
  const m = new THREE.MeshStandardMaterial({ color, emissive: PAL.accent, emissiveIntensity: 0.08, roughness: 0.4, transparent: true, opacity: 0.95 });
  const slab = box(1.9, 0.36, 0.08, m, 0, 0, 0, g);
  slab.castShadow = false;
  box(0.08, 0.36, 0.09, glowMat(PAL.accent, 1), -0.95, 0, 0, g);
  g.rotation.y = rotY;
  return { g, material: m };
}

// Soft translucent cloud.
export function cloud(x: number, y: number, z: number, s = 1) {
  const g = group(x, y, z);
  const m = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1, transparent: true, opacity: 0.18, depthWrite: false, emissive: 0xffffff, emissiveIntensity: 0.05 });
  [
    [0, 0, 0, 1.4],
    [-1.5, -0.2, 0.1, 1.1],
    [1.5, -0.15, 0, 1.15],
    [-2.8, -0.35, 0.2, 0.8],
    [2.8, -0.35, 0.1, 0.85],
    [0.6, 0.55, -0.2, 0.95],
  ].forEach(([cx, cy, cz, r]) => {
    const sph = new THREE.Mesh(new THREE.SphereGeometry(r * s, 24, 18), m);
    sph.position.set(cx * s, cy * s, cz * s);
    sph.scale.set(1, 0.6, 0.75);
    sph.castShadow = false;
    g.add(sph);
  });
  return g;
}

// Desk with a monitor showing a small bar chart.
export function consoleDesk(x: number, z: number, rotY = 0, alarm = false) {
  const g = group(x, 0, z);
  box(2.6, 0.08, 1.3, mat(0x3a3a3a, { roughness: 0.8 }), 0, 0.78, 0, g);
  [
    [-1.2, -0.55],
    [1.2, -0.55],
    [-1.2, 0.55],
    [1.2, 0.55],
  ].forEach(([lx, lz]) => box(0.07, 0.78, 0.07, mat(PAL.dark), lx, 0.39, lz, g));
  box(0.12, 0.4, 0.12, mat(PAL.dark), 0, 1.02, -0.35, g);
  box(1.5, 0.9, 0.06, mat(PAL.graphite), 0, 1.55, -0.38, g);
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 0.8), new THREE.MeshBasicMaterial({ color: 0x0a0a0a }));
  screen.position.set(0, 1.55, -0.345);
  g.add(screen);
  const bars: THREE.Mesh[] = [];
  [0.25, 0.4, 0.2, 0.5, 0.35, 0.55].forEach((h, i) => {
    const b = new THREE.Mesh(new THREE.PlaneGeometry(0.14, h), new THREE.MeshBasicMaterial({ color: i === 5 ? (alarm ? PAL.critical : PAL.data) : 0x6b7280 }));
    b.position.set(-0.5 + i * 0.2, 1.22 + h / 2, -0.34);
    g.add(b);
    bars.push(b);
  });
  g.rotation.y = rotY;
  return { g, bars };
}

// Tall storage tank / silo.
export function silo(x: number, z: number, r: number, h: number, color: number = PAL.stainless) {
  const g = group(x, 0, z);
  const m = mat(color, { metalness: 0.6, roughness: 0.35 });
  cyl(r, r, h, m, 0, h / 2, 0, g);
  const top = new THREE.Mesh(new THREE.SphereGeometry(r, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), m);
  top.position.y = h;
  g.add(top);
  return g;
}

export { cyl };
