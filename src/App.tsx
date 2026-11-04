import React from 'react';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Architecture } from './components/Architecture';
import { Capabilities } from './components/Capabilities';
import { TaglineReveal } from './components/TaglineReveal';
import { UseCases, HowItWorks } from './components/UseCases';
import { Faq } from './components/Faq';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { MotionBand } from './components/MotionBand';
import { FloatingActions } from './components/FloatingActions';

export default function App() {
  return (
    <div className="min-h-screen overflow-x-clip bg-canvas text-fg">
      <a
        href="#main"
        className="sr-only z-[60] rounded-lg bg-accent px-3 py-2 button-sm text-canvas focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <MotionBand
          accent="Predictive"
          title="maintenance"
          caption="Vibration, current and temperature from every rotating asset, streamed continuously and scored against its own baseline."
          scene="signals"
          sceneLabel="Animated vibration traces for five assets. Two show the repeating impulses of a bearing defect."
        />
        <Architecture />
        <Capabilities />
        <TaglineReveal />
        <UseCases />
        <MotionBand
          accent="Edge to cloud"
          title="telemetry"
          caption="Gateways on every line publish to one broker. Historians, the ML engine and dashboards all read the same topic tree."
          scene="telemetry"
          sceneLabel="Animated data flow from six edge gateways through an MQTT broker to a historian, the ML engine and dashboards."
        />
        <HowItWorks />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
