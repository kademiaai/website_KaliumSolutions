// All page copy and sample data lives here so it can be edited without touching layout code.
// Facts on this page come from the existing kaliumsolutions.tech site. Do not add statistics,
// client names or testimonials unless they are verified.

export const CONTACT_EMAIL = 'contact@kaliumsolutions.com';

export const NAV_LINKS = [
  { id: 'architecture', label: 'Architecture' },
  { id: 'capabilities', label: 'Capabilities' },
  { id: 'use-cases', label: 'Use cases' },
  { id: 'faq', label: 'FAQ' },
] as const;

export const PROTOCOLS = [
  'Siemens S7',
  'Rockwell EtherNet/IP',
  'Beckhoff ADS',
  'Modbus TCP',
  'OPC UA',
  'MQTT Sparkplug B',
];

// ---------- Hero sample dashboard (clearly labelled as sample data in the UI) ----------

export type Status = 'ok' | 'watch' | 'critical';

export interface Asset {
  id: string;
  name: string;
  signal: string;
  reading: string;
  status: Status;
  rulDays: number;
  rulRange: [number, number];
  unit: string;
  threshold: number;
  series: number[];
  finding: string;
  action: string;
}

export const ASSETS: Asset[] = [
  {
    id: 'G114',
    name: 'Palletizer gearbox',
    signal: 'Vibration',
    reading: '7.82 mm/s',
    status: 'watch',
    rulDays: 37,
    rulRange: [29, 46],
    unit: 'mm/s RMS',
    threshold: 7.1,
    series: [3.1, 3.2, 3.0, 3.3, 3.4, 3.3, 3.6, 3.5, 3.8, 3.9, 4.1, 4.0, 4.4, 4.6, 4.5, 4.9, 5.2, 5.1, 5.6, 5.9, 6.1, 6.0, 6.5, 6.8, 6.7, 7.0, 7.3, 7.2, 7.6, 7.82],
    finding: 'Bearing outer race defect, BPFO peak at 142.6 Hz',
    action: 'Replace output shaft bearing at the next planned stop',
  },
  {
    id: 'C002',
    name: 'Air compressor',
    signal: 'Temperature',
    reading: '92.4 °C',
    status: 'critical',
    rulDays: 9,
    rulRange: [6, 13],
    unit: '°C discharge',
    threshold: 88,
    series: [71.2, 71.8, 72.1, 71.6, 72.9, 73.4, 74.0, 73.7, 75.1, 75.8, 76.3, 77.0, 76.8, 78.2, 79.1, 79.6, 80.4, 81.7, 82.1, 83.0, 84.2, 84.9, 85.3, 86.6, 87.4, 88.3, 89.1, 90.2, 91.6, 92.4],
    finding: 'Rising discharge temperature, consistent with a fouled aftercooler',
    action: 'Inspect and clean the aftercooler within the week',
  },
  {
    id: 'F207',
    name: 'Oven exhaust fan',
    signal: 'Vibration',
    reading: '4.93 mm/s',
    status: 'watch',
    rulDays: 81,
    rulRange: [64, 103],
    unit: 'mm/s RMS',
    threshold: 7.1,
    series: [3.9, 4.0, 3.8, 4.1, 4.0, 4.2, 4.1, 4.3, 4.2, 4.4, 4.3, 4.5, 4.4, 4.3, 4.6, 4.5, 4.7, 4.6, 4.5, 4.7, 4.8, 4.7, 4.9, 4.8, 4.7, 4.9, 5.0, 4.9, 4.8, 4.93],
    finding: 'Slow rise at 1× running speed, likely imbalance from deposits',
    action: 'Clean impeller and recheck balance during the monthly stop',
  },
  {
    id: 'M301',
    name: 'Filler drive motor',
    signal: 'Vibration',
    reading: '2.14 mm/s',
    status: 'ok',
    rulDays: 214,
    rulRange: [187, 251],
    unit: 'mm/s RMS',
    threshold: 7.1,
    series: [2.2, 2.1, 2.3, 2.2, 2.0, 2.1, 2.2, 2.3, 2.1, 2.2, 2.0, 2.1, 2.3, 2.2, 2.1, 2.2, 2.0, 2.1, 2.2, 2.3, 2.1, 2.0, 2.2, 2.1, 2.3, 2.2, 2.1, 2.0, 2.2, 2.14],
    finding: 'Within baseline. No fault signature detected',
    action: 'No action needed',
  },
  {
    id: 'P027',
    name: 'CIP supply pump',
    signal: 'Current',
    reading: '18.6 A',
    status: 'ok',
    rulDays: 163,
    rulRange: [141, 190],
    unit: 'A motor current',
    threshold: 22.5,
    series: [18.1, 18.4, 18.2, 18.6, 18.3, 18.5, 18.2, 18.7, 18.4, 18.3, 18.6, 18.5, 18.2, 18.4, 18.7, 18.5, 18.3, 18.6, 18.4, 18.2, 18.5, 18.7, 18.4, 18.6, 18.3, 18.5, 18.4, 18.7, 18.5, 18.6],
    finding: 'Within baseline. Current signature stable',
    action: 'No action needed',
  },
];

// ---------- Architecture ----------

export const PIPELINE = [
  {
    key: 'collectors',
    title: 'Edge collectors',
    body: 'Poll PLCs and sensors on site and keep data in a local buffer when the network drops.',
    specs: ['S7, EtherNet/IP, ADS, Modbus', 'Clamp on CTs and vibration sensors', 'Store and forward buffer'],
  },
  {
    key: 'pipeline',
    title: 'Telemetry pipeline',
    body: 'Map tags into a unified namespace and stream them over MQTT Sparkplug B.',
    specs: ['Sparkplug B birth and death', 'Site / area / line / asset topics', 'Time series storage'],
  },
  {
    key: 'ml',
    title: 'ML engine',
    body: 'Learn a baseline per asset, score anomalies, and estimate remaining useful life.',
    specs: ['FFT and envelope spectra', 'Anomaly score per asset', 'RUL with confidence range'],
  },
  {
    key: 'dashboards',
    title: 'Dashboards and alerts',
    body: 'Rank assets by risk and push alerts and work orders to the systems that act on them.',
    specs: ['Asset health view', 'Power BI and Dataverse', 'SAP S/4HANA, Dynamics 365'],
  },
] as const;

export const COLLECTOR_YAML = `# edge/line-3/collector.yaml
site: binh-duong-plant-1
line: line-3
gateway: gw-l3-01

sources:
  - name: palletizer-plc
    driver: s7
    host: 10.20.3.15
    rack: 0
    slot: 1
    poll_ms: 100
    tags:
      G114.motor_current_a: DB12.DBD0
      G114.gearbox_temp_c: DB12.DBD4

  - name: g114-vibration
    driver: modbus-tcp
    host: 10.20.3.41
    poll_ms: 50
    registers:
      G114.vib_rms_mm_s: 30001

publish:
  protocol: sparkplug-b
  group: line-3
  buffer: store-and-forward`;

export const SPARKPLUG_TOPIC = 'spBv1.0/line-3/DDATA/gw-l3-01/G114';

export const SPARKPLUG_PAYLOAD = `{
  "timestamp": 1730712845123,
  "seq": 214,
  "metrics": [
    { "name": "vib_rms_mm_s",   "type": "Float", "value": 7.82 },
    { "name": "gearbox_temp_c", "type": "Float", "value": 68.4 },
    { "name": "anomaly_score",  "type": "Float", "value": 0.91 },
    { "name": "rul_days",       "type": "Int32", "value": 37 }
  ]
}`;

// ---------- Capabilities ----------

export const CAPABILITIES = [
  {
    key: 'pdm',
    title: 'Predictive maintenance',
    body: 'Vibration and current signatures are compared against each asset’s own baseline. When a pattern drifts, you see the likely fault and how many days of service remain, so the repair lands in a planned stop.',
    specs: ['Bearing, imbalance, misalignment and looseness signatures', 'Remaining useful life with a confidence range', 'Alarm thresholds per asset class'],
  },
  {
    key: 'bridge',
    title: 'Protocol bridge',
    body: 'Read data from Siemens, Rockwell, Beckhoff and Modbus controllers without rewriting validated PLC programs. Tags are mapped once into a shared namespace every system can use.',
    specs: ['S7, EtherNet/IP, ADS, Modbus TCP and RTU', 'OPC UA and MQTT Sparkplug B', 'External sensors where no PLC tag exists'],
  },
  {
    key: 'gitops',
    title: 'GitOps infrastructure',
    body: 'Collector settings, models and dashboards live in a Git repository. Every change is reviewed in a pull request and rolled out automatically, so you can trace what changed on site and roll it back.',
    specs: ['Declarative configuration per site and line', 'Review before anything reaches the floor', 'Rollback to any previous version'],
  },
  {
    key: 'edge',
    title: 'Edge orchestration',
    body: 'Containers run on industrial gateways at each site and keep collecting when the cloud link is down. Updates roll out per site, per line, or per gateway.',
    specs: ['Industrial gateways from Moxa or Advantech', 'Local buffering through network outages', 'Purdue model zone segmentation'],
  },
] as const;

export const TAGLINE =
  'Every motor, pump and gearbox on your line, measured continuously and ranked by how soon it needs attention.';

// ---------- Use cases ----------

export const USE_CASES = [
  {
    key: 'rotating',
    tag: 'Motors · pumps · fans · compressors',
    title: 'Rotating equipment health',
    measure: 'Triaxial vibration, motor current and bearing temperature, sampled continuously at the edge.',
    outcome: 'A fault type and the days of service left for each asset, so bearings and couplings are replaced in a scheduled stop instead of a breakdown.',
  },
  {
    key: 'downtime',
    tag: 'Packaging · bottling · conveyors',
    title: 'Unplanned downtime and micro stops',
    measure: 'Machine states from existing PLC tags, plus current transformers and photo eyes where tags are missing.',
    outcome: 'Every stop logged with a reason and duration, ranked by lost production time, without changing validated PLC code.',
  },
  {
    key: 'workflows',
    tag: 'Maintenance · quality · shift handover',
    title: 'Paper logs to digital workflows',
    measure: 'Inspection checklists, shift handover notes and work requests captured in Power Apps on the floor.',
    outcome: 'Structured records in Dataverse, linked to the asset and its sensor history, ready for audits and reporting.',
  },
] as const;

export const STEPS = [
  {
    title: 'Plant audit',
    body: 'We review your network layout, controllers and critical assets, and agree which line to instrument first.',
  },
  {
    title: 'Pilot on one line',
    body: 'Gateways and sensors are installed, tags are mapped, and baselines are learned from your own equipment.',
  },
  {
    title: 'Scale across sites',
    body: 'The proven configuration is copied to new lines and sites from Git instead of being rebuilt by hand.',
  },
] as const;

// ---------- FAQ ----------

export const FAQ = [
  {
    q: 'Which controllers and protocols do you support?',
    a: 'Siemens S7, Rockwell ControlLogix and SLC over EtherNet/IP, Beckhoff over ADS, Modbus TCP and RTU, OPC UA, and MQTT Sparkplug B. If your plant runs something else, list it in the demo request and we will review it during the audit.',
  },
  {
    q: 'Do you need to change our PLC programs?',
    a: 'No. Collectors read tags that already exist. Where a machine has no useful tags, we add external sensors such as clamp on current transformers or vibration sensors instead of touching validated PLC code.',
  },
  {
    q: 'What happens when the network or cloud link goes down?',
    a: 'Edge gateways keep collecting and store data locally, then forward it in order once the link is back. Sparkplug B birth and death messages tell every consumer which devices were offline and when.',
  },
  {
    q: 'Where do analytics and dashboards run?',
    a: 'Collection and first stage processing always run on site. Analytics and dashboards can run in your own cloud tenant or in a hybrid setup. We agree the split with your IT team during the audit.',
  },
  {
    q: 'How is OT network security handled?',
    a: 'Gateways are placed following the Purdue model, with zone and conduit segmentation between the control network and IT. The design is reviewed against IEC 62443 with your security team before anything is connected.',
  },
  {
    q: 'How does remaining useful life estimation work?',
    a: 'Each asset gets a baseline from its own healthy operation. Features such as RMS velocity, envelope spectra and current signature are tracked over time, and the model projects when the degradation trend will cross the alarm threshold. The result is shown in days, with a confidence range.',
  },
  {
    q: 'Can the data feed our existing tools?',
    a: 'Yes. Data is published to Power BI and Microsoft Dataverse, and alerts can open work orders in SAP S/4HANA or Dynamics 365.',
  },
  {
    q: 'How does a project start?',
    a: 'With a plant audit. We sign an NDA before any plant data is shared, review one line together, and propose a scoped pilot on that line.',
  },
] as const;

export const CONTROLLER_OPTIONS = [
  'Siemens S7',
  'Rockwell (EtherNet/IP)',
  'Beckhoff (ADS)',
  'Modbus TCP or RTU',
  'OPC UA or MQTT Sparkplug B',
  'Mixed or not sure',
];

export const DEMO_AGENDA = [
  'A walkthrough of the pipeline running on sample plant data',
  'A review of your controllers, network layout and critical assets',
  'A scoped proposal for a pilot on one line',
];
