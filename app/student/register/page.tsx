"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { GraduationCap, Mail, Lock, User, Phone, Eye, EyeOff, ArrowRight, CheckCircle } from "lucide-react";

export default function StudentRegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", classNum: "5", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          classNum: form.classNum,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed");
        setLoading(false);
        return;
      }

      setSuccess(true);
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-10 right-10 w-32 h-32 bg-[#00F0FF] rounded-full border-2 border-black opacity-30 animate-float" />
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-[#D2FF00] rounded-2xl border-2 border-black rotate-12 opacity-40 animate-float-delayed" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md bg-white border-2 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8 text-center relative z-10"
        >
          <div className="w-16 h-16 bg-green-100 border-2 border-green-600 rounded-full flex items-center justify-center mx-auto mb-5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-extrabold font-display text-black mb-3">
            Registration Successful! 🎉
          </h2>
          <p className="text-sm text-black/60 font-medium mb-2">
            Your account has been created and is{" "}
            <span className="font-bold text-orange-600">pending admin approval</span>.
          </p>
          <p className="text-sm text-black/50 font-medium mb-6">
            You&apos;ll be able to access study materials once the admin reviews and approves your account.
          </p>
          <Link
            href="/student/login"
            className="btn-primary w-full justify-center py-3"
          >
            Go to Login <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/" className="block mt-4 text-sm font-bold text-black/50 hover:text-black transition-colors">
            ← Back to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-[#FF6B6B] rounded-full border-2 border-black opacity-20 animate-float" />
      <div className="absolute bottom-20 left-10 w-24 h-24 bg-[#00F0FF] rounded-2xl border-2 border-black -rotate-12 opacity-30 animate-float-delayed" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-3 mb-8 group">
          <div className="w-12 h-12 rounded-xl bg-blue-600 border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] group-hover:translate-y-[-2px] group-hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-lg font-extrabold font-display text-black tracking-tight uppercase">
              Study With Sutirtha
            </span>
            <span className="text-[10px] text-black/60 font-bold uppercase tracking-wider mt-0.5">Student Registration</span>
          </div>
        </Link>

        {/* Card */}
        <div className="bg-white border-2 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-extrabold font-display text-black">Create Account 🚀</h1>
            <p className="text-sm text-black/60 mt-2 font-medium">
              Register to get access to study notes & materials
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 p-3 bg-red-50 border-2 border-red-300 rounded-xl text-red-700 text-sm font-semibold text-center"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-extrabold text-black uppercase tracking-wider mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border-2 border-black rounded-xl text-sm font-semibold bg-white text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:shadow-[3px_3px_0px_0px_rgba(37,99,235,1)]"
                  placeholder="Enter your full name"
                  required
                  id="student-register-name"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-extrabold text-black uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border-2 border-black rounded-xl text-sm font-semibold bg-white text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:shadow-[3px_3px_0px_0px_rgba(37,99,235,1)]"
                  placeholder="you@example.com"
                  required
                  id="student-register-email"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-extrabold text-black uppercase tracking-wider mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border-2 border-black rounded-xl text-sm font-semibold bg-white text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:shadow-[3px_3px_0px_0px_rgba(37,99,235,1)]"
                  placeholder="+91-XXXXXXXXXX"
                  required
                  id="student-register-phone"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-extrabold text-black uppercase tracking-wider mb-2">
                Class / Grade
              </label>
              <div className="relative">
                <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-black/40" />
                <select
                  value={form.classNum}
                  onChange={(e) => handleChange("classNum", e.target.value)}
                  className="w-full pl-11 pr-10 py-3 border-2 border-black rounded-xl text-sm font-semibold bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:shadow-[3px_3px_0px_0px_rgba(37,99,235,1)] appearance-none cursor-pointer"
                  required
                  id="student-register-class"
                >
                  {[...Array(12)].map((_, i) => (
                    <option key={i + 1} value={String(i + 1)}>
                      Class {i + 1}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-black/60">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-extrabold text-black uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  className="w-full pl-11 pr-12 py-3 border-2 border-black rounded-xl text-sm font-semibold bg-white text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:shadow-[3px_3px_0px_0px_rgba(37,99,235,1)]"
                  placeholder="Min. 6 characters"
                  required
                  id="student-register-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-black/40 hover:text-black transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-extrabold text-black uppercase tracking-wider mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={(e) => handleChange("confirmPassword", e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border-2 border-black rounded-xl text-sm font-semibold bg-white text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:shadow-[3px_3px_0px_0px_rgba(37,99,235,1)]"
                  placeholder="Re-enter password"
                  required
                  id="student-register-confirm-password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-3.5 text-base disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              id="student-register-submit"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                <>
                  Create Account <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-5 text-center">
            <p className="text-sm text-black/60 font-medium">
              Already have an account?{" "}
              <Link href="/student/login" className="text-blue-600 font-bold hover:underline">
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm font-bold text-black/50 hover:text-black transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
