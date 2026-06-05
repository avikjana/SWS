import { NextRequest, NextResponse } from "next/server";
import {
  getSession,
  readDb,
  toggleStudentApproval,
  deleteStudent,
} from "@/lib/db";

// Helper to verify admin session
function verifyAdmin(req: NextRequest) {
  const token = req.cookies.get("session_token")?.value;
  if (!token) return null;
  const session = getSession(token);
  if (!session || session.role !== "admin") return null;
  return session;
}

// GET — list all students
export async function GET(req: NextRequest) {
  const session = verifyAdmin(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = readDb();
  const students = db.students.map((s) => ({
    id: s.id,
    name: s.name,
    email: s.email,
    phone: s.phone,
    isApproved: s.isApproved,
    createdAt: s.createdAt,
  }));

  return NextResponse.json({ students });
}

// PATCH — toggle student approval
export async function PATCH(req: NextRequest) {
  const session = verifyAdmin(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { studentId, isApproved } = await req.json();
  if (!studentId || typeof isApproved !== "boolean") {
    return NextResponse.json(
      { error: "studentId and isApproved required" },
      { status: 400 }
    );
  }

  const student = toggleStudentApproval(studentId, isApproved);
  if (!student) {
    return NextResponse.json({ error: "Student not found" }, { status: 404 });
  }

  return NextResponse.json({
    success: true,
    student: {
      id: student.id,
      name: student.name,
      email: student.email,
      isApproved: student.isApproved,
    },
  });
}

// DELETE — remove a student
export async function DELETE(req: NextRequest) {
  const session = verifyAdmin(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const studentId = searchParams.get("id");
  if (!studentId) {
    return NextResponse.json(
      { error: "Student id required" },
      { status: 400 }
    );
  }

  const deleted = deleteStudent(studentId);
  if (!deleted) {
    return NextResponse.json({ error: "Student not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
