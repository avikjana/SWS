"use client";
import { motion } from "framer-motion";
import { Users, Linkedin, Mail } from "lucide-react";
import { ScrollReveal, StaggerContainer, staggerItem } from "@/components/animations/ScrollReveal";

const faculty = [
  {
    name: "Dr. Rajesh Kumar",
    designation: "Director & HOD Physics",
    qualification: "Ph.D Physics, IIT Kharagpur",
    experience: "20+ Years",
    subjects: ["Physics", "JEE Advanced"],
    avatarBg: "bg-blue-50 text-blue-600 border border-blue-100",
    isHead: true,
  },
  {
    name: "Prof. Sunita Sharma",
    designation: "Senior Faculty – Mathematics",
    qualification: "M.Sc Mathematics, IIT Delhi",
    experience: "15+ Years",
    subjects: ["Mathematics", "JEE Main"],
    avatarBg: "bg-purple-50 text-purple-600 border border-purple-100",
    isHead: false,
  },
  {
    name: "Dr. Amit Ghosh",
    designation: "Faculty – Chemistry",
    qualification: "Ph.D Organic Chemistry, Calcutta University",
    experience: "12+ Years",
    subjects: ["Chemistry", "NEET"],
    avatarBg: "bg-emerald-50 text-emerald-600 border border-emerald-100",
    isHead: false,
  },
  {
    name: "Dr. Priya Das",
    designation: "Senior Faculty – Biology",
    qualification: "MBBS, AIIMS Delhi",
    experience: "10+ Years",
    subjects: ["Biology", "NEET"],
    avatarBg: "bg-rose-50 text-rose-600 border border-rose-100",
    isHead: false,
  },
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
            Learn From the{" "}
            <span className="text-gradient">Best Minds</span>
          </h2>
          <p className="mt-4 text-lg text-[var(--text-secondary)] max-w-xl mx-auto">
            Our faculty team comprises IIT & AIIMS alumni, PhD holders, and experienced educators dedicated to your success.
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
          {faculty.map((member) => (
            <motion.div
              key={member.name}
              variants={staggerItem}
              className="card-premium p-6 text-center group border border-[var(--border-card)] hover:border-blue-500/30 relative"
            >
              {member.isHead && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="badge badge-blue whitespace-nowrap">Director</span>
                </div>
              )}

              {/* Avatar */}
              <div className={`w-20 h-20 rounded-2xl ${member.avatarBg} flex items-center justify-center font-bold text-2xl mx-auto mb-4 shadow-sm group-hover:scale-105 transition-transform duration-300`}>
                {member.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
              </div>

              <h3 className="font-bold font-display text-[var(--text-primary)] text-base">{member.name}</h3>
              <p className="text-xs text-blue-600 font-semibold mt-1">{member.designation}</p>
              <p className="text-xs text-[var(--text-muted)] mt-1">{member.qualification}</p>
              <p className="text-xs text-[var(--text-secondary)] mt-1 font-medium">{member.experience} Teaching</p>

              <div className="flex flex-wrap gap-1.5 justify-center mt-3">
                {member.subjects.map((s) => (
                  <span key={s} className="badge badge-blue text-[10px] py-0.5">{s}</span>
                ))}
              </div>

              <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-[var(--border)]">
                <a href="#" className="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-100 hover:bg-blue-50 text-[var(--text-muted)] hover:text-blue-600 transition-colors" aria-label="LinkedIn">
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
                <a href="#" className="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-100 hover:bg-blue-50 text-[var(--text-muted)] hover:text-blue-600 transition-colors" aria-label="Email">
                  <Mail className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>

        <ScrollReveal delay={0.2} className="text-center mt-10">
          <a href="/faculty" className="btn-secondary px-8 py-3.5 inline-flex items-center gap-2" id="view-all-faculty-btn">
            Meet All Faculty Members
            <Users className="w-4 h-4" />
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
