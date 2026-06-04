"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, Plus, Minus } from "lucide-react";
import { ScrollReveal, StaggerContainer, staggerItem } from "@/components/animations/ScrollReveal";

const faqs = [
  {
    question: "What exams does Study With Sutirtha prepare students for?",
    answer: "We offer comprehensive preparation for JEE Main & Advanced, NEET, WBJEE, WBCHSE, WBBSE, CBSE Board Exams (Class 9-12), and Computer Science programming courses. Our curriculum is designed by IIT and AIIMS alumni.",
  },
  {
    question: "What is the batch size and what makes it unique?",
    answer: "Our batches are intentionally kept small — maximum 25-35 students per batch — to ensure personalized attention. This means faculty can identify and address each student's weak areas, provide individual mentoring, and conduct focused doubt-clearing sessions.",
  },
  {
    question: "Do you offer online classes as well?",
    answer: "Yes! We offer offline (classroom), online (live interactive), and hybrid (combination of both) batch options. Our online classes are conducted on a dedicated platform with recording access, allowing students to revisit lectures anytime.",
  },
  {
    question: "How experienced is the faculty team?",
    answer: "Our faculty team comprises IIT and AIIMS alumni with an average teaching experience of 12+ years. Each subject expert has a proven track record of producing top rankers in their respective subjects. Faculty profiles are available on our Faculty page.",
  },
  {
    question: "What study material do you provide?",
    answer: "Students receive comprehensive handwritten notes, printed study material, chapter-wise PYQ banks (1990-2024), formula sheets, mind maps, and access to our digital library with 10,000+ practice problems. Weekly test papers are also provided.",
  },
  {
    question: "Is there a refund policy if I'm not satisfied?",
    answer: "Absolutely. We offer a 30-day money-back guarantee. If you attend our classes and are not satisfied with the teaching quality within the first month, we will refund 100% of your fees — no questions asked. We stand by the quality of our education.",
  },
  {
    question: "How do I enroll and what documents are required?",
    answer: "You can enroll by visiting our center, calling us at +91 98000 00000, or filling the inquiry form on our website. Required documents: Previous year's marksheet, Aadhaar card, 2 passport photos, and admission form. We also conduct a counseling session to place you in the right batch.",
  },
  {
    question: "Are there any scholarships available?",
    answer: "Yes! We offer merit-based scholarships of up to 50% fee waiver for students who score 90%+ in their previous exams. We also have need-based financial assistance programs. Contact us to know more about scholarship eligibility.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-padding bg-[var(--bg-primary)] relative overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-20" />

      <div className="container-xl relative">
        <ScrollReveal className="text-center mb-16">
          <div className="section-tag mx-auto">
            <HelpCircle className="w-3.5 h-3.5" />
            FAQ
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-[var(--text-primary)] mt-4">
            Frequently Asked{" "}
            <span className="text-gradient">Questions</span>
          </h2>
          <p className="mt-4 text-lg text-[var(--text-secondary)] max-w-xl mx-auto">
            Have more questions? Don&apos;t hesitate to contact us directly.
          </p>
        </ScrollReveal>

        <StaggerContainer className="max-w-3xl mx-auto space-y-3" staggerDelay={0.07}>
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className={`card-premium border overflow-hidden transition-all duration-300 ${
                openIndex === i ? "border-blue-500/40 shadow-sm" : "border-[var(--border-card)]"
              }`}
            >
              <button
                className="w-full flex items-center justify-between gap-4 p-6 text-left"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                id={`faq-btn-${i}`}
                aria-expanded={openIndex === i}
              >
                <span className={`font-semibold font-display transition-colors ${
                  openIndex === i ? "text-blue-600" : "text-[var(--text-primary)]"
                }`}>
                  {faq.question}
                </span>
                <div className={`w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center transition-all duration-300 ${
                  openIndex === i
                    ? "bg-blue-50 text-blue-600"
                    : "bg-slate-100 text-[var(--text-muted)]"
                }`}>
                  {openIndex === i ? (
                    <Minus className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </div>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-[var(--text-secondary)] leading-relaxed text-sm border-t border-[var(--border)] pt-4">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </StaggerContainer>

        <ScrollReveal delay={0.2} className="text-center mt-10">
          <p className="text-[var(--text-muted)] mb-4">Still have questions?</p>
          <a href="/contact" className="btn-primary px-8 py-3.5 inline-flex items-center gap-2" id="faq-contact-cta">
            Contact Us
            <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
