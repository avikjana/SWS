import fs from "fs";
import path from "path";
import crypto from "crypto";

// ===== Types =====
export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  classNum: string; // E.g. "1", "2", "3", "9", etc.
  passwordHash: string;
  isApproved: boolean;
  createdAt: string;
}

export interface AdminUser {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
}

export interface Note {
  id: string;
  title: string;
  subject: string;
  classNum: string; // E.g. "1", "2", "3", "9", etc.
  content: string; // HTML content
  createdAt: string;
  updatedAt: string;
}

export interface Session {
  token: string;
  userId: string;
  role: "student" | "admin";
  expiresAt: string;
}

export interface Database {
  students: Student[];
  admins: AdminUser[];
  notes: Note[];
  sessions: Session[];
}

// ===== Helpers =====
const DB_PATH = path.join(process.cwd(), "data", "db.json");

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

export function generateToken(): string {
  return crypto.randomBytes(48).toString("hex");
}

export function generateId(): string {
  return crypto.randomBytes(16).toString("hex");
}

// ===== Database I/O =====
function getDefaultDb(): Database {
  return {
    students: [],
    admins: [
      {
        id: generateId(),
        email: "admin@sws.com",
        passwordHash: hashPassword("admin123"),
        name: "Administrator",
      },
    ],
    notes: [
      {
        id: generateId(),
        title: "Welcome to Study With Sutirtha",
        subject: "General",
        classNum: "5",
        content:
          "<h2>Welcome!</h2><p>Welcome to the student portal. Your study notes and materials will appear here once your account is approved by the admin.</p><p>Stay tuned for upcoming notes on Mathematics, Science, and more!</p>",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    sessions: [],
  };
}

export function readDb(): Database {
  try {
    if (!fs.existsSync(DB_PATH)) {
      const defaultDb = getDefaultDb();
      writeDb(defaultDb);
      return defaultDb;
    }
    const raw = fs.readFileSync(DB_PATH, "utf-8");
    return JSON.parse(raw) as Database;
  } catch {
    const defaultDb = getDefaultDb();
    writeDb(defaultDb);
    return defaultDb;
  }
}

export function writeDb(db: Database): void {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), "utf-8");
}

// ===== Student Operations =====
export function findStudentByEmail(email: string): Student | undefined {
  const db = readDb();
  return db.students.find(
    (s) => s.email.toLowerCase() === email.toLowerCase()
  );
}

export function createStudent(
  name: string,
  email: string,
  phone: string,
  classNum: string,
  password: string
): Student {
  const db = readDb();
  const student: Student = {
    id: generateId(),
    name,
    email: email.toLowerCase(),
    phone,
    classNum,
    passwordHash: hashPassword(password),
    isApproved: false,
    createdAt: new Date().toISOString(),
  };
  db.students.push(student);
  writeDb(db);
  return student;
}

export function toggleStudentApproval(
  studentId: string,
  isApproved: boolean
): Student | null {
  const db = readDb();
  const student = db.students.find((s) => s.id === studentId);
  if (!student) return null;
  student.isApproved = isApproved;
  writeDb(db);
  return student;
}

export function deleteStudent(studentId: string): boolean {
  const db = readDb();
  const idx = db.students.findIndex((s) => s.id === studentId);
  if (idx === -1) return false;
  db.students.splice(idx, 1);
  // Also remove their sessions
  db.sessions = db.sessions.filter((s) => s.userId !== studentId);
  writeDb(db);
  return true;
}

// ===== Admin Operations =====
export function findAdminByEmail(email: string): AdminUser | undefined {
  const db = readDb();
  return db.admins.find((a) => a.email.toLowerCase() === email.toLowerCase());
}

// ===== Session Operations =====
export function createSession(
  userId: string,
  role: "student" | "admin"
): Session {
  const db = readDb();
  // Remove old sessions for this user
  db.sessions = db.sessions.filter((s) => s.userId !== userId);
  const session: Session = {
    token: generateToken(),
    userId,
    role,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
  };
  db.sessions.push(session);
  writeDb(db);
  return session;
}

export function getSession(token: string): Session | null {
  const db = readDb();
  const session = db.sessions.find((s) => s.token === token);
  if (!session) return null;
  if (new Date(session.expiresAt) < new Date()) {
    // Expired — clean up
    db.sessions = db.sessions.filter((s) => s.token !== token);
    writeDb(db);
    return null;
  }
  return session;
}

export function deleteSession(token: string): void {
  const db = readDb();
  db.sessions = db.sessions.filter((s) => s.token !== token);
  writeDb(db);
}

// ===== Notes Operations =====
export function getAllNotes(): Note[] {
  const db = readDb();
  return db.notes.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function createNote(
  title: string,
  subject: string,
  classNum: string,
  content: string
): Note {
  const db = readDb();
  const note: Note = {
    id: generateId(),
    title,
    subject,
    classNum,
    content,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  db.notes.push(note);
  writeDb(db);
  return note;
}

export function updateNote(
  noteId: string,
  title: string,
  subject: string,
  classNum: string,
  content: string
): Note | null {
  const db = readDb();
  const note = db.notes.find((n) => n.id === noteId);
  if (!note) return null;
  note.title = title;
  note.subject = subject;
  note.classNum = classNum;
  note.content = content;
  note.updatedAt = new Date().toISOString();
  writeDb(db);
  return note;
}

export function deleteNote(noteId: string): boolean {
  const db = readDb();
  const idx = db.notes.findIndex((n) => n.id === noteId);
  if (idx === -1) return false;
  db.notes.splice(idx, 1);
  writeDb(db);
  return true;
}
