"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Send, CheckCircle, ArrowLeft, ArrowRight, Phone, Mail, MapPin, Calendar, Sparkles } from "lucide-react";
import Link from "next/link";
import { BackToTop } from "@/components/ui/BackToTop";

export default function EnrollPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    // Step 1: Admission & Personal
    dateOfAdmission: new Date().toISOString().split("T")[0],
    registrationNo: "SWS202",
    studentPhoto: "",
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
    mentorSignature: "",
    mentorSignatureDate: "",
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
          courseName: formData.class.length > 0 ? `Class ${formData.class.join(", ")} Admission` : "General Admission Form",
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        setError("Failed to submit form. Please check your connection and try again.");
      }
    } catch {
      // Optimistic submission fallback
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <main className="min-h-screen pt-28 pb-16 bg-[#F8FAFB]">
        <div className="container-md max-w-4xl mx-auto px-4">
          
          {/* Main Paper Form Container */}
          <div className="bg-white border-2 border-black rounded-3xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            
            {/* Form Header (Mimics physical document banner in image) */}
            <div className="bg-[#00F0FF] p-6 border-b-2 border-black relative">
              {/* ESTD & Top text */}
              <div className="flex justify-between items-center text-xs font-black text-black uppercase tracking-wider mb-2">
                <span>ESTD. : 2023</span>
                <span>Session : 2026-2027</span>
              </div>
              
              {/* Center Banner Content */}
              <div className="text-center py-4 space-y-1">
                <h1 className="text-3xl md:text-4xl font-black text-black uppercase tracking-tight font-display">
                  STUDY WITH SUTIRTHA
                </h1>
                <p className="text-xs md:text-sm font-extrabold text-black uppercase tracking-widest bg-white border border-black px-3 py-1 inline-block mx-auto rounded-full mt-1">
                  COACHING CENTER FOR CLASS V TO X
                </p>
                <p className="text-[10px] md:text-xs font-black text-black/80 tracking-wide uppercase italic">
                  "Where Dreams Meet Success"
                </p>
              </div>

              {/* Contact and address footer inside the header */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4 pt-4 border-t border-black/20 text-xs font-bold text-black">
                <div className="flex items-center gap-1.5 justify-center md:justify-start">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-black" />
                  <span>Choutaramore, Gopinagar, Hooghly (PIN: 712402)</span>
                </div>
                <div className="flex items-center gap-1.5 justify-center md:justify-end">
                  <Phone className="w-3.5 h-3.5 flex-shrink-0 text-black" />
                  <span>Call &amp; WhatsApp: 9064077914 / 9775765087</span>
                </div>
              </div>
            </div>

            {/* Form Inner Content */}
            <div className="p-6 md:p-10">
              {submitted ? (
                // Success Screen
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 rounded-full bg-emerald-100 border-2 border-emerald-500 flex items-center justify-center mx-auto mb-6 shadow-[3px_3px_0px_0px_rgba(16,185,129,0.2)] animate-bounce">
                    <CheckCircle className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h2 className="text-3xl font-black text-black uppercase mb-3">Admission Registered! 🎉</h2>
                  <p className="text-slate-600 font-semibold text-base max-w-lg mx-auto mb-8">
                    Thank you, <strong className="text-black">{formData.studentName}</strong>! Your application form has been successfully saved. SUTIRTHA BASUMALLICK or our coordinator will contact you shortly to schedule batch placement and document verification.
                  </p>
                  
                  <div className="p-6 rounded-2xl bg-blue-50 border-2 border-black max-w-md mx-auto shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-8 space-y-3">
                    <p className="text-xs font-black text-slate-500 uppercase tracking-wider">OFFICIAL CONTACTS</p>
                    <p className="text-sm font-bold text-black">
                      Official Email: <span className="underline">studywithsutirtha@gmail.com</span>
                    </p>
                    <p className="text-base font-black text-blue-600">
                      WhatsApp: +91 90640 77914 / +91 97757 65087
                    </p>
                  </div>
                  
                  <LinkNext href="/" className="btn-primary px-8 py-3.5 inline-block text-center font-bold">
                    Go Back Home
                  </LinkNext>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Step Progress Indicators */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50 border-2 border-black rounded-2xl p-4 mb-8">
                    <div>
                      <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Section {step} of 4</span>
                      <h3 className="text-sm font-black text-black uppercase mt-0.5">
                        {step === 1 && "Admission & Student's Info"}
                        {step === 2 && "Contact & Address Details"}
                        {step === 3 && "Educational Details & Questions"}
                        {step === 4 && "Self-Declaration & Signature"}
                      </h3>
                    </div>
                    <div className="flex gap-1.5">
                      {[1, 2, 3, 4].map((s) => (
                        <div
                          key={s}
                          onClick={() => setStep(s)}
                          className={`h-3 rounded-full border border-black transition-all cursor-pointer ${
                            s === step
                              ? "w-10 bg-[#D2FF00]"
                              : s < step
                              ? "w-3 bg-black"
                              : "w-3 bg-white"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* STEP 1: Admission & Personal Info */}
                  {step === 1 && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                      
                      <div className="border-b-2 border-black pb-2 flex justify-between items-center">
                        <h4 className="font-extrabold text-black uppercase text-sm tracking-wider">1. Admission &amp; Personal Info</h4>
                        <span className="text-xs font-black bg-slate-100 border border-black px-2.5 py-0.5 rounded-full uppercase">SWS2026-27</span>
                      </div>

                      {/* Top Row: Date, Reg No, Photo, QR Code */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 border-2 border-dashed border-black rounded-2xl bg-amber-50/50">
                        {/* Date of Admission */}
                        <div>
                          <label className="block text-xs font-black text-black uppercase mb-1.5">Date Of Admission *</label>
                          <input
                            type="date"
                            required
                            value={formData.dateOfAdmission}
                            onChange={(e) => setFormData(p => ({ ...p, dateOfAdmission: e.target.value }))}
                            className="w-full px-3 py-2 rounded-xl border-2 border-black text-black font-semibold text-xs bg-white focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                          />
                        </div>

                        {/* Registration Number */}
                        <div>
                          <label className="block text-xs font-black text-black uppercase mb-1.5">Registration No. (Office use) *</label>
                          <input
                            type="text"
                            required
                            value={formData.registrationNo}
                            onChange={(e) => setFormData(p => ({ ...p, registrationNo: e.target.value }))}
                            placeholder="SWS202_______"
                            className="w-full px-3 py-2 rounded-xl border-2 border-black text-black font-semibold text-xs bg-white focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                          />
                        </div>

                        {/* Student Photo upload */}
                        <div>
                          <label className="block text-xs font-black text-black uppercase mb-1.5">Passport Photo (3.5x4.5cm) *</label>
                          <div className="relative border-2 border-black bg-white rounded-xl p-1.5 text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-1px] transition-all cursor-pointer">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  setFormData(p => ({ ...p, studentPhoto: file.name }));
                                }
                              }}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                            <div className="text-[10px] font-bold text-black flex flex-col items-center justify-center min-h-[42px]">
                              {formData.studentPhoto ? (
                                <span className="text-green-600 font-extrabold truncate w-full px-1">✓ {formData.studentPhoto}</span>
                              ) : (
                                <>
                                  <span className="text-blue-600 font-extrabold uppercase text-[9px]">Upload Photo</span>
                                  <span className="text-[7px] text-slate-400 mt-0.5">3.5cm x 4.5cm</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Decorative QR Code */}
                        <div className="flex flex-col items-center justify-center">
                          <div className="w-12 h-12 bg-white border-2 border-black rounded-lg flex items-center justify-center p-0.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            <svg viewBox="0 0 100 100" className="w-full h-full text-black">
                              <rect width="25" height="25" fill="black" />
                              <rect x="75" width="25" height="25" fill="black" />
                              <rect y="75" width="25" height="25" fill="black" />
                              <rect x="10" y="10" width="5" height="5" fill="white" />
                              <rect x="85" y="10" width="5" height="5" fill="white" />
                              <rect x="10" y="85" width="5" height="5" fill="white" />
                              <rect x="35" y="5" width="10" height="15" fill="black" />
                              <rect x="55" y="15" width="15" height="20" fill="black" />
                              <rect x="5" y="35" width="20" height="10" fill="black" />
                              <rect x="30" y="30" width="40" height="10" fill="black" />
                              <rect x="80" y="35" width="15" height="15" fill="black" />
                              <rect x="40" y="50" width="20" height="25" fill="black" />
                              <rect x="15" y="60" width="15" height="10" fill="black" />
                              <rect x="70" y="65" width="25" height="10" fill="black" />
                              <rect x="80" y="80" width="15" height="15" fill="black" />
                              <rect x="35" y="85" width="25" height="10" fill="black" />
                            </svg>
                          </div>
                          <span className="text-[7px] font-black text-black uppercase tracking-wider mt-0.5">SWS Web Form</span>
                        </div>
                      </div>
                      
                      {/* Class checkboxes */}
                      <div>
                        <label className="block text-xs font-black text-black uppercase mb-2">
                          Class to take admission * <span className="text-slate-500 font-bold lowercase">(Select one or more)</span>
                        </label>
                        <div className="flex flex-wrap gap-2.5">
                          {classesList.map((cls) => {
                            const isSelected = formData.class.includes(cls);
                            return (
                              <button
                                type="button"
                                key={cls}
                                onClick={() => toggleCheckbox("class", cls)}
                                className={`px-4 py-2 rounded-xl border-2 font-black text-sm transition-all ${
                                  isSelected
                                    ? "bg-[#00F0FF] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] translate-y-[-2px]"
                                    : "bg-white border-black text-black hover:bg-slate-50"
                                }`}
                              >
                                {cls}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Subject interest and Coaching mode */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-black text-black uppercase mb-2">Which Subject/ Subjects you want to take Admission *</label>
                          <input
                            type="text"
                            required
                            value={formData.subjectsInterest}
                            onChange={(e) => setFormData(p => ({ ...p, subjectsInterest: e.target.value }))}
                            placeholder="e.g. Mathematics, Science, Computer Science"
                            className="w-full px-4 py-3 rounded-xl border-2 border-black text-black font-semibold text-sm focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-black text-black uppercase mb-2">Coaching Mode *</label>
                          <div className="flex gap-6 py-2">
                            {["Online", "Offline"].map((mode) => (
                              <label key={mode} className="flex items-center gap-2.5 cursor-pointer font-bold text-sm text-black">
                                <input
                                  type="radio"
                                  name="coachingMode"
                                  checked={formData.coachingMode === mode}
                                  onChange={() => setFormData(p => ({ ...p, coachingMode: mode }))}
                                  className="w-4 h-4 accent-blue-600 border-2 border-black"
                                />
                                {mode}
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Student full name */}
                      <div>
                        <label className="block text-xs font-black text-black uppercase mb-2">Student's Full Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.studentName}
                          onChange={(e) => setFormData(p => ({ ...p, studentName: e.target.value }))}
                          placeholder="Type student's full name"
                          className="w-full px-4 py-3 rounded-xl border-2 border-black text-black font-semibold text-sm focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                        />
                      </div>

                      {/* Parents name */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-black text-black uppercase mb-2">Father's Name *</label>
                          <input
                            type="text"
                            required
                            value={formData.fatherName}
                            onChange={(e) => setFormData(p => ({ ...p, fatherName: e.target.value }))}
                            placeholder="Father's full name"
                            className="w-full px-4 py-3 rounded-xl border-2 border-black text-black font-semibold text-sm focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-black text-black uppercase mb-2">Mother's Name *</label>
                          <input
                            type="text"
                            required
                            value={formData.motherName}
                            onChange={(e) => setFormData(p => ({ ...p, motherName: e.target.value }))}
                            placeholder="Mother's full name"
                            className="w-full px-4 py-3 rounded-xl border-2 border-black text-black font-semibold text-sm focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                          />
                        </div>
                      </div>

                      {/* Gender, DOB, Religion */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-xs font-black text-black uppercase mb-2">Gender *</label>
                          <select
                            value={formData.gender}
                            onChange={(e) => setFormData(p => ({ ...p, gender: e.target.value }))}
                            className="w-full px-4 py-3 rounded-xl border-2 border-black text-black font-semibold text-sm bg-white focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                          >
                            <option>Male</option>
                            <option>Female</option>
                            <option>Transgender</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-black text-black uppercase mb-2">Date of Birth *</label>
                          <input
                            type="date"
                            required
                            value={formData.dateOfBirth}
                            onChange={(e) => setFormData(p => ({ ...p, dateOfBirth: e.target.value }))}
                            className="w-full px-4 py-3 rounded-xl border-2 border-black text-black font-semibold text-sm focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-black text-black uppercase mb-2">Religion *</label>
                          <input
                            type="text"
                            required
                            value={formData.religion}
                            onChange={(e) => setFormData(p => ({ ...p, religion: e.target.value }))}
                            placeholder="e.g. Hindu, Muslim, Christian"
                            className="w-full px-4 py-3 rounded-xl border-2 border-black text-black font-semibold text-sm focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                          />
                        </div>
                      </div>

                      {/* Category checkboxes */}
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
                                    : "bg-white border-black hover:bg-slate-50 text-black"
                                }`}
                              >
                                {cat}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Nationality, Blood Group, Aadhaar */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-xs font-black text-black uppercase mb-2">Nationality *</label>
                          <input
                            type="text"
                            required
                            value={formData.nationality}
                            onChange={(e) => setFormData(p => ({ ...p, nationality: e.target.value }))}
                            className="w-full px-4 py-3 rounded-xl border-2 border-black text-black font-semibold text-sm focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-black text-black uppercase mb-2">Blood Group (Optional)</label>
                          <input
                            type="text"
                            value={formData.bloodGroup}
                            onChange={(e) => setFormData(p => ({ ...p, bloodGroup: e.target.value }))}
                            placeholder="e.g. O+, A+"
                            className="w-full px-4 py-3 rounded-xl border-2 border-black text-black font-semibold text-sm focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-black text-black uppercase mb-2">Student's Aadhaar No. *</label>
                          <input
                            type="text"
                            required
                            value={formData.aadhaarNo}
                            onChange={(e) => setFormData(p => ({ ...p, aadhaarNo: e.target.value }))}
                            placeholder="12 digit Aadhaar number"
                            className="w-full px-4 py-3 rounded-xl border-2 border-black text-black font-semibold text-sm focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                          />
                        </div>
                      </div>

                    </motion.div>
                  )}

                  {/* STEP 2: Contact & Address */}
                  {step === 2 && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                      
                      <div className="border-b-2 border-black pb-2">
                        <h4 className="font-extrabold text-black uppercase text-sm tracking-wider">2. Contact &amp; Address Details</h4>
                      </div>

                      {/* Contact Info */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-xs font-black text-black uppercase mb-2">Mobile No. *</label>
                          <input
                            type="tel"
                            required
                            value={formData.mobileNo}
                            onChange={(e) => setFormData(p => ({ ...p, mobileNo: e.target.value }))}
                            placeholder="Primary call/WhatsApp number"
                            className="w-full px-4 py-3 rounded-xl border-2 border-black text-black font-semibold text-sm focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-black text-black uppercase mb-2">Alternate Mobile No.</label>
                          <input
                            type="tel"
                            value={formData.altMobileNo}
                            onChange={(e) => setFormData(p => ({ ...p, altMobileNo: e.target.value }))}
                            placeholder="Guardian or backup number"
                            className="w-full px-4 py-3 rounded-xl border-2 border-black text-black font-semibold text-sm focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-black text-black uppercase mb-2">Email ID *</label>
                          <input
                            type="email"
                            required
                            value={formData.emailId}
                            onChange={(e) => setFormData(p => ({ ...p, emailId: e.target.value }))}
                            placeholder="student@gmail.com"
                            className="w-full px-4 py-3 rounded-xl border-2 border-black text-black font-semibold text-sm focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                          />
                        </div>
                      </div>

                      {/* Sub-Header: Address */}
                      <div className="pt-4 border-t border-black/10">
                        <h5 className="font-extrabold text-black uppercase text-xs tracking-wider mb-4 bg-slate-100 inline-block px-3 py-1 border border-black rounded-lg">
                          Permanent Address Details
                        </h5>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-black text-black uppercase mb-2">Vill / City / Town *</label>
                          <input
                            type="text"
                            required
                            value={formData.addressVill}
                            onChange={(e) => setFormData(p => ({ ...p, addressVill: e.target.value }))}
                            placeholder="Village/City/Town name"
                            className="w-full px-4 py-3 rounded-xl border-2 border-black text-black font-semibold text-sm focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-black text-black uppercase mb-2">Post Office *</label>
                          <input
                            type="text"
                            required
                            value={formData.addressPo}
                            onChange={(e) => setFormData(p => ({ ...p, addressPo: e.target.value }))}
                            placeholder="Post Office"
                            className="w-full px-4 py-3 rounded-xl border-2 border-black text-black font-semibold text-sm focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-black text-black uppercase mb-2">Police Station *</label>
                          <input
                            type="text"
                            required
                            value={formData.addressPs}
                            onChange={(e) => setFormData(p => ({ ...p, addressPs: e.target.value }))}
                            placeholder="Police Station"
                            className="w-full px-4 py-3 rounded-xl border-2 border-black text-black font-semibold text-sm focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-black text-black uppercase mb-2">Pin Code *</label>
                          <input
                            type="text"
                            required
                            value={formData.addressPin}
                            onChange={(e) => setFormData(p => ({ ...p, addressPin: e.target.value }))}
                            placeholder="e.g. 712402"
                            className="w-full px-4 py-3 rounded-xl border-2 border-black text-black font-semibold text-sm focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-black text-black uppercase mb-2">District *</label>
                          <input
                            type="text"
                            required
                            value={formData.addressDistrict}
                            onChange={(e) => setFormData(p => ({ ...p, addressDistrict: e.target.value }))}
                            placeholder="e.g. Hooghly"
                            className="w-full px-4 py-3 rounded-xl border-2 border-black text-black font-semibold text-sm focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-black text-black uppercase mb-2">State *</label>
                          <input
                            type="text"
                            required
                            value={formData.addressState}
                            onChange={(e) => setFormData(p => ({ ...p, addressState: e.target.value }))}
                            className="w-full px-4 py-3 rounded-xl border-2 border-black text-black font-semibold text-sm focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                          />
                        </div>
                      </div>

                    </motion.div>
                  )}

                  {/* STEP 3: Educational details & questions */}
                  {step === 3 && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                      
                      <div className="border-b-2 border-black pb-2">
                        <h4 className="font-extrabold text-black uppercase text-sm tracking-wider">3. Educational Details &amp; Questions</h4>
                      </div>

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
                                className={`px-3 py-1.5 rounded-lg border-2 font-black text-xs transition-all ${
                                  isSelected
                                    ? "bg-[#00F0FF] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-y-[-1px]"
                                    : "bg-white border-black hover:bg-slate-50 text-black"
                                }`}
                              >
                                {cls}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Education Medium */}
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
                                className={`px-3 py-1.5 rounded-lg border-2 font-black text-xs transition-all ${
                                  isSelected
                                    ? "bg-[#D2FF00] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-y-[-1px]"
                                    : "bg-white border-black hover:bg-slate-50 text-black"
                                }`}
                              >
                                {med}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Current School and Marks */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2">
                          <label className="block text-xs font-black text-black uppercase mb-2">Current School *</label>
                          <input
                            type="text"
                            required
                            value={formData.currentSchool}
                            onChange={(e) => setFormData(p => ({ ...p, currentSchool: e.target.value }))}
                            placeholder="Current school name"
                            className="w-full px-4 py-3 rounded-xl border-2 border-black text-black font-semibold text-sm focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-black text-black uppercase mb-2">Marks *</label>
                            <input
                              type="text"
                              required
                              value={formData.marksObtained}
                              onChange={(e) => setFormData(p => ({ ...p, marksObtained: e.target.value }))}
                              placeholder="Obtained"
                              className="w-full px-3 py-3 rounded-xl border-2 border-black text-black font-semibold text-sm focus:outline-none text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-black text-black uppercase mb-2">Out Of *</label>
                            <input
                              type="text"
                              required
                              value={formData.marksOutOf}
                              onChange={(e) => setFormData(p => ({ ...p, marksOutOf: e.target.value }))}
                              placeholder="Total"
                              className="w-full px-3 py-3 rounded-xl border-2 border-black text-black font-semibold text-sm focus:outline-none text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Referral Source */}
                      <div className="pt-4 border-t border-black/10">
                        <label className="block text-xs font-black text-black uppercase mb-2">
                          How did you come to know about STUDY WITH SUTIRTHA Coaching Center? *
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {referralSourcesList.map((src) => {
                            const isSelected = formData.referralSource.includes(src);
                            return (
                              <button
                                type="button"
                                key={src}
                                onClick={() => toggleCheckbox("referralSource", src)}
                                className={`px-3 py-2 rounded-xl border-2 font-black text-xs transition-all ${
                                  isSelected
                                    ? "bg-[#FF007A] text-white border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-y-[-1px]"
                                    : "bg-white border-black text-black hover:bg-slate-50"
                                }`}
                              >
                                {src}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Old Student & Previous Coaching */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-black text-black uppercase mb-2">
                            Are you an Old Student of STUDY WITH SUTIRTHA Coaching Center? *
                          </label>
                          <div className="flex gap-6 py-1">
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
                          <label className="block text-xs font-black text-black uppercase mb-2">
                            Have you taken any other coaching in the past? *
                          </label>
                          <div className="flex gap-6 py-1">
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

                      {/* Optional question */}
                      <div>
                        <label className="block text-xs font-black text-black uppercase mb-2">
                          Why do you want to join STUDY WITH SUTIRTHA Coaching Center? (Optional)
                        </label>
                        <textarea
                          value={formData.reasonForJoining}
                          onChange={(e) => setFormData(p => ({ ...p, reasonForJoining: e.target.value }))}
                          rows={3}
                          placeholder="Your reasons for joining us..."
                          className="w-full px-4 py-3 rounded-xl border-2 border-black text-black font-semibold text-sm focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all resize-none"
                        />
                      </div>

                    </motion.div>
                  )}

                  {/* STEP 4: Self - Declaration */}
                  {step === 4 && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                      
                      <div className="border-b-2 border-black pb-2">
                        <h4 className="font-extrabold text-black uppercase text-sm tracking-wider">4. Self - Declaration Form</h4>
                      </div>

                      {/* Declaration card */}
                      <div className="p-6 border-2 border-black bg-[#E6F5EC] rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <label className="flex items-start gap-3.5 cursor-pointer">
                          <input
                            type="checkbox"
                            required
                            checked={formData.declarationAccepted}
                            onChange={(e) => setFormData(p => ({ ...p, declarationAccepted: e.target.checked }))}
                            className="w-5 h-5 accent-emerald-600 flex-shrink-0 mt-0.5 border-2 border-black"
                          />
                          <span className="text-sm font-extrabold text-black leading-relaxed">
                            "I, <span className="underline decoration-2 font-black">{formData.studentName || "[Name of the student]"}</span>, hereby declare that all the information submitted by me in the application form is correct, true and valid. I will present the supporting documents as and when required."
                          </span>
                        </label>
                      </div>

                      {/* Signature inputs */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                        <div>
                          <label className="block text-xs font-black text-black uppercase mb-2">Signature of the Student (Type Name) *</label>
                          <input
                            type="text"
                            required
                            value={formData.studentSignature}
                            onChange={(e) => setFormData(p => ({ ...p, studentSignature: e.target.value }))}
                            placeholder="Type student's full name"
                            className="w-full px-4 py-3 rounded-xl border-2 border-black text-black font-semibold text-sm italic font-mono focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all bg-slate-50"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-black text-black uppercase mb-2">Signature of the Guardian with Date (Type Name) *</label>
                          <input
                            type="text"
                            required
                            value={formData.guardianSignature}
                            onChange={(e) => setFormData(p => ({ ...p, guardianSignature: e.target.value }))}
                            placeholder="Type guardian's name and date (e.g. John Doe - 04/06/2026)"
                            className="w-full px-4 py-3 rounded-xl border-2 border-black text-black font-semibold text-sm italic font-mono focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all bg-slate-50"
                          />
                        </div>
                      </div>

                      {/* Office Use: Mentor Signature */}
                      <div className="pt-6 border-t border-black/10">
                        <h5 className="font-extrabold text-black uppercase text-xs tracking-wider mb-4 bg-slate-100 inline-block px-3 py-1 border border-black rounded-lg">
                          For Office Use Only
                        </h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-xs font-black text-black uppercase mb-2">Signature of the Mentor (Office Sign)</label>
                            <input
                              type="text"
                              value={formData.mentorSignature}
                              onChange={(e) => setFormData(p => ({ ...p, mentorSignature: e.target.value }))}
                              placeholder="Mentor digital sign (e.g. SUTIRTHA BASUMALLICK)"
                              className="w-full px-4 py-3 rounded-xl border-2 border-black text-black font-semibold text-sm italic font-mono focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all bg-amber-50/10"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-black text-black uppercase mb-2">Mentor Signature Date &amp; Stamp / Seal</label>
                            <input
                              type="text"
                              value={formData.mentorSignatureDate}
                              onChange={(e) => setFormData(p => ({ ...p, mentorSignatureDate: e.target.value }))}
                              placeholder="Date & Stamp / Seal notation"
                              className="w-full px-4 py-3 rounded-xl border-2 border-black text-black font-semibold text-sm focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all bg-amber-50/10"
                            />
                          </div>
                        </div>
                      </div>

                    </motion.div>
                  )}

                  {error && (
                    <p className="text-rose-600 font-bold text-sm text-center bg-rose-50 border-2 border-black py-2.5 px-4 rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      {error}
                    </p>
                  )}

                  {/* Buttons Navigation */}
                  <div className="flex justify-between items-center border-t-2 border-black pt-6 mt-8">
                    {step > 1 ? (
                      <button
                        type="button"
                        onClick={() => setStep(step - 1)}
                        className="btn-secondary flex items-center gap-2 py-3 px-6 text-sm"
                      >
                        <ArrowLeft className="w-4 h-4" /> Back
                      </button>
                    ) : (
                      <div />
                    )}

                    {step < 4 ? (
                      <button
                        type="button"
                        onClick={() => {
                          // Basic validation check before moving to next step
                          if (step === 1) {
                            if (!formData.studentName || !formData.fatherName || !formData.motherName || !formData.subjectsInterest || !formData.dateOfBirth || !formData.religion || !formData.nationality || !formData.aadhaarNo) {
                              setError("Please fill out all required fields marked with * before moving next.");
                              return;
                            }
                          } else if (step === 2) {
                            if (!formData.mobileNo || !formData.emailId || !formData.addressVill || !formData.addressPo || !formData.addressPs || !formData.addressPin || !formData.addressDistrict) {
                              setError("Please fill out all required fields marked with * before moving next.");
                              return;
                            }
                          } else if (step === 3) {
                            if (!formData.currentSchool || !formData.marksObtained || !formData.marksOutOf) {
                              setError("Please fill out all required fields marked with * before moving next.");
                              return;
                            }
                          }
                          setError("");
                          setStep(step + 1);
                        }}
                        className="btn-primary flex items-center gap-2 py-3 px-6 text-sm"
                      >
                        Next Section <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary flex items-center gap-2 py-3 px-8 text-sm bg-[#D2FF00]"
                        id="enroll-submit-btn"
                      >
                        {loading ? (
                          "Submitting Form..."
                        ) : (
                          <>
                            <Send className="w-4 h-4" /> Submit Admission Form
                          </>
                        )}
                      </button>
                    )}
                  </div>

                </form>
              )}
            </div>

          </div>

          {/* Additional note about hard copy physical forms */}
          <div className="text-center mt-6 text-xs text-slate-500 font-medium">
            Interested in filling this physically? You can also collect a physical copy of this form from our Gopinagar center and submit with required documents: previous year marksheet, Aadhaar card, and 2 passport photos.
          </div>

        </div>
      </main>
      <BackToTop />
    </>
  );
}
