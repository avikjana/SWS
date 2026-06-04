"use client";
import { motion } from "framer-motion";
import { Trophy, Users, Brain, Clock, BookOpen, Shield, Zap, Heart } from "lucide-react";
import { ScrollReveal, StaggerContainer, staggerItem } from "@/components/animations/ScrollReveal";

const features = [
  { icon: Trophy,   title: "Proven Track Record",     description: "500+ JEE/NEET/WBJEE qualifiers every year. 98% board exam success rate with consistent top rankers.", color: "text-amber-500",  bg: "bg-amber-50",  border: "hover:border-amber-200" },
  { icon: Brain,    title: "Expert IIT/AIIMS Faculty", description: "Learn from IIT & AIIMS alumni with 10+ years of teaching experience and deep subject expertise.",     color: "text-blue-600",  bg: "bg-blue-50",   border: "hover:border-blue-200" },
  { icon: BookOpen, title: "Comprehensive Material",   description: "Curated notes, practice sheets, mock tests, and PYQ banks designed for maximum exam success.",         color: "text-green-600", bg: "bg-green-50",  border: "hover:border-green-200" },
  { icon: Clock,    title: "Flexible Batch Timings",   description: "Morning, afternoon, and evening batches to match your schedule. Weekend batches also available.",       color: "text-purple-600",bg: "bg-purple-50", border: "hover:border-purple-200" },
  { icon: Users,    title: "Small Batch Sizes",        description: "Limited batch sizes ensure personalized attention, doubt clearing sessions, and individual mentoring.", color: "text-pink-600",  bg: "bg-pink-50",   border: "hover:border-pink-200" },
  { icon: Zap,      title: "Weekly Tests & Analysis",  description: "Structured weekly tests with detailed performance analysis to track progress and identify weak areas.",  color: "text-sky-600",   bg: "bg-sky-50",    border: "hover:border-sky-200" },
  { icon: Shield,   title: "Money-Back Guarantee",     description: "We believe in our teaching. If not satisfied within the first month, get a full fee refund.",           color: "text-orange-600",bg: "bg-orange-50", border: "hover:border-orange-200" },
  { icon: Heart,    title: "Student-First Approach",   description: "24/7 doubt support via WhatsApp, mentor availability, and regular parent-teacher meetings.",            color: "text-rose-600",  bg: "bg-rose-50",   border: "hover:border-rose-200" },
];

export function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="section-padding bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-40" />

      <div className="container-xl relative">
        <ScrollReveal className="text-center mb-14">
          <div className="section-tag mx-auto">
            <Trophy className="w-3.5 h-3.5" />
            Why Choose Xaurum Academy
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-[#0B0E17] mt-4">
            Built for{" "}
            <span className="text-gradient">Academic Excellence</span>
          </h2>
          <p className="mt-4 text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            We don&apos;t just teach — we transform students into achievers through a proven methodology that has produced hundreds of top rankers.
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5" staggerDelay={0.07}>
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={staggerItem}
              className={`card-premium p-6 group border border-[var(--border-card)] ${f.border}`}
            >
              <div className={`w-11 h-11 rounded-xl ${f.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <f.icon className={`w-5 h-5 ${f.color}`} />
              </div>
              <h3 className="text-sm font-bold font-display text-[#0B0E17] mb-2">{f.title}</h3>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </StaggerContainer>

        {/* Social proof strip */}
        <ScrollReveal delay={0.2} className="mt-12 text-center">
          <div className="inline-flex items-center gap-4 px-6 py-3.5 rounded-2xl bg-[#F8FAFB] border border-[var(--border)]">
            <div className="flex -space-x-2">
              {["A","B","R","S","M"].map((l, i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2563EB] to-[#0EA5E9] border-2 border-white flex items-center justify-center text-xs font-bold text-white">{l}</div>
              ))}
            </div>
            <span className="text-sm text-[var(--text-secondary)]">
              Join <span className="text-[var(--text-primary)] font-semibold">5,000+ students</span> already enrolled
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
