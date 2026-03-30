'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Image from 'next/image';

/**
 * Full-viewport section with a space image background and parallax.
 * The background moves slower than scroll, creating depth.
 */
export function CosmicSection({
  children,
  backgroundSrc,
  overlay = 'dark',
  id,
  className = '',
}: {
  children: React.ReactNode;
  backgroundSrc: string;
  overlay?: 'dark' | 'darker' | 'gradient-left' | 'gradient-right' | 'center-focus';
  id?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Parallax: background moves at 30% of scroll speed
  const y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);

  const overlayStyles: Record<string, string> = {
    dark: 'bg-black/50',
    darker: 'bg-black/70',
    'gradient-left':
      'bg-gradient-to-r from-black/90 via-black/60 to-transparent',
    'gradient-right':
      'bg-gradient-to-l from-black/90 via-black/60 to-transparent',
    'center-focus':
      'bg-[radial-gradient(ellipse_at_center,transparent_10%,rgba(0,0,0,0.6)_50%,rgba(0,0,0,0.9)_100%)]',
  };

  return (
    <section
      ref={ref}
      id={id}
      className={`relative min-h-screen overflow-hidden flex items-center ${className}`}
    >
      {/* Parallax background image */}
      <motion.div
        className="absolute inset-0 -inset-y-[20%]"
        style={{ y }}
      >
        <Image
          src={backgroundSrc}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          quality={85}
          priority
        />
      </motion.div>

      {/* Overlay */}
      <div className={`absolute inset-0 ${overlayStyles[overlay]}`} />

      {/* Top fade-in edge */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black to-transparent z-[2]" />
      {/* Bottom fade-out edge */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent z-[2]" />

      {/* Content */}
      <div className="relative z-10 w-full">{children}</div>
    </section>
  );
}

/**
 * Text reveal component — fades and slides in when scrolled into view.
 */
export function Reveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'none';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const initial: Record<string, number | string> = { opacity: 0, filter: 'blur(8px)' };
  const animate: Record<string, number | string> = { opacity: 1, filter: 'blur(0px)' };

  if (direction === 'up') {
    initial.y = 40;
    animate.y = 0;
  } else if (direction === 'left') {
    initial.x = -40;
    animate.x = 0;
  } else if (direction === 'right') {
    initial.x = 40;
    animate.x = 0;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initial}
      animate={isInView ? animate : initial}
      transition={{
        duration: 0.9,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Gradient divider between sections for seamless transitions.
 */
export function SectionDivider() {
  return (
    <div
      className="relative h-0 w-full"
      aria-hidden="true"
    />
  );
}

/**
 * Scroll progress bar across the top of the page.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-teal-400 via-purple-400 to-orange-400 z-[100] origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
