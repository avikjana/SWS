"use client";
import { motion } from "framer-motion";
import { Phone, MessageSquare, ArrowRight, Mail } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export function ContactCTA() {
  return (
    <section id="contact-cta" className="section-padding bg-[var(--bg-primary)] relative overflow-hidden">
      <div className="container-xl relative">
        <ScrollReveal>
          <div className="relative rounded-3xl overflow-hidden bg-[#0B0E17]">
            {/* Grid background */}
            <div className="absolute inset-0 bg-grid opacity-10" />
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

            <div className="relative p-12 md:p-16 text-center z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-semibold tracking-wider uppercase text-blue-400 mb-6">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  Admissions Open – Session 2025-26
                </div>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-white mb-6 leading-tight">
                  Ready to Begin Your
                  <br />
                  <span className="text-gradient">Success Journey?</span>
                </h2>

                <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
                  Talk to our expert counselors today. Get personalized guidance on course selection, batch timings, and fee structure — completely free.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                  <a
                    href="/contact"
                    className="btn-primary text-sm py-4 px-8"
                    id="cta-enroll-btn"
                  >
                    Get Free Counseling
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="https://wa.me/919800000000?text=Hi! I'm interested in enrolling at Xaurum Academy. Please share details."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-emerald-900/25"
                    id="cta-whatsapp-btn"
                  >
                    <MessageSquare className="w-5 h-5" />
                    WhatsApp Us
                  </a>
                </div>

                {/* Contact Info Row */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-slate-400 text-sm">
                  <a href="tel:+919800000000" className="flex items-center gap-2 hover:text-white transition-colors" id="cta-phone-link">
                    <Phone className="w-4 h-4 text-blue-400" />
                    +91 98000 00000
                  </a>
                  <div className="hidden md:block w-px h-4 bg-white/10" />
                  <a href="mailto:info@xaurumacademy.com" className="flex items-center gap-2 hover:text-white transition-colors" id="cta-email-link">
                    <Mail className="w-4 h-4 text-blue-400" />
                    info@xaurumacademy.com
                  </a>
                  <div className="hidden md:block w-px h-4 bg-white/10" />
                  <span>Mon – Sat: 9AM – 7PM</span>
                </div>
              </motion.div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
