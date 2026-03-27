'use client';

import { motion } from 'framer-motion';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: string;
  children?: React.ReactNode;
  ctaText?: string;
  ctaHref?: string;
}

const HeroSection = ({
  title,
  subtitle,
  description,
  backgroundImage,
  children,
  ctaText,
  ctaHref,
}: HeroSectionProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section
      className="relative w-full min-h-[60vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden"
      style={
        backgroundImage
          ? {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : {}
      }
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-white/50" />

      {/* Background Pattern (if no image) */}
      {!backgroundImage && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-slate-100" />
      )}

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {subtitle && (
          <motion.p
            className="text-sm md:text-base font-medium text-blue-600 uppercase tracking-wider mb-4"
            variants={itemVariants}
          >
            {subtitle}
          </motion.p>
        )}

        <motion.h1
          className="text-hero mb-6 leading-tight"
          variants={itemVariants}
        >
          {title}
        </motion.h1>

        {description && (
          <motion.p
            className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto"
            variants={itemVariants}
          >
            {description}
          </motion.p>
        )}

        {ctaText && ctaHref && (
          <motion.div variants={itemVariants}>
            <a
              href={ctaHref}
              className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              {ctaText}
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </motion.div>
        )}

        {children && <motion.div variants={itemVariants}>{children}</motion.div>}
      </motion.div>
    </section>
  );
};

export default HeroSection;
