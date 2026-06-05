"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  LogOut,
  Users,
  BookOpen,
  CheckCircle,
  XCircle,
  Trash2,
  Plus,
  Loader2,
  Home,
  FileText,
  Clock,
  Mail,
  Phone,
  X,
  Save,
  Edit3,
} from "lucide-react";

interface StudentItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  classNum: string;
  isApproved: boolean;
  createdAt: string;
}

interface NoteItem {
  id: string;
  title: string;
  subject: string;
  classNum: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

type Tab = "students" | "notes";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("students");
  const [students, setStudents] = useState<StudentItem[]>([]);
  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Note form
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [editingNote, setEditingNote] = useState<NoteItem | null>(null);
  const [noteForm, setNoteForm] = useState({ title: "", subject: "", classNum: "5", content: "" });
  const [noteFormLoading, setNoteFormLoading] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const meRes = await fetch("/api/auth/me");
      const meData = await meRes.json();
      if (!meRes.ok || !meData.user || meData.user.role !== "admin") {
        router.push("/admin/login");
        return;
      }

      const [studentsRes, notesRes] = await Promise.all([
        fetch("/api/admin/students"),
        fetch("/api/admin/notes"),
      ]);

      if (studentsRes.ok) {
        const sData = await studentsRes.json();
        setStudents(sData.students || []);
      }
      if (notesRes.ok) {
        const nData = await notesRes.json();
        setNotes(nData.notes || []);
      }
    } catch {
      router.push("/admin/login");
    }
    setLoading(false);
  }, [router]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  // Student actions
  const handleToggleApproval = async (studentId: string, isApproved: boolean) => {
    setActionLoading(studentId);
    try {
      const res = await fetch("/api/admin/students", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId, isApproved }),
      });
      if (res.ok) {
        setStudents((prev) =>
          prev.map((s) => (s.id === studentId ? { ...s, isApproved } : s))
        );
      }
    } catch { /* error */ }
    setActionLoading(null);
  };

  const handleDeleteStudent = async (studentId: string) => {
    if (!confirm("Are you sure you want to delete this student?")) return;
    setActionLoading(studentId);
    try {
      const res = await fetch(`/api/admin/students?id=${studentId}`, { method: "DELETE" });
      if (res.ok) {
        setStudents((prev) => prev.filter((s) => s.id !== studentId));
      }
    } catch { /* error */ }
    setActionLoading(null);
  };

  // Note actions
  const handleSaveNote = async () => {
    if (!noteForm.title || !noteForm.subject || !noteForm.classNum || !noteForm.content) return;
    setNoteFormLoading(true);

    try {
      if (editingNote) {
        const res = await fetch("/api/admin/notes", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingNote.id, ...noteForm }),
        });
        if (res.ok) {
          const data = await res.json();
          setNotes((prev) => prev.map((n) => (n.id === editingNote.id ? data.note : n)));
        }
      } else {
        const res = await fetch("/api/admin/notes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(noteForm),
        });
        if (res.ok) {
          const data = await res.json();
          setNotes((prev) => [data.note, ...prev]);
        }
      }
    } catch { /* error */ }

    setNoteFormLoading(false);
    setShowNoteForm(false);
    setEditingNote(null);
    setNoteForm({ title: "", subject: "", classNum: "5", content: "" });
  };

  const handleDeleteNote = async (noteId: string) => {
    if (!confirm("Are you sure you want to delete this note?")) return;
    setActionLoading(noteId);
    try {
      const res = await fetch(`/api/admin/notes?id=${noteId}`, { method: "DELETE" });
      if (res.ok) {
        setNotes((prev) => prev.filter((n) => n.id !== noteId));
      }
    } catch { /* error */ }
    setActionLoading(null);
  };

  const openEditNote = (note: NoteItem) => {
    setEditingNote(note);
    setNoteForm({ title: note.title, subject: note.subject, classNum: note.classNum, content: note.content });
    setShowNoteForm(true);
  };

  const pendingCount = students.filter((s) => !s.isApproved).length;
  const approvedCount = students.filter((s) => s.isApproved).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-sm font-bold text-white/40">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/10">
        <div className="container-xl flex items-center justify-between py-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600 border border-blue-400 flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.3)]">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-sm font-extrabold font-display text-white tracking-tight uppercase">
                Admin Dashboard
              </span>
              <span className="text-[9px] text-white/30 font-bold uppercase tracking-wider mt-0.5">Study With Sutirtha</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {pendingCount > 0 && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-500/10 border border-orange-500/30 rounded-full">
                <Clock className="w-3 h-3 text-orange-400" />
                <span className="text-[10px] font-extrabold text-orange-400 uppercase tracking-wider">{pendingCount} Pending</span>
              </div>
            )}
            <Link href="/" className="p-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
              <Home className="w-4 h-4 text-white/60" />
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-red-500/10 hover:border-red-500/30 text-white/60 hover:text-red-400 text-xs font-bold transition-all"
              id="admin-logout"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="container-xl py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Students", value: students.length, icon: Users, color: "blue" },
            { label: "Approved", value: approvedCount, icon: CheckCircle, color: "green" },
            { label: "Pending", value: pendingCount, icon: Clock, color: "orange" },
            { label: "Total Notes", value: notes.length, icon: BookOpen, color: "purple" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`bg-white/5 border border-white/10 rounded-2xl p-5 relative overflow-hidden`}
            >
              <div className={`absolute top-0 right-0 w-20 h-20 rounded-full blur-[40px] opacity-20 ${
                stat.color === "blue" ? "bg-blue-500" :
                stat.color === "green" ? "bg-green-500" :
                stat.color === "orange" ? "bg-orange-500" : "bg-purple-500"
              }`} />
              <stat.icon className={`w-5 h-5 mb-2 ${
                stat.color === "blue" ? "text-blue-400" :
                stat.color === "green" ? "text-green-400" :
                stat.color === "orange" ? "text-orange-400" : "text-purple-400"
              }`} />
              <p className="text-2xl font-extrabold font-display">{stat.value}</p>
              <p className="text-[11px] font-bold text-white/40 uppercase tracking-wider mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {([
            { key: "students" as Tab, label: "Students", icon: Users },
            { key: "notes" as Tab, label: "Notes", icon: BookOpen },
          ]).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab.key
                  ? "bg-blue-600 text-white border border-blue-400 shadow-[0_0_15px_rgba(37,99,235,0.3)]"
                  : "bg-white/5 text-white/50 border border-white/10 hover:bg-white/10"
              }`}
              id={`tab-${tab.key}`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Students Tab */}
        {activeTab === "students" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            {students.length === 0 ? (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
                <Users className="w-10 h-10 text-white/20 mx-auto mb-3" />
                <p className="text-sm font-bold text-white/40">No students registered yet.</p>
              </div>
            ) : (
              students.map((student, i) => (
                <motion.div
                  key={student.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col md:flex-row md:items-center gap-4"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-extrabold ${
                      student.isApproved
                        ? "bg-green-500/10 border border-green-500/30 text-green-400"
                        : "bg-orange-500/10 border border-orange-500/30 text-orange-400"
                    }`}>
                      {student.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-extrabold text-white truncate">{student.name}</h4>
                        <span className="text-[9px] font-extrabold bg-blue-500/20 text-blue-400 border border-blue-500/30 px-1.5 py-0.5 rounded-md uppercase">
                          Class {student.classNum}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                        <span className="flex items-center gap-1 text-[11px] text-white/40">
                          <Mail className="w-3 h-3" /> {student.email}
                        </span>
                        <span className="flex items-center gap-1 text-[11px] text-white/40">
                          <Phone className="w-3 h-3" /> {student.phone}
                        </span>
                        <span className="text-[10px] text-white/30">
                          {new Date(student.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                      student.isApproved
                        ? "bg-green-500/10 border border-green-500/30 text-green-400"
                        : "bg-orange-500/10 border border-orange-500/30 text-orange-400"
                    }`}>
                      {student.isApproved ? "Approved" : "Pending"}
                    </span>

                    {actionLoading === student.id ? (
                      <Loader2 className="w-4 h-4 text-white/40 animate-spin" />
                    ) : (
                      <>
                        {student.isApproved ? (
                          <button
                            onClick={() => handleToggleApproval(student.id, false)}
                            className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-400 hover:bg-orange-500/20 transition-all"
                            title="Revoke Approval"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleToggleApproval(student.id, true)}
                            className="p-2 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 hover:bg-green-500/20 transition-all"
                            title="Approve Student"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteStudent(student.id)}
                          className="p-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-all"
                          title="Delete Student"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        )}

        {/* Notes Tab */}
        {activeTab === "notes" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex justify-end mb-4">
              <button
                onClick={() => {
                  setEditingNote(null);
                  setNoteForm({ title: "", subject: "", classNum: "5", content: "" });
                  setShowNoteForm(true);
                }}
                className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl border border-blue-400 transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)]"
                id="add-note-btn"
              >
                <Plus className="w-4 h-4" /> Add Note
              </button>
            </div>

            <div className="space-y-3">
              {notes.length === 0 ? (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
                  <BookOpen className="w-10 h-10 text-white/20 mx-auto mb-3" />
                  <p className="text-sm font-bold text-white/40">No notes yet. Add your first note!</p>
                </div>
              ) : (
                notes.map((note, i) => (
                  <motion.div
                     key={note.id}
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: i * 0.03 }}
                     className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col md:flex-row md:items-center gap-4"
                   >
                     <div className="flex items-center gap-3 flex-1 min-w-0">
                       <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                         <FileText className="w-5 h-5 text-purple-400" />
                       </div>
                       <div className="min-w-0 flex-1">
                         <h4 className="text-sm font-extrabold text-white truncate">{note.title}</h4>
                         <div className="flex items-center gap-2 mt-1">
                           <span className="text-[10px] font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/30 uppercase tracking-wider">
                             {note.subject}
                           </span>
                           <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/30 uppercase tracking-wider">
                             Class {note.classNum}
                           </span>
                           <span className="text-[10px] text-white/30">
                             {new Date(note.updatedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                           </span>
                         </div>
                       </div>
                     </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      {actionLoading === note.id ? (
                        <Loader2 className="w-4 h-4 text-white/40 animate-spin" />
                      ) : (
                        <>
                          <button
                            onClick={() => openEditNote(note)}
                            className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:bg-blue-500/20 transition-all"
                            title="Edit Note"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteNote(note.id)}
                            className="p-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-all"
                            title="Delete Note"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* Note Form Modal */}
      <AnimatePresence>
        {showNoteForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-start justify-center bg-black/70 backdrop-blur-sm overflow-y-auto py-8 px-4"
            onClick={() => { setShowNoteForm(false); setEditingNote(null); }}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-2xl bg-[#12121a] border border-white/10 rounded-2xl shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={() => { setShowNoteForm(false); setEditingNote(null); }}
                className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4 text-white/60" />
              </button>

              <div className="p-6 md:p-8">
                <h2 className="text-xl font-extrabold font-display text-white mb-6">
                  {editingNote ? "Edit Note ✏️" : "Add New Note 📝"}
                </h2>

                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-extrabold text-white/60 uppercase tracking-wider mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={noteForm.title}
                      onChange={(e) => setNoteForm((prev) => ({ ...prev, title: e.target.value }))}
                      className="w-full px-4 py-3 border border-white/10 rounded-xl text-sm font-semibold bg-white/5 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="e.g., Chapter 1: Algebraic Expressions"
                      id="note-form-title"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-white/60 uppercase tracking-wider mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={noteForm.subject}
                      onChange={(e) => setNoteForm((prev) => ({ ...prev, subject: e.target.value }))}
                      className="w-full px-4 py-3 border border-white/10 rounded-xl text-sm font-semibold bg-white/5 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="e.g., Mathematics, Science, Physics"
                      id="note-form-subject"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-white/60 uppercase tracking-wider mb-2">
                      Class / Grade
                    </label>
                    <select
                      value={noteForm.classNum}
                      onChange={(e) => setNoteForm((prev) => ({ ...prev, classNum: e.target.value }))}
                      className="w-full px-4 py-3 border border-white/10 rounded-xl text-sm font-semibold bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all cursor-pointer"
                      id="note-form-class"
                    >
                      {[...Array(12)].map((_, i) => (
                        <option key={i + 1} value={String(i + 1)} className="bg-[#12121a] text-white">
                          Class {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-white/60 uppercase tracking-wider mb-2">
                      Content (HTML supported)
                    </label>
                    <textarea
                      value={noteForm.content}
                      onChange={(e) => setNoteForm((prev) => ({ ...prev, content: e.target.value }))}
                      className="w-full px-4 py-3 border border-white/10 rounded-xl text-sm font-semibold bg-white/5 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-mono min-h-[200px] resize-y"
                      placeholder="<h2>Topic Title</h2><p>Your note content here...</p>"
                      id="note-form-content"
                    />
                    <p className="text-[10px] text-white/30 mt-1.5 font-medium">
                      Tip: Use HTML tags like &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt;, &lt;em&gt; for rich formatting.
                    </p>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={handleSaveNote}
                      disabled={noteFormLoading || !noteForm.title || !noteForm.subject || !noteForm.classNum || !noteForm.content}
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl border border-blue-400 transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] disabled:opacity-40 disabled:cursor-not-allowed"
                      id="note-form-save"
                    >
                      {noteFormLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          {editingNote ? "Update Note" : "Save Note"}
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => { setShowNoteForm(false); setEditingNote(null); }}
                      className="px-6 py-3 bg-white/5 border border-white/10 text-white/60 hover:text-white font-bold text-sm rounded-xl transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
