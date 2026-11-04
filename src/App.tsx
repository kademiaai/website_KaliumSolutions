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
        <Architecture />
        <Capabilities />
        <TaglineReveal />
        <UseCases />
        <HowItWorks />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
