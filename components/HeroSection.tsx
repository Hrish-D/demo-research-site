'use client';

import { motion } from 'framer-motion';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  description?: string;
  children?: React.ReactNode;
  ctaText?: string;
  ctaHref?: string;
  size?: 'default' | 'large';
}

const HeroSection = ({
  title,
  subtitle,
  description,
  children,
  ctaText,
  ctaHref,
  size = 'default',
}: HeroSectionProps) => {
  const isLarge = size === 'large';

  return (
    <section
      className={`relative w-full flex items-end overflow-hidden ${
        isLarge ? 'min-h-screen' : 'min-h-[50vh] md:min-h-[60vh]'
      }`}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--background)]" />

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-accent-500/10 dark:bg-accent-500/5 rounded-full blur-3xl animate-glow" />
      <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-accent-600/5 dark:bg-accent-600/3 rounded-full blur-3xl animate-glow" style={{ animationDelay: '2s' }} />

      {/* Content */}
      <div className="relative z-10 container-width w-full pb-16 md:pb-24 pt-32 md:pt-40">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className={isLarge ? 'max-w-5xl' : 'max-w-3xl'}
        >
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xs md:text-sm font-medium text-accent-600 dark:text-accent-400 uppercase tracking-[0.2em] mb-6"
            >
              {subtitle}
            </motion.p>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0, 1] }}
            className={isLarge ? 'text-hero mb-8' : 'text-heading mb-6'}
          >
            {title}
          </motion.h1>

          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base md:text-lg text-[var(--muted-foreground)] leading-relaxed max-w-2xl mb-8"
            >
              {description}
            </motion.p>
          )}

          {ctaText && ctaHref && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <a href={ctaHref} className="btn-primary">
                {ctaText}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </motion.div>
          )}

          {children && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {children}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Bottom border accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-500/30 to-transparent" />
    </section>
  );
};

export default HeroSection;
