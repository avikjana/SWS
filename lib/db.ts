import { MongoClient } from "mongodb";
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

// ===== MongoDB Connection Layer =====
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/sws";
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR.
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect().then(async (c) => {
      await seedDefaultDbIfEmpty(c.db());
      return c;
    });
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect().then(async (c) => {
    await seedDefaultDbIfEmpty(c.db());
    return c;
  });
}

async function seedDefaultDbIfEmpty(db: any) {
  try {
    const adminCount = await db.collection("admins").countDocuments();
    if (adminCount === 0) {
      await db.collection("admins").insertOne({
        id: generateId(),
        email: "admin@sws.com",
        passwordHash: hashPassword("admin123"),
        name: "Administrator",
      });
    }

    const noteCount = await db.collection("notes").countDocuments();
    if (noteCount === 0) {
      await db.collection("notes").insertOne({
        id: generateId(),
        title: "Welcome to Study With Sutirtha",
        subject: "General",
        classNum: "5",
        content:
          "<h2>Welcome!</h2><p>Welcome to the student portal. Your study notes and materials will appear here once your account is approved by the admin.</p><p>Stay tuned for upcoming notes on Mathematics, Science, and more!</p>",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
  } catch (err) {
    console.error("Error seeding default DB data:", err);
  }
}

// ===== Student Operations =====
export async function findStudentByEmail(email: string): Promise<Student | undefined> {
  const client = await clientPromise;
  const db = client.db();
  const student = await db.collection<Student>("students").findOne({ email: email.toLowerCase() });
  return student || undefined;
}

export async function createStudent(
  name: string,
  email: string,
  phone: string,
  classNum: string,
  password: string
): Promise<Student> {
  const client = await clientPromise;
  const db = client.db();
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
  await db.collection("students").insertOne(student);
  return student;
}

export async function toggleStudentApproval(
  studentId: string,
  isApproved: boolean
): Promise<Student | null> {
  const client = await clientPromise;
  const db = client.db();
  
  await db.collection("students").updateOne(
    { id: studentId },
    { $set: { isApproved } }
  );
  
  const student = await db.collection<Student>("students").findOne({ id: studentId });
  return student || null;
}

export async function deleteStudent(studentId: string): Promise<boolean> {
  const client = await clientPromise;
  const db = client.db();
  const res = await db.collection("students").deleteOne({ id: studentId });
  // Also remove their sessions
  await db.collection("sessions").deleteMany({ userId: studentId });
  return res.deletedCount > 0;
}

export async function getAllStudents(): Promise<Student[]> {
  const client = await clientPromise;
  const db = client.db();
  return db.collection<Student>("students").find().toArray();
}

// ===== Admin Operations =====
export async function findAdminByEmail(email: string): Promise<AdminUser | undefined> {
  const client = await clientPromise;
  const db = client.db();
  const admin = await db.collection<AdminUser>("admins").findOne({ email: email.toLowerCase() });
  return admin || undefined;
}

export async function findAdminById(id: string): Promise<AdminUser | undefined> {
  const client = await clientPromise;
  const db = client.db();
  const admin = await db.collection<AdminUser>("admins").findOne({ id });
  return admin || undefined;
}

export async function findStudentById(id: string): Promise<Student | undefined> {
  const client = await clientPromise;
  const db = client.db();
  const student = await db.collection<Student>("students").findOne({ id });
  return student || undefined;
}

// ===== Session Operations =====
export async function createSession(
  userId: string,
  role: "student" | "admin"
): Promise<Session> {
  const client = await clientPromise;
  const db = client.db();
  // Remove old sessions for this user
  await db.collection("sessions").deleteMany({ userId });
  const session: Session = {
    token: generateToken(),
    userId,
    role,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
  };
  await db.collection("sessions").insertOne(session);
  return session;
}

export async function getSession(token: string): Promise<Session | null> {
  const client = await clientPromise;
  const db = client.db();
  const session = await db.collection<Session>("sessions").findOne({ token });
  if (!session) return null;
  if (new Date(session.expiresAt) < new Date()) {
    // Expired — clean up
    await db.collection("sessions").deleteOne({ token });
    return null;
  }
  return session;
}

export async function deleteSession(token: string): Promise<void> {
  const client = await clientPromise;
  const db = client.db();
  await db.collection("sessions").deleteOne({ token });
}

// ===== Notes Operations =====
export async function getAllNotes(): Promise<Note[]> {
  const client = await clientPromise;
  const db = client.db();
  const notes = await db.collection<Note>("notes").find().toArray();
  return notes.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function createNote(
  title: string,
  subject: string,
  classNum: string,
  content: string
): Promise<Note> {
  const client = await clientPromise;
  const db = client.db();
  const note: Note = {
    id: generateId(),
    title,
    subject,
    classNum,
    content,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  await db.collection("notes").insertOne(note);
  return note;
}

export async function updateNote(
  noteId: string,
  title: string,
  subject: string,
  classNum: string,
  content: string
): Promise<Note | null> {
  const client = await clientPromise;
  const db = client.db();
  
  await db.collection("notes").updateOne(
    { id: noteId },
    { $set: { title, subject, classNum, content, updatedAt: new Date().toISOString() } }
  );
  
  const note = await db.collection<Note>("notes").findOne({ id: noteId });
  return note || null;
}

export async function deleteNote(noteId: string): Promise<boolean> {
  const client = await clientPromise;
  const db = client.db();
  const res = await db.collection("notes").deleteOne({ id: noteId });
  return res.deletedCount > 0;
}

