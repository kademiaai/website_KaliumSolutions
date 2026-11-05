// "Inside the Edge Kit" view for the Kit bench scene.
// The KAD-IIoT artifacts show the Kit as a closed case; its contents come from their text:
// hardware from the First Kit guide (x86_64, internal SSD, UEFI + Secure Boot, RTC battery,
// 9–36 V DC, enp1s0 uplink, enp2s0 OT, USB ×2, HDMI) and software from the plant twin and
// image manifest (IIOT OS, Docker, Tailscale, kad-updater, edge-agent → Mosquitto → ingestor →
// TimescaleDB → aggregator, Caddy, Grafana, Alloy, restic).
import { THREE, box, type Stage, type ElementInfo, type Flow } from './engine';

const lin = (hex: number) => new THREE.Color().setHex(hex, THREE.LinearSRGBColorSpace);
const mat = (color: number, o: THREE.MeshStandardMaterialParameters = {}) =>
  new THREE.MeshStandardMaterial({ roughness: 0.5, metalness: 0.25, ...o, color: lin(color) });
const glow = (color: number) => new THREE.MeshStandardMaterial({ color: lin(color), emissive: lin(color), emissiveIntensity: 1.2, roughness: 0.4 });
const C = { navy: 0x24215a, indigo: 0x4a37cc, violet: 0x6c5ce7, lav: 0xa99cec, cyan: 0x18c9d4, steel: 0x5d6178, dark: 0x2b2950 };
const ease = (t: number) => 1 - Math.pow(1 - t, 3);

type Part = { key: string; name: string; sub: string; desc: string; rows: [string, string][] };

const HARDWARE: (Part & { build: (g: THREE.Group) => void; at: [number, number, number]; label: [number, number, number] })[] = [
  {
    key: 'board', name: 'Mainboard', sub: 'Fanless x86_64 PC',
    desc: 'Industrial x86_64 board in a sealed, fanless case. UEFI with Secure Boot on, and set to power on by itself after an AC loss.',
    rows: [['Architecture', 'x86_64'], ['Boot', 'UEFI, Secure Boot'], ['After power loss', 'Powers on by itself']],
    at: [0, 1.12, -0.03], label: [-0.95, -0.05, -0.2],
    build: (g) => box(1.28, 0.04, 0.74, mat(0x1d4a3f, { roughness: 0.7 }), 0, 0, 0, g),
  },
  {
    key: 'cpu', name: 'Processor and heat path', sub: 'Passive cooling',
    desc: 'The processor sheds heat straight into the finned case. No fan to clog or fail in a dusty control panel.',
    rows: [['Cooling', 'Passive, finned case'], ['Fans', 'None']],
    at: [-0.25, 1.165, -0.12], label: [-0.55, 0.85, 0],
    build: (g) => {
      box(0.32, 0.05, 0.32, mat(C.steel, { metalness: 0.7, roughness: 0.3 }), 0, 0, 0, g);
      box(0.22, 0.78, 0.22, mat(0xb87333, { metalness: 0.8, roughness: 0.3 }), 0, 0.42, 0, g);
    },
  },
  {
    key: 'ram', name: 'Memory', sub: 'System RAM',
    desc: 'Runs the operating system and the container stack that make up the Kit software.',
    rows: [['Runs', 'IIOT OS and Kit services']],
    at: [0.25, 1.21, -0.22], label: [0.85, 0.15, -0.2],
    build: (g) => {
      box(0.46, 0.14, 0.03, mat(C.navy), 0, 0, -0.03, g);
      box(0.46, 0.14, 0.03, mat(C.navy), 0, 0, 0.03, g);
      box(0.46, 0.02, 0.09, mat(0xc9a227, { metalness: 0.8 }), 0, -0.07, 0, g);
    },
  },
  {
    key: 'ssd', name: 'Internal SSD', sub: 'NVMe or SATA',
    desc: 'Holds IIOT OS and the local database. The image is flashed here once, and every reading is stored here first.',
    rows: [['Flashed with', 'IIOT OS image'], ['Stores', 'Raw readings and rollups']],
    at: [0.22, 1.15, 0.08], label: [0.9, 0.1, 0.1],
    build: (g) => {
      box(0.4, 0.02, 0.11, mat(C.lav, { roughness: 0.4 }), 0, 0, 0, g);
      box(0.08, 0.025, 0.08, mat(C.dark), -0.12, 0.012, 0, g);
    },
  },
  {
    key: 'rtc', name: 'RTC battery', sub: 'Keeps time offline',
    desc: 'Keeps the clock running through power cuts. When online, the Kit syncs time from the fleet gateway, so 1 s readings line up across sites.',
    rows: [['Online time source', 'Fleet gateway'], ['Offline', 'Battery backed clock']],
    at: [-0.5, 1.15, 0.12], label: [-0.95, 0.25, 0.2],
    build: (g) => {
      const c = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.025, 24), mat(0xd0d0d8, { metalness: 0.9, roughness: 0.2 }));
      g.add(c);
    },
  },
  {
    key: 'pwr', name: 'Power input', sub: '9 to 36 V DC',
    desc: 'Wide range DC input fed from the panel supply and UPS. After a power loss the Kit is designed to be back within about two minutes, with no gap in the data.',
    rows: [['Input', '9 to 36 V DC'], ['Recovery target', 'About 2 min, no data gap']],
    at: [-0.5, 1.19, 0.3], label: [-0.75, -0.55, 0.45],
    build: (g) => {
      box(0.2, 0.08, 0.14, mat(C.dark), 0, 0, 0, g);
      [-0.05, 0.05].forEach((x) => {
        const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.1, 16), mat(0x2f6fdf));
        cap.position.set(x, 0.09, -0.02);
        g.add(cap);
      });
    },
  },
  {
    key: 'nicup', name: 'Uplink port', sub: 'enp1s0',
    desc: 'Outbound only connection to the 4G router or the IT network. Carries Kit health, signed releases and support sessions over the encrypted overlay.',
    rows: [['Direction', 'Outbound only'], ['Inbound ports', 'None']],
    at: [-0.2, 1.18, 0.3], label: [-0.15, -0.75, 0.45],
    build: (g) => box(0.14, 0.08, 0.12, glow(C.lav), 0, 0, 0, g),
  },
  {
    key: 'nicot', name: 'OT port', sub: 'enp2s0',
    desc: 'Static address on the isolated machine network with no default route. The Kit polls PLCs here and never routes traffic into OT.',
    rows: [['Network', 'Isolated, no default route'], ['Direction', 'Kit polls devices']],
    at: [0.05, 1.18, 0.3], label: [0.3, -0.6, 0.45],
    build: (g) => box(0.14, 0.08, 0.12, glow(C.violet), 0, 0, 0, g),
  },
  {
    key: 'io', name: 'USB and HDMI', sub: 'Service ports',
    desc: 'Used to flash the image and for a local console during commissioning. USB boot is disabled once the Kit is locked down.',
    rows: [['USB', '2 ports'], ['Video', 'HDMI']],
    at: [0.42, 1.17, 0.31], label: [0.9, -0.35, 0.45],
    build: (g) => box(0.3, 0.06, 0.1, mat(C.steel, { metalness: 0.6 }), 0, 0, 0, g),
  },
];

type Tier = 'system' | 'data' | 'access' | 'fleet';
const TIER_COLOR: Record<Tier, number> = { system: C.lav, data: C.cyan, access: C.violet, fleet: C.indigo };
const TIER_NAME: Record<Tier, string> = { system: 'Kit software · system', data: 'Kit software · data path', access: 'Kit software · access', fleet: 'Kit software · fleet' };

// Bottom to top.
const SOFTWARE: (Part & { tier: Tier })[] = [
  { tier: 'system', key: 'os', name: 'IIOT OS', sub: 'Ubuntu Server 26.04', desc: 'Hardened operating system image, built once and flashed to every Kit. Machine identity and host keys are unique on each Kit.', rows: [['Base', 'Ubuntu Server 26.04'], ['Built with', 'Packer, tested in a VM']] },
  { tier: 'system', key: 'fw', name: 'Firewall', sub: 'Default deny', desc: 'No inbound connections from the Internet. The local console opens only to the factory LAN ranges the plant allows.', rows: [['Inbound from Internet', 'None']] },
  { tier: 'system', key: 'docker', name: 'Docker engine', sub: 'Container runtime', desc: 'Runs every Kit service as a container, pulled by digest from the signed registry.', rows: [['Images', 'Pinned by digest']] },
  { tier: 'fleet', key: 'ts', name: 'Tailscale', sub: 'Encrypted overlay', desc: 'WireGuard overlay to the fleet gateway. Kits cannot reach each other, and nothing listens on a public port.', rows: [['Carries', 'Health, releases, support']] },
  { tier: 'fleet', key: 'upd', name: 'Signed updater', sub: 'kad-updater', desc: 'Installs only releases signed with the offline release key and approved by the factory. A rollback restores app images and leaves the database untouched.', rows: [['Approval', 'By the factory'], ['Checks for releases', 'Every 5 min']] },
  { tier: 'data', key: 'agent', name: 'Edge agent', sub: 'Polls PLCs every 1 s', desc: 'Reads Siemens S7, Modbus, EtherNet/IP and OPC UA tags over the OT port. Read only by default.', rows: [['Poll rate', '1 s'], ['PLC writes', 'Off by default']] },
  { tier: 'data', key: 'mqtt', name: 'MQTT broker', sub: 'Mosquitto', desc: 'Local message bus between the edge agent and the ingestor.', rows: [['Runs', 'On the Kit only']] },
  { tier: 'data', key: 'ingest', name: 'Ingestor', sub: 'Writes raw readings', desc: 'Takes readings from the broker and writes them to the local database.', rows: [['Writes to', 'TimescaleDB']] },
  { tier: 'data', key: 'tsdb', name: 'TimescaleDB', sub: 'Local time series database', desc: 'Stores every raw value on the Kit. Production data never leaves the factory.', rows: [['Location', 'Internal SSD']] },
  { tier: 'data', key: 'agg', name: 'Aggregator', sub: 'Shift, batch, day', desc: 'Rolls raw values up per shift, batch and day, for KPIs such as kWh per tonne.', rows: [['Rollups', 'Shift, batch, day']] },
  { tier: 'access', key: 'console', name: 'Console', sub: 'Caddy HTTPS', desc: 'Serves the Kalium console over HTTPS on the factory LAN, with roles from site viewer to tenant admin.', rows: [['Access', 'Factory LAN, HTTPS']] },
  { tier: 'access', key: 'grafana', name: 'Grafana', sub: 'Dashboards on the LAN', desc: 'Local dashboards and trends for the plant team.', rows: [['Access', 'Factory LAN']] },
  { tier: 'fleet', key: 'alloy', name: 'Health shipper', sub: 'Grafana Alloy', desc: 'Ships Kit health metrics, never production data, to the fleet gateway.', rows: [['Sends', 'Kit health only']] },
  { tier: 'access', key: 'backup', name: 'Backup', sub: 'restic, nightly', desc: 'Nightly database dump, pushed as an encrypted snapshot to the factory NAS.', rows: [['Schedule', 'Nightly'], ['Target', 'Factory NAS']] },
];

const STACK_BASE = 2.55;
const STACK_GAP = 0.3;

export function createKitInside(s: Stage, kitId: string, kitPos: THREE.Vector3, caseMaterials: THREE.Material[]) {
  const ids: string[] = [];
  const objs: THREE.Object3D[] = [];
  const slabs: { g: THREE.Group; m: THREE.MeshStandardMaterial; e: THREE.LineBasicMaterial; y: number; i: number }[] = [];
  const W = (x: number, y: number, z: number) => new THREE.Vector3(kitPos.x + x, y, kitPos.z + z);

  HARDWARE.forEach((h) => {
    const g = new THREE.Group();
    g.position.copy(W(...h.at));
    h.build(g);
    const id = `${kitId}-${h.key}`;
    const info: ElementInfo = { id, name: h.name, sub: h.sub, group: 'Edge Kit hardware', desc: h.desc, rows: h.rows };
    s.add(g, info, { labelAt: new THREE.Vector3(...h.label), shadow: false });
    ids.push(id);
    objs.push(g);
  });

  SOFTWARE.forEach((sw, i) => {
    const y = STACK_BASE + i * STACK_GAP;
    const g = new THREE.Group();
    g.position.copy(W(0, y, -0.03));
    const m = new THREE.MeshStandardMaterial({ color: lin(TIER_COLOR[sw.tier]), emissive: lin(TIER_COLOR[sw.tier]), emissiveIntensity: 0.25, transparent: true, opacity: 0, roughness: 0.4, depthWrite: false });
    const slab = box(1.5, 0.08, 0.95, m, 0, 0, 0, g);
    slab.castShadow = false;
    const e = new THREE.LineBasicMaterial({ color: lin(TIER_COLOR[sw.tier]), transparent: true, opacity: 0 });
    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(slab.geometry), e);
    g.add(edges);
    const id = `${kitId}-${sw.key}`;
    const side = i % 2 === 0 ? -1 : 1;
    const info: ElementInfo = { id, name: sw.name, sub: sw.sub, group: TIER_NAME[sw.tier], desc: sw.desc, rows: sw.rows };
    s.add(g, info, { labelAt: new THREE.Vector3(side * 1.45, -0.12, 0), shadow: false });
    ids.push(id);
    objs.push(g);
    slabs.push({ g, m, e, y, i });
  });

  // Data moving up the data path: OT port → edge agent → … → aggregator.
  const yOf = (key: string) => STACK_BASE + SOFTWARE.findIndex((x) => x.key === key) * STACK_GAP;
  const flows: Flow[] = [
    s.flow({ color: C.cyan, glow: true, radius: 0.025, speed: 0.25, dots: 4, points: [W(0.05, 1.18, 0.38), W(0.05, 1.18, 0.62), W(0.05, yOf('agent'), 0.62), W(0.05, yOf('agent'), 0.45)] }),
    s.flow({ color: C.cyan, glow: true, radius: 0.025, speed: 0.25, dots: 5, points: [W(0.6, yOf('agent'), 0.45), W(0.6, yOf('agg'), 0.45)] }),
  ];
  flows.forEach((f) => (f.material.color = lin(C.cyan)));

  const setVisible = (on: boolean) => {
    objs.forEach((o) => (o.visible = on));
    ids.forEach((id) => {
      const e = s.entries[id];
      if (e) e.label.visible = on;
    });
    flows.forEach((f) => {
      f.tube.visible = on;
      f.dots.forEach((d) => (d.visible = on));
    });
  };
  setVisible(false);

  // Animation state: 0 closed, 1 fully open.
  let k = 0;
  let target = 0;
  caseMaterials.forEach((m) => {
    m.userData.baseOpacity = (m as THREE.Material & { opacity: number }).opacity;
    // Switching to transparent needs a shader rebuild, so do it once up front.
    m.transparent = true;
    m.needsUpdate = true;
  });
  const apply = () => {
    const kk = ease(k);
    caseMaterials.forEach((m) => {
      const mm = m as THREE.Material & { opacity: number };
      mm.opacity = THREE.MathUtils.lerp(m.userData.baseOpacity ?? 1, 0.14, kk);
      mm.depthWrite = kk < 0.5;
    });
    slabs.forEach(({ g, m, e, y, i }) => {
      const local = THREE.MathUtils.clamp(k * 1.8 - i * 0.05, 0, 1);
      const p = ease(local);
      g.position.y = THREE.MathUtils.lerp(2.1, y, p);
      m.opacity = 0.75 * p;
      e.opacity = p;
    });
  };

  s.onTick((dt) => {
    if (k === target) return;
    const step = s.reduce ? 1 : dt / 0.9;
    k = target > k ? Math.min(target, k + step) : Math.max(target, k - step * 1.5);
    apply();
    if (k === 0) setVisible(false);
  });

  return {
    ids: new Set(ids),
    open() {
      setVisible(true);
      target = 1;
      if (s.reduce) {
        k = 1;
        apply();
      }
      const c = W(0, 3.9, -0.03);
      s.flyTo(c.clone().add(new THREE.Vector3(0.55, 0.32, 0.78).normalize().multiplyScalar(s.distFor(2.9))), c);
    },
    close() {
      target = 0;
      if (s.reduce) {
        k = 0;
        apply();
        setVisible(false);
      }
    },
  };
}
