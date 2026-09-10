import React, { useState } from 'react';

export const ContactSection: React.FC = () => {
  const [showAuditForm, setShowAuditForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    plantName: '',
    email: '',
    lineType: 'FMCG & Packaging',
    protocol: 'Siemens S7 (Profinet/Ethernet)',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <section className="relative w-full py-space-4xl bg-surface overflow-hidden" id="contact">
      {/* Dynamic Glow Spot */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-primary-container/15 blur-[150px] pointer-events-none"></div>

      <div className="relative max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop">
        <div className="relative bg-surface-container rounded-3xl p-space-2xl md:p-space-4xl border border-surface-container-highest shadow-2xl overflow-hidden">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-space-xs px-space-md py-space-2xs rounded-full bg-surface-container-high/80 mb-space-lg">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="font-label-badge text-label-badge text-primary uppercase tracking-widest">
                Immediate Engagement
              </span>
            </div>
            <h2 className="font-display-hero text-headline-md lg:text-headline-lg text-on-surface tracking-tight mb-space-md">
              Ready to Modernize Your Production Operations?
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-space-2xl leading-relaxed">
              Schedule a technical discovery session with our industrial automation and OT/IT systems architects. We evaluate your plant floor telemetry in 48 hours.
            </p>

            {/* Action Area */}
            {!showAuditForm ? (
              <div className="flex flex-wrap items-center gap-space-md">
                <button
                  type="button"
                  onClick={() => setShowAuditForm(true)}
                  className="inline-flex items-center justify-center gap-space-sm bg-primary-container text-on-primary-container font-headline-sm text-body-md px-space-2xl py-space-md rounded-xl shadow-[0_0_28px_rgba(249,115,22,0.38)] hover:bg-primary hover:text-on-primary transition-all duration-200 cursor-pointer"
                >
                  <span>Book Plant Architecture Audit</span>
                  <span className="material-symbols-outlined text-[20px]">schedule_send</span>
                </button>
                <a
                  href="mailto:contact@kaliumsolutions.com?subject=Industrial%20Architecture%20Audit%20Request"
                  className="inline-flex items-center justify-center gap-space-xs px-space-xl py-space-md rounded-xl bg-surface-container-high text-on-surface hover:text-secondary font-headline-sm text-body-md transition-all cursor-pointer"
                >
                  <span>Email Engineering Desk</span>
                  <span className="material-symbols-outlined text-[18px]">mail</span>
                </a>
                <div className="flex items-center gap-space-xs font-label-code text-label-code text-on-surface-variant mt-2 sm:mt-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  <span>DIRECT ARCHITECT RESPONSE UNDER 4 HOURS</span>
                </div>
              </div>
            ) : formSubmitted ? (
              <div className="bg-surface-container-lowest/80 border border-secondary/40 rounded-2xl p-space-xl animate-in fade-in duration-300">
                <div className="flex items-center gap-space-sm mb-space-xs">
                  <span className="material-symbols-outlined text-secondary text-[28px]">check_circle</span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">
                    Discovery Audit Request Registered
                  </h3>
                </div>
                <p className="font-body-md text-on-surface-variant mb-space-md">
                  Thank you! An OT/IT principal systems engineer will contact you at{' '}
                  <span className="text-secondary font-semibold">{formData.email}</span> within 4 hours to review protocol topology and scheduling.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setFormSubmitted(false);
                    setShowAuditForm(false);
                  }}
                  className="font-label-code text-xs text-primary hover:underline cursor-pointer"
                >
                  Submit another inquiry
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-surface-container-lowest/90 border border-surface-container-highest rounded-2xl p-space-xl flex flex-col gap-space-md max-w-2xl animate-in fade-in duration-300"
              >
                <div className="flex items-center justify-between pb-space-xs border-b border-surface-container-high">
                  <span className="font-headline-sm text-on-surface text-base">
                    Plant Architecture Audit Scoping Form
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowAuditForm(false)}
                    className="text-on-surface-variant hover:text-on-surface"
                  >
                    <span className="material-symbols-outlined text-[20px]">close</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                  <div>
                    <label className="block font-label-code text-xs text-on-surface-variant mb-1">
                      Facility / Plant Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dallas Bottling Plant #3"
                      value={formData.plantName}
                      onChange={(e) => setFormData({ ...formData, plantName: e.target.value })}
                      className="w-full bg-surface-container border border-surface-container-highest rounded-xl px-3 py-2 text-sm text-on-surface focus:outline-none focus:border-secondary"
                    />
                  </div>
                  <div>
                    <label className="block font-label-code text-xs text-on-surface-variant mb-1">
                      Corporate Work Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="operations@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-surface-container border border-surface-container-highest rounded-xl px-3 py-2 text-sm text-on-surface focus:outline-none focus:border-secondary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                  <div>
                    <label className="block font-label-code text-xs text-on-surface-variant mb-1">
                      Target Production Line
                    </label>
                    <select
                      value={formData.lineType}
                      onChange={(e) => setFormData({ ...formData, lineType: e.target.value })}
                      className="w-full bg-surface-container border border-surface-container-highest rounded-xl px-3 py-2 text-sm text-on-surface focus:outline-none focus:border-secondary"
                    >
                      <option>FMCG & Packaging</option>
                      <option>Automotive Powertrain / Assembly</option>
                      <option>Chemical Process / Refining</option>
                      <option>Dairy & Food Processing</option>
                      <option>Pharmaceutical / Cleanroom</option>
                      <option>Heavy Metallurgy & Stamping</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-label-code text-xs text-on-surface-variant mb-1">
                      Primary PLC Protocol
                    </label>
                    <select
                      value={formData.protocol}
                      onChange={(e) => setFormData({ ...formData, protocol: e.target.value })}
                      className="w-full bg-surface-container border border-surface-container-highest rounded-xl px-3 py-2 text-sm text-on-surface focus:outline-none focus:border-secondary"
                    >
                      <option>Siemens S7 (Profinet/Ethernet)</option>
                      <option>Rockwell ControlLogix (EtherNet/IP)</option>
                      <option>Beckhoff (EtherCAT / TwinCAT ADS)</option>
                      <option>Modbus TCP / RTU RS-485</option>
                      <option>OPC-UA / MQTT Sparkplug B</option>
                      <option>Mixed Brownfield Legacy</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-label-code text-xs text-on-surface-variant mb-1">
                    Primary Operational Bottleneck / Scope Notes
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Unexplained micro-stops on palletizer, need edge vibration sensors and Power BI downtime matrix."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-surface-container border border-surface-container-highest rounded-xl px-3 py-2 text-sm text-on-surface focus:outline-none focus:border-secondary"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="font-label-code text-xs text-on-surface-variant">
                    NDA protected • Zero commitment
                  </span>
                  <button
                    type="submit"
                    className="bg-primary-container text-on-primary-container font-headline-sm text-sm px-6 py-2 rounded-xl shadow-md hover:bg-primary hover:text-on-primary transition-all cursor-pointer"
                  >
                    Confirm Audit Booking
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
