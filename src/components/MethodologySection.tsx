import React from 'react';

export const MethodologySection: React.FC = () => {
  return (
    <section className="relative w-full py-space-4xl bg-surface-container-lowest overflow-hidden">
      {/* Center Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-secondary/5 blur-[160px] pointer-events-none"></div>

      <div className="relative max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-space-3xl">
          <div className="inline-flex items-center gap-space-xs px-space-md py-space-2xs rounded-full bg-surface-container-high/80 mb-space-md">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
            <span className="font-label-badge text-label-badge text-secondary uppercase tracking-widest">
              Methodology
            </span>
          </div>
          <h2 className="font-headline-lg text-headline-md lg:text-headline-lg text-on-surface max-w-3xl mb-space-sm tracking-tight">
            Engineered Precision at Every Stage
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
            Our end-to-end consulting framework ensures zero-disruption rollout, rigorous ISA-95 compliance, and tangible payback timelines.
          </p>
        </div>

        {/* Asymmetric 3-Card Mosaic (Heroic left panel + 2 stacked right panels) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-stretch">
          {/* Large Left Feature Card */}
          <div className="lg:col-span-6 relative flex flex-col justify-between bg-surface-container/70 rounded-2xl p-space-2xl backdrop-blur-xl shadow-xl overflow-hidden group hover:bg-surface-container transition-all duration-300">
            {/* Background Cyber Mesh Lines SVG */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <svg className="w-full h-full" fill="none" viewBox="0 0 400 400">
                <path d="M0 50 Q 200 150 400 50" stroke="#4cd7f6" strokeWidth="1.5"></path>
                <path d="M0 150 Q 200 250 400 150" stroke="#4cd7f6" strokeWidth="1.5"></path>
                <path d="M0 250 Q 200 350 400 250" stroke="#4cd7f6" strokeWidth="1.5"></path>
                <path d="M0 350 Q 200 450 400 350" stroke="#4cd7f6" strokeWidth="1.5"></path>
              </svg>
            </div>

            <div className="relative z-10 mb-space-2xl">
              <div className="w-14 h-14 rounded-2xl bg-surface-container-high flex items-center justify-center text-secondary mb-space-xl group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[32px]">architecture</span>
              </div>
              <div className="font-label-code text-label-code text-secondary mb-space-xs">
                PHASE 01 // AUDIT
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-space-md">
                Discovery &amp; Plant Maturity Assessment
              </h3>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                We execute comprehensive on-site OT physical audits, evaluate legacy protocol readiness (Modbus, Profinet, Ethernet/IP), and architect a rapid 4-week Proof-of-Value rollout tailored directly to bottlenecked lines.
              </p>
            </div>

            <div className="relative z-10 flex items-center justify-between pt-space-lg bg-surface-container-low/40 rounded-xl px-space-md py-space-sm border border-surface-container-highest/50">
              <span className="font-body-sm text-body-sm text-on-surface">
                Deliverable: Industrial Architecture Dossier
              </span>
              <span className="material-symbols-outlined text-secondary text-[20px]">
                verified
              </span>
            </div>
          </div>

          {/* Right 2 Stacked Cards */}
          <div className="lg:col-span-6 flex flex-col gap-space-xl justify-between">
            {/* Card 2 */}
            <div className="flex-1 flex flex-col justify-between bg-surface-container/70 hover:bg-surface-container rounded-2xl p-space-xl backdrop-blur-xl shadow-xl transition-all duration-300">
              <div>
                <div className="flex items-center justify-between mb-space-md">
                  <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[28px]">developer_board</span>
                  </div>
                  <span className="font-label-code text-label-code text-primary">
                    PHASE 02 // ROLLOUT
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">
                  Agile Deployment &amp; Edge Hardware Orchestration
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Commissioning hardened industrial gateways, edge virtualization nodes, and fail-safe fiber/cellular ring networks during planned maintenance windows without unplanned stops.
                </p>
              </div>
              <div className="pt-space-md font-label-code text-label-code text-on-surface-variant">
                Zero-Downtime Hot Cutover Protocol
              </div>
            </div>

            {/* Card 3 */}
            <div className="flex-1 flex flex-col justify-between bg-surface-container/70 hover:bg-surface-container rounded-2xl p-space-xl backdrop-blur-xl shadow-xl transition-all duration-300">
              <div>
                <div className="flex items-center justify-between mb-space-md">
                  <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined text-[28px]">support_agent</span>
                  </div>
                  <span className="font-label-code text-label-code text-secondary">
                    PHASE 03 // SUSTAIN
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">
                  Continuous Operator Empowerment &amp; SLA Support
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Frontline plant operator training, continuous algorithm telemetry recalibration, and 24/7 mission-critical response guaranteeing uninterrupted high-throughput processing.
                </p>
              </div>
              <div className="pt-space-md font-label-code text-label-code text-on-surface-variant">
                Deterministic 15-Min Response SLA Guarantee
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
