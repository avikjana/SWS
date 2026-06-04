import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, courseId, courseName, message, preferredBatch } = body;

    // Validate required fields
    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and phone are required" },
        { status: 400 }
      );
    }

    // In production: send to CRM, email, database
    console.log("Course inquiry received:", {
      name,
      email,
      phone,
      courseId,
      courseName,
      message,
      preferredBatch,
      timestamp: new Date().toISOString(),
    });

    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 300));

    return NextResponse.json(
      {
        success: true,
        message: "Inquiry submitted successfully. A counselor will contact you within 24 hours.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Inquiry API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
