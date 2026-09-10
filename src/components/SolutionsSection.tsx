import React from 'react';

interface SolutionsSectionProps {
  onSelectSolution?: (title: string) => void;
  onNavigateCapabilities?: () => void;
}

export const SolutionsSection: React.FC<SolutionsSectionProps> = ({
  onSelectSolution,
  onNavigateCapabilities,
}) => {
  return (
    <section className="relative w-full py-space-4xl bg-surface" id="solutions">
      <div className="max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-space-3xl">
          <div className="inline-flex items-center gap-space-xs px-space-md py-space-2xs rounded-full bg-surface-container-high/80 mb-space-md">
            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
            <span className="font-label-badge text-label-badge text-primary uppercase tracking-widest">
              Our Core Offerings
            </span>
          </div>
          <h2 className="font-headline-lg text-headline-md lg:text-headline-lg text-on-surface max-w-3xl mb-space-sm tracking-tight">
            Architected for Shop Floor to Top Floor Excellence
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
            From sensor bus instrumentation to C-suite analytics, our modular capability matrix ensures high-velocity, deterministic plant transformation.
          </p>
        </div>

        <div className="flex flex-col gap-space-xl">
          {/* Top Row: 2 Heroic Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-xl">
            {/* Card 1 */}
            <div
              onClick={() => {
                if (onSelectSolution) onSelectSolution('Industrial IoT & Edge Telemetry');
                else if (onNavigateCapabilities) onNavigateCapabilities();
              }}
              className="group relative flex flex-col justify-between bg-surface-container/60 hover:bg-surface-container p-space-2xl rounded-2xl backdrop-blur-lg shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-secondary mb-space-lg group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[28px]">router</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-sm group-hover:text-secondary transition-colors">
                  Industrial IoT &amp; Edge Telemetry
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Direct fieldbus ingestion bridging legacy PLCs (Siemens, Rockwell, Beckhoff, Mitsubishi) via high-speed MQTT and OPC-UA. Resilient edge compute gateways buffer and process critical tag data at source with sub-10ms determinism.
                </p>
              </div>
              <div className="pt-space-xl flex items-center gap-space-xs font-label-code text-secondary group-hover:text-secondary-fixed transition-colors">
                <span>EXPLORE PROTOCOLS</span>
                <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-1">
                  arrow_right_alt
                </span>
              </div>
            </div>

            {/* Card 2 */}
            <div
              onClick={() => {
                if (onSelectSolution) onSelectSolution('Real-Time Data Analytics & Machine Learning');
                else if (onNavigateCapabilities) onNavigateCapabilities();
              }}
              className="group relative flex flex-col justify-between bg-surface-container/60 hover:bg-surface-container p-space-2xl rounded-2xl backdrop-blur-lg shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary mb-space-lg group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[28px]">insights</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-sm group-hover:text-primary transition-colors">
                  Real-Time Data Analytics &amp; Machine Learning
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Transform unorganized machine data into predictive maintenance forecasts and automated vibration anomaly triggers. Sub-second telemetry pipelines prevent catastrophic machine seizures and optimize thermal line consumption.
                </p>
              </div>
              <div className="pt-space-xl flex items-center gap-space-xs font-label-code text-primary group-hover:text-primary-fixed transition-colors">
                <span>VIEW PREDICTIVE MODELS</span>
                <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-1">
                  arrow_right_alt
                </span>
              </div>
            </div>
          </div>

          {/* Second Row: 2 Specialized AI Capability Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-xl">
            {/* New AI Card 1: Predictive Maintenance & Machine Lifetime Forecasting */}
            <div
              onClick={() => {
                if (onSelectSolution) onSelectSolution('Predictive Maintenance & Machine Lifetime Forecasting');
                else if (onNavigateCapabilities) onNavigateCapabilities();
              }}
              className="group relative flex flex-col justify-between bg-surface-container/60 hover:bg-surface-container p-space-2xl rounded-2xl backdrop-blur-lg shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-secondary mb-space-lg group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[28px]">neurology</span>
                </div>
                <div className="flex items-center gap-space-xs mb-space-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  <span className="font-label-badge text-label-badge text-secondary uppercase tracking-widest">
                    AI Intelligence
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-sm group-hover:text-secondary transition-colors">
                  Predictive Maintenance &amp; Machine Lifetime Forecasting
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Deploy edge-native Remaining Useful Life (RUL) algorithms and physics-informed AI models to forecast critical machine component failure, optimize overhaul cycles, and eliminate catastrophic mechanical downtime before it occurs.
                </p>
              </div>
              <div className="pt-space-xl flex items-center gap-space-xs font-label-code text-label-code text-secondary group-hover:text-secondary-fixed transition-colors">
                <span>RUL PROGNOSTICS</span>
                <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-1">
                  arrow_right_alt
                </span>
              </div>
            </div>

            {/* New AI Card 2: AI-Accelerated Application Prototyping & Rapid Validation */}
            <div
              onClick={() => {
                if (onSelectSolution) onSelectSolution('AI-Accelerated Application Prototyping & Rapid Validation');
                else if (onNavigateCapabilities) onNavigateCapabilities();
              }}
              className="group relative flex flex-col justify-between bg-surface-container/60 hover:bg-surface-container p-space-2xl rounded-2xl backdrop-blur-lg shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary mb-space-lg group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[28px]">bolt</span>
                </div>
                <div className="flex items-center gap-space-xs mb-space-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                  <span className="font-label-badge text-label-badge text-primary uppercase tracking-widest">
                    Generative Eng
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-sm group-hover:text-primary transition-colors">
                  AI-Accelerated Application Prototyping &amp; Rapid Validation
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Harness generative AI and low-code synthesis engines to rapidly prototype, stress-test, and validate bespoke plant floor apps, digital twins, and operator interfaces in days rather than quarters.
                </p>
              </div>
              <div className="pt-space-xl flex items-center gap-space-xs font-label-code text-label-code text-primary group-hover:text-primary-fixed-dim transition-colors">
                <span>RAPID VALIDATION</span>
                <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-1">
                  arrow_right_alt
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Row: 3 Specialized Platform Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-xl">
            {/* Card 3 */}
            <div
              onClick={() => {
                if (onSelectSolution) onSelectSolution('Microsoft PowerPlatform Ecosystem');
                else if (onNavigateCapabilities) onNavigateCapabilities();
              }}
              className="group relative flex flex-col justify-between bg-surface-container/60 hover:bg-surface-container p-space-xl rounded-2xl backdrop-blur-lg shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-secondary mb-space-lg group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[28px]">widgets</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-sm group-hover:text-secondary transition-colors">
                  Microsoft PowerPlatform Ecosystem
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Bespoke PowerApps for shop floor operator shift-logs, automated Power Automate batch approvals, and interactive Power BI executive cockpits unified with Dataverse.
                </p>
              </div>
              <div className="pt-space-lg flex items-center gap-space-2xs font-label-code text-label-code text-on-surface-variant group-hover:text-secondary transition-colors">
                <span>WORKFLOW AUTOMATION</span>
              </div>
            </div>

            {/* Card 4 */}
            <div
              onClick={() => {
                if (onSelectSolution) onSelectSolution('Smart Factory & OEE Optimization');
                else if (onNavigateCapabilities) onNavigateCapabilities();
              }}
              className="group relative flex flex-col justify-between bg-surface-container/60 hover:bg-surface-container p-space-xl rounded-2xl backdrop-blur-lg shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary mb-space-lg group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[28px]">precision_manufacturing</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-sm group-hover:text-primary transition-colors">
                  Smart Factory &amp; OEE Optimization
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Continuous Overall Equipment Effectiveness tracking with micro-stop classification, digital twin line simulation, and root-cause bottleneck pinpointing.
                </p>
              </div>
              <div className="pt-space-lg flex items-center gap-space-2xs font-label-code text-label-code text-on-surface-variant group-hover:text-primary transition-colors">
                <span>OEE BENCHMARKING</span>
              </div>
            </div>

            {/* Card 5 */}
            <div
              onClick={() => {
                if (onSelectSolution) onSelectSolution('Turnkey OT/IT Cloud Integration');
                else if (onNavigateCapabilities) onNavigateCapabilities();
              }}
              className="group relative flex flex-col justify-between bg-surface-container/60 hover:bg-surface-container p-space-xl rounded-2xl backdrop-blur-lg shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-secondary mb-space-lg group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[28px]">cloud_sync</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-sm group-hover:text-secondary transition-colors">
                  Turnkey OT/IT Cloud Integration
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Zero-trust industrial cybersecurity bridges connecting legacy MES &amp; ERP (SAP/Oracle) to scalable Azure IoT Hub and AWS IoT SiteWise cloud infrastructure.
                </p>
              </div>
              <div className="pt-space-lg flex items-center gap-space-2xs font-label-code text-label-code text-on-surface-variant group-hover:text-secondary transition-colors">
                <span>HYBRID CLOUD FABRIC</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
