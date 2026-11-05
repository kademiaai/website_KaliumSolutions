// Edge Kit bench, ported from the "First Kit in 3D" artifact (KAD-IIoT, IIOT OS build guide).
// Same objects, positions, sizes, rotations, colors, links, camera and halo highlights.
// Left out for the public site: the task checklist, IP addresses, hostnames and credential steps.
import { THREE, box, group, screenTexture, plateTexture, type Stage, type ElementInfo } from './engine';
import type { SceneController, SceneDef } from './scenes';
import { createKitInside } from './kitInside';

// Artifact palette (K1D, dark theme) and material recipes.
const C = { navy: 0x24215a, indigo: 0x4a37cc, violet: 0x6c5ce7, lav: 0xa99cec, cyan: 0x18c9d4, steel: 0x5d6178, dark: 0x2b2950, desk: 0x8f86c9, white: 0xf2f1fb };
// The artifact ran on three.js r147, where hex colors were used as linear values. lin() reproduces that.
const lin = (hex: number) => new THREE.Color().setHex(hex, THREE.LinearSRGBColorSpace);
const mat = (color: number, o: THREE.MeshStandardMaterialParameters = {}) => new THREE.MeshStandardMaterial({ roughness: 0.5, metalness: 0.25, ...o, color: lin(color) });
const glow = (color: number) => new THREE.MeshStandardMaterial({ color: lin(color), emissive: lin(color), emissiveIntensity: 1.2, roughness: 0.4 });

const VIEW_DIR = new THREE.Vector3(0.55, 0.62, 0.78).normalize();
const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

type ObjId = 'admin' | 'build' | 'gw' | 'reg' | 'kom' | 'mon' | 'ntp' | 'mir' | 'nas' | 'osw' | 'kit' | 'kit2' | 'usb' | 'otsw' | 'sim';
const GW_CHIPS: ObjId[] = ['reg', 'kom', 'mon', 'ntp', 'mir'];

// Object glossary, rewritten for customers.
const OBJ: Record<ObjId, { name: string; sub: string; group: string; desc: string; rows: [string, string][] }> = {
  admin: { name: 'Admin PC', sub: 'Operations workstation', group: 'Fleet operations', desc: 'Where engineers sign and promote releases and register new Kits. The offline release signing key lives here, never on the gateway or in the cloud.', rows: [['Holds', 'Offline release signing key'], ['Promotes', 'Lab, then pilot, then fleet']] },
  build: { name: 'Build machine', sub: 'Image builder', group: 'Fleet operations', desc: 'A separate machine that builds the Kit operating system. Packer installs Ubuntu inside a throwaway VM, runs the setup scripts and exports one disk image for every Kit. Builds never run on the live gateway.', rows: [['Tools', 'Packer, QEMU, OVMF'], ['Output', 'Image, checksums, manifest']] },
  gw: { name: 'Fleet gateway', sub: 'Central control VM', group: 'Fleet operations', desc: 'Hosts the services the fleet relies on but never holds factory production data. If it goes down, Kits keep collecting; only updates, monitoring and time sync pause.', rows: [['Receives', 'Kit health only'], ['Inbound ports', 'None']] },
  reg: { name: 'Image registry', sub: 'Inside the gateway', group: 'Fleet operations', desc: 'Private image store. Kits pull their container images from here instead of public hubs, so every Kit gets the same version by digest.', rows: [['Images', 'Pinned by digest'], ['Open to', 'Kits only']] },
  kom: { name: 'Deployments', sub: 'Inside the gateway', group: 'Fleet operations', desc: 'Deployment dashboard for the gateway and lab Kits only. Factory Kits never use it; they install signed releases the plant approves.', rows: [['Manages', 'Gateway and lab Kits']] },
  mon: { name: 'Metrics and alerts', sub: 'Inside the gateway', group: 'Fleet operations', desc: 'Each Kit ships health metrics here. Dashboards and email alerts follow the fleet; a Kit silent for 15 minutes raises an alert. Only health metrics leave a factory.', rows: [['Retention', '90 days'], ['Alert', 'Kit silent for 15 min']] },
  ntp: { name: 'Time sync', sub: 'Inside the gateway', group: 'Fleet operations', desc: 'Time source for every Kit over the encrypted overlay. Factories often block public time servers, so Kits sync here, backed by a battery clock.', rows: [['Why', '1 s readings line up across sites']] },
  mir: { name: 'Release mirror', sub: 'Inside the gateway', group: 'Fleet operations', desc: 'Copies signed releases by digest and adds a transfer signature. Kits check for new releases every 5 minutes.', rows: [['Signatures', 'Release and transfer']] },
  nas: { name: 'Backup NAS', sub: 'Backups and release archive', group: 'Factory LAN', desc: 'Stores encrypted Kit backups and the archive of released images. In production the factory provides the backup target.', rows: [['Backups', 'Encrypted, nightly']] },
  osw: { name: 'Office switch', sub: 'Uplink side', group: 'Factory LAN', desc: 'The uplink side of the bench. The Kit’s uplink port connects here at first boot to get an address and reach the gateway.', rows: [['Provides', 'DHCP and Internet']] },
  kit: { name: 'Edge Kit · lab', sub: 'Lab profile', group: 'Edge Kit', desc: 'The fanless industrial PC that sits in the factory panel. It reads PLCs every second, stores data locally and serves the console on the LAN, even without Internet. This one is the lab Kit.', rows: [['Mounting', 'DIN rail plate'], ['Ports', 'Power, uplink, OT, 2 × USB'], ['Polling', 'Every 1 s'], ['Offline', 'Keeps collecting']] },
  kit2: { name: 'Edge Kit · factory profile', sub: 'Factory profile', group: 'Edge Kit', desc: 'The second Kit, set up exactly as a factory receives it: no remote deployment, installed once and then updated only through signed releases the plant approves.', rows: [['Updates', 'Signed, plant approved'], ['Burn in', '24 h run with 200 tags']] },
  usb: { name: 'USB sticks', sub: 'Live boot and image', group: 'Edge Kit', desc: 'One stick boots a live Ubuntu on the Kit; the other carries the image, its checksums and the flash script.', rows: [['Use', 'Flashing the internal SSD']] },
  otsw: { name: 'OT switch', sub: 'Isolated machine network', group: 'OT network', desc: 'The isolated machine network. The Kit’s OT port has no default route here and never acts as a router into OT.', rows: [['Route out', 'None']] },
  sim: { name: 'PLC simulator', sub: 'Modbus, OPC UA, S7, EtherNet/IP', group: 'Simulation bench', desc: 'A separate bench machine standing in for the factory PLC. Simulators never run on a Kit, so fake data can never sit beside real data.', rows: [['Protocols', 'Modbus TCP, OPC UA, S7, EtherNet/IP']] },
};

// The artifact's nine phases, as a public walkthrough.
const STEPS: { title: string; body: string; objs: ObjId[] }[] = [
  { title: 'Clear the gates', body: 'Confirm the fleet gateway and its image registry answer, and prepare the signing and access keys before anything is built.', objs: ['reg', 'gw', 'admin', 'build', 'kit'] },
  { title: 'Prepare the build machine', body: 'A separate machine with virtualisation and Packer builds the operating system image. The live gateway is never used for builds.', objs: ['build'] },
  { title: 'Build the image', body: 'One script builds a hardened Ubuntu image with the Kalium stack, plus checksums and a manifest of every component.', objs: ['build', 'admin'] },
  { title: 'Test in a VM, then release', body: 'The image boots in a virtual machine and must pass 30 automated checks before it is copied to the release archive.', objs: ['build', 'nas'] },
  { title: 'Flash the hardware', body: 'UEFI and Secure Boot on, then the image is written to the Kit’s internal SSD from a USB stick.', objs: ['kit', 'usb'] },
  { title: 'First boot and setup', body: 'On first boot the Kit joins the encrypted overlay to the gateway and is configured from a single onboarding file.', objs: ['kit', 'admin'] },
  { title: 'Register and connect', body: 'The Kit gets its fixed overlay address, its software is deployed, and its OT port is cabled to the PLC simulator.', objs: ['admin', 'kom', 'sim'] },
  { title: 'Lab acceptance', body: 'Time sync, metrics, isolation from other Kits, backups, the local console and a power pull test with no gap in the data.', objs: ['ntp', 'mon', 'kit', 'nas', 'admin'] },
  { title: 'Factory profile pass', body: 'A second Kit is set up as a factory gets it: no remote deployment, updates only through signed releases the plant approves, and a 24 hour run with 200 tags.', objs: ['kit2', 'mir', 'admin'] },
];

export const kitBench: SceneDef = {
  id: 'kit',
  stage: {
    home: { target: V(1.5, 0.8, 0), dir: VIEW_DIR, dist: 29 },
    startPos: V(14, 11, 17),
    fov: 42,
    minDistance: 4,
    maxDistance: 90,
    maxPolar: Math.PI * 0.47,
    fog: [55, 120],
    floor: { w: 80, d: 80, round: true },
    theme: { bg: 0x0e0d26, floor: 0x15133a, gridMajor: 0x3a3480, grid: 0x221f55, gridSize: 64, gridDiv: 64, gridOpacity: 0.6 },
    lights: 'artifact',
    legacyColors: true,
  },
  build(s: Stage): SceneController {
    const groups = {} as Record<ObjId, THREE.Object3D>;
    const halos = {} as Record<ObjId, THREE.Mesh>;
    const info = (id: ObjId): ElementInfo => ({ id, ...OBJ[id] });

    function makeGroup(id: ObjId, x: number, z: number, haloR: number, labelY: number) {
      const g = group(x, 0, z);
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(haloR, haloR + 0.12, 64),
        new THREE.MeshBasicMaterial({ color: lin(C.cyan), transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false }),
      );
      ring.rotation.x = -Math.PI / 2;
      ring.position.y = 0.02;
      ring.visible = false;
      g.add(ring);
      halos[id] = ring;
      groups[id] = g;
      return { g, labelY };
    }
    const register = (id: ObjId, g: THREE.Object3D, labelY: number) => s.add(g, info(id), { labelY, key: id === 'kit' || id === 'gw' });

    // Admin PC: desk, monitor, keyboard
    {
      const { g, labelY } = makeGroup('admin', -7.5, 3.2, 1.6, 2.35);
      const deskM = mat(C.desk, { roughness: 0.7, metalness: 0.05 });
      box(2.6, 0.08, 1.3, deskM, 0, 0.78, 0, g);
      ([[-1.2, -0.55], [1.2, -0.55], [-1.2, 0.55], [1.2, 0.55]] as const).forEach(([x, z]) => box(0.07, 0.78, 0.07, mat(C.dark), x, 0.39, z, g));
      box(0.12, 0.4, 0.12, mat(C.dark), 0, 1.02, -0.35, g);
      box(1.5, 0.9, 0.06, mat(C.dark), 0, 1.55, -0.38, g);
      const screen = new THREE.Mesh(
        new THREE.PlaneGeometry(1.4, 0.8),
        new THREE.MeshBasicMaterial({ map: screenTexture([['$ release promote lab -> pilot', '#FFFFFF'], ['> manifest signature OK', '#7EE2A8'], ['$ kits status', '#FFFFFF'], ['> 2 Kits online', '#7EE2A8'], ['> registry answering', '#7EE2A8']], 512, 300, '#0F0E26') }),
      );
      screen.position.set(0, 1.55, -0.345);
      g.add(screen);
      box(0.9, 0.03, 0.3, mat(C.navy), 0, 0.835, 0.2, g);
      g.rotation.y = 0.5;
      register('admin', g, labelY);
    }

    // Build machine: tower
    {
      const { g, labelY } = makeGroup('build', -7.5, -2.6, 1.1, 2.05);
      box(0.8, 1.5, 1.3, mat(C.navy), 0, 0.75, 0, g);
      for (let i = 0; i < 6; i++) box(0.02, 0.05, 0.9, mat(C.lav), 0.41, 0.5 + i * 0.12, 0, g);
      box(0.02, 0.06, 0.06, glow(C.cyan), 0.41, 1.3, 0.45, g);
      const plate = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 0.25), new THREE.MeshBasicMaterial({ map: plateTexture('image builder', '#4A37CC', '#EAE8F6') }));
      plate.position.set(0.411, 1.12, 0);
      plate.rotation.y = Math.PI / 2;
      g.add(plate);
      g.rotation.y = 0.35;
      register('build', g, labelY);
    }

    // Gateway rack + service chips
    const chipSlabs = {} as Record<ObjId, THREE.MeshStandardMaterial>;
    {
      const { g, labelY } = makeGroup('gw', -1.6, -4.6, 1.6, 3.5);
      box(1.5, 3.1, 1.1, mat(C.navy, { metalness: 0.4 }), 0, 1.55, 0, g);
      for (let i = 0; i < 7; i++) {
        box(1.3, 0.28, 0.03, mat(C.dark), 0, 0.45 + i * 0.36, 0.56, g);
        box(0.06, 0.06, 0.02, glow(i % 3 === 0 ? C.cyan : C.lav), 0.5, 0.45 + i * 0.36, 0.58, g);
        box(0.06, 0.06, 0.02, glow(C.violet), 0.38, 0.45 + i * 0.36, 0.58, g);
      }
      register('gw', g, labelY);
      GW_CHIPS.forEach((id, i) => {
        const cg = group(-1.6 + 2.15, 0.75 + (4 - i) * 0.55, -4.6 + 0.45);
        const m = new THREE.MeshStandardMaterial({ color: lin(C.indigo), emissive: lin(C.indigo), emissiveIntensity: 0.35, roughness: 0.4, transparent: true, opacity: 0.92 });
        const slab = box(1.9, 0.36, 0.08, m, 0, 0, 0, cg);
        slab.castShadow = false;
        chipSlabs[id] = m;
        cg.rotation.y = -0.25;
        groups[id] = cg;
        s.add(cg, info(id), { labelAt: V(0, 0, 0.12), shadow: false });
      });
    }

    // NAS
    {
      const { g, labelY } = makeGroup('nas', -1.4, 4.4, 1.0, 1.55);
      box(1.0, 1.0, 1.0, mat(C.dark), 0, 0.5, 0, g);
      for (let i = 0; i < 4; i++) {
        box(0.2, 0.7, 0.03, mat(C.steel), -0.33 + i * 0.22, 0.5, 0.51, g);
        box(0.04, 0.04, 0.02, glow(i === 1 ? C.cyan : C.lav), -0.33 + i * 0.22, 0.8, 0.53, g);
      }
      g.rotation.y = -0.3;
      register('nas', g, labelY);
    }

    // Office switch
    {
      const { g, labelY } = makeGroup('osw', 1.8, 0.6, 1.0, 1.05);
      box(0.25, 0.5, 0.25, mat(C.dark), 0, 0.25, 0, g);
      box(1.6, 0.2, 0.6, mat(C.steel, { metalness: 0.5 }), 0, 0.6, 0, g);
      for (let i = 0; i < 8; i++) box(0.1, 0.07, 0.02, i < 5 ? glow(C.cyan) : mat(C.dark), -0.6 + i * 0.17, 0.6, 0.31, g);
      register('osw', g, labelY);
    }

    // Edge Kit on a DIN rail mounting plate
    const kitMats: Record<'kit' | 'kit2', THREE.Material[]> = { kit: [], kit2: [] };
    // The case (body, fins, name plate) turns see through in the inside view.
    const caseMats: Record<'kit' | 'kit2', THREE.Material[]> = { kit: [], kit2: [] };
    function buildKit(id: 'kit' | 'kit2', x: number, z: number, plateText: string) {
      const { g, labelY } = makeGroup(id, x, z, 1.5, 2.95);
      const mats = kitMats[id];
      const m = (c: number, o?: THREE.MeshStandardMaterialParameters) => {
        const mm = mat(c, o);
        mats.push(mm);
        return mm;
      };
      const gl = (c: number) => {
        const mm = glow(c);
        mats.push(mm);
        return mm;
      };
      box(0.12, 0.7, 0.12, m(C.dark), 0, 0.35, -0.55, g);
      box(2.2, 2.0, 0.08, m(0xd7d4ea, { metalness: 0.1 }), 0, 1.7, -0.55, g);
      box(2.0, 0.08, 0.08, m(C.steel, { metalness: 0.7 }), 0, 1.55, -0.47, g);
      const bodyM = m(C.steel, { metalness: 0.6, roughness: 0.35 });
      caseMats[id].push(bodyM);
      box(1.4, 0.95, 0.85, bodyM, 0, 1.55, -0.03, g);
      const finM = m(C.steel, { metalness: 0.6 });
      caseMats[id].push(finM);
      for (let i = 0; i < 10; i++) box(0.05, 0.2, 0.83, finM, -0.6 + i * 0.133, 2.12, -0.03, g);
      const plateMat = new THREE.MeshBasicMaterial({ map: plateTexture(plateText, '#4A37CC', '#EAE8F6'), transparent: true });
      mats.push(plateMat);
      caseMats[id].push(plateMat);
      const plate = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.22), plateMat);
      plate.position.set(0, 1.78, 0.4);
      g.add(plate);
      // ports on the front, left to right: power, uplink, OT, USB
      box(0.12, 0.1, 0.04, gl(C.cyan), -0.5, 1.3, 0.41, g);
      box(0.16, 0.12, 0.04, m(C.dark), -0.2, 1.3, 0.41, g);
      box(0.16, 0.12, 0.04, m(C.violet), 0.05, 1.3, 0.41, g);
      box(0.1, 0.05, 0.04, m(C.dark), 0.35, 1.32, 0.41, g);
      box(0.1, 0.05, 0.04, m(C.dark), 0.5, 1.32, 0.41, g);
      register(id, g, labelY);
    }
    buildKit('kit', 6.0, 0.4, 'kit 01 · lab');
    buildKit('kit2', 6.0, -4.2, 'kit 02 · factory');
    kitMats.kit2.forEach((mm) => (mm.transparent = true));

    // USB sticks on a small tray
    {
      const { g, labelY } = makeGroup('usb', 4.0, 2.4, 0.7, 1.0);
      box(0.9, 0.35, 0.6, mat(C.dark), 0, 0.175, 0, g);
      box(0.14, 0.05, 0.42, mat(C.lav), -0.18, 0.38, 0, g);
      box(0.14, 0.05, 0.42, mat(C.cyan), 0.18, 0.38, 0, g);
      register('usb', g, labelY);
    }

    // OT switch + simulator laptop
    {
      const { g, labelY } = makeGroup('otsw', 9.4, 2.8, 0.9, 1.05);
      box(0.25, 0.5, 0.25, mat(C.dark), 0, 0.25, 0, g);
      box(1.2, 0.2, 0.5, mat(C.violet, { metalness: 0.3 }), 0, 0.6, 0, g);
      for (let i = 0; i < 5; i++) box(0.09, 0.06, 0.02, i < 2 ? glow(C.cyan) : mat(C.dark), -0.4 + i * 0.2, 0.6, 0.26, g);
      register('otsw', g, labelY);
    }
    {
      const { g, labelY } = makeGroup('sim', 10.6, 5.6, 1.1, 1.75);
      box(1.4, 0.06, 0.9, mat(C.desk), 0, 0.7, 0, g);
      ([[-0.6, -0.35], [0.6, -0.35], [-0.6, 0.35], [0.6, 0.35]] as const).forEach(([x, z]) => box(0.05, 0.7, 0.05, mat(C.dark), x, 0.35, z, g));
      box(1.0, 0.04, 0.65, mat(C.dark), 0, 0.75, 0.05, g);
      const lid = new THREE.Group();
      lid.position.set(0, 0.77, -0.27);
      lid.rotation.x = -0.25;
      g.add(lid);
      box(1.0, 0.62, 0.03, mat(C.dark), 0, 0.31, 0, lid);
      const scr = new THREE.Mesh(
        new THREE.PlaneGeometry(0.92, 0.54),
        new THREE.MeshBasicMaterial({ map: screenTexture([['Modbus TCP simulator', '#FFFFFF'], ['listening', '#7EE2A8'], ['OT bench network', '#A99CEC'], ['HR 40001 = 497.7 kW', '#D9D6F5']], 512, 300, '#0F0E26') }),
      );
      scr.position.set(0, 0.31, 0.017);
      lid.add(scr);
      g.rotation.y = -0.6;
      register('sim', g, labelY);
    }

    // Links: office LAN, OT, encrypted overlay (tailnet)
    const P = (id: ObjId, dx = 0, dy = 0, dz = 0) => V(groups[id].position.x + dx, dy, groups[id].position.z + dz);
    type Link = { curve: THREE.QuadraticBezierCurve3; tube: THREE.Mesh; material: THREE.Material & { opacity: number }; kind: 'lan' | 'ot' | 'tail'; key?: string; packets: THREE.Mesh[] };
    const links: Link[] = [];
    function link(a: THREE.Vector3, b: THREE.Vector3, kind: Link['kind'], lift: number, key?: string) {
      const mid = a.clone().lerp(b, 0.5);
      mid.y += lift;
      const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
      const style = {
        lan: { r: 0.03, m: new THREE.MeshStandardMaterial({ color: lin(0x8a87b5), roughness: 0.8, transparent: true, opacity: 1 }) },
        ot: { r: 0.045, m: new THREE.MeshStandardMaterial({ color: lin(C.violet), emissive: lin(C.violet), emissiveIntensity: 0.25, transparent: true, opacity: 1 }) },
        tail: { r: 0.035, m: new THREE.MeshBasicMaterial({ color: lin(C.cyan), transparent: true, opacity: 0.85 }) },
      }[kind];
      const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 64, style.r, 8, false), style.m);
      s.scene.add(tube);
      const L: Link = { curve, tube, material: style.m, kind, key, packets: [] };
      if (kind === 'tail') {
        for (let i = 0; i < 3; i++) {
          const p = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 12), new THREE.MeshBasicMaterial({ color: 0xffffff }));
          p.userData.t = i / 3;
          p.position.copy(curve.getPoint(p.userData.t));
          s.scene.add(p);
          L.packets.push(p);
        }
      }
      links.push(L);
      return L;
    }
    link(P('admin', 0.3, 0.8, -0.2), P('osw', -0.7, 0.6), 'lan', 0.4);
    link(P('build', 0.3, 0.3), P('osw', -0.7, 0.6, -0.2), 'lan', 0.4);
    link(P('gw', 0.4, 0.3, 0.6), P('osw', -0.5, 0.6, -0.2), 'lan', 0.3);
    link(P('nas', 0.4, 0.5), P('osw', -0.4, 0.6, 0.2), 'lan', 0.3);
    link(P('osw', 0.7, 0.6), P('kit', -0.2, 1.3, 0.4), 'lan', 0.5, 'kitUplink');
    link(P('osw', 0.7, 0.6, -0.2), P('kit2', -0.2, 1.3, 0.4), 'lan', 0.5, 'kit2Uplink');
    link(P('kit', 0.05, 1.3, 0.42), P('otsw', -0.5, 0.6), 'ot', 0.4, 'kitOT');
    link(P('otsw', 0.5, 0.6), P('sim', -0.4, 0.75), 'ot', 0.3);
    link(P('admin', 0, 2.2), P('gw', 0, 3.2), 'tail', 2.6, 'tailAdmin');
    link(P('gw', 0, 3.2), P('kit', 0, 2.4), 'tail', 3.0, 'tailKit');
    link(P('gw', 0, 3.2), P('kit2', 0, 2.4), 'tail', 2.4, 'tailKit2');

    // ---------- Highlight and progress, as in the artifact ----------
    let hlSet = new Set<ObjId>();
    function highlight(ids: ObjId[]) {
      hlSet = new Set(ids);
      (Object.keys(OBJ) as ObjId[]).forEach((id) => {
        const chip = s.entries[id]?.chip;
        if (!chip) return;
        const on = hlSet.has(id);
        chip.classList.toggle('is-hl', on);
        chip.classList.toggle('is-quiet', hlSet.size > 0 && !on && !(id === 'gw' && ids.some((x) => GW_CHIPS.includes(x))));
      });
      GW_CHIPS.forEach((id) => {
        const m = chipSlabs[id];
        const on = hlSet.has(id);
        m.emissiveIntensity = on ? 0.9 : 0.35;
        m.color.copy(lin(on ? C.cyan : C.indigo));
        m.emissive.copy(lin(on ? C.cyan : C.indigo));
      });
    }
    const setLink = (key: string, active: boolean, ghost: number) => {
      const L = links.find((l) => l.key === key)!;
      L.material.opacity = active ? (L.kind === 'tail' ? 0.85 : 1) : ghost;
      L.material.depthWrite = active;
      L.packets.forEach((p) => (p.visible = active));
    };
    // step: null = overview with everything commissioned; 0..8 = state reached at that phase.
    function applyProgress(step: number | null) {
      const at = step ?? 99;
      const p8 = step === null || step === 8;
      setLink('kitOT', at >= 6, 0.15);
      setLink('tailKit', at >= 5, 0.12);
      setLink('tailKit2', p8, step === 8 ? 0.15 : 0.04);
      setLink('kit2Uplink', p8, 0.06);
      kitMats.kit2.forEach((m) => {
        (m as THREE.Material & { opacity: number }).opacity = p8 ? 1 : 0.18;
        m.depthWrite = p8;
      });
      s.entries.kit2?.chip.classList.toggle('is-ghost', !p8);
      const usbOn = step === 4;
      groups.usb.visible = usbOn;
      if (s.entries.usb) s.entries.usb.label.visible = usbOn;
    }

    const centerOf = (id: ObjId) => {
      const g = groups[id];
      const v = g.position.clone();
      v.y = GW_CHIPS.includes(id) ? g.position.y : 1.1;
      return v;
    };
    function framePhase(ids: ObjId[]) {
      const pts = ids.map(centerOf);
      const c = pts.reduce((a, p) => a.add(p), new THREE.Vector3()).multiplyScalar(1 / pts.length);
      const spread = Math.max(...pts.map((p) => p.distanceTo(c)), 1.5);
      s.flyTo(c.clone().addScaledVector(VIEW_DIR, s.distFor(spread)), c);
    }
    function overview() {
      const c = V(1.5, 0.8, 0);
      s.flyTo(c.clone().addScaledVector(VIEW_DIR, s.distFor(8.5)), c);
    }

    // Packets and halo pulse.
    s.onTick((dt, t) => {
      const motion = !s.reduce;
      links.forEach((L) =>
        L.packets.forEach((p) => {
          if (motion) p.userData.t = (p.userData.t + dt * 0.22) % 1;
          p.position.copy(L.curve.getPoint(p.userData.t));
        }),
      );
      (Object.keys(halos) as ObjId[]).forEach((id) => {
        const ring = halos[id];
        const m = ring.material as THREE.MeshBasicMaterial;
        const target = hlSet.has(id) ? 0.55 + (motion ? 0.3 * Math.sin(t * 3) : 0) : 0;
        m.opacity += (target - m.opacity) * 0.15;
        ring.visible = m.opacity > 0.01;
      });
    });

    // ---------- Inside the Edge Kit ----------
    let currentStep: number | null = null;
    let insideOf: 'kit' | 'kit2' | null = null;
    let modeListener: ((m: { title: string; hint: string } | null) => void) | null = null;
    const insides = {
      kit: createKitInside(s, 'kit', groups.kit.position.clone(), caseMats.kit),
      kit2: createKitInside(s, 'kit2', groups.kit2.position.clone(), caseMats.kit2),
    };
    const setBenchLabels = (on: boolean) =>
      (Object.keys(OBJ) as ObjId[]).forEach((id) => s.entries[id]?.chip.classList.toggle('is-hidden', !on));
    function enterInside(id: 'kit' | 'kit2') {
      if (insideOf === id) return;
      if (insideOf) insides[insideOf].close();
      insideOf = id;
      highlight([]);
      setBenchLabels(false);
      insides[id].open();
      modeListener?.({ title: `Inside ${OBJ[id].name}`, hint: 'Hardware on the mainboard, software stack above. Click any part.' });
    }
    function exitInside(fly = true) {
      if (!insideOf) return;
      insides[insideOf].close();
      insideOf = null;
      setBenchLabels(true);
      modeListener?.(null);
      window.setTimeout(() => applyProgress(currentStep), 1000);
      if (fly) overview();
    }
    s.onSelectChange((id) => {
      if (id === 'kit' || id === 'kit2') {
        enterInside(id);
        return true;
      }
      if (id && insideOf && (Object.keys(OBJ) as string[]).includes(id)) exitInside(false);
      return false;
    });

    applyProgress(null);
    highlight([]);
    requestAnimationFrame(overview);

    return {
      onMode: (fn) => {
        modeListener = fn;
      },
      exitMode: () => {
        s.select(null);
        exitInside(true);
      },
      steps: {
        title: 'Build and commission a Kit',
        items: STEPS.map(({ title, body }) => ({ title, body })),
        go: (i: number | null) => {
          exitInside(false);
          currentStep = i;
          if (i === null) {
            highlight([]);
            applyProgress(null);
            s.select(null);
            overview();
            return;
          }
          const st = STEPS[i];
          highlight(st.objs);
          applyProgress(i);
          framePhase(st.objs);
        },
      },
    };
  },
};
