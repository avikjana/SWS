"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

const testimonials = [
  {
    id: 1,
    name: "Aryan Sharma",
    achievement: "AIR 247 – JEE Advanced 2024",
    content: "Study With Sutirtha transformed my approach to JEE preparation. The faculty's depth of knowledge, especially Dr. Rajesh Kumar's Physics classes, was unparalleled. I went from scoring 60 percentile to AIR 247 in just one year of dedicated study here.",
    rating: 5,
    exam: "JEE Advanced",
    college: "IIT Bombay – CSE",
    avatarBg: "bg-blue-50 text-blue-600 border border-blue-100",
  },
  {
    id: 2,
    name: "Priya Singh",
    achievement: "720/720 – NEET 2024",
    content: "I got a perfect score in NEET and it would not have been possible without Study With Sutirtha. Dr. Priya Das's Biology sessions were phenomenal. The study material and mock tests exactly replicated real exam conditions, which built my confidence tremendously.",
    rating: 5,
    exam: "NEET",
    college: "AIIMS Delhi",
    avatarBg: "bg-emerald-50 text-emerald-600 border border-emerald-100",
  },
  {
    id: 3,
    name: "Rohit Das",
    achievement: "State Rank 18 – WBJEE 2024",
    content: "The personalized attention I received at Study With Sutirtha was incredible. Small batch sizes meant teachers actually knew my weak areas. The weekly tests and detailed analysis helped me continuously improve. Very grateful for the mentorship.",
    rating: 5,
    exam: "WBJEE",
    college: "Jadavpur University – EE",
    avatarBg: "bg-purple-50 text-purple-600 border border-purple-100",
  },
  {
    id: 4,
    name: "Sneha Paul",
    achievement: "98.6% – WBCHSE 2024",
    content: "I was struggling with Chemistry until I joined Study With Sutirtha. The faculty's teaching methodology made complex organic chemistry so easy to understand. My scores improved from 68% to 98.6% in board exams. Highly recommend!",
    rating: 5,
    exam: "WBCHSE",
    college: "Science Stream Topper",
    avatarBg: "bg-rose-50 text-rose-600 border border-rose-100",
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  function next() {
    setDirection(1);
    setCurrent((c) => (c + 1) % testimonials.length);
  }

  function prev() {
    setDirection(-1);
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  }

  const t = testimonials[current];

  return (
    <section id="testimonials" className="section-padding bg-[var(--bg-primary)] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />

      <div className="container-xl relative">
        <ScrollReveal className="text-center mb-16">
          <div className="section-tag mx-auto">
            <Star className="w-3.5 h-3.5 fill-current" />
            Student Stories
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-[var(--text-primary)] mt-4">
            What Our{" "}
            <span className="text-gradient">Students Say</span>
          </h2>
        </ScrollReveal>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Rating Stars Row */}
            <div className="flex justify-center mb-8 gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-amber-500 fill-amber-500" />
              ))}
            </div>

            {/* Card */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                initial={{ opacity: 0, x: direction * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -60 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="card-premium p-8 md:p-12 border border-[var(--border-card)] relative overflow-hidden"
              >
                {/* Quote Icon */}
                <Quote className="absolute top-6 right-6 w-12 h-12 text-blue-500/10" />

                {/* Content */}
                <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed mb-8 italic">
                  &ldquo;{t.content}&rdquo;
                </p>

                {/* Student Info */}
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl ${t.avatarBg} flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-sm`}>
                    {t.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <h4 className="font-bold font-display text-[var(--text-primary)]">{t.name}</h4>
                    <p className="text-sm text-blue-600 font-semibold">{t.achievement}</p>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">{t.college}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prev}
                className="w-11 h-11 flex items-center justify-center rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-strong)] text-[var(--text-secondary)] hover:text-blue-600 hover:border-blue-500 transition-all"
                id="testimonial-prev"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                    className={`rounded-full transition-all duration-300 ${i === current ? "w-6 h-2.5 bg-blue-600" : "w-2.5 h-2.5 bg-slate-200"}`}
                    aria-label={`Go to testimonial ${i + 1}`}
                    id={`testimonial-dot-${i}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="w-11 h-11 flex items-center justify-center rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-strong)] text-[var(--text-secondary)] hover:text-blue-600 hover:border-blue-500 transition-all"
                id="testimonial-next"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* All Testimonials Link */}
          <div className="text-center mt-6">
            <a href="/results" className="text-sm text-blue-600 font-semibold hover:text-blue-700 transition-colors" id="all-testimonials-link">
              Read all student success stories →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
