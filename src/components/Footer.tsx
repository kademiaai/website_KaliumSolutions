import React from 'react';

interface FooterProps {
  onNavigate?: (page: 'overview' | 'capabilities', sectionId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (page: 'overview' | 'capabilities', sectionId?: string) => {
    if (onNavigate) {
      onNavigate(page, sectionId);
    }
  };

  return (
    <footer className="w-full bg-surface-container-lowest mt-16 border-t border-outline-variant/20">
      <div className="max-w-[1440px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[18px]">hub</span>
              </div>
              <span className="font-['Space_Grotesk'] text-lg font-bold text-on-surface tracking-tight">
                Kalium Solutions
              </span>
            </div>
            <p className="font-['Geist'] text-sm text-on-surface-variant max-w-sm leading-relaxed">
              Precision telemetry and cloud orchestrations designed for hyper-scale engineering teams and sovereign computational backbones.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="font-['JetBrains_Mono'] text-xs text-primary uppercase">
                Global Edge Clusters: Active &amp; Synchronized
              </span>
            </div>
          </div>

          {/* Architecture Links */}
          <div>
            <h4 className="font-['Space_Grotesk'] text-sm text-on-surface font-semibold mb-4">
              Architecture &amp; Capabilities
            </h4>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: 'Core Capabilities', page: 'capabilities' as const, section: '' },
                { label: 'PINN RUL Prognostics', page: 'capabilities' as const, section: '' },
                { label: 'Unified Namespace (UNS)', page: 'capabilities' as const, section: '' },
                { label: 'OT/IT Cybersecurity', page: 'capabilities' as const, section: '' },
                { label: 'Telemetry Mesh', page: 'overview' as const, section: 'solutions' },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() => handleNav(item.page, item.section)}
                    className="font-['Geist'] text-xs text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Governance Links */}
          <div>
            <h4 className="font-['Space_Grotesk'] text-sm text-on-surface font-semibold mb-4">
              Governance
            </h4>
            <ul className="flex flex-col gap-2.5">
              {['Compliance Registry', 'SOC2 Type II Audit', 'ISO/IEC 27001 Certified', 'Privacy Safeguards'].map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    onClick={() => handleNav('overview', 'solutions')}
                    className="font-['Geist'] text-xs text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer text-left"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Connectivity Links */}
          <div>
            <h4 className="font-['Space_Grotesk'] text-sm text-on-surface font-semibold mb-4">
              Connectivity
            </h4>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: 'Global Gateway API', page: 'overview' as const, section: 'matrix' },
                { label: 'Status Monitor', page: 'overview' as const, section: 'matrix' },
                { label: 'Schedule Workshop', page: 'overview' as const, section: 'consultation' },
                { label: 'Developer Sandbox', page: 'overview' as const, section: 'solutions' },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() => handleNav(item.page, item.section)}
                    className="font-['Geist'] text-xs text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-outline-variant/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 font-['JetBrains_Mono'] text-xs text-on-surface-variant">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-primary">verified_user</span>
              <span>NIST SP 800-53 Compliant</span>
            </span>
            <span className="hidden sm:inline opacity-40">•</span>
            <span>Hardware Security Module (HSM) Level 4</span>
          </div>

          <p className="font-['Geist'] text-xs text-on-surface-variant">
            © 2025 Kalium Solutions (kaliumsolutions.tech). All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
