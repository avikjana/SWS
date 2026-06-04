"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play, Star, Users, Award, BookOpen, CheckCircle } from "lucide-react";
import { InquiryModal } from "@/features/InquiryModal";

const floatingBadges = [
  { top: "18%", left: "5%",  emoji: "🎯", text: "JEE AIR 247", delay: 0 },
  { top: "20%", right: "4%", emoji: "🏥", text: "NEET 720/720", delay: 0.3 },
  { bottom: "28%", left: "3%", emoji: "🏆", text: "WBJEE Rank 18", delay: 0.6 },
  { bottom: "25%", right: "3%", emoji: "⭐", text: "98% Success Rate", delay: 0.9 },
];

const trustPoints = [
  "IIT & AIIMS Alumni Faculty",
  "Small Batch Sizes (≤30 Students)",
  "30-Day Money-Back Guarantee",
];

export function HeroSection() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <section
        id="hero"
        className="relative min-h-screen flex items-center overflow-hidden bg-[#F8FAFB]"
        aria-label="Hero Section"
      >
        {/* Subtle grid */}
        <div className="absolute inset-0 bg-grid opacity-60" />

        {/* Soft ambient blobs */}
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)" }} />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(14,165,233,0.06) 0%, transparent 70%)" }} />

        {/* Floating achievement badges */}
        {floatingBadges.map((b, i) => (
          <motion.div
            key={i}
            className="absolute hidden xl:flex items-center gap-2.5 bg-white rounded-2xl px-4 py-2.5 shadow-md border border-[var(--border)] z-10"
            style={{ top: b.top, left: (b as any).left, right: (b as any).right, bottom: b.bottom }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 + b.delay, duration: 0.4, ease: "easeOut" }}
          >
            <span className="text-xl">{b.emoji}</span>
            <span className="text-sm font-semibold text-[var(--text-primary)] whitespace-nowrap">{b.text}</span>
          </motion.div>
        ))}

        <div className="container-xl relative z-10 pt-28 pb-16 w-full">
          <div className="max-w-3xl mx-auto text-center">

            {/* Announcement pill */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-sm font-semibold text-[#2563EB] mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2563EB] opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2563EB]" />
              </span>
              🎉 New Batch Starting – JEE &amp; NEET 2026 Enrollments Open
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl font-bold font-display tracking-tight text-[#0B0E17] leading-[1.08] mb-6"
            >
              Shape Your{" "}
              <span className="text-gradient">Future</span>
              <br />
              With{" "}
              <span className="relative inline-block">
                Excellence
                {/* underline decoration */}
                <svg className="absolute -bottom-2 left-0 w-full" height="6" viewBox="0 0 200 6" fill="none">
                  <path d="M0 5 Q50 1 100 5 Q150 9 200 5" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                </svg>
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed mb-10"
            >
              West Bengal&apos;s most trusted coaching academy for{" "}
              <strong className="text-[var(--text-primary)] font-semibold">JEE, NEET, WBJEE,</strong> and{" "}
              <strong className="text-[var(--text-primary)] font-semibold">Board Exams</strong>.
              Expert faculty. Proven results. Personalized mentorship.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
            >
              <button
                onClick={() => setShowModal(true)}
                className="btn-primary text-base px-8 py-3.5 rounded-xl group shadow-md hover:shadow-lg"
                id="hero-enroll-btn"
              >
                Start Your Journey
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <Link
                href="/contact"
                className="btn-secondary text-base px-8 py-3.5 rounded-xl group"
                id="hero-demo-btn"
              >
                <div className="w-7 h-7 rounded-full bg-[#2563EB]/10 flex items-center justify-center mr-1">
                  <Play className="w-3 h-3 text-[#2563EB] fill-[#2563EB] ml-0.5" />
                </div>
                Book Free Demo
              </Link>
            </motion.div>

            {/* Trust Points */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-5 text-sm text-[var(--text-muted)] mb-16"
            >
              {trustPoints.map((tp) => (
                <div key={tp} className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="font-medium">{tp}</span>
                </div>
              ))}
            </motion.div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {[
                { icon: Users,    value: "5,000+", label: "Students Enrolled" },
                { icon: Award,    value: "500+",   label: "Top Rankers" },
                { icon: Star,     value: "98%",    label: "Success Rate" },
                { icon: BookOpen, value: "15+",    label: "Years of Excellence" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.75 + i * 0.08 }}
                  className="card-premium p-5 text-center"
                >
                  <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="w-4.5 h-4.5 text-[#2563EB] w-5 h-5" />
                  </div>
                  <div className="stat-highlight text-2xl">{stat.value}</div>
                  <div className="text-xs text-[var(--text-muted)] font-medium mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <InquiryModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}
