"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, Clock, Users, CheckCircle, Star, ArrowRight, Sparkles } from "lucide-react";
import { ScrollReveal, StaggerContainer, staggerItem } from "@/components/animations/ScrollReveal";
import { BackToTop } from "@/components/ui/BackToTop";

const courses = [
  {
    id: "class-5-8",
    title: "Class 5 to Class 8 Foundation",
    subtitle: "Concept Building & School Exam Excellence",
    description: "Our Foundation program focuses on building core conceptual strength in Mathematics and Science sections. We cover the entire curriculum step-by-step to make learning engaging and preparatory for higher classes.",
    duration: "Ongoing",
    feesDisplay: "Contact for Pricing",
    icon: "📚",
    gradient: "from-green-500/20 to-emerald-500/10",
    borderColor: "hover:border-green-500/30",
    features: [
      "Maximum 3 to 4 classes in every week (Online/Offline)",
      "Free weekly and monthly exams",
      "Special Doubt Clearing Sessions",
      "All advanced notes on Google Classroom / Hard Copy",
      "Chapter Wise Test facility to track progress",
      "Offline Home Personal Tuition also available",
    ],
    subjects: ["Mathematics", "Physical Science", "Life Science"],
    batches: ["Weekday Batches", "Weekend Batches", "Flexible Timings"],
    badge: "Foundation Program",
    badgeClass: "badge-green",
    isPopular: false,
  },
  {
    id: "class-9-10",
    title: "Class 9 & Class 10 Board Prep",
    subtitle: "WBBSE Board Exam Masterclass",
    description: "Designed strictly around the WBBSE (West Bengal Board of Secondary Education) syllabus, focusing on Mathematics and Science. Our structured program ensures students are thoroughly prepared to excel in their board examinations.",
    duration: "1-2 Years",
    feesDisplay: "Contact for Pricing",
    icon: "⚗️",
    gradient: "from-blue-500/20 to-sky-500/10",
    borderColor: "hover:border-blue-500/30",
    features: [
      "Strict WBBSE syllabus focus (Mathematics & Science Sections only)",
      "Maximum 3 to 4 classes in every week (Online/Offline)",
      "Offline Home Personal Tuition available for customized speed",
      "Free Online and Offline Exams regularly",
      "Special Doubt Clearing Sessions by SUTIRTHA BASUMALLICK",
      "Advanced notes in both Soft Copy (Google Classroom) & Hard Copy",
      "Rigorous Chapter Wise Test facility",
    ],
    subjects: ["Mathematics", "Physical Science", "Life Science"],
    batches: ["Regular Batches", "Weekend Revision Batches", "Home Tuition Schedules"],
    badge: "WBBSE Program",
    badgeClass: "badge-blue",
    isPopular: true,
  },
  {
    id: "computer-science",
    title: "Computer Science & Programming",
    subtitle: "Coding, Logic, & Digital Literacy Foundation",
    description: "Introduction to computational thinking, programming basics (Python, Scratch, C/C++), and computer science fundamentals. Perfect for Class 5 to 10 students looking to build high-demand future tech skills.",
    duration: "Flexible / Yearly",
    feesDisplay: "Contact for Pricing",
    icon: "💻",
    gradient: "from-purple-500/20 to-indigo-500/10",
    borderColor: "hover:border-purple-500/30",
    features: [
      "Introduction to Python, Scratch, or C/C++ programming",
      "Logic building, algorithm fundamentals, & flowcharting",
      "Practical coding projects & interactive learning sessions",
      "Computer architecture basics, digital literacy, and theory",
      "Special doubt-clearing sessions and hands-on guidance",
      "Weekly computer lab practice (Online/Offline support)",
    ],
    subjects: ["Computational Logic", "Python Programming", "Scratch Coding", "Basic Computers"],
    batches: ["Weekend Batches", "After-School Sessions", "Online/Offline Practice"],
    badge: "Tech Program",
    badgeClass: "badge-purple",
    isPopular: false,
  }
];

export default function CoursesPage() {

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
              <h1 className="text-5xl md:text-6xl font-extrabold font-display text-black mt-4">
                Find Your Perfect{" "}
                <span className="bg-[#00F0FF] px-3 py-1 border-2 border-black inline-block transform -rotate-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">Course</span>
              </h1>
              <p className="mt-4 text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
                Tailored Mathematics &amp; Science coaching for Class 5 to Class 10 WBBSE sections. Online and offline modes available.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Courses */}
        <section className="section-padding bg-[var(--bg-secondary)]">
          <div className="container-xl space-y-10">
            {courses.map((course, i) => (
              <ScrollReveal key={course.id} delay={i * 0.05}>
                <div id={course.id} className={`card-premium border border-[var(--border)] ${course.borderColor} overflow-hidden`}>
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
                        <Link
                          href="/enroll"
                          className="btn-primary w-full justify-center flex items-center gap-1.5"
                          id={`enroll-${course.id}`}
                        >
                          <Sparkles className="w-4 h-4" />
                          Enroll Now
                        </Link>
                        <Link
                          href="/contact"
                          className="btn-secondary w-full justify-center mt-2 text-sm flex items-center gap-1.5"
                          id={`inquiry-${course.id}`}
                        >
                          Ask a Question
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>
      </main>

      <BackToTop />
    </>
  );
}
