'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SECTION_LINKS = [
  { href: '#hero', label: 'Home' },
  { href: '#mission', label: 'Mission' },
  { href: '#research', label: 'Research' },
  { href: '#publications', label: 'Publications' },
  { href: '#team', label: 'Team' },
];

const PAGE_LINKS = [
  { href: '/library', label: 'Library' },
  { href: '/contact', label: 'Contact' },
];

const ALL_LINKS = [...SECTION_LINKS, ...PAGE_LINKS];

export default function CosmicNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const pathname = usePathname();
  const isHomepage = pathname === '/';

  // Track scroll position and active section
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);

      if (!isHomepage) return;

      // Find which section is currently in view
      const sections = SECTION_LINKS.map((l) => l.href.replace('#', ''));
      let current = sections[0];

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomepage]);

  // Smooth scroll to section
  const scrollToSection = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (!href.startsWith('#')) return; // Let page links navigate normally
      e.preventDefault();
      const id = href.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        const offset = 80; // nav height
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
      setMobileOpen(false);
    },
    [],
  );

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-[90] transition-all duration-700 ${
          scrolled
            ? 'bg-black/70 backdrop-blur-2xl border-b border-white/[0.04] shadow-2xl shadow-black/50'
            : 'bg-transparent'
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400/80 to-purple-500/80 flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-orange-500/20 group-hover:shadow-orange-500/40 transition-shadow duration-500">
              A
            </div>
            <span className="text-white/70 text-sm font-sans tracking-wider group-hover:text-white/90 transition-colors duration-300 hidden sm:inline">
              AMS Lab
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-0.5">
            {ALL_LINKS.map((link) => {
              const isSection = link.href.startsWith('#');
              const isActive =
                isSection && isHomepage
                  ? activeSection === link.href.replace('#', '')
                  : !isSection && pathname === link.href;

              const linkEl = (
                <span className="relative px-4 py-2 text-sm transition-colors duration-300 rounded-lg hover:bg-white/[0.04] block">
                  <span
                    className={`transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-white/40 hover:text-white/80'
                    }`}
                  >
                    {link.label}
                  </span>
                  {/* Active indicator dot */}
                  {isActive && (
                    <motion.span
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-teal-400 shadow-[0_0_6px_rgba(45,212,191,0.6)]"
                      layoutId="nav-active"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </span>
              );

              if (isSection) {
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="cursor-pointer"
                  >
                    {linkEl}
                  </a>
                );
              }

              return (
                <Link key={link.label} href={link.href}>
                  {linkEl}
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`w-5 h-[1.5px] bg-white/60 transition-all duration-300 ${
                mobileOpen ? 'rotate-45 translate-y-[5px]' : ''
              }`}
            />
            <span
              className={`w-5 h-[1.5px] bg-white/60 transition-all duration-300 ${
                mobileOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`w-5 h-[1.5px] bg-white/60 transition-all duration-300 ${
                mobileOpen ? '-rotate-45 -translate-y-[5px]' : ''
              }`}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[85] bg-black/95 backdrop-blur-2xl flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center gap-6">
              {ALL_LINKS.map((link, i) => {
                const isSection = link.href.startsWith('#');

                if (isSection) {
                  return (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      className="text-2xl font-serif text-white/60 hover:text-white transition-colors duration-300"
                      onClick={(e) => scrollToSection(e, link.href)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      {link.label}
                    </motion.a>
                  );
                }

                return (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="text-2xl font-serif text-white/60 hover:text-white transition-colors duration-300"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
