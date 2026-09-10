import React from 'react';

interface CapabilitiesPageProps {
  onScheduleScoping: () => void;
}

export const CapabilitiesPage: React.FC<CapabilitiesPageProps> = ({ onScheduleScoping }) => {
  return (
    <div className="w-full pb-16">
      {/* SECTION 1: HERO & KPI TILES */}
      <section className="max-w-[1440px] mx-auto px-6 pt-12 pb-16 w-full">
        <div className="flex flex-col items-start max-w-4xl">
          {/* Live Protocol Ping Chip */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-high/90 border border-outline-variant/40 shadow-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            <span className="font-['JetBrains_Mono'] text-xs text-secondary uppercase tracking-widest font-semibold">
              Deep-Tech Industrial Engineering &amp; AI Capabilities
            </span>
          </div>

          <h1 className="font-['Space_Grotesk'] text-4xl sm:text-5xl lg:text-6xl text-on-surface font-bold tracking-tight mb-6 leading-[1.12]">
            Full-Stack Capabilities: From Sensor Physics to{' '}
            <span className="text-primary-container bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent">
              GenAI Application Synthesis
            </span>
          </h1>

          <p className="font-['Geist'] text-lg sm:text-xl text-on-surface-variant max-w-3xl leading-relaxed mb-10">
            A deep dive into our core competencies spanning real-time deterministic edge telemetry, physics-guided machine learning, rapid AI prototyping, and mission-critical OT/IT convergence across global manufacturing topologies.
          </p>
        </div>

        {/* KPI Stat Strip: Bento Tile Style */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
          <div className="p-5 sm:p-6 rounded-2xl bg-surface-container-low/90 border border-outline-variant/30 backdrop-blur-md shadow-md flex flex-col justify-between">
            <div className="flex items-center justify-between text-secondary mb-2">
              <span className="font-['JetBrains_Mono'] text-xs uppercase tracking-wider font-semibold">Fieldbus Array</span>
              <span className="material-symbols-outlined text-[20px]">hub</span>
            </div>
            <span className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold text-on-surface tracking-tight my-1">30+</span>
            <span className="font-['Geist'] text-xs text-on-surface-variant">Supported PLC Protocols</span>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-surface-container-low/90 border border-outline-variant/30 backdrop-blur-md shadow-md flex flex-col justify-between">
            <div className="flex items-center justify-between text-primary mb-2">
              <span className="font-['JetBrains_Mono'] text-xs uppercase tracking-wider font-semibold">Deterministic SLA</span>
              <span className="material-symbols-outlined text-[20px]">speed</span>
            </div>
            <span className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold text-on-surface tracking-tight my-1">&lt; 10ms</span>
            <span className="font-['Geist'] text-xs text-on-surface-variant">Edge Ingestion Latency</span>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-surface-container-low/90 border border-outline-variant/30 backdrop-blur-md shadow-md flex flex-col justify-between">
            <div className="flex items-center justify-between text-tertiary mb-2">
              <span className="font-['JetBrains_Mono'] text-xs uppercase tracking-wider font-semibold">GenAI Speed</span>
              <span className="material-symbols-outlined text-[20px]">bolt</span>
            </div>
            <span className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold text-on-surface tracking-tight my-1">72 Hours</span>
            <span className="font-['Geist'] text-xs text-on-surface-variant">Prototype Validation Sprint</span>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-surface-container-low/90 border border-outline-variant/30 backdrop-blur-md shadow-md flex flex-col justify-between">
            <div className="flex items-center justify-between text-primary-fixed mb-2">
              <span className="font-['JetBrains_Mono'] text-xs uppercase tracking-wider font-semibold">Purdue Security</span>
              <span className="material-symbols-outlined text-[20px]">security</span>
            </div>
            <span className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold text-on-surface tracking-tight my-1">IEC 62443</span>
            <span className="font-['Geist'] text-xs text-on-surface-variant">Air-Gap Certified Architectures</span>
          </div>
        </div>
      </section>

      {/* SECTION 2: MISSION-CRITICAL TECHNICAL COMPETENCIES */}
      <section className="w-full bg-[#010f1f]/80 border-y border-outline-variant/20 py-16">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex flex-col mb-12">
            <span className="font-['JetBrains_Mono'] text-xs text-primary uppercase tracking-widest font-semibold mb-1">
              System Architecture Stack
            </span>
            <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl text-on-surface font-bold">
              Mission-Critical Technical Competencies
            </h2>
          </div>

          <div className="space-y-8">
            {/* Capability Pillar 1: RUL Physics */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 lg:p-10 rounded-2xl bg-[#0d1c2d]/90 border border-outline-variant/30 backdrop-blur-xl shadow-xl items-center">
              <div className="lg:col-span-7 flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2.5 py-1 rounded bg-surface-container text-primary font-['JetBrains_Mono'] text-xs font-semibold">
                    CAP-01 // RUL_PHYSICS
                  </span>
                  <span className="font-['Geist'] text-xs sm:text-sm text-on-surface-variant">
                    Vibration, Thermography &amp; PINN
                  </span>
                </div>

                <h3 className="font-['Space_Grotesk'] text-2xl sm:text-3xl text-on-surface font-bold mb-4">
                  AI Prediction for Machine Lifetime &amp; Degradation (RUL Prognostics)
                </h3>

                <p className="font-['Geist'] text-sm sm:text-base text-on-surface-variant leading-relaxed mb-6">
                  We bridge raw mechanics with algorithmic intelligence by pairing Physics-Informed Neural Networks (PINNs) with empirical high-frequency shop floor telemetry. Our pipelines extract real-time Fourier and Wavelet decompositions to detect anomalies long before thermal or mechanical failure.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-surface-container/60 border border-outline-variant/20 shadow-sm">
                    <span className="block font-['Space_Grotesk'] text-sm text-on-surface font-semibold mb-1">
                      Algorithmic Physics
                    </span>
                    <p className="font-['Geist'] text-xs text-on-surface-variant leading-relaxed">
                      PINNs, FFT spectral vibration analysis, finite element thermal fatigue decay, harmonic order tracking.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-surface-container/60 border border-outline-variant/20 shadow-sm">
                    <span className="block font-['Space_Grotesk'] text-sm text-on-surface font-semibold mb-1">
                      Supported Hardware
                    </span>
                    <p className="font-['Geist'] text-xs text-on-surface-variant leading-relaxed">
                      Triaxial piezo accelerometers, RTD temperature arrays, acoustic emissions, and Motor Current Signature Analysis (MCSA).
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-secondary font-['JetBrains_Mono'] text-xs">
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-primary">check_circle</span>
                    94.2% Mean Diagnostic Confidence
                  </span>
                  <span className="hidden sm:inline opacity-40">•</span>
                  <span>ISO 10816-3 Vibration Severity Bounds</span>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col gap-4">
                {/* Simulated FFT / RUL Curve Graph Visual */}
                <div className="p-5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-inner flex flex-col">
                  <div className="flex items-center justify-between pb-2 mb-2 text-on-surface-variant font-['JetBrains_Mono'] text-xs border-b border-outline-variant/20">
                    <span>RUL DEGRADATION SPECTRUM [CH-4]</span>
                    <span className="text-primary animate-pulse font-semibold">4.28 kHz PEAK</span>
                  </div>

                  <svg className="w-full h-36 text-secondary" fill="none" viewBox="0 0 360 120">
                    <path d="M 0 100 Q 30 95, 60 70 T 120 85 T 180 30 T 240 60 T 300 15 T 360 45" stroke="currentColor" strokeLinecap="round" strokeWidth="2"></path>
                    <path d="M 0 110 Q 40 105, 80 90 T 160 95 T 240 70 T 320 50 T 360 60" stroke="#f97316" strokeDasharray="4 4" strokeWidth="1.5"></path>
                    <circle cx="180" cy="30" fill="#f97316" r="4"></circle>
                    <circle cx="300" cy="15" fill="currentColor" r="4"></circle>
                  </svg>

                  <div className="flex items-center justify-between pt-2 text-on-surface-variant font-['JetBrains_Mono'] text-xs border-t border-outline-variant/20">
                    <span>Confidence: 94.2%</span>
                    <span className="text-primary font-semibold">Estimated RUL: 412 Operating Hours</span>
                  </div>
                </div>

                <div className="h-40 rounded-xl overflow-hidden shadow-sm relative border border-outline-variant/30">
                  <img
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDH2JBl-_SUpyoo2kfen7aLRGobxg-swl-G9etEa184DL3JSgo2DFng52ogKuFeiDYa0JvpsG3QDcbV7aPECNEDW-1YehBqOaEqsUGL1Fs1HL2jaioCVFUz5oWk7WKwwjnyNk9M4V3tYSjk5Z2SotfAIjaVXrhDtQjau7ZTh7ZMzsKdf-o8ZF_Jgn5kMe7BBIJjybcU4a2YXyDWXHvo1CsbtVvXgoPKVHPp9ECUo_HvQHjoz_uhdpsxFQ"
                    alt="High-tech industrial bearing monitor with glowing sensor probes and laser diagnostic line"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#051424] via-transparent to-transparent"></div>
                  <div className="absolute bottom-2.5 left-3.5 font-['JetBrains_Mono'] text-[11px] text-on-surface/90 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                    <span>Live Sensor Probes (Bonfiglioli Plant 04)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Capability Pillar 2: GenAI Synthesis */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 lg:p-10 rounded-2xl bg-[#0d1c2d]/90 border border-outline-variant/30 backdrop-blur-xl shadow-xl items-center">
              <div className="lg:col-span-7 flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2.5 py-1 rounded bg-surface-container text-secondary font-['JetBrains_Mono'] text-xs font-semibold">
                    CAP-02 // GENAI_SYNTHESIS
                  </span>
                  <span className="font-['Geist'] text-xs sm:text-sm text-on-surface-variant">
                    Rapid Ergonomics &amp; Simulator Sandboxes
                  </span>
                </div>

                <h3 className="font-['Space_Grotesk'] text-2xl sm:text-3xl text-on-surface font-bold mb-4">
                  AI-Accelerated Application Prototyping &amp; Rapid Validation
                </h3>

                <p className="font-['Geist'] text-sm sm:text-base text-on-surface-variant leading-relaxed mb-6">
                  Traditional SCADA/MES overhauls stall under 6-to-12-month requirement cycles. Kalium applies generative engineering models and digital twin simulators to synthesize, test, and deploy industrial-grade operator applications within a 72-hour validation sprint.
                </p>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-surface-container/60 border border-outline-variant/20">
                    <span className="material-symbols-outlined text-primary shrink-0 mt-0.5">developer_board</span>
                    <div>
                      <span className="font-['Space_Grotesk'] text-sm text-on-surface font-semibold block">Frontline Ergonomic Synthesis</span>
                      <span className="font-['Geist'] text-xs sm:text-sm text-on-surface-variant">
                        Generates human-in-the-loop interfaces adhering to high-stress control room standards (ISA-101 compliance).
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-surface-container/60 border border-outline-variant/20">
                    <span className="material-symbols-outlined text-primary shrink-0 mt-0.5">psychology</span>
                    <div>
                      <span className="font-['Space_Grotesk'] text-sm text-on-surface font-semibold block">Digital Twin Stress Engine</span>
                      <span className="font-['Geist'] text-xs sm:text-sm text-on-surface-variant">
                        Injects synthetic anomalies to guarantee SCADA/HMI resilience prior to burning PLC logic into production.
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-tertiary font-['JetBrains_Mono'] text-xs">
                  <span>Sprint Velocity: 72 Hours to Working Build</span>
                  <span className="hidden sm:inline opacity-40">•</span>
                  <span>100% Zero-Disruption Staging Emulators</span>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-center">
                <div className="h-64 rounded-xl overflow-hidden shadow-sm relative border border-outline-variant/30">
                  <img
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCE2zIRC74y2AYltzM3EVw6D-toVZumRSzYkKcR0Mw9RZWd9l-VSuuUmOhiaRxKgcd2jWxGKPjQ7ahM1-bFC7s_eVzxNln4n9RBlKOiJIrzxYsynBnnzKOVsj46ISc5Igd391XB96c8LgdN0kIAmX9ijH65WR9n0V4JYOydX8Wrd_C1zyuaQAX3_1Xpyo4qQzSEX6T-Na9QTts7j_5HRspAnY-2lmsLwwo1r4-ocJhIGuEsW68U58Lgzw"
                    alt="Control room operator synthesizing digital twin automation dashboard on high-res displays"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#051424] via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between font-['JetBrains_Mono'] text-xs text-on-surface">
                    <span className="text-secondary font-semibold">ISA-101 HMI Synthesizer</span>
                    <span className="text-primary">Ready in 72h</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Capability Pillar 3: UNS Topology */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 lg:p-10 rounded-2xl bg-[#0d1c2d]/90 border border-outline-variant/30 backdrop-blur-xl shadow-xl items-center">
              <div className="lg:col-span-7 flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2.5 py-1 rounded bg-surface-container text-primary font-['JetBrains_Mono'] text-xs font-semibold">
                    CAP-03 // UNS_TOPOLOGY
                  </span>
                  <span className="font-['Geist'] text-xs sm:text-sm text-on-surface-variant">
                    High-Throughput Edge &amp; MQTT Sparkplug B
                  </span>
                </div>

                <h3 className="font-['Space_Grotesk'] text-2xl sm:text-3xl text-on-surface font-bold mb-4">
                  High-Throughput Edge Ingestion &amp; Unified Namespace (UNS)
                </h3>

                <p className="font-['Geist'] text-sm sm:text-base text-on-surface-variant leading-relaxed mb-6">
                  Eliminate point-to-point industrial spaghetti. We architect event-driven Unified Namespaces structured on ISA-95 hierarchical standards, decoupling shop floor publishers from enterprise consumers via scalable MQTT brokers and OPC-UA nodes.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-surface-container/60 border border-outline-variant/20">
                    <span className="font-['Space_Grotesk'] text-sm text-on-surface font-semibold block mb-1">
                      ISA-95 Hierarchy
                    </span>
                    <p className="font-['Geist'] text-xs text-on-surface-variant leading-relaxed">
                      Enterprise &gt; Site &gt; Area &gt; Line &gt; Cell semantic payload definitions using MQTT Sparkplug B protocol.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-surface-container/60 border border-outline-variant/20">
                    <span className="font-['Space_Grotesk'] text-sm text-on-surface font-semibold block mb-1">
                      Zero Data Loss Edge Cache
                    </span>
                    <p className="font-['Geist'] text-xs text-on-surface-variant leading-relaxed">
                      Autonomous local SQLite/Timescale spooling buffers data during WAN disconnects with automated sync.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-primary font-['JetBrains_Mono'] text-xs">
                  <span className="material-symbols-outlined text-[16px]">verified</span>
                  <span>Sparkplug B Certified Compliance • Sub-10ms Edge Ingestion</span>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-center">
                {/* Hierarchy Visualization Terminal */}
                <div className="p-5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-inner font-['JetBrains_Mono'] text-xs text-on-surface-variant space-y-2">
                  <div className="text-secondary pb-1 border-b border-outline-variant/20 font-semibold">
                    # UNIFIED NAMESPACE SPARKPLUG B TREE
                  </div>
                  <div className="text-on-surface">spBv1.0 / Kalium_Plant_01 / Area_Press / Line_04</div>
                  <div className="pl-4 text-primary font-medium">• DDATA: Hydraulic_Pressure: 218.4 bar</div>
                  <div className="pl-4 text-primary font-medium">• DDATA: Motor_Current_RMS: 44.1 A</div>
                  <div className="pl-4 text-primary font-medium">• DDATA: Vibration_Z_RMS: 2.11 mm/s</div>
                  <div className="text-on-surface pt-2">spBv1.0 / Kalium_Plant_01 / Area_Assembly / Cell_02</div>
                  <div className="pl-4 text-secondary font-medium">• DBIRTH: Node_Status: ONLINE (Cert: IEC-62443)</div>
                  <div className="pt-2 text-on-surface-variant border-t border-outline-variant/20 text-[11px]">
                    Broker Latency: 4.8ms | Ingestion Throughput: 120k msg/sec
                  </div>
                </div>
              </div>
            </div>

            {/* Capability Pillar 4 & 5: Side-by-side Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* CAP-04: Low Code Automation */}
              <div className="p-6 sm:p-8 rounded-2xl bg-[#0d1c2d]/90 border border-outline-variant/30 backdrop-blur-xl shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded bg-surface-container text-secondary font-['JetBrains_Mono'] text-xs font-semibold">
                      CAP-04 // LOW_CODE_AUTOMATION
                    </span>
                  </div>

                  <h3 className="font-['Space_Grotesk'] text-xl sm:text-2xl text-on-surface font-bold mb-3">
                    PowerPlatform &amp; Low-Code Industrial Engineering
                  </h3>

                  <p className="font-['Geist'] text-sm text-on-surface-variant leading-relaxed mb-6">
                    Bridging shop floor workers with enterprise core. We build rugged, responsive tablet applications on Microsoft Dataverse with integrated barcode/RFID vision, automated robotic RPA triggers, and strict compliance signatures.
                  </p>

                  <ul className="space-y-3 mb-6 text-on-surface-variant font-['Geist'] text-xs sm:text-sm">
                    <li className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-secondary text-[18px]">verified_user</span>
                      <span>FDA 21 CFR Part 11 &amp; ISO compliant digital e-signatures</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-secondary text-[18px]">touch_app</span>
                      <span>Ruggedized touch controls for greasy, gloved operator usage</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-secondary text-[18px]">sync_alt</span>
                      <span>Bi-directional synchronization with SAP S/4HANA &amp; Dynamics 365</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-outline-variant/20 flex items-center justify-between text-secondary font-['JetBrains_Mono'] text-xs">
                  <span>Frontline Turnaround: -65% Paperwork Lag</span>
                  <span className="material-symbols-outlined text-[18px]">inventory</span>
                </div>
              </div>

              {/* CAP-05: OT Cybersecurity */}
              <div className="p-6 sm:p-8 rounded-2xl bg-[#0d1c2d]/90 border border-outline-variant/30 backdrop-blur-xl shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded bg-surface-container text-primary font-['JetBrains_Mono'] text-xs font-semibold">
                      CAP-05 // OT_CYBERSECURITY
                    </span>
                  </div>

                  <h3 className="font-['Space_Grotesk'] text-xl sm:text-2xl text-on-surface font-bold mb-3">
                    Turnkey OT/IT Convergence &amp; Industrial Cybersecurity
                  </h3>

                  <p className="font-['Geist'] text-sm text-on-surface-variant leading-relaxed mb-6">
                    Harmonizing strict industrial operations with cloud scale without compromising plant floor safety. Full adherence to the Purdue Reference Model with zero-trust network architectures and unidirectional security gateways.
                  </p>

                  <ul className="space-y-3 mb-6 text-on-surface-variant font-['Geist'] text-xs sm:text-sm">
                    <li className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-primary text-[18px]">security</span>
                      <span>Purdue Model (PERA) Zone &amp; Conduit Segmentation</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-primary text-[18px]">vpn_lock</span>
                      <span>Hardware Data Diodes: Physical TX-only optical air gaps</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-primary text-[18px]">policy</span>
                      <span>NIST SP 800-82 &amp; IEC 62443-3-3 SL-4 compliance verification</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-outline-variant/20 flex items-center justify-between text-primary font-['JetBrains_Mono'] text-xs">
                  <span>Zero OT Perimeter Breaches</span>
                  <span className="material-symbols-outlined text-[18px]">shield</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: INTEROPERABILITY WITHOUT FRICTION */}
      <section className="max-w-[1440px] mx-auto px-6 py-16 w-full">
        <div className="flex flex-col mb-12">
          <span className="font-['JetBrains_Mono'] text-xs text-secondary uppercase tracking-widest font-semibold mb-1">
            Zero Rip-and-Replace
          </span>
          <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl text-on-surface font-bold">
            Interoperability Without Friction
          </h2>
          <p className="font-['Geist'] text-base text-on-surface-variant max-w-3xl mt-2 leading-relaxed">
            We ingest data natively from existing brownfield assets without forcing expensive PLC hardware replacements or disrupting active production cycles.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Quad 1: Fieldbus */}
          <div className="p-6 rounded-2xl bg-surface-container-low/90 border border-outline-variant/30 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-primary mb-4">
                <span className="material-symbols-outlined text-[20px]">router</span>
                <span className="font-['Space_Grotesk'] text-lg font-bold text-on-surface">Industrial Fieldbus</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  'Siemens Profinet S7',
                  'Rockwell EtherNet/IP CIP',
                  'Beckhoff TwinCAT ADS',
                  'Modbus TCP / Serial',
                  'OPC-UA DA/HA',
                  'Fanuc FOCAS CNC',
                  'Euromap 63 / 77',
                ].map((item) => (
                  <span key={item} className="px-2.5 py-1 rounded-lg bg-surface-container font-['JetBrains_Mono'] text-xs text-on-surface-variant">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quad 2: Edge & Broker */}
          <div className="p-6 rounded-2xl bg-surface-container-low/90 border border-outline-variant/30 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-tertiary mb-4">
                <span className="material-symbols-outlined text-[20px]">lan</span>
                <span className="font-['Space_Grotesk'] text-lg font-bold text-on-surface">Edge &amp; Broker Infra</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  'Eclipse Mosquitto',
                  'EMQX Broker',
                  'Apache Kafka',
                  'Sparkplug B Protocol',
                  'Docker Containerd',
                  'K3s Lightweight K8s',
                  'TimescaleDB',
                ].map((item) => (
                  <span key={item} className="px-2.5 py-1 rounded-lg bg-surface-container font-['JetBrains_Mono'] text-xs text-on-surface-variant">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quad 3: AI & Analytics */}
          <div className="p-6 rounded-2xl bg-surface-container-low/90 border border-outline-variant/30 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-primary mb-4">
                <span className="material-symbols-outlined text-[20px]">query_stats</span>
                <span className="font-['Space_Grotesk'] text-lg font-bold text-on-surface">AI &amp; Analytics</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  'PyTorch (PINNs)',
                  'ONNX Edge Runtime',
                  'Scikit-learn',
                  'Grafana Industrial',
                  'Power BI Embedded',
                  'TensorRT Jetson',
                ].map((item) => (
                  <span key={item} className="px-2.5 py-1 rounded-lg bg-surface-container font-['JetBrains_Mono'] text-xs text-on-surface-variant">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quad 4: IT Core Connect */}
          <div className="p-6 rounded-2xl bg-surface-container-low/90 border border-outline-variant/30 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-secondary mb-4">
                <span className="material-symbols-outlined text-[20px]">corporate_fare</span>
                <span className="font-['Space_Grotesk'] text-lg font-bold text-on-surface">IT Core Connect</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  'SAP S/4HANA OData',
                  'Dynamics 365 F&O',
                  'Oracle Fusion ERP',
                  'AVEVA / OSIsoft PI',
                  'Rockwell FactoryTalk',
                ].map((item) => (
                  <span key={item} className="px-2.5 py-1 rounded-lg bg-surface-container font-['JetBrains_Mono'] text-xs text-on-surface-variant">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: 30-DAY PLANT INGESTION FRAMEWORK */}
      <section className="w-full bg-[#010f1f]/80 border-y border-outline-variant/20 py-16">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex flex-col mb-12">
            <span className="font-['JetBrains_Mono'] text-xs text-primary uppercase tracking-widest font-semibold mb-1">
              Systemic Execution Framework
            </span>
            <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl text-on-surface font-bold">
              30-Day Plant Ingestion to Production
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Phase 1 */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0d1c2d]/90 border border-outline-variant/30 shadow-sm flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-2 right-4 font-['Space_Grotesk'] text-4xl text-surface-container-highest/40 font-bold select-none">
                01
              </div>
              <div>
                <span className="inline-block px-2.5 py-1 rounded bg-surface-container text-primary font-['JetBrains_Mono'] text-xs font-semibold mb-4">
                  DAY 01 – 07
                </span>
                <h3 className="font-['Space_Grotesk'] text-xl sm:text-2xl text-on-surface font-bold mb-2">
                  Rapid Telemetry &amp; Topology Audit
                </h3>
                <p className="font-['Geist'] text-sm text-on-surface-variant leading-relaxed mb-6">
                  On-site or air-gapped network sniff to identify PLC protocols, bandwidth constraints, and physical sensor probe attachment locations.
                </p>
              </div>
              <div className="space-y-1.5 pt-4 border-t border-outline-variant/20 text-on-surface-variant font-['JetBrains_Mono'] text-xs">
                <div>• Tag extraction &amp; ISA-95 mapping</div>
                <div>• Cyber risk perimeter definition</div>
                <div>• Edge gateway placement plan</div>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0d1c2d]/90 border border-outline-variant/30 shadow-sm flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-2 right-4 font-['Space_Grotesk'] text-4xl text-surface-container-highest/40 font-bold select-none">
                02
              </div>
              <div>
                <span className="inline-block px-2.5 py-1 rounded bg-surface-container text-secondary font-['JetBrains_Mono'] text-xs font-semibold mb-4">
                  DAY 08 – 21
                </span>
                <h3 className="font-['Space_Grotesk'] text-xl sm:text-2xl text-on-surface font-bold mb-2">
                  AI Model Ingestion &amp; Sandbox
                </h3>
                <p className="font-['Geist'] text-sm text-on-surface-variant leading-relaxed mb-6">
                  Calibration of Physics-Informed Neural Networks and rapid 72-hour GenAI UI operator synthesis inside digital twin simulation sandboxes.
                </p>
              </div>
              <div className="space-y-1.5 pt-4 border-t border-outline-variant/20 text-on-surface-variant font-['JetBrains_Mono'] text-xs">
                <div>• Spectral FFT baseline calibration</div>
                <div>• Ergonomic frontline tablet build</div>
                <div>• Synthetic machine stress testing</div>
              </div>
            </div>

            {/* Phase 3 */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0d1c2d]/90 border border-outline-variant/30 shadow-sm flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-2 right-4 font-['Space_Grotesk'] text-4xl text-surface-container-highest/40 font-bold select-none">
                03
              </div>
              <div>
                <span className="inline-block px-2.5 py-1 rounded bg-surface-container text-primary font-['JetBrains_Mono'] text-xs font-semibold mb-4">
                  DAY 22 – 30
                </span>
                <h3 className="font-['Space_Grotesk'] text-xl sm:text-2xl text-on-surface font-bold mb-2">
                  Production Rollout &amp; SLA Lock
                </h3>
                <p className="font-['Geist'] text-sm text-on-surface-variant leading-relaxed mb-6">
                  Full deployment to the plant floor, live broker cutover, frontline operator handover, and activation of 99.99% deterministic monitoring.
                </p>
              </div>
              <div className="space-y-1.5 pt-4 border-t border-outline-variant/20 text-on-surface-variant font-['JetBrains_Mono'] text-xs">
                <div>• Zero-downtime hot broker sync</div>
                <div>• Operator certified shift drills</div>
                <div>• Continuous telemetry stream active</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: CTA BANNER */}
      <section className="max-w-[1440px] mx-auto px-6 py-16 w-full">
        <div className="p-8 sm:p-12 lg:p-14 rounded-3xl bg-[#0d1c2d]/90 border border-outline-variant/30 backdrop-blur-2xl shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary-container/15 rounded-full blur-3xl pointer-events-none"></div>
          <div className="flex flex-col max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-surface-container text-primary font-['JetBrains_Mono'] text-xs font-semibold mb-3 w-max">
              <span>ARCHITECTURAL ADVISORY</span>
            </div>
            <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl text-on-surface font-bold mb-3">
              Ready to Architect Your Plant's Deterministic Future?
            </h2>
            <p className="font-['Geist'] text-base text-on-surface-variant leading-relaxed">
              Engage directly with Kalium's Principal Systems Architects to assess your fieldbus infrastructure, telemetry throughput, and predictive AI roadmap.
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={onScheduleScoping}
              className="inline-flex items-center justify-center bg-gradient-to-r from-primary to-primary-container text-on-primary font-['Space_Grotesk'] text-base font-semibold px-8 py-3.5 rounded-xl shadow-lg hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
            >
              Schedule Scoping Workshop
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
