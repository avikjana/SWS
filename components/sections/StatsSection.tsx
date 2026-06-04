"use client";
import Link from "next/link";
import { AnimatedCounter } from "@/features/Counter";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { TrendingUp } from "lucide-react";

const stats = [
  { end: 15,   suffix: "+", label: "Years of Trust",          description: "Providing quality education since 2009" },
  { end: 98,   suffix: "%", label: "WBBSE Success Rate",      description: "Students achieving high marks in math & science" },
  { end: 100,  suffix: "%", label: "WBBSE Curriculum Align",  description: "Fully aligned with WBBSE syllabus standards" },
  { end: 4,    suffix: "/wk", label: "Classes Per Week",      description: "Maximum 3 to 4 classes in every week" },
  { end: 24,   suffix: " hrs", label: "Mentor Availability",  description: "Always available 24 hours for you" },
  { end: 1,    suffix: " on 1", label: "Doubt Support",       description: "Special doubt clearing sessions" },
];

export function StatsSection() {
  return (
    <section id="statistics" className="section-padding bg-[#0B0E17] border-b-2 border-black relative overflow-hidden">
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      <div className="container-xl relative">
        <ScrollReveal className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border-2 border-slate-700 text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">
            <TrendingUp className="w-3.5 h-3.5" />
            Our Numbers Speak
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold font-display text-white mt-2">
            Success That{" "}
            <span className="text-[#00F0FF] underline decoration-4 decoration-[#FF007A]">Inspires</span>
          </h2>
          <p className="mt-4 text-lg text-slate-400 max-w-xl mx-auto font-medium">
            Every number represents a student&apos;s dream fulfilled.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.09}
              className="p-8 text-center rounded-2xl border-2 border-black bg-white/5 shadow-[4px_4px_0px_0px_rgba(0,240,255,1)] hover:translate-y-[-2px] transition-all duration-200"
            >
              <div className="text-4xl md:text-5xl font-extrabold font-display text-[#D2FF00] mb-2">
                <AnimatedCounter end={stat.end} suffix={stat.suffix} label="" duration={2000} className="!text-[#D2FF00]" />
              </div>
              <p className="text-sm font-extrabold text-white mt-1 uppercase tracking-wider">{stat.label}</p>
              <p className="text-xs text-slate-400 mt-1">{stat.description}</p>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA Banner */}
        <ScrollReveal delay={0.3} className="mt-16">
          <div className="rounded-3xl border-2 border-black bg-[#2563EB] p-10 text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
            <div className="absolute inset-0 bg-grid opacity-10" />
            <div className="relative z-10">
              <p className="text-2xl md:text-4xl font-extrabold font-display text-white mb-3 uppercase tracking-tight">
                Ready to become our next <span className="text-[#D2FF00]">success story</span>?
              </p>
              <p className="text-white/80 font-semibold mb-8 max-w-md mx-auto">Start your preparation today. Contact us for any offline or online coaching inquiry.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/enroll" className="btn-primary text-base px-8 py-4" id="stats-enroll-cta">Enroll Today</Link>
                <a href="tel:+919064077914" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border-2 border-white text-white font-extrabold hover:bg-white/10 active:translate-y-[1px] transition-all" id="stats-call-cta">
                  Call: +91 90640 77914
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
