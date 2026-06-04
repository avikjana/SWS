import type { Metadata } from "next";
import { ScrollReveal, StaggerContainer, staggerItem } from "@/components/animations/ScrollReveal";
import { motion } from "framer-motion";
import { Target, Eye, Award, GraduationCap, MapPin, Phone, Users } from "lucide-react";
import { BackToTop } from "@/components/ui/BackToTop";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Xaurum Academy's 15-year journey of educational excellence. Discover our mission, vision, infrastructure, and dedicated faculty team.",
};

const milestones = [
  { year: "2009", title: "Founded", desc: "Xaurum Academy started with just 20 students and 3 faculty members." },
  { year: "2012", title: "First JEE Topper", desc: "Our first student cracked JEE Advanced, AIR 450." },
  { year: "2015", title: "Expanded Campus", desc: "Moved to our current state-of-the-art 8000 sq.ft campus." },
  { year: "2018", title: "1000+ Alumni", desc: "Crossed the milestone of 1000 successful alumni." },
  { year: "2021", title: "Online Programs", desc: "Launched hybrid online-offline learning during the pandemic." },
  { year: "2024", title: "5000+ Students", desc: "Enrolled over 5000 students with 98% board exam success rate." },
];

const infrastructure = [
  { icon: "🏛️", title: "8000 sq.ft Modern Campus", desc: "Spacious, well-lit classrooms with ergonomic seating" },
  { icon: "🖥️", title: "Digital Smart Boards", desc: "All classrooms equipped with interactive digital boards" },
  { icon: "📚", title: "Resource Library", desc: "10,000+ books, journals, and study materials" },
  { icon: "🔬", title: "Science Labs", desc: "Fully equipped Chemistry and Physics lab for hands-on learning" },
  { icon: "💻", title: "Computer Lab", desc: "50-seat computer lab for programming and online tests" },
  { icon: "🎯", title: "Test Hall", desc: "Dedicated exam hall for mock tests in real exam conditions" },
];

export default function AboutPage() {
  return (
    <>
      <main className="pt-20">
        {/* Hero */}
        <section className="section-padding relative overflow-hidden bg-[var(--bg-primary)]">
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />

          <div className="container-xl relative text-center">
            <ScrollReveal>
              <div className="section-tag mx-auto mb-4">
                <GraduationCap className="w-3.5 h-3.5" />
                Our Story
              </div>
              <h1 className="text-5xl md:text-6xl font-bold font-display text-[var(--text-primary)] mb-6">
                About{" "}
                <span className="text-gradient">Xaurum Academy</span>
              </h1>
              <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed">
                For over 15 years, Xaurum Academy has been the cornerstone of academic excellence in West Bengal.
                Founded in 2009 with a simple mission — <strong className="text-[var(--text-primary)]">make world-class education accessible to every student</strong> —
                we have grown from a small tutoring center to one of the most trusted coaching institutions in the region.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="section-padding bg-[var(--bg-secondary)] relative overflow-hidden">
          <div className="absolute inset-0 bg-dots opacity-20" />
          <div className="container-xl relative grid md:grid-cols-2 gap-8">
            <ScrollReveal direction="left" className="card-premium p-8 border border-[var(--border)] hover:border-blue-500/30">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-sky-500/10 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold font-display text-[var(--text-primary)] mb-4">Our Mission</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                To provide exceptional coaching that empowers every student to achieve their academic dreams through innovative teaching methods, personalized mentoring, and a supportive learning environment.
                We believe every student has the potential to excel — our job is to unlock it.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="right" className="card-premium p-8 border border-[var(--border)] hover:border-purple-500/30">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-violet-500/10 flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold font-display text-[var(--text-primary)] mb-4">Our Vision</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                To become India&apos;s most trusted coaching institution by creating the next generation of doctors, engineers, scientists, and leaders.
                We envision a future where every Xaurum Academy student not only achieves excellent results but also develops as a well-rounded individual.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Timeline */}
        <section className="section-padding bg-[var(--bg-primary)] relative">
          <div className="container-xl">
            <ScrollReveal className="text-center mb-12">
              <div className="section-tag mx-auto">
                <Award className="w-3.5 h-3.5" />
                Our Journey
              </div>
              <h2 className="text-4xl font-bold font-display text-[var(--text-primary)] mt-4">
                15 Years of <span className="text-gradient">Excellence</span>
              </h2>
            </ScrollReveal>

            <div className="relative max-w-3xl mx-auto">
              {/* Center line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 to-purple-500/50 -translate-x-1/2" />

              <div className="space-y-8">
                {milestones.map((m, i) => (
                  <ScrollReveal key={m.year} delay={i * 0.1} direction={i % 2 === 0 ? "left" : "right"}>
                    <div className={`flex items-center gap-8 ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                      <div className={`flex-1 ${i % 2 === 0 ? "text-right" : "text-left"}`}>
                        <div className="card-premium p-5 border border-[var(--border)] hover:border-blue-500/30 inline-block w-full">
                          <div className="text-xl font-bold font-display text-gradient-blue">{m.year}</div>
                          <h3 className="font-semibold text-[var(--text-primary)] mt-1">{m.title}</h3>
                          <p className="text-sm text-[var(--text-secondary)] mt-1">{m.desc}</p>
                        </div>
                      </div>
                      <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex-shrink-0 shadow-glow relative z-10" />
                      <div className="flex-1" />
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Infrastructure */}
        <section className="section-padding bg-[var(--bg-secondary)]">
          <div className="container-xl">
            <ScrollReveal className="text-center mb-12">
              <div className="section-tag mx-auto">🏛️ Infrastructure</div>
              <h2 className="text-4xl font-bold font-display text-[var(--text-primary)] mt-4">
                State-of-the-Art <span className="text-gradient-blue">Facilities</span>
              </h2>
            </ScrollReveal>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.08}>
              {infrastructure.map((item) => (
                <motion.div key={item.title} variants={staggerItem} className="card-premium p-6 border border-[var(--border)] hover:border-blue-500/30 group">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">{item.icon}</div>
                  <h3 className="font-bold font-display text-[var(--text-primary)] mb-2">{item.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">{item.desc}</p>
                </motion.div>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Location */}
        <section className="section-padding bg-[var(--bg-primary)]">
          <div className="container-xl">
            <ScrollReveal className="text-center mb-12">
              <div className="section-tag mx-auto">
                <MapPin className="w-3.5 h-3.5" />
                Find Us
              </div>
              <h2 className="text-4xl font-bold font-display text-[var(--text-primary)] mt-4">
                Visit Our <span className="text-gradient-blue">Campus</span>
              </h2>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <ScrollReveal direction="left">
                <div className="card-premium p-8 border border-[var(--border)] space-y-4">
                  <h3 className="text-xl font-bold font-display text-[var(--text-primary)]">Xaurum Academy</h3>
                  <div className="flex items-start gap-3 text-[var(--text-secondary)]">
                    <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <p>123, Education Hub, Near City College,<br />Kolkata, West Bengal – 700001</p>
                  </div>
                  <div className="flex items-center gap-3 text-[var(--text-secondary)]">
                    <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                    <a href="tel:+919800000000" className="hover:text-blue-400 transition-colors">+91 98000 00000</a>
                  </div>
                  <div className="flex items-center gap-3 text-[var(--text-secondary)]">
                    <Users className="w-5 h-5 text-blue-400 flex-shrink-0" />
                    <span>Mon – Sat: 9:00 AM – 7:00 PM</span>
                  </div>
                  <a href="/contact" className="btn-primary w-full justify-center mt-4" id="about-contact-cta">
                    Book a Campus Visit
                  </a>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="right">
                <div className="rounded-2xl overflow-hidden border border-[var(--border)] h-80 bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center">
                  <div className="text-center text-[var(--text-muted)]">
                    <MapPin className="w-16 h-16 mx-auto mb-4 text-blue-400" />
                    <p className="font-medium text-[var(--text-secondary)]">Google Maps Embed</p>
                    <p className="text-sm mt-1">Configure with your Google Maps API key</p>
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
