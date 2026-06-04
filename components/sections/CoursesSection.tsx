"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, Clock, Users, ArrowRight, Sparkles, Star, ChevronRight } from "lucide-react";
import { ScrollReveal, StaggerContainer, staggerItem } from "@/components/animations/ScrollReveal";
import { InquiryModal } from "@/features/InquiryModal";
import type { Course } from "@/types";

const fallbackCourses = [
  { _id:"1", title:"Class 9-10 Foundation",    category:"class-9-10",            description:"Build a strong foundation in Math, Science & English for board exams and competitive exam readiness.", duration:"1-2 Years", feesDisplay:"₹30,000/year", features:["Math & Science","English Grammar","Board Exam Prep","Weekly Tests","Digital Material"], icon:"📚", badge:"Foundation", isPopular:false, badgeCls:"badge-green",  accentBg:"bg-green-50",  accentText:"text-green-700" },
  { _id:"2", title:"Class 11-12 Science",       category:"class-11-12-science",   description:"Comprehensive PCM/PCB preparation combining board excellence and JEE/NEET foundation.",              duration:"2 Years",   feesDisplay:"₹55,000/year", features:["Physics · Chemistry · Math/Bio","Board + Competitive Prep","Lab Sessions","Mock Tests","Expert Faculty"],  icon:"⚗️", badge:"Most Popular", isPopular:true,  badgeCls:"badge-blue",   accentBg:"bg-blue-50",   accentText:"text-blue-700"  },
  { _id:"3", title:"Class 11-12 Commerce",      category:"class-11-12-commerce",  description:"Master Accounts, Economics & Business Studies to ace boards and CA Foundation preparation.",          duration:"2 Years",   feesDisplay:"₹40,000/year", features:["Accounts & Economics","Business Studies","Board Focused","CA Foundation Prep","PYQ Practice"],  icon:"📊", badge:"Commerce",     isPopular:false, badgeCls:"badge-purple", accentBg:"bg-purple-50", accentText:"text-purple-700"},
  { _id:"4", title:"JEE Main & Advanced",       category:"jee",                   description:"Intensive IIT JEE preparation covering all chapters with advanced problem-solving techniques.",         duration:"1-2 Years", feesDisplay:"₹75,000/year", features:["PCM Deep Coverage","Advanced Problem Solving","JEE Mock Tests","IIT Alumni Faculty","Rank Analysis"],icon:"🎯", badge:"IIT JEE",      isPopular:true,  badgeCls:"badge-orange", accentBg:"bg-orange-50", accentText:"text-orange-700"},
  { _id:"5", title:"NEET Preparation",          category:"neet",                  description:"Complete NEET Biology, Chemistry & Physics preparation by AIIMS alumni with 1000+ PYQs.",              duration:"1-2 Years", feesDisplay:"₹70,000/year", features:["NCERT-Focused PCB","Biology Deep Dive","AIIMS Faculty","NEET Mock Tests","1000+ PYQs"],       icon:"🏥", badge:"Medical",      isPopular:true,  badgeCls:"badge-green",  accentBg:"bg-emerald-50",accentText:"text-emerald-700"},
  { _id:"6", title:"WBJEE Preparation",         category:"wbjee",                 description:"State-specific WBJEE preparation focusing on West Bengal engineering entrance syllabus.",              duration:"1 Year",    feesDisplay:"₹45,000/year", features:["PCM WB Syllabus","WBJEE Mock Tests","State Rank Strategy","PYQ Analysis","Doubt Sessions"],   icon:"🏆", badge:"WBJEE",        isPopular:false, badgeCls:"badge-purple", accentBg:"bg-indigo-50", accentText:"text-indigo-700"},
  { _id:"7", title:"Computer Science",          category:"cs",                    description:"Learn Python, C++, Data Structures, Web Dev & competitive programming from industry experts.",         duration:"6M–1 Year", feesDisplay:"₹35,000/course",features:["Python & C++","Data Structures","Web Development","Competitive Programming","Project Based"], icon:"💻", badge:"Tech",         isPopular:false, badgeCls:"badge-blue",   accentBg:"bg-cyan-50",   accentText:"text-cyan-700"  },
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
              From Class 9 foundations to JEE Advanced preparation — tailored programs for every student.
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
