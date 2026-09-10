import React from 'react';

interface FooterProps {
  onNavigate?: (page: 'overview' | 'capabilities', sectionId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (
    e: React.MouseEvent,
    page: 'overview' | 'capabilities',
    sectionId?: string
  ) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(page, sectionId);
    }
  };

  return (
    <footer className="w-full bg-surface-container-lowest border-t border-surface-container py-space-3xl">
      <div className="max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-space-2xl pb-space-3xl border-b border-surface-container">
          {/* Col 1: Brand & Identity */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-space-sm mb-space-md">
              <img
                alt="Kalium Solutions"
                className="h-7 w-auto"
                src="https://lh3.googleusercontent.com/aida/AEtjO1VR4zWWnWLMCorYm1D3P8toYE_I72RDxuguKt6OeDEYfunUtYP69cZQsFCLcnY6yvbEeGr90-JEqAEKO1XNeTz7BYHlw7PO5slxeChwo1pThI1qw4EzIL36N6xgM8Xy9MXspIsYcI0zrcf6a35patfufWjN4zC-eGH-m-HIUl6JUTxCofX0k0IMMhBk3nW9nypCwSvMQmFkiDBHScmMY24qMxuXBGLNnLT72km_UwX7FN4Lbb4fixLqYWA"
              />
              <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight">
                Kalium Solutions
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Architecting deterministic industrial telemetry, predictive machine intelligence, and agile digital transformation frameworks for global discrete and process enterprises.
            </p>
          </div>

          {/* Col 2: Solutions */}
          <div>
            <h4 className="font-headline-sm text-[14px] text-on-surface font-bold uppercase tracking-wider mb-space-md">
              Solutions
            </h4>
            <ul className="flex flex-col gap-space-xs font-body-sm text-body-sm text-on-surface-variant">
              <li>
                <a
                  className="hover:text-secondary transition-colors cursor-pointer"
                  href="#solutions"
                  onClick={(e) => handleNav(e, 'overview', 'solutions')}
                >
                  Edge IIoT Telemetry
                </a>
              </li>
              <li>
                <a
                  className="hover:text-secondary transition-colors cursor-pointer"
                  href="#solutions"
                  onClick={(e) => handleNav(e, 'overview', 'solutions')}
                >
                  Predictive Maintenance
                </a>
              </li>
              <li>
                <a
                  className="hover:text-secondary transition-colors cursor-pointer"
                  href="#solutions"
                  onClick={(e) => handleNav(e, 'overview', 'solutions')}
                >
                  PowerPlatform Workflows
                </a>
              </li>
              <li>
                <a
                  className="hover:text-secondary transition-colors cursor-pointer"
                  href="#solutions"
                  onClick={(e) => handleNav(e, 'overview', 'solutions')}
                >
                  Smart Factory OEE
                </a>
              </li>
              <li>
                <a
                  className="hover:text-secondary transition-colors cursor-pointer"
                  href="#solutions"
                  onClick={(e) => handleNav(e, 'overview', 'solutions')}
                >
                  Zero-Trust OT/IT Cloud
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Governance */}
          <div>
            <h4 className="font-headline-sm text-[14px] text-on-surface font-bold uppercase tracking-wider mb-space-md">
              Company
            </h4>
            <ul className="flex flex-col gap-space-xs font-body-sm text-body-sm text-on-surface-variant">
              <li>
                <a
                  className="hover:text-secondary transition-colors cursor-pointer"
                  href="#capabilities"
                  onClick={(e) => handleNav(e, 'capabilities')}
                >
                  Engineering Capabilities
                </a>
              </li>
              <li>
                <a
                  className="hover:text-secondary transition-colors cursor-pointer"
                  href="#clients-and-partners"
                  onClick={(e) => handleNav(e, 'overview', 'clients-and-partners')}
                >
                  Partners &amp; Clients
                </a>
              </li>
              <li>
                <a
                  className="hover:text-secondary transition-colors cursor-pointer"
                  href="#insights"
                  onClick={(e) => handleNav(e, 'overview', 'insights')}
                >
                  Case Studies &amp; Insights
                </a>
              </li>
              <li>
                <a
                  className="hover:text-secondary transition-colors cursor-pointer"
                  href="#contact"
                  onClick={(e) => handleNav(e, 'overview', 'contact')}
                >
                  Plant Maturity Audits
                </a>
              </li>
              <li>
                <a
                  className="hover:text-secondary transition-colors cursor-pointer"
                  href="#contact"
                  onClick={(e) => handleNav(e, 'overview', 'contact')}
                >
                  Careers &amp; EPC Support
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Operations */}
          <div>
            <h4 className="font-headline-sm text-[14px] text-on-surface font-bold uppercase tracking-wider mb-space-md">
              Operations
            </h4>
            <div className="flex flex-col gap-space-xs font-body-sm text-body-sm text-on-surface-variant">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-secondary text-[16px]">
                  location_on
                </span>
                <span>Vietnam • Southeast Asia • EU Operations</span>
              </div>
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-primary text-[16px]">mail</span>
                <span>contact@kaliumsolutions.com</span>
              </div>
              <div className="flex items-center gap-space-xs mt-space-sm">
                <span className="w-2 h-2 rounded-full bg-secondary"></span>
                <span className="font-label-code text-label-code text-on-surface">
                  ISO-95 / IEC-62443 COMPLIANT
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-wrap items-center justify-between pt-space-xl gap-space-md font-body-sm text-body-sm text-on-surface-variant">
          <div>
            © 2024 Kalium Solutions Co., Ltd. All rights reserved. Precision engineering for modern manufacturing.
          </div>
          <div className="flex items-center gap-space-lg font-label-code text-label-code">
            <a
              className="hover:text-on-surface cursor-pointer"
              href="#contact"
              onClick={(e) => handleNav(e, 'overview', 'contact')}
            >
              PRIVACY POLICY
            </a>
            <a
              className="hover:text-on-surface cursor-pointer"
              href="#contact"
              onClick={(e) => handleNav(e, 'overview', 'contact')}
            >
              TERMS OF SERVICE
            </a>
            <a
              className="hover:text-on-surface cursor-pointer"
              href="#contact"
              onClick={(e) => handleNav(e, 'overview', 'contact')}
            >
              SECURITY ARCHITECTURE
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
