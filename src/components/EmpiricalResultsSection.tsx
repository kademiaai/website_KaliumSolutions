import React from 'react';

export const EmpiricalResultsSection: React.FC = () => {
  return (
    <section className="relative w-full py-space-4xl bg-surface overflow-hidden" id="industrial-grid">
      {/* Subtle Grid Lines Background */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <svg className="w-full h-full" height="100%" width="100%">
          <defs>
            <pattern height="40" id="emp-grid" patternUnits="userSpaceOnUse" width="40">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#262a35" strokeWidth="1"></path>
            </pattern>
          </defs>
          <rect fill="url(#emp-grid)" height="100%" width="100%"></rect>
        </svg>
      </div>

      <div className="relative max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop">
        <div className="flex flex-col items-center text-center mb-space-3xl">
          <div className="inline-flex items-center gap-space-xs px-space-md py-space-2xs rounded-full bg-surface-container-high/80 mb-space-md">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
            <span className="font-label-badge text-label-badge text-secondary uppercase tracking-widest">
              Empirical Results
            </span>
          </div>
          <h2 className="font-headline-lg text-headline-md lg:text-headline-lg text-on-surface max-w-3xl mb-space-sm tracking-tight">
            Driving Impact Across Industries
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
            Validated metrics across deployed automotive, food &amp; beverage, and chemical process facilities.
          </p>
        </div>

        {/* 4 High-Contrast Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-xl">
          {/* Stat 1 */}
          <div className="bg-surface-container/70 backdrop-blur-md rounded-2xl p-space-2xl text-center shadow-lg hover:bg-surface-container transition-all duration-300 hover:-translate-y-1">
            <div className="font-title-metric text-title-metric text-secondary mb-space-xs">
              99.98%
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">
              Ingestion Reliability
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Sub-10ms determinism with zero dropped packets
            </p>
          </div>

          {/* Stat 2 */}
          <div className="bg-surface-container/70 backdrop-blur-md rounded-2xl p-space-2xl text-center shadow-lg hover:bg-surface-container transition-all duration-300 hover:-translate-y-1">
            <div className="font-title-metric text-title-metric text-primary mb-space-xs">
              34%
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">
              Downtime Reduction
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Average unplanned stoppage eliminated within 6 months
            </p>
          </div>

          {/* Stat 3 */}
          <div className="bg-surface-container/70 backdrop-blur-md rounded-2xl p-space-2xl text-center shadow-lg hover:bg-surface-container transition-all duration-300 hover:-translate-y-1">
            <div className="font-title-metric text-title-metric text-secondary mb-space-xs">
              15M+
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">
              Sensor Events / Day
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Sub-millisecond processing at on-prem edge gateways
            </p>
          </div>

          {/* Stat 4 */}
          <div className="bg-surface-container/70 backdrop-blur-md rounded-2xl p-space-2xl text-center shadow-lg hover:bg-surface-container transition-all duration-300 hover:-translate-y-1">
            <div className="font-title-metric text-title-metric text-primary mb-space-xs">
              5x
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">
              Reporting Velocity
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Accelerated via automated PowerPlatform pipelines
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
