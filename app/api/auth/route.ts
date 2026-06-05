import { NextRequest, NextResponse } from "next/server";
import {
  findStudentByEmail,
  findAdminByEmail,
  verifyPassword,
  createSession,
} from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { email, password, role } = await req.json();

    if (!email || !password || !role) {
      return NextResponse.json(
        { error: "Email, password, and role are required" },
        { status: 400 }
      );
    }

    if (role === "admin") {
      const admin = await findAdminByEmail(email);
      if (!admin || !verifyPassword(password, admin.passwordHash)) {
        return NextResponse.json(
          { error: "Invalid admin credentials" },
          { status: 401 }
        );
      }
      const session = await createSession(admin.id, "admin");
      const res = NextResponse.json({
        success: true,
        user: { id: admin.id, name: admin.name, email: admin.email, role: "admin" },
      });
      res.cookies.set("session_token", session.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 7 * 24 * 60 * 60, // 7 days
      });
      return res;
    }

    if (role === "student") {
      const student = await findStudentByEmail(email);
      if (!student || !verifyPassword(password, student.passwordHash)) {
        return NextResponse.json(
          { error: "Invalid email or password" },
          { status: 401 }
        );
      }
      const session = await createSession(student.id, "student");
      const res = NextResponse.json({
        success: true,
        user: {
          id: student.id,
          name: student.name,
          email: student.email,
          role: "student",
          isApproved: student.isApproved,
        },
      });
      res.cookies.set("session_token", session.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 7 * 24 * 60 * 60,
      });
      return res;
    }

    return NextResponse.json({ error: "Invalid role" }, { status: 400 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
