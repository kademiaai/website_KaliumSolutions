import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRightIcon, ShieldCheckIcon } from '@phosphor-icons/react';
import { PROTOCOLS } from '../content';
import { AssetHealthPanel } from './AssetHealthPanel';
import { BASE_EASE, Container, Eyebrow, primaryButton } from './ui';

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
          <Eyebrow>IIoT condition monitoring and predictive maintenance</Eyebrow>

          <h1 id="hero-heading" className="heading-3 sm:heading-2 lg:heading-1 max-w-[680px] text-hero-gradient">
            Find failing equipment <br className="hidden sm:block" />
            before it stops your line
          </h1>

          <p className="body-3 max-w-[680px] text-fg-muted">
            Kalium reads vibration, current and temperature from the PLCs and sensors already on your floor, flags
            anomalies at the edge, and estimates remaining useful life for every rotating asset.
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
            {PROTOCOLS.map((p) => (
              <li key={p} className="rounded-md border border-line bg-panel px-2 py-1 font-mono caption-4 text-fg-muted">
                {p}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div {...rise(0.2)}>
          <AssetHealthPanel />
        </motion.div>
      </Container>
    </section>
  );
};
