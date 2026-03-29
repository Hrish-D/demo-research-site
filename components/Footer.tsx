'use client';

import Link from 'next/link';
import { LAB_NAME, LAB_ACRONYM, LAB_EMAIL, LAB_INSTITUTION } from '@/lib/data';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Research: [
      { label: 'Projects', href: '/research' },
      { label: 'Publications', href: '/publications' },
      { label: 'Paper Library', href: '/library' },
    ],
    Lab: [
      { label: 'Our Team', href: '/team' },
      { label: 'Contact', href: '/contact' },
      { label: 'Dashboard', href: '/dashboard' },
    ],
  };

  return (
    <footer className="bg-[var(--muted)] border-t border-[var(--card-border)]">
      <div className="container-width py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-lg bg-accent-600 flex items-center justify-center text-white font-serif font-bold text-base">
                A
              </div>
              <span className="font-serif text-lg font-semibold text-[var(--foreground)]">
                {LAB_ACRONYM}
              </span>
            </div>
            <p className="text-[var(--muted-foreground)] text-sm leading-relaxed mb-4 max-w-sm">
              {LAB_NAME} at {LAB_INSTITUTION}. Pioneering research at the intersection of materials science, nanotechnology, and biomimetic systems.
            </p>
            <a
              href={`mailto:${LAB_EMAIL}`}
              className="text-accent-600 dark:text-accent-400 hover:text-accent-700 dark:hover:text-accent-300 text-sm font-medium transition-colors"
            >
              {LAB_EMAIL}
            </a>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="md:col-span-2">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-5">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-5">
              Connect
            </h4>
            <div className="flex gap-3">
              {[
                { label: 'Google Scholar', icon: 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z' },
                { label: 'GitHub', icon: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z' },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-[var(--card)] border border-[var(--card-border)] flex items-center justify-center text-[var(--muted-foreground)] hover:text-accent-600 dark:hover:text-accent-400 hover:border-accent-500/30 transition-all duration-300"
                  title={social.label}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--card-border)] pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[var(--muted-foreground)]">
            <p>&copy; {currentYear} {LAB_ACRONYM}. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-[var(--foreground)] transition-colors">Privacy</a>
              <a href="#" className="hover:text-[var(--foreground)] transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
