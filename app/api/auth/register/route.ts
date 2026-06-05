import { NextRequest, NextResponse } from "next/server";
import { findStudentByEmail, createStudent } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, classNum, password } = await req.json();

    if (!name || !email || !phone || !classNum || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    const existing = findStudentByEmail(email);
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 }
      );
    }

    const student = createStudent(name, email, phone, classNum, password);

    return NextResponse.json({
      success: true,
      message:
        "Registration successful! Your account is pending admin approval.",
      student: {
        id: student.id,
        name: student.name,
        email: student.email,
        isApproved: student.isApproved,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
