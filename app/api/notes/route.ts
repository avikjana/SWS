import { NextRequest, NextResponse } from "next/server";
import { getSession, getAllNotes, readDb } from "@/lib/db";

// GET — fetch notes for approved students only
export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("session_token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const session = getSession(token);
    if (!session || session.role !== "student") {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const db = readDb();
    const student = db.students.find((s) => s.id === session.userId);
    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    if (!student.isApproved) {
      return NextResponse.json(
        { error: "Account pending approval", isApproved: false },
        { status: 403 }
      );
    }

    const allNotes = getAllNotes();
    const notes = allNotes.filter((note) => note.classNum === student.classNum);
    return NextResponse.json({
      notes,
      student: {
        name: student.name,
        email: student.email,
        classNum: student.classNum,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
