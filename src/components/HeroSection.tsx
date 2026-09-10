import React from 'react';

interface HeroSectionProps {
  onOpenCockpit: () => void;
  onNavigateCapabilities?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenCockpit, onNavigateCapabilities }) => {
  return (
    <section className="max-w-[1440px] mx-auto px-6 pt-12 pb-16 relative z-10">
      <div className="flex flex-col items-start max-w-4xl">
        {/* System Micro Badge */}
        <div
          onClick={onNavigateCapabilities}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-high/90 border border-outline-variant/40 backdrop-blur-xl shadow-lg mb-6 cursor-pointer hover:border-primary/50 transition-all"
          title="Click to view full Capabilities stack"
        >
          <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
          <span className="font-['JetBrains_Mono'] text-xs tracking-wider uppercase text-primary font-semibold">
            ENTERPRISE IIOT &amp; AUTONOMOUS MANUFACTURING V4.2
          </span>
          <span className="material-symbols-outlined text-[15px] text-tertiary">
            verified
          </span>
        </div>

        {/* Hero Headline */}
        <h1 className="font-['Space_Grotesk'] text-4xl sm:text-5xl lg:text-6xl font-bold text-on-surface tracking-tight leading-[1.12] mb-6">
          Deterministic Edge Telemetry &amp;{' '}
          <span className="bg-gradient-to-r from-primary via-tertiary to-secondary bg-clip-text text-transparent">
            Next-Gen Plant Intelligence
          </span>
        </h1>

        {/* Subtitle */}
        <p className="font-['Geist'] text-lg sm:text-xl text-on-surface-variant max-w-3xl leading-relaxed mb-8">
          Bridging brownfield PLC fabrics to enterprise cloud engines with sub-10ms determinism, physics-informed RUL prognostics, and zero unplanned factory downtime.
        </p>

        {/* Dual CTA Row */}
        <div className="flex flex-wrap items-center gap-4 mb-12">
          <a
            href="#consultation"
            className="inline-flex items-center justify-center gap-2 px-6 h-12 rounded-xl bg-gradient-to-r from-primary-container to-secondary text-on-primary font-['Space_Grotesk'] text-base font-semibold shadow-xl shadow-primary-container/25 hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Deploy Architecture Blueprint</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </a>

          <button
            onClick={onOpenCockpit}
            type="button"
            className="inline-flex items-center justify-center gap-2 px-6 h-12 rounded-xl bg-surface-container-high/80 border border-outline-variant/30 backdrop-blur-xl text-on-surface font-['Space_Grotesk'] text-base font-medium shadow-md hover:bg-surface-container-highest hover:border-primary/40 active:scale-[0.98] transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              play_circle
            </span>
            <span>Explore Live Telemetry Cockpit</span>
          </button>

          {onNavigateCapabilities && (
            <button
              onClick={onNavigateCapabilities}
              type="button"
              className="inline-flex items-center justify-center gap-1.5 px-4 h-12 rounded-xl text-on-surface-variant font-['Space_Grotesk'] text-sm hover:text-primary transition-all cursor-pointer"
            >
              <span>Explore Capabilities Stack</span>
              <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            </button>
          )}
        </div>

        {/* Industrial Proof Badges */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-surface-container-low/80 border border-outline-variant/30 backdrop-blur-md shadow-md flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-[22px]">factory</span>
            </div>
            <div>
              <div className="font-['Space_Grotesk'] text-2xl text-on-surface font-bold">50+</div>
              <div className="font-['Geist'] text-xs text-on-surface-variant">Plants Modernized</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-surface-container-low/80 border border-outline-variant/30 backdrop-blur-md shadow-md flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-tertiary shrink-0">
              <span className="material-symbols-outlined text-[22px]">shield_lock</span>
            </div>
            <div>
              <div className="font-['Space_Grotesk'] text-2xl text-on-surface font-bold">99.98%</div>
              <div className="font-['Geist'] text-xs text-on-surface-variant">Guaranteed SLA</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-surface-container-low/80 border border-outline-variant/30 backdrop-blur-md shadow-md flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary shrink-0">
              <span className="material-symbols-outlined text-[22px]">trending_up</span>
            </div>
            <div>
              <div className="font-['Space_Grotesk'] text-2xl text-on-surface font-bold">$2.8M</div>
              <div className="font-['Geist'] text-xs text-on-surface-variant">Documented Client ROI</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
