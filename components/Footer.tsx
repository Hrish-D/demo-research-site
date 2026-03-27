'use client';

import Link from 'next/link';
import { LAB_NAME, LAB_ACRONYM, LAB_EMAIL, LAB_INSTITUTION } from '@/lib/data';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Research: [
      { label: 'Research Projects', href: '/research' },
      { label: 'Publications', href: '/publications' },
      { label: 'Paper Library', href: '/library' },
    ],
    Lab: [
      { label: 'Team', href: '/team' },
      { label: 'Contact', href: '/contact' },
      { label: 'Home', href: '/' },
    ],
  };

  return (
    <footer className="bg-slate-900 text-slate-100 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Lab Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-serif font-bold text-sm">
                A
              </div>
              <span className="font-serif text-lg font-semibold">{LAB_ACRONYM}</span>
            </div>
            <p className="text-slate-300 text-sm mb-4 max-w-sm">
              {LAB_NAME}
            </p>
            <p className="text-slate-400 text-xs mb-4">
              {LAB_INSTITUTION}
            </p>
            <a
              href={`mailto:${LAB_EMAIL}`}
              className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
            >
              {LAB_EMAIL}
            </a>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-serif text-sm font-semibold mb-4 text-white">
                {title}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-slate-400 hover:text-slate-200 text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 pt-8">
          {/* Bottom */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
            <p>
              © {currentYear} {LAB_ACRONYM}. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="hover:text-slate-200 transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="hover:text-slate-200 transition-colors"
              >
                Terms
              </a>
              <a
                href="#"
                className="hover:text-slate-200 transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
