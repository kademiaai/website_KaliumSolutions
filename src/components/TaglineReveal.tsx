import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { TAGLINE } from '../content';
import { Container } from './ui';

// Mandatory tagline reveal (skill B11): words light up one at a time, in reading order, as the
// section scrolls past a trigger line. One scroll listener, throttled through requestAnimationFrame.
export const TaglineReveal: React.FC = () => {
  const words = TAGLINE.split(' ');
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const [lit, setLit] = useState(0);

  useEffect(() => {
    if (reduce) {
      setLit(words.length);
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Progress runs from 0 when the text top reaches 85% of the viewport to 1 when its bottom reaches 45%.
      const start = vh * 0.85;
      const end = vh * 0.45;
      const progress = (start - rect.top) / (start - end + rect.height);
      const clamped = Math.max(0, Math.min(1, progress));
      // Words stay lit once revealed, so the section plays once.
      setLit((prev) => Math.max(prev, Math.round(clamped * words.length)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduce, words.length]);

  return (
    <section aria-label="What Kalium does" className="py-24">
      <Container>
        <p ref={ref} className="heading-4 sm:heading-3 lg:heading-2 mx-auto max-w-[680px] text-center text-fg">
          <span className="sr-only">{TAGLINE}</span>
          <span aria-hidden="true">
            {words.map((word, i) => (
              <span
                key={i}
                className="transition-opacity duration-500"
                style={{ opacity: i < lit ? 1 : 0.3 }}
              >
                {word}{' '}
              </span>
            ))}
          </span>
        </p>
      </Container>
    </section>
  );
};
