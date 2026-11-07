import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRightIcon, ShieldCheckIcon } from '@phosphor-icons/react';
import { PROTOCOLS } from '../content';
import { HeroDashboard } from './HeroDashboard';
import { BASE_EASE, BounceIn, Container, Eyebrow, primaryButton } from './ui';

export const Hero: React.FC = () => {
  const reduce = useReducedMotion();
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 32 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: BASE_EASE, delay },
  });

  return (
    <section id="top" aria-labelledby="hero-heading" className="pt-24">
      <Container className="flex flex-col gap-12 pt-16">
        <motion.div {...rise(0)} className="flex flex-col gap-6">
          <Eyebrow>Industrial IoT for manufacturing plants</Eyebrow>

          <h1 id="hero-heading" className="heading-3 sm:heading-2 lg:heading-1 max-w-[680px] text-hero-gradient">
            Output, energy <br className="hidden sm:block" />
            and machine health <br className="hidden sm:block" />
            for every line
          </h1>

          <p className="body-3 max-w-[680px] text-fg-muted">
            Kalium reads the PLCs, meters and sensors already on your floor to produce automatic shift and batch reports,
            energy and utility use per unit produced, and early warning of failing equipment. Data is processed at the
            edge and stays in your plant.
          </p>

          <div className="flex flex-col gap-3">
            <div>
              <a href="#contact" className={`${primaryButton} group`}>
                Book a technical demo
                <ArrowRightIcon
                  size={16}
                  weight="bold"
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </a>
            </div>
            <p className="flex items-start gap-2 caption-2 text-fg-muted">
              <ShieldCheckIcon size={16} className="mt-0.5 shrink-0 text-ok" aria-hidden="true" />
              Starts with a scoped audit of one line. NDA signed before any plant data is shared.
            </p>
          </div>
        </motion.div>

        {/* Proof signal: the controllers it connects to */}
        <motion.div {...rise(0.1)} className="flex flex-col gap-3">
          <p className="caption-4 text-fg-faint">Reads directly from</p>
          <ul className="flex flex-wrap gap-2">
            {PROTOCOLS.map((p, i) => (
              <BounceIn
                as="li"
                key={p}
                index={i}
                baseDelay={0.3}
                className="rounded-md border border-line bg-panel px-2 py-1 font-mono caption-4 text-fg-muted transition-transform duration-300 hover:scale-110"
              >
                {p}
              </BounceIn>
            ))}
          </ul>
        </motion.div>

        <motion.div {...rise(0.2)}>
          <HeroDashboard />
        </motion.div>
      </Container>
    </section>
  );
};
