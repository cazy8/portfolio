import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    // Basic validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Store message locally (in production, send via email service)
    const messagesDir = path.join(process.cwd(), "data", "messages");
    await mkdir(messagesDir, { recursive: true });

    const timestamp = new Date().toISOString();
    const filename = `${timestamp.replace(/[:.]/g, "-")}.json`;

    const messageData = {
      name,
      email,
      subject,
      message,
      timestamp,
      ip: req.headers.get("x-forwarded-for") || "unknown",
    };

    await writeFile(
      path.join(messagesDir, filename),
      JSON.stringify(messageData, null, 2)
    );

    return NextResponse.json(
      { success: true, message: "Message received!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
