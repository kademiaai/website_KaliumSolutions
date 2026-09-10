import React, { useState } from 'react';
import { ScopingFormData } from '../types';

export const ScopingSection: React.FC = () => {
  const [formData, setFormData] = useState<ScopingFormData>({
    fullName: '',
    corpEmail: '',
    facilityType: 'CPG, Food & Beverage',
    controllerBus: 'Siemens Profinet / S7comm (TIA)',
    scopeBrief: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  const handleEmailChange = (val: string) => {
    setFormData((prev) => ({ ...prev, corpEmail: val }));
    setIsEmailValid(val.includes('@') && val.includes('.'));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  const clientBadges = [
    'FrieslandCampina',
    'Bonfiglioli',
    'Heineken',
    'SAF Vietnam',
    'LND Technical Services',
  ];

  return (
    <section id="consultation" className="max-w-[1440px] mx-auto px-6 py-16 relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Explanatory Column */}
        <div className="lg:col-span-5 space-y-6">
          <span className="font-['JetBrains_Mono'] text-xs text-primary uppercase font-semibold tracking-wider">
            Deterministic Scope &amp; Deployment
          </span>
          <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl text-on-surface font-bold tracking-tight">
            Initiate Architecture Scoping
          </h2>
          <p className="font-['Geist'] text-base text-on-surface-variant leading-relaxed">
            Transition your plant from brittle silos to unified namespace determinism with our vendor-neutral engineering team.
          </p>

          {/* Core Guarantees */}
          <div className="space-y-4 pt-2">
            <div className="flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[18px]">verified</span>
              </div>
              <div>
                <div className="font-['Space_Grotesk'] text-base text-on-surface font-semibold">
                  Zero Plant Shutdown Deployment
                </div>
                <div className="font-['Geist'] text-xs sm:text-sm text-on-surface-variant mt-0.5 leading-relaxed">
                  Non-invasive inductive tapping &amp; mirror-port MQTT brokers ensure existing brownfield controls remain untouched.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-tertiary shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[18px]">speed</span>
              </div>
              <div>
                <div className="font-['Space_Grotesk'] text-base text-on-surface font-semibold">
                  Sub-10ms Edge Ingestion Guarantee
                </div>
                <div className="font-['Geist'] text-xs sm:text-sm text-on-surface-variant mt-0.5 leading-relaxed">
                  Embedded hypervisors execute ML inference directly inside the operational zone (Purdue L2).
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[18px]">security</span>
              </div>
              <div>
                <div className="font-['Space_Grotesk'] text-base text-on-surface font-semibold">
                  Hardened Air-Gap Compliance
                </div>
                <div className="font-['Geist'] text-xs sm:text-sm text-on-surface-variant mt-0.5 leading-relaxed">
                  ISO 27001, IEC 62443-4-2, and NIST SP 800-82 standard compliance across all network hops.
                </div>
              </div>
            </div>
          </div>

          {/* Enterprise Client Proof Row */}
          <div className="pt-4" id="clients">
            <div className="font-['JetBrains_Mono'] text-xs text-on-surface-variant uppercase mb-3">
              Validated By Leading Industrial Operators:
            </div>
            <div className="flex flex-wrap items-center gap-2.5 text-on-surface-variant font-['JetBrains_Mono'] text-xs font-semibold">
              {clientBadges.map((client) => (
                <span key={client} className="px-3 py-1.5 rounded-lg bg-surface-container-low border border-outline-variant/30 shadow-sm">
                  {client}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Glassmorphism Scoping Form */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-[#0d1c2d]/90 border border-outline-variant/30 backdrop-blur-2xl shadow-2xl relative">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-['Space_Grotesk'] text-xl sm:text-2xl text-on-surface font-semibold">
                  Production Architecture Request
                </h3>
                <p className="font-['Geist'] text-xs sm:text-sm text-on-surface-variant mt-0.5">
                  Direct technical consultation • SLA-bound response
                </p>
              </div>
              <span className="material-symbols-outlined text-primary text-[28px]">token</span>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Name & Corporate Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-['JetBrains_Mono'] text-xs text-on-surface mb-1.5 font-semibold" htmlFor="fullName">
                    Engineer / Technical Lead
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Dr. Alexis Vance"
                    className="w-full bg-surface-container-lowest border border-outline-variant/30 text-on-surface font-['Geist'] text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-primary shadow-inner"
                  />
                </div>

                <div>
                  <label className="block font-['JetBrains_Mono'] text-xs text-on-surface mb-1.5 font-semibold" htmlFor="corpEmail">
                    Corporate Email Address
                  </label>
                  <div className="relative">
                    <input
                      id="corpEmail"
                      type="email"
                      required
                      value={formData.corpEmail}
                      onChange={(e) => handleEmailChange(e.target.value)}
                      placeholder="name@enterprise.com"
                      className="w-full bg-surface-container-lowest border border-outline-variant/30 text-on-surface font-['Geist'] text-sm rounded-xl px-4 py-2.5 pr-10 focus:outline-none focus:ring-1 focus:ring-primary shadow-inner"
                    />
                    {isEmailValid && (
                      <span className="absolute right-3 top-2.5 text-primary material-symbols-outlined text-[18px]">
                        check_circle
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Facility & Primary Controller Bus */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-['JetBrains_Mono'] text-xs text-on-surface mb-1.5 font-semibold" htmlFor="facilityType">
                    Plant / Manufacturing Sector
                  </label>
                  <select
                    id="facilityType"
                    value={formData.facilityType}
                    onChange={(e) => setFormData({ ...formData, facilityType: e.target.value })}
                    className="w-full bg-surface-container-lowest border border-outline-variant/30 text-on-surface font-['Geist'] text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-primary shadow-inner"
                  >
                    <option>CPG, Food &amp; Beverage</option>
                    <option>Heavy Industrial &amp; Power Transmission</option>
                    <option>Pharmaceutical / Life Sciences (FDA 21 CFR)</option>
                    <option>Semiconductor &amp; Electronics Fab</option>
                    <option>Autonomous Energy &amp; Utilities</option>
                  </select>
                </div>

                <div>
                  <label className="block font-['JetBrains_Mono'] text-xs text-on-surface mb-1.5 font-semibold" htmlFor="controllerBus">
                    Primary Fieldbus / Protocols
                  </label>
                  <select
                    id="controllerBus"
                    value={formData.controllerBus}
                    onChange={(e) => setFormData({ ...formData, controllerBus: e.target.value })}
                    className="w-full bg-surface-container-lowest border border-outline-variant/30 text-on-surface font-['Geist'] text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-primary shadow-inner"
                  >
                    <option>Siemens Profinet / S7comm (TIA)</option>
                    <option>Rockwell Automation EtherNet/IP (CIP)</option>
                    <option>Beckhoff TwinCAT ADS / EtherCAT</option>
                    <option>Modbus TCP / Serial RS-485</option>
                    <option>Heterogeneous / Mixed Brownfield</option>
                  </select>
                </div>
              </div>

              {/* Scope & Constraint Description */}
              <div>
                <label className="block font-['JetBrains_Mono'] text-xs text-on-surface mb-1.5 font-semibold" htmlFor="scopeBrief">
                  Architecture Constraints &amp; Telemetry Targets
                </label>
                <textarea
                  id="scopeBrief"
                  rows={3}
                  value={formData.scopeBrief}
                  onChange={(e) => setFormData({ ...formData, scopeBrief: e.target.value })}
                  placeholder="Specify estimated I/O tag count, Purdue air-gap constraints, target latency SLA, or current vibration monitoring gaps..."
                  className="w-full bg-surface-container-lowest border border-outline-variant/30 text-on-surface font-['Geist'] text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-primary shadow-inner resize-none"
                ></textarea>
              </div>

              {/* Action Submit with Loading Preview */}
              <div className="pt-2">
                <button
                  id="submitScopingBtn"
                  type="submit"
                  disabled={isSubmitting || isSuccess}
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-primary via-tertiary to-secondary text-on-primary font-['Space_Grotesk'] text-sm sm:text-base font-semibold shadow-xl shadow-primary/20 hover:brightness-110 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-80"
                >
                  {isSubmitting ? (
                    <>
                      <span>Compiling Scope...</span>
                      <span className="animate-spin material-symbols-outlined text-[18px]">progress_activity</span>
                    </>
                  ) : isSuccess ? (
                    <>
                      <span>Blueprint Request Logged</span>
                      <span className="material-symbols-outlined text-[18px]">done_all</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Blueprint Request</span>
                      <span className="material-symbols-outlined text-[18px]">send</span>
                    </>
                  )}
                </button>
              </div>

              {/* Feedback Banner */}
              {isSuccess && (
                <div className="p-4 rounded-xl bg-surface-container-highest border border-primary/40 text-primary font-['JetBrains_Mono'] text-xs flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-[20px] shrink-0">task_alt</span>
                  <div>
                    <strong className="font-bold">Consultation Node Initialized:</strong> A telemetry specification briefing has been logged. An engineering lead will reach out with the architectural canvas.
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
