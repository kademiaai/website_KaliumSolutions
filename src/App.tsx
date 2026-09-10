import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { SolutionsSection } from './components/SolutionsSection';
import { MethodologySection } from './components/MethodologySection';
import { EmpiricalResultsSection } from './components/EmpiricalResultsSection';
import { TestimonialSection } from './components/TestimonialSection';
import { ClientsSection } from './components/ClientsSection';
import { InsightsSection } from './components/InsightsSection';
import { ContactSection } from './components/ContactSection';
import { CapabilitiesPage } from './components/CapabilitiesPage';
import { CockpitModal } from './components/CockpitModal';
import { Footer } from './components/Footer';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'overview' | 'capabilities'>('overview');
  const [activeSection, setActiveSection] = useState<string>('solutions');
  const [isCockpitOpen, setIsCockpitOpen] = useState<boolean>(false);

  // Sync state with URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#capabilities') {
        setCurrentPage('capabilities');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentPage('overview');
        if (hash && hash !== '#') {
          const targetId = hash.replace('#', '');
          setActiveSection(targetId);
          setTimeout(() => {
            const el = document.getElementById(targetId);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Track active section for navigation highlight
  useEffect(() => {
    if (currentPage !== 'overview') return;

    const sectionIds = ['solutions', 'industrial-grid', 'clients-and-partners', 'insights', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  const handleNavigate = (page: 'overview' | 'capabilities', sectionId?: string) => {
    if (page === 'capabilities') {
      setCurrentPage('capabilities');
      window.location.hash = '#capabilities';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentPage('overview');
      if (sectionId) {
        window.location.hash = `#${sectionId}`;
        setActiveSection(sectionId);
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 60);
      } else {
        window.location.hash = '#';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-surface-container-lowest text-on-surface font-body selection:bg-secondary/20 selection:text-secondary relative overflow-x-hidden">
      {/* Top Header */}
      <Header
        currentPage={currentPage}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenConsultation={() => handleNavigate('overview', 'contact')}
      />

      {/* Main Content Area */}
      <main className="w-full">
        {currentPage === 'overview' ? (
          <>
            {/* Section 1: Hero Section */}
            <HeroSection
              onNavigateSolutions={() => handleNavigate('overview', 'solutions')}
              onNavigateCaseStudies={() => handleNavigate('overview', 'insights')}
              onNavigateCapabilities={() => handleNavigate('capabilities')}
            />

            {/* Section 2: Core Offerings / Solutions */}
            <SolutionsSection
              onNavigateCapabilities={() => handleNavigate('capabilities')}
            />

            {/* Section 3: Engineering Methodology */}
            <MethodologySection />

            {/* Section 4: Empirical Industrial Grid */}
            <EmpiricalResultsSection />

            {/* Section 5: Operator & Director Testimonial */}
            <TestimonialSection />

            {/* Section 6: World-Class Manufacturing Clients & Partners */}
            <ClientsSection
              onContactClick={() => handleNavigate('overview', 'contact')}
            />

            {/* Section 7: Technical Insights & Architecture Guides */}
            <InsightsSection />

            {/* Section 8: Immediate Engagement / Plant Architecture Audit */}
            <ContactSection />
          </>
        ) : (
          <div id="capabilities" className="pt-24">
            <CapabilitiesPage
              onScheduleScoping={() => handleNavigate('overview', 'contact')}
            />
          </div>
        )}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Live Cockpit Telemetry Modal */}
      <CockpitModal
        isOpen={isCockpitOpen}
        onClose={() => setIsCockpitOpen(false)}
      />
    </div>
  );
}
