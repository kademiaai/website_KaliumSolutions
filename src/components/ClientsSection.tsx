import React from 'react';

interface ClientsSectionProps {
  onContactClick?: () => void;
}

export const ClientsSection: React.FC<ClientsSectionProps> = ({ onContactClick }) => {
  const partners = [
    {
      name: 'FrieslandCampina',
      desc: 'Dairy Nutrition Leader',
      icon: 'factory',
      hoverColor: 'group-hover:text-secondary',
      tag: 'Global Dairy FMCG',
    },
    {
      name: 'Bonfiglioli',
      desc: 'Power Transmission',
      icon: 'settings_input_component',
      hoverColor: 'group-hover:text-primary',
      tag: 'Heavy Industrial Drives',
    },
    {
      name: 'Heineken',
      desc: 'Global Brewing Operations',
      icon: 'local_drink',
      hoverColor: 'group-hover:text-secondary',
      tag: 'Automated Bottling Lines',
    },
    {
      name: 'SAF Vietnam',
      desc: 'Industrial Materials',
      icon: 'precision_manufacturing',
      hoverColor: 'group-hover:text-primary',
      tag: 'Process Metallurgy',
    },
    {
      name: 'LND Tech',
      desc: 'Engineering Services',
      icon: 'engineering',
      hoverColor: 'group-hover:text-secondary',
      tag: 'Automation EPC Partner',
    },
  ];

  return (
    <section className="relative w-full py-space-4xl bg-surface" id="clients-and-partners">
      <div className="max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop">
        <div className="flex flex-col items-center text-center mb-space-3xl">
          <div className="inline-flex items-center gap-space-xs px-space-md py-space-2xs rounded-full bg-surface-container-high/80 mb-space-md">
            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
            <span className="font-label-badge text-label-badge text-primary uppercase tracking-widest">
              Proven Enterprise Track Record
            </span>
          </div>
          <h2 className="font-headline-lg text-headline-md lg:text-headline-lg text-on-surface max-w-3xl mb-space-sm tracking-tight">
            Trusted by World-Class Manufacturers &amp; Engineering Giants
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mb-space-xl">
            We collaborate with industrial pioneers, dairy giants, and heavy engineering leaders to advance autonomous manufacturing.
          </p>
          <a
            href="#contact"
            onClick={(e) => {
              if (onContactClick) {
                e.preventDefault();
                onContactClick();
              }
            }}
            className="inline-flex items-center gap-space-xs px-space-lg py-space-xs rounded-xl bg-surface-container-high text-on-surface hover:text-secondary font-label-code text-label-code uppercase tracking-wider transition-all cursor-pointer hover:bg-surface-container-highest"
          >
            <span>View All Partner Engagements</span>
            <span className="material-symbols-outlined text-[16px]">open_in_new</span>
          </a>
        </div>

        {/* Partner Logo Grid (Monochrome to Luminous Glow Hover) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-space-lg items-center">
          {partners.map((p) => (
            <div
              key={p.name}
              className="group relative flex flex-col items-center justify-center p-space-xl bg-surface-container/40 hover:bg-surface-container rounded-2xl transition-all duration-300 hover:-translate-y-1 cursor-default shadow-md hover:shadow-xl"
            >
              <span
                className={`material-symbols-outlined text-on-surface-variant ${p.hoverColor} text-[40px] mb-space-xs transition-colors duration-300`}
              >
                {p.icon}
              </span>
              <span className="font-headline-sm text-[16px] text-on-surface tracking-tight font-bold text-center">
                {p.name}
              </span>
              <span className="font-label-badge text-[10px] text-on-surface-variant uppercase tracking-widest mt-space-2xs text-center">
                {p.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
