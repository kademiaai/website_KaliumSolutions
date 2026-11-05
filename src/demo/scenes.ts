// The three product demo scenes. Layouts are ported from the internal KAD-IIoT 3D artifacts;
// every description here is written for customers, with internal addresses, credentials,
// staff names and runbook steps removed.
import { THREE, PAL, box, cyl, dome, group, mat, glowMat, polyCurve, screenTexture, type Stage, type StageOptions, type Flow } from './engine';
import { edgeKit, otSwitch, simulatorBench, serverRack, serviceTile, cloud, consoleDesk, silo } from './parts';
import { kitBench } from './kitBench';

export interface Reading {
  label: string;
  value: string;
  unit: string;
  tone?: 'ok' | 'watch' | 'critical';
}
export interface SceneAction {
  id: string;
  label: string;
  activeLabel: string;
}
export interface SceneController {
  layers?: { id: string; label: string; color: string }[];
  actions?: SceneAction[];
  runAction?: (id: string, on: boolean) => { message: string; tone: 'warn' | 'ok' };
  readingsTitle?: string;
  onReadings?: (fn: (r: Reading[], status: string) => void) => void;
  dispose?: () => void;
  steps?: { title: string; items: { title: string; body: string }[]; go: (i: number | null) => void };
  onMode?: (fn: (m: { title: string; hint: string } | null) => void) => void;
  exitMode?: () => void;
}
export interface SceneDef {
  id: 'plant' | 'kit' | 'lab';
  stage: Omit<StageOptions, 'onSelect' | 'reducedMotion'>;
  build: (s: Stage) => SceneController;
}

const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
const fmt = (v: number, dec: number) => v.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec });

// ======================================================================
// 1. Plant digital twin: a powdered milk line, metered end to end
// ======================================================================
const plant: SceneDef = {
  id: 'plant',
  stage: {
    home: { target: V(18, 5, -10), dir: V(-0.52, 0.5, 0.69), dist: 128 },
    minDistance: 8,
    maxDistance: 260,
    fog: [220, 440],
    floor: { w: 64, d: 38 },
  },
  build(s) {
    const steel = (o = {}) => mat(PAL.stainless, { metalness: 0.6, roughness: 0.32, ...o });
    const util = (o = {}) => mat(PAL.steelLight, { metalness: 0.4, roughness: 0.5, ...o });
    const proc = { layer: 'process' };

    // ---- Process line ----
    ([
      [-25, -9, 'silo-a', 'Raw milk silo A'],
      [-20.5, -9, 'silo-b', 'Raw milk silo B'],
    ] as const).forEach(([x, z, id, name]) => {
      s.add(silo(x, z, 1.8, 11), {
        id, name, sub: '120 m³', group: 'Process line',
        desc: 'Insulated storage for incoming raw milk. Level and temperature come from the line PLC and are stored next to utility use, so energy can be tied to each batch.',
        rows: [['Step', '1 · Intake'], ['Signals', 'Level, temperature'], ['Read by', 'Edge Kit, Siemens S7 driver']],
      }, { ...proc, labelY: 13.6, key: id === 'silo-a' });
    });
    {
      const g = group(-12, 0, -8.5);
      box(4.2, 4.2, 4.2, steel(), 0, 2.1, 0, g);
      box(4.4, 0.3, 4.4, util(), 0, 4.35, 0, g);
      s.add(g, {
        id: 'balance', name: 'Balance tank', sub: 'Standardisation', group: 'Process line',
        desc: 'Buffers flow between intake and evaporation. Cleaning water to this tank is metered separately, so the cost of every wash cycle is visible.',
        rows: [['Step', '2 · Balance'], ['Utility in', 'CIP water']],
      }, { ...proc, labelY: 6 });
    }
    ([
      [-3.5, -10, 13, 'evap-1', 'Evaporator effect 1', 'Steam heated'],
      [-0.5, -7.5, 11, 'evap-2', 'Evaporator effect 2', 'Concentrate ~48 % solids'],
    ] as const).forEach(([x, z, h, id, name, sub]) => {
      const g = group(x, 0, z);
      cyl(1, 1, h, steel(), 0, h / 2, 0, g);
      const cap = dome(1, steel());
      cap.position.y = h;
      g.add(cap);
      cyl(1.4, 1.4, 2.2, util(), 0, 1.1, 0, g);
      s.add(g, {
        id, name, sub, group: 'Process line',
        desc: 'Falling film evaporator that concentrates milk before drying. It is the largest steam user on the line, so the steam meter sits on its header.',
        rows: [['Step', '3 · Evaporate'], ['Utility in', 'Steam'], ['KPI', 'kg steam per kg water removed']],
      }, { ...proc, labelY: h + 2.4, key: id === 'evap-1' });
    });
    {
      const g = group(9, 0, -8);
      ([[-2.2, -2.2], [2.2, -2.2], [-2.2, 2.2], [2.2, 2.2]] as const).forEach(([lx, lz]) => cyl(0.18, 0.18, 4.2, mat(PAL.steel), lx, 2.1, lz, g));
      const cone = new THREE.Mesh(new THREE.ConeGeometry(3.2, 3.2, 40), steel());
      cone.rotation.x = Math.PI;
      cone.position.y = 4.4;
      g.add(cone);
      cyl(3.2, 3.2, 6.5, steel(), 0, 9.25, 0, g);
      const roof = dome(3.2, util());
      roof.scale.y = 0.35;
      roof.position.y = 12.5;
      g.add(roof);
      const duct = cyl(0.5, 0.5, 4, mat(PAL.steel), 4.6, 10, 0, g);
      duct.rotation.z = Math.PI / 2;
      s.add(g, {
        id: 'dryer', name: 'Spray dryer', sub: 'Main tower', group: 'Process line',
        desc: 'Atomises concentrate into hot air to make powder. Its fans and heaters drive most of the electrical load, metered at the main switchboard.',
        rows: [['Step', '4 · Dry'], ['Utility in', 'Power, steam'], ['KPI', 'kWh per tonne of powder']],
      }, { ...proc, labelY: 15, key: true });
    }
    {
      const g = group(17, 0, -2.5);
      box(7, 1.8, 3, util(), 0, 1.6, 0, g);
      for (let i = -3; i <= 3; i += 2) {
        cyl(0.15, 0.15, 0.8, mat(PAL.steel), i, 0.4, 1.2, g);
        cyl(0.15, 0.15, 0.8, mat(PAL.steel), i, 0.4, -1.2, g);
      }
      box(7, 0.6, 3, steel(), 0, 2.8, 0, g);
      s.add(g, {
        id: 'fluidbed', name: 'Fluid bed', sub: 'Cooling and agglomeration', group: 'Process line',
        desc: 'Vibrating fluid bed that cools powder after the dryer. Compressed air use is metered here.',
        rows: [['Step', '4b · Cool'], ['Utility in', 'Compressed air'], ['KPI', 'Nm³ air per tonne']],
      }, { ...proc, labelY: 4.6 });
    }
    {
      const g = group(26, 0, -9);
      box(5, 3.2, 4, mat(PAL.dark), 0, 1.6, 0, g);
      box(6, 0.5, 1.4, mat(PAL.steel), -1, 1, 3.4, g);
      for (let i = 0; i < 3; i++) box(0.9, 0.9, 0.9, mat(PAL.accentSoft, { roughness: 0.7 }), -3 + i * 1.4, 1.7, 3.4, g);
      s.add(g, {
        id: 'pack', name: 'Packing line', sub: 'Cans and bags', group: 'Process line',
        desc: 'Fills and seals finished powder. Packed output from the PLC is the denominator for every specific consumption KPI, per shift, batch and day.',
        rows: [['Step', '5 · Pack'], ['Signals', 'Packed count, SKU']],
      }, { ...proc, labelY: 5 });
    }
    const productDot = PAL.accent;
    s.flow({ layer: 'process', color: PAL.stainless, dotColor: productDot, radius: 0.28, speed: 0.035, dots: 14, points: [
      V(-22.75, 1.4, -9), V(-14.1, 1.4, -9), V(-14.1, 1.4, -8.5), V(-9.9, 1.4, -8.5), V(-3.5, 1.4, -8.5), V(-0.5, 1.4, -8.5),
      V(-0.5, 1.4, -11.6), V(9, 1.4, -11.6), V(9, 4.4, -11.6),
    ] });
    s.flow({ layer: 'process', color: PAL.stainless, dotColor: productDot, radius: 0.28, speed: 0.05, dots: 7, points: [
      V(9, 2.6, -8), V(13.5, 2.6, -8), V(13.5, 2.6, -2.5), V(20.5, 2.6, -2.5), V(22.5, 2.6, -2.5), V(22.5, 2.6, -9), V(23.5, 2.6, -9),
    ] });

    // ---- Utilities ----
    const utilLayer = { layer: 'utility' };
    {
      const g = group(-21, 0, 10);
      const shell = cyl(1.7, 1.7, 7, util(), 0, 2.2, 0, g);
      shell.rotation.z = Math.PI / 2;
      cyl(0.45, 0.55, 8, mat(PAL.steel), -2.6, 4, 0, g);
      box(7.4, 0.5, 3, mat(PAL.dark), 0, 0.25, 0, g);
      s.add(g, { id: 'boiler', name: 'Steam boiler', sub: '10 bar', group: 'Utility supply',
        desc: 'Fire tube boiler supplying process steam to the evaporator and the dryer air heater.',
        rows: [['Supplies', 'Evaporator, dryer heater'], ['Metered by', 'Steam flow meter'], ['Unit', 'kg/h']] }, { ...utilLayer, labelY: 9 });
    }
    {
      const g = group(-9, 0, 10.5);
      box(4.2, 2.6, 3, util(), 0, 1.3, 0, g);
      const fan = cyl(0.9, 0.9, 0.3, mat(PAL.steel), 0, 1.4, 1.6, g);
      fan.rotation.x = Math.PI / 2;
      cyl(0.9, 0.9, 4.2, steel(), 3.4, 2.1, 0, g);
      s.add(g, { id: 'compressor', name: 'Air compressor', sub: 'With receiver', group: 'Utility supply',
        desc: 'Screw compressor and receiver feeding plant air. Leaks show up as night time flow while the line is stopped.',
        rows: [['Supplies', 'Fluid bed, pneumatics'], ['Metered by', 'Air flow meter'], ['Unit', 'Nm³/h']] }, { ...utilLayer, labelY: 5.4 });
    }
    {
      const g = group(2, 0, 11);
      cyl(1.6, 1.6, 4.6, steel(), 0, 2.3, 0, g);
      const c = dome(1.6, util());
      c.position.y = 4.6;
      g.add(c);
      cyl(1.1, 1.1, 3.4, steel(), 3, 1.7, 0, g);
      s.add(g, { id: 'cip', name: 'CIP station', sub: 'Water and caustic tanks', group: 'Utility supply',
        desc: 'Clean in place skid. Metering water per wash cycle exposes rinses that run too long.',
        rows: [['Supplies', 'Balance tank, lines'], ['Metered by', 'Water flow meter'], ['Unit', 'm³/h']] }, { ...utilLayer, labelY: 7.4 });
    }
    {
      const g = group(13, 0, 11);
      box(5, 3.4, 1.6, util(), 0, 1.7, 0, g);
      for (let i = -2; i <= 2; i++) box(0.12, 2.6, 0.2, mat(PAL.steel), i * 0.9, 1.7, 0.9, g);
      box(2.4, 2.4, 2.4, mat(PAL.dark), -4.2, 1.2, 0, g);
      s.add(g, { id: 'mdb', name: 'Main switchboard', sub: 'With transformer', group: 'Utility supply',
        desc: 'Low voltage switchboard with the dryer feeder. A multifunction power meter reads kW, kWh, power factor and harmonics.',
        rows: [['Supplies', 'Spray dryer, fans'], ['Metered by', 'Power meter, RS-485'], ['Unit', 'kW, kWh']] }, { ...utilLayer, labelY: 5.2 });
    }
    s.flow({ layer: 'utility', color: PAL.steel, dotColor: 0xffffff, radius: 0.16, speed: 0.06, points: [V(-21, 3.9, 10), V(-21, 3.9, 3), V(-3.5, 3.9, 3), V(-3.5, 3.9, -8.6)] });
    s.flow({ layer: 'utility', color: PAL.steel, dotColor: 0xffffff, radius: 0.13, speed: 0.07, points: [V(-5.6, 2.3, 10.5), V(-5.6, 2.3, 4.2), V(17, 2.3, 4.2), V(17, 2.3, -1)] });
    s.flow({ layer: 'utility', color: PAL.steel, dotColor: 0xffffff, radius: 0.13, speed: 0.07, points: [V(2, 1.1, 9.4), V(2, 1.1, 5.4), V(-12, 1.1, 5.4), V(-12, 1.1, -6.4)] });
    s.flow({ layer: 'utility', color: PAL.dark, dotColor: PAL.accentSoft, radius: 0.1, speed: 0.09, points: [V(11.5, 3.2, 10.2), V(11.5, 3.2, 1.8), V(9, 3.2, 1.8), V(9, 3.2, -4.8)] });

    // ---- Meters with live (simulated) values ----
    const METERS = [
      { id: 'm-steam', name: 'Steam flow meter', at: V(-13, 3.9, 3), proto: 'Modbus TCP', base: 1412, amp: 60, unit: 'kg/h', dec: 0, what: 'Vortex steam flow meter on the evaporator header', label: 'Steam, evaporator' },
      { id: 'm-power', name: 'Power meter', at: V(11.5, 3.2, 6), proto: 'Modbus RTU via converter', base: 517, amp: 24, unit: 'kW', dec: 0, what: 'Multifunction meter on the dryer feeder, wired over RS-485', label: 'Power, spray dryer' },
      { id: 'm-water', name: 'Water flow meter', at: V(-4, 1.1, 5.4), proto: 'Modbus TCP', base: 12.4, amp: 1.1, unit: 'm³/h', dec: 1, what: 'Electromagnetic flow meter on the CIP supply', label: 'Water, CIP' },
      { id: 'm-air', name: 'Air flow meter', at: V(8, 2.3, 4.2), proto: 'Modbus TCP', base: 340, amp: 18, unit: 'Nm³/h', dec: 0, what: 'Thermal mass flow meter on the fluid bed air header', label: 'Air, fluid bed' },
    ];
    METERS.forEach((m) => {
      const g = group(m.at.x, m.at.y, m.at.z);
      box(1.1, 1.1, 1.1, mat(PAL.data, { emissive: PAL.data, emissiveIntensity: 0.3 }), 0, 0, 0, g);
      const disp = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 0.4), new THREE.MeshBasicMaterial({ color: 0x0a0a0a }));
      disp.position.set(0, 0.1, 0.56);
      g.add(disp);
      s.add(g, { id: m.id, name: m.name, sub: `${m.base} ${m.unit}`, group: 'Utility meter',
        desc: `${m.what}. The Kit polls it every second, stores raw values locally and rolls them up per shift, batch and day.`,
        rows: [['Protocol', m.proto], ['Poll rate', '1 s'], ['Stored', 'On site, raw and rolled up']] }, { layer: 'ot', labelY: 1.1 });
    });

    // ---- OT network and the control panel ----
    {
      const g = group(-7.5, 0, -2.5);
      box(2.2, 3, 1, util(), 0, 1.5, 0, g);
      box(1.8, 0.8, 0.2, mat(PAL.graphite), 0, 2.1, 0.55, g);
      for (let i = 0; i < 5; i++) box(0.12, 0.12, 0.05, glowMat(i % 2 ? PAL.data : PAL.ok), -0.7 + i * 0.35, 2.1, 0.67, g);
      s.add(g, { id: 'plc', name: 'Line PLC', sub: 'Siemens S7-1500', group: 'OT network',
        desc: 'Controller running the evaporator, dryer and packing sequences. The Kit reads tags only. Writing to the PLC is off by default and needs written factory consent, interlocks and an audit trail.',
        rows: [['Driver', 'Siemens S7'], ['Access', 'Read only by default'], ['Also supported', 'Modbus TCP, EtherNet/IP, OPC UA']],
        note: 'Kits never connect to safety PLCs.' }, { layer: 'ot', labelY: 4.2 });
    }
    const PANEL = V(25, 0, 9.5);
    {
      const g = group(PANEL.x, 0, PANEL.z);
      const shell = new THREE.Mesh(new THREE.BoxGeometry(4.4, 5.2, 1.8), mat(PAL.steelLight, { transparent: true, opacity: 0.18 }));
      shell.position.y = 2.6;
      g.add(shell);
      box(4.2, 5, 0.12, mat(0x3a3a3a), 0, 2.6, -0.8, g);
      box(3.8, 0.12, 0.1, mat(PAL.steel), 0, 3.6, -0.68, g);
      box(3.8, 0.12, 0.1, mat(PAL.steel), 0, 2.0, -0.68, g);
      s.add(g, { id: 'panel', name: 'Control panel', sub: 'DIN rail enclosure', group: 'Edge Kit',
        desc: 'Factory side enclosure holding the Edge Kit, OT switch, RS-485 converter and UPS. Nothing in here accepts inbound connections from the Internet.',
        rows: [['Power', '24 V DC with UPS'], ['OT side', 'Isolated machine network'], ['Uplink', 'Dedicated 4G router']] }, { layer: 'ot', labelAt: V(-2.6, 5.6, 0), shadow: false });
    }
    const KIT = V(PANEL.x - 0.7, 3.65, PANEL.z - 0.25);
    const kitModel = edgeKit(KIT.x, KIT.y - 0.3, KIT.z, 1.4);
    s.add(kitModel.g, { id: 'kit', name: 'Kalium Edge Kit', sub: 'Collecting', group: 'Edge Kit',
      desc: 'Fanless industrial PC that reads PLCs and meters every second, stores everything locally and serves the console on the factory LAN. It keeps working with no Internet.',
      rows: [['OT port', 'Isolated machine network'], ['Uplink', 'Outbound only'], ['Polling', 'Every 1 s'], ['Storage', 'Local time series database'], ['Updates', 'Signed releases, approved by the factory']],
      note: 'Production data stays at the factory. The centre only receives Kit health.' }, { layer: 'ot', labelY: 1.9, key: true });
    const SW = V(PANEL.x + 1.1, 3.6, PANEL.z - 0.35);
    {
      const g = group(SW.x, SW.y, SW.z);
      box(1.4, 0.55, 0.7, mat(0x26323a), 0, 0, 0, g);
      for (let i = 0; i < 6; i++) box(0.14, 0.12, 0.05, i < 4 ? glowMat(PAL.data) : mat(0x111111), -0.5 + i * 0.2, 0.05, 0.37, g);
      s.add(g, { id: 'switch', name: 'OT switch', sub: 'Isolated segment', group: 'OT network',
        desc: 'Industrial switch for the OT segment. It joins the PLC, meters and converter to the Kit’s OT port, with no route out of this side.',
        rows: [['Gateway', 'None (isolated)'], ['Ports', 'Kit, PLC, meters, converter']] }, { layer: 'ot', labelAt: V(1.8, 1, 0) });
    }
    const CV = V(PANEL.x + 1.1, 2.0, PANEL.z - 0.4);
    {
      const g = group(CV.x, CV.y, CV.z);
      box(0.9, 0.8, 0.6, mat(PAL.steel), 0, 0, 0, g);
      s.add(g, { id: 'conv', name: 'RS-485 converter', sub: 'Modbus RTU to TCP', group: 'OT network',
        desc: 'Turns RS-485 Modbus RTU meters into Modbus TCP so the Kit can poll them on the OT network.',
        rows: [['Serial side', 'Modbus RTU, RS-485'], ['Network side', 'Modbus TCP']] }, { layer: 'ot', labelAt: V(1.6, 0.6, 0) });
    }
    {
      const g = group(PANEL.x - 0.8, 1.2, PANEL.z - 0.35);
      box(1.8, 1.1, 0.7, mat(PAL.dark), 0, 0, 0, g);
      s.add(g, { id: 'ups', name: 'UPS', sub: 'Ride through power loss', group: 'Edge Kit',
        desc: 'Small DC UPS. The Kit is designed to be back within about two minutes of a power loss, without a gap in the data.',
        rows: [['Target recovery', 'About 2 min'], ['Data gap', 'None']] }, { layer: 'ot', labelAt: V(-1.9, 0.6, 0) });
    }
    const ROUTER = V(PANEL.x + 1, 5.2, PANEL.z);
    {
      const g = group(ROUTER.x, ROUTER.y, ROUTER.z);
      box(1.4, 0.5, 0.9, mat(PAL.white, { roughness: 0.6 }), 0, 0.25, 0, g);
      [-0.45, 0.45].forEach((x) => cyl(0.05, 0.05, 1.4, mat(PAL.graphite), x, 1.2, 0, g));
      s.add(g, { id: 'router', name: '4G uplink router', sub: 'Outbound only', group: 'Edge Kit',
        desc: 'Dedicated cellular router for the Kit uplink, kept apart from the factory IT network. The Kit only makes outbound connections; no inbound ports are opened.',
        rows: [['Preference', '4G router, then IT VLAN'], ['Inbound ports', 'None'], ['Carries', 'Encrypted overlay']] }, { layer: 'fleet', labelY: 2.4, key: true });
    }
    const otRun = (from: THREE.Vector3, to: THREE.Vector3, lane: number) => [
      from, V(from.x, 0.18, from.z), V(from.x, 0.18, lane), V(PANEL.x - 2.8, 0.18, lane), V(PANEL.x - 2.8, 0.18, PANEL.z - 1.2),
      V(to.x, 0.18, PANEL.z - 1.2), V(to.x, to.y, PANEL.z - 1.2), to,
    ];
    s.flow({ layer: 'ot', color: PAL.data, radius: 0.06, glow: true, speed: 0.08, points: otRun(V(-7.5, 1, -2.5), SW, 0.6) });
    s.flow({ layer: 'ot', color: PAL.data, radius: 0.06, glow: true, speed: 0.1, points: otRun(V(-13, 3.35, 3), SW, 0.9) });
    s.flow({ layer: 'ot', color: PAL.data, radius: 0.06, glow: true, speed: 0.1, points: otRun(V(-4, 0.55, 5.4), SW, 1.2) });
    s.flow({ layer: 'ot', color: PAL.data, radius: 0.06, glow: true, speed: 0.1, points: otRun(V(8, 1.75, 4.2), SW, 1.5) });
    s.flow({ layer: 'ot', color: PAL.steel, dotColor: PAL.data, radius: 0.06, speed: 0.1, points: otRun(V(11.5, 2.65, 6), CV, 1.8) });
    s.flow({ layer: 'ot', color: PAL.data, radius: 0.05, glow: true, speed: 0.15, points: [CV, V(CV.x, SW.y, CV.z)] });
    s.flow({ layer: 'ot', color: PAL.data, radius: 0.06, glow: true, speed: 0.15, dots: 3, points: [SW, V(KIT.x + 1.1, SW.y, KIT.z)] });
    {
      const g = group(4, 0.18, 0.9);
      g.add(new THREE.Mesh(new THREE.SphereGeometry(0.3, 12, 8), mat(PAL.data, { emissive: PAL.data, emissiveIntensity: 0.4 })));
      s.add(g, { id: 'otnet', name: 'OT network', sub: '1 s polling', group: 'OT network',
        desc: 'Isolated plant network carrying Modbus TCP and S7 traffic between field devices and the Kit. Field devices never push into the Kit; the Kit polls them.',
        rows: [['Protocols', 'Modbus TCP, S7'], ['Direction', 'Kit polls devices'], ['Route out', 'None']] }, { layer: 'ot', labelY: 0.8 });
    }

    // ---- Factory LAN ----
    {
      const desk = consoleDesk(19, 15, 0);
      desk.g.scale.setScalar(1.6);
      s.add(desk.g, { id: 'console', name: 'Operator console', sub: 'Dashboards on the factory LAN', group: 'Factory LAN',
        desc: 'Factory staff open the Kalium console and dashboards over HTTPS on the factory LAN, with roles from site viewer to tenant admin.',
        rows: [['Served by', 'Edge Kit'], ['Access', 'Factory LAN, HTTPS'], ['Public URL', 'Only on written request']] }, { layer: 'ot', labelY: 3.2 });
    }
    {
      const g = group(13.5, 0, 15.5);
      box(1.4, 1.8, 1.8, mat(PAL.dark), 0, 0.9, 0, g);
      for (let i = 0; i < 4; i++) box(1.1, 0.25, 0.05, mat(PAL.graphite), 0, 0.4 + i * 0.35, 0.92, g);
      s.add(g, { id: 'nas', name: 'Factory NAS', sub: 'Nightly encrypted backup', group: 'Factory LAN',
        desc: 'Factory provided storage. Each night the Kit pushes an encrypted backup of its database here.',
        rows: [['Schedule', 'Nightly'], ['Owned by', 'Factory IT']] }, { layer: 'ot', labelY: 2.6 });
    }
    s.flow({ layer: 'ot', color: PAL.steel, dotColor: 0xffffff, radius: 0.07, speed: 0.08, points: [
      V(KIT.x - 1.1, KIT.y - 0.6, KIT.z), V(PANEL.x - 2.6, KIT.y - 0.6, PANEL.z), V(PANEL.x - 2.6, 0.2, PANEL.z), V(PANEL.x - 2.6, 0.2, 13.4), V(19, 0.2, 13.4), V(19, 1.1, 13.4),
    ] });
    s.flow({ layer: 'ot', color: PAL.steel, dotColor: 0xffffff, radius: 0.07, speed: 0.06, points: [V(PANEL.x - 2.6, 0.2, 13.4), V(13.5, 0.2, 13.4), V(13.5, 0.9, 13.4)] });

    // ---- Central fleet operations (raised island) ----
    const I = V(52, 10, -32);
    const fleet = { layer: 'fleet' };
    const islandMat = new THREE.MeshStandardMaterial({ color: PAL.floor, roughness: 0.9 });
    const island = new THREE.Mesh(new THREE.BoxGeometry(30, 1.2, 20), islandMat);
    island.position.set(I.x, I.y - 0.6, I.z);
    island.receiveShadow = true;
    island.castShadow = true;
    s.scene.add(island);
    const grid2 = new THREE.GridHelper(30, 15, PAL.gridMajor, PAL.grid);
    grid2.scale.z = 20 / 30;
    grid2.position.set(I.x, I.y + 0.01, I.z);
    s.scene.add(grid2);
    cyl(1.2, 2.2, 10, mat(PAL.dark), I.x, I.y - 6.2, I.z, s.scene);
    {
      const g = group(I.x - 4, I.y, I.z + 1);
      box(9, 3, 5, mat(PAL.graphite, { metalness: 0.35, roughness: 0.4 }), 0, 1.5, 0, g);
      for (let i = 0; i < 6; i++) box(8.2, 0.12, 0.05, mat(PAL.dark), 0, 0.5 + i * 0.4, 2.53, g);
      s.add(g, { id: 'host', name: 'Central host', sub: 'Virtualisation server', group: 'Fleet operations',
        desc: 'Hypervisor that runs the fleet gateway, with nightly snapshots. Pilots can run the gateway on a small PC instead.',
        rows: [['Backups', 'Nightly snapshots'], ['Location', 'Kalium operations']] }, { ...fleet, labelAt: V(-5.8, 2.2, 2.6) });
    }
    const GW = V(I.x - 4, I.y + 3, I.z + 1);
    {
      const g = group(GW.x, GW.y, GW.z);
      const vm = new THREE.Mesh(new THREE.BoxGeometry(9.4, 4.2, 5.4), mat(PAL.accent, { transparent: true, opacity: 0.08 }));
      vm.position.y = 2.1;
      g.add(vm);
      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(vm.geometry), new THREE.LineBasicMaterial({ color: PAL.accent }));
      edges.position.y = 2.1;
      g.add(edges);
      s.add(g, { id: 'gateway', name: 'Fleet gateway', sub: 'Manages about 100 Kits', group: 'Fleet operations',
        desc: 'One gateway watches around 100 Kits across customer factories. It receives Kit health, hosts the signed software registry and raises alerts. If it goes down, every Kit keeps collecting and serving its factory.',
        rows: [['Receives', 'Kit health only'], ['Inbound ports', 'None'], ['If it fails', 'Factories keep running']] }, { ...fleet, labelY: 5.8, key: true });
    }
    ([
      ['svc-tunnel', 'Secure tunnel', 'Outbound only', 'Publishes the operations dashboards through a cloud tunnel. Kits never expose a public port.'],
      ['svc-metrics', 'Fleet metrics', 'Kit health, 90 days', 'Stores the health metrics each Kit ships, with a separate write credential per Kit.'],
      ['svc-alerts', 'Alerting', 'Email alerts', 'Fleet dashboards and alerts, including an alert when a Kit goes silent for 15 minutes.'],
      ['svc-registry', 'Signed registry', 'Digest pinned', 'Holds release images pinned by digest and signed before any Kit fetches them.'],
      ['svc-deploy', 'Deployments', 'Lab Kits only', 'Container management for the gateway and lab Kits. Factory Kits update only through signed releases they approve.'],
      ['svc-time', 'Time sync', 'Fleet time source', 'Time source for the fleet, so 1 s readings line up across sites.'],
    ] as const).forEach(([id, name, sub, desc], i) => {
      const col = i % 3;
      const row = Math.floor(i / 3);
      const g = group(GW.x - 3 + col * 3, GW.y + 0.25 + row * 1.9, GW.z - 1 + row * 1.4);
      box(2.3, 1.2, 1.4, mat(i === 3 ? PAL.accent : PAL.dark, { metalness: 0.3 }), 0, 0.6, 0, g);
      s.add(g, { id, name, sub, group: 'Fleet operations', desc, rows: [['Runs on', 'Fleet gateway']] }, { ...fleet, labelY: 1.5 });
    });
    const CLOUD = V(I.x - 4, I.y + 19, I.z + 1);
    {
      const g = cloud(CLOUD.x, CLOUD.y, CLOUD.z, 2.2);
      s.add(g, { id: 'cloud', name: 'Cloud edge', sub: 'DNS · tunnel · firewall · access', group: 'Fleet operations',
        desc: 'Cloud edge for DNS, the tunnel, the web application firewall and access control. A factory dashboard is only published on written request, always behind access control.',
        rows: [['Factory URL', 'Opt in only'], ['Protection', 'Access control']] }, { ...fleet, labelY: 4.2, shadow: false });
    }
    s.flow({ layer: 'fleet', color: PAL.steel, dotColor: PAL.accentSoft, radius: 0.09, speed: 0.12, dots: 4, points: [V(GW.x - 3, GW.y + 1.5, GW.z - 1), V(GW.x - 3, CLOUD.y - 3, GW.z - 1)] });

    const ARC = new THREE.CubicBezierCurve3(V(ROUTER.x, ROUTER.y + 0.4, ROUTER.z), V(ROUTER.x + 8, 32, ROUTER.z - 4), V(GW.x - 14, 34, GW.z + 6), V(GW.x - 4.7, GW.y + 2, GW.z));
    const wan: Flow = s.flow({ layer: 'fleet', curve: ARC, color: PAL.accent, dotColor: 0xffffff, radius: 0.14, glow: true, speed: 0.06, dots: 9 });
    s.flow({ layer: 'fleet', color: PAL.accent, dotColor: 0xffffff, radius: 0.06, speed: 0.2, dots: 2, points: [V(KIT.x + 0.4, KIT.y + 0.6, KIT.z), V(KIT.x + 0.4, ROUTER.y + 0.2, KIT.z), V(ROUTER.x, ROUTER.y + 0.2, ROUTER.z)] });
    {
      const mid = ARC.getPointAt(0.5);
      const g = group(mid.x, mid.y, mid.z);
      g.add(new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 12), mat(PAL.accent, { emissive: PAL.accent, emissiveIntensity: 0.5 })));
      s.add(g, { id: 'uplink', name: 'Encrypted uplink', sub: 'Kit health only', group: 'Fleet operations',
        desc: 'Encrypted WireGuard overlay between the gateway and every Kit. It carries Kit health, software releases and time boxed, audited support sessions. Kits cannot reach each other and nothing listens on a public port.',
        rows: [['Carries', 'Health, releases, support'], ['Typical traffic', 'About 2.5 kB/s per Kit (simulated)']],
        note: 'Production readings never leave the factory over this link.' }, { ...fleet, labelY: 1, key: true });
    }
    ([
      ['z-factory', 'Factory floor', 'Customer site, runs without Internet', V(-26, 0.2, 17)],
      ['z-ops', 'Central operations', 'Fleet monitoring and releases', V(I.x - 11, I.y + 0.1, I.z + 10)],
    ] as const).forEach(([id, name, sub, p]) => {
      s.add(group(p.x, p.y, p.z), { id, name, sub, group: 'Zone', desc: '', rows: [] }, { zone: true, labelY: 0, pick: false });
    });

    // ---- Live readings and the outage scenario ----
    let outage = false;
    let outageAt = 0;
    let listener: ((r: Reading[], status: string) => void) | null = null;
    let tick = 0;
    const poll = () => {
      tick += 1;
      const rows: Reading[] = METERS.map((m, i) => {
        const v = m.base + Math.sin(tick / 7 + i) * m.amp * 0.6 + (Math.random() - 0.5) * m.amp * 0.5;
        s.setSub(m.id, `${fmt(v, m.dec)} ${m.unit}`);
        return { label: m.label, value: fmt(v, m.dec), unit: m.unit };
      });
      rows.push({ label: 'Kit health to centre', value: outage ? '0.0' : (2.3 + Math.random() * 0.5).toFixed(1), unit: 'kB/s', tone: outage ? 'critical' : 'ok' });
      if (outage && performance.now() - outageAt > 15000) {
        s.setAlarm('gateway', true);
        s.setSub('gateway', 'Alert: Kit silent');
      }
      listener?.(rows, outage ? 'Uplink down, Kit still polling every 1 s' : 'Polling every 1 s on the OT network');
    };
    poll();
    const timer = window.setInterval(poll, 1000);

    return {
      layers: [
        { id: 'process', label: 'Process', color: '#c4c7cc' },
        { id: 'utility', label: 'Utilities', color: '#9ca3af' },
        { id: 'ot', label: 'OT network', color: '#4cd7f6' },
        { id: 'fleet', label: 'Fleet ops', color: '#f97316' },
      ],
      actions: [{ id: 'outage', label: 'Cut factory uplink', activeLabel: 'Restore uplink' }],
      readingsTitle: 'Live utility readings',
      onReadings: (fn) => {
        listener = fn;
        poll();
      },
      runAction: (_id, on) => {
        outage = on;
        outageAt = performance.now();
        wan.paused = on;
        wan.dots.forEach((d) => (d.visible = !on));
        wan.material.color.setHex(on ? PAL.critical : PAL.accent);
        wan.material.emissive.setHex(on ? PAL.critical : PAL.accent);
        wan.material.transparent = true;
        wan.material.opacity = on ? 0.45 : 1;
        s.setSub('router', on ? 'Uplink down' : 'Outbound only');
        s.setSub('kit', on ? 'Offline, still collecting' : 'Collecting');
        s.setSub('uplink', on ? 'Disconnected' : 'Kit health only');
        s.setAlarm('router', on);
        s.setAlarm('uplink', on);
        if (!on) {
          s.setAlarm('gateway', false);
          s.setSub('gateway', 'Manages about 100 Kits');
        }
        poll();
        return on
          ? { tone: 'warn', message: 'Uplink cut. The Kit keeps reading PLCs and meters, stores every value locally and serves the console on the factory LAN. Only fleet monitoring and releases pause. In this demo the gateway raises a silent Kit alert after 15 s.' }
          : { tone: 'ok', message: 'Uplink restored. Kit health resumes; no factory data was lost.' };
      },
      dispose: () => window.clearInterval(timer),
    };
  },
};

// ======================================================================
// 3. Simulation lab: PLC simulators drive a Kit, the fleet gateway watches
// ======================================================================
const SIM_OK: [string, string][] = [
  ['PLC simulators', '#ededed'],
  ['Modbus TCP    running', '#4ade80'],
  ['OPC UA        running', '#4ade80'],
  ['Siemens S7    running', '#4ade80'],
  ['EtherNet/IP   running', '#4ade80'],
  ['G114 vib  2.9 mm/s', '#a1a1a1'],
];
const SIM_FAULT: [string, string][] = [
  ['PLC simulators', '#ededed'],
  ['Modbus TCP    running', '#4ade80'],
  ['OPC UA        running', '#4ade80'],
  ['Siemens S7    running', '#4ade80'],
  ['Fault injected: BPFO', '#fbbf24'],
  ['G114 vib  7.8 mm/s', '#f87171'],
];

const lab: SceneDef = {
  id: 'lab',
  stage: {
    home: { target: V(1.5, 1.4, 0.4), dir: V(0.55, 0.62, 0.78), dist: 24 },
    minDistance: 5,
    maxDistance: 60,
    fog: [45, 110],
    floor: { w: 40, d: 40, round: true },
  },
  build(s) {
    const bench = { layer: 'bench' };
    const sim = simulatorBench(10.4, 5.6, SIM_OK);
    sim.g.rotation.y = -0.6;
    s.add(sim.g, { id: 'sim', name: 'PLC simulator', sub: 'Four protocols', group: 'Simulation bench',
      desc: 'A separate bench machine that stands in for the factory controllers. It serves Modbus TCP, OPC UA, Siemens S7 and EtherNet/IP with realistic tags, so a Kit can be tested end to end before it reaches a plant. Simulators never run on a Kit.',
      rows: [['Protocols', 'Modbus TCP, OPC UA, S7, EtherNet/IP'], ['Use', 'Acceptance tests, training, demos']] }, { ...bench, labelY: 1.9, key: true });

    const sw = otSwitch(9.2, 2.6);
    s.add(sw, { id: 'otsw', name: 'OT switch', sub: 'Isolated bench network', group: 'OT network',
      desc: 'Isolated machine network, exactly as in a factory panel. The Kit’s OT port has no default route here.',
      rows: [['Route out', 'None'], ['Joins', 'Simulator and Kit']] }, { ...bench, labelY: 1.1 });

    const kitStand = group(7.0, 0, -1.2);
    box(0.12, 0.7, 0.12, mat(PAL.dark), 0, 0.35, -0.55, kitStand);
    box(2.2, 2.0, 0.08, mat(0x3a3a3a), 0, 1.7, -0.55, kitStand);
    box(2.0, 0.08, 0.08, mat(PAL.steelLight, { metalness: 0.7 }), 0, 1.55, -0.47, kitStand);
    const kitM = edgeKit(0, 1.55, -0.03, 1);
    kitStand.add(kitM.g);
    kitStand.rotation.y = -0.25;
    s.add(kitStand, { id: 'kit', name: 'Kalium Edge Kit', sub: 'Collecting', group: 'Edge Kit',
      desc: 'A production Kit on the bench, running the same software that ships to factories. It polls the simulator every second, scores each asset against its own baseline and estimates remaining useful life.',
      rows: [['Polling', 'Every 1 s'], ['Detection', 'Anomaly score per asset'], ['Output', 'Factory console and alerts']] }, { ...bench, labelY: 2.9, key: true });

    const desk = consoleDesk(4.4, 4.2, -0.5);
    s.add(desk.g, { id: 'console', name: 'Factory console', sub: 'Asset health view', group: 'Factory LAN',
      desc: 'The operator view a plant sees on its own network: assets ranked by risk, trends, likely fault and suggested action.',
      rows: [['Served by', 'Edge Kit'], ['Access', 'Factory LAN']] }, { ...bench, labelY: 2.4 });

    {
      const g = group(2.6, 0, -2.6);
      box(0.25, 0.5, 0.25, mat(PAL.dark), 0, 0.25, 0, g);
      box(1.3, 0.22, 0.8, mat(PAL.white, { roughness: 0.6 }), 0, 0.61, 0, g);
      [-0.45, 0.45].forEach((x) => {
        const a = box(0.04, 0.55, 0.04, mat(PAL.graphite), x, 0.98, -0.32, g);
        a.rotation.z = x > 0 ? -0.2 : 0.2;
      });
      for (let i = 0; i < 5; i++) box(0.08, 0.05, 0.02, i < 3 ? glowMat(PAL.ok) : mat(0x111111), -0.4 + i * 0.2, 0.61, 0.41, g);
      s.add(g, { id: 'router', name: 'Uplink router', sub: 'Outbound only', group: 'Edge Kit',
        desc: 'The Kit’s only way out. Outbound connections only; nothing on the bench accepts inbound traffic from the Internet.',
        rows: [['Inbound ports', 'None']] }, { ...bench, labelY: 1.5 });
    }

    // Central operations
    const fleet = { layer: 'fleet' };
    const rack = serverRack(-3.4, -3.8, 1.1);
    s.add(rack, { id: 'host', name: 'Central host', sub: 'Kalium operations', group: 'Fleet operations',
      desc: 'Virtualisation host at Kalium operations that runs the fleet gateway, with nightly backups.',
      rows: [['Backups', 'Nightly']] }, { ...fleet, labelY: 1.6 });
    {
      const g = group(-3.4, 0, -3.8);
      const shell = new THREE.MeshStandardMaterial({ color: PAL.accent, emissive: PAL.accent, emissiveIntensity: 0.15, transparent: true, opacity: 0.12, depthWrite: false });
      const vm = box(2.3, 1.3, 1.7, shell, 0, 2.45, 0, g);
      vm.castShadow = false;
      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(vm.geometry), new THREE.LineBasicMaterial({ color: PAL.accent }));
      edges.position.copy(vm.position);
      g.add(edges);
      for (let i = 0; i < 4; i++) box(0.05, 0.12, 0.05, glowMat(PAL.accentSoft, 0.8), 0, 1.25 + i * 0.2, 0, g);
      s.add(g, { id: 'gateway', name: 'Fleet gateway', sub: 'Health, releases, alerts', group: 'Fleet operations',
        desc: 'Watches every Kit’s health, hosts signed releases and raises fleet alerts. It never receives production readings.',
        rows: [['Receives', 'Kit health only'], ['Inbound ports', 'None']] }, { ...fleet, labelY: 3.5, key: true });
    }
    ([
      ['svc-metrics', 'Fleet metrics', 'Health metrics from every Kit, kept for 90 days.'],
      ['svc-alerts', 'Alerting', 'Email alerts, including when a Kit goes silent.'],
      ['svc-registry', 'Signed registry', 'Release images pinned by digest and signed.'],
      ['svc-deploy', 'Deployments', 'Lab Kits only; factory Kits approve each release.'],
      ['svc-time', 'Time sync', 'Fleet time source so readings line up across sites.'],
    ] as const).forEach(([id, name, desc], i) => {
      const t = serviceTile(-0.95, 0.75 + (4 - i) * 0.55, -3.5, -0.3);
      s.add(t.g, { id, name, group: 'Fleet operations', desc, rows: [['Runs on', 'Fleet gateway']] }, { ...fleet, labelAt: V(0, 0, 0.12) });
    });
    const cl = cloud(-6.4, 5.0, -4.8);
    s.add(cl, { id: 'cloud', name: 'Cloud edge', sub: 'Tunnel and access control', group: 'Fleet operations',
      desc: 'DNS, tunnel and access control for the operations dashboards. No Kit is ever published directly.', rows: [['Kit exposure', 'None by default']] }, { ...fleet, labelY: 1.4, shadow: false });

    // Links
    const link = (a: THREE.Vector3, b: THREE.Vector3, lift: number, color: number, layer: string, dots = 3, glow = false, dotColor?: number) => {
      const mid = a.clone().lerp(b, 0.5);
      mid.y += lift;
      return s.flow({ curve: new THREE.QuadraticBezierCurve3(a, mid, b), color, dotColor, radius: 0.045, speed: 0.14, dots, glow, layer });
    };
    const otA = link(V(9.7, 0.6, 2.6), V(10.0, 0.8, 5.6), 0.3, PAL.data, 'bench', 3, true);
    const otB = link(V(7.05, 1.3, -0.8), V(8.7, 0.6, 2.6), 0.4, PAL.data, 'bench', 3, true);
    link(V(6.6, 1.3, -0.8), V(4.6, 0.85, 3.6), 0.5, PAL.steel, 'bench', 3, false, 0xffffff);
    link(V(6.4, 1.3, -1.0), V(3.2, 0.6, -2.6), 0.4, PAL.steel, 'bench', 2, false, 0xffffff);
    const tail = link(V(2.6, 1.1, -2.6), V(-3.4, 3.1, -3.8), 2.6, PAL.accent, 'fleet', 3, true, 0xffffff);
    link(V(-3.4, 3.1, -3.8), V(-6.4, 4.4, -4.6), 1.0, PAL.steel, 'fleet', 2, false, PAL.accentSoft);

    // Fault scenario
    let fault = false;
    let t0 = performance.now();
    let listener: ((r: Reading[], status: string) => void) | null = null;
    const statusLed = kitM.leds.status.material as THREE.MeshStandardMaterial;
    const alarmBar = desk.bars[5].material as THREE.MeshBasicMaterial;
    const setFault = (on: boolean) => {
      fault = on;
      t0 = performance.now();
      sim.screenMat.map?.dispose();
      sim.screenMat.map = screenTexture(on ? SIM_FAULT : SIM_OK);
      sim.screenMat.needsUpdate = true;
      [otA, otB].forEach((f) => f.dots.forEach((d) => ((d.material as THREE.MeshBasicMaterial).color.setHex(on ? PAL.watch : PAL.data))));
    };
    const poll = () => {
      const k = fault ? Math.min((performance.now() - t0) / 6000, 1) : 0;
      const vib = 2.9 + k * 4.9 + (Math.random() - 0.5) * 0.2;
      const score = 0.12 + k * 0.79 + (Math.random() - 0.5) * 0.02;
      const rul = Math.round(214 - k * 177);
      const flagged = k > 0.55;
      statusLed.color.setHex(flagged ? PAL.watch : PAL.accent);
      statusLed.emissive.setHex(flagged ? PAL.watch : PAL.accent);
      alarmBar.color.setHex(flagged ? PAL.critical : PAL.data);
      s.setAlarm('console', flagged);
      s.setSub('console', flagged ? 'Alarm: G114 bearing fault' : 'Asset health view');
      s.setSub('kit', flagged ? 'Anomaly flagged' : 'Collecting');
      s.setSub('sim', fault ? 'Fault injected' : 'Four protocols');
      listener?.(
        [
          { label: 'Gearbox G114 vibration', value: vib.toFixed(2), unit: 'mm/s', tone: vib > 7.1 ? 'critical' : vib > 4.5 ? 'watch' : 'ok' },
          { label: 'Anomaly score', value: score.toFixed(2), unit: '', tone: score > 0.7 ? 'critical' : score > 0.4 ? 'watch' : 'ok' },
          { label: 'Remaining useful life', value: String(rul), unit: 'days', tone: rul < 60 ? 'watch' : 'ok' },
          { label: 'Kit health to centre', value: (2.3 + Math.random() * 0.5).toFixed(1), unit: 'kB/s', tone: 'ok' },
        ],
        flagged ? 'Alarm raised on the factory console; only Kit health goes to the centre' : 'Simulator polled every 1 s',
      );
    };
    poll();
    const timer = window.setInterval(poll, 1000);
    void tail;

    return {
      layers: [
        { id: 'bench', label: 'Factory side', color: '#4cd7f6' },
        { id: 'fleet', label: 'Fleet ops', color: '#f97316' },
      ],
      actions: [{ id: 'fault', label: 'Inject bearing fault', activeLabel: 'Clear fault' }],
      readingsTitle: 'Live from the Kit',
      onReadings: (fn) => {
        listener = fn;
        poll();
      },
      runAction: (_id, on) => {
        setFault(on);
        poll();
        return on
          ? { tone: 'warn', message: 'Bearing fault injected on gearbox G114. Watch vibration and the anomaly score climb; the Kit raises the alarm on the factory console. The fleet gateway still only sees Kit health.' }
          : { tone: 'ok', message: 'Fault cleared. The simulated gearbox returns to its baseline.' };
      },
      dispose: () => window.clearInterval(timer),
    };
  },
};

export const SCENES: Record<SceneDef['id'], SceneDef> = { plant, kit: kitBench, lab };
export { polyCurve };
