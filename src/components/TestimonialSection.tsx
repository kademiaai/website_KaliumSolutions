import React, { useState } from 'react';

export const TestimonialSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      quote:
        '“Kalium Solutions unlocked actionable insights from our legacy filling lines that we couldn’t access for years. Their deep OT/IT expertise and agile PowerPlatform implementation transformed our factory floor efficiency with zero disruption to active shifts.”',
      author: 'Senior Operations Director',
      company: 'Global FMCG & Beverage Manufacturing Plant',
    },
    {
      quote:
        '“The Remaining Useful Life (RUL) predictive algorithm detected high-frequency vibration harmonic spikes in our main extrusion line 18 days before catastrophic breakdown. It prevented a 5-day stoppage and saved an estimated $420,000 in throughput.”',
      author: 'VP of Reliability & Maintenance',
      company: 'Precision Automotive Component Facility',
    },
    {
      quote:
        '“By establishing a Unified Namespace with edge MQTT brokers and Microsoft Dataverse, Kalium bridged our 30-year-old Siemens and Beckhoff PLCs directly into corporate reporting with sub-second deterministic synchronization.”',
      author: 'Head of Industrial Digitalization',
      company: 'European Dairy Nutrition Manufacturer',
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const current = testimonials[currentIndex];

  return (
    <section className="relative w-full py-space-4xl bg-surface-container-lowest overflow-hidden">
      {/* Starfield & Cosmic Ambient Particles Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(76,215,246,0.06)_0%,transparent_70%)] pointer-events-none"></div>

      <div className="relative max-w-4xl mx-auto px-gutter-mobile lg:px-gutter-desktop text-center">
        {/* Quote Symbol */}
        <span className="material-symbols-outlined text-secondary/40 text-[56px] mb-space-md select-none">
          format_quote
        </span>

        {/* Testimonial Quote */}
        <blockquote className="font-headline-md text-headline-sm lg:text-headline-md text-on-surface font-normal leading-relaxed mb-space-2xl min-h-[120px] flex items-center justify-center transition-all duration-300">
          {current.quote}
        </blockquote>

        {/* Author */}
        <div className="flex flex-col items-center">
          <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
            {current.author}
          </span>
          <span className="font-label-code text-label-code text-secondary tracking-widest uppercase mt-space-2xs">
            {current.company}
          </span>
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center justify-center gap-space-md mt-space-2xl">
          <button
            onClick={handlePrev}
            type="button"
            aria-label="Previous Testimonial"
            className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-variant transition-colors shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>
          <div className="flex items-center gap-1.5 px-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all cursor-pointer ${
                  currentIndex === idx
                    ? 'w-6 h-1.5 bg-secondary rounded-full'
                    : 'w-1.5 h-1.5 bg-surface-variant hover:bg-on-surface-variant rounded-full'
                }`}
              />
            ))}
          </div>
          <button
            onClick={handleNext}
            type="button"
            aria-label="Next Testimonial"
            className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-variant transition-colors shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </section>
  );
};
