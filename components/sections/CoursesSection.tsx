"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, Clock, Users, ArrowRight, Sparkles, Star, ChevronRight } from "lucide-react";
import { ScrollReveal, StaggerContainer, staggerItem } from "@/components/animations/ScrollReveal";
import { InquiryModal } from "@/features/InquiryModal";
import type { Course } from "@/types";

const fallbackCourses = [
  {
    _id: "1",
    title: "Class 5-8 Foundation",
    category: "class-5-8",
    description: "Build an unshakeable foundation in Mathematics and Science. Perfect for early concept clearing, regular class tests, and comprehensive syllabus coverage.",
    duration: "Ongoing",
    feesDisplay: "Contact for Fees",
    features: [
      "Mathematics & Science focus",
      "Regular weekly exams",
      "Doubt clearing support",
      "Offline/Online flexibility"
    ],
    icon: "📚",
    badge: "Foundation Program",
    isPopular: false,
    badgeCls: "badge-green",
    accentBg: "bg-green-50",
    accentText: "text-green-700"
  },
  {
    _id: "2",
    title: "Class 9-10 WBBSE Board Prep",
    category: "class-9-10",
    description: "Comprehensive academic preparation for Class 9 and Class 10 board exams (Mathematics & Science Sections only, WBBSE). Includes weekly mock exams, personal tutoring availability, and soft/hard copy notes.",
    duration: "1-2 Years",
    feesDisplay: "Contact for Fees",
    features: [
      "WBBSE syllabus coverage",
      "Math & Science sections only",
      "Chapter wise test facility",
      "Personal Home Tuition options"
    ],
    icon: "⚗️",
    badge: "WBBSE Board Preparation",
    isPopular: true,
    badgeCls: "badge-blue",
    accentBg: "bg-blue-50",
    accentText: "text-blue-700"
  }
];

export function CoursesSection() {
  const [selectedCourse, setSelectedCourse] = useState<typeof fallbackCourses[0] | null>(null);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <section id="courses" className="section-padding bg-[#F8FAFB] relative overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-50" />

        <div className="container-xl relative">
          <ScrollReveal className="text-center mb-14">
            <div className="section-tag mx-auto">
              <BookOpen className="w-3.5 h-3.5" />
              Our Courses
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-display text-[#0B0E17] mt-4">
              Choose Your{" "}
              <span className="text-gradient">Path to Success</span>
            </h2>
            <p className="mt-4 text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              Focused Mathematics &amp; Science coaching for Class 5 to Class 10 WBBSE sections.
            </p>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5" staggerDelay={0.06}>
            {fallbackCourses.map((course) => (
              <motion.div key={course._id} variants={staggerItem}
                className={`relative card-premium p-6 flex flex-col group`}
              >
                {course.isPopular && (
                  <div className="absolute -top-3 left-4">
                    <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#2563EB] text-white text-xs font-bold shadow-md">
                      <Star className="w-3 h-3 fill-white" /> Popular
                    </div>
                  </div>
                )}

                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl ${course.accentBg} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {course.icon}
                </div>

                <span className={`badge ${course.badgeCls} text-xs mb-3 self-start`}>{course.badge}</span>

                <h3 className="text-base font-bold font-display text-[#0B0E17] mb-2">{course.title}</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4 flex-grow">{course.description}</p>

                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-[var(--text-muted)] mb-4">
                  <div className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{course.duration}</div>
                  <div className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />Small Batch</div>
                </div>

                {/* Features */}
                <ul className="space-y-1.5 mb-5">
                  {course.features.slice(0, 4).map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB] flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Fees & Actions */}
                <div className="pt-4 border-t border-[var(--border)] mt-auto">
                  <p className="text-xs text-[var(--text-muted)]">Starting from</p>
                  <p className="text-lg font-bold font-display text-[#2563EB] mb-3">{course.feesDisplay}</p>
                  <div className="flex gap-2">
                    <button onClick={() => { setSelectedCourse(course); setShowModal(true); }}
                      className="btn-primary flex-1 text-xs py-2.5 justify-center" id={`course-enroll-${course._id}`}>
                      <Sparkles className="w-3.5 h-3.5" /> Enroll
                    </button>
                    <Link href={`/courses#${course.category}`}
                      className="w-9 h-9 flex items-center justify-center rounded-lg border border-[var(--border)] hover:border-[#2563EB] hover:text-[#2563EB] text-[var(--text-muted)] transition-all"
                      id={`course-details-${course._id}`} aria-label="View details">
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </StaggerContainer>

          <ScrollReveal delay={0.2} className="text-center mt-10">
            <Link href="/courses" className="btn-dark px-8 py-3.5 inline-flex items-center gap-2" id="view-all-courses-btn">
              View All Courses <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <InquiryModal isOpen={showModal} onClose={() => { setShowModal(false); setSelectedCourse(null); }}
        course={selectedCourse as unknown as Course} />
    </>
  );
}
