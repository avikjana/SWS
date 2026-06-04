"use client";
import { motion } from "framer-motion";
import { Users, Linkedin, Mail } from "lucide-react";
import { ScrollReveal, StaggerContainer, staggerItem } from "@/components/animations/ScrollReveal";

const faculty = [
  {
    name: "Sutirtha Basumallick",
    designation: "Mentor & Lead Instructor",
    qualification: "Mathematics & Science Specialist (WBBSE)",
    experience: "15+ Years",
    subjects: ["Mathematics Section", "Science Section"],
    avatarBg: "bg-blue-50 text-blue-600 border border-blue-100",
    isHead: true,
  }
];

export function FacultySection() {
  return (
    <section id="faculty" className="section-padding bg-[var(--bg-secondary)] relative overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-20" />

      <div className="container-xl relative">
        <ScrollReveal className="text-center mb-16">
          <div className="section-tag mx-auto">
            <Users className="w-3.5 h-3.5" />
            Expert Faculty
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-[var(--text-primary)] mt-4">
            Learn From the <span className="text-gradient">Best Minds</span>
          </h2>
          <p className="mt-4 text-lg text-[var(--text-secondary)] max-w-xl mx-auto">
            Learn from Sutirtha Basumallick, a dedicated educator committed to building deep concepts in Mathematics &amp; Science.
          </p>
        </ScrollReveal>

        <StaggerContainer className="flex justify-center" staggerDelay={0.1}>
          {faculty.map((member) => (
            <motion.div
              key={member.name}
              variants={staggerItem}
              className="card-premium p-8 text-center group border border-[var(--border-card)] hover:border-blue-500/30 relative max-w-md w-full"
            >
              {member.isHead && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="badge badge-blue whitespace-nowrap">Mentor</span>
                </div>
              )}

              {/* Avatar */}
              <div className={`w-24 h-24 rounded-2xl ${member.avatarBg} flex items-center justify-center font-bold text-3xl mx-auto mb-6 shadow-sm group-hover:scale-105 transition-transform duration-300`}>
                SB
              </div>

              <h3 className="font-bold font-display text-[var(--text-primary)] text-lg">{member.name}</h3>
              <p className="text-sm text-blue-600 font-semibold mt-1">{member.designation}</p>
              <p className="text-xs text-[var(--text-muted)] mt-1.5">{member.qualification}</p>
              <p className="text-xs text-[var(--text-secondary)] mt-1 font-medium">{member.experience} Teaching</p>

              <div className="flex flex-wrap gap-1.5 justify-center mt-4">
                {member.subjects.map((s) => (
                  <span key={s} className="badge badge-blue text-[11px] py-1 px-2.5">{s}</span>
                ))}
              </div>

              <div className="flex items-center justify-center gap-3 mt-6 pt-4 border-t border-[var(--border)]">
                <a href="mailto:studywithsutirtha@gmail.com" className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-100 hover:bg-blue-50 text-[var(--text-muted)] hover:text-blue-600 transition-colors" aria-label="Email">
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>

        <ScrollReveal delay={0.2} className="text-center mt-10">
          <a href="/faculty" className="btn-secondary px-8 py-3.5 inline-flex items-center gap-2" id="view-all-faculty-btn">
            Meet the Mentor
            <Users className="w-4 h-4" />
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
