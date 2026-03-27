'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { LAB_ACRONYM } from '@/lib/data';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Research', href: '/research' },
    { label: 'Publications', href: '/publications' },
    { label: 'Team', href: '/team' },
    { label: 'Library', href: '/library' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-sm border-b border-slate-100'
          : 'bg-white/50 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo / Lab Name */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-serif font-bold text-sm group-hover:bg-blue-700 transition-colors">
              A
            </div>
            <span className="hidden sm:inline font-serif text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
              {LAB_ACRONYM}
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMobileMenuOpen
                    ? 'M6 18L18 6M6 6l12 12'
                    : 'M4 6h16M4 12h16M4 18h16'
                }
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden animate-in fade-in slide-in-from-top-2 duration-300 border-t border-slate-100">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-blue-600 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
