import { Pool } from "pg";
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

// ===== Helpers =====
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

// ===== CockroachDB Connection Pool =====
const connectionString = process.env.DATABASE_URL || "postgresql://localhost:5432/sws";

let pool: Pool;
let globalWithPg = global as typeof globalThis & {
  pgPool?: Pool;
};

if (!globalWithPg.pgPool) {
  globalWithPg.pgPool = new Pool({
    connectionString,
    ssl: connectionString.includes("localhost") ? false : { rejectUnauthorized: false },
  });
}
pool = globalWithPg.pgPool;

// Initialize Database Tables and Seeding
let dbInitializedPromise: Promise<void> | null = null;

export async function initDb(): Promise<void> {
  if (dbInitializedPromise) return dbInitializedPromise;

  dbInitializedPromise = (async () => {
    try {
      // Create Students Table
      await pool.query(`
        CREATE TABLE IF NOT EXISTS students (
          id VARCHAR(255) PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          phone VARCHAR(255) NOT NULL,
          classNum VARCHAR(50) NOT NULL,
          passwordHash VARCHAR(255) NOT NULL,
          isApproved BOOLEAN DEFAULT FALSE,
          createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `);

      // Create Admins Table
      await pool.query(`
        CREATE TABLE IF NOT EXISTS admins (
          id VARCHAR(255) PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          passwordHash VARCHAR(255) NOT NULL,
          name VARCHAR(255) NOT NULL
        );
      `);

      // Create Notes Table
      await pool.query(`
        CREATE TABLE IF NOT EXISTS notes (
          id VARCHAR(255) PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          subject VARCHAR(255) NOT NULL,
          classNum VARCHAR(50) NOT NULL,
          content TEXT NOT NULL,
          createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `);

      // Create Sessions Table
      await pool.query(`
        CREATE TABLE IF NOT EXISTS sessions (
          token VARCHAR(255) PRIMARY KEY,
          userId VARCHAR(255) NOT NULL,
          role VARCHAR(50) NOT NULL,
          expiresAt TIMESTAMP WITH TIME ZONE NOT NULL
        );
      `);

      // Seed Default Admin
      const adminRes = await pool.query("SELECT COUNT(*) FROM admins");
      if (parseInt(adminRes.rows[0].count, 10) === 0) {
        await pool.query(
          "INSERT INTO admins (id, email, passwordHash, name) VALUES ($1, $2, $3, $4)",
          [generateId(), "admin@sws.com", hashPassword("admin123"), "Administrator"]
        );
      }

      // Seed Default Note
      const noteRes = await pool.query("SELECT COUNT(*) FROM notes");
      if (parseInt(noteRes.rows[0].count, 10) === 0) {
        await pool.query(
          `INSERT INTO notes (id, title, subject, classNum, content, createdAt, updatedAt) 
           VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
          [
            generateId(),
            "Welcome to Study With Sutirtha",
            "General",
            "5",
            "<h2>Welcome!</h2><p>Welcome to the student portal. Your study notes and materials will appear here once your account is approved by the admin.</p><p>Stay tuned for upcoming notes on Mathematics, Science, and more!</p>"
          ]
        );
      }
    } catch (err) {
      console.error("Error initializing CockroachDB tables:", err);
      throw err;
    }
  })();

  return dbInitializedPromise;
}

// ===== Student Operations =====
export async function findStudentByEmail(email: string): Promise<Student | undefined> {
  await initDb();
  const res = await pool.query("SELECT * FROM students WHERE LOWER(email) = $1", [email.toLowerCase()]);
  if (res.rows.length === 0) return undefined;
  
  const row = res.rows[0];
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    classNum: row.classnum,
    passwordHash: row.passwordhash,
    isApproved: row.isapproved,
    createdAt: row.createdat,
  };
}

export async function findStudentById(id: string): Promise<Student | undefined> {
  await initDb();
  const res = await pool.query("SELECT * FROM students WHERE id = $1", [id]);
  if (res.rows.length === 0) return undefined;
  
  const row = res.rows[0];
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    classNum: row.classnum,
    passwordHash: row.passwordhash,
    isApproved: row.isapproved,
    createdAt: row.createdat,
  };
}

export async function createStudent(
  name: string,
  email: string,
  phone: string,
  classNum: string,
  password: string
): Promise<Student> {
  await initDb();
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

  await pool.query(
    "INSERT INTO students (id, name, email, phone, classNum, passwordHash, isApproved, createdAt) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
    [
      student.id,
      student.name,
      student.email,
      student.phone,
      student.classNum,
      student.passwordHash,
      student.isApproved,
      student.createdAt
    ]
  );
  return student;
}

export async function toggleStudentApproval(
  studentId: string,
  isApproved: boolean
): Promise<Student | null> {
  await initDb();
  await pool.query("UPDATE students SET isApproved = $1 WHERE id = $2", [isApproved, studentId]);
  const student = await findStudentById(studentId);
  return student || null;
}

export async function deleteStudent(studentId: string): Promise<boolean> {
  await initDb();
  const res = await pool.query("DELETE FROM students WHERE id = $1", [studentId]);
  await pool.query("DELETE FROM sessions WHERE userId = $1", [studentId]);
  return (res.rowCount ?? 0) > 0;
}

export async function getAllStudents(): Promise<Student[]> {
  await initDb();
  const res = await pool.query("SELECT * FROM students ORDER BY createdAt DESC");
  return res.rows.map((row) => ({
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    classNum: row.classnum,
    passwordHash: row.passwordhash,
    isApproved: row.isapproved,
    createdAt: row.createdat,
  }));
}

// ===== Admin Operations =====
export async function findAdminByEmail(email: string): Promise<AdminUser | undefined> {
  await initDb();
  const res = await pool.query("SELECT * FROM admins WHERE LOWER(email) = $1", [email.toLowerCase()]);
  if (res.rows.length === 0) return undefined;
  
  const row = res.rows[0];
  return {
    id: row.id,
    email: row.email,
    passwordHash: row.passwordhash,
    name: row.name,
  };
}

export async function findAdminById(id: string): Promise<AdminUser | undefined> {
  await initDb();
  const res = await pool.query("SELECT * FROM admins WHERE id = $1", [id]);
  if (res.rows.length === 0) return undefined;
  
  const row = res.rows[0];
  return {
    id: row.id,
    email: row.email,
    passwordHash: row.passwordhash,
    name: row.name,
  };
}

// ===== Session Operations =====
export async function createSession(
  userId: string,
  role: "student" | "admin"
): Promise<Session> {
  await initDb();
  await pool.query("DELETE FROM sessions WHERE userId = $1", [userId]);
  
  const session: Session = {
    token: generateToken(),
    userId,
    role,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  };

  await pool.query(
    "INSERT INTO sessions (token, userId, role, expiresAt) VALUES ($1, $2, $3, $4)",
    [session.token, session.userId, session.role, session.expiresAt]
  );
  return session;
}

export async function getSession(token: string): Promise<Session | null> {
  await initDb();
  const res = await pool.query("SELECT * FROM sessions WHERE token = $1", [token]);
  if (res.rows.length === 0) return null;
  
  const row = res.rows[0];
  const session: Session = {
    token: row.token,
    userId: row.userid,
    role: row.role,
    expiresAt: row.expiresat,
  };

  if (new Date(session.expiresAt) < new Date()) {
    await pool.query("DELETE FROM sessions WHERE token = $1", [token]);
    return null;
  }
  return session;
}

export async function deleteSession(token: string): Promise<void> {
  await initDb();
  await pool.query("DELETE FROM sessions WHERE token = $1", [token]);
}

// ===== Notes Operations =====
export async function getAllNotes(): Promise<Note[]> {
  await initDb();
  const res = await pool.query("SELECT * FROM notes ORDER BY createdAt DESC");
  return res.rows.map((row) => ({
    id: row.id,
    title: row.title,
    subject: row.subject,
    classNum: row.classnum,
    content: row.content,
    createdAt: row.createdat,
    updatedAt: row.updatedat,
  }));
}

export async function createNote(
  title: string,
  subject: string,
  classNum: string,
  content: string
): Promise<Note> {
  await initDb();
  const note: Note = {
    id: generateId(),
    title,
    subject,
    classNum,
    content,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  await pool.query(
    "INSERT INTO notes (id, title, subject, classNum, content, createdAt, updatedAt) VALUES ($1, $2, $3, $4, $5, $6, $7)",
    [
      note.id,
      note.title,
      note.subject,
      note.classNum,
      note.content,
      note.createdAt,
      note.updatedAt
    ]
  );
  return note;
}

export async function updateNote(
  noteId: string,
  title: string,
  subject: string,
  classNum: string,
  content: string
): Promise<Note | null> {
  await initDb();
  const updatedAt = new Date().toISOString();
  await pool.query(
    "UPDATE notes SET title = $1, subject = $2, classNum = $3, content = $4, updatedAt = $5 WHERE id = $6",
    [title, subject, classNum, content, updatedAt, noteId]
  );
  
  const res = await pool.query("SELECT * FROM notes WHERE id = $1", [noteId]);
  if (res.rows.length === 0) return null;
  
  const row = res.rows[0];
  return {
    id: row.id,
    title: row.title,
    subject: row.subject,
    classNum: row.classnum,
    content: row.content,
    createdAt: row.createdat,
    updatedAt: row.updatedat,
  };
}

export async function deleteNote(noteId: string): Promise<boolean> {
  await initDb();
  const res = await pool.query("DELETE FROM notes WHERE id = $1", [noteId]);
  return (res.rowCount ?? 0) > 0;
}
