"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle, Clock, User } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { BackToTop } from "@/components/ui/BackToTop";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", subject: "", message: "", courseInterest: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) setSubmitted(true);
      else setError("Something went wrong. Please try again or call us directly.");
    } catch {
      setSubmitted(true); // optimistic on network error
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <main className="pt-20">
        {/* Hero */}
        <section className="section-padding-sm bg-[var(--bg-primary)] relative overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="container-xl relative text-center">
            <ScrollReveal>
              <div className="section-tag mx-auto">
                <Mail className="w-3.5 h-3.5" />
                Contact Us
              </div>
              <h1 className="text-5xl md:text-6xl font-bold font-display text-[var(--text-primary)] mt-4">
                Get In{" "}
                <span className="text-gradient">Touch</span>
              </h1>
              <p className="mt-4 text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
                Ready to start your journey? Reach out for free counseling, course details, or any queries.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className="section-padding bg-[var(--bg-secondary)]">
          <div className="container-xl grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <ScrollReveal direction="left">
              <div className="card-premium p-8 border border-[var(--border)]">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10"
                  >
                    <div className="w-20 h-20 rounded-full bg-green-500/15 flex items-center justify-center mx-auto mb-5">
                      <CheckCircle className="w-10 h-10 text-green-400" />
                    </div>
                    <h2 className="text-2xl font-bold font-display text-[var(--text-primary)] mb-3">Message Sent! 🎉</h2>
                    <p className="text-[var(--text-secondary)] mb-6">
                      We&apos;ve received your message. Our team will contact you within 2-4 business hours.
                    </p>
                    <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-sm text-blue-300">
                      For urgent matters, call us directly at{" "}
                      <a href="tel:+919800000000" className="font-bold text-blue-400">+91 98000 00000</a>
                    </div>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", subject: "", message: "", courseInterest: "" }); }}
                      className="btn-secondary mt-6 px-8 py-3"
                      id="contact-reset-btn"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold font-display text-[var(--text-primary)] mb-6">Send Us a Message</h2>
                    <form onSubmit={handleSubmit} className="space-y-4" id="contact-form">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">Full Name *</label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                            <input type="text" required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                              className="w-full pl-9 pr-4 py-3 rounded-xl glass border border-[var(--border)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-blue-500/50 text-sm"
                              placeholder="Your name" id="contact-name" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">Phone *</label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                            <input type="tel" required value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                              className="w-full pl-9 pr-4 py-3 rounded-xl glass border border-[var(--border)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-blue-500/50 text-sm"
                              placeholder="+91 XXXXX XXXXX" id="contact-phone" />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">Email Address</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                          <input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                            className="w-full pl-9 pr-4 py-3 rounded-xl glass border border-[var(--border)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-blue-500/50 text-sm"
                            placeholder="your@email.com" id="contact-email" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">Course Interest</label>
                        <select value={form.courseInterest} onChange={e => setForm(p => ({ ...p, courseInterest: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl glass border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:border-blue-500/50 text-sm"
                          id="contact-course">
                          <option value="">Select a course (optional)</option>
                          <option>Class 9-10 Foundation</option>
                          <option>Class 11-12 Science</option>
                          <option>Class 11-12 Commerce</option>
                          <option>JEE Preparation</option>
                          <option>NEET Preparation</option>
                          <option>WBJEE Preparation</option>
                          <option>Computer Science</option>
                          <option>General Inquiry</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">Subject *</label>
                        <input type="text" required value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl glass border border-[var(--border)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-blue-500/50 text-sm"
                          placeholder="What's this about?" id="contact-subject" />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">Message *</label>
                        <textarea required value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                          rows={5}
                          className="w-full px-4 py-3 rounded-xl glass border border-[var(--border)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-blue-500/50 text-sm resize-none"
                          placeholder="Tell us how we can help you..." id="contact-message" />
                      </div>

                      {error && <p className="text-red-400 text-sm text-center">{error}</p>}

                      <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-4" id="contact-submit-btn">
                        {loading ? <span className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full" /> : <><Send className="w-4 h-4" /> Send Message</>}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </ScrollReveal>

            {/* Contact Info */}
            <div className="space-y-6">
              <ScrollReveal direction="right">
                <div className="card-premium p-6 border border-[var(--border)]">
                  <h3 className="text-xl font-bold font-display text-[var(--text-primary)] mb-5">Contact Information</h3>
                  <div className="space-y-4">
                    <a href="tel:+919800000000" className="flex items-center gap-4 group" id="contact-info-phone">
                      <div className="w-12 h-12 rounded-xl bg-blue-500/15 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/25 transition-colors">
                        <Phone className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-xs text-[var(--text-muted)]">Call Us</p>
                        <p className="font-semibold text-[var(--text-primary)] group-hover:text-blue-400 transition-colors">+91 98000 00000</p>
                        <p className="text-xs text-[var(--text-muted)]">Mon – Sat, 9AM – 7PM</p>
                      </div>
                    </a>
                    <a href="mailto:info@studywithsutirtha.com" className="flex items-center gap-4 group" id="contact-info-email">
                      <div className="w-12 h-12 rounded-xl bg-purple-500/15 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-500/25 transition-colors">
                        <Mail className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-xs text-[var(--text-muted)]">Email Us</p>
                        <p className="font-semibold text-[var(--text-primary)] group-hover:text-purple-400 transition-colors">info@studywithsutirtha.com</p>
                        <p className="text-xs text-[var(--text-muted)]">We reply within 24 hours</p>
                      </div>
                    </a>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-green-500/15 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-green-400" />
                      </div>
                      <div>
                        <p className="text-xs text-[var(--text-muted)]">Visit Us</p>
                        <p className="font-semibold text-[var(--text-primary)]">123, Education Hub</p>
                        <p className="text-sm text-[var(--text-secondary)]">Near City College, Kolkata, WB 700001</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-orange-500/15 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-orange-400" />
                      </div>
                      <div>
                        <p className="text-xs text-[var(--text-muted)]">Office Hours</p>
                        <p className="font-semibold text-[var(--text-primary)]">Monday – Saturday</p>
                        <p className="text-sm text-[var(--text-secondary)]">9:00 AM – 7:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* WhatsApp CTA */}
              <ScrollReveal direction="right" delay={0.15}>
                <a
                  href="https://wa.me/919800000000?text=Hi! I want to know more about Study With Sutirtha courses and enrollment."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-6 card-premium border border-green-500/20 hover:border-green-500/40 group transition-all"
                  id="whatsapp-cta"
                >
                  <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-green-500/30 transition-colors">
                    <MessageSquare className="w-5 h-5 text-green-400" />
                  </div>
                  <div className="flex-grow">
                    <p className="font-bold text-[var(--text-primary)] group-hover:text-green-400 transition-colors">Chat on WhatsApp</p>
                    <p className="text-sm text-[var(--text-secondary)]">Quick responses, usually within minutes</p>
                  </div>
                  <Send className="w-4 h-4 text-green-400 group-hover:translate-x-1 transition-transform" />
                </a>
              </ScrollReveal>

              {/* Map Placeholder */}
              <ScrollReveal direction="right" delay={0.2}>
                <div className="card-premium border border-[var(--border)] overflow-hidden">
                  <div className="h-56 bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex flex-col items-center justify-center gap-3 text-[var(--text-muted)]">
                    <MapPin className="w-12 h-12 text-blue-400" />
                    <div className="text-center">
                      <p className="font-medium text-[var(--text-secondary)]">Google Maps Integration</p>
                      <p className="text-xs mt-1">Add your NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to show map</p>
                    </div>
                    <a
                      href="https://maps.google.com/?q=Kolkata,WB"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary text-sm py-2 px-4 mt-2"
                      id="open-maps-btn"
                    >
                      Open in Google Maps
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </main>
      <BackToTop />
    </>
  );
}
