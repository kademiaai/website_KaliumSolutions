import React, { useState } from 'react';

interface HeaderProps {
  currentPage: 'overview' | 'capabilities';
  activeSection?: string;
  onNavigate: (page: 'overview' | 'capabilities', sectionId?: string) => void;
  onOpenConsultation?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  activeSection,
  onNavigate,
  onOpenConsultation,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Solutions', page: 'overview' as const, section: 'solutions' },
    { name: 'Capabilities', page: 'capabilities' as const, section: '' },
    { name: 'Case Studies', page: 'overview' as const, section: 'insights' },
    { name: 'Clients & Partners', page: 'overview' as const, section: 'clients-and-partners' },
    { name: 'Insights', page: 'overview' as const, section: 'insights' },
  ];

  const handleLinkClick = (e: React.MouseEvent, page: 'overview' | 'capabilities', sectionId?: string) => {
    e.preventDefault();
    onNavigate(page, sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.4)]">
      <div className="h-20 max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop flex items-center justify-between gap-space-md">
        {/* Brand & Logo */}
        <button
          type="button"
          onClick={(e) => handleLinkClick(e, 'overview')}
          className="flex items-center gap-space-sm cursor-pointer group text-left"
        >
          <img
            alt="Kalium Solutions Logo"
            className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
            src="https://lh3.googleusercontent.com/aida/AEtjO1VR4zWWnWLMCorYm1D3P8toYE_I72RDxuguKt6OeDEYfunUtYP69cZQsFCLcnY6yvbEeGr90-JEqAEKO1XNeTz7BYHlw7PO5slxeChwo1pThI1qw4EzIL36N6xgM8Xy9MXspIsYcI0zrcf6a35patfufWjN4zC-eGH-m-HIUl6JUTxCofX0k0IMMhBk3nW9nypCwSvMQmFkiDBHScmMY24qMxuXBGLNnLT72km_UwX7FN4Lbb4fixLqYWA"
          />
          <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight group-hover:text-primary transition-colors">
            Kalium Solutions
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-space-lg" data-active-classes="text-primary font-headline-sm">
          {navItems.map((item) => {
            const isCapabilitiesActive = item.name === 'Capabilities' && currentPage === 'capabilities';
            const isSectionActive =
              currentPage === 'overview' &&
              ((item.section === 'solutions' && activeSection === 'solutions') ||
                (item.section === 'clients-and-partners' && activeSection === 'clients-and-partners') ||
                (item.section === 'insights' && activeSection === 'insights'));
            const isActive = isCapabilitiesActive || isSectionActive;

            return (
              <button
                key={item.name}
                type="button"
                onClick={(e) => handleLinkClick(e, item.page, item.section)}
                className={`transition-colors cursor-pointer ${
                  isActive
                    ? 'text-primary font-headline-sm'
                    : 'text-on-surface-variant font-body-md text-body-md hover:text-on-surface'
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </nav>

        {/* Action Buttons & Profile Avatar */}
        <div className="flex items-center gap-space-md">
          <button
            type="button"
            onClick={(e) => {
              if (onOpenConsultation) {
                onOpenConsultation();
              } else {
                handleLinkClick(e, 'overview', 'contact');
              }
            }}
            className="hidden sm:inline-flex items-center justify-center bg-primary-container text-on-primary-container font-headline-sm text-body-md px-space-lg py-space-xs rounded-xl shadow-[0_0_20px_rgba(249,115,22,0.35)] hover:bg-primary hover:text-on-primary transition-all duration-200 cursor-pointer"
          >
            Schedule Consultation
          </button>

          <div
            title="Industrial Edge Gateway Operator"
            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center cursor-pointer shadow-sm hover:ring-2 hover:ring-primary/40 transition-all"
          >
            <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-surface-container-lowest border-t border-surface-container-high px-gutter-mobile py-space-lg shadow-2xl">
          <nav className="flex flex-col gap-space-md">
            {navItems.map((item) => (
              <button
                key={item.name}
                type="button"
                onClick={(e) => handleLinkClick(e, item.page, item.section)}
                className="text-left py-2 text-on-surface font-headline-sm hover:text-primary transition-colors cursor-pointer"
              >
                {item.name}
              </button>
            ))}
            <div className="pt-space-md border-t border-surface-container-high">
              <button
                type="button"
                onClick={(e) => {
                  if (onOpenConsultation) {
                    onOpenConsultation();
                  } else {
                    handleLinkClick(e, 'overview', 'contact');
                  }
                  setMobileMenuOpen(false);
                }}
                className="w-full text-center bg-primary-container text-on-primary-container font-headline-sm py-space-sm rounded-xl shadow-[0_0_20px_rgba(249,115,22,0.35)] hover:bg-primary hover:text-on-primary transition-all cursor-pointer"
              >
                Schedule Consultation
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
