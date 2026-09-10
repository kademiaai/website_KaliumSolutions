import React, { useState, useMemo } from 'react';
import { NodeItem } from '../types';

const INITIAL_NODES: NodeItem[] = [
  {
    id: 'KAL-NODE-BF04-EXT',
    name: 'KAL-NODE-BF04-EXT',
    facility: 'Bonfiglioli Plant 04',
    tier: 'Purdue L1 • Extrusion Pinion',
    protocol: 'Modbus TCP / MQTT',
    polling: '10ms cyclic interrupt',
    heartbeatLag: '3.2 ms',
    failoverMode: 'Dual Hot Standby',
    category: 'power',
  },
  {
    id: 'KAL-NODE-HN01-CAN',
    name: 'KAL-NODE-HN01-CAN',
    facility: 'Heineken VNM Line 03',
    tier: 'Purdue L2 • High-Speed Canning',
    protocol: 'Profinet IRT / OPC-UA',
    polling: '1ms isochronous',
    heartbeatLag: '1.8 ms',
    failoverMode: 'Ring Redundancy MRP',
    category: 'beverage',
  },
  {
    id: 'KAL-NODE-FC02-CIP',
    name: 'KAL-NODE-FC02-CIP',
    facility: 'FrieslandCampina Dairy',
    tier: 'Purdue L1 • Clean-in-Place Skids',
    protocol: 'EtherNet/IP CIP Sync',
    polling: '5ms safety cyclic',
    heartbeatLag: '4.1 ms',
    failoverMode: 'Graceful Edge Cache',
    category: 'pharma',
  },
  {
    id: 'KAL-NODE-SAF09-PMP',
    name: 'KAL-NODE-SAF09-PMP',
    facility: 'SAF Vietnam Utilities',
    tier: 'Purdue L1 • High-Pressure Pumps',
    protocol: 'Beckhoff ADS / MQTT',
    polling: '20ms telemetry push',
    heartbeatLag: '6.4 ms',
    failoverMode: 'Autonomous Local Loop',
    category: 'power',
  },
];

export const NodeMatrix: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [pingStates, setPingStates] = useState<Record<string, string>>({});

  const handlePing = (id: string) => {
    setPingStates((prev) => ({ ...prev, [id]: 'Pinging...' }));
    setTimeout(() => {
      setPingStates((prev) => ({ ...prev, [id]: '0.9ms OK' }));
      setTimeout(() => {
        setPingStates((prev) => {
          const next = { ...prev };
          delete next[id];
          return next;
        });
      }, 2000);
    }, 450);
  };

  const filteredNodes = useMemo(() => {
    if (selectedCategory === 'empty') return [];
    return INITIAL_NODES.filter((node) => {
      const matchCategory = selectedCategory === 'all' || node.category === selectedCategory;
      const matchSearch =
        searchQuery.trim() === '' ||
        node.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        node.facility.toLowerCase().includes(searchQuery.toLowerCase()) ||
        node.protocol.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="matrix" className="max-w-[1440px] mx-auto px-6 py-12">
      <div className="rounded-3xl bg-surface-container-low/80 border border-outline-variant/30 backdrop-blur-xl p-6 sm:p-8 lg:p-12 shadow-2xl">
        {/* Header & Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="font-['JetBrains_Mono'] text-xs text-primary uppercase font-semibold">
                Live Fleet Diagnostics
              </span>
            </div>
            <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl text-on-surface font-bold">
              Industrial Node Matrix &amp; Failover Controls
            </h2>
            <p className="font-['Geist'] text-sm text-on-surface-variant mt-1.5 max-w-2xl">
              Audit active line controllers, observe heartbeat responses, or test automated graceful degrade fallbacks.
            </p>
          </div>

          {/* Interactive Tab Strip */}
          <div className="flex items-center flex-wrap gap-1.5 bg-surface-container-lowest p-1.5 rounded-xl border border-outline-variant/30 shadow-inner">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg font-['Space_Grotesk'] text-xs sm:text-sm transition-all ${
                selectedCategory === 'all'
                  ? 'bg-surface-container-high text-primary font-semibold shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              All Nodes (4)
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('beverage')}
              className={`px-3 py-1.5 rounded-lg font-['Space_Grotesk'] text-xs sm:text-sm transition-all ${
                selectedCategory === 'beverage'
                  ? 'bg-surface-container-high text-primary font-semibold shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              CPG &amp; Beverage
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('power')}
              className={`px-3 py-1.5 rounded-lg font-['Space_Grotesk'] text-xs sm:text-sm transition-all ${
                selectedCategory === 'power'
                  ? 'bg-surface-container-high text-primary font-semibold shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Power Transmission
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('pharma')}
              className={`px-3 py-1.5 rounded-lg font-['Space_Grotesk'] text-xs sm:text-sm transition-all ${
                selectedCategory === 'pharma'
                  ? 'bg-surface-container-high text-primary font-semibold shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Dairy &amp; Pharma
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('empty')}
              className={`px-3 py-1.5 rounded-lg font-['Space_Grotesk'] text-xs sm:text-sm flex items-center gap-1 transition-all ${
                selectedCategory === 'empty'
                  ? 'bg-error-container text-on-error-container font-semibold'
                  : 'text-error/80 hover:text-error'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">bug_report</span>
              <span>Zero-Data Demo</span>
            </button>
          </div>
        </div>

        {/* Search & Metric Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="relative w-full sm:w-96">
            <span className="material-symbols-outlined absolute left-3.5 top-2.5 text-[18px] text-on-surface-variant">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by node ID, location, or protocol..."
              className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl pl-10 pr-12 py-2 font-['Geist'] text-xs sm:text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-1 focus:ring-primary shadow-inner"
            />
            <span className="absolute right-3 top-2 font-['JetBrains_Mono'] text-[10px] text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded">
              ⌘K
            </span>
          </div>

          <div className="flex items-center gap-4 text-on-surface-variant font-['JetBrains_Mono'] text-xs">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-primary"></span> Nominally Active
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-tertiary"></span> Heartbeat Latching
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-secondary"></span> Zero-Trust Enclave
            </span>
          </div>
        </div>

        {/* Data Table Container */}
        <div className="overflow-x-auto rounded-xl bg-surface-container-lowest/80 border border-outline-variant/30 shadow-md">
          {filteredNodes.length > 0 ? (
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-surface-container/60 text-on-surface-variant font-['JetBrains_Mono'] text-xs uppercase border-b border-outline-variant/20">
                  <th className="py-3 px-4">Node Identifier</th>
                  <th className="py-3 px-4">Facility &amp; Tier</th>
                  <th className="py-3 px-4">Protocol &amp; Polling</th>
                  <th className="py-3 px-4">Heartbeat Lag</th>
                  <th className="py-3 px-4">Failover Mode</th>
                  <th className="py-3 px-4 text-right">Quick Diagnostics</th>
                </tr>
              </thead>
              <tbody className="font-['Geist'] text-xs sm:text-sm divide-y divide-outline-variant/10">
                {filteredNodes.map((node) => (
                  <tr key={node.id} className="hover:bg-surface-container-high/30 transition-colors">
                    <td className="py-3.5 px-4 font-['JetBrains_Mono'] font-semibold text-primary">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-[18px]">memory</span>
                        <span>{node.name}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="text-on-surface font-semibold">{node.facility}</div>
                      <div className="text-on-surface-variant text-xs mt-0.5">{node.tier}</div>
                    </td>
                    <td className="py-3.5 px-4 font-['JetBrains_Mono'] text-xs">
                      <span className="px-2 py-0.5 rounded bg-surface-container font-semibold text-on-surface">
                        {node.protocol}
                      </span>
                      <div className="text-on-surface-variant mt-1 text-[11px]">{node.polling}</div>
                    </td>
                    <td className="py-3.5 px-4 font-['JetBrains_Mono'] text-xs">
                      <div className="flex items-center gap-1.5 text-primary">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
                        <span>{node.heartbeatLag}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-surface-container-highest text-tertiary font-['JetBrains_Mono'] text-xs">
                        <span className="material-symbols-outlined text-[13px]">tune</span>
                        {node.failoverMode}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => handlePing(node.id)}
                        disabled={!!pingStates[node.id]}
                        className={`px-3 py-1.5 rounded-lg font-['Space_Grotesk'] text-xs font-semibold transition-all cursor-pointer ${
                          pingStates[node.id] === '0.9ms OK'
                            ? 'bg-primary/20 text-primary border border-primary/40'
                            : pingStates[node.id] === 'Pinging...'
                            ? 'bg-surface-container-highest text-tertiary animate-pulse'
                            : 'bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface'
                        }`}
                      >
                        {pingStates[node.id] || 'Ping Node'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            /* Empty State */
            <div className="py-16 px-6 text-center flex flex-col items-center justify-center">
              <div className="w-14 h-14 rounded-2xl bg-surface-container-high flex items-center justify-center text-primary mb-3">
                <span className="material-symbols-outlined text-[28px]">search_off</span>
              </div>
              <h4 className="font-['Space_Grotesk'] text-lg text-on-surface font-semibold">
                No active nodes detected in this view
              </h4>
              <p className="font-['Geist'] text-xs text-on-surface-variant max-w-sm mt-1 mb-4">
                {selectedCategory === 'empty'
                  ? 'Zero-data demo partition active. Toggle back to All Nodes to inspect operational clusters.'
                  : `No telemetry nodes matched your search "${searchQuery}".`}
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="px-4 py-2 rounded-xl bg-primary text-on-primary font-['Space_Grotesk'] text-xs font-semibold hover:brightness-110"
              >
                Reset Filter View
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
