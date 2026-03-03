import { NextResponse } from "next/server";

const PROFILE = {
  name: "Harsh Gupta",
  title: "Cybersecurity Researcher & Full-Stack Developer",
  bio: "Passionate about breaking and building secure systems. Active CTF competitor, bug bounty hunter, and clean-code advocate.",
  location: "India",
  socials: {
    github: "https://github.com/cazy8",
    linkedin: "https://www.linkedin.com/in/h4rshg/",
  },
  skills: [
    "Penetration Testing",
    "Web App Security",
    "Python",
    "JavaScript/TypeScript",
    "React/Next.js",
    "Node.js",
    "Burp Suite",
    "Docker",
    "Linux",
    "CTFs",
  ],
  interests: [
    "Offensive Security",
    "CTF Competitions",
    "Open Source",
    "Full-Stack Development",
    "Reverse Engineering",
  ],
  status: "Open to opportunities",
};

export async function GET() {
  return NextResponse.json(PROFILE, { status: 200 });
}
