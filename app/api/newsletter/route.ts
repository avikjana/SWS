import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    // In production: integrate with Mailchimp, ConvertKit, Resend, etc.
    console.log("Newsletter subscription:", {
      email,
      name: name || "Subscriber",
      timestamp: new Date().toISOString(),
    });

    await new Promise((resolve) => setTimeout(resolve, 200));

    return NextResponse.json(
      {
        success: true,
        message: "Successfully subscribed to the newsletter.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Newsletter API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
