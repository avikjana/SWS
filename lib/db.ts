import { MongoClient, Db } from "mongodb";
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

// ===== MongoDB Connection Pool =====
const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env");
}

let globalWithMongo = global as typeof globalThis & {
  mongoClient?: MongoClient;
  mongoDb?: Db;
  dbInitializedPromise?: Promise<void>;
};

if (!globalWithMongo.mongoClient) {
  globalWithMongo.mongoClient = new MongoClient(uri, {
    maxPoolSize: 10,
    minPoolSize: 2,
    maxIdleTimeMS: 30000,
  });
}

const client = globalWithMongo.mongoClient;
let db: Db = globalWithMongo.mongoDb!;

export async function initDb(): Promise<void> {
  if (globalWithMongo.dbInitializedPromise) {
    db = globalWithMongo.mongoDb!;
    return globalWithMongo.dbInitializedPromise;
  }

  globalWithMongo.dbInitializedPromise = (async () => {
    try {
      await client.connect();
      const connectedDb = client.db();
      db = connectedDb;
      globalWithMongo.mongoDb = connectedDb;

      // Create Indexes for optimized query execution
      await db.collection("students").createIndex({ email: 1 }, { unique: true });
      await db.collection("students").createIndex({ createdAt: -1 });
      await db.collection("admins").createIndex({ email: 1 }, { unique: true });
      await db.collection("sessions").createIndex({ userId: 1 });
      await db.collection("notes").createIndex({ createdAt: -1 });

      // Seed Default Admin
      const adminRes = await db.collection("admins").countDocuments();
      if (adminRes === 0) {
        await db.collection("admins").insertOne({
          _id: generateId(),
          email: "admin@sws.com",
          passwordHash: hashPassword("admin123"),
          name: "Administrator"
        });
      }

      // Seed Default Note
      const noteRes = await db.collection("notes").countDocuments();
      if (noteRes === 0) {
        await db.collection("notes").insertOne({
          _id: generateId(),
          title: "Welcome to Study With Sutirtha",
          subject: "General",
          classNum: "5",
          content: "<h2>Welcome!</h2><p>Welcome to the student portal. Your study notes and materials will appear here once your account is approved by the admin.</p><p>Stay tuned for upcoming notes on Mathematics, Science, and more!</p>",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      }
    } catch (err) {
      console.error("Error initializing MongoDB connection:", err);
      globalWithMongo.dbInitializedPromise = undefined;
      throw err;
    }
  })();

  return globalWithMongo.dbInitializedPromise;
}

// ===== Helper Note Finder =====
async function findNoteById(id: string): Promise<Note | null> {
  const doc = await db.collection("notes").findOne({ _id: id });
  if (!doc) return null;
  return {
    id: doc._id,
    title: doc.title,
    subject: doc.subject,
    classNum: doc.classNum,
    content: doc.content,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt
  };
}

// ===== Student Operations =====
export async function findStudentByEmail(email: string): Promise<Student | undefined> {
  await initDb();
  const doc = await db.collection("students").findOne({ email: email.toLowerCase() });
  if (!doc) return undefined;
  
  return {
    id: doc._id,
    name: doc.name,
    email: doc.email,
    phone: doc.phone,
    classNum: doc.classNum,
    passwordHash: doc.passwordHash,
    isApproved: doc.isApproved,
    createdAt: doc.createdAt,
  };
}

export async function findStudentById(id: string): Promise<Student | undefined> {
  await initDb();
  const doc = await db.collection("students").findOne({ _id: id });
  if (!doc) return undefined;
  
  return {
    id: doc._id,
    name: doc.name,
    email: doc.email,
    phone: doc.phone,
    classNum: doc.classNum,
    passwordHash: doc.passwordHash,
    isApproved: doc.isApproved,
    createdAt: doc.createdAt,
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
  const student = {
    _id: generateId(),
    name,
    email: email.toLowerCase(),
    phone,
    classNum,
    passwordHash: hashPassword(password),
    isApproved: false,
    createdAt: new Date().toISOString(),
  };

  await db.collection("students").insertOne(student);
  
  return {
    id: student._id,
    name: student.name,
    email: student.email,
    phone: student.phone,
    classNum: student.classNum,
    passwordHash: student.passwordHash,
    isApproved: student.isApproved,
    createdAt: student.createdAt
  };
}

export async function toggleStudentApproval(
  studentId: string,
  isApproved: boolean
): Promise<Student | null> {
  await initDb();
  await db.collection("students").updateOne({ _id: studentId }, { $set: { isApproved } });
  const student = await findStudentById(studentId);
  return student || null;
}

export async function deleteStudent(studentId: string): Promise<boolean> {
  await initDb();
  const res = await db.collection("students").deleteOne({ _id: studentId });
  await db.collection("sessions").deleteMany({ userId: studentId });
  return (res.deletedCount ?? 0) > 0;
}

export async function getAllStudents(): Promise<Student[]> {
  await initDb();
  const docs = await db.collection("students").find().sort({ createdAt: -1 }).toArray();
  return docs.map((doc) => ({
    id: doc._id,
    name: doc.name,
    email: doc.email,
    phone: doc.phone,
    classNum: doc.classNum,
    passwordHash: doc.passwordHash,
    isApproved: doc.isApproved,
    createdAt: doc.createdAt,
  }));
}

// ===== Admin Operations =====
export async function findAdminByEmail(email: string): Promise<AdminUser | undefined> {
  await initDb();
  const doc = await db.collection("admins").findOne({ email: email.toLowerCase() });
  if (!doc) return undefined;
  
  return {
    id: doc._id,
    email: doc.email,
    passwordHash: doc.passwordHash,
    name: doc.name,
  };
}

export async function findAdminById(id: string): Promise<AdminUser | undefined> {
  await initDb();
  const doc = await db.collection("admins").findOne({ _id: id });
  if (!doc) return undefined;
  
  return {
    id: doc._id,
    email: doc.email,
    passwordHash: doc.passwordHash,
    name: doc.name,
  };
}

// ===== Session Operations =====
export async function createSession(
  userId: string,
  role: "student" | "admin"
): Promise<Session> {
  await initDb();
  await db.collection("sessions").deleteMany({ userId });
  
  const session = {
    _id: generateToken(),
    userId,
    role,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  };

  await db.collection("sessions").insertOne(session);
  return {
    token: session._id,
    userId: session.userId,
    role: session.role as "student" | "admin",
    expiresAt: session.expiresAt
  };
}

export async function getSession(token: string): Promise<Session | null> {
  await initDb();
  const doc = await db.collection("sessions").findOne({ _id: token });
  if (!doc) return null;
  
  const session: Session = {
    token: doc._id,
    userId: doc.userId,
    role: doc.role,
    expiresAt: doc.expiresAt,
  };

  if (new Date(session.expiresAt) < new Date()) {
    await db.collection("sessions").deleteOne({ _id: token });
    return null;
  }
  return session;
}

export async function deleteSession(token: string): Promise<void> {
  await initDb();
  await db.collection("sessions").deleteOne({ _id: token });
}

// ===== Notes Operations =====
export async function getAllNotes(): Promise<Note[]> {
  await initDb();
  const docs = await db.collection("notes").find().sort({ createdAt: -1 }).toArray();
  return docs.map((doc) => ({
    id: doc._id,
    title: doc.title,
    subject: doc.subject,
    classNum: doc.classNum,
    content: doc.content,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  }));
}

export async function createNote(
  title: string,
  subject: string,
  classNum: string,
  content: string
): Promise<Note> {
  await initDb();
  const note = {
    _id: generateId(),
    title,
    subject,
    classNum,
    content,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  await db.collection("notes").insertOne(note);
  return {
    id: note._id,
    title: note.title,
    subject: note.subject,
    classNum: note.classNum,
    content: note.content,
    createdAt: note.createdAt,
    updatedAt: note.updatedAt
  };
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
  await db.collection("notes").updateOne(
    { _id: noteId },
    { $set: { title, subject, classNum, content, updatedAt } }
  );
  
  return findNoteById(noteId);
}

export async function deleteNote(noteId: string): Promise<boolean> {
  await initDb();
  const res = await db.collection("notes").deleteOne({ _id: noteId });
  return (res.deletedCount ?? 0) > 0;
}

