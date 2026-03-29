'use client';

import { motion } from 'framer-motion';
import { LAB_NAME, LAB_EMAIL, LAB_INSTITUTION } from '@/lib/data';
import { useState } from 'react';

export default function ContactContent() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 4000);
    }, 1000);
  };

  const inputClass =
    'w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white/80 placeholder:text-white/20 focus:outline-none focus:border-teal-400/30 transition-colors text-sm';

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="pt-16 pb-8 px-6 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-teal-400/60 text-sm tracking-[0.2em] uppercase mb-4 font-sans">
            Contact Us
          </p>
          <h1 className="text-4xl md:text-6xl font-serif mb-6">Get in Touch</h1>
          <p className="text-white/40 max-w-xl">
            Have questions about our research? Want to collaborate? We&apos;d love to hear from you.
          </p>
        </motion.div>
      </div>

      <div className="px-6 max-w-5xl mx-auto pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h3 className="text-xs text-white/30 tracking-wider uppercase mb-2">Email</h3>
              <a href={`mailto:${LAB_EMAIL}`} className="text-teal-400 hover:underline">
                {LAB_EMAIL}
              </a>
            </div>
            <div>
              <h3 className="text-xs text-white/30 tracking-wider uppercase mb-2">Laboratory</h3>
              <p className="text-white/70">{LAB_NAME}</p>
              <p className="text-white/30 text-sm mt-1">{LAB_INSTITUTION}</p>
            </div>
            <div>
              <h3 className="text-xs text-white/30 tracking-wider uppercase mb-2">Connect</h3>
              <div className="flex gap-3">
                {['Google Scholar', 'ResearchGate', 'GitHub'].map((label) => (
                  <a
                    key={label}
                    href="#"
                    className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/30 hover:text-teal-400 hover:border-teal-400/20 transition-all text-xs"
                  >
                    {label[0]}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
              <h2 className="text-xl font-serif mb-6">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <input name="name" value={formData.name} onChange={handleChange} placeholder="Your name" className={inputClass} required />
                  <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" className={inputClass} required />
                </div>
                <input name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject" className={inputClass} required />
                <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your message..." rows={5} className={`${inputClass} resize-none`} required />

                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm"
                  >
                    Thank you! Your message has been sent.
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-medium transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
