"use client";
import { motion } from "framer-motion";
import { Users, Linkedin, Mail, Twitter, Star } from "lucide-react";
import { ScrollReveal, StaggerContainer, staggerItem } from "@/components/animations/ScrollReveal";
import { BackToTop } from "@/components/ui/BackToTop";

const faculty = [
  {
    name: "Dr. Rajesh Kumar",
    designation: "Director & Head of Physics",
    qualification: "Ph.D Physics, IIT Kharagpur | B.Tech IIT KGP",
    experience: 20,
    subjects: ["Physics", "JEE Advanced Physics", "Waves & Optics"],
    bio: "Dr. Rajesh Kumar is a Physics gold medalist from IIT Kharagpur with a Ph.D in Quantum Mechanics. He has authored 3 books on JEE Physics and has been a visiting faculty at IIT Dhanbad. Under his guidance, 100+ students have cracked JEE Advanced.",
    achievements: ["Physics Gold Medal, IIT KGP 2003", "Best Faculty Award 2018", "100+ JEE Advanced selections"],
    isHead: true,
    avatarBg: "from-blue-600 to-indigo-700",
    socialLinks: { linkedin: "#", email: "rajesh@studywithsutirtha.com" },
  },
  {
    name: "Prof. Sunita Sharma",
    designation: "Senior Faculty – Mathematics",
    qualification: "M.Sc Mathematics (Gold Medal), IIT Delhi",
    experience: 15,
    subjects: ["Mathematics", "Calculus", "Algebra", "Statistics"],
    bio: "Prof. Sunita Sharma is a Mathematics gold medalist from IIT Delhi who has dedicated 15 years to making math accessible and engaging. Her unique problem-solving frameworks have helped students achieve perfect 100 in Mathematics boards.",
    achievements: ["Mathematics Gold Medal, IIT Delhi 2008", "200+ students scored 100 in Math boards", "JEE Top Ranker mentor"],
    isHead: false,
    avatarBg: "from-purple-600 to-violet-700",
    socialLinks: { linkedin: "#", email: "sunita@studywithsutirtha.com" },
  },
  {
    name: "Dr. Amit Ghosh",
    designation: "Faculty – Chemistry",
    qualification: "Ph.D Organic Chemistry, Calcutta University",
    experience: 12,
    subjects: ["Organic Chemistry", "Physical Chemistry", "Inorganic Chemistry"],
    bio: "Dr. Amit Ghosh specializes in making complex Organic Chemistry simple. His mnemonics and reaction frameworks are legendary among students. He has 12+ years of experience and has helped 150+ students crack NEET Chemistry.",
    achievements: ["Ph.D in Organic Chemistry 2012", "150+ NEET Chemistry selections", "Authored 'Organic Chemistry Decoded'"],
    isHead: false,
    avatarBg: "from-green-600 to-emerald-700",
    socialLinks: { linkedin: "#", email: "amit@studywithsutirtha.com" },
  },
  {
    name: "Dr. Priya Das",
    designation: "Senior Faculty – Biology",
    qualification: "MBBS (AIIMS Delhi), M.D Medicine",
    experience: 10,
    subjects: ["Biology (Botany + Zoology)", "NEET Biology", "Human Physiology"],
    bio: "Dr. Priya Das completed her MBBS from AIIMS Delhi and M.D from JIPMER. She brings clinical insights into Biology teaching, making NEET preparation both comprehensive and practical. Her diagram techniques are widely popular.",
    achievements: ["MBBS from AIIMS Delhi", "100+ NEET qualifiers under mentorship", "NEET Biology specialist"],
    isHead: false,
    avatarBg: "from-rose-600 to-pink-700",
    socialLinks: { linkedin: "#", email: "priya@studywithsutirtha.com" },
  },
  {
    name: "Mr. Sourav Banerjee",
    designation: "Faculty – English & Communication",
    qualification: "M.A English Literature, Presidency University",
    experience: 8,
    subjects: ["English Language", "Grammar", "Reading Comprehension", "Essay Writing"],
    bio: "Mr. Sourav Banerjee is an English specialist with expertise in English Literature and Communication. His structured approach to grammar and writing has helped hundreds of students achieve 90%+ in English boards.",
    achievements: ["M.A English, Presidency University", "98% average in English boards", "Communication skills trainer"],
    isHead: false,
    avatarBg: "from-amber-600 to-yellow-600",
    socialLinks: { linkedin: "#", email: "sourav@studywithsutirtha.com" },
  },
  {
    name: "Ms. Tanya Roy",
    designation: "Faculty – Accountancy & Economics",
    qualification: "CA (AIR 45), M.Com Calcutta University",
    experience: 7,
    subjects: ["Accountancy", "Economics", "Business Studies", "CA Foundation"],
    bio: "Ms. Tanya Roy is a Chartered Accountant who cracked CA exams with All India Rank 45. She brings real-world financial expertise into the classroom, making Accountancy and Economics not just exam-ready but career-ready.",
    achievements: ["CA All India Rank 45", "95% average in Accountancy", "CA Foundation mentor"],
    isHead: false,
    avatarBg: "from-cyan-600 to-teal-700",
    socialLinks: { linkedin: "#", email: "tanya@studywithsutirtha.com" },
  },
  {
    name: "Mr. Arpit Gupta",
    designation: "Faculty – Computer Science & Programming",
    qualification: "B.Tech CSE, IIT Guwahati | Ex-Google Engineer",
    experience: 6,
    subjects: ["Python", "C++", "Data Structures", "Web Development"],
    bio: "Mr. Arpit Gupta is an IIT Guwahati alumnus and former Google Software Engineer. He founded the CS program at Study With Sutirtha to prepare students for FAANG-level careers. His teaching combines industry experience with academic rigor.",
    achievements: ["B.Tech IIT Guwahati", "Ex-Google Software Engineer", "Competitive programming coach"],
    isHead: false,
    avatarBg: "from-indigo-600 to-blue-700",
    socialLinks: { linkedin: "#", email: "arpit@studywithsutirtha.com", twitter: "#" },
  },
  {
    name: "Mr. Debashis Sen",
    designation: "Faculty – WBJEE Mathematics",
    qualification: "M.Sc Mathematics, Jadavpur University",
    experience: 9,
    subjects: ["WBJEE Mathematics", "Class 11-12 Mathematics", "Algebra"],
    bio: "Mr. Debashis Sen specializes in the WBJEE mathematics syllabus with a deep understanding of the exam pattern and state board requirements. His students consistently rank in the top 100 in WBJEE state rankings.",
    achievements: ["Top 100 WBJEE mentors in WB", "Average WBJEE Math score: 85+", "9 years WBJEE expertise"],
    isHead: false,
    avatarBg: "from-sky-600 to-cyan-700",
    socialLinks: { linkedin: "#", email: "debashis@studywithsutirtha.com" },
  },
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
              <h1 className="text-5xl md:text-6xl font-bold font-display text-[var(--text-primary)] mt-4">
                Meet Our{" "}
                <span className="text-gradient">Expert Team</span>
              </h1>
              <p className="mt-4 text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
                IIT & AIIMS alumni, PhD holders, and passionate educators with an average of 12+ years of teaching experience.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Faculty Grid */}
        <section className="section-padding bg-[var(--bg-secondary)]">
          <div className="container-xl">
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6" staggerDelay={0.1}>
              {faculty.map((member) => (
                <motion.div
                  key={member.name}
                  variants={staggerItem}
                  className="card-premium border border-[var(--border)] hover:border-blue-500/30 overflow-hidden group"
                >
                  <div className="p-6">
                    <div className="flex items-start gap-5 mb-5">
                      {/* Avatar */}
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${member.avatarBg} flex items-center justify-center text-white font-bold text-2xl flex-shrink-0 shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                        {member.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                      </div>
                      <div className="flex-grow min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h2 className="font-bold font-display text-lg text-[var(--text-primary)]">{member.name}</h2>
                          {member.isHead && <span className="badge badge-blue text-xs">Director</span>}
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
                      {member.socialLinks.linkedin && (
                        <a href={member.socialLinks.linkedin} className="w-8 h-8 flex items-center justify-center rounded-lg glass text-[var(--text-muted)] hover:text-blue-400 transition-colors" aria-label="LinkedIn">
                          <Linkedin className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {member.socialLinks.twitter && (
                        <a href={member.socialLinks.twitter} className="w-8 h-8 flex items-center justify-center rounded-lg glass text-[var(--text-muted)] hover:text-sky-400 transition-colors" aria-label="Twitter">
                          <Twitter className="w-3.5 h-3.5" />
                        </a>
                      )}
                      <a href={`mailto:${member.socialLinks.email}`} className="w-8 h-8 flex items-center justify-center rounded-lg glass text-[var(--text-muted)] hover:text-blue-400 transition-colors" aria-label="Email">
                        <Mail className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </StaggerContainer>

            {/* Join Team CTA */}
            <ScrollReveal delay={0.2} className="mt-16 text-center">
              <div className="card-premium p-10 border border-[var(--border)] max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold font-display text-[var(--text-primary)] mb-3">
                  Want to Join Our Faculty Team?
                </h3>
                <p className="text-[var(--text-secondary)] mb-6">
                  We are always looking for passionate educators who want to shape the next generation. If you have expertise in your subject and a love for teaching, we&apos;d love to hear from you.
                </p>
                <a href="mailto:careers@studywithsutirtha.com" className="btn-primary px-8 py-3.5 inline-flex items-center gap-2" id="faculty-careers-cta">
                  <Mail className="w-4 h-4" />
                  Apply to Teach
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
