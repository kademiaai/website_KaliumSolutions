import React, { useState } from 'react';

interface CockpitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CockpitModal: React.FC<CockpitModalProps> = ({ isOpen, onClose }) => {
  const [logs, setLogs] = useState<string[]>([
    '[0.002ms] SYN-ACK edge handshake: cluster-fra-09 verified (NIST SP-800)',
    '[0.014ms] TOPIC spBv1.0/Kalium_Plant_01/Press_04: payload metric RMS=0.121 mm/s',
    '[0.021ms] QoS-1 verified delivery acknowledgement from edge broker #04',
    '[0.038ms] Tri-axial FFT harmonic matrix: Safe threshold envelope confirmed',
    '[0.045ms] Purdue L1/L2 data diode conduit: TX unidirectional stream active',
    '[0.052ms] Ingesting 42,000 tags/sec across Beckhoff ADS bus (Latency: 1.8ms)',
  ]);

  if (!isOpen) return null;

  const handleInjectBurst = () => {
    const randomId = Math.floor(Math.random() * 9000) + 1000;
    const latency = (Math.random() * 0.04 + 0.005).toFixed(3);
    const brokerNum = Math.floor(Math.random() * 8) + 1;
    const newLog = `[${latency}ms] TEST BURST: Transmitted 50,000 synthetic frame packets to broker #0${brokerNum} (Digest 0x${randomId}AF)`;
    setLogs((prev) => [newLog, ...prev]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="w-full max-w-3xl rounded-3xl bg-[#0d1c2d] border border-outline-variant/40 shadow-2xl p-6 sm:p-8 relative">
        <button
          onClick={onClose}
          type="button"
          aria-label="Close Cockpit"
          className="absolute top-5 right-5 p-2 rounded-xl bg-surface-container hover:text-on-surface text-on-surface-variant transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-0.5 rounded bg-primary text-on-primary font-['JetBrains_Mono'] text-xs font-bold">
            COCKPIT V4.2
          </span>
          <span className="font-['JetBrains_Mono'] text-xs text-on-surface-variant">
            Live Pipeline Stream
          </span>
        </div>

        <h3 className="font-['Space_Grotesk'] text-xl sm:text-2xl text-on-surface font-semibold mb-1">
          Simulated Kafka &amp; Sparkplug Broker
        </h3>
        <p className="font-['Geist'] text-xs sm:text-sm text-on-surface-variant mb-4">
          Live synthetic payload distribution across edge buffer rings.
        </p>

        {/* Live Streaming Terminal View */}
        <div className="w-full h-64 rounded-xl bg-surface-container-lowest border border-outline-variant/30 p-4 font-['JetBrains_Mono'] text-xs text-on-surface-variant overflow-y-auto space-y-1.5 shadow-inner">
          {logs.map((log, index) => (
            <div
              key={index}
              className={
                log.includes('BURST')
                  ? 'text-primary font-semibold'
                  : log.includes('SYN-ACK')
                  ? 'text-tertiary'
                  : log.includes('RMS')
                  ? 'text-on-surface'
                  : 'text-on-surface-variant'
              }
            >
              {log}
            </div>
          ))}
        </div>

        {/* Action Controls */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-['JetBrains_Mono'] text-on-surface-variant">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span>Cluster Buffer: Nominal</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLogs((prev) => prev.slice(0, 3))}
              className="px-3 py-1.5 rounded-lg bg-surface-container text-xs text-on-surface-variant hover:text-on-surface transition-all"
            >
              Reset Stream
            </button>
            <button
              onClick={handleInjectBurst}
              className="px-4 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:brightness-110 shadow-md shadow-primary/20 transition-all flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">bolt</span>
              <span>Inject Packet Burst</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
