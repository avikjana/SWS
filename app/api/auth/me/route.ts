import { NextRequest, NextResponse } from "next/server";
import { getSession, readDb } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("session_token")?.value;
    if (!token) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const session = getSession(token);
    if (!session) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const db = readDb();

    if (session.role === "admin") {
      const admin = db.admins.find((a) => a.id === session.userId);
      if (!admin) {
        return NextResponse.json({ user: null }, { status: 401 });
      }
      return NextResponse.json({
        user: {
          id: admin.id,
          name: admin.name,
          email: admin.email,
          role: "admin",
        },
      });
    }

    if (session.role === "student") {
      const student = db.students.find((s) => s.id === session.userId);
      if (!student) {
        return NextResponse.json({ user: null }, { status: 401 });
      }
      return NextResponse.json({
        user: {
          id: student.id,
          name: student.name,
          email: student.email,
          phone: student.phone,
          classNum: student.classNum,
          role: "student",
          isApproved: student.isApproved,
        },
      });
    }

    return NextResponse.json({ user: null }, { status: 401 });
  } catch {
    return NextResponse.json({ user: null }, { status: 500 });
  }
}
