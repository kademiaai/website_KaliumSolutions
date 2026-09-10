import React, { useState } from 'react';

interface HeaderProps {
  currentPage: 'overview' | 'capabilities';
  onNavigate: (page: 'overview' | 'capabilities', sectionId?: string) => void;
  onOpenCockpit?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenCockpit,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Overview', page: 'overview' as const, section: '' },
    { name: 'Solutions', page: 'overview' as const, section: 'solutions' },
    { name: 'Capabilities', page: 'capabilities' as const, section: '' },
    { name: 'Case Studies', page: 'overview' as const, section: 'matrix' },
    { name: 'Clients & Partners', page: 'overview' as const, section: 'clients' },
    { name: 'Insights', page: 'overview' as const, section: 'consultation' },
  ];

  const handleLinkClick = (e: React.MouseEvent, link: typeof navLinks[0]) => {
    e.preventDefault();
    onNavigate(link.page, link.section);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#051424]/85 backdrop-blur-xl border-b border-[#3d494c]/20 shadow-[0_1px_8px_rgba(0,0,0,0.4)]">
      <div className="h-16 w-full px-6 max-w-[1440px] mx-auto flex items-center justify-between gap-4">
        {/* Brand & SLA */}
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={(e) => handleLinkClick(e, navLinks[0])}
            className="flex items-center gap-3 shrink-0 group cursor-pointer text-left"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-primary-container flex items-center justify-center text-[#003640] font-bold shadow-md shadow-primary/20">
              <span className="material-symbols-outlined text-[20px]">hub</span>
            </div>
            <span className="font-['Space_Grotesk'] font-bold text-lg tracking-tight text-on-surface group-hover:text-primary transition-colors">
              Kalium Solutions
            </span>
          </button>

          <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-lowest border border-outline-variant/30">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="font-['JetBrains_Mono'] text-[11px] tracking-wider uppercase text-on-surface-variant">
              Systems Operational // 99.98% SLA
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive =
              link.name === 'Capabilities'
                ? currentPage === 'capabilities'
                : currentPage === 'overview' && link.name === 'Overview';

            return (
              <button
                key={link.name}
                type="button"
                onClick={(e) => handleLinkClick(e, link)}
                className={`px-3 py-1.5 rounded-xl text-sm transition-all cursor-pointer ${
                  isActive
                    ? 'bg-surface-container-high text-primary font-semibold'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/60'
                }`}
              >
                {link.name}
              </button>
            );
          })}
        </nav>

        {/* Right Action Icons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('overview', 'matrix')}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-on-surface-variant hover:text-on-surface hover:border-primary/40 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">search</span>
            <span className="text-xs">Search infra...</span>
            <kbd className="font-['JetBrains_Mono'] text-[10px] px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface-variant">
              ⌘K
            </kbd>
          </button>

          <button
            aria-label="Cockpit Stream"
            onClick={onOpenCockpit}
            className="relative p-2 rounded-xl text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-all cursor-pointer"
            title="Open Live Telemetry Cockpit"
          >
            <span className="material-symbols-outlined text-[20px]">terminal</span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary"></span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('overview', 'consultation')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary text-on-primary font-semibold text-xs hover:brightness-110 transition-all shadow-md shadow-primary/20 cursor-pointer"
          >
            <span>Deploy</span>
            <span className="material-symbols-outlined text-[14px]">bolt</span>
          </button>

          {/* Mobile menu hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high cursor-pointer"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-[22px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-6 py-4 bg-surface-container-low border-b border-outline-variant/30 flex flex-col gap-2">
          {navLinks.map((link) => {
            const isActive =
              link.name === 'Capabilities'
                ? currentPage === 'capabilities'
                : currentPage === 'overview' && link.name === 'Overview';

            return (
              <button
                key={link.name}
                type="button"
                onClick={(e) => handleLinkClick(e, link)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm cursor-pointer ${
                  isActive
                    ? 'bg-surface-container-high text-primary font-semibold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {link.name}
              </button>
            );
          })}
          <div className="pt-2 flex items-center justify-between border-t border-outline-variant/20">
            <span className="font-['JetBrains_Mono'] text-[11px] text-primary">SLA 99.98% Active</span>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenCockpit) onOpenCockpit();
              }}
              className="px-3 py-1 text-xs rounded bg-surface-container-high text-on-surface cursor-pointer"
            >
              Open Cockpit
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
