'use client';

import { motion } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import { LAB_NAME, LAB_EMAIL, LAB_INSTITUTION } from '@/lib/data';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>(
    'idle',
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      setIsSubmitting(false);

      // Reset status after 3 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    }, 1000);
  };

  return (
    <>
      <HeroSection
        title="Get in Touch"
        subtitle="Contact Us"
        description="Have questions about our research? Want to collaborate? We'd love to hear from you."
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-serif font-semibold text-slate-900 mb-8">
                Contact Information
              </h2>

              {/* Contact Items */}
              <div className="space-y-8">
                {/* Email */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    Email
                  </h3>
                  <a
                    href={`mailto:${LAB_EMAIL}`}
                    className="text-blue-600 hover:text-blue-700 text-lg transition-colors"
                  >
                    {LAB_EMAIL}
                  </a>
                  <p className="text-slate-600 mt-2 text-sm">
                    For general inquiries and collaboration requests
                  </p>
                </div>

                {/* Lab Name */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    Laboratory Name
                  </h3>
                  <p className="text-slate-700 text-lg">{LAB_NAME}</p>
                  <p className="text-slate-600 text-sm mt-2">
                    Advanced Materials & Systems Lab
                  </p>
                </div>

                {/* Institution */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    Institution
                  </h3>
                  <p className="text-slate-700 text-lg">{LAB_INSTITUTION}</p>
                </div>

                {/* Social / Web */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">
                    Connect With Us
                  </h3>
                  <div className="flex gap-4">
                    {[
                      {
                        icon: '📄',
                        label: 'Scholar',
                        href: '#',
                      },
                      {
                        icon: '📚',
                        label: 'ResearchGate',
                        href: '#',
                      },
                      {
                        icon: '💻',
                        label: 'GitHub',
                        href: '#',
                      },
                    ].map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-slate-100 text-slate-700 hover:bg-blue-100 hover:text-blue-700 transition-colors"
                        title={social.label}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Quick Links */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">
                    Quick Links
                  </h3>
                  <div className="space-y-2">
                    <a
                      href="/research"
                      className="block text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      → Explore Research
                    </a>
                    <a
                      href="/publications"
                      className="block text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      → View Publications
                    </a>
                    <a
                      href="/team"
                      className="block text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      → Meet Our Team
                    </a>
                    <a
                      href="/library"
                      className="block text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      → Paper Library
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="card-base p-8">
                <h2 className="text-3xl font-serif font-semibold text-slate-900 mb-6">
                  Send us a Message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g., Research Collaboration"
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about what you'd like to discuss..."
                      rows={5}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                      required
                    />
                  </div>

                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm"
                    >
                      ✓ Thank you! Your message has been sent. We&apos;ll get back
                      to you soon.
                    </motion.div>
                  )}

                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
                    >
                      ✗ Something went wrong. Please try again.
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors font-medium"
                  >
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
