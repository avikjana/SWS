"use client";
import { motion } from "framer-motion";
import { Users, Linkedin, Mail, Twitter, Star } from "lucide-react";
import { ScrollReveal, StaggerContainer, staggerItem } from "@/components/animations/ScrollReveal";
import { BackToTop } from "@/components/ui/BackToTop";

const faculty = [
  {
    name: "Sutirtha Basumallick",
    designation: "Founder, HOD Mathematics & Science, Mentor",
    qualification: "Specialist in WBBSE Mathematics & Science Sections",
    experience: 15,
    subjects: ["Mathematics", "Physical Science", "Life Science", "Class 5 to 10 Board preparation"],
    bio: "Sutirtha Basumallick is the founder and lead instructor at Study With Sutirtha. With over 15 years of dedication, he has guided hundreds of students from Class 5 to Class 10 to master mathematical concepts and scientific principles. His unique interactive methods and student-first approach ensure every child achieves academic excellence.",
    achievements: [
      "Founded Study With Sutirtha Coaching Center in 2009",
      "Successfully mentored over 15 years of batches",
      "WBBSE Board Exam specialist",
      "Available 24/7 for student query support"
    ],
    isHead: true,
    avatarBg: "from-blue-600 to-indigo-700",
    socialLinks: { linkedin: "", email: "studywithsutirtha@gmail.com" },
  },
  {
    name: "Avik Jana",
    designation: "HOD Computer Science & Programming Mentor",
    qualification: "Specialist in Computer Programming & Coding",
    experience: 5,
    subjects: ["Computer Science", "Coding & Programming", "Logic & Algorithms", "Web Development Fundamentals"],
    bio: "Avik Jana is the lead Computer Science educator and programming mentor at Study With Sutirtha. He focuses on building strong logical reasoning, algorithmic thinking, and modern programming skills in students to prepare them for the digital-first future.",
    achievements: [
      "Designed and launched coding curriculum for students",
      "Specialist in logical problem solving & coding fundamentals",
      "Guided students in building interactive software projects",
      "Active technology mentor and consultant"
    ],
    isHead: false,
    avatarBg: "from-purple-600 to-indigo-700",
    socialLinks: { linkedin: "https://xaurum-lab.vercel.app/", email: "avikjana212@gmail.com" },
  }
];

export default function FacultyPage() {
  return (
    <>
      <main className="pt-20">
        {/* Hero */}
        <section className="section-padding-sm bg-[var(--bg-primary)] relative overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="container-xl relative text-center">
            <ScrollReveal>
              <div className="section-tag mx-auto">
                <Users className="w-3.5 h-3.5" />
                Our Faculty
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold font-display text-black mt-4">
                Meet Our{" "}
                <span className="bg-[#00F0FF] px-3 py-1 border-2 border-black inline-block transform -rotate-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">Faculty</span>
              </h1>
              <p className="mt-4 text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
                Learn from our expert educators specializing in Mathematics, Science, and Computer Programming.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Faculty Grid */}
        <section className="section-padding bg-[var(--bg-secondary)]">
          <div className="container-xl">
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center" staggerDelay={0.1}>
              {faculty.map((member) => (
                <motion.div
                  key={member.name}
                  variants={staggerItem}
                  className="card-premium border border-[var(--border)] hover:border-blue-500/30 overflow-hidden group w-full"
                >
                  <div className="p-6">
                    <div className="flex items-start gap-5 mb-5">
                      {/* Avatar */}
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${member.avatarBg} flex items-center justify-center text-white font-bold text-2xl flex-shrink-0 shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                        {member.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div className="flex-grow min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h2 className="font-bold font-display text-lg text-[var(--text-primary)]">{member.name}</h2>
                          {member.isHead && <span className="badge badge-blue text-xs">Mentor</span>}
                        </div>
                        <p className="text-sm text-blue-400 font-medium">{member.designation}</p>
                        <p className="text-xs text-[var(--text-muted)] mt-1">{member.qualification}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                          <span className="text-xs text-[var(--text-secondary)]">{member.experience}+ Years Experience</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">{member.bio}</p>

                    {/* Subjects */}
                    <div className="mb-4">
                      <p className="text-xs text-[var(--text-muted)] mb-2">Subjects</p>
                      <div className="flex flex-wrap gap-1.5">
                        {member.subjects.map((s) => (
                          <span key={s} className="badge badge-blue text-xs py-0.5">{s}</span>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    <div className="mb-4">
                      <p className="text-xs text-[var(--text-muted)] mb-2">Key Achievements</p>
                      <ul className="space-y-1">
                        {member.achievements.map((a) => (
                          <li key={a} className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center gap-2 pt-4 border-t border-[var(--border)]">
                      <a href={`mailto:${member.socialLinks.email}`} className="w-8 h-8 flex items-center justify-center rounded-lg glass text-[var(--text-muted)] hover:text-blue-400 transition-colors" aria-label="Email">
                        <Mail className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </StaggerContainer>

            {/* Parent Contact CTA */}
            <ScrollReveal delay={0.2} className="mt-16 text-center">
              <div className="card-premium p-10 border border-[var(--border)] max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold font-display text-[var(--text-primary)] mb-3">
                  Interested in Free Counseling or Enrollment?
                </h3>
                <p className="text-[var(--text-secondary)] mb-6">
                  Talk to Sutirtha Basumallick directly to understand batch availabilities, syllabus coverage, and customized online or offline plans for your child.
                </p>
                <a href="tel:+919064077914" className="btn-primary px-8 py-3.5 inline-flex items-center gap-2" id="faculty-contact-cta">
                  <Mail className="w-4 h-4" />
                  Get In Touch
                </a>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <BackToTop />
    </>
  );
}
