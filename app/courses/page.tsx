"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Clock, Users, CheckCircle, Star, ArrowRight, Sparkles } from "lucide-react";
import { ScrollReveal, StaggerContainer, staggerItem } from "@/components/animations/ScrollReveal";
import { InquiryModal } from "@/features/InquiryModal";
import { BackToTop } from "@/components/ui/BackToTop";

const courses = [
  {
    id: "class-9-10",
    title: "Class 9-10 Foundation",
    subtitle: "Board Excellence & Competitive Readiness",
    description: "Build an unshakeable academic foundation with our Class 9-10 program. We cover the entire WBBSE/CBSE syllabus with additional competitive exam orientation to prepare students for the crucial Class 11-12 years.",
    duration: "1-2 Years",
    feesDisplay: "₹30,000/year",
    icon: "📚",
    gradient: "from-green-500/20 to-emerald-500/10",
    borderColor: "hover:border-green-500/30",
    features: [
      "Complete WBBSE/CBSE Class 9-10 Syllabus",
      "Mathematics & Science (Physics, Chemistry, Biology)",
      "English Language & Grammar",
      "Social Science & History",
      "Weekly Unit Tests",
      "Monthly Parent-Teacher Meeting",
      "Doubt Clearing Sessions (3x/week)",
      "Digital Study Material",
      "Board Exam Mock Tests",
    ],
    subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "English", "Social Science"],
    batches: ["Morning 7-9 AM", "Afternoon 2-4 PM", "Evening 5-7 PM"],
    badge: "Foundation Program",
    badgeClass: "badge-green",
    isPopular: false,
  },
  {
    id: "class-11-12-science",
    title: "Class 11-12 Science",
    subtitle: "PCM/PCB Board + JEE/NEET Foundation",
    description: "Our flagship Class 11-12 Science program offers dual-track preparation — achieving excellent board scores while simultaneously building a strong foundation for JEE and NEET. This comprehensive program is designed to help students excel in both arenas.",
    duration: "2 Years",
    feesDisplay: "₹55,000/year",
    icon: "⚗️",
    gradient: "from-blue-500/20 to-sky-500/10",
    borderColor: "hover:border-blue-500/30",
    features: [
      "PCM (Physics, Chemistry, Math) or PCB track",
      "WBCHSE/CBSE Board Exam preparation",
      "JEE Main & NEET foundation concepts",
      "Lab practicals and experiments",
      "Formula sheets & mind maps",
      "Chapter-wise tests & analysis",
      "12-hour weekly contact time",
      "Video lecture access",
      "Previous 10-year PYQs",
    ],
    subjects: ["Physics", "Chemistry", "Mathematics / Biology", "English"],
    batches: ["Morning 7-9:30 AM", "Afternoon 1-3:30 PM", "Weekend Batch"],
    badge: "Most Popular",
    badgeClass: "badge-blue",
    isPopular: true,
  },
  {
    id: "class-11-12-commerce",
    title: "Class 11-12 Commerce",
    subtitle: "Accounts, Economics & Business Excellence",
    description: "Master the commerce stream with our specialized Class 11-12 Commerce program. From Accountancy and Economics to Business Studies and Mathematics, we prepare students for board exams and CA Foundation simultaneously.",
    duration: "2 Years",
    feesDisplay: "₹40,000/year",
    icon: "📊",
    gradient: "from-purple-500/20 to-violet-500/10",
    borderColor: "hover:border-purple-500/30",
    features: [
      "Accountancy (Financial & Cost)",
      "Economics (Micro & Macro)",
      "Business Studies",
      "Mathematics for Commerce",
      "CA Foundation orientation",
      "Project & case study support",
      "Board exam mock tests",
      "Industry guest lectures",
    ],
    subjects: ["Accountancy", "Economics", "Business Studies", "Mathematics"],
    batches: ["Morning 8-10 AM", "Evening 5-7 PM"],
    badge: "Commerce",
    badgeClass: "badge-purple",
    isPopular: false,
  },
  {
    id: "jee",
    title: "JEE Main & Advanced",
    subtitle: "IIT & NIT Engineering Entrance Preparation",
    description: "Comprehensive IIT JEE preparation by IIT alumni faculty. Our intensive program covers every topic with depth and precision, using proven problem-solving methodologies that have produced 200+ IIT selections and 300+ NIT admissions.",
    duration: "1-2 Years",
    feesDisplay: "₹75,000/year",
    icon: "🎯",
    gradient: "from-orange-500/20 to-amber-500/10",
    borderColor: "hover:border-orange-500/30",
    features: [
      "Complete JEE Main & Advanced Syllabus",
      "IIT Alumni faculty for all subjects",
      "Advanced PCM problem solving",
      "Weekly Full Syllabus Mock Tests",
      "JEE pattern-based practice",
      "3500+ Practice Problems",
      "Topic-wise rank analysis",
      "1-on-1 doubt sessions",
      "JEE Advanced special modules",
    ],
    subjects: ["Physics", "Chemistry", "Mathematics"],
    batches: ["Morning 6:30-9:30 AM", "Afternoon 12-3 PM"],
    badge: "IIT JEE",
    badgeClass: "bg-orange-500/15 text-orange-400 border-orange-500/25",
    isPopular: true,
  },
  {
    id: "neet",
    title: "NEET Preparation",
    subtitle: "Medical Entrance – AIIMS, Government & Private Colleges",
    description: "Crack NEET with our specialized program designed by AIIMS alumni. We provide NCERT-focused preparation with advanced biology, chemistry, and physics modules that align perfectly with NEET's exam pattern and difficulty level.",
    duration: "1-2 Years",
    feesDisplay: "₹70,000/year",
    icon: "🏥",
    gradient: "from-red-500/20 to-rose-500/10",
    borderColor: "hover:border-red-500/30",
    features: [
      "NCERT-focused PCB preparation",
      "Biology (Botany + Zoology) deep dive",
      "AIIMS faculty for all subjects",
      "NEET pattern mock tests",
      "1000+ NEET PYQ bank (1988-2024)",
      "Diagram and assertion practice",
      "Medical counseling guidance",
      "Monthly All-India test series",
      "NEET biology special classes",
    ],
    subjects: ["Biology", "Physics", "Chemistry"],
    batches: ["Morning 7-9:30 AM", "Evening 4:30-7 PM"],
    badge: "Medical",
    badgeClass: "bg-red-500/15 text-red-400 border-red-500/25",
    isPopular: true,
  },
  {
    id: "wbjee",
    title: "WBJEE Preparation",
    subtitle: "West Bengal Joint Engineering Entrance",
    description: "State-specific WBJEE preparation with deep focus on the West Bengal exam pattern and syllabus nuances. Our students consistently achieve top state ranks and secure admissions to premier colleges like Jadavpur University.",
    duration: "1 Year",
    feesDisplay: "₹45,000/year",
    icon: "🏆",
    gradient: "from-indigo-500/20 to-blue-500/10",
    borderColor: "hover:border-indigo-500/30",
    features: [
      "WBJEE-specific PCM syllabus",
      "WB state board alignment",
      "Previous 15-year WBJEE PYQs",
      "State rank prediction tests",
      "Jadavpur/MAKAUT admission guidance",
      "Weekly sectional mock tests",
      "College selection counseling",
      "Cut-off trend analysis",
    ],
    subjects: ["Mathematics", "Physics", "Chemistry"],
    batches: ["Morning 8-10:30 AM", "Evening 5:30-8 PM"],
    badge: "WBJEE",
    badgeClass: "bg-indigo-500/15 text-indigo-400 border-indigo-500/25",
    isPopular: false,
  },
  {
    id: "cs",
    title: "Computer Science & Programming",
    subtitle: "Coding, Development & Competitive Programming",
    description: "Our technology track prepares students for the digital future. From programming fundamentals to advanced data structures and web development — we offer industry-relevant courses taught by software engineers.",
    duration: "6 Months – 1 Year",
    feesDisplay: "₹35,000/course",
    icon: "💻",
    gradient: "from-cyan-500/20 to-teal-500/10",
    borderColor: "hover:border-cyan-500/30",
    features: [
      "Python & C++ from scratch",
      "Data Structures & Algorithms",
      "Web Development (HTML/CSS/JS/React)",
      "Database Management (SQL)",
      "Competitive Programming (Codeforces, LeetCode)",
      "Real project building",
      "GitHub & version control",
      "Interview preparation",
    ],
    subjects: ["Python", "C++", "Web Development", "DSA", "DBMS"],
    batches: ["Weekday Evenings 6-8 PM", "Weekend Batch"],
    badge: "Tech",
    badgeClass: "bg-cyan-500/15 text-cyan-400 border-cyan-500/25",
    isPopular: false,
  },
];

export default function CoursesPage() {
  const [selectedCourse, setSelectedCourse] = useState<typeof courses[0] | null>(null);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <main className="pt-20">
        {/* Hero */}
        <section className="section-padding-sm bg-[var(--bg-primary)] relative overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="container-xl relative text-center">
            <ScrollReveal>
              <div className="section-tag mx-auto">
                <BookOpen className="w-3.5 h-3.5" />
                Our Courses
              </div>
              <h1 className="text-5xl md:text-6xl font-bold font-display text-[var(--text-primary)] mt-4">
                Find Your Perfect{" "}
                <span className="text-gradient">Course</span>
              </h1>
              <p className="mt-4 text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
                From Class 9 foundations to JEE Advanced preparation — we have tailored programs for every student&apos;s journey.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Courses */}
        <section className="section-padding bg-[var(--bg-secondary)]">
          <div className="container-xl space-y-10">
            {courses.map((course, i) => (
              <ScrollReveal key={course.id} delay={i * 0.05} id={course.id}>
                <div className={`card-premium border border-[var(--border)] ${course.borderColor} overflow-hidden`}>
                  <div className="grid md:grid-cols-3 gap-0">
                    {/* Left: Course Info */}
                    <div className={`md:col-span-2 p-8 bg-gradient-to-br ${course.gradient}`}>
                      <div className="flex items-start gap-4 mb-6">
                        <div className="text-4xl flex-shrink-0">{course.icon}</div>
                        <div className="flex-grow">
                          <div className="flex items-center gap-3 flex-wrap mb-2">
                            <span className={`badge ${course.badgeClass} text-xs`}>{course.badge}</span>
                            {course.isPopular && (
                              <span className="badge bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-300 border-blue-500/30 text-xs">
                                <Star className="w-3 h-3 fill-current" /> Popular
                              </span>
                            )}
                          </div>
                          <h2 className="text-2xl font-bold font-display text-[var(--text-primary)]">{course.title}</h2>
                          <p className="text-sm text-blue-400 font-medium">{course.subtitle}</p>
                        </div>
                      </div>

                      <p className="text-[var(--text-secondary)] leading-relaxed mb-6">{course.description}</p>

                      {/* Features Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {course.features.map((f) => (
                          <div key={f} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                            {f}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right: Pricing & Action */}
                    <div className="p-8 border-t md:border-t-0 md:border-l border-[var(--border)] flex flex-col">
                      <div className="flex items-center gap-3 mb-4">
                        <Clock className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-[var(--text-secondary)]">Duration: {course.duration}</span>
                      </div>
                      <div className="flex items-center gap-3 mb-4">
                        <Users className="w-4 h-4 text-purple-400" />
                        <span className="text-sm text-[var(--text-secondary)]">Small batch (max 30)</span>
                      </div>

                      <div className="mb-4">
                        <p className="text-xs text-[var(--text-muted)] mb-1">Subjects</p>
                        <div className="flex flex-wrap gap-1.5">
                          {course.subjects.map((s) => (
                            <span key={s} className="badge badge-blue text-xs py-0.5">{s}</span>
                          ))}
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-xs text-[var(--text-muted)] mb-1">Available Batches</p>
                        <ul className="space-y-1">
                          {course.batches.map((b) => (
                            <li key={b} className="text-sm text-[var(--text-secondary)] flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                              {b}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-auto pt-6 border-t border-[var(--border)]">
                        <p className="text-xs text-[var(--text-muted)]">Starting from</p>
                        <p className="text-2xl font-bold font-display text-gradient-blue mb-4">{course.feesDisplay}</p>
                        <button
                          onClick={() => { setSelectedCourse(course); setShowModal(true); }}
                          className="btn-primary w-full justify-center"
                          id={`enroll-${course.id}`}
                        >
                          <Sparkles className="w-4 h-4" />
                          Enroll Now
                        </button>
                        <button
                          onClick={() => { setSelectedCourse(course); setShowModal(true); }}
                          className="btn-secondary w-full justify-center mt-2 text-sm"
                          id={`inquiry-${course.id}`}
                        >
                          Ask a Question
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>
      </main>

      <InquiryModal
        isOpen={showModal}
        onClose={() => { setShowModal(false); setSelectedCourse(null); }}
        course={selectedCourse as any}
      />
      <BackToTop />
    </>
  );
}
