'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Image from 'next/image';
import CosmicNav from '@/components/cosmic/CosmicNav';
import { LAB_NAME, LAB_EMAIL, LAB_INSTITUTION } from '@/lib/data';
import { useState } from 'react';
import Link from 'next/link';

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroImageY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

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
    <div className="min-h-screen bg-black text-white">
      <CosmicNav />

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[60vh] min-h-[400px] overflow-hidden flex items-center justify-center">
        <motion.div className="absolute inset-0" style={{ y: heroImageY }}>
          <Image
            src="/images/contact.png"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black" />
        <div className="relative z-10 text-center px-6">
          <motion.p
            className="text-teal-400/70 text-xs md:text-sm tracking-[0.4em] uppercase font-sans mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Contact Us
          </motion.p>
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl font-serif tracking-tight text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            Get in Touch
          </motion.h1>
          <motion.p
            className="mt-4 text-white/50 max-w-xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Have questions about our research? Want to collaborate? We&apos;d love to hear from you.
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="inline-block text-white/30 hover:text-white/60 text-sm transition-colors duration-300 mb-10">
            &larr; Back to Home
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Contact Info */}
            <AnimatedSection className="lg:col-span-2">
              <h2 className="text-2xl font-serif font-semibold text-white/90 mb-8">
                Contact Information
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-sm font-semibold text-white/90 mb-2 uppercase tracking-wider">Email</h3>
                  <a href={`mailto:${LAB_EMAIL}`} className="text-teal-400 hover:underline text-lg font-medium transition-colors">
                    {LAB_EMAIL}
                  </a>
                  <p className="text-sm text-white/30 mt-1">For inquiries and collaboration requests</p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-white/90 mb-2 uppercase tracking-wider">Laboratory</h3>
                  <p className="text-white/70">{LAB_NAME}</p>
                  <p className="text-sm text-white/30 mt-1">{LAB_INSTITUTION}</p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-white/90 mb-2 uppercase tracking-wider">Connect</h3>
                  <div className="flex gap-3">
                    {['Google Scholar', 'ResearchGate', 'GitHub'].map((label) => (
                      <a
                        key={label}
                        href="#"
                        className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-white/30 hover:text-teal-400 hover:border-teal-400/30 hover:shadow-[0_0_30px_rgba(45,212,191,0.08)] transition-all duration-300 text-xs font-medium"
                        title={label}
                      >
                        {label[0]}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/[0.06]">
                  <h3 className="text-sm font-semibold text-white/90 mb-4 uppercase tracking-wider">Quick Links</h3>
                  <div className="space-y-2">
                    {[
                      { label: 'Explore Research', href: '/research' },
                      { label: 'View Publications', href: '/publications' },
                      { label: 'Meet Our Team', href: '/team' },
                      { label: 'Paper Library', href: '/library' },
                    ].map((link) => (
                      <Link key={link.href} href={link.href} className="block text-sm text-white/30 hover:text-teal-400 transition-colors">
                        {link.label} &rarr;
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Contact Form */}
            <AnimatedSection className="lg:col-span-3">
              <div className="bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm rounded-2xl p-8 md:p-10 hover:shadow-[0_0_30px_rgba(45,212,191,0.08)] transition-shadow duration-500">
                <h2 className="text-2xl font-serif font-semibold text-white/90 mb-2">
                  Send a Message
                </h2>
                <p className="text-sm text-white/30 mb-8">
                  Fill out the form and we&apos;ll get back to you as soon as possible.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-teal-400/40 focus:ring-1 focus:ring-teal-400/20 transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-teal-400/40 focus:ring-1 focus:ring-teal-400/20 transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g., Research Collaboration"
                      className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-teal-400/40 focus:ring-1 focus:ring-teal-400/20 transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about what you'd like to discuss..."
                      rows={6}
                      className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-teal-400/40 focus:ring-1 focus:ring-teal-400/20 transition-colors resize-none"
                      required
                    />
                  </div>

                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm"
                    >
                      Thank you! Your message has been sent. We&apos;ll get back to you soon.
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-teal-400/10 border border-teal-400/20 rounded-xl text-teal-400 font-medium hover:bg-teal-400/20 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.04] py-12 bg-black">
        <div className="max-w-7xl mx-auto px-6 md:px-10 text-center">
          <p className="text-white/15 text-xs tracking-wider">&copy; 2026 Advanced Materials &amp; Systems Lab</p>
        </div>
      </footer>
    </div>
  );
}
