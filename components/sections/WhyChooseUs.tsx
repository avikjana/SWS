"use client";
import { motion } from "framer-motion";
import { Trophy, Users, Brain, Clock, BookOpen, Shield, Zap, Heart } from "lucide-react";
import { ScrollReveal, StaggerContainer, staggerItem } from "@/components/animations/ScrollReveal";

const features = [
  { icon: Trophy,   title: "Proven Track Record",     description: "500+ JEE/NEET/WBJEE qualifiers every year. 98% board exam success rate.", cardBg: "bg-[#00F0FF]", textClass: "text-black" },
  { icon: Brain,    title: "Expert IIT/AIIMS Faculty", description: "Learn from IIT & AIIMS alumni with 10+ years of experience and deep subject expertise.",     cardBg: "bg-[#D2FF00]", textClass: "text-black" },
  { icon: BookOpen, title: "Comprehensive Material",   description: "Curated notes, practice sheets, mock tests, and chapter-wise PYQ banks (1990-2024).",         cardBg: "bg-[#FF007A]", textClass: "text-white" },
  { icon: Clock,    title: "Flexible Batch Timings",   description: "Morning, afternoon, and evening batches. Weekend batches also available.",       cardBg: "bg-white", textClass: "text-black" },
  { icon: Users,    title: "Small Batch Sizes",        description: "Limited batch sizes ensure personalized attention, doubt sessions, and mentoring.", cardBg: "bg-white", textClass: "text-black" },
  { icon: Zap,      title: "Weekly Tests & Analysis",  description: "Structured weekly tests with detailed performance analysis to identify weak areas.",  cardBg: "bg-[#E6F5EC]", textClass: "text-black" },
  { icon: Shield,   title: "Money-Back Guarantee",     description: "If not satisfied within the first month, get a full fee refund — no questions asked.",           cardBg: "bg-[#FF6B00]", textClass: "text-white" },
  { icon: Heart,    title: "Student-First Approach",   description: "24/7 doubt support via WhatsApp, mentor availability, and regular parent meetings.",            cardBg: "bg-white", textClass: "text-black" },
];

export function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="section-padding bg-[var(--bg-primary)] border-b-2 border-black relative overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-20" />

      <div className="container-xl relative">
        <ScrollReveal className="text-center mb-14">
          <div className="section-tag mx-auto">
            <Trophy className="w-3.5 h-3.5" />
            Why Choose Xaurum Academy
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold font-display text-black mt-4">
            Built for{" "}
            <span className="bg-[#00F0FF] px-2 py-0.5 border-2 border-black inline-block transform rotate-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              Academic Excellence
            </span>
          </h2>
          <p className="mt-4 text-lg text-[var(--text-secondary)] font-medium max-w-2xl mx-auto">
            We don&apos;t just teach — we transform students into achievers through a proven methodology that has produced hundreds of top rankers.
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.07}>
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={staggerItem}
              className={`card-premium p-6 group border-2 border-black ${f.cardBg} ${f.textClass} flex flex-col`}
            >
              <div className="w-12 h-12 rounded-xl bg-white border-2 border-black flex items-center justify-center mb-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:scale-105 transition-transform duration-300">
                <f.icon className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-base font-extrabold font-display mb-2">{f.title}</h3>
              <p className={`text-sm leading-relaxed ${f.textClass === "text-white" ? "text-white/90" : "text-black/80"}`}>{f.description}</p>
            </motion.div>
          ))}
        </StaggerContainer>

        {/* Social proof strip */}
        <ScrollReveal delay={0.2} className="mt-14 text-center">
          <div className="inline-flex items-center gap-4 px-6 py-3.5 rounded-2xl bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex -space-x-2">
              {["A","B","R","S","M"].map((l, i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-[#D2FF00] border-2 border-black flex items-center justify-center text-xs font-black text-black">{l}</div>
              ))}
            </div>
            <span className="text-sm font-extrabold text-black">
              Join <span className="underline decoration-2">5,000+ students</span> already enrolled
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
