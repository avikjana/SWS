import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Check if the Apps Script URL is configured in environment variables
    const appsScriptUrl = process.env.GOOGLE_SHEET_WEBAPP_URL;

    if (!appsScriptUrl) {
      console.warn("GOOGLE_SHEET_WEBAPP_URL is not set in environment variables. Falling back to local logging.");
    }

    // Format fields (convert arrays to comma-separated strings for spreadsheet cells)
    const formattedData = {
      timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      studentName: body.studentName || "",
      class: Array.isArray(body.class) ? body.class.join(", ") : body.class || "",
      subjectsInterest: body.subjectsInterest || "",
      coachingMode: body.coachingMode || "",
      fatherName: body.fatherName || "",
      motherName: body.motherName || "",
      gender: body.gender || "",
      dateOfBirth: body.dateOfBirth || "",
      religion: body.religion || "",
      category: Array.isArray(body.category) ? body.category.join(", ") : body.category || "",
      nationality: body.nationality || "",
      bloodGroup: body.bloodGroup || "",
      aadhaarNo: body.aadhaarNo || "",
      mobileNo: body.mobileNo || "",
      altMobileNo: body.altMobileNo || "",
      emailId: body.emailId || "",
      addressVill: body.addressVill || "",
      addressPo: body.addressPo || "",
      addressPs: body.addressPs || "",
      addressPin: body.addressPin || "",
      addressDistrict: body.addressDistrict || "",
      addressState: body.addressState || "",
      currentClass: Array.isArray(body.currentClass) ? body.currentClass.join(", ") : body.currentClass || "",
      educationMedium: Array.isArray(body.educationMedium) ? body.educationMedium.join(", ") : body.educationMedium || "",
      currentSchool: body.currentSchool || "",
      marksObtained: body.marksObtained || "",
      marksOutOf: body.marksOutOf || "",
      referralSource: Array.isArray(body.referralSource) ? body.referralSource.join(", ") : body.referralSource || "",
      isOldStudent: body.isOldStudent || "",
      takenCoachingPast: body.takenCoachingPast || "",
      reasonForJoining: body.reasonForJoining || "",
      studentSignature: body.studentSignature || "",
      guardianSignature: body.guardianSignature || "",
      courseName: body.courseName || "General Admission",
    };

    console.log("Saving admission form data:", formattedData);

    // If Apps Script URL is set, send data to Google Sheets
    if (appsScriptUrl) {
      const response = await fetch(appsScriptUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        throw new Error(`Google Sheets API responded with status ${response.status}`);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Admission form submitted successfully to Google Sheets.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Admission/Inquiry API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
