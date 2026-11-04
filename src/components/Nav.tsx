import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { NAV_LINKS } from '../content';
import { BASE_EASE } from './ui';

// Highlights the section currently in view, using IntersectionObserver instead of a scroll listener.
function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

// "Sticky jump" header, after abvietnam.vn: slides away while scrolling down, slides back in on any
// scroll up. One scroll listener, throttled through requestAnimationFrame.
function useHideOnScroll(disabled: boolean) {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    if (disabled) {
      setHidden(false);
      return;
    }
    let lastY = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const delta = y - lastY;
      if (y < 120) setHidden(false);
      else if (delta > 6) setHidden(true);
      else if (delta < -6) setHidden(false);
      lastY = y;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [disabled]);
  return hidden;
}

const sectionIds = [...NAV_LINKS.map((l) => l.id), 'contact'];

export const Nav: React.FC = () => {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(sectionIds);
  const reduce = useReducedMotion();
  const [focusWithin, setFocusWithin] = useState(false);
  const hidden = useHideOnScroll(open || focusWithin);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav
        aria-label="Main"
        onFocus={() => setFocusWithin(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocusWithin(false);
        }}
        className={`flex w-full max-w-3xl items-center justify-between gap-4 rounded-2xl border border-line bg-canvas/70 py-2 pl-4 pr-2 backdrop-blur-xl transition duration-500 ${
          hidden ? '-translate-y-24 opacity-0' : 'translate-y-0 opacity-100'
        }`}
      >
        <a href="#top" className="flex items-center gap-2 rounded-lg" onClick={() => setOpen(false)}>
          <img src="/logo.svg" alt="" width={24} height={24} className="h-6 w-6" />
          <span className="title-3 text-fg">Kalium Solutions</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.id;
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={isActive ? 'location' : undefined}
                  className={`rounded-lg px-3 py-2 title-4 transition-colors ${
                    isActive ? 'bg-panel-2 text-fg' : 'text-fg-muted hover:text-fg'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden rounded-lg bg-accent px-3 py-2 button-sm text-canvas transition hover:bg-accent-hover active:scale-[0.98] sm:inline-flex"
          >
            Book a demo
          </a>
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="relative flex h-10 w-10 items-center justify-center rounded-lg text-fg transition-colors hover:bg-panel-2 md:hidden"
          >
            {/* Two lines that rotate into an X with the base curve. */}
            <span
              className={`absolute h-0.5 w-4 rounded-full bg-current transition-transform duration-500 ${
                open ? 'rotate-45' : '-translate-y-1'
              }`}
            />
            <span
              className={`absolute h-0.5 w-4 rounded-full bg-current transition-transform duration-500 ${
                open ? '-rotate-45' : 'translate-y-1'
              }`}
            />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: BASE_EASE }}
            className="fixed inset-0 -z-10 bg-canvas/90 px-6 pt-24 backdrop-blur-2xl md:hidden"
          >
            <ul className="flex flex-col gap-2">
              {[...NAV_LINKS, { id: 'contact', label: 'Book a technical demo' }].map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, y: reduce ? 0 : 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: BASE_EASE, delay: Math.min(i * 0.06, 0.4) }}
                >
                  <a
                    href={`#${link.id}`}
                    onClick={() => setOpen(false)}
                    className={`block rounded-lg py-3 heading-5 ${
                      link.id === 'contact' ? 'text-accent' : active === link.id ? 'text-fg' : 'text-fg-muted'
                    }`}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
