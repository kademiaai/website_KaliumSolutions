import React, { useState } from 'react';

interface Article {
  id: string;
  tag: string;
  tagColor: 'secondary' | 'primary';
  dateRead: string;
  title: string;
  desc: string;
  image: string;
  ctaText: string;
  content: {
    lead: string;
    sections?: { heading: string; body: string }[];
  };
}

export const InsightsSection: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const articles: Article[] = [
    {
      id: 'article-1',
      tag: 'IIoT Architecture',
      tagColor: 'secondary',
      dateRead: 'OCTOBER 14, 2024 • 8 MIN READ',
      title: 'Deploying Edge IIoT in Legacy Food & Beverage Plants: A Blueprint for OEE Gains',
      desc: 'A technical breakdown of retrofitting legacy PLC networks with non-invasive MQTT sensors to unlock granular downtime visibility without voiding machinery certifications.',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAEPUv2zZFHa5Kh2E9hOmnqFAEO97vxHIhzWLRow63uj7i4jAXWOD7f0obgbZlHONXuaIi3Jo0LZD4dF8Vt9p46zzIjjEdW8gvYN2obskdF5SxlfoEgWd4uDYQgwc9j8a5BNJz-2j5BdiVxMeFLsKta7_DudJCZBdw0a4HJ10dOLz1h--EayELWvSkX_tx9HvUJNx2N6Fzcf2x2DOMislMJkQqQcO_U8FV0L3BbFTA0psoozat34O9FEg',
      ctaText: 'READ ARCHITECTURE BRIEF',
      content: {
        lead:
          'Brownfield beverage bottling and food processing facilities face a dual challenge: stringent hygienic requirements and high equipment replacement costs. Retrofitting lines with edge compute bridges enables sub-second visibility into micro-stops without touching validated PLC code.',
        sections: [
          {
            heading: 'Non-Invasive CT & Optical Sensor Tap',
            body: 'Rather than reprogramming legacy Siemens S7-300 or Allen-Bradley SLC 500 controllers, external split-core current transformers (CTs) and laser photo-eyes are clamped directly onto conveyor and infeed motors. These feed high-frequency pulses to hardened Moxa or Advantech edge gateways running containerized Telegraf collectors.',
          },
          {
            heading: 'MQTT Sparkplug B & Edge Buffering',
            body: 'To survive intermittent factory Wi-Fi or plant network congestion, on-prem brokers buffer up to 72 hours of telemetry locally in persistent SQLite store-and-forward caches. Sparkplug B envelopes ensure payload compression and stateful births/deaths.',
          },
          {
            heading: 'Quantifiable Return: 3.4% OEE Uplift in 90 Days',
            body: 'By categorizing unlogged 12-second micro-stops on the case packer infeed, shift supervisors identified chronic pneumatic cylinder pressure drops, recapturing over 14 hours of lost production per line each month.',
          },
        ],
      },
    },
    {
      id: 'article-2',
      tag: 'PowerPlatform',
      tagColor: 'primary',
      dateRead: 'NOVEMBER 02, 2024 • 6 MIN READ',
      title: 'Why Microsoft Power Platform is Replacing Clunky Paper Workflows on the Shop Floor',
      desc: 'How low-code frontline applications connected to Dataverse are slashing shift handoff discrepancies and driving audit compliance for certified operations.',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCxXA8QSv6T7omfeW7O5lMyQxVy1Z6vD2NCux9j6wYujpi_FC25BOjdpVrlB4EZZ-9HIn_bZ9OQ7RZ0y3gT5KaHlZJw3RwxPa-q_K3H2RPgi7YaGTTbBxLZU4QTDx04u-Bst-xh9lb9xS2-eZueLm4nfH8c64O6sN6zKnqwvus7f2BnRjVuzxmcjWFEeK3Vk_ppiOZslX9hdwmwILXUvQ8LkKun8bQyzDKtGAYuiI3BiQmRhgqnFFuVkg',
      ctaText: 'READ CASE STUDY',
      content: {
        lead:
          'Paper shift logbooks, clipboard quality checklists, and manual whiteboard tallies remain the hidden friction in otherwise automated factories. Implementing Microsoft Power Apps and Power Automate transforms frontline execution into structured Dataverse records.',
      },
    },
  ];

  return (
    <section className="relative w-full py-space-4xl bg-surface-container-lowest" id="insights">
      <div className="max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-3xl gap-space-md">
          <div>
            <div className="inline-flex items-center gap-space-xs px-space-md py-space-2xs rounded-full bg-surface-container-high/80 mb-space-md">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              <span className="font-label-badge text-label-badge text-secondary uppercase tracking-widest">
                Industry Knowledge
              </span>
            </div>
            <h2 className="font-headline-lg text-headline-md lg:text-headline-lg text-on-surface tracking-tight">
              Latest Insights in Industry 4.0
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs max-w-xl">
              Technical guides, plant architecture blueprints, and digital strategy whitepapers.
            </p>
          </div>
          <a
            className="inline-flex items-center gap-space-xs text-secondary font-headline-sm hover:underline cursor-pointer"
            href="#contact"
          >
            <span>View All Articles</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </a>
        </div>

        {/* 2 Featured Article Cards with Exact High-Res Photography */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-xl">
          {articles.map((article) => {
            const isSecondary = article.tagColor === 'secondary';
            return (
              <article
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className="group relative flex flex-col bg-surface-container/60 hover:bg-surface-container rounded-2xl overflow-hidden backdrop-blur-md transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="relative w-full h-64 overflow-hidden">
                  <img
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={article.image}
                  />
                  <div className="absolute top-space-md left-space-md px-space-md py-space-2xs rounded-lg bg-surface-container-lowest/80 backdrop-blur-md shadow-sm">
                    <span
                      className={`font-label-badge text-[11px] ${
                        isSecondary ? 'text-secondary' : 'text-primary'
                      } uppercase tracking-wider font-semibold`}
                    >
                      {article.tag}
                    </span>
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-between p-space-xl">
                  <div>
                    <span className="font-label-code text-label-code text-on-surface-variant">
                      {article.dateRead}
                    </span>
                    <h3
                      className={`font-headline-sm text-headline-sm text-on-surface mt-space-xs mb-space-sm ${
                        isSecondary ? 'group-hover:text-secondary' : 'group-hover:text-primary'
                      } transition-colors leading-snug`}
                    >
                      {article.title}
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      {article.desc}
                    </p>
                  </div>
                  <div className="pt-space-lg">
                    <span
                      className={`inline-flex items-center gap-space-xs font-label-code text-label-code ${
                        isSecondary ? 'text-secondary' : 'text-primary'
                      }`}
                    >
                      <span>{article.ctaText}</span>
                      <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                        arrow_forward
                      </span>
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-surface-container max-w-2xl w-full rounded-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto border border-surface-container-highest shadow-2xl relative">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-surface-container-high text-on-surface-variant hover:text-on-surface hover:bg-surface-variant transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>

            <span className="font-label-code text-secondary text-xs uppercase tracking-widest">
              {selectedArticle.tag} • {selectedArticle.dateRead}
            </span>
            <h2 className="font-headline-md text-headline-sm sm:text-headline-md text-on-surface mt-2 mb-4">
              {selectedArticle.title}
            </h2>

            <img
              src={selectedArticle.image}
              alt={selectedArticle.title}
              className="w-full h-56 object-cover rounded-xl mb-6 shadow-md"
            />

            <p className="font-body-lg text-body-md sm:text-body-lg text-on-surface mb-6 leading-relaxed border-l-2 border-secondary pl-4 italic">
              {selectedArticle.content.lead}
            </p>

            {selectedArticle.content.sections?.map((sec, idx) => (
              <div key={idx} className="mb-4">
                <h4 className="font-headline-sm text-base font-bold text-on-surface mb-2">
                  {sec.heading}
                </h4>
                <p className="font-body-md text-on-surface-variant leading-relaxed text-sm">
                  {sec.body}
                </p>
              </div>
            ))}

            <div className="mt-8 pt-4 border-t border-surface-container-high flex justify-end">
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-6 py-2 rounded-xl bg-primary-container text-on-primary-container font-headline-sm text-sm hover:bg-primary hover:text-on-primary transition-all cursor-pointer"
              >
                Close Architecture Brief
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
