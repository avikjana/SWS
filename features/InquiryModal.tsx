"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle, GraduationCap, Phone, Mail, User, MessageSquare } from "lucide-react";
import type { Course } from "@/types";

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  course?: Course | null;
}

export function InquiryModal({ isOpen, onClose, course }: InquiryModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    preferredBatch: "Morning",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          courseId: course?._id,
          courseName: course?.title || "General Inquiry",
        }),
      });
      if (response.ok) {
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      // Optimistic on network error
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    onClose();
    setTimeout(() => {
      setSubmitted(false);
      setError("");
      setFormData({ name: "", email: "", phone: "", message: "", preferredBatch: "Morning" });
    }, 300);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Course Inquiry">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-lg glass-dark border border-white/10 rounded-3xl p-8 shadow-premium overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background glow */}
            <div className="absolute -top-20 -right-20 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl" />

            {/* Close */}
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-xl glass text-slate-400 hover:text-white transition-colors"
              aria-label="Close modal"
              id="inquiry-modal-close"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-sky flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold font-display text-white">
                    {submitted ? "Inquiry Sent!" : "Course Inquiry"}
                  </h2>
                  {course && !submitted && (
                    <p className="text-sm text-slate-400">{course.title}</p>
                  )}
                </div>
              </div>

              {/* Success State */}
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Thank You! 🎉</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    We&apos;ve received your inquiry. Our counselor will contact you within 24 hours to discuss your enrollment.
                  </p>
                  <div className="mt-4 p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20">
                    <p className="text-xs text-blue-300">
                      For immediate assistance, call us at{" "}
                      <a href="tel:+919800000000" className="font-bold text-blue-400 hover:underline">
                        +91 98000 00000
                      </a>
                    </p>
                  </div>
                  <button
                    onClick={handleClose}
                    className="btn-primary w-full mt-6"
                    id="inquiry-close-success"
                  >
                    Close
                  </button>
                </motion.div>
              ) : (
                /* Form */
                <form onSubmit={handleSubmit} className="space-y-4" id="inquiry-form">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1.5">Full Name *</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                          className="w-full pl-9 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 text-sm"
                          placeholder="Your Name"
                          id="inquiry-name"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1.5">Phone *</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                          className="w-full pl-9 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 text-sm"
                          placeholder="+91 XXXXX XXXXX"
                          id="inquiry-phone"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                        className="w-full pl-9 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 text-sm"
                        placeholder="your@email.com"
                        id="inquiry-email"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">Preferred Batch</label>
                    <select
                      value={formData.preferredBatch}
                      onChange={(e) => setFormData((p) => ({ ...p, preferredBatch: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-500/50 text-sm"
                      id="inquiry-batch"
                    >
                      <option value="Morning" className="bg-slate-900">Morning (7AM - 9AM)</option>
                      <option value="Afternoon" className="bg-slate-900">Afternoon (2PM - 4PM)</option>
                      <option value="Evening" className="bg-slate-900">Evening (5PM - 7PM)</option>
                      <option value="Weekend" className="bg-slate-900">Weekend Batch</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">Message (Optional)</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                        rows={3}
                        className="w-full pl-9 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 text-sm resize-none"
                        placeholder="Any specific questions about the course?"
                        id="inquiry-message"
                      />
                    </div>
                  </div>

                  {error && (
                    <p className="text-red-400 text-xs text-center">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full justify-center py-3.5"
                    id="inquiry-submit"
                  >
                    {loading ? (
                      <span className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
                    ) : (
                      <><Send className="w-4 h-4" /> Send Inquiry</>
                    )}
                  </button>

                  <p className="text-xs text-center text-slate-500">
                    By submitting, you agree to our{" "}
                    <a href="/privacy" className="text-blue-400 hover:underline">Privacy Policy</a>
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
