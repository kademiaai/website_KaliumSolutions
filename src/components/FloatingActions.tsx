import React from 'react';
import { CalendarCheckIcon, EnvelopeSimpleIcon } from '@phosphor-icons/react';
import { CONTACT_EMAIL } from '../content';
import { BounceIn } from './ui';

// Floating round buttons, after the social stack on abvietnam.vn: bounce in once, grow 10% on hover.
const button =
  'flex h-12 w-12 items-center justify-center rounded-full border transition-transform duration-300 hover:scale-110 active:scale-[0.98]';

export const FloatingActions: React.FC = () => (
  <aside aria-label="Quick contact" className="fixed bottom-4 right-4 z-40 flex flex-col gap-3">
    <BounceIn index={0} baseDelay={1}>
      <a
        href="#contact"
        aria-label="Book a technical demo"
        title="Book a technical demo"
        className={`${button} border-accent bg-accent text-canvas`}
      >
        <CalendarCheckIcon size={20} weight="bold" aria-hidden="true" />
      </a>
    </BounceIn>
    <BounceIn index={1} baseDelay={1}>
      <a
        href={`mailto:${CONTACT_EMAIL}`}
        aria-label={`Email ${CONTACT_EMAIL}`}
        title={CONTACT_EMAIL}
        className={`${button} border-line-strong bg-panel text-fg`}
      >
        <EnvelopeSimpleIcon size={20} aria-hidden="true" />
      </a>
    </BounceIn>
  </aside>
);
