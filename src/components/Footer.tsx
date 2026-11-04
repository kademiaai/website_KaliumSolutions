import React from 'react';
import { EnvelopeSimpleIcon, MapPinIcon } from '@phosphor-icons/react';
import { CONTACT_EMAIL, NAV_LINKS } from '../content';
import { Container } from './ui';

export const Footer: React.FC = () => (
  <footer className="border-t border-line py-16">
    <Container className="flex flex-col gap-12">
      <div className="grid gap-12 md:grid-cols-3">
        <div className="flex flex-col gap-4">
          <a href="#top" className="flex w-fit items-center gap-2 rounded-lg">
            <img src="/logo.svg" alt="" width={24} height={24} className="h-6 w-6" />
            <span className="title-3 text-fg">Kalium Solutions</span>
          </a>
          <p className="body-6 max-w-xs text-fg-muted">
            Industrial IoT, condition monitoring and predictive maintenance for manufacturing plants.
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-3">
          <p className="caption-3 uppercase tracking-widest text-fg-faint">Product</p>
          <ul className="flex flex-col gap-2">
            {[...NAV_LINKS, { id: 'how-it-works', label: 'How it works' }, { id: 'contact', label: 'Book a technical demo' }].map(
              (l) => (
                <li key={l.id}>
                  <a href={`#${l.id}`} className="rounded-md body-6 text-fg-muted transition-colors hover:text-fg">
                    {l.label}
                  </a>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex flex-col gap-3">
          <p className="caption-3 uppercase tracking-widest text-fg-faint">Contact</p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="flex w-fit items-center gap-2 rounded-md body-6 text-fg-muted transition-colors hover:text-fg"
          >
            <EnvelopeSimpleIcon size={16} aria-hidden="true" />
            {CONTACT_EMAIL}
          </a>
          <p className="flex items-center gap-2 body-6 text-fg-muted">
            <MapPinIcon size={16} aria-hidden="true" />
            Vietnam · Southeast Asia · EU
          </p>
        </div>
      </div>

      <p className="caption-5 text-fg-faint">
        © {new Date().getFullYear()} Kalium Solutions Co., Ltd. All rights reserved.
      </p>
    </Container>
  </footer>
);
