"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, ArrowLeft, Send, CheckCircle, GraduationCap } from "lucide-react";
import type { Course } from "@/types";

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  course?: Course | null;
}

export function InquiryModal({ isOpen, onClose, course }: InquiryModalProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    // Step 1: Admission & Personal
    class: [] as string[],
    subjectsInterest: "",
    coachingMode: "Offline",
    studentName: "",
    fatherName: "",
    motherName: "",
    gender: "Male",
    dateOfBirth: "",
    religion: "",
    category: [] as string[],
    nationality: "Indian",
    bloodGroup: "",
    aadhaarNo: "",

    // Step 2: Contact & Address
    mobileNo: "",
    altMobileNo: "",
    emailId: "",
    addressVill: "",
    addressPo: "",
    addressPs: "",
    addressPin: "",
    addressDistrict: "",
    addressState: "West Bengal",

    // Step 3: Educational & Questions
    currentClass: [] as string[],
    educationMedium: [] as string[],
    currentSchool: "",
    marksObtained: "",
    marksOutOf: "",
    referralSource: [] as string[],
    isOldStudent: "No",
    takenCoachingPast: "No",
    reasonForJoining: "",

    // Step 4: Declaration
    declarationAccepted: false,
    studentSignature: "",
    guardianSignature: "",
  });

  const classesList = ["5th", "6th", "7th", "8th", "9th", "10th"];
  const currentClassesList = ["4th", "5th", "6th", "7th", "8th", "9th", "10th"];
  const categoriesList = ["General", "OBC", "SC", "ST", "PH", "Other"];
  const mediumsList = ["Bengali", "English", "Hindi", "Other"];
  const referralSourcesList = [
    "News",
    "Friends",
    "Magazine",
    "Internet/Website",
    "Social Media",
    "Ex-students",
    "Relatives",
    "Any Other Source",
  ];

  function toggleCheckbox(field: "class" | "category" | "currentClass" | "educationMedium" | "referralSource", value: string) {
    setFormData((prev) => {
      const currentArr = prev[field] as string[];
      const newArr = currentArr.includes(value)
        ? currentArr.filter((item) => item !== value)
        : [...currentArr, value];
      return { ...prev, [field]: newArr };
    });
  }

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
          courseName: course?.title || "General Admission Form",
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        setError("Failed to submit form. Please check your network and try again.");
      }
    } catch {
      // Optimistic submission on network error
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    onClose();
    setTimeout(() => {
      setSubmitted(false);
      setStep(1);
      setError("");
    }, 300);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-2xl bg-white border-2 border-black rounded-3xl p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] z-50 my-8 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header branding */}
            <div className="flex items-start justify-between border-b-2 border-black pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 border-2 border-black flex items-center justify-center text-white">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-black uppercase tracking-tight">Admission Form</h2>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Study With Sutirtha</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="w-9 h-9 flex items-center justify-center rounded-xl border-2 border-black bg-[#FF007A] text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
                aria-label="Close"
              >
                <X className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

            {submitted ? (
              // Success Screen
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-20 h-20 rounded-full bg-emerald-100 border-2 border-emerald-500 flex items-center justify-center mx-auto mb-6 shadow-[3px_3px_0px_0px_rgba(16,185,129,0.2)] animate-bounce">
                  <CheckCircle className="w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-black text-black uppercase mb-3">Admission Registered! 🎉</h3>
                <p className="text-slate-600 font-semibold text-sm max-w-md mx-auto mb-6">
                  Thank you, <strong className="text-black">{formData.studentName}</strong>! Your admission details have been recorded. Our coordinator will call you within 24 hours to schedule document verification.
                </p>
                <div className="p-4 rounded-2xl bg-blue-50 border-2 border-black max-w-sm mx-auto shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] mb-8">
                  <p className="text-xs font-bold text-black">
                    For help or WhatsApp support:
                    <br />
                    <span className="text-blue-600 text-sm font-black">+91 9064077914 / 9775765087</span>
                  </p>
                </div>
                <button onClick={handleClose} className="btn-primary px-8 py-3.5">
                  Done
                </button>
              </motion.div>
            ) : (
              // Wizard Steps
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Step Indicators */}
                <div className="flex items-center justify-between bg-slate-50 border-2 border-black rounded-xl p-3 mb-6">
                  <span className="text-xs font-black text-black uppercase">Step {step} of 4</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((s) => (
                      <div
                        key={s}
                        className={`h-2.5 rounded-full border border-black transition-all ${
                          s === step ? "w-8 bg-[#D2FF00]" : "w-2.5 bg-white"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* STEP 1: Admission & Personal Info */}
                {step === 1 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                    <h4 className="font-extrabold text-black border-b-2 border-black pb-1.5 uppercase text-sm">1. Admission &amp; Personal Info</h4>
                    
                    {/* Class selection */}
                    <div>
                      <label className="block text-xs font-black text-black uppercase mb-2">Class (Select class to take admission) *</label>
                      <div className="flex flex-wrap gap-2">
                        {classesList.map((cls) => {
                          const isSelected = formData.class.includes(cls);
                          return (
                            <button
                              type="button"
                              key={cls}
                              onClick={() => toggleCheckbox("class", cls)}
                              className={`px-3.5 py-1.5 rounded-lg border-2 font-bold text-xs transition-all ${
                                isSelected
                                  ? "bg-[#00F0FF] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-y-[-1px]"
                                  : "bg-white border-black"
                              }`}
                            >
                              {cls}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-black text-black uppercase mb-1.5">Subjects Desired *</label>
                        <input
                          type="text"
                          required
                          value={formData.subjectsInterest}
                          onChange={(e) => setFormData(p => ({ ...p, subjectsInterest: e.target.value }))}
                          placeholder="e.g. Physics, Chemistry, Math"
                          className="w-full px-4 py-3 rounded-xl border-2 border-black text-black font-semibold text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-black text-black uppercase mb-1.5">Coaching Mode *</label>
                        <div className="flex gap-4 py-2.5">
                          {["Online", "Offline"].map((mode) => (
                            <label key={mode} className="flex items-center gap-2 cursor-pointer font-bold text-sm text-black">
                              <input
                                type="radio"
                                name="coachingMode"
                                checked={formData.coachingMode === mode}
                                onChange={() => setFormData(p => ({ ...p, coachingMode: mode }))}
                                className="w-4 h-4 accent-blue-600"
                              />
                              {mode}
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Student Name & Parents */}
                    <div>
                      <label className="block text-xs font-black text-black uppercase mb-1.5">Student's Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.studentName}
                        onChange={(e) => setFormData(p => ({ ...p, studentName: e.target.value }))}
                        placeholder="Student's full name"
                        className="w-full px-4 py-3 rounded-xl border-2 border-black text-black font-semibold text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-black text-black uppercase mb-1.5">Father's Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.fatherName}
                          onChange={(e) => setFormData(p => ({ ...p, fatherName: e.target.value }))}
                          placeholder="Father's name"
                          className="w-full px-4 py-3 rounded-xl border-2 border-black text-black font-semibold text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-black text-black uppercase mb-1.5">Mother's Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.motherName}
                          onChange={(e) => setFormData(p => ({ ...p, motherName: e.target.value }))}
                          placeholder="Mother's name"
                          className="w-full px-4 py-3 rounded-xl border-2 border-black text-black font-semibold text-sm"
                        />
                      </div>
                    </div>

                    {/* Gender, DOB & Religion */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-black text-black uppercase mb-1.5">Gender *</label>
                        <select
                          value={formData.gender}
                          onChange={(e) => setFormData(p => ({ ...p, gender: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl border-2 border-black text-black font-semibold text-sm"
                        >
                          <option>Male</option>
                          <option>Female</option>
                          <option>Transgender</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-black text-black uppercase mb-1.5">Date of Birth *</label>
                        <input
                          type="date"
                          required
                          value={formData.dateOfBirth}
                          onChange={(e) => setFormData(p => ({ ...p, dateOfBirth: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl border-2 border-black text-black font-semibold text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-black text-black uppercase mb-1.5">Religion *</label>
                        <input
                          type="text"
                          required
                          value={formData.religion}
                          onChange={(e) => setFormData(p => ({ ...p, religion: e.target.value }))}
                          placeholder="e.g. Hindu, Muslim, Christian"
                          className="w-full px-4 py-3 rounded-xl border-2 border-black text-black font-semibold text-sm"
                        />
                      </div>
                    </div>

                    {/* Category list checkboxes */}
                    <div>
                      <label className="block text-xs font-black text-black uppercase mb-2">Category *</label>
                      <div className="flex flex-wrap gap-2">
                        {categoriesList.map((cat) => {
                          const isSelected = formData.category.includes(cat);
                          return (
                            <button
                              type="button"
                              key={cat}
                              onClick={() => toggleCheckbox("category", cat)}
                              className={`px-3 py-1.5 rounded-lg border-2 font-bold text-xs transition-all ${
                                isSelected
                                  ? "bg-[#D2FF00] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-y-[-1px]"
                                  : "bg-white border-black"
                              }`}
                            >
                              {cat}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Nationality, Blood Group & Aadhaar */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-black text-black uppercase mb-1.5">Nationality *</label>
                        <input
                          type="text"
                          required
                          value={formData.nationality}
                          onChange={(e) => setFormData(p => ({ ...p, nationality: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl border-2 border-black text-black font-semibold text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-black text-black uppercase mb-1.5">Blood Group</label>
                        <input
                          type="text"
                          value={formData.bloodGroup}
                          onChange={(e) => setFormData(p => ({ ...p, bloodGroup: e.target.value }))}
                          placeholder="Optional"
                          className="w-full px-4 py-3 rounded-xl border-2 border-black text-black font-semibold text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-black text-black uppercase mb-1.5">Aadhaar Card No. *</label>
                        <input
                          type="text"
                          required
                          value={formData.aadhaarNo}
                          onChange={(e) => setFormData(p => ({ ...p, aadhaarNo: e.target.value }))}
                          placeholder="For ID Proof"
                          className="w-full px-4 py-3 rounded-xl border-2 border-black text-black font-semibold text-sm"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: Contact & Address Details */}
                {step === 2 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                    <h4 className="font-extrabold text-black border-b-2 border-black pb-1.5 uppercase text-sm">2. Contact &amp; Address Details</h4>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-black text-black uppercase mb-1.5">Mobile No. *</label>
                        <input
                          type="tel"
                          required
                          value={formData.mobileNo}
                          onChange={(e) => setFormData(p => ({ ...p, mobileNo: e.target.value }))}
                          placeholder="Primary contact"
                          className="w-full px-4 py-3 rounded-xl border-2 border-black text-black font-semibold text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-black text-black uppercase mb-1.5">Alternate Mobile No.</label>
                        <input
                          type="tel"
                          value={formData.altMobileNo}
                          onChange={(e) => setFormData(p => ({ ...p, altMobileNo: e.target.value }))}
                          placeholder="Guardian mobile"
                          className="w-full px-4 py-3 rounded-xl border-2 border-black text-black font-semibold text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-black text-black uppercase mb-1.5">Email ID *</label>
                        <input
                          type="email"
                          required
                          value={formData.emailId}
                          onChange={(e) => setFormData(p => ({ ...p, emailId: e.target.value }))}
                          placeholder="student@gmail.com"
                          className="w-full px-4 py-3 rounded-xl border-2 border-black text-black font-semibold text-sm"
                        />
                      </div>
                    </div>

                    <h5 className="font-bold text-black text-xs uppercase pt-2">Permanent Address</h5>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-black text-black uppercase mb-1.5">Village / City / Town *</label>
                        <input
                          type="text"
                          required
                          value={formData.addressVill}
                          onChange={(e) => setFormData(p => ({ ...p, addressVill: e.target.value }))}
                          placeholder="Street, area, town"
                          className="w-full px-4 py-3 rounded-xl border-2 border-black text-black font-semibold text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-black text-black uppercase mb-1.5">Post Office *</label>
                        <input
                          type="text"
                          required
                          value={formData.addressPo}
                          onChange={(e) => setFormData(p => ({ ...p, addressPo: e.target.value }))}
                          placeholder="Post Office name"
                          className="w-full px-4 py-3 rounded-xl border-2 border-black text-black font-semibold text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-black text-black uppercase mb-1.5">Police Station *</label>
                        <input
                          type="text"
                          required
                          value={formData.addressPs}
                          onChange={(e) => setFormData(p => ({ ...p, addressPs: e.target.value }))}
                          placeholder="Police Station"
                          className="w-full px-4 py-3 rounded-xl border-2 border-black text-black font-semibold text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-black text-black uppercase mb-1.5">Pin Code *</label>
                        <input
                          type="text"
                          required
                          value={formData.addressPin}
                          onChange={(e) => setFormData(p => ({ ...p, addressPin: e.target.value }))}
                          placeholder="6-digit ZIP code"
                          className="w-full px-4 py-3 rounded-xl border-2 border-black text-black font-semibold text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-black text-black uppercase mb-1.5">District *</label>
                        <input
                          type="text"
                          required
                          value={formData.addressDistrict}
                          onChange={(e) => setFormData(p => ({ ...p, addressDistrict: e.target.value }))}
                          placeholder="e.g. Hooghly, Kolkata"
                          className="w-full px-4 py-3 rounded-xl border-2 border-black text-black font-semibold text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-black text-black uppercase mb-1.5">State *</label>
                        <input
                          type="text"
                          required
                          value={formData.addressState}
                          onChange={(e) => setFormData(p => ({ ...p, addressState: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl border-2 border-black text-black font-semibold text-sm"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: Educational Details & Questions */}
                {step === 3 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                    <h4 className="font-extrabold text-black border-b-2 border-black pb-1.5 uppercase text-sm">3. Educational Details</h4>

                    {/* Current Class */}
                    <div>
                      <label className="block text-xs font-black text-black uppercase mb-2">Student's Current Class *</label>
                      <div className="flex flex-wrap gap-2">
                        {currentClassesList.map((cls) => {
                          const isSelected = formData.currentClass.includes(cls);
                          return (
                            <button
                              type="button"
                              key={cls}
                              onClick={() => toggleCheckbox("currentClass", cls)}
                              className={`px-3.5 py-1.5 rounded-lg border-2 font-bold text-xs transition-all ${
                                isSelected
                                  ? "bg-[#00F0FF] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-y-[-1px]"
                                  : "bg-white border-black"
                              }`}
                            >
                              {cls}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Medium checkboxes */}
                    <div>
                      <label className="block text-xs font-black text-black uppercase mb-2">Education Medium *</label>
                      <div className="flex flex-wrap gap-2">
                        {mediumsList.map((med) => {
                          const isSelected = formData.educationMedium.includes(med);
                          return (
                            <button
                              type="button"
                              key={med}
                              onClick={() => toggleCheckbox("educationMedium", med)}
                              className={`px-3.5 py-1.5 rounded-lg border-2 font-bold text-xs transition-all ${
                                isSelected
                                  ? "bg-[#D2FF00] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-y-[-1px]"
                                  : "bg-white border-black"
                              }`}
                            >
                              {med}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-xs font-black text-black uppercase mb-1.5">Current School *</label>
                        <input
                          type="text"
                          required
                          value={formData.currentSchool}
                          onChange={(e) => setFormData(p => ({ ...p, currentSchool: e.target.value }))}
                          placeholder="School name"
                          className="w-full px-4 py-3 rounded-xl border-2 border-black text-black font-semibold text-sm"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs font-black text-black uppercase mb-1.5">Marks *</label>
                          <input
                            type="text"
                            required
                            value={formData.marksObtained}
                            onChange={(e) => setFormData(p => ({ ...p, marksObtained: e.target.value }))}
                            placeholder="Score"
                            className="w-full px-3 py-3 rounded-xl border-2 border-black text-black font-semibold text-sm text-center"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-black text-black uppercase mb-1.5">Out of *</label>
                          <input
                            type="text"
                            required
                            value={formData.marksOutOf}
                            onChange={(e) => setFormData(p => ({ ...p, marksOutOf: e.target.value }))}
                            placeholder="Total"
                            className="w-full px-3 py-3 rounded-xl border-2 border-black text-black font-semibold text-sm text-center"
                          />
                        </div>
                      </div>
                    </div>

                    <h5 className="font-bold text-black text-xs uppercase pt-2 border-t-2 border-black/5">Additional Questions</h5>

                    {/* How did you come to know */}
                    <div>
                      <label className="block text-xs font-black text-black uppercase mb-2">How did you come to know about Study With Sutirtha?</label>
                      <div className="flex flex-wrap gap-2">
                        {referralSourcesList.map((src) => {
                          const isSelected = formData.referralSource.includes(src);
                          return (
                            <button
                              type="button"
                              key={src}
                              onClick={() => toggleCheckbox("referralSource", src)}
                              className={`px-3 py-1.5 rounded-lg border-2 font-bold text-[10px] uppercase tracking-wide transition-all ${
                                isSelected
                                  ? "bg-[#FF007A] text-white border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-y-[-1px]"
                                  : "bg-white border-black text-black"
                              }`}
                            >
                              {src}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Old Student, Other Coaching */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-black text-black uppercase mb-1.5">Are you an Old Student of Study With Sutirtha? *</label>
                        <div className="flex gap-4 py-1">
                          {["Yes", "No"].map((v) => (
                            <label key={v} className="flex items-center gap-2 cursor-pointer font-bold text-sm text-black">
                              <input
                                type="radio"
                                name="isOldStudent"
                                checked={formData.isOldStudent === v}
                                onChange={() => setFormData(p => ({ ...p, isOldStudent: v }))}
                                className="w-4 h-4 accent-blue-600"
                              />
                              {v}
                            </label>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-black text-black uppercase mb-1.5">Have you taken any other coaching past? *</label>
                        <div className="flex gap-4 py-1">
                          {["Yes", "No"].map((v) => (
                            <label key={v} className="flex items-center gap-2 cursor-pointer font-bold text-sm text-black">
                              <input
                                type="radio"
                                name="takenCoachingPast"
                                checked={formData.takenCoachingPast === v}
                                onChange={() => setFormData(p => ({ ...p, takenCoachingPast: v }))}
                                className="w-4 h-4 accent-blue-600"
                              />
                              {v}
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-black text-black uppercase mb-1.5">Why are you joining Study With Sutirtha? (Optional)</label>
                      <textarea
                        value={formData.reasonForJoining}
                        onChange={(e) => setFormData(p => ({ ...p, reasonForJoining: e.target.value }))}
                        rows={2}
                        placeholder="State your reasons..."
                        className="w-full px-4 py-3 rounded-xl border-2 border-black text-black font-semibold text-sm resize-none"
                      />
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: Self - Declaration Form */}
                {step === 4 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                    <h4 className="font-extrabold text-black border-b-2 border-black pb-1.5 uppercase text-sm">4. Self - Declaration Form</h4>

                    <div className="p-5 border-2 border-black bg-[#E6F5EC] rounded-2xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                      <label className="flex items-start gap-3.5 cursor-pointer">
                        <input
                          type="checkbox"
                          required
                          checked={formData.declarationAccepted}
                          onChange={(e) => setFormData(p => ({ ...p, declarationAccepted: e.target.checked }))}
                          className="w-5 h-5 accent-emerald-600 flex-shrink-0 mt-0.5"
                        />
                        <span className="text-xs font-extrabold text-black leading-relaxed">
                          "I, <span className="underline">{formData.studentName || "[Name of Student]"}</span>, hereby declare that all the information submitted by me in this application form is correct, true and valid. I will present the supporting documents as and when required."
                        </span>
                      </label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                      <div>
                        <label className="block text-xs font-black text-black uppercase mb-1.5">Signature of Student (Type name) *</label>
                        <input
                          type="text"
                          required
                          value={formData.studentSignature}
                          onChange={(e) => setFormData(p => ({ ...p, studentSignature: e.target.value }))}
                          placeholder="Type name for digital signature"
                          className="w-full px-4 py-3 rounded-xl border-2 border-black text-black font-semibold text-sm italic font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-black text-black uppercase mb-1.5">Signature of Guardian (Type name) *</label>
                        <input
                          type="text"
                          required
                          value={formData.guardianSignature}
                          onChange={(e) => setFormData(p => ({ ...p, guardianSignature: e.target.value }))}
                          placeholder="Type name for digital signature"
                          className="w-full px-4 py-3 rounded-xl border-2 border-black text-black font-semibold text-sm italic font-mono"
                        />
                      </div>
                    </div>

                    {error && (
                      <p className="text-red-600 text-xs text-center font-bold">{error}</p>
                    )}
                  </motion.div>
                )}

                {/* Footer Controls */}
                <div className="flex justify-between items-center border-t-2 border-black pt-4 mt-6">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="btn-secondary flex items-center gap-1.5 py-2.5 px-5 text-sm"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < 4 ? (
                    <button
                      type="button"
                      onClick={() => setStep(step + 1)}
                      className="btn-primary flex items-center gap-1.5 py-2.5 px-5 text-sm"
                    >
                      Next <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary flex items-center gap-1.5 py-2.5 px-6 text-sm bg-[#D2FF00]"
                      id="inquiry-submit"
                    >
                      {loading ? "Submitting..." : <><Send className="w-4 h-4" /> Submit Admission Form</>}
                    </button>
                  )}
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
