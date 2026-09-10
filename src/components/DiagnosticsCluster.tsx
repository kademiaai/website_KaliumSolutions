import React, { useState, useEffect } from 'react';

interface DiagnosticsClusterProps {
  onOpenCockpit: () => void;
}

export const DiagnosticsCluster: React.FC<DiagnosticsClusterProps> = ({ onOpenCockpit }) => {
  const [activeWindow, setActiveWindow] = useState('Real-time FFT');
  const [throughput, setThroughput] = useState(142450);
  const [activeWaveOffset, setActiveWaveOffset] = useState(0);
  const [showLogsModal, setShowLogsModal] = useState(false);

  // Live throughput jitter simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setThroughput(142000 + Math.floor(Math.random() * 950));
      setActiveWaveOffset((prev) => (prev + 1) % 10);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const timeRanges = ['100ms', '500ms', '1s', 'Real-time FFT'];

  return (
    <section id="solutions" className="max-w-[1440px] mx-auto px-6 py-12">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="font-['JetBrains_Mono'] text-xs text-primary uppercase tracking-widest font-semibold">
            Active Cluster Matrix
          </span>
          <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl text-on-surface font-semibold mt-1">
            Production Ingestion &amp; Diagnostics
          </h2>
        </div>
        <div className="hidden md:flex items-center gap-2 font-['JetBrains_Mono'] text-xs text-on-surface-variant">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span>Sparkplug B Protocol Rev 1.0</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        {/* CARD 1: Real-Time Vibration Prognostics & Spectral FFT (Span 8 Cols) */}
        <div className="md:col-span-12 lg:col-span-8 p-6 sm:p-8 rounded-2xl bg-[#0d1c2d]/90 border border-outline-variant/30 backdrop-blur-2xl shadow-xl flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-primary-container/10 rounded-full blur-[90px] pointer-events-none"></div>

          <div>
            {/* Card Header */}
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2 py-0.5 rounded bg-surface-container-highest font-['JetBrains_Mono'] text-[11px] text-primary uppercase">
                    Edge Node: BF-04-A
                  </span>
                  <span className="font-['JetBrains_Mono'] text-xs text-on-surface-variant">
                    Purdue L1 Vibration Telemetry
                  </span>
                </div>
                <h3 className="font-['Space_Grotesk'] text-xl sm:text-2xl text-on-surface font-semibold">
                  Real-Time Vibration Prognostics &amp; Spectral FFT
                </h3>
                <p className="font-['Geist'] text-xs sm:text-sm text-on-surface-variant mt-1">
                  Bonfiglioli Plant 04 • Heavy Extrusion Gearbox Motor Array
                </p>
              </div>

              <div className="flex items-center gap-2 bg-surface-container-highest/80 border border-outline-variant/30 px-3 py-1.5 rounded-xl shadow-sm">
                <span className="material-symbols-outlined text-primary text-[18px]">ecg_heart</span>
                <span className="font-['JetBrains_Mono'] text-xs text-on-surface font-semibold">
                  RUL Health: 94.2%
                </span>
              </div>
            </div>

            {/* Key Indicators Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <div className="p-3.5 rounded-xl bg-surface-container-high/60 border border-outline-variant/20 shadow-inner">
                <div className="font-['JetBrains_Mono'] text-xs text-on-surface-variant">Advance Alert</div>
                <div className="font-['Space_Grotesk'] text-xl text-tertiary font-bold mt-0.5">48 Days</div>
                <div className="font-['Geist'] text-[11px] text-on-surface-variant">Lead time to fault</div>
              </div>

              <div className="p-3.5 rounded-xl bg-surface-container-high/60 border border-outline-variant/20 shadow-inner">
                <div className="font-['JetBrains_Mono'] text-xs text-on-surface-variant">Forecast Accuracy</div>
                <div className="font-['Space_Grotesk'] text-xl text-primary font-bold mt-0.5">98.4%</div>
                <div className="font-['Geist'] text-[11px] text-on-surface-variant">Physics-ML Model</div>
              </div>

              <div className="p-3.5 rounded-xl bg-surface-container-high/60 border border-outline-variant/20 shadow-inner">
                <div className="font-['JetBrains_Mono'] text-xs text-on-surface-variant">Tri-axial RMS</div>
                <div className="font-['Space_Grotesk'] text-xl text-on-surface font-bold mt-0.5">0.12 mm/s</div>
                <div className="font-['Geist'] text-[11px] text-primary">+4.2% vs cycle avg</div>
              </div>

              <div className="p-3.5 rounded-xl bg-surface-container-high/60 border border-outline-variant/20 shadow-inner">
                <div className="font-['JetBrains_Mono'] text-xs text-on-surface-variant">Unplanned Halts</div>
                <div className="font-['Space_Grotesk'] text-xl text-on-surface font-bold mt-0.5">0 Events</div>
                <div className="font-['Geist'] text-[11px] text-on-surface-variant">Last 180 Days</div>
              </div>
            </div>

            {/* Interactive Inline FFT Waveform Chart */}
            <div className="w-full bg-surface-container-lowest/90 border border-outline-variant/30 p-4 rounded-xl shadow-inner mb-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 font-['JetBrains_Mono'] text-xs text-on-surface-variant">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  <span>Harmonic Spectral Density (0 Hz - 4.8 kHz)</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-primary font-semibold">1,248 Hz Harmonic Peak (Safe Band)</span>
                  <span className="hidden sm:inline text-on-surface-variant/80">Sampling: 20kS/s</span>
                </div>
              </div>

              {/* Responsive SVG Data Waveform */}
              <div className="w-full h-44 relative overflow-hidden rounded-lg">
                <svg className="w-full h-full text-primary" fill="none" preserveAspectRatio="none" viewBox="0 0 760 170">
                  <line className="text-outline-variant/40" stroke="currentColor" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="760" y1="40" y2="40" />
                  <line className="text-outline-variant/30" stroke="currentColor" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="760" y1="90" y2="90" />
                  <line className="text-outline-variant/20" stroke="currentColor" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="760" y1="140" y2="140" />

                  <defs>
                    <linearGradient id="spectralGrad" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#4cd7f6" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#4cd7f6" stopOpacity="0.0" />
                    </linearGradient>
                    <linearGradient id="accentLineGrad" x1="0" x2="1" y1="0" y2="0">
                      <stop offset="0%" stopColor="#4cd7f6" />
                      <stop offset="50%" stopColor="#7bd0ff" />
                      <stop offset="100%" stopColor="#d0bcff" />
                    </linearGradient>
                  </defs>

                  <path
                    d={`M0,130 Q30,${128 - activeWaveOffset} 60,110 T120,${125 + activeWaveOffset} T180,85 T240,115 T300,${50 - activeWaveOffset} T360,135 T420,32 T480,95 T540,65 T600,120 T660,78 T720,105 L760,90 L760,170 L0,170 Z`}
                    fill="url(#spectralGrad)"
                  />
                  <path
                    d={`M0,130 Q30,${128 - activeWaveOffset} 60,110 T120,${125 + activeWaveOffset} T180,85 T240,115 T300,${50 - activeWaveOffset} T360,135 T420,32 T480,95 T540,65 T600,120 T660,78 T720,105 L760,90`}
                    fill="none"
                    stroke="url(#accentLineGrad)"
                    strokeWidth="2.5"
                  />

                  {/* Detected Peak Nodes */}
                  <circle className="fill-surface stroke-primary" cx="420" cy="32" r="5" strokeWidth="2" />
                  <circle className="fill-surface stroke-tertiary" cx="300" cy={50 - activeWaveOffset} r="4" strokeWidth="2" />
                  <circle className="fill-surface stroke-secondary" cx="180" cy="85" r="4" strokeWidth="2" />
                  <circle className="fill-surface stroke-primary" cx="540" cy="65" r="3.5" strokeWidth="2" />
                </svg>
              </div>

              {/* FFT Time Range Selector */}
              <div className="flex items-center justify-between mt-3 pt-2 border-t border-outline-variant/20 font-['JetBrains_Mono'] text-xs">
                <span className="text-on-surface-variant">FFT Snapshot Window</span>
                <div className="flex items-center gap-1.5 bg-surface-container p-1 rounded-lg">
                  {timeRanges.map((range) => (
                    <button
                      key={range}
                      onClick={() => setActiveWindow(range)}
                      className={`px-2.5 py-1 rounded text-[11px] transition-all ${
                        activeWindow === range
                          ? 'bg-primary text-on-primary font-semibold shadow-md'
                          : 'text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="pt-2 flex items-center justify-between text-xs text-on-surface-variant font-['JetBrains_Mono']">
            <span>Sensor Bridge: Piezoresistive Accelerometer (Tri-axial 100mV/g)</span>
            <span className="text-primary flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">check_circle</span>
              Calibrated ISO 10816-3
            </span>
          </div>
        </div>

        {/* CARD 2: Unified Namespace Broker (Span 4 Cols) */}
        <div className="md:col-span-6 lg:col-span-4 p-6 sm:p-8 rounded-2xl bg-[#0d1c2d]/90 border border-outline-variant/30 backdrop-blur-2xl shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="px-2 py-0.5 rounded bg-surface-container-highest font-['JetBrains_Mono'] text-[11px] text-primary uppercase">
                UNS Broker V2
              </span>
              <span className="font-['JetBrains_Mono'] text-xs text-primary font-semibold">
                Sparkplug B L3
              </span>
            </div>

            <h3 className="font-['Space_Grotesk'] text-xl text-on-surface font-semibold mb-1">
              Unified Namespace Broker
            </h3>
            <p className="font-['Geist'] text-xs text-on-surface-variant mb-4">
              Decoupling factory islands via MQTT &amp; event-driven state trees.
            </p>

            {/* Hierarchical Topic Tree Display */}
            <div className="p-3.5 rounded-xl bg-surface-container-lowest font-['JetBrains_Mono'] text-xs space-y-1.5 mb-4 border border-outline-variant/20 shadow-inner">
              <div className="text-on-surface-variant flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-primary">account_tree</span>
                <span>spBv1.0 / Kalium_Plant_01</span>
              </div>
              <div className="pl-6 text-on-surface-variant flex items-center gap-1">
                <span className="text-outline">└─</span>
                <span className="text-on-surface">Area_Bottling</span>
              </div>
              <div className="pl-12 text-primary font-semibold flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <span className="text-outline">└─</span>
                  <span>Line_04/Filler_PLC</span>
                </span>
                <span className="text-[10px] text-tertiary bg-surface-container-high px-1.5 py-0.5 rounded">
                  20ms pub
                </span>
              </div>
            </div>

            {/* Ingestion Metrics Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between font-['JetBrains_Mono'] text-xs">
                <span className="text-on-surface-variant">Throughput Load</span>
                <span className="text-primary font-bold">{throughput.toLocaleString()} msg/s</span>
              </div>
              <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-tertiary rounded-full w-3/4 animate-pulse"></div>
              </div>
              <div className="flex items-center justify-between font-['Geist'] text-xs text-on-surface-variant pt-0.5">
                <span>Packet Drop: 0.00%</span>
                <span className="text-on-surface font-semibold">QoS 1 Guaranteed</span>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-6 bg-surface-container-high/40 -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 p-4 flex items-center justify-between border-t border-outline-variant/20">
            <span className="font-['JetBrains_Mono'] text-xs text-on-surface-variant">Ecosystem Bridged:</span>
            <span className="font-['JetBrains_Mono'] text-xs text-on-surface font-semibold">
              Siemens S7 • Beckhoff ADS
            </span>
          </div>
        </div>

        {/* CARD 3: Frontline & HACCP Compliance (Span 4 Cols) */}
        <div className="md:col-span-6 lg:col-span-4 p-6 sm:p-8 rounded-2xl bg-[#0d1c2d]/90 border border-outline-variant/30 backdrop-blur-2xl shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="px-2 py-0.5 rounded bg-surface-container-highest font-['JetBrains_Mono'] text-[11px] text-secondary uppercase">
                Pharma &amp; Dairy
              </span>
              <span className="material-symbols-outlined text-secondary text-[20px]">verified</span>
            </div>

            <h3 className="font-['Space_Grotesk'] text-xl text-on-surface font-semibold mb-1">
              Frontline &amp; HACCP Compliance
            </h3>
            <p className="font-['Geist'] text-xs text-on-surface-variant mb-4">
              Automated digital travelers replace paper checklists for FrieslandCampina clean-in-place cycles.
            </p>

            <div className="p-4 rounded-xl bg-surface-container-highest/60 border border-outline-variant/20 mb-4 space-y-2.5 shadow-inner">
              <div className="flex items-center justify-between">
                <span className="font-['Geist'] text-xs text-on-surface">CIP Turnaround Time</span>
                <span className="font-['Space_Grotesk'] text-lg text-primary font-bold">-65%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-['Geist'] text-xs text-on-surface">FDA/HACCP First-Pass Audit</span>
                <span className="font-['Space_Grotesk'] text-lg text-secondary font-bold">100%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-['Geist'] text-xs text-on-surface">Operator Validation Lag</span>
                <span className="font-['Space_Grotesk'] text-lg text-on-surface font-bold">&lt; 3.0s</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-surface-container-lowest/80 border border-outline-variant/20 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[18px]">terminal</span>
              </div>
              <div className="font-['Geist'] text-xs text-on-surface-variant">
                Direct OPC-UA latching guarantees raw batch records cannot be altered post-execution.
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-secondary font-['JetBrains_Mono'] text-xs">
            <span>Audit Trail: Immutable SHA-256</span>
            <span className="material-symbols-outlined text-[16px]">lock</span>
          </div>
        </div>

        {/* CARD 4: Micro-Stoppage Elimination (Heineken Canning) (Span 4 Cols) */}
        <div className="md:col-span-6 lg:col-span-4 p-6 sm:p-8 rounded-2xl bg-[#0d1c2d]/90 border border-outline-variant/30 backdrop-blur-2xl shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="px-2 py-0.5 rounded bg-surface-container-highest font-['JetBrains_Mono'] text-[11px] text-primary uppercase">
                CPG &amp; High-Speed
              </span>
              <span className="font-['JetBrains_Mono'] text-xs text-on-surface-variant">
                Line Speed: 1,200 CPM
              </span>
            </div>

            <h3 className="font-['Space_Grotesk'] text-xl text-on-surface font-semibold mb-1">
              Micro-Stoppage Elimination
            </h3>
            <p className="font-['Geist'] text-xs text-on-surface-variant mb-4">
              High-speed optical sensors triangulate jam causes in sub-200ms before back-pressure cascades.
            </p>

            <div className="space-y-2.5 mb-4">
              <div className="flex items-center justify-between font-['Geist'] text-xs">
                <span className="text-on-surface-variant">Packaging OEE Uplift</span>
                <span className="text-primary font-bold font-['Space_Grotesk'] text-lg">+14.2%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
                <div className="h-full bg-primary rounded-full w-[84%]"></div>
              </div>
              <div className="flex items-center justify-between font-['Geist'] text-xs pt-1">
                <span className="text-on-surface-variant">Stoppage Triangulation Speed</span>
                <span className="text-on-surface font-semibold">&lt; 185 ms</span>
              </div>
              <div className="flex items-center justify-between font-['Geist'] text-xs">
                <span className="text-on-surface-variant">Daily Saved Output</span>
                <span className="text-tertiary font-semibold">+18,400 Units</span>
              </div>
            </div>

            <div className="rounded-xl bg-surface-container-lowest p-3 border border-outline-variant/20 flex items-center justify-between">
              <span className="font-['JetBrains_Mono'] text-xs text-on-surface-variant">Target Line:</span>
              <span className="font-['JetBrains_Mono'] text-xs text-on-surface font-bold">Heineken VNM Can-03</span>
            </div>
          </div>

          <button
            onClick={() => setShowLogsModal(true)}
            className="mt-4 flex items-center gap-1.5 text-primary font-['Space_Grotesk'] text-sm hover:underline text-left"
          >
            <span>Inspect Stoppage Logs</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>

        {/* CARD 5: Zero-Trust IEC 62443 Security Conduit (Span 4 Cols) */}
        <div className="md:col-span-6 lg:col-span-4 p-6 sm:p-8 rounded-2xl bg-[#0d1c2d]/90 border border-outline-variant/30 backdrop-blur-2xl shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="px-2 py-0.5 rounded bg-surface-container-highest font-['JetBrains_Mono'] text-[11px] text-secondary uppercase">
                OT Cybersecurity
              </span>
              <span className="material-symbols-outlined text-primary text-[20px]">security</span>
            </div>

            <h3 className="font-['Space_Grotesk'] text-xl text-on-surface font-semibold mb-1">
              Zero-Trust IEC 62443 Security Conduit
            </h3>
            <p className="font-['Geist'] text-xs text-on-surface-variant mb-4">
              Physical hardware data diodes isolate Purdue Model L2 deterministic networks from public enterprise clouds.
            </p>

            <div className="p-4 rounded-xl bg-surface-container-highest/60 border border-outline-variant/20 space-y-2 mb-4 shadow-inner">
              <div className="flex items-center justify-between">
                <span className="font-['Geist'] text-xs text-on-surface-variant">Data Diode Hardware Link</span>
                <span className="font-['JetBrains_Mono'] text-xs text-primary font-bold">Optical Diode (TX Only)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-['Geist'] text-xs text-on-surface-variant">Purdue Isolation</span>
                <span className="font-['JetBrains_Mono'] text-xs text-on-surface font-bold">L2 Air-Gapped</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-['Geist'] text-xs text-on-surface-variant">Security Perimeter Threats</span>
                <span className="font-['JetBrains_Mono'] text-xs text-secondary font-bold">0 Detected</span>
              </div>
            </div>

            <div className="flex items-center gap-2 font-['Geist'] text-xs text-on-surface-variant">
              <span className="material-symbols-outlined text-[16px] text-tertiary">check_circle</span>
              <span>Encrypted mTLS 1.3 token rotation every 60s.</span>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-on-surface-variant font-['JetBrains_Mono'] text-xs">
            <span>IEC 62443-3-3 SL-4 Certified</span>
            <span className="material-symbols-outlined text-[16px] text-primary">verified_user</span>
          </div>
        </div>
      </div>

      {/* Stoppage Logs Modal */}
      {showLogsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-surface-container-low border border-outline-variant/40 p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">analytics</span>
                <h4 className="font-['Space_Grotesk'] text-lg text-on-surface font-bold">
                  Heineken VNM Can-03 Micro-Stoppage Audit
                </h4>
              </div>
              <button
                onClick={() => setShowLogsModal(false)}
                className="p-1 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="bg-surface-container-lowest p-4 rounded-xl font-['JetBrains_Mono'] text-xs space-y-2 max-h-64 overflow-y-auto">
              <div className="text-on-surface-variant border-b border-outline-variant/20 pb-1 flex justify-between">
                <span>[TIMESTAMP]</span>
                <span>[CAUSE &amp; DURATION]</span>
                <span>[RESOLUTION]</span>
              </div>
              <div className="flex justify-between text-primary">
                <span>12:44:02.109</span>
                <span>Can seam feed jitter (142ms)</span>
                <span className="text-tertiary">Triangulated &amp; Auto-Indexed</span>
              </div>
              <div className="flex justify-between text-on-surface">
                <span>12:41:18.892</span>
                <span>Infeed starwheel pressure drift (180ms)</span>
                <span className="text-secondary">VFD Speed Compensated</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>12:35:05.421</span>
                <span>Cap feeder optic sensor debounce (95ms)</span>
                <span className="text-primary">Nominal Recovery</span>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowLogsModal(false)}
                className="px-4 py-2 rounded-xl bg-surface-container-high text-on-surface text-xs font-semibold hover:bg-surface-container-highest"
              >
                Close Audit
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
