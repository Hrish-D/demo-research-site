'use client';

import { motion } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import { LAB_NAME, LAB_EMAIL, LAB_INSTITUTION } from '@/lib/data';
import { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 4000);
    }, 1000);
  };

  return (
    <>
      <HeroSection
        title="Get in Touch"
        subtitle="Contact Us"
        description="Have questions about our research? Want to collaborate? We'd love to hear from you."
      />

      <section className="section-padding">
        <div className="container-width">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <h2 className="text-2xl font-serif font-semibold text-[var(--foreground)] mb-8">
                Contact Information
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-sm font-semibold text-[var(--foreground)] mb-2 uppercase tracking-wider">Email</h3>
                  <a href={`mailto:${LAB_EMAIL}`} className="text-accent-600 dark:text-accent-400 hover:underline text-lg font-medium transition-colors">
                    {LAB_EMAIL}
                  </a>
                  <p className="text-sm text-[var(--muted-foreground)] mt-1">For inquiries and collaboration requests</p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-[var(--foreground)] mb-2 uppercase tracking-wider">Laboratory</h3>
                  <p className="text-[var(--foreground)]">{LAB_NAME}</p>
                  <p className="text-sm text-[var(--muted-foreground)] mt-1">{LAB_INSTITUTION}</p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-[var(--foreground)] mb-2 uppercase tracking-wider">Connect</h3>
                  <div className="flex gap-3">
                    {['Google Scholar', 'ResearchGate', 'GitHub'].map((label) => (
                      <a
                        key={label}
                        href="#"
                        className="w-10 h-10 rounded-xl bg-[var(--muted)] border border-[var(--card-border)] flex items-center justify-center text-[var(--muted-foreground)] hover:text-accent-600 dark:hover:text-accent-400 hover:border-accent-500/30 transition-all duration-300 text-xs font-medium"
                        title={label}
                      >
                        {label[0]}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-[var(--card-border)]">
                  <h3 className="text-sm font-semibold text-[var(--foreground)] mb-4 uppercase tracking-wider">Quick Links</h3>
                  <div className="space-y-2">
                    {[
                      { label: 'Explore Research', href: '/research' },
                      { label: 'View Publications', href: '/publications' },
                      { label: 'Meet Our Team', href: '/team' },
                      { label: 'Paper Library', href: '/library' },
                    ].map((link) => (
                      <Link key={link.href} href={link.href} className="block text-sm text-[var(--muted-foreground)] hover:text-accent-600 dark:hover:text-accent-400 transition-colors">
                        {link.label} &rarr;
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-3"
            >
              <div className="card p-8 md:p-10">
                <h2 className="text-2xl font-serif font-semibold text-[var(--foreground)] mb-2">
                  Send a Message
                </h2>
                <p className="text-sm text-[var(--muted-foreground)] mb-8">
                  Fill out the form and we&apos;ll get back to you as soon as possible.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-[var(--foreground)] mb-2">Name</label>
                      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" className="input-base" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--foreground)] mb-2">Email</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" className="input-base" required />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--foreground)] mb-2">Subject</label>
                    <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="e.g., Research Collaboration" className="input-base" required />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--foreground)] mb-2">Message</label>
                    <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Tell us about what you'd like to discuss..." rows={6} className="input-base resize-none" required />
                  </div>

                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-700 dark:text-emerald-400 text-sm"
                    >
                      Thank you! Your message has been sent. We&apos;ll get back to you soon.
                    </motion.div>
                  )}

                  <button type="submit" disabled={isSubmitting} className="btn-primary w-full py-3.5">
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
