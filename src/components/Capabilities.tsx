import React from 'react';
import { ChartBarIcon, GaugeIcon, GitBranchIcon, LightningIcon, PlugsConnectedIcon, StackIcon, CheckIcon } from '@phosphor-icons/react';
import { CAPABILITIES } from '../content';
import { BounceIn, Container, Reveal, SectionHeader } from './ui';

const icons = {
  production: ChartBarIcon,
  energy: LightningIcon,
  pdm: GaugeIcon,
  bridge: PlugsConnectedIcon,
  gitops: GitBranchIcon,
  edge: StackIcon,
} as const;

export const Capabilities: React.FC = () => (
  <section id="capabilities" aria-labelledby="capabilities-heading" className="py-24">
    <Container className="flex flex-col gap-12">
      <Reveal>
        <SectionHeader
          id="capabilities-heading"
          eyebrow="Capabilities"
          title="Six building blocks on one pipeline"
          intro="Production reports, energy monitoring and predictive maintenance share the same Kit and the same data. Start with the one that solves today’s problem and add the rest later."
        />
      </Reveal>

      {/* Hairline grid: 1px gaps over a #272727 fill draw the dividers, so no card gets a one sided border. */}
      <Reveal>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((cap, i) => {
            const Icon = icons[cap.key];
            return (
              <article key={cap.key} className="group flex flex-col gap-6 bg-canvas p-6 transition-colors hover:bg-panel sm:p-8">
                <BounceIn index={i} className="w-fit">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-line-strong bg-panel-2 text-accent transition-transform duration-[600ms] group-hover:scale-110">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                </BounceIn>
                <div className="flex flex-col gap-2">
                  <h3 className="title-1 text-fg">{cap.title}</h3>
                  <p className="body-6 text-fg-muted">{cap.body}</p>
                </div>
                <ul className="flex flex-col gap-2">
                  {cap.specs.map((s) => (
                    <li key={s} className="flex items-start gap-2 body-6 text-fg">
                      <CheckIcon size={16} weight="bold" className="mt-0.5 shrink-0 text-ok" aria-hidden="true" />
                      {s}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </Reveal>
    </Container>
  </section>
);
