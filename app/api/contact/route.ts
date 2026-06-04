import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message, courseInterest } = body;

    // Validate required fields
    if (!name || !phone || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields: name, phone, subject, message" },
        { status: 400 }
      );
    }

    // In production, integrate with:
    // 1. Resend / NodeMailer to send emails
    // 2. CRM system (HubSpot, Zoho, etc.)
    // 3. Google Sheets via API
    // 4. Database (PostgreSQL, MongoDB, etc.)

    console.log("Contact form submission:", {
      name,
      email,
      phone,
      subject,
      message,
      courseInterest,
      timestamp: new Date().toISOString(),
    });

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json(
      {
        success: true,
        message: "Contact form submitted successfully. We will reach out within 24 hours.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
