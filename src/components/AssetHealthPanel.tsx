import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ASSETS, Asset, Status } from '../content';
import { BASE_EASE } from './ui';

const statusLabel: Record<Status, string> = { ok: 'Healthy', watch: 'Watch', critical: 'Act now' };
const statusText: Record<Status, string> = { ok: 'text-ok', watch: 'text-watch', critical: 'text-critical' };
const statusDot: Record<Status, string> = { ok: 'bg-ok', watch: 'bg-watch', critical: 'bg-critical' };

const TrendChart: React.FC<{ asset: Asset }> = ({ asset }) => {
  const w = 320;
  const h = 120;
  const pad = 4;
  const values = [...asset.series, asset.threshold];
  const min = Math.min(...values) * 0.92;
  const max = Math.max(...values) * 1.05;
  const x = (i: number) => pad + (i / (asset.series.length - 1)) * (w - pad * 2);
  const y = (v: number) => h - pad - ((v - min) / (max - min)) * (h - pad * 2);
  const points = asset.series.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  const last = asset.series[asset.series.length - 1];
  const stroke = asset.status === 'critical' ? '#f87171' : asset.status === 'watch' ? '#fbbf24' : '#4cd7f6';

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-32 w-full" role="img" aria-label={`${asset.name} trend over the last 30 days`}>
      {[0.25, 0.5, 0.75].map((f) => (
        <line key={f} x1={0} x2={w} y1={h * f} y2={h * f} stroke="#272727" strokeWidth={1} />
      ))}
      <line
        x1={0}
        x2={w}
        y1={y(asset.threshold)}
        y2={y(asset.threshold)}
        stroke="#f87171"
        strokeWidth={1}
        strokeDasharray="4 4"
        opacity={0.7}
      />
      <polyline points={points} fill="none" stroke={stroke} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={x(asset.series.length - 1)} cy={y(last)} r={3.5} fill={stroke} />
    </svg>
  );
};

export const AssetHealthPanel: React.FC = () => {
  const [selectedId, setSelectedId] = useState(ASSETS[0].id);
  const selected = ASSETS.find((a) => a.id === selectedId) ?? ASSETS[0];

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-panel">
      {/* Window bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 animate-blink rounded-full bg-ok motion-reduce:animate-none" aria-hidden="true" />
          <span className="title-4 text-fg">Line 3 · Bottling hall</span>
          <span className="caption-5 text-fg-faint">5 assets monitored</span>
        </div>
        <span className="rounded-md border border-line-strong px-2 py-0.5 caption-4 text-fg-muted">Sample data</span>
      </div>

      <div className="grid lg:grid-cols-5">
        {/* Asset table */}
        <div className="lg:col-span-3">
          <table className="w-full text-left">
            <caption className="sr-only">Assets ranked by remaining useful life. Select a row to see its trend.</caption>
            <thead>
              <tr className="caption-4 text-fg-faint">
                <th scope="col" className="px-4 py-2 font-medium">Asset</th>
                <th scope="col" className="hidden px-4 py-2 font-medium sm:table-cell">Signal</th>
                <th scope="col" className="px-4 py-2 font-medium">Status</th>
                <th scope="col" className="px-4 py-2 text-right font-medium">RUL</th>
              </tr>
            </thead>
            <tbody>
              {[...ASSETS]
                .sort((a, b) => a.rulDays - b.rulDays)
                .map((asset) => {
                  const isSelected = asset.id === selected.id;
                  return (
                    <tr
                      key={asset.id}
                      className={`cursor-pointer transition-colors ${isSelected ? 'bg-panel-2' : 'hover:bg-panel-2/60'}`}
                      onClick={() => setSelectedId(asset.id)}
                    >
                      <td className="px-4 py-2">
                        <button
                          type="button"
                          aria-pressed={isSelected}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedId(asset.id);
                          }}
                          className="flex flex-col items-start rounded-md text-left"
                        >
                          <span className="title-4 text-fg">{asset.name}</span>
                          <span className="font-mono caption-5 text-fg-faint">{asset.id}</span>
                        </button>
                      </td>
                      <td className="hidden px-4 py-2 sm:table-cell">
                        <span className="block caption-5 text-fg-faint">{asset.signal}</span>
                        <span className="font-mono caption-4 text-fg-muted">{asset.reading}</span>
                      </td>
                      <td className="px-4 py-2">
                        <span className={`inline-flex items-center gap-2 caption-4 ${statusText[asset.status]}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${statusDot[asset.status]}`} aria-hidden="true" />
                          {statusLabel[asset.status]}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-right font-mono caption-4 text-fg">{asset.rulDays} d</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        {/* Detail */}
        <div className="border-t border-line p-4 lg:col-span-2 lg:border-t-0 lg:border-l" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: BASE_EASE }}
              className="flex flex-col gap-3"
            >
              <div className="flex items-baseline justify-between gap-2">
                <p className="title-4 text-fg">
                  {selected.name} <span className="font-mono caption-5 text-fg-faint">{selected.id}</span>
                </p>
                <p className="caption-5 text-fg-faint">30 days · {selected.unit}</p>
              </div>
              <TrendChart asset={selected} />
              <dl className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-line bg-canvas p-3">
                  <dt className="caption-5 text-fg-faint">Remaining useful life</dt>
                  <dd className={`font-mono heading-6 ${statusText[selected.status]}`}>{selected.rulDays} days</dd>
                  <dd className="caption-5 text-fg-faint">
                    range {selected.rulRange[0]} to {selected.rulRange[1]}
                  </dd>
                </div>
                <div className="rounded-lg border border-line bg-canvas p-3">
                  <dt className="caption-5 text-fg-faint">Latest reading</dt>
                  <dd className="font-mono heading-6 text-fg">{selected.reading}</dd>
                  <dd className="caption-5 text-fg-faint">alarm at {selected.threshold}</dd>
                </div>
              </dl>
              <div className="flex flex-col gap-1">
                <p className="caption-5 text-fg-faint">Likely cause</p>
                <p className="body-6 text-fg">{selected.finding}</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="caption-5 text-fg-faint">Suggested action</p>
                <p className="body-6 text-fg-muted">{selected.action}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
