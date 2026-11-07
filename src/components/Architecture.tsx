import React from 'react';
import { ChartLineUpIcon, CpuIcon, FlowArrowIcon, WaveformIcon, GitBranchIcon, BroadcastIcon } from '@phosphor-icons/react';
import { COLLECTOR_YAML, PIPELINE, SPARKPLUG_PAYLOAD, SPARKPLUG_TOPIC } from '../content';
import { BounceIn, Container, Reveal, SectionHeader } from './ui';

const stageIcons = {
  collectors: CpuIcon,
  pipeline: FlowArrowIcon,
  ml: WaveformIcon,
  dashboards: ChartLineUpIcon,
} as const;

// Minimal highlighter for YAML and JSON: comments, keys, strings and numbers.
function highlight(line: string) {
  if (/^\s*#/.test(line)) return <span className="text-fg-faint">{line}</span>;
  const parts = line.split(/("[^"]*"\s*:|"[^"]*"|^\s*-?\s*[\w.]+:|\b\d+(?:\.\d+)?\b)/g);
  return parts.map((part, i) => {
    if (!part) return null;
    if (/^"[^"]*"\s*:$/.test(part) || /^\s*-?\s*[\w.]+:$/.test(part)) {
      return <span key={i} className="text-fg-muted">{part}</span>;
    }
    if (/^"/.test(part)) return <span key={i} className="text-data">{part}</span>;
    if (/^\d/.test(part)) return <span key={i} className="text-accent">{part}</span>;
    return <span key={i} className="text-fg">{part}</span>;
  });
}

const CodePanel: React.FC<{
  file: string;
  label: string;
  icon: React.ElementType;
  code: string;
}> = ({ file, label, icon: Icon, code }) => (
  <figure className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-line bg-panel">
    <figcaption className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
      <span className="flex min-w-0 items-center gap-2">
        <Icon size={16} className="shrink-0 text-fg-muted" aria-hidden="true" />
        <span className="truncate font-mono caption-4 text-fg">{file}</span>
      </span>
      <span className="shrink-0 rounded-md border border-line-strong px-2 py-0.5 caption-4 text-fg-muted">{label}</span>
    </figcaption>
    <pre className="overflow-x-auto p-4 font-mono caption-5">
      <code>
        {code.split('\n').map((line, i) => (
          <div key={i} className="whitespace-pre">
            {highlight(line) || ' '}
          </div>
        ))}
      </code>
    </pre>
  </figure>
);

export const Architecture: React.FC = () => (
  <section id="architecture" aria-labelledby="architecture-heading" className="py-24">
    <Container className="flex flex-col gap-12">
      <Reveal>
        <SectionHeader
          id="architecture-heading"
          eyebrow="Architecture"
          title="One pipeline from PLC tag to report and alert"
          intro="Every stage runs as a versioned container, configured from a Git repository your team can review."
        />
      </Reveal>

      <Reveal className="flex flex-col gap-4">
        {/* Data track: a packet travels left to right across the stages. */}
        <div className="relative hidden h-px overflow-hidden bg-line lg:block" aria-hidden="true">
          <div className="absolute inset-0 animate-flow motion-reduce:hidden">
            <div className="absolute right-0 top-0 h-px w-24 bg-accent" />
          </div>
        </div>

        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PIPELINE.map((stage, i) => {
            const Icon = stageIcons[stage.key];
            return (
              <BounceIn
                as="li"
                from="up"
                index={i}
                key={stage.key}
                className="group relative flex flex-col gap-4 rounded-xl border border-line bg-panel p-6 transition-colors duration-500 hover:border-line-strong"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-line-strong bg-panel-2 text-fg transition-transform duration-[600ms] group-hover:scale-110">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <span className="font-mono caption-4 text-fg-faint">0{i + 1}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="title-2 text-fg">{stage.title}</h3>
                  <p className="body-6 text-fg-muted">{stage.body}</p>
                </div>
                <ul className="mt-auto flex flex-col gap-2 border-t border-line pt-4">
                  {stage.specs.map((s) => (
                    <li key={s} className="flex items-center gap-2 font-mono caption-5 text-fg-muted">
                      <span className="h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                      {s}
                    </li>
                  ))}
                </ul>
              </BounceIn>
            );
          })}
        </ol>
      </Reveal>

      <Reveal className="grid gap-4 lg:grid-cols-2">
        <CodePanel file="edge/line-3/collector.yaml" label="In Git" icon={GitBranchIcon} code={COLLECTOR_YAML} />
        <div className="flex min-w-0 flex-col gap-4">
          <CodePanel file={SPARKPLUG_TOPIC} label="On the wire" icon={BroadcastIcon} code={SPARKPLUG_PAYLOAD} />
          <p className="body-6 text-fg-muted">
            The collector config is merged through a pull request and rolled out to the gateway. The gateway then
            publishes each asset as a Sparkplug B device, so dashboards, historians and the ML engine all read the same
            topic tree. Example configuration shown.
          </p>
        </div>
      </Reveal>
    </Container>
  </section>
);
