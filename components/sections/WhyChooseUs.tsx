"use client";
import { motion } from "framer-motion";
import { Trophy, Users, Brain, Clock, BookOpen, Shield, Zap, Heart } from "lucide-react";
import { ScrollReveal, StaggerContainer, staggerItem } from "@/components/animations/ScrollReveal";

const features = [
  { icon: Trophy,   title: "Mathematics & Science",    description: "Highly focused conceptual coaching tailored specifically for Mathematics & Science sections (WBBSE).", cardBg: "bg-[#00F0FF]", textClass: "text-black" },
  { icon: Brain,    title: "Expert Mentor Support",    description: "Personal mentoring by SUTIRTHA BASUMALLICK. Regular doubt-clearing sessions to build concepts.", cardBg: "bg-[#D2FF00]", textClass: "text-black" },
  { icon: BookOpen, title: "Comprehensive Notes",     description: "All advanced notes provided via Google Classroom groups (Soft Copy) and Hard Copy format.", cardBg: "bg-[#FF007A]", textClass: "text-white" },
  { icon: Clock,    title: "Home Personal Tuition",   description: "Offline Home Personal Tuition is also available with us for customized learning pace.", cardBg: "bg-white", textClass: "text-black" },
  { icon: Users,    title: "Online & Offline Exams",  description: "Regular free mock exams conducted in both online and offline formats to track progress.", cardBg: "bg-white", textClass: "text-black" },
  { icon: Zap,      title: "Chapter Wise Tests",      description: "Frequent chapter-wise test facilities to ensure complete mastery of each topic before moving ahead.", cardBg: "bg-[#E6F5EC]", textClass: "text-black" },
  { icon: Shield,   title: "WBBSE Orientation",       description: "Custom curriculum designed exactly around the WBBSE syllabus for Class 5 to Class 10.", cardBg: "bg-[#FF6B00]", textClass: "text-white" },
  { icon: Heart,    title: "Always Available 24 Hours",description: "We are always available 24 hours for you. Ask doubts and get support anytime you need.", cardBg: "bg-white", textClass: "text-black" },
];

export function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="section-padding bg-[var(--bg-primary)] border-b-2 border-black relative overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-20" />

      <div className="container-xl relative">
        <ScrollReveal className="text-center mb-14">
          <div className="section-tag mx-auto">
            <Trophy className="w-3.5 h-3.5" />
            Why Choose Study With Sutirtha
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
              Unlock academic success with expert conceptual coaching
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
