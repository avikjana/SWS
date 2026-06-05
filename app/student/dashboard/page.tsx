"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  LogOut,
  BookOpen,
  Clock,
  Shield,
  ChevronRight,
  FileText,
  Loader2,
  AlertTriangle,
  Home,
  X,
} from "lucide-react";
import { SecureViewer } from "@/components/ui/SecureViewer";

interface NoteItem {
  id: string;
  title: string;
  subject: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface UserInfo {
  id: string;
  name: string;
  email: string;
  role: string;
  isApproved: boolean;
}

export default function StudentDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserInfo | null>(null);
  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [selectedNote, setSelectedNote] = useState<NoteItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [notesLoading, setNotesLoading] = useState(false);
  const [pendingApproval, setPendingApproval] = useState(false);

  const fetchUser = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      if (!res.ok || !data.user || data.user.role !== "student") {
        router.push("/student/login");
        return;
      }
      setUser(data.user);
      if (!data.user.isApproved) {
        setPendingApproval(true);
        setLoading(false);
        return;
      }
      // Fetch notes
      fetchNotes();
    } catch {
      router.push("/student/login");
    }
  }, [router]);

  const fetchNotes = async () => {
    setNotesLoading(true);
    try {
      const res = await fetch("/api/notes");
      const data = await res.json();
      if (res.status === 403) {
        setPendingApproval(true);
        setNotesLoading(false);
        setLoading(false);
        return;
      }
      if (res.ok) {
        setNotes(data.notes || []);
      }
    } catch {
      // Error fetching notes
    }
    setNotesLoading(false);
    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/student/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-sm font-bold text-black/50">Loading your portal...</p>
        </div>
      </div>
    );
  }

  // Pending Approval Screen
  if (pendingApproval) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-orange-300 rounded-full border-2 border-black opacity-20 animate-float" />
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-[#D2FF00] rounded-2xl border-2 border-black rotate-12 opacity-30 animate-float-delayed" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white border-2 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8 text-center relative z-10"
        >
          <div className="w-16 h-16 bg-orange-100 border-2 border-orange-500 rounded-full flex items-center justify-center mx-auto mb-5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <Clock className="w-8 h-8 text-orange-500" />
          </div>
          <h2 className="text-2xl font-extrabold font-display text-black mb-3">
            Approval Pending ⏳
          </h2>
          <p className="text-sm text-black/60 font-medium mb-2">
            Hi <span className="font-bold text-black">{user?.name}</span>, your account is awaiting admin approval.
          </p>
          <p className="text-sm text-black/50 font-medium mb-6">
            Once approved, you&apos;ll be able to access all study notes and materials. Please check back later!
          </p>
          <div className="space-y-3">
            <button
              onClick={handleLogout}
              className="btn-secondary w-full justify-center py-3"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
            <Link href="/" className="block text-sm font-bold text-black/50 hover:text-black transition-colors">
              ← Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 bg-white border-b-2 border-black shadow-[0_3px_0px_0px_rgba(0,0,0,1)]">
        <div className="container-xl flex items-center justify-between py-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-blue-600 border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-sm font-extrabold font-display text-black tracking-tight uppercase">
                Student Portal
              </span>
              <span className="text-[9px] text-black/50 font-bold uppercase tracking-wider mt-0.5">Study With Sutirtha</span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-green-100 border-2 border-green-500 rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <Shield className="w-3 h-3 text-green-600" />
              <span className="text-[10px] font-extrabold text-green-700 uppercase tracking-wider">Approved</span>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-black flex items-center justify-center">
                <span className="text-xs font-extrabold text-blue-700">{user?.name?.charAt(0).toUpperCase()}</span>
              </div>
              <span className="text-xs font-bold text-black">{user?.name}</span>
            </div>
            <Link href="/" className="p-2 rounded-xl border-2 border-black bg-white hover:bg-gray-50 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none">
              <Home className="w-4 h-4 text-black" />
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border-2 border-black bg-white hover:bg-red-50 text-black hover:text-red-600 text-xs font-bold transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
              id="student-logout"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="container-xl py-8">
        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-600 to-blue-700 border-2 border-black rounded-2xl shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8 mb-8 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative z-10">
            <h1 className="text-2xl md:text-3xl font-extrabold font-display mb-2">
              Welcome back, {user?.name}! 📚
            </h1>
            <p className="text-sm text-white/80 font-medium">
              Access your study notes and materials below. All content is view-only and secured.
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/15 rounded-full text-xs font-bold">
                <GraduationCap className="w-3.5 h-3.5" /> Class {user?.classNum}
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/15 rounded-full text-xs font-bold">
                <BookOpen className="w-3.5 h-3.5" /> {notes.length} Notes Available
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/15 rounded-full text-xs font-bold">
                <Shield className="w-3.5 h-3.5" /> Secure Viewing
              </div>
            </div>
          </div>
        </motion.div>

        {/* Notes Section */}
        <div className="mb-4">
          <h2 className="text-xl font-extrabold font-display text-black flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            Study Materials
          </h2>
          <p className="text-sm text-black/50 font-medium mt-1">
            Click on any note to view it in the secure viewer
          </p>
        </div>

        {notesLoading ? (
          <div className="text-center py-16">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-3" />
            <p className="text-sm font-bold text-black/50">Loading notes...</p>
          </div>
        ) : notes.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white border-2 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-12 text-center"
          >
            <div className="w-16 h-16 bg-gray-100 border-2 border-black rounded-full flex items-center justify-center mx-auto mb-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <AlertTriangle className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-extrabold font-display text-black mb-2">No Notes Yet</h3>
            <p className="text-sm text-black/50 font-medium">
              The admin hasn&apos;t added any study materials yet. Check back soon!
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map((note, i) => (
              <motion.button
                key={note.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedNote(note)}
                className="text-left bg-white border-2 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-5 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all group"
                id={`note-card-${note.id}`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 border-2 border-black flex items-center justify-center flex-shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:bg-blue-200 transition-colors">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-extrabold text-black line-clamp-2 font-display">
                      {note.title}
                    </h3>
                    <span className="inline-block mt-1 text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200 uppercase tracking-wider">
                      {note.subject}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-black/40 font-semibold">
                    {new Date(note.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </span>
                  <div className="flex items-center gap-1 text-blue-600 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    View <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </div>

      {/* Note Viewer Modal */}
      <AnimatePresence>
        {selectedNote && user && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-start justify-center bg-black/50 backdrop-blur-sm overflow-y-auto py-8 px-4"
            onClick={() => setSelectedNote(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-3xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedNote(null)}
                className="absolute -top-3 -right-3 z-10 w-10 h-10 bg-red-500 border-2 border-black rounded-full flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-red-600 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
                id="close-note-viewer"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              <SecureViewer
                htmlContent={selectedNote.content}
                studentEmail={user.email}
                title={selectedNote.title}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
