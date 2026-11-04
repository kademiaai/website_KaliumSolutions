import React from 'react';
import { PlusIcon } from '@phosphor-icons/react';
import { FAQ } from '../content';
import { Container, Reveal, SectionHeader } from './ui';

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

export const Faq: React.FC = () => (
  <section id="faq" aria-labelledby="faq-heading" className="py-24">
    <Container className="grid gap-12 lg:grid-cols-3">
      <Reveal>
        <SectionHeader
          id="faq-heading"
          eyebrow="FAQ"
          title="Technical questions"
          intro="Not covered here? Add it to your demo request and an engineer will answer."
        />
      </Reveal>

      <Reveal className="lg:col-span-2">
        <div className="overflow-hidden rounded-2xl border border-line">
          {FAQ.map((item, i) => (
            <details
              key={item.q}
              className={`group bg-canvas ${i > 0 ? 'border-t border-line' : ''}`}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 transition-colors hover:bg-panel [&::-webkit-details-marker]:hidden">
                <span className="title-3 text-fg">{item.q}</span>
                <PlusIcon
                  size={16}
                  weight="bold"
                  aria-hidden="true"
                  className="shrink-0 text-fg-muted transition-transform duration-500 group-open:rotate-45"
                />
              </summary>
              <p className="px-6 pb-6 body-6 text-fg-muted opacity-0 transition-opacity duration-500 group-open:opacity-100">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </Reveal>
    </Container>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
  </section>
);
