import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

export const BASE_EASE = [0.22, 1, 0.36, 1] as const;

// Main button: 8px vertical, 12px horizontal padding, Button-md text (skill B2 / B1).
export const primaryButton =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-accent px-3 py-2 button-md text-canvas ' +
  'transition hover:bg-accent-hover hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] cursor-pointer ' +
  'disabled:cursor-not-allowed disabled:opacity-50';

export const Container: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ className = '', children }) => (
  <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

export const Eyebrow: React.FC<React.PropsWithChildren> = ({ children }) => (
  <p className="caption-3 uppercase tracking-widest text-accent">{children}</p>
);

export const SectionHeader: React.FC<{
  eyebrow: string;
  title: string;
  intro?: string;
  id?: string;
  align?: 'left' | 'center';
}> = ({ eyebrow, title, intro, id, align = 'left' }) => (
  <div className={`flex max-w-2xl flex-col gap-4 ${align === 'center' ? 'mx-auto items-center text-center' : ''}`}>
    <Eyebrow>{eyebrow}</Eyebrow>
    <h2 id={id} className="heading-4 sm:heading-3 text-fg">
      {title}
    </h2>
    {intro && <p className="body-3 text-fg-muted">{intro}</p>}
  </div>
);

// Bounce entrance, matched to abvietnam.vn (Flatsome "bounceIn" / "bounceInUp"):
// transform 0.8s on an overshoot curve, opacity 0.5s, 0.2s stagger between siblings capped at 1s.
export const BOUNCE_EASE = [0, 0.195, 0, 1.465] as const;
export const OPACITY_EASE = [0.42, 0, 1, 1] as const;

export const BounceIn: React.FC<
  React.PropsWithChildren<{
    className?: string;
    index?: number;
    from?: 'scale' | 'up';
    as?: 'div' | 'li' | 'span';
    baseDelay?: number;
  }>
> = ({ className, index = 0, from = 'scale', as = 'div', baseDelay = 0, children }) => {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  const delay = baseDelay + Math.min(index * 0.2, 1);
  const hiddenState = reduce ? { opacity: 0 } : from === 'scale' ? { opacity: 0, scale: 1.3 } : { opacity: 0, y: 70 };
  return (
    <Tag
      className={className}
      initial={hiddenState}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        default: { duration: 0.8, ease: BOUNCE_EASE, delay },
        opacity: { duration: 0.5, ease: OPACITY_EASE, delay },
      }}
    >
      {children}
    </Tag>
  );
};

// Scroll reveal (B7): rise 32px and fade in once, on the base curve.
// With reduced motion the content only fades.
export const Reveal: React.FC<React.PropsWithChildren<{ className?: string; delay?: number }>> = ({
  className,
  delay = 0,
  children,
}) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: BASE_EASE, delay }}
    >
      {children}
    </motion.div>
  );
};
