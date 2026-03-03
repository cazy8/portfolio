import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

export async function GET() {
  try {
    // Serve the resume PDF from the project root
    const resumePath = path.join(
      process.cwd(),
      "HARSH GUPTA RESUME FEB 2026 (2).pdf"
    );

    const fileBuffer = await readFile(resumePath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'inline; filename="Harsh_Gupta_Resume.pdf"',
      },
    });
  } catch (error) {
    console.error("Resume download error:", error);
    return NextResponse.json(
      { error: "Resume not found" },
      { status: 404 }
    );
  }
}
