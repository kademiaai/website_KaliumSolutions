import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChartBarIcon, GaugeIcon, LightningIcon, WarningIcon } from '@phosphor-icons/react';
import { CONSUMPTION, PRODUCTION } from '../content';
import { AssetHealthPanel } from './AssetHealthPanel';
import { BASE_EASE } from './ui';

type View = 'production' | 'consumption' | 'health';

const VIEWS: { id: View; label: string; icon: React.ElementType; meta: string }[] = [
  { id: 'production', label: 'Production', icon: ChartBarIcon, meta: 'Today · 3 shifts' },
  { id: 'consumption', label: 'Consumption', icon: LightningIcon, meta: 'Today · 4 utilities' },
  { id: 'health', label: 'Machine health', icon: GaugeIcon, meta: '5 assets monitored' },
];

const fmt = (n: number) => n.toLocaleString('en-US');

const ProductionView: React.FC = () => {
  const plan = PRODUCTION.shifts.reduce((a, s) => a + s.plan, 0);
  const actual = PRODUCTION.shifts.reduce((a, s) => a + s.actual, 0);
  const maxStop = Math.max(...PRODUCTION.stops.map((s) => s.minutes));
  return (
    <div className="grid lg:grid-cols-5">
      <div className="flex flex-col gap-4 p-4 lg:col-span-3">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-lg border border-line bg-canvas p-3">
            <p className="caption-5 text-fg-faint">OEE</p>
            <p className="font-mono heading-5 text-fg">{PRODUCTION.oee}%</p>
          </div>
          {PRODUCTION.parts.map((p) => (
            <div key={p.label} className="rounded-lg border border-line bg-canvas p-3">
              <p className="caption-5 text-fg-faint">{p.label}</p>
              <p className="font-mono heading-6 text-fg">{p.value}%</p>
            </div>
          ))}
        </div>
        <table className="w-full text-left">
          <caption className="sr-only">Output against plan per shift</caption>
          <thead>
            <tr className="caption-4 text-fg-faint">
              <th scope="col" className="py-2 font-medium">Shift</th>
              <th scope="col" className="py-2 text-right font-medium">Cases</th>
              <th scope="col" className="hidden py-2 text-right font-medium sm:table-cell">Plan</th>
              <th scope="col" className="py-2 text-right font-medium">OEE</th>
            </tr>
          </thead>
          <tbody>
            {PRODUCTION.shifts.map((s) => (
              <tr key={s.shift} className="border-t border-line">
                <td className="py-2 title-4 text-fg">{s.shift}</td>
                <td className="py-2 text-right font-mono caption-4 text-fg">{fmt(s.actual)}</td>
                <td className="hidden py-2 text-right font-mono caption-4 text-fg-faint sm:table-cell">{fmt(s.plan)}</td>
                <td className={`py-2 text-right font-mono caption-4 ${s.oee < 70 ? 'text-watch' : 'text-ok'}`}>{s.oee}%</td>
              </tr>
            ))}
            <tr className="border-t border-line-strong">
              <td className="py-2 title-4 text-fg">Today</td>
              <td className="py-2 text-right font-mono caption-3 text-fg">{fmt(actual)}</td>
              <td className="hidden py-2 text-right font-mono caption-4 text-fg-faint sm:table-cell">{fmt(plan)}</td>
              <td className="py-2 text-right font-mono caption-3 text-fg">{((actual / plan) * 100).toFixed(1)}% of plan</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex flex-col gap-3 border-t border-line p-4 lg:col-span-2 lg:border-l lg:border-t-0">
        <div className="flex items-baseline justify-between gap-2">
          <p className="title-4 text-fg">Top stop reasons</p>
          <p className="caption-5 text-fg-faint">minutes lost today</p>
        </div>
        <ul className="flex flex-col gap-3">
          {PRODUCTION.stops.map((s, i) => (
            <li key={s.reason} className="flex flex-col gap-1">
              <div className="flex items-baseline justify-between gap-2">
                <span className="body-6 text-fg">{s.reason}</span>
                <span className="font-mono caption-4 text-fg-muted">
                  {s.minutes} min · {s.count}×
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-canvas">
                <motion.div
                  className={`h-full origin-left rounded-full ${i === 0 ? 'bg-accent' : 'bg-fg-faint'}`}
                  style={{ width: `${(s.minutes / maxStop) * 100}%` }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.7, ease: BASE_EASE, delay: 0.1 + i * 0.08 }}
                />
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-auto caption-5 text-fg-faint">Stop reasons and counts read from PLC machine states.</p>
      </div>
    </div>
  );
};

const ConsumptionView: React.FC = () => {
  const air = CONSUMPTION.airByHour;
  const max = Math.max(...air);
  return (
    <div className="grid lg:grid-cols-5">
      <div className="p-4 lg:col-span-3">
        <table className="w-full text-left">
          <caption className="sr-only">Utility use today, in total and per 1,000 cases, with change against the 30 day baseline</caption>
          <thead>
            <tr className="caption-4 text-fg-faint">
              <th scope="col" className="py-2 font-medium">Utility</th>
              <th scope="col" className="hidden py-2 text-right font-medium sm:table-cell">Today</th>
              <th scope="col" className="py-2 text-right font-medium">{CONSUMPTION.perUnitLabel}</th>
              <th scope="col" className="py-2 text-right font-medium">vs baseline</th>
            </tr>
          </thead>
          <tbody>
            {CONSUMPTION.utilities.map((u) => (
              <tr key={u.label} className="border-t border-line">
                <td className="py-2 title-4 text-fg">{u.label}</td>
                <td className="hidden py-2 text-right font-mono caption-4 text-fg-muted sm:table-cell">{u.total}</td>
                <td className="py-2 text-right font-mono caption-4 text-fg">{u.perUnit}</td>
                <td className={`py-2 text-right font-mono caption-4 ${u.delta > 5 ? 'text-critical' : u.delta > 0 ? 'text-watch' : 'text-ok'}`}>
                  {u.delta > 0 ? '+' : ''}
                  {u.delta}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-3 caption-5 text-fg-faint">Each meter is tied to the batch and shift that used it.</p>
      </div>
      <div className="flex flex-col gap-3 border-t border-line p-4 lg:col-span-2 lg:border-l lg:border-t-0">
        <div className="flex items-baseline justify-between gap-2">
          <p className="title-4 text-fg">Compressed air</p>
          <p className="caption-5 text-fg-faint">Nm³/h by hour</p>
        </div>
        <div className="flex h-24 items-end gap-0.5" role="img" aria-label="Compressed air flow by hour. Flow stays near 94 Nm³/h while the line is stopped from 02:00 to 04:00.">
          {air.map((v, i) => {
            const stopped = CONSUMPTION.stoppedHours.includes(i);
            return (
              <motion.div
                key={i}
                className={`flex-1 origin-bottom rounded-sm ${stopped ? 'bg-critical' : 'bg-data/60'}`}
                style={{ height: `${(v / max) * 100}%` }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.6, ease: BASE_EASE, delay: i * 0.015 }}
              />
            );
          })}
        </div>
        <div className="flex justify-between font-mono caption-5 text-fg-faint">
          <span>00</span>
          <span>06</span>
          <span>12</span>
          <span>18</span>
          <span>23</span>
        </div>
        <p className="flex items-start gap-2 rounded-lg border border-line bg-canvas p-3 body-6 text-fg">
          <WarningIcon size={16} className="mt-0.5 shrink-0 text-critical" aria-hidden="true" />
          {CONSUMPTION.finding}
        </p>
      </div>
    </div>
  );
};

// Sample dashboard in the hero: production, consumption and machine health from one Kit.
export const HeroDashboard: React.FC = () => {
  const [view, setView] = useState<View>('production');
  const active = VIEWS.find((v) => v.id === view)!;
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-panel">
      <div className="flex flex-col gap-3 border-b border-line px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 animate-blink rounded-full bg-ok motion-reduce:animate-none" aria-hidden="true" />
            <span className="title-4 text-fg">Line 3 · Bottling hall</span>
            <span className="hidden caption-5 text-fg-faint md:inline">{active.meta}</span>
          </div>
          <span className="rounded-md border border-line-strong px-2 py-0.5 caption-4 text-fg-muted sm:hidden">Sample data</span>
        </div>
        <div className="flex items-center gap-2">
          <div role="tablist" aria-label="Dashboard view" className="grid w-full grid-cols-3 gap-1 rounded-lg border border-line bg-canvas p-0.5 sm:flex sm:w-auto">
            {VIEWS.map((v) => {
              const Icon = v.icon;
              const on = v.id === view;
              return (
                <button
                  key={v.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  aria-label={v.label}
                  aria-controls="hero-view"
                  onClick={() => setView(v.id)}
                  className={`flex items-center justify-center gap-1 whitespace-nowrap rounded-md px-2 py-1 button-xsm transition active:scale-[0.98] ${
                    on ? 'bg-panel-2 text-fg' : 'text-fg-faint hover:text-fg'
                  }`}
                >
                  <Icon size={14} aria-hidden="true" className={on ? 'text-accent' : ''} />
                  {v.id === 'health' ? (
                    <>
                      <span className="sm:hidden">Health</span>
                      <span className="hidden sm:inline">{v.label}</span>
                    </>
                  ) : (
                    v.label
                  )}
                </button>
              );
            })}
          </div>
          <span className="hidden rounded-md border border-line-strong px-2 py-0.5 caption-4 text-fg-muted sm:inline">Sample data</span>
        </div>
      </div>
      <div id="hero-view" role="tabpanel" aria-label={active.label}>
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: BASE_EASE }}
          >
            {view === 'production' && <ProductionView />}
            {view === 'consumption' && <ConsumptionView />}
            {view === 'health' && <AssetHealthPanel />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
