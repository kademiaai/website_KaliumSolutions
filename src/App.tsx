import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { DiagnosticsCluster } from './components/DiagnosticsCluster';
import { NodeMatrix } from './components/NodeMatrix';
import { ScopingSection } from './components/ScopingSection';
import { CapabilitiesPage } from './components/CapabilitiesPage';
import { CockpitModal } from './components/CockpitModal';
import { Footer } from './components/Footer';

export default function App() {
  const [isCockpitOpen, setIsCockpitOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'overview' | 'capabilities'>('overview');

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

  const handleNavigate = (page: 'overview' | 'capabilities', sectionId?: string) => {
    if (page === 'capabilities') {
      setCurrentPage('capabilities');
      window.location.hash = '#capabilities';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentPage('overview');
      if (sectionId) {
        window.location.hash = `#${sectionId}`;
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 80);
      } else {
        window.location.hash = '#';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  // Keyboard shortcut listener for ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (currentPage !== 'overview') {
          handleNavigate('overview', 'matrix');
        }
        setTimeout(() => {
          const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement | null;
          if (searchInput) {
            searchInput.focus();
          }
        }, 150);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-[#051424] text-[#d4e4fa] font-['Geist'] selection:bg-primary/20 selection:text-primary relative overflow-x-hidden">
      {/* Background radial glowing gradients matching design */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[500px] bg-primary/5 rounded-full blur-[140px] pointer-events-none -z-0"></div>
      <div className="fixed top-1/3 right-10 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[160px] pointer-events-none -z-0"></div>
      <div className="fixed bottom-20 left-10 w-[700px] h-[600px] bg-primary-container/5 rounded-full blur-[180px] pointer-events-none -z-0"></div>

      {/* Global Navigation Header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenCockpit={() => setIsCockpitOpen(true)}
      />

      {/* Main Content Area */}
      <main className="pt-20">
        {currentPage === 'overview' ? (
          <>
            <HeroSection
              onOpenCockpit={() => setIsCockpitOpen(true)}
              onNavigateCapabilities={() => handleNavigate('capabilities')}
            />
            <DiagnosticsCluster onOpenCockpit={() => setIsCockpitOpen(true)} />
            <NodeMatrix />
            <ScopingSection />
          </>
        ) : (
          <div id="capabilities">
            <CapabilitiesPage
              onScheduleScoping={() => handleNavigate('overview', 'consultation')}
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
