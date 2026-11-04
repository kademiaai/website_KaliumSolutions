import React from 'react';
import { ClipboardTextIcon, GaugeIcon, PulseIcon } from '@phosphor-icons/react';
import { STEPS, USE_CASES } from '../content';
import { Container, Reveal, SectionHeader } from './ui';

const icons = { rotating: GaugeIcon, downtime: PulseIcon, workflows: ClipboardTextIcon } as const;

export const UseCases: React.FC = () => (
  <section id="use-cases" aria-labelledby="use-cases-heading" className="py-24">
    <Container className="flex flex-col gap-12">
      <Reveal>
        <SectionHeader
          id="use-cases-heading"
          eyebrow="Use cases"
          title="Where plants start"
          intro="The three problems we are most often asked to solve first."
        />
      </Reveal>

      <div className="grid gap-4 lg:grid-cols-3">
        {USE_CASES.map((uc, i) => {
          const Icon = icons[uc.key];
          return (
            <Reveal key={uc.key} delay={i * 0.08} className="h-full">
              <article className="flex h-full flex-col gap-6 rounded-xl border border-line bg-panel p-6">
                <div className="flex flex-col gap-4">
                  <Icon size={24} className="text-accent" aria-hidden="true" />
                  <p className="caption-4 text-fg-faint">{uc.tag}</p>
                  <h3 className="heading-6 text-fg">{uc.title}</h3>
                </div>
                <dl className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <dt className="caption-3 uppercase tracking-widest text-fg-faint">What we measure</dt>
                    <dd className="body-6 text-fg-muted">{uc.measure}</dd>
                  </div>
                  <div className="flex flex-col gap-1">
                    <dt className="caption-3 uppercase tracking-widest text-fg-faint">What you get</dt>
                    <dd className="body-6 text-fg">{uc.outcome}</dd>
                  </div>
                </dl>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Container>
  </section>
);

export const HowItWorks: React.FC = () => (
  <section id="how-it-works" aria-labelledby="how-heading" className="py-24">
    <Container className="flex flex-col gap-12">
      <Reveal>
        <SectionHeader id="how-heading" eyebrow="How it works" title="From audit to fleet rollout in three steps" />
      </Reveal>

      <Reveal>
        <ol className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
          {STEPS.map((step, i) => (
            <li key={step.title} className="flex flex-col gap-4 bg-canvas p-6 sm:p-8">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line-strong font-mono caption-3 text-accent">
                {i + 1}
              </span>
              <h3 className="title-1 text-fg">{step.title}</h3>
              <p className="body-6 text-fg-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </Container>
  </section>
);
