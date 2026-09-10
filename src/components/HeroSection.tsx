import React, { useState, useEffect } from 'react';

interface HeroSectionProps {
  onNavigateSolutions?: () => void;
  onNavigateCaseStudies?: () => void;
  onNavigateCapabilities?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigateSolutions,
  onNavigateCaseStudies,
  onNavigateCapabilities,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [liveLatency, setLiveLatency] = useState(4.2);
  const [liveClusters, setLiveClusters] = useState(42);

  const heroSlides = [
    {
      badge: 'Next-Gen Industrial Intelligence & IIoT',
      headline: 'Driving Digital Transformation in Modern Manufacturing',
      subtitle:
        'Empowering enterprise plants with connected IIoT sensor fabrics, real-time edge telemetry, automated PowerPlatform workflows, and turnkey predictive analytics for deterministic operational excellence.',
    },
    {
      badge: 'Edge-Native Physics-Informed AI',
      headline: 'Deterministic Vibration Prognostics & Machine RUL',
      subtitle:
        'Deploying remaining useful life algorithms and sub-10ms MQTT brokers directly at machine edges to predict bearing seizures and eliminate unplanned downtime before shifts start.',
    },
    {
      badge: 'Unified Namespace & Cloud Fabrics',
      headline: 'Brownfield PLC Instrumentation to Executive Cockpits',
      subtitle:
        'Seamlessly bridging legacy Siemens, Rockwell, and Beckhoff fieldbuses into high-throughput Sparkplug B topics, Microsoft Dataverse, and secure hybrid cloud telemetry.',
    },
  ];

  // Subtle real-time telemetry simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveLatency((prev) => {
        const delta = (Math.random() - 0.5) * 0.4;
        return Number(Math.max(3.6, Math.min(4.8, prev + delta)).toFixed(1));
      });
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const currentSlide = heroSlides[activeSlide];

  return (
    <section className="relative w-full overflow-hidden bg-surface-container-lowest pb-space-4xl">
      {/* Glowing Atmospheric Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary-container/10 blur-[130px] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(76,215,246,0.08)_0%,transparent_60%)] pointer-events-none"></div>

      <div className="relative max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop pt-24">
        <div className="flex flex-col max-w-4xl">
          {/* Pill Badge */}
          <button
            type="button"
            onClick={onNavigateCapabilities}
            className="inline-flex items-center gap-space-xs self-start px-space-md py-space-2xs rounded-full bg-surface-container-high/80 backdrop-blur-md shadow-sm mb-space-lg text-left cursor-pointer hover:bg-surface-container-high transition-colors"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-secondary animate-pulse shadow-[0_0_8px_#4cd7f6]"></span>
            <span className="font-label-badge text-label-badge text-secondary uppercase tracking-widest">
              {currentSlide.badge}
            </span>
          </button>

          {/* Hero Headline */}
          <h1 className="font-display-hero text-headline-lg lg:text-display-hero text-on-surface tracking-tight mb-space-lg transition-all duration-300">
            {currentSlide.headline}
          </h1>

          {/* Subtitle */}
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-space-2xl max-w-3xl leading-relaxed transition-all duration-300">
            {currentSlide.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-space-md mb-space-3xl">
            <a
              href="#solutions"
              onClick={(e) => {
                if (onNavigateSolutions) {
                  e.preventDefault();
                  onNavigateSolutions();
                }
              }}
              className="inline-flex items-center justify-center gap-space-sm bg-primary-container text-on-primary-container font-headline-sm text-body-md px-space-xl py-space-md rounded-xl shadow-[0_0_28px_rgba(249,115,22,0.38)] hover:bg-primary hover:text-on-primary transition-all duration-200 group cursor-pointer"
            >
              <span>Explore Enterprise Solutions</span>
              <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </a>

            <a
              href="#insights"
              onClick={(e) => {
                if (onNavigateCaseStudies) {
                  e.preventDefault();
                  onNavigateCaseStudies();
                }
              }}
              className="inline-flex items-center justify-center gap-space-sm bg-surface-container-high/80 text-on-surface hover:text-secondary font-headline-sm text-body-md px-space-xl py-space-md rounded-xl backdrop-blur-md transition-all duration-200 cursor-pointer"
            >
              <span>View Client Case Studies</span>
              <span className="material-symbols-outlined text-[18px]">read_more</span>
            </a>
          </div>

          {/* Carousel Indicator Dots */}
          <div className="flex items-center gap-space-xs mb-space-2xl">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveSlide(idx)}
                aria-label={`Slide ${idx + 1}`}
                className={`transition-all duration-300 cursor-pointer ${
                  activeSlide === idx
                    ? 'w-8 h-2 rounded-full bg-secondary shadow-[0_0_10px_rgba(76,215,246,0.6)]'
                    : 'w-2 h-2 rounded-full bg-surface-variant hover:bg-on-surface-variant'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Live Telemetry Status Strip */}
        <div className="relative rounded-2xl bg-surface-container/80 backdrop-blur-xl border border-surface-container-highest p-space-xl shadow-2xl overflow-hidden mt-space-lg">
          <div className="flex flex-wrap items-center justify-between gap-space-md pb-space-lg border-b border-surface-container-high">
            <div className="flex items-center gap-space-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-ping"></span>
              <span className="font-label-code text-label-code text-on-surface font-semibold tracking-wider">
                LIVE INDUSTRIAL OT/IT TELEMETRY GATEWAY • ACTIVE CLUSTERS: {liveClusters}
              </span>
            </div>
            <div className="flex items-center gap-space-lg font-label-code text-label-code text-on-surface-variant">
              <span>MQTT PROTOCOL: OK</span>
              <span>OPC-UA LATENCY: {liveLatency}ms</span>
              <span className="text-secondary">DETERMINISTIC SYNC</span>
            </div>
          </div>

          {/* High-Impact Live Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg mt-space-lg">
            {/* Stat 1 */}
            <div className="flex flex-col bg-surface-container-lowest/60 rounded-xl p-space-lg">
              <div className="flex items-center justify-between mb-space-xs">
                <span className="font-body-sm text-body-sm text-on-surface-variant">Global Plant Reliability</span>
                <span className="material-symbols-outlined text-secondary text-[20px]">speed</span>
              </div>
              <div className="flex items-baseline gap-space-2xs mb-space-xs">
                <span className="font-title-metric text-title-metric text-on-surface">99.4%</span>
                <span className="font-label-code text-label-code text-secondary font-semibold">+2.1% MoM</span>
              </div>
              <div className="w-full bg-surface-variant rounded-full h-1.5 overflow-hidden">
                <div className="bg-secondary h-full rounded-full w-[99.4%] shadow-[0_0_8px_#4cd7f6]"></div>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col bg-surface-container-lowest/60 rounded-xl p-space-lg">
              <div className="flex items-center justify-between mb-space-xs">
                <span className="font-body-sm text-body-sm text-on-surface-variant">Edge Telemetry Stream</span>
                <span className="material-symbols-outlined text-primary text-[20px]">sensors</span>
              </div>
              <div className="flex items-baseline gap-space-2xs mb-space-xs">
                <span className="font-title-metric text-title-metric text-on-surface">1.8M+</span>
                <span className="font-label-code text-label-code text-on-surface-variant">events/sec</span>
              </div>
              <div className="w-full h-5 flex items-end">
                <svg className="w-full h-4 text-primary-container" fill="none" viewBox="0 0 100 20">
                  <path
                    d="M0 12 L15 14 L30 6 L45 10 L60 3 L75 8 L90 2 L100 7"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></path>
                </svg>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col bg-surface-container-lowest/60 rounded-xl p-space-lg">
              <div className="flex items-center justify-between mb-space-xs">
                <span className="font-body-sm text-body-sm text-on-surface-variant">Unplanned Downtime Cut</span>
                <span className="material-symbols-outlined text-secondary-container text-[20px]">
                  hourglass_disabled
                </span>
              </div>
              <div className="flex items-baseline gap-space-2xs mb-space-xs">
                <span className="font-title-metric text-title-metric text-on-surface">32%</span>
                <span className="font-label-code text-label-code text-secondary">Verified Mean ROI</span>
              </div>
              <div className="w-full bg-surface-variant rounded-full h-1.5 overflow-hidden">
                <div className="bg-primary-container h-full rounded-full w-[68%] shadow-[0_0_8px_#f97316]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
