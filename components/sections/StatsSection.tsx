"use client";
import { AnimatedCounter } from "@/features/Counter";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { TrendingUp } from "lucide-react";

const stats = [
  { end: 5000, suffix: "+", label: "Students Enrolled",       description: "Across all courses and batches" },
  { end: 98,   suffix: "%", label: "Board Exam Success Rate", description: "Students clearing 90%+ in boards" },
  { end: 500,  suffix: "+", label: "JEE/NEET Qualifiers",    description: "In the last 5 years alone" },
  { end: 15,   suffix: "+", label: "Years of Excellence",     description: "Trusted since 2009" },
  { end: 47,   suffix: "",  label: "Expert Faculty Members",  description: "IIT, AIIMS & top university alumni" },
  { end: 250,  suffix: "+", label: "WBJEE Qualifiers",        description: "Top ranks across West Bengal" },
];

export function StatsSection() {
  return (
    <section id="statistics" className="section-padding bg-[#0B0E17] relative overflow-hidden">
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      {/* Top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />

      <div className="container-xl relative">
        <ScrollReveal className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/12 text-sm font-semibold text-blue-300 mb-4">
            <TrendingUp className="w-3.5 h-3.5" />
            Our Numbers Speak
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-white mt-2">
            Success That{" "}
            <span className="text-gradient">Inspires</span>
          </h2>
          <p className="mt-4 text-lg text-slate-400 max-w-xl mx-auto">
            Every number represents a student&apos;s dream fulfilled.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.09}
              className="p-8 text-center rounded-2xl border border-white/8 bg-white/4 hover:bg-white/6 hover:border-blue-500/30 transition-all duration-300"
            >
              <div className="text-4xl md:text-5xl font-bold font-display text-white mb-2">
                <AnimatedCounter end={stat.end} suffix={stat.suffix} label="" duration={2000} className="!text-white" />
              </div>
              <p className="text-sm font-semibold text-slate-300 mt-1">{stat.label}</p>
              <p className="text-xs text-slate-500 mt-1">{stat.description}</p>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA Banner */}
        <ScrollReveal delay={0.3} className="mt-14">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-[#2563EB]/20 via-[#1d4ed8]/10 to-[#2563EB]/20 p-10 text-center">
            <p className="text-2xl md:text-3xl font-bold font-display text-white mb-3">
              Ready to become our next <span className="text-gradient">success story</span>?
            </p>
            <p className="text-slate-400 mb-7">Seats are limited. Secure your spot today.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="/contact" className="btn-primary px-8 py-3.5 shadow-lg" id="stats-enroll-cta">Enroll Today</a>
              <a href="tel:+919800000000" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/8 transition-all" id="stats-call-cta">
                Call: +91 98000 00000
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
