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
  { icon: Instagram, href: "https://instagram.com/studywithsutirtha", label: "Instagram", color: "hover:text-black hover:bg-[#D2FF00]" },
  { icon: Facebook, href: "https://facebook.com/studywithsutirtha", label: "Facebook", color: "hover:text-black hover:bg-[#D2FF00]" },
  { icon: Youtube, href: "https://youtube.com/studywithsutirtha", label: "YouTube", color: "hover:text-black hover:bg-[#D2FF00]" },
  { icon: Twitter, href: "https://twitter.com/studywithsutirtha", label: "Twitter", color: "hover:text-black hover:bg-[#D2FF00]" },
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
    <footer className="relative bg-[#2563EB] border-t-2 border-black text-white">
      {/* Grid Pattern Layer */}
      <div className="absolute inset-0 bg-grid opacity-10" />

      <div className="container-xl py-16 relative z-10">
        
        {/* Newsletter Banner - Styled like Shardeum (Light Cream, High Contrast) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 p-8 md:p-12 relative overflow-hidden rounded-3xl border-2 border-black bg-[#F9F8F3] text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
        >
          {/* Subtle decoration dots */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#D2FF00]/10 rounded-full blur-2xl" />

          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8 z-10">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563EB]/10 border border-blue-600/20 text-xs font-extrabold uppercase tracking-wider text-blue-700 mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                Newsletter
              </div>
              <h3 className="text-2xl md:text-3xl font-black font-display text-black mb-2 uppercase">
                Stay Ahead in Your <span className="underline decoration-[#2563EB] decoration-3">Preparation</span>
              </h3>
              <p className="text-slate-600 font-semibold text-sm">
                Get exam tips, study resources, and batch updates delivered to your inbox.
              </p>
            </div>

            <div className="w-full lg:w-auto">
              {subscribed ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl border-2 border-black bg-emerald-100 text-emerald-800 font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
                  <Send className="w-5 h-5" />
                  <span>You&apos;re subscribed! 🎉</span>
                </motion.div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 min-w-full sm:min-w-[380px]" id="newsletter-form">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 px-4 py-3.5 rounded-full bg-white border-2 border-black text-black placeholder:text-slate-400 focus:outline-none focus:bg-slate-50 font-medium text-sm"
                    id="newsletter-email"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary py-3.5 px-6 whitespace-nowrap justify-center"
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
          
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6" id="footer-logo">
              <div className="w-10 h-10 rounded-xl bg-white border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <GraduationCap className="w-5 h-5 text-[#2563EB]" />
              </div>
              <div>
                <span className="text-xl font-black font-display text-[#D2FF00]">Study With</span>
                <span className="text-xl font-black font-display text-white"> Sutirtha</span>
              </div>
            </Link>
            <p className="text-sm text-slate-100 font-semibold leading-relaxed mb-6">
              Shaping futures through excellence in education. Premier coaching for JEE, NEET, WBJEE &amp; Board Exams.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 font-semibold text-slate-100 text-sm">
              <a href="tel:+919800000000" className="flex items-center gap-3 hover:text-[#D2FF00] transition-colors" id="footer-phone">
                <Phone className="w-4 h-4 flex-shrink-0 text-[#D2FF00]" />
                +91 98000 00000
              </a>
              <a href="mailto:info@studywithsutirtha.com" className="flex items-center gap-3 hover:text-[#D2FF00] transition-colors" id="footer-email">
                <Mail className="w-4 h-4 flex-shrink-0 text-[#D2FF00]" />
                info@studywithsutirtha.com
              </a>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 flex-shrink-0 text-[#D2FF00] mt-0.5" />
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
                  className={`w-9 h-9 flex items-center justify-center rounded-xl bg-white/10 border-2 border-white/20 text-white ${social.color} transition-all duration-200 hover:scale-105 hover:border-black`}
                  aria-label={social.label}
                  id={`footer-${social.label.toLowerCase()}`}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Courses Column */}
          <div>
            <h4 className="font-extrabold font-display text-white text-lg mb-5 uppercase tracking-wider">Courses</h4>
            <ul className="space-y-3 font-bold text-slate-100">
              {footerLinks.courses.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-sm hover:text-[#D2FF00] transition-colors group"
                  >
                    <ArrowRight className="w-3 h-3 text-[#D2FF00] opacity-0 group-hover:opacity-100 -ml-1 group-hover:ml-0 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="font-extrabold font-display text-white text-lg mb-5 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3 font-bold text-slate-100">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-sm hover:text-[#D2FF00] transition-colors group"
                  >
                    <ArrowRight className="w-3 h-3 text-[#D2FF00] opacity-0 group-hover:opacity-100 -ml-1 group-hover:ml-0 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Stats & Achievements Column */}
          <div>
            <h4 className="font-extrabold font-display text-white text-lg mb-5 uppercase tracking-wider">Our Achievements</h4>
            <div className="grid grid-cols-2 gap-3.5">
              {[
                { value: "5000+", label: "Students" },
                { value: "98%", label: "Success Rate" },
                { value: "500+", label: "Top Rankers" },
                { value: "15+", label: "Years Exp." },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="p-3 text-center bg-white border-2 border-black rounded-xl text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                >
                  <div className="text-lg font-black font-display text-blue-600">{stat.value}</div>
                  <div className="text-[10px] font-extrabold text-black/60 uppercase mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <Link
                href="/contact"
                className="btn-primary w-full justify-center text-sm py-3 mt-4"
                id="footer-contact-cta"
              >
                Get Free Demo Class
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t-2 border-black flex flex-col md:flex-row items-center justify-between gap-4 font-semibold text-slate-200">
          {/* Left copyright */}
          <p className="text-sm">
            © {new Date().getFullYear()} Study With Sutirtha. All rights reserved.
          </p>
          
          {/* Center credit */}
          <p className="text-xs text-slate-300 font-bold flex items-center justify-center gap-1.5">
            Made with <span className="text-[#FF007A] animate-pulse">❤️</span> by{" "}
            <a
              href="https://xauramlab.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#D2FF00] text-black px-2 py-0.5 rounded-md font-extrabold border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] inline-block hover:translate-y-[-1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
            >
              Xauram Lab
            </a>
          </p>

          {/* Right legal links */}
          <div className="flex items-center gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs hover:text-[#D2FF00] transition-colors"
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
