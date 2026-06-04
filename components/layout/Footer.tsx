"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Youtube,
  Twitter,
  Send,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const footerLinks = {
  courses: [
    { label: "Class 9-10", href: "/courses#class-9-10" },
    { label: "Class 11-12 Science", href: "/courses#class-11-12-science" },
    { label: "Class 11-12 Commerce", href: "/courses#class-11-12-commerce" },
    { label: "JEE Preparation", href: "/courses#jee" },
    { label: "NEET Preparation", href: "/courses#neet" },
    { label: "WBJEE Preparation", href: "/courses#wbjee" },
    { label: "Computer Science", href: "/courses#cs" },
  ],
  quickLinks: [
    { label: "About Us", href: "/about" },
    { label: "Our Faculty", href: "/faculty" },
    { label: "Results", href: "/results" },
    { label: "Gallery", href: "/gallery" },
    { label: "Blog", href: "/blog" },
    { label: "Contact Us", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Refund Policy", href: "/refund" },
  ],
};

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com/xaurumacademy", label: "Instagram", color: "hover:text-pink-400 hover:bg-pink-500/10" },
  { icon: Facebook, href: "https://facebook.com/xaurumacademy", label: "Facebook", color: "hover:text-blue-400 hover:bg-blue-500/10" },
  { icon: Youtube, href: "https://youtube.com/xaurumacademy", label: "YouTube", color: "hover:text-red-400 hover:bg-red-500/10" },
  { icon: Twitter, href: "https://twitter.com/xaurumacademy", label: "Twitter", color: "hover:text-sky-400 hover:bg-sky-500/10" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setSubscribed(true);
      setEmail("");
    } catch {
      setSubscribed(true); // optimistic
    } finally {
      setLoading(false);
    }
  }

  return (
    <footer className="relative bg-[var(--bg-footer)] border-t border-slate-800 text-slate-300">
      {/* Gradient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      <div className="container-xl py-16">
        {/* Newsletter Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 p-8 md:p-12 relative overflow-hidden rounded-3xl border border-slate-800 bg-white/5"
        >
          {/* Background elements */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 z-10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-blue-400 animate-pulse" />
                <span className="badge badge-blue">Newsletter</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold font-display text-white mb-2">
                Stay Ahead in Your <span className="text-gradient">Preparation</span>
              </h3>
              <p className="text-slate-400">
                Get exam tips, study resources, and batch updates delivered to your inbox.
              </p>
            </div>

            <div className="w-full md:w-auto">
              {subscribed ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-green-500/15 border border-green-500/30 text-green-400"
                >
                  <Send className="w-5 h-5" />
                  <span className="font-medium">You&apos;re subscribed! 🎉</span>
                </motion.div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-3 min-w-[320px]" id="newsletter-form">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 text-sm"
                    id="newsletter-email"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary py-3 px-5 whitespace-nowrap"
                    id="newsletter-submit"
                  >
                    {loading ? "..." : <><Send className="w-4 h-4" /> Subscribe</>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </motion.div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6" id="footer-logo">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-sky flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold font-display text-gradient">Xaurum</span>
                <span className="text-xl font-bold font-display text-white"> Academy</span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Shaping futures through excellence in education. Premier coaching for JEE, NEET, WBJEE & Board Exams.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a href="tel:+919800000000" className="flex items-center gap-3 text-sm text-slate-400 hover:text-blue-400 transition-colors" id="footer-phone">
                <Phone className="w-4 h-4 flex-shrink-0 text-blue-400" />
                +91 98000 00000
              </a>
              <a href="mailto:info@xaurumacademy.com" className="flex items-center gap-3 text-sm text-slate-400 hover:text-blue-400 transition-colors" id="footer-email">
                <Mail className="w-4 h-4 flex-shrink-0 text-blue-400" />
                info@xaurumacademy.com
              </a>
              <div className="flex items-start gap-3 text-sm text-slate-400">
                <MapPin className="w-4 h-4 flex-shrink-0 text-blue-400 mt-0.5" />
                <span>123, Education Hub, Kolkata, West Bengal - 700001</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 border border-slate-800 text-slate-400 ${social.color} transition-all duration-200 hover:scale-110`}
                  aria-label={social.label}
                  id={`footer-${social.label.toLowerCase()}`}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Courses */}
          <div>
            <h4 className="font-semibold font-display text-white mb-5">Courses</h4>
            <ul className="space-y-3">
              {footerLinks.courses.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-slate-400 hover:text-blue-400 transition-colors group"
                  >
                    <ArrowRight className="w-3 h-3 text-blue-400 opacity-0 group-hover:opacity-100 -ml-1 group-hover:ml-0 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold font-display text-white mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-slate-400 hover:text-blue-400 transition-colors group"
                  >
                    <ArrowRight className="w-3 h-3 text-blue-400 opacity-0 group-hover:opacity-100 -ml-1 group-hover:ml-0 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Stats & Achievements */}
          <div>
            <h4 className="font-semibold font-display text-white mb-5">Our Achievements</h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: "5000+", label: "Students" },
                { value: "98%", label: "Success Rate" },
                { value: "500+", label: "Top Rankers" },
                { value: "15+", label: "Years Exp." },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="p-3 text-center bg-white/5 border border-slate-800 rounded-xl"
                >
                  <div className="text-xl font-bold font-display text-gradient">{stat.value}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <Link
                href="/contact"
                className="btn-primary w-full justify-center text-sm py-2.5 mt-4"
                id="footer-contact-cta"
              >
                Get Free Demo Class
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Xaurum Academy. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs text-slate-500 hover:text-blue-400 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
