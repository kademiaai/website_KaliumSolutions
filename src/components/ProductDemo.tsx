import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  ArrowCounterClockwiseIcon,
  ArrowsClockwiseIcon,
  CubeIcon,
  FactoryIcon,
  FlaskIcon,
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon,
  WarningIcon,
  CheckCircleIcon,
  XIcon,
} from '@phosphor-icons/react';
import type { ElementInfo, Stage } from '../demo/engine';
import type { Reading, SceneController, SceneDef } from '../demo/scenes';
import { BASE_EASE, BounceIn, Container, Reveal, SectionHeader } from './ui';

type TabId = SceneDef['id'];

const TABS: { id: TabId; label: string; sub: string; icon: React.ElementType; blurb: string }[] = [
  {
    id: 'plant',
    label: 'Plant digital twin',
    sub: 'A metered dairy powder line',
    icon: FactoryIcon,
    blurb:
      'A powdered milk plant instrumented end to end: process line, utilities and meters on the OT network, the Edge Kit panel, and the encrypted link to Kalium operations. Cut the uplink to see the factory keep running.',
  },
  {
    id: 'kit',
    label: 'Edge Kit',
    sub: 'Built and tested on our bench',
    icon: CubeIcon,
    blurb:
      'The bench where every Edge Kit is built and accepted: the build machine and fleet gateway, two Kits on DIN rail plates, the office and OT switches, and a PLC simulator. Click either Kit to open it and see the hardware and software inside, or take the tour to follow a Kit from image build to factory profile.',
  },
  {
    id: 'lab',
    label: 'Simulation lab',
    sub: 'Test before you touch a line',
    icon: FlaskIcon,
    blurb:
      'Our bench: PLC simulators for four protocols drive a production Kit, which reports to the fleet gateway. Inject a bearing fault and watch the anomaly score climb and the alarm reach the factory console.',
  },
];

const toneClass = { ok: 'text-ok', watch: 'text-watch', critical: 'text-critical' } as const;

const iconButton =
  'flex h-9 w-9 items-center justify-center rounded-lg border border-line-strong bg-canvas/80 text-fg backdrop-blur transition hover:bg-panel-2 active:scale-[0.98] aria-pressed:border-accent aria-pressed:text-accent';

export const ProductDemo: React.FC = () => {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<Stage | null>(null);
  const ctrlRef = useRef<SceneController | null>(null);

  const [near, setNear] = useState(false);
  const [tab, setTab] = useState<TabId>('plant');
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');
  const [ctrl, setCtrl] = useState<SceneController | null>(null);
  const [selected, setSelected] = useState<ElementInfo | null>(null);
  const [readings, setReadings] = useState<{ rows: Reading[]; status: string } | null>(null);
  const [layerOn, setLayerOn] = useState<Record<string, boolean>>({});
  const [actionOn, setActionOn] = useState<Record<string, boolean>>({});
  const [autoRotate, setAutoRotate] = useState(false);
  const [toast, setToast] = useState<{ message: string; tone: 'warn' | 'ok' } | null>(null);
  const [step, setStep] = useState<number | null>(null);
  const [mode, setMode] = useState<{ title: string; hint: string } | null>(null);

  // Load three.js only when the section comes near the viewport.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: '600px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Build the active scene; tear down the previous one.
  useEffect(() => {
    if (!near || !hostRef.current) return;
    let cancelled = false;
    setStatus('loading');
    setSelected(null);
    setReadings(null);
    setToast(null);
    setActionOn({});
    setStep(null);
    setMode(null);
    Promise.all([import('../demo/engine'), import('../demo/scenes')])
      .then(([engine, scenes]) => {
        if (cancelled || !hostRef.current) return;
        const def = scenes.SCENES[tab];
        let stage: Stage;
        try {
          stage = engine.createStage(hostRef.current, { ...def.stage, reducedMotion: !!reduce, onSelect: setSelected });
        } catch {
          setStatus('error');
          return;
        }
        const c = def.build(stage);
        stageRef.current = stage;
        ctrlRef.current = c;
        setCtrl(c);
        setLayerOn(Object.fromEntries((c.layers ?? []).map((l) => [l.id, true])));
        setAutoRotate(!!def.stage.autoRotate && !reduce);
        c.onReadings?.((rows, s) => setReadings({ rows, status: s }));
        c.onMode?.(setMode);
        setStatus('ready');
      })
      .catch(() => !cancelled && setStatus('error'));
    return () => {
      cancelled = true;
      ctrlRef.current?.dispose?.();
      stageRef.current?.dispose();
      ctrlRef.current = null;
      stageRef.current = null;
      setCtrl(null);
    };
  }, [near, tab, reduce]);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 7000);
    return () => window.clearTimeout(t);
  }, [toast]);

  const toggleLayer = (id: string) => {
    const on = !layerOn[id];
    setLayerOn((s) => ({ ...s, [id]: on }));
    stageRef.current?.setLayer(id, on);
  };
  const toggleAction = (id: string) => {
    const on = !actionOn[id];
    setActionOn((s) => ({ ...s, [id]: on }));
    const r = ctrlRef.current?.runAction?.(id, on);
    if (r) setToast(r);
  };
  const goStep = (i: number | null) => {
    setStep(i);
    ctrlRef.current?.steps?.go(i);
  };
  const active = TABS.find((t) => t.id === tab)!;

  return (
    <section id="demo" ref={sectionRef} aria-labelledby="demo-heading" className="py-24">
      <Container className="flex flex-col gap-12">
        <Reveal>
          <SectionHeader
            id="demo-heading"
            eyebrow="Product demo"
            title="Walk through the platform in 3D"
            intro="Three interactive scenes built from our reference deployment. Drag to orbit, click any part to see what it does, and run a scenario to see how the system behaves."
          />
        </Reveal>

        <div className="flex flex-col gap-4">
          <div role="tablist" aria-label="Demo scenes" className="grid gap-2 sm:grid-cols-3">
            {TABS.map((t, i) => {
              const Icon = t.icon;
              const on = t.id === tab;
              return (
                <BounceIn key={t.id} index={i} from="up">
                  <button
                    type="button"
                    role="tab"
                    id={`tab-${t.id}`}
                    aria-selected={on}
                    aria-controls="demo-viewer"
                    onClick={() => setTab(t.id)}
                    className={`flex w-full items-center gap-3 rounded-xl border p-4 text-left transition duration-300 active:scale-[0.98] ${
                      on ? 'border-accent bg-panel' : 'border-line bg-canvas hover:border-line-strong hover:bg-panel'
                    }`}
                  >
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${
                        on ? 'border-accent text-accent' : 'border-line-strong text-fg-muted'
                      }`}
                    >
                      <Icon size={20} aria-hidden="true" />
                    </span>
                    <span className="flex flex-col">
                      <span className="title-3 text-fg">{t.label}</span>
                      <span className="caption-5 text-fg-faint">{t.sub}</span>
                    </span>
                  </button>
                </BounceIn>
              );
            })}
          </div>

          <div
            id="demo-viewer"
            role="tabpanel"
            aria-labelledby={`tab-${tab}`}
            className="relative h-[560px] overflow-hidden rounded-2xl border border-line bg-canvas lg:h-[640px]"
            onPointerDown={() => stageRef.current?.setZoom(true)}
            onPointerLeave={() => stageRef.current?.setZoom(false)}
          >
            <div ref={hostRef} className="absolute inset-0 isolate" aria-label={`${active.label}, interactive 3D scene`} />

            {/* Skeleton while three.js and the scene load */}
            {status !== 'ready' && status !== 'error' && (
              <div className="absolute inset-0 flex flex-col justify-end gap-3 p-6" aria-hidden="true">
                <div className="h-1/2 w-full animate-pulse rounded-xl bg-panel motion-reduce:animate-none" />
                <div className="flex gap-2">
                  <div className="h-9 w-32 animate-pulse rounded-lg bg-panel motion-reduce:animate-none" />
                  <div className="h-9 w-24 animate-pulse rounded-lg bg-panel motion-reduce:animate-none" />
                </div>
                <p className="caption-2 text-fg-faint">Loading the 3D scene</p>
              </div>
            )}
            {status === 'error' && (
              <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                <p className="body-6 max-w-sm text-fg-muted">
                  The 3D view could not start in this browser. It needs WebGL, which may be turned off. The rest of the page
                  works as normal.
                </p>
              </div>
            )}

            {/* Top bar: hint and view controls */}
            <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-3 sm:p-4">
              <div className="flex flex-col gap-1">
                <span className="w-fit rounded-md border border-line-strong bg-canvas/80 px-2 py-0.5 caption-4 text-fg-muted backdrop-blur">
                  Simulated data · reference deployment
                </span>
                <span className="hidden caption-5 text-fg-faint sm:block">Drag to orbit · click a part · click, then scroll to zoom</span>
              </div>
              <div className="pointer-events-auto flex gap-2">
                <button type="button" className={iconButton} aria-label="Zoom in" onClick={() => stageRef.current?.zoomBy(0.75)}>
                  <MagnifyingGlassPlusIcon size={16} aria-hidden="true" />
                </button>
                <button type="button" className={iconButton} aria-label="Zoom out" onClick={() => stageRef.current?.zoomBy(1.33)}>
                  <MagnifyingGlassMinusIcon size={16} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className={iconButton}
                  aria-label="Auto rotate"
                  aria-pressed={autoRotate}
                  onClick={() => {
                    stageRef.current?.setAutoRotate(!autoRotate);
                    setAutoRotate((v) => !v);
                  }}
                >
                  <ArrowsClockwiseIcon size={16} aria-hidden="true" />
                </button>
                <button type="button" className={iconButton} aria-label="Reset view" onClick={() => stageRef.current?.reset()}>
                  <ArrowCounterClockwiseIcon size={16} aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Live readings */}
            {readings && ctrl?.readingsTitle && (
              <aside
                aria-label={ctrl.readingsTitle}
                className="absolute right-4 top-16 hidden w-64 rounded-xl border border-line bg-canvas/80 p-4 backdrop-blur lg:block"
              >
                <p className="title-4 text-fg">{ctrl.readingsTitle}</p>
                <dl className="mt-2 flex flex-col">
                  {readings.rows.map((r) => (
                    <div key={r.label} className="flex items-baseline justify-between gap-2 border-t border-line py-2">
                      <dt className="caption-5 text-fg-muted">{r.label}</dt>
                      <dd className={`font-mono caption-3 ${r.tone ? toneClass[r.tone] : 'text-fg'}`}>
                        {r.value} <span className="caption-5 text-fg-faint">{r.unit}</span>
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-2 flex items-center gap-2 caption-5 text-fg-faint">
                  <span className="h-1.5 w-1.5 animate-blink rounded-full bg-data motion-reduce:animate-none" aria-hidden="true" />
                  {readings.status}
                </p>
              </aside>
            )}

            {/* Bottom toolbar: layers and scenario */}
            {ctrl && (ctrl.layers?.length || ctrl.actions?.length) ? (
              <div className="absolute bottom-3 left-3 right-16 flex flex-wrap gap-2 sm:bottom-4 sm:left-4 sm:right-auto">
                {ctrl.layers && ctrl.layers.length > 0 && (
                  <div role="group" aria-label="Layers" className="flex flex-wrap gap-1 rounded-xl border border-line bg-canvas/80 p-1 backdrop-blur">
                    {ctrl.layers.map((l) => (
                      <button
                        key={l.id}
                        type="button"
                        aria-pressed={!!layerOn[l.id]}
                        onClick={() => toggleLayer(l.id)}
                        className={`flex items-center gap-2 rounded-lg px-2 py-1 button-xsm transition active:scale-[0.98] ${
                          layerOn[l.id] ? 'bg-panel-2 text-fg' : 'text-fg-faint hover:text-fg'
                        }`}
                      >
                        <span className="h-2 w-2 rounded-full" style={{ background: l.color, opacity: layerOn[l.id] ? 1 : 0.35 }} aria-hidden="true" />
                        {l.label}
                      </button>
                    ))}
                  </div>
                )}
                {ctrl.actions?.map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    aria-pressed={!!actionOn[a.id]}
                    onClick={() => toggleAction(a.id)}
                    className={`flex items-center gap-2 rounded-xl border px-3 py-2 button-sm transition active:scale-[0.98] ${
                      actionOn[a.id]
                        ? 'border-critical bg-critical text-canvas'
                        : 'border-accent bg-accent text-canvas hover:bg-accent-hover'
                    }`}
                  >
                    <WarningIcon size={16} weight="bold" aria-hidden="true" />
                    {actionOn[a.id] ? a.activeLabel : a.label}
                  </button>
                ))}
              </div>
            ) : null}

            {/* Step through walkthrough (Edge Kit bench) */}
            {/* Inside view banner (Edge Kit) */}
            <AnimatePresence>
              {mode && (
                <motion.div
                  initial={{ opacity: 0, y: reduce ? 0 : -16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: BASE_EASE }}
                  className="absolute left-3 right-3 top-14 flex items-center gap-3 rounded-xl border border-line-strong bg-canvas/85 p-3 backdrop-blur sm:left-1/2 sm:right-auto sm:w-max sm:max-w-xl sm:-translate-x-1/2"
                >
                  <div className="flex min-w-0 flex-col">
                    <p className="title-4 text-fg">{mode.title}</p>
                    <p className="hidden caption-5 text-fg-muted sm:block">{mode.hint}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => ctrlRef.current?.exitMode?.()}
                    className="ml-auto shrink-0 rounded-lg bg-accent px-3 py-1 button-xsm text-canvas transition hover:bg-accent-hover active:scale-[0.98]"
                  >
                    Back to bench
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {ctrl?.steps && !mode && (
              <div className="absolute bottom-3 left-3 right-16 rounded-xl border border-line bg-canvas/85 p-3 backdrop-blur sm:bottom-4 sm:left-4 sm:right-auto sm:w-96 sm:p-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="caption-3 uppercase tracking-widest text-accent">{ctrl.steps.title}</p>
                  <p className="font-mono caption-5 text-fg-faint">
                    {step === null ? 'Overview' : `${step + 1} / ${ctrl.steps.items.length}`}
                  </p>
                </div>
                {step !== null && (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, ease: BASE_EASE }}
                      className="mt-2 flex flex-col gap-1"
                    >
                      <p className="title-3 text-fg">{ctrl.steps.items[step].title}</p>
                      <p className="hidden body-6 text-fg-muted sm:block">{ctrl.steps.items[step].body}</p>
                    </motion.div>
                  </AnimatePresence>
                )}
                {step === null && <p className="mt-2 hidden body-6 text-fg-muted sm:block">Both Kits online and reporting. Click a Kit to look inside, or start the tour to rebuild it phase by phase.</p>}
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex gap-1" aria-hidden="true">
                    {ctrl.steps.items.map((_, i) => (
                      <span key={i} className={`h-1.5 w-1.5 rounded-full ${step !== null && i <= step ? 'bg-accent' : 'bg-line-strong'}`} />
                    ))}
                  </div>
                  <div className="ml-auto flex gap-2">
                    {step !== null && (
                      <button type="button" onClick={() => goStep(null)} className="rounded-lg px-2 py-1 button-xsm text-fg-muted transition hover:text-fg active:scale-[0.98]">
                        Overview
                      </button>
                    )}
                    <button
                      type="button"
                      disabled={step === null || step === 0}
                      onClick={() => step !== null && goStep(step - 1)}
                      className="rounded-lg border border-line-strong px-2 py-1 button-xsm text-fg transition hover:bg-panel-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      disabled={step === ctrl.steps.items.length - 1}
                      onClick={() => goStep(step === null ? 0 : step + 1)}
                      className="rounded-lg bg-accent px-3 py-1 button-xsm text-canvas transition hover:bg-accent-hover active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {step === null ? 'Start tour' : 'Next step'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Toast for scenario results */}
            <AnimatePresence>
              {toast && (
                <motion.div
                  role="status"
                  initial={{ opacity: 0, y: reduce ? 0 : -16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: BASE_EASE }}
                  className={`absolute left-1/2 top-16 w-[calc(100%-32px)] max-w-lg -translate-x-1/2 rounded-xl border bg-canvas/90 p-4 backdrop-blur ${
                    toast.tone === 'warn' ? 'border-watch' : 'border-ok'
                  }`}
                >
                  <p className="flex items-start gap-2 body-6 text-fg">
                    {toast.tone === 'warn' ? (
                      <WarningIcon size={16} className="mt-0.5 shrink-0 text-watch" aria-hidden="true" />
                    ) : (
                      <CheckCircleIcon size={16} className="mt-0.5 shrink-0 text-ok" aria-hidden="true" />
                    )}
                    {toast.message}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Detail card for the selected part */}
            <AnimatePresence>
              {selected && (
                <motion.section
                  key={selected.id}
                  aria-live="polite"
                  aria-label={selected.name}
                  initial={{ opacity: 0, y: reduce ? 0 : 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: BASE_EASE }}
                  className={`absolute left-3 right-3 max-h-[42%] overflow-auto sm:max-h-[55%] rounded-xl border border-line-strong bg-panel/95 p-4 backdrop-blur sm:bottom-4 sm:left-auto sm:right-4 sm:top-auto sm:w-80 ${ctrl?.steps ? (mode ? 'bottom-3' : 'top-14') : 'bottom-16'}`}
                >
                  <button
                    type="button"
                    aria-label="Close details"
                    onClick={() => stageRef.current?.select(null)}
                    className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-lg text-fg-muted transition hover:bg-panel-2 hover:text-fg"
                  >
                    <XIcon size={16} aria-hidden="true" />
                  </button>
                  <p className="caption-3 uppercase tracking-widest text-accent">{selected.group}</p>
                  <h3 className="mt-2 pr-8 heading-6 text-fg">{selected.name}</h3>
                  <p className="mt-2 body-6 text-fg-muted">{selected.desc}</p>
                  {selected.rows.length > 0 && (
                    <dl className="mt-3 flex flex-col">
                      {selected.rows.map(([k, v]) => (
                        <div key={k} className="flex justify-between gap-3 border-t border-line py-2">
                          <dt className="caption-5 text-fg-faint">{k}</dt>
                          <dd className="text-right caption-4 text-fg">{v}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                  {selected.note && (
                    <p className="mt-3 rounded-lg border border-dashed border-line-strong p-3 caption-2 text-fg-muted">{selected.note}</p>
                  )}
                </motion.section>
              )}
            </AnimatePresence>
          </div>

          <p className="body-6 max-w-3xl text-fg-muted">{active.blurb}</p>
        </div>
      </Container>
    </section>
  );
};
