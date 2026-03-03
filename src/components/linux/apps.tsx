"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { WALLPAPERS, useWallpaper } from "./WallpaperContext";

// ═══════════════════════════════════════════════════════════════
// SHARED DATA
// ═══════════════════════════════════════════════════════════════

const PROFILE = {
  name: "Harsh Gupta",
  title: "CSE Student | Security Researcher | Web Developer",
  github: "https://github.com/cazy8",
  linkedin: "https://linkedin.com/in/h4rshg",
  email: "harshgupta8125@gmail.com",
  phone: "+91 9987315051",
  summary:
    "Passionate about breaking and building secure systems. I compete in CTFs, hunt bugs, and craft clean full-stack applications — always learning, always hacking.",
  skills: {
    "Web & Development": [
      "HTML5", "CSS3", "JavaScript", "React.js",
      "Node.js / Express", "Next.js", "Responsive Design",
    ],
    "Programming Languages": [
      "C / C++", "Python", "JavaScript", "Bash",
    ],
    "Offensive Security": [
      "Web Application Security", "VAPT", "Penetration Testing",
      "OWASP Top 10", "Red Teaming", "XSS / CSRF Mitigation",
    ],
    "Security Tools": [
      "Burp Suite", "Nmap", "Metasploit", "Wireshark",
      "OWASP ZAP", "SQLmap", "Hydra", "John the Ripper",
      "Nessus", "Nikto", "Splunk",
    ],
    "Cloud & Platforms": [
      "Azure", "AWS", "Linux (Ubuntu / Kali)", "Windows", "Docker",
      "Multicloud Networking",
    ],
    "Tools & DevOps": [
      "Git", "Docker", "CI / CD",
    ],
  },
  experience: [
    {
      role: "Ethical Hacking & Cybersecurity Intern",
      org: "Netrinix Academy",
      period: "Oct 2025 — Nov 2025",
      points: [
        "Executed offensive security ops including vulnerability assessments and pentesting",
        "Performed red-team activities spanning recon, exploitation, and post-exploitation",
        "Conducted security audits to simulate real-world attack scenarios",
      ],
    },
    {
      role: "VAPT Intern",
      org: "CyberSRC Consultancy",
      period: "Aug 2025 — Oct 2025",
      points: [
        "Conducted web application pentesting using Burp Suite, OWASP ZAP, and Nmap",
        "Analyzed vulnerabilities using CVSS scoring and collaborated on remediation",
        "Utilized SQLmap, Hydra, and Metasploit for testing attack vectors",
      ],
    },
    {
      role: "Cyber Security Intern",
      org: "Elevate Labs",
      period: "Jun 2025 — Jul 2025",
      points: [
        "Architected and deployed a cloud-based honeypot using Cowrie on Azure",
        "Integrated Fail2ban for active defense, mitigating brute-force attacks",
        "Analyzed live attacker logs and generated threat intelligence reports",
      ],
    },
  ],
  education: [
    {
      degree: "B.E. in Computer Science & Engineering (Cybersecurity)",
      school: "Thakur College of Engineering & Technology, Mumbai, India",
      period: "2023 — 2027",
      details: "CGPA: 8.73 / 10 (after Semester 5)",
    },
  ],
  projects: [
    {
      name: "Docker Security Scanner",
      desc: "A comprehensive Docker container security scanning tool that analyzes images for vulnerabilities, misconfigurations, and security best practices.",
      tech: "Python, Docker, Security, CLI",
      url: "https://github.com/cazy8/docker-security-scanner",
    },
    {
      name: "Hotel Management System",
      desc: "Full-stack hotel management system built with the MERN stack featuring room booking, guest management, and payment integration.",
      tech: "MongoDB, Express, React, Node.js",
      url: "https://github.com/cazy8/Hotel-Management-System-Mern-Stack",
    },
    {
      name: "AI Network Intrusion Detection",
      desc: "AI-based network intrusion detection system using machine learning algorithms to detect and classify malicious network traffic.",
      tech: "Python, ML, Networking, Security",
      url: "https://github.com/cazy8/AI-Based-Network-Intrusion-Detection-System",
    },
  ],
  certifications: [
    "Certified Network Security Practitioner (CNSP) — The SecOps Group",
    "Aviatrix ACE Multicloud Network Associate — Aviatrix",
    "Jr. Penetration Tester Learning Path — TryHackMe",
    "CyberPeace First Responders & Myth Busters — CyberPeace Foundation",
    "Certified Phishing Prevention Specialist (CPPS) — Hack & Fix",
    "Certified Red Team Operations Management (CRTOM) — Red Team Leaders",
  ],
};

// ═══════════════════════════════════════════════════════════════
// APP ICON COMPONENTS — Linux Papirus / Adwaita Style
// ═══════════════════════════════════════════════════════════════

export function ResumeIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      {/* Paper body */}
      <rect x="8" y="4" width="28" height="38" rx="3" fill="#4FC3F7" />
      <rect x="8" y="4" width="28" height="38" rx="3" fill="url(#resumeGrad)" />
      {/* Paper fold */}
      <path d="M28 4 L36 12 L28 12 Z" fill="#29B6F6" />
      <path d="M28 4 L36 12 L28 12 Z" fill="rgba(0,0,0,0.1)" />
      {/* Avatar circle */}
      <circle cx="22" cy="18" r="5" fill="rgba(255,255,255,0.9)" />
      <circle cx="22" cy="16.5" r="2" fill="#0288D1" />
      <path d="M18 21 Q22 23 26 21 Q26 24 22 24 Q18 24 18 21Z" fill="#0288D1" />
      {/* Lines */}
      <rect x="13" y="27" width="18" height="2" rx="1" fill="rgba(255,255,255,0.6)" />
      <rect x="13" y="31" width="14" height="2" rx="1" fill="rgba(255,255,255,0.4)" />
      <rect x="13" y="35" width="10" height="2" rx="1" fill="rgba(255,255,255,0.3)" />
      <defs>
        <linearGradient id="resumeGrad" x1="8" y1="4" x2="36" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#4FC3F7" />
          <stop offset="1" stopColor="#0288D1" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function AboutIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="20" fill="url(#aboutGrad)" />
      <circle cx="24" cy="18" r="6" fill="rgba(255,255,255,0.9)" />
      <path d="M12 38 C12 30 16 26 24 26 C32 26 36 30 36 38" fill="rgba(255,255,255,0.7)" />
      <defs>
        <linearGradient id="aboutGrad" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#26C6DA" />
          <stop offset="1" stopColor="#00838F" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function ProjectsIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      {/* Folder back */}
      <path d="M4 14 L4 38 Q4 40 6 40 L42 40 Q44 40 44 38 L44 16 Q44 14 42 14 Z" fill="#F9A825" />
      {/* Tab */}
      <path d="M4 14 L4 10 Q4 8 6 8 L18 8 L22 14 Z" fill="#F9A825" />
      {/* Folder front */}
      <path d="M4 18 L44 18 L44 38 Q44 40 42 40 L6 40 Q4 40 4 38 Z" fill="#FFD54F" />
      {/* Code symbol */}
      <path d="M17 26 L13 29 L17 32" stroke="#F57F17" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M31 26 L35 29 L31 32" stroke="#F57F17" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M26 24 L22 34" stroke="#F57F17" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function ContactIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="4" y="10" width="40" height="28" rx="4" fill="url(#mailGrad)" />
      <path d="M4 14 L24 28 L44 14" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M4 38 L18 26" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
      <path d="M44 38 L30 26" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
      <defs>
        <linearGradient id="mailGrad" x1="4" y1="10" x2="44" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#66BB6A" />
          <stop offset="1" stopColor="#2E7D32" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function TerminalIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="4" y="6" width="40" height="36" rx="4" fill="#263238" />
      <rect x="4" y="6" width="40" height="8" rx="4" fill="#37474F" />
      <rect x="4" y="10" width="40" height="4" fill="#37474F" />
      {/* Window dots */}
      <circle cx="11" cy="10" r="2" fill="#EF5350" />
      <circle cx="18" cy="10" r="2" fill="#FFC107" />
      <circle cx="25" cy="10" r="2" fill="#66BB6A" />
      {/* Prompt */}
      <path d="M12 24 L18 28 L12 32" stroke="#4CAF50" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="22" y="27" width="14" height="2.5" rx="1" fill="rgba(255,255,255,0.5)" />
    </svg>
  );
}

export function FileManagerIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      {/* Cabinet body */}
      <rect x="6" y="4" width="36" height="40" rx="3" fill="url(#fmGrad)" />
      {/* Drawer 1 */}
      <rect x="10" y="8" width="28" height="10" rx="2" fill="rgba(255,255,255,0.15)" />
      <rect x="20" y="12" width="8" height="2" rx="1" fill="rgba(255,255,255,0.5)" />
      {/* Drawer 2 */}
      <rect x="10" y="22" width="28" height="10" rx="2" fill="rgba(255,255,255,0.1)" />
      <rect x="20" y="26" width="8" height="2" rx="1" fill="rgba(255,255,255,0.5)" />
      {/* Drawer 3 */}
      <rect x="10" y="36" width="28" height="6" rx="2" fill="rgba(255,255,255,0.08)" />
      <defs>
        <linearGradient id="fmGrad" x1="6" y1="4" x2="42" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#78909C" />
          <stop offset="1" stopColor="#455A64" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function TextEditorIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="6" y="4" width="36" height="40" rx="3" fill="url(#editorGrad)" />
      {/* Line numbers gutter */}
      <rect x="6" y="4" width="10" height="40" rx="3" fill="rgba(0,0,0,0.15)" />
      <text x="9" y="16" fontSize="5" fill="rgba(255,255,255,0.3)" fontFamily="monospace">1</text>
      <text x="9" y="23" fontSize="5" fill="rgba(255,255,255,0.3)" fontFamily="monospace">2</text>
      <text x="9" y="30" fontSize="5" fill="rgba(255,255,255,0.3)" fontFamily="monospace">3</text>
      <text x="9" y="37" fontSize="5" fill="rgba(255,255,255,0.3)" fontFamily="monospace">4</text>
      {/* Code lines */}
      <rect x="19" y="12" width="16" height="2.5" rx="1" fill="#CE93D8" />
      <rect x="19" y="19" width="20" height="2.5" rx="1" fill="#80CBC4" />
      <rect x="19" y="26" width="12" height="2.5" rx="1" fill="#FFD54F" />
      <rect x="19" y="33" width="17" height="2.5" rx="1" fill="#90CAF9" />
      <defs>
        <linearGradient id="editorGrad" x1="6" y1="4" x2="42" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#5C6BC0" />
          <stop offset="1" stopColor="#283593" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function CalculatorIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="8" y="4" width="32" height="40" rx="4" fill="url(#calcGrad)" />
      {/* Screen */}
      <rect x="12" y="8" width="24" height="10" rx="2" fill="rgba(0,0,0,0.25)" />
      <text x="32" y="16" fontSize="8" fill="#B9F6CA" fontFamily="monospace" textAnchor="end">42</text>
      {/* Buttons grid */}
      <rect x="12" y="22" width="5" height="4" rx="1" fill="rgba(255,255,255,0.3)" />
      <rect x="19" y="22" width="5" height="4" rx="1" fill="rgba(255,255,255,0.3)" />
      <rect x="26" y="22" width="5" height="4" rx="1" fill="rgba(255,255,255,0.3)" />
      <rect x="33" y="22" width="3" height="4" rx="1" fill="#FF8A65" />
      <rect x="12" y="28" width="5" height="4" rx="1" fill="rgba(255,255,255,0.25)" />
      <rect x="19" y="28" width="5" height="4" rx="1" fill="rgba(255,255,255,0.25)" />
      <rect x="26" y="28" width="5" height="4" rx="1" fill="rgba(255,255,255,0.25)" />
      <rect x="33" y="28" width="3" height="4" rx="1" fill="#FF8A65" />
      <rect x="12" y="34" width="5" height="4" rx="1" fill="rgba(255,255,255,0.2)" />
      <rect x="19" y="34" width="5" height="4" rx="1" fill="rgba(255,255,255,0.2)" />
      <rect x="26" y="34" width="5" height="4" rx="1" fill="rgba(255,255,255,0.2)" />
      <rect x="33" y="34" width="3" height="8" rx="1" fill="#66BB6A" />
      <rect x="12" y="40" width="12" height="2" rx="1" fill="rgba(255,255,255,0.2)" />
      <rect x="26" y="40" width="5" height="2" rx="1" fill="rgba(255,255,255,0.2)" />
      <defs>
        <linearGradient id="calcGrad" x1="8" y1="4" x2="40" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FF7043" />
          <stop offset="1" stopColor="#D84315" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function SettingsIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="20" fill="url(#settGrad)" />
      {/* Outer gear teeth (simplified) */}
      <path d="M24 6 L26 10 L22 10Z" fill="rgba(255,255,255,0.4)" />
      <path d="M24 42 L22 38 L26 38Z" fill="rgba(255,255,255,0.4)" />
      <path d="M6 24 L10 22 L10 26Z" fill="rgba(255,255,255,0.4)" />
      <path d="M42 24 L38 26 L38 22Z" fill="rgba(255,255,255,0.4)" />
      <path d="M11.2 11.2 L14 12.6 L12.6 14Z" fill="rgba(255,255,255,0.3)" />
      <path d="M36.8 36.8 L34 35.4 L35.4 34Z" fill="rgba(255,255,255,0.3)" />
      <path d="M36.8 11.2 L35.4 14 L34 12.6Z" fill="rgba(255,255,255,0.3)" />
      <path d="M11.2 36.8 L12.6 34 L14 35.4Z" fill="rgba(255,255,255,0.3)" />
      {/* Inner gear ring */}
      <circle cx="24" cy="24" r="12" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="3" />
      {/* Center circle */}
      <circle cx="24" cy="24" r="6" fill="rgba(255,255,255,0.8)" />
      <circle cx="24" cy="24" r="3.5" fill="url(#settGrad2)" />
      <defs>
        <linearGradient id="settGrad" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#78909C" />
          <stop offset="1" stopColor="#37474F" />
        </linearGradient>
        <linearGradient id="settGrad2" x1="20" y1="20" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#546E7A" />
          <stop offset="1" stopColor="#37474F" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function MusicIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="20" fill="url(#musicGrad)" />
      {/* Vinyl grooves */}
      <circle cx="24" cy="24" r="16" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      <circle cx="24" cy="24" r="12" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      <circle cx="24" cy="24" r="8" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      {/* Center hole */}
      <circle cx="24" cy="24" r="5" fill="rgba(255,255,255,0.9)" />
      {/* Note symbol */}
      <path d="M22 22 L22 16 L28 14 L28 20" stroke="#7B1FA2" strokeWidth="2" strokeLinecap="round" />
      <circle cx="22" cy="23" r="2" fill="#7B1FA2" />
      <circle cx="28" cy="21" r="2" fill="#7B1FA2" />
      <defs>
        <linearGradient id="musicGrad" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#AB47BC" />
          <stop offset="1" stopColor="#6A1B9A" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function MinesweeperIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="4" y="4" width="40" height="40" rx="4" fill="url(#mineGrad)" />
      {/* Mine body */}
      <circle cx="24" cy="24" r="9" fill="#212121" />
      {/* Spikes */}
      <rect x="23" y="10" width="2" height="7" rx="1" fill="#212121" />
      <rect x="23" y="31" width="2" height="7" rx="1" fill="#212121" />
      <rect x="10" y="23" width="7" height="2" rx="1" fill="#212121" />
      <rect x="31" y="23" width="7" height="2" rx="1" fill="#212121" />
      <rect x="12.5" y="12" width="2" height="7" rx="1" fill="#212121" transform="rotate(-45 13.5 15.5)" />
      <rect x="33.5" y="29" width="2" height="7" rx="1" fill="#212121" transform="rotate(-45 34.5 32.5)" />
      <rect x="33" y="12.5" width="2" height="7" rx="1" fill="#212121" transform="rotate(45 34 16)" />
      <rect x="13" y="30" width="2" height="7" rx="1" fill="#212121" transform="rotate(45 14 33.5)" />
      {/* Highlight */}
      <circle cx="21" cy="21" r="3" fill="rgba(255,255,255,0.3)" />
      <defs>
        <linearGradient id="mineGrad" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#EF5350" />
          <stop offset="1" stopColor="#C62828" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function SimpleViewIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      {/* Monitor body */}
      <rect x="4" y="6" width="40" height="28" rx="3" fill="url(#monGrad)" />
      {/* Screen */}
      <rect x="7" y="9" width="34" height="22" rx="1" fill="#E0F7FA" />
      {/* Screen content (browser) */}
      <rect x="7" y="9" width="34" height="4" fill="#B2EBF2" />
      <circle cx="10" cy="11" r="1" fill="#EF5350" />
      <circle cx="14" cy="11" r="1" fill="#FFC107" />
      <circle cx="18" cy="11" r="1" fill="#4CAF50" />
      <rect x="10" y="16" width="16" height="3" rx="1" fill="#80DEEA" />
      <rect x="10" y="21" width="28" height="2" rx="1" fill="#B2EBF2" />
      <rect x="10" y="25" width="20" height="2" rx="1" fill="#B2EBF2" />
      {/* Stand */}
      <rect x="20" y="34" width="8" height="4" fill="#00838F" />
      <rect x="16" y="38" width="16" height="3" rx="1.5" fill="#00838F" />
      <defs>
        <linearGradient id="monGrad" x1="4" y1="6" x2="44" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#00BCD4" />
          <stop offset="1" stopColor="#00838F" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function WallpaperIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="4" y="6" width="40" height="36" rx="4" fill="url(#wpGrad)" />
      {/* Mountain landscape */}
      <path d="M4 36 L16 18 L24 28 L32 16 L44 36 Z" fill="rgba(255,255,255,0.25)" />
      <path d="M4 36 L12 24 L20 32 L28 22 L44 36 Z" fill="rgba(255,255,255,0.15)" />
      {/* Sun */}
      <circle cx="36" cy="14" r="5" fill="#FFD54F" />
      <circle cx="36" cy="14" r="5" fill="rgba(255,255,255,0.3)" />
      {/* Paint brush stroke */}
      <path d="M10 38 Q24 34 38 38" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" />
      <defs>
        <linearGradient id="wpGrad" x1="4" y1="6" x2="44" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#26A69A" />
          <stop offset="1" stopColor="#00695C" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function FlappyBirdIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="4" y="4" width="40" height="40" rx="4" fill="url(#flappyGrad)" />
      <ellipse cx="22" cy="22" rx="7" ry="6" fill="#FFD54F" />
      <circle cx="26" cy="20" r="2.5" fill="white" />
      <circle cx="27" cy="20" r="1.2" fill="#212121" />
      <path d="M29 22 L35 21 L29 24 Z" fill="#FF8A65" />
      <ellipse cx="18" cy="23" rx="5" ry="3" fill="#FFC107" />
      <rect x="38" y="4" width="6" height="14" fill="#66BB6A" />
      <rect x="36" y="16" width="10" height="4" rx="1" fill="#4CAF50" />
      <rect x="38" y="32" width="6" height="12" fill="#66BB6A" />
      <rect x="36" y="28" width="10" height="4" rx="1" fill="#4CAF50" />
      <defs>
        <linearGradient id="flappyGrad" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#4FC3F7" />
          <stop offset="1" stopColor="#0288D1" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function PongIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="4" y="4" width="40" height="40" rx="4" fill="#1a1a2e" />
      <rect x="8" y="14" width="3" height="14" rx="1.5" fill="#00ff88" />
      <rect x="37" y="20" width="3" height="14" rx="1.5" fill="#ff4444" />
      <circle cx="24" cy="24" r="3" fill="white" />
      <line x1="24" y1="6" x2="24" y2="42" stroke="white" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
    </svg>
  );
}

export function SnakeIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="4" y="4" width="40" height="40" rx="4" fill="#0f172a" />
      <rect x="12" y="12" width="24" height="24" rx="2" fill="#1e293b" />
      {/* Snake Body */}
      <rect x="16" y="24" width="4" height="4" fill="#10b981" />
      <rect x="20" y="24" width="4" height="4" fill="#10b981" />
      <rect x="24" y="24" width="4" height="4" fill="#10b981" />
      <rect x="24" y="20" width="4" height="4" fill="#10b981" />
      <rect x="24" y="16" width="4" height="4" fill="#10b981" />
      <rect x="28" y="16" width="4" height="4" fill="#10b981" />
      {/* Snake Head */}
      <rect x="32" y="16" width="4" height="4" fill="#34d399" />
      {/* Apple */}
      <circle cx="20" cy="18" r="2" fill="#ef4444" />
    </svg>
  );
}

export function TetrisIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="4" y="4" width="40" height="40" rx="4" fill="#263238" />
      <rect x="14" y="10" width="6" height="6" fill="#AB47BC" stroke="#7B1FA2" strokeWidth="0.5" />
      <rect x="20" y="10" width="6" height="6" fill="#AB47BC" stroke="#7B1FA2" strokeWidth="0.5" />
      <rect x="26" y="10" width="6" height="6" fill="#AB47BC" stroke="#7B1FA2" strokeWidth="0.5" />
      <rect x="20" y="16" width="6" height="6" fill="#AB47BC" stroke="#7B1FA2" strokeWidth="0.5" />
      <rect x="10" y="28" width="6" height="6" fill="#FF7043" stroke="#E64A19" strokeWidth="0.5" />
      <rect x="10" y="34" width="6" height="6" fill="#FF7043" stroke="#E64A19" strokeWidth="0.5" />
      <rect x="16" y="34" width="6" height="6" fill="#FF7043" stroke="#E64A19" strokeWidth="0.5" />
      <rect x="30" y="28" width="6" height="6" fill="#FFD54F" stroke="#F9A825" strokeWidth="0.5" />
      <rect x="36" y="28" width="6" height="6" fill="#FFD54F" stroke="#F9A825" strokeWidth="0.5" />
      <rect x="30" y="34" width="6" height="6" fill="#FFD54F" stroke="#F9A825" strokeWidth="0.5" />
      <rect x="36" y="34" width="6" height="6" fill="#FFD54F" stroke="#F9A825" strokeWidth="0.5" />
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════
// APP CONFIGURATIONS
// ═══════════════════════════════════════════════════════════════

export interface AppConfig {
  id: string;
  name: string;
  iconComponent: React.ComponentType<{ size?: number }>;
  defaultWidth: number;
  defaultHeight: number;
  minWidth: number;
  minHeight: number;
  showOnDesktop: boolean;
  pinnedToDock: boolean;
  singleInstance: boolean;
  isExternal?: boolean;
  externalUrl?: string;
}

export const APPS: AppConfig[] = [
  {
    id: "resume",
    name: "Resume",
    iconComponent: ResumeIcon,
    defaultWidth: 720,
    defaultHeight: 560,
    minWidth: 400,
    minHeight: 300,
    showOnDesktop: true,
    pinnedToDock: true,
    singleInstance: true,
  },
  {
    id: "about",
    name: "About Me",
    iconComponent: AboutIcon,
    defaultWidth: 600,
    defaultHeight: 500,
    minWidth: 380,
    minHeight: 300,
    showOnDesktop: true,
    pinnedToDock: false,
    singleInstance: true,
  },
  {
    id: "projects",
    name: "Projects",
    iconComponent: ProjectsIcon,
    defaultWidth: 700,
    defaultHeight: 520,
    minWidth: 400,
    minHeight: 300,
    showOnDesktop: true,
    pinnedToDock: false,
    singleInstance: true,
  },
  {
    id: "contact",
    name: "Contact",
    iconComponent: ContactIcon,
    defaultWidth: 500,
    defaultHeight: 520,
    minWidth: 380,
    minHeight: 400,
    showOnDesktop: true,
    pinnedToDock: false,
    singleInstance: true,
  },
  {
    id: "terminal",
    name: "Terminal",
    iconComponent: TerminalIcon,
    defaultWidth: 680,
    defaultHeight: 440,
    minWidth: 400,
    minHeight: 250,
    showOnDesktop: true,
    pinnedToDock: true,
    singleInstance: false,
  },
  {
    id: "file-manager",
    name: "Files",
    iconComponent: FileManagerIcon,
    defaultWidth: 700,
    defaultHeight: 480,
    minWidth: 400,
    minHeight: 300,
    showOnDesktop: true,
    pinnedToDock: true,
    singleInstance: true,
  },
  {
    id: "text-editor",
    name: "Text Editor",
    iconComponent: TextEditorIcon,
    defaultWidth: 600,
    defaultHeight: 450,
    minWidth: 350,
    minHeight: 250,
    showOnDesktop: true,
    pinnedToDock: true,
    singleInstance: false,
  },
  {
    id: "calculator",
    name: "Calculator",
    iconComponent: CalculatorIcon,
    defaultWidth: 320,
    defaultHeight: 460,
    minWidth: 280,
    minHeight: 400,
    showOnDesktop: true,
    pinnedToDock: false,
    singleInstance: true,
  },
  {
    id: "settings",
    name: "Settings",
    iconComponent: SettingsIcon,
    defaultWidth: 650,
    defaultHeight: 480,
    minWidth: 400,
    minHeight: 350,
    showOnDesktop: true,
    pinnedToDock: true,
    singleInstance: true,
  },
  {
    id: "music",
    name: "Music",
    iconComponent: MusicIcon,
    defaultWidth: 420,
    defaultHeight: 520,
    minWidth: 350,
    minHeight: 400,
    showOnDesktop: true,
    pinnedToDock: false,
    singleInstance: true,
  },
  {
    id: "minesweeper",
    name: "Minesweeper",
    iconComponent: MinesweeperIcon,
    defaultWidth: 380,
    defaultHeight: 460,
    minWidth: 340,
    minHeight: 420,
    showOnDesktop: true,
    pinnedToDock: false,
    singleInstance: true,
  },
  {
    id: "simple-view",
    name: "Simple View",
    iconComponent: SimpleViewIcon,
    defaultWidth: 0,
    defaultHeight: 0,
    minWidth: 0,
    minHeight: 0,
    showOnDesktop: true,
    pinnedToDock: false,
    singleInstance: true,
    isExternal: true,
    externalUrl: "/resume?view=normal",
  },
  {
    id: "wallpaper",
    name: "Wallpapers",
    iconComponent: WallpaperIcon,
    defaultWidth: 560,
    defaultHeight: 440,
    minWidth: 400,
    minHeight: 340,
    showOnDesktop: true,
    pinnedToDock: false,
    singleInstance: true,
  },
  {
    id: "flappy-bird",
    name: "Flappy Bird",
    iconComponent: FlappyBirdIcon,
    defaultWidth: 400,
    defaultHeight: 550,
    minWidth: 320,
    minHeight: 450,
    showOnDesktop: false,
    pinnedToDock: false,
    singleInstance: true,
  },
  {
    id: "pong",
    name: "Pong",
    iconComponent: PongIcon,
    defaultWidth: 500,
    defaultHeight: 400,
    minWidth: 400,
    minHeight: 320,
    showOnDesktop: false,
    pinnedToDock: false,
    singleInstance: true,
  },
  {
    id: "snake",
    name: "Snake",
    iconComponent: SnakeIcon,
    defaultWidth: 500,
    defaultHeight: 400,
    minWidth: 400,
    minHeight: 320,
    showOnDesktop: false,
    pinnedToDock: false,
    singleInstance: true,
  },
  {
    id: "tetris",
    name: "Tetris",
    iconComponent: TetrisIcon,
    defaultWidth: 360,
    defaultHeight: 560,
    minWidth: 300,
    minHeight: 450,
    showOnDesktop: false,
    pinnedToDock: false,
    singleInstance: true,
  },
];

// ═══════════════════════════════════════════════════════════════
// APP CONTENT PROPS
// ═══════════════════════════════════════════════════════════════

export interface AppContentProps {
  windowId: string;
  closeWindow: () => void;
}

// ═══════════════════════════════════════════════════════════════
// RESUME APP - Document Viewer
// ═══════════════════════════════════════════════════════════════

function ResumeApp({ }: AppContentProps) {
  return (
    <div className="h-full overflow-y-auto bg-[#1e1e1e]">
      {/* Toolbar */}
      <div className="sticky top-0 bg-[#2b2b2b] border-b border-white/5 px-4 py-2 flex items-center gap-3 z-10">
        <span className="text-xs text-white/50 font-mono">
          📄 resume.pdf — Document Viewer
        </span>
        <div className="flex-1" />
        <a
          href="/resume.pdf"
          download
          className="px-3 py-1 rounded-lg bg-[#00ff88]/10 text-[#00ff88] text-xs font-mono hover:bg-[#00ff88]/20 transition-colors border border-[#00ff88]/20"
        >
          ⬇ Download PDF
        </a>
      </div>

      {/* Document content */}
      <div className="max-w-2xl mx-auto p-8">
        {/* Header */}
        <div className="text-center mb-8 pb-6 border-b border-white/10">
          <h1 className="text-3xl font-bold text-white mb-2">{PROFILE.name}</h1>
          <p className="text-[#00ff88] font-mono text-sm mb-4">
            {PROFILE.title}
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap text-xs text-gray-400">
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#00ff88] transition-colors"
            >
              GitHub: cazy8
            </a>
            <span>•</span>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#00ff88] transition-colors"
            >
              LinkedIn: h4rshg
            </a>
            <span>•</span>
            <span>{PROFILE.email}</span>
          </div>
        </div>

        {/* Summary */}
        <section className="mb-6">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
            <span className="w-6 h-px bg-[#00ff88]/40" />
            Summary
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed pl-3 border-l-2 border-[#00ff88]/20">
            {PROFILE.summary}
          </p>
        </section>

        {/* Experience */}
        <section className="mb-6">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
            <span className="w-6 h-px bg-[#00ff88]/40" />
            Experience
          </h2>
          {PROFILE.experience.map((exp) => (
            <div key={exp.role} className="mb-5 pl-3 border-l border-white/10">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold text-white text-sm">{exp.role}</h3>
                <span className="text-xs text-gray-500 font-mono shrink-0 ml-2">
                  {exp.period}
                </span>
              </div>
              <p className="text-[#00ff88]/70 text-xs font-mono mb-2">
                {exp.org}
              </p>
              <ul className="space-y-1">
                {exp.points.map((p, i) => (
                  <li
                    key={i}
                    className="text-gray-400 text-xs flex items-start gap-2"
                  >
                    <span className="text-[#00ff88] mt-0.5">▸</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Skills */}
        <section className="mb-6">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
            <span className="w-6 h-px bg-[#00ff88]/40" />
            Skills
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(PROFILE.skills).map(([cat, items]) => (
              <div
                key={cat}
                className="rounded-lg bg-[#252525] p-3 border border-white/5"
              >
                <h3 className="text-xs font-mono text-[#00ff88]/80 mb-2">
                  {cat}
                </h3>
                <div className="flex flex-wrap gap-1">
                  {items.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 rounded text-[10px] text-gray-400 bg-[#1e1e1e] border border-white/5 font-mono"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="mb-6">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
            <span className="w-6 h-px bg-[#00ff88]/40" />
            Education
          </h2>
          {PROFILE.education.map((edu) => (
            <div key={edu.degree} className="pl-3 border-l border-white/10">
              <div className="flex justify-between mb-1">
                <h3 className="font-semibold text-white text-sm">
                  {edu.degree}
                </h3>
                <span className="text-xs text-gray-500 font-mono">
                  {edu.period}
                </span>
              </div>
              <p className="text-[#00ff88]/70 text-xs font-mono">{edu.school}</p>
              <p className="text-gray-400 text-xs mt-1">{edu.details}</p>
            </div>
          ))}
        </section>

        {/* Certifications */}
        <section className="mb-8">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
            <span className="w-6 h-px bg-[#00ff88]/40" />
            Certifications
          </h2>
          <ul className="space-y-1">
            {PROFILE.certifications.map((c, i) => (
              <li
                key={i}
                className="text-gray-400 text-xs flex items-center gap-2"
              >
                <span className="text-[#00ff88]">✦</span>
                {c}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// ABOUT APP
// ═══════════════════════════════════════════════════════════════

function AboutApp({ }: AppContentProps) {
  return (
    <div className="h-full overflow-y-auto bg-[#1e1e1e] p-6">
      <div className="max-w-md mx-auto">
        {/* Avatar & Name */}
        <div className="text-center mb-6">
          <div className="w-20 h-20 rounded-full bg-linear-to-br from-[#00ff88] to-[#00aa55] flex items-center justify-center text-2xl font-bold text-black mx-auto mb-3 shadow-lg shadow-green-500/20">
            HG
          </div>
          <h2 className="text-xl font-bold text-white">{PROFILE.name}</h2>
          <p className="text-[#00ff88] font-mono text-sm mt-1">
            {PROFILE.title}
          </p>
        </div>

        {/* Bio */}
        <div className="bg-[#252525] rounded-xl p-4 border border-white/5 mb-4">
          <p className="text-gray-300 text-sm leading-relaxed">
            {PROFILE.summary}
          </p>
        </div>

        {/* Links */}
        <div className="space-y-2 mb-4">
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 bg-[#252525] rounded-xl border border-white/5 hover:border-[#00ff88]/20 transition-colors group"
          >
            <svg className="w-5 h-5 text-gray-400 group-hover:text-[#00ff88] transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <div>
              <p className="text-white text-sm font-medium">GitHub</p>
              <p className="text-gray-500 text-xs">@cazy8</p>
            </div>
            <span className="ml-auto text-gray-600 group-hover:text-[#00ff88] transition-colors">
              ↗
            </span>
          </a>

          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 bg-[#252525] rounded-xl border border-white/5 hover:border-[#00ff88]/20 transition-colors group"
          >
            <svg className="w-5 h-5 text-gray-400 group-hover:text-[#00ff88] transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            <div>
              <p className="text-white text-sm font-medium">LinkedIn</p>
              <p className="text-gray-500 text-xs">in/h4rshg</p>
            </div>
            <span className="ml-auto text-gray-600 group-hover:text-[#00ff88] transition-colors">
              ↗
            </span>
          </a>

          <div className="flex items-center gap-3 px-4 py-3 bg-[#252525] rounded-xl border border-white/5">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <div>
              <p className="text-white text-sm font-medium">Email</p>
              <p className="text-gray-500 text-xs">{PROFILE.email}</p>
            </div>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-[#252525] rounded-xl p-3 text-center border border-white/5">
            <p className="text-lg font-bold text-[#00ff88]">4+</p>
            <p className="text-xs text-gray-500">Projects</p>
          </div>
          <div className="bg-[#252525] rounded-xl p-3 text-center border border-white/5">
            <p className="text-lg font-bold text-[#00ff88]">20+</p>
            <p className="text-xs text-gray-500">Skills</p>
          </div>
          <div className="bg-[#252525] rounded-xl p-3 text-center border border-white/5">
            <p className="text-lg font-bold text-[#00ff88]">CTF</p>
            <p className="text-xs text-gray-500">Player</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PROJECTS APP - File Manager Style
// ═══════════════════════════════════════════════════════════════

function ProjectsApp({ }: AppContentProps) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="h-full flex bg-[#1e1e1e]">
      {/* Sidebar */}
      <div className="w-48 bg-[#252525] border-r border-white/5 p-3 shrink-0">
        <p className="text-[10px] uppercase text-gray-500 font-semibold tracking-wider mb-2 px-2">
          Places
        </p>
        <button className="w-full text-left px-2 py-1.5 rounded-lg bg-white/5 text-white text-xs flex items-center gap-2 mb-1">
          <span className="text-amber-400">📁</span> Projects
        </button>
        <button className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-white/5 text-gray-400 text-xs flex items-center gap-2 mb-1 transition-colors">
          <span>⭐</span> Starred
        </button>
        <button className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-white/5 text-gray-400 text-xs flex items-center gap-2 transition-colors">
          <span>🕐</span> Recent
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="mb-3 flex items-center gap-2">
          <span className="text-xs text-gray-500 font-mono">
            ~/projects/
          </span>
          <span className="text-xs text-gray-600">
            — {PROFILE.projects.length} items
          </span>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {PROFILE.projects.map((project) => (
            <button
              key={project.name}
              className={`text-left p-3 rounded-xl border transition-all ${selected === project.name
                ? "bg-[#00ff88]/5 border-[#00ff88]/20"
                : "bg-[#252525] border-white/5 hover:border-white/10"
                }`}
              onClick={() => setSelected(project.name)}
              onDoubleClick={() => window.open(project.url, "_blank")}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-linear-to-br from-amber-400/20 to-amber-600/20 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-amber-400 text-lg">📁</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white text-sm">
                    {project.name}
                    <span className="ml-2 text-gray-600 text-xs font-normal">
                      ↗
                    </span>
                  </h3>
                  <p className="text-gray-400 text-xs mt-0.5 leading-relaxed">
                    {project.desc}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.tech.split(", ").map((t) => (
                      <span
                        key={t}
                        className="px-1.5 py-0.5 rounded text-[10px] bg-[#1e1e1e] text-gray-500 font-mono border border-white/5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        <p className="text-[10px] text-gray-600 mt-4 text-center font-mono">
          Double-click to open project in browser
        </p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// CONTACT APP
// ═══════════════════════════════════════════════════════════════

function ContactApp({ }: AppContentProps) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-[#1e1e1e] p-6">
      <div className="max-w-sm mx-auto">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-[#00ff88]/10 flex items-center justify-center mx-auto mb-3">
            <span className="text-xl">✉️</span>
          </div>
          <h2 className="text-lg font-bold text-white">Get in Touch</h2>
          <p className="text-gray-500 text-xs mt-1">
            Send me a message. I&apos;ll get back to you soon.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-xs text-gray-400 mb-1 block font-mono">
              Name
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-[#252525] border border-white/10 text-white text-sm focus:outline-none focus:border-[#00ff88]/30 transition-colors placeholder:text-gray-600"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1 block font-mono">
              Email
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-[#252525] border border-white/10 text-white text-sm focus:outline-none focus:border-[#00ff88]/30 transition-colors placeholder:text-gray-600"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1 block font-mono">
              Message
            </label>
            <textarea
              required
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-[#252525] border border-white/10 text-white text-sm focus:outline-none focus:border-[#00ff88]/30 transition-colors resize-none placeholder:text-gray-600"
              placeholder="Your message..."
            />
          </div>
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full py-2.5 rounded-lg bg-[#00ff88] text-black font-semibold text-sm hover:bg-[#00dd77] transition-colors disabled:opacity-50"
          >
            {status === "sending"
              ? "Sending..."
              : status === "sent"
                ? "✓ Sent!"
                : "Send Message"}
          </button>
          {status === "error" && (
            <p className="text-red-400 text-xs text-center">
              Failed to send. Try again.
            </p>
          )}
          {status === "sent" && (
            <p className="text-[#00ff88] text-xs text-center">
              Message sent successfully!
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// TERMINAL APP
// ═══════════════════════════════════════════════════════════════

interface TerminalLine {
  type: "input" | "output";
  content: string;
}

function TerminalApp({ closeWindow }: AppContentProps) {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "output", content: "harsh@admin:~$ welcome to HarshOS Terminal" },
    { type: "output", content: "" },
    { type: "output", content: '  Type "help" for available commands.' },
    { type: "output", content: "" },
  ]);
  const [input, setInput] = useState("");
  const [cwd, setCwd] = useState("~");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const FS: Record<string, string[]> = {
    "~": [
      "projects/",
      "experience/",
      "skills/",
      "about-me.txt",
      "contact-me.txt",
      "resume.txt",
      "certifications/"
    ],
    "~/projects": PROFILE.projects.map(p => (p.name || '').replace(/[^a-zA-Z0-9]/g, '-').replace(/--+/g, '-').toLowerCase() + ".txt"),
    "~/experience": PROFILE.experience.map((e, i) => `job${i + 1}-${(e.org || '').replace(/[^a-zA-Z0-9]/g, '-').replace(/--+/g, '-').toLowerCase()}.txt`),
    "~/skills": Object.keys(PROFILE.skills || {}).map(k => (k || '').replace(/[^a-zA-Z0-9]/g, '-').replace(/--+/g, '-').toLowerCase() + ".txt"),
    "~/certifications": PROFILE.certifications.map(c => {
      const parts = (c || '').split(" — ");
      const name = parts[0] || c || 'cert';
      return name.replace(/[^a-zA-Z0-9]/g, '-').replace(/--+/g, '-').toLowerCase() + ".txt";
    }),
    "/": ["home/", "etc/", "usr/", "tmp/", "var/"],
    "/etc": ["hostname", "os-release", "passwd"],
    "/usr": ["bin/", "lib/", "share/"],
    "/tmp": [],
    "/var": ["log/"],
    "/var/log": ["syslog", "auth.log"],
    "/home": ["harsh/"],
    "/home/harsh": [
      "projects/",
      "experience/",
      "skills/",
      "about-me.txt",
      "contact-me.txt",
      "resume.txt",
      "certifications/"
    ],
  };

  const FILE_CONTENTS: Record<string, string> = {
    "~/about-me.txt": `# ABOUT ME\n\nName: Harsh Gupta\nTitle: ${PROFILE.title}\n\n${PROFILE.summary}`,
    "~/contact-me.txt": `# CONTACT ME\n\nEmail: ${PROFILE.email}\nPhone: ${PROFILE.phone}\nGitHub: ${PROFILE.github}\nLinkedIn: ${PROFILE.linkedin}`,
    "~/resume.txt": `# RESUME\n\nEducation:\n${PROFILE.education[0].degree} at ${PROFILE.education[0].school}\nPeriod: ${PROFILE.education[0].period}\n${PROFILE.education[0].details}`,
    "/etc/hostname": "admin",
    "/etc/os-release":
      'NAME="HarshOS"\nVERSION="2.0 (Phantom)"\nID=harsh-os\nPRETTY_NAME="HarshOS 2.0 Phantom"\nHOME_URL="https://github.com/cazy8"',
  };

  // Populate dynamic files
  PROFILE.projects.forEach(p => {
    const fileName = `~/projects/${(p.name || '').replace(/[^a-zA-Z0-9]/g, '-').replace(/--+/g, '-').toLowerCase()}.txt`;
    FILE_CONTENTS[fileName] = `# PROJECT: ${p.name}\n\nTech: ${p.tech}\nLink: ${p.url}\n\n${p.desc}`;
  });

  PROFILE.experience.forEach((e, i) => {
    const fileName = `~/experience/job${i + 1}-${(e.org || '').replace(/[^a-zA-Z0-9]/g, '-').replace(/--+/g, '-').toLowerCase()}.txt`;
    FILE_CONTENTS[fileName] = `# ${e.role} at ${e.org}\n\nPeriod: ${e.period}\n\n${(e.points || []).map(pt => "- " + pt).join('\\n')}`;
  });

  Object.entries(PROFILE.skills || {}).forEach(([category, skills]) => {
    const fileName = `~/skills/${(category || '').replace(/[^a-zA-Z0-9]/g, '-').replace(/--+/g, '-').toLowerCase()}.txt`;
    FILE_CONTENTS[fileName] = `# SKILLS: ${category}\n\n${(skills || []).join(', ')}`;
  });

  PROFILE.certifications.forEach(c => {
    const parts = (c || '').split(" — ");
    const name = parts[0] || c || 'cert';
    const issuer = parts[1] || "";
    const fileName = `~/certifications/${name.replace(/[^a-zA-Z0-9]/g, '-').replace(/--+/g, '-').toLowerCase()}.txt`;
    FILE_CONTENTS[fileName] = `# CERTIFICATION\n\nName: ${name}\n${issuer ? "Issuer: " + issuer : ""}`;
  });


  const resolvedPath = (p: string): string => {
    if (p === "~" || p === "") return "~";
    if (p.startsWith("~/")) return p;
    if (p.startsWith("/")) return p;
    if (p === ".") return cwd;
    if (p === "..") {
      if (cwd === "~" || cwd === "/") return cwd;
      const parts = cwd.split("/");
      parts.pop();
      return parts.join("/") || (cwd.startsWith("~") ? "~" : "/");
    }
    return cwd === "/" ? "/" + p : cwd + "/" + p;
  };

  const processCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    const parts = trimmed.split(/\s+/);
    const command = parts[0];
    const args = parts.slice(1).join(" ");
    const output: string[] = [];

    switch (command) {
      case "help":
        output.push(
          "\x1b[1mAvailable commands:\x1b[0m",
          "  help        — Show this help",
          "  ls [dir]    — List directory",
          "  cd <dir>    — Change directory",
          "  cat <file>  — Show file contents",
          "  pwd         — Print working directory",
          "  whoami      — Print user name",
          "  hostname    — Print hostname",
          "  neofetch    — System info",
          "  echo <text> — Print text",
          "  date        — Show date/time",
          "  uname -a    — System info",
          "  clear       — Clear terminal",
          "  exit        — Close terminal"
        );
        break;

      case "ls": {
        const target = args ? resolvedPath(args) : cwd;
        const dir = FS[target];
        if (dir) {
          if (dir.length === 0) output.push("(empty directory)");
          else output.push(dir.join("  "));
        } else {
          output.push(`ls: cannot access '${args}': No such file or directory`);
        }
        break;
      }

      case "cd": {
        if (!args || args === "~") {
          setCwd("~");
          break;
        }
        const target = resolvedPath(args);
        if (FS[target] || FS[target.replace(/\/$/, "")]) {
          setCwd(target.replace(/\/$/, "") || "/");
        } else {
          output.push(`cd: ${args}: No such file or directory`);
        }
        break;
      }

      case "cat": {
        if (!args) {
          output.push("cat: missing operand");
          break;
        }
        const target = resolvedPath(args);
        const content = FILE_CONTENTS[target];
        if (content) {
          output.push(content);
        } else {
          output.push(`cat: ${args}: No such file or directory`);
        }
        break;
      }

      case "pwd":
        output.push(cwd === "~" ? "/home/harsh" : cwd);
        break;

      case "whoami":
        output.push("harsh");
        break;

      case "hostname":
        output.push("admin");
        break;

      case "echo":
        output.push(args || "");
        break;

      case "date":
        output.push(new Date().toString());
        break;

      case "uname":
        output.push(
          "Linux admin 6.8.0-harsh #1 SMP PREEMPT x86_64 GNU/Linux"
        );
        break;

      case "neofetch":
        output.push(
          "        .--.         \x1b[1mharsh@admin\x1b[0m",
          "       |o_o |        ─────────────────",
          "       |:_/ |        \x1b[1mOS:\x1b[0m HarshOS 2.0 Phantom",
          "      //   \\ \\       \x1b[1mKernel:\x1b[0m 6.8.0-harsh",
          "     (|     | )      \x1b[1mShell:\x1b[0m bash 5.2",
          "    /'\\_   _/`\\      \x1b[1mDE:\x1b[0m GNOME 45",
          "    \\___)=(___/      \x1b[1mTerminal:\x1b[0m harsh-term",
          "                     \x1b[1mTheme:\x1b[0m Hacker Dark [GTK3]",
          "                     \x1b[1mIcons:\x1b[0m Papirus-Dark",
          "                     \x1b[1mCPU:\x1b[0m x86_64",
          "                     \x1b[1mMemory:\x1b[0m 1337 MiB / 16384 MiB"
        );
        break;

      case "clear":
        setLines([]);
        return;

      case "exit":
        closeWindow();
        return;

      case "sudo":
        output.push(
          `[sudo] password for harsh: `,
          "Sorry, try again.",
          "harsh is not in the sudoers file. This incident will be reported."
        );
        break;

      default:
        output.push(
          `bash: ${command}: command not found`
        );
    }

    setLines((prev) => [
      ...prev,
      { type: "input", content: `${cwd}$ ${trimmed}` },
      ...output.map((o) => ({ type: "output" as const, content: o })),
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      processCommand(input);
      setHistory((prev) => [input, ...prev]);
      setHistoryIdx(-1);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIdx < history.length - 1) {
        const newIdx = historyIdx + 1;
        setHistoryIdx(newIdx);
        setInput(history[newIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx > 0) {
        const newIdx = historyIdx - 1;
        setHistoryIdx(newIdx);
        setInput(history[newIdx]);
      } else {
        setHistoryIdx(-1);
        setInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      // Basic tab completion
      const dir = FS[cwd];
      if (dir && input) {
        const match = dir.find((f) => f.toLowerCase().startsWith(input.toLowerCase()));
        if (match) setInput(match.replace(/\/$/, ""));
      }
    }
  };

  // Render a line with ANSI-like bold markers
  const renderContent = (text: string) => {
    const parts = text.split(/\x1b\[1m|\x1b\[0m/);
    // Odd indices are bold
    return parts.map((part, i) =>
      i % 2 === 1 ? (
        <span key={i} className="font-bold text-[#00ff88]">{part}</span>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  return (
    <div className="h-full flex flex-col" style={{ fontFamily: "'Fira Code', 'JetBrains Mono', 'Cascadia Code', monospace" }}>
      {/* Terminal toolbar (UIverse-inspired) */}
      <div className="flex items-center h-[30px] px-2 bg-[#212121] border-b border-white/5 shrink-0">
        <div className="flex items-center gap-[5px]">
          <button
            onClick={closeWindow}
            className="w-[12px] h-[12px] rounded-full bg-[#ff5f57] hover:brightness-110 transition-all"
            onMouseDown={(e) => e.stopPropagation()}
          />
          <div className="w-[12px] h-[12px] rounded-full bg-[#febc2e]" />
          <div className="w-[12px] h-[12px] rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 text-center">
          <span className="text-[11px] text-white/40 font-mono">harsh@admin: {cwd}</span>
        </div>
      </div>

      {/* Terminal body */}
      <div
        className="flex-1 overflow-y-auto p-3 text-[13px] leading-[1.6] cursor-text"
        style={{ background: "rgba(33, 33, 33, 0.95)" }}
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap break-all">
            {line.type === "input" ? (() => {
              const dollarIdx = line.content.indexOf("$ ");
              const path = dollarIdx >= 0 ? line.content.slice(0, dollarIdx) : line.content;
              const cmd = dollarIdx >= 0 ? line.content.slice(dollarIdx + 2) : "";
              return (
                <>
                  <span className="text-[#00ff88]">harsh@admin</span>
                  <span className="text-gray-400">:</span>
                  <span className="text-[#6196ff]">{path}</span>
                  <span className="text-gray-400">$ </span>
                  <span className="text-[#e0e0e0]">{cmd}</span>
                </>
              );
            })() : (
              <span className="text-[#b0b0b0]">{renderContent(line.content)}</span>
            )}
          </div>
        ))}

        {/* Active input line */}
        <div className="flex items-center whitespace-pre">
          <span className="text-[#00ff88]">harsh@admin</span>
          <span className="text-gray-400">:</span>
          <span className="text-[#6196ff]">{cwd}</span>
          <span className="text-gray-400">$ </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-[#e0e0e0] caret-[#00ff88] ml-0.5"
            style={{ fontFamily: "inherit", fontSize: "inherit" }}
            spellCheck={false}
            autoComplete="off"
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// TEXT EDITOR APP
// ═══════════════════════════════════════════════════════════════

function TextEditorApp({ }: AppContentProps) {
  const [content, setContent] = useState(
    `#!/usr/bin/env python3
# welcome.py — Harsh Gupta's Portfolio
# A quick hello from the terminal side of things

import os
import sys

def banner():
    """Display the welcome banner."""
    print("""
    ╔══════════════════════════════════════╗
    ║  Welcome to HarshOS v2.0            ║
    ║  Cybersecurity | Development | CTF  ║
    ╚══════════════════════════════════════╝
    """)

def main():
    banner()
    print(f"User: {os.getlogin()}")
    print(f"Python: {sys.version.split()[0]}")
    print(f"Platform: {sys.platform}")
    print()
    print("// Stay curious. Stay secure. //")

if __name__ == "__main__":
    main()
`
  );
  const [fileName] = useState("welcome.py");
  const [modified, setModified] = useState(false);

  const lineCount = content.split("\n").length;

  return (
    <div className="h-full flex flex-col bg-[#1e1e1e]">
      {/* Menu bar */}
      <div className="flex items-center gap-4 px-3 py-1.5 bg-[#2b2b2b] border-b border-white/5 text-[11px] text-gray-400">
        <span className="hover:text-white cursor-pointer transition-colors">
          File
        </span>
        <span className="hover:text-white cursor-pointer transition-colors">
          Edit
        </span>
        <span className="hover:text-white cursor-pointer transition-colors">
          View
        </span>
        <span className="hover:text-white cursor-pointer transition-colors">
          Help
        </span>
        <div className="flex-1" />
        <span className="text-gray-500 font-mono">
          {fileName}
          {modified ? " •" : ""}
        </span>
      </div>

      {/* Editor area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Line numbers */}
        <div className="w-12 bg-[#1e1e1e] border-r border-white/5 pt-2 pr-2 text-right font-mono text-xs text-gray-600 select-none overflow-hidden shrink-0">
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i} className="leading-5 h-5">
              {i + 1}
            </div>
          ))}
        </div>

        {/* Text area */}
        <textarea
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            setModified(true);
          }}
          className="flex-1 bg-[#1e1e1e] text-gray-200 font-mono text-xs p-2 outline-none resize-none leading-5"
          spellCheck={false}
          autoComplete="off"
        />
      </div>

      {/* Status bar */}
      <div className="flex items-center px-3 py-1 bg-[#007acc] text-white text-[10px] gap-4">
        <span>Python</span>
        <span>UTF-8</span>
        <span>LF</span>
        <div className="flex-1" />
        <span>
          Ln {lineCount}, Col 1
        </span>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// FILE MANAGER APP
// ═══════════════════════════════════════════════════════════════

function FileManagerApp({ }: AppContentProps) {
  const [currentPath, setCurrentPath] = useState("/home/harsh");

  const FS: Record<string, { name: string; isDir: boolean; size?: string }[]> = {
    "/home/harsh": [
      { name: "Desktop", isDir: true },
      { name: "Documents", isDir: true },
      { name: "Downloads", isDir: true },
      { name: "Pictures", isDir: true },
      { name: ".bashrc", isDir: false, size: "256 B" },
      { name: ".gitconfig", isDir: false, size: "128 B" },
    ],
    "/home/harsh/Desktop": [
      { name: "resume.pdf", isDir: false, size: "84 KB" },
      { name: "projects", isDir: true },
      { name: "notes.txt", isDir: false, size: "1.2 KB" },
    ],
    "/home/harsh/Documents": [
      { name: "resume.pdf", isDir: false, size: "84 KB" },
      { name: "cover-letter.md", isDir: false, size: "2.4 KB" },
    ],
    "/home/harsh/Downloads": [],
    "/home/harsh/Pictures": [
      { name: "wallpaper.png", isDir: false, size: "3.2 MB" },
    ],
    "/home/harsh/Desktop/projects": [
      { name: "cyb3rfy", isDir: true },
      { name: "portfolio", isDir: true },
      { name: "ctf-writeups", isDir: true },
      { name: "security-tools", isDir: true },
    ],
  };

  const items = FS[currentPath] || [];
  const pathParts = currentPath.split("/").filter(Boolean);

  const navigateTo = (path: string) => {
    if (FS[path]) setCurrentPath(path);
  };

  const goUp = () => {
    const parts = currentPath.split("/").filter(Boolean);
    if (parts.length > 0) {
      parts.pop();
      navigateTo("/" + (parts.join("/") || "home/harsh"));
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#1e1e1e]">
      {/* Breadcrumb bar */}
      <div className="flex items-center gap-2 px-3 py-2 bg-[#2b2b2b] border-b border-white/5">
        <button
          onClick={goUp}
          className="w-6 h-6 rounded flex items-center justify-center hover:bg-white/10 text-gray-400 transition-colors"
        >
          ←
        </button>
        <div className="flex items-center gap-1 text-xs font-mono">
          <button
            onClick={() => navigateTo("/home/harsh")}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ~
          </button>
          {pathParts.slice(2).map((part, i) => (
            <React.Fragment key={i}>
              <span className="text-gray-600">/</span>
              <button
                onClick={() =>
                  navigateTo(
                    "/" + pathParts.slice(0, i + 3).join("/")
                  )
                }
                className="text-gray-400 hover:text-white transition-colors"
              >
                {part}
              </button>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Sidebar + Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-40 bg-[#252525] border-r border-white/5 p-2 shrink-0 overflow-y-auto">
          <p className="text-[9px] uppercase text-gray-600 font-semibold tracking-wider mb-1.5 px-1.5">
            Quick Access
          </p>
          {["Desktop", "Documents", "Downloads", "Pictures"].map((dir) => (
            <button
              key={dir}
              onClick={() => navigateTo(`/home/harsh/${dir}`)}
              className={`w-full text-left px-1.5 py-1 rounded text-xs flex items-center gap-1.5 mb-0.5 transition-colors ${currentPath === `/home/harsh/${dir}`
                ? "bg-white/10 text-white"
                : "text-gray-400 hover:bg-white/5"
                }`}
            >
              <span className="text-sm">
                {dir === "Desktop"
                  ? "🖥"
                  : dir === "Documents"
                    ? "📄"
                    : dir === "Downloads"
                      ? "⬇️"
                      : "🖼"}
              </span>
              {dir}
            </button>
          ))}
        </div>

        {/* File grid */}
        <div className="flex-1 p-3 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-600 text-xs">
              Folder is empty
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-3">
              {items.map((item) => (
                <button
                  key={item.name}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-xl hover:bg-white/5 transition-colors group"
                  onDoubleClick={() => {
                    if (item.isDir) {
                      navigateTo(
                        currentPath === "/"
                          ? `/${item.name}`
                          : `${currentPath}/${item.name}`
                      );
                    }
                  }}
                >
                  <span className="text-3xl">
                    {item.isDir
                      ? "📁"
                      : item.name.endsWith(".pdf")
                        ? "📄"
                        : item.name.endsWith(".py")
                          ? "🐍"
                          : item.name.endsWith(".md")
                            ? "📝"
                            : item.name.endsWith(".png") || item.name.endsWith(".jpg")
                              ? "🖼"
                              : "📄"}
                  </span>
                  <span className="text-[10px] text-gray-300 text-center truncate w-full group-hover:text-white transition-colors">
                    {item.name}
                  </span>
                  {!item.isDir && item.size && (
                    <span className="text-[9px] text-gray-600">{item.size}</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Status bar */}
      <div className="px-3 py-1 bg-[#2b2b2b] border-t border-white/5 text-[10px] text-gray-500">
        {items.length} items
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// CALCULATOR APP
// ═══════════════════════════════════════════════════════════════

function CalculatorApp({ }: AppContentProps) {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
      return;
    }
    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const performOperation = (nextOp: string) => {
    const current = parseFloat(display);

    if (previousValue !== null && operation && !waitingForOperand) {
      let result = 0;
      switch (operation) {
        case "+":
          result = previousValue + current;
          break;
        case "-":
          result = previousValue - current;
          break;
        case "×":
          result = previousValue * current;
          break;
        case "÷":
          result = current !== 0 ? previousValue / current : 0;
          break;
      }
      setDisplay(String(parseFloat(result.toFixed(10))));
      setPreviousValue(result);
    } else {
      setPreviousValue(current);
    }

    setWaitingForOperand(true);
    setOperation(nextOp);
  };

  const calculate = () => {
    if (previousValue === null || !operation) return;
    performOperation("=");
    setOperation(null);
  };

  const clear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const toggleSign = () => {
    const val = parseFloat(display);
    setDisplay(String(-val));
  };

  const percent = () => {
    const val = parseFloat(display);
    setDisplay(String(val / 100));
  };

  const BTN =
    "flex items-center justify-center rounded-xl text-base font-medium transition-all active:scale-95";

  return (
    <div className="h-full flex flex-col bg-[#1e1e1e] p-4">
      {/* Display */}
      <div className="bg-[#0c0c0c] rounded-xl p-4 mb-4 border border-white/5">
        <div className="text-right text-xs text-gray-500 font-mono h-4 mb-1">
          {previousValue !== null && operation
            ? `${previousValue} ${operation}`
            : ""}
        </div>
        <div className="text-right text-3xl font-light text-white font-mono truncate">
          {display}
        </div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-4 gap-2 flex-1">
        <button
          className={`${BTN} bg-[#333] text-white hover:bg-[#444]`}
          onClick={clear}
        >
          AC
        </button>
        <button
          className={`${BTN} bg-[#333] text-white hover:bg-[#444]`}
          onClick={toggleSign}
        >
          ±
        </button>
        <button
          className={`${BTN} bg-[#333] text-white hover:bg-[#444]`}
          onClick={percent}
        >
          %
        </button>
        <button
          className={`${BTN} bg-[#00ff88]/20 text-[#00ff88] hover:bg-[#00ff88]/30`}
          onClick={() => performOperation("÷")}
        >
          ÷
        </button>

        {["7", "8", "9"].map((d) => (
          <button
            key={d}
            className={`${BTN} bg-[#252525] text-white hover:bg-[#2f2f2f]`}
            onClick={() => inputDigit(d)}
          >
            {d}
          </button>
        ))}
        <button
          className={`${BTN} bg-[#00ff88]/20 text-[#00ff88] hover:bg-[#00ff88]/30`}
          onClick={() => performOperation("×")}
        >
          ×
        </button>

        {["4", "5", "6"].map((d) => (
          <button
            key={d}
            className={`${BTN} bg-[#252525] text-white hover:bg-[#2f2f2f]`}
            onClick={() => inputDigit(d)}
          >
            {d}
          </button>
        ))}
        <button
          className={`${BTN} bg-[#00ff88]/20 text-[#00ff88] hover:bg-[#00ff88]/30`}
          onClick={() => performOperation("-")}
        >
          −
        </button>

        {["1", "2", "3"].map((d) => (
          <button
            key={d}
            className={`${BTN} bg-[#252525] text-white hover:bg-[#2f2f2f]`}
            onClick={() => inputDigit(d)}
          >
            {d}
          </button>
        ))}
        <button
          className={`${BTN} bg-[#00ff88]/20 text-[#00ff88] hover:bg-[#00ff88]/30`}
          onClick={() => performOperation("+")}
        >
          +
        </button>

        <button
          className={`${BTN} col-span-2 bg-[#252525] text-white hover:bg-[#2f2f2f]`}
          onClick={() => inputDigit("0")}
        >
          0
        </button>
        <button
          className={`${BTN} bg-[#252525] text-white hover:bg-[#2f2f2f]`}
          onClick={inputDecimal}
        >
          .
        </button>
        <button
          className={`${BTN} bg-[#00ff88] text-black hover:bg-[#00dd77] font-bold`}
          onClick={calculate}
        >
          =
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SETTINGS APP
// ═══════════════════════════════════════════════════════════════

function SettingsApp({ }: AppContentProps) {
  const [activeTab, setActiveTab] = useState("about");
  const [resolution, setResolution] = useState("1920 × 1080");

  useEffect(() => {
    setResolution(`${window.innerWidth} × ${window.innerHeight}`);
  }, []);

  return (
    <div className="h-full flex bg-[#1e1e1e]">
      {/* Sidebar */}
      <div className="w-48 bg-[#252525] border-r border-white/5 p-3 shrink-0">
        <p className="text-[10px] uppercase text-gray-500 font-semibold tracking-wider mb-2 px-2">
          System
        </p>
        {[
          { id: "about", icon: "ℹ️", label: "About" },
          { id: "display", icon: "🖥", label: "Display" },
          { id: "network", icon: "📡", label: "Network" },
          { id: "keyboard", icon: "⌨️", label: "Keyboard" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full text-left px-2 py-1.5 rounded-lg text-xs flex items-center gap-2 mb-1 transition-colors ${activeTab === tab.id
              ? "bg-white/10 text-white"
              : "text-gray-400 hover:bg-white/5"
              }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === "about" && (
          <div>
            <h2 className="text-lg font-bold text-white mb-6">About</h2>

            {/* OS Logo */}
            <div className="text-center mb-6">
              <div className="text-5xl mb-2">🐧</div>
              <h3 className="text-xl font-bold text-white">HarshOS</h3>
              <p className="text-xs text-gray-500 font-mono">
                Version 2.0 &quot;Phantom&quot;
              </p>
            </div>

            {/* System info table */}
            <div className="bg-[#252525] rounded-xl border border-white/5 overflow-hidden">
              {[
                ["Device Name", "admin"],
                ["OS", "HarshOS 2.0 Phantom"],
                ["Kernel", "Linux 6.8.0-harsh"],
                ["Architecture", "x86_64"],
                ["Desktop", "GNOME 45"],
                ["Shell", "bash 5.2.21"],
                ["Terminal", "harsh-term 2.0"],
                ["Theme", "Hacker Dark [GTK3]"],
                ["Icons", "Papirus-Dark [GTK3]"],
                ["Uptime", "∞"],
              ].map(([key, value], i) => (
                <div
                  key={key}
                  className={`flex items-center px-4 py-2.5 ${i > 0 ? "border-t border-white/5" : ""
                    }`}
                >
                  <span className="text-xs text-gray-400 w-32">{key}</span>
                  <span className="text-xs text-white font-mono">{value}</span>
                </div>
              ))}
            </div>

            {/* Neofetch-style mini display */}
            <div className="mt-6 bg-[#0c0c0c] rounded-xl p-4 font-mono text-[11px] border border-white/5">
              <pre className="text-[#00ff88] leading-relaxed">
                {`        .--.         harsh@admin
       |o_o |        ─────────────
       |:_/ |        OS: HarshOS 2.0
      //   \\ \\       Kernel: 6.8.0-harsh
     (|     | )      Uptime: ∞
    /'\\_   _/\`\\      Shell: bash 5.2
    \\___)=(___/      DE: GNOME 45`}
              </pre>
            </div>
          </div>
        )}

        {activeTab === "display" && (
          <div>
            <h2 className="text-lg font-bold text-white mb-4">Display</h2>
            <div className="bg-[#252525] rounded-xl p-4 border border-white/5 space-y-4">
              <div>
                <label className="text-xs text-gray-400 block mb-2">
                  Resolution
                </label>
                <div className="text-sm text-white font-mono">
                  {resolution}
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-400 block mb-2">
                  Scale
                </label>
                <div className="text-sm text-white font-mono">100%</div>
              </div>
              <div>
                <label className="text-xs text-gray-400 block mb-2">
                  Theme
                </label>
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#0c0c0c] border-2 border-[#00ff88] flex items-center justify-center text-xs">
                    🌙
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-gray-200 border border-gray-300 flex items-center justify-center text-xs opacity-50">
                    ☀️
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {(activeTab === "network" || activeTab === "keyboard") && (
          <div>
            <h2 className="text-lg font-bold text-white mb-4">
              {activeTab === "network" ? "Network" : "Keyboard"}
            </h2>
            <div className="bg-[#252525] rounded-xl p-6 border border-white/5 text-center">
              <p className="text-gray-500 text-sm">
                Settings for {activeTab} coming soon...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MUSIC APP
// ═══════════════════════════════════════════════════════════════

const TRACKS = [
  { title: "Kernel Panic", artist: "System Process", duration: "3:42" },
  { title: "sudo rm -rf /", artist: "Root User", duration: "4:15" },
  { title: "Segfault Symphony", artist: "Core Dump", duration: "2:58" },
  { title: "Fork Bomb", artist: "Process Tree", duration: "5:01" },
  { title: "Buffer Overflow", artist: "Stack Smash", duration: "3:33" },
  { title: "Race Condition", artist: "Thread Pool", duration: "4:20" },
  { title: "Null Pointer", artist: "Exception Handler", duration: "2:45" },
];

function MusicApp({ }: AppContentProps) {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          setCurrentTrack((t) => (t + 1) % TRACKS.length);
          return 0;
        }
        return p + 0.5;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const track = TRACKS[currentTrack];

  return (
    <div className="h-full flex flex-col bg-[#1e1e1e]">
      {/* Album art area */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div
          className={`w-40 h-40 rounded-full bg-linear-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-2xl shadow-purple-500/20 ${isPlaying ? "animate-spin" : ""
            }`}
          style={{ animationDuration: "3s" }}
        >
          <div className="w-14 h-14 rounded-full bg-[#1e1e1e] flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-[#333]" />
          </div>
        </div>
      </div>

      {/* Track info */}
      <div className="text-center px-6 mb-4">
        <h3 className="text-white font-semibold text-sm">{track.title}</h3>
        <p className="text-gray-500 text-xs mt-0.5">{track.artist}</p>
      </div>

      {/* Progress bar */}
      <div className="px-6 mb-4">
        <div className="w-full h-1 bg-[#333] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#00ff88] rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-1 text-[10px] text-gray-600 font-mono">
          <span>
            {(() => {
              const [m, s] = track.duration.split(":").map(Number);
              const totalSec = m * 60 + s;
              const elapsed = (progress / 100) * totalSec;
              return `${Math.floor(elapsed / 60)}:${Math.floor(elapsed % 60).toString().padStart(2, "0")}`;
            })()}
          </span>
          <span>{track.duration}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-6 mb-4">
        <button
          onClick={() => {
            setCurrentTrack((t) => (t - 1 + TRACKS.length) % TRACKS.length);
            setProgress(0);
          }}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 6h2v12H6V6zm3.5 6l8.5 6V6l-8.5 6z" />
          </svg>
        </button>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-12 h-12 rounded-full bg-[#00ff88] text-black flex items-center justify-center hover:bg-[#00dd77] transition-colors"
        >
          {isPlaying ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
        <button
          onClick={() => {
            setCurrentTrack((t) => (t + 1) % TRACKS.length);
            setProgress(0);
          }}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 18l8.5-6L6 6v12zm8.5 0h2V6h-2v12z" />
          </svg>
        </button>
      </div>

      {/* Track list */}
      <div className="border-t border-white/5 overflow-y-auto max-h-40">
        {TRACKS.map((t, i) => (
          <button
            key={i}
            onClick={() => {
              setCurrentTrack(i);
              setProgress(0);
              setIsPlaying(true);
            }}
            className={`w-full text-left px-4 py-2 flex items-center gap-3 hover:bg-white/5 transition-colors ${i === currentTrack ? "bg-white/5" : ""
              }`}
          >
            <span
              className={`text-xs font-mono w-5 ${i === currentTrack ? "text-[#00ff88]" : "text-gray-600"
                }`}
            >
              {i === currentTrack && isPlaying ? "▶" : i + 1}
            </span>
            <div className="flex-1 min-w-0">
              <p
                className={`text-xs truncate ${i === currentTrack ? "text-[#00ff88]" : "text-gray-300"
                  }`}
              >
                {t.title}
              </p>
              <p className="text-[10px] text-gray-600 truncate">{t.artist}</p>
            </div>
            <span className="text-[10px] text-gray-600 font-mono">
              {t.duration}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MINESWEEPER APP
// ═══════════════════════════════════════════════════════════════

interface MineCell {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighborMines: number;
}

const MINE_ROWS = 9;
const MINE_COLS = 9;
const MINE_COUNT = 10;

function createBoard(): MineCell[][] {
  const board: MineCell[][] = Array.from({ length: MINE_ROWS }, () =>
    Array.from({ length: MINE_COLS }, () => ({
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      neighborMines: 0,
    }))
  );

  // Place mines
  let placed = 0;
  while (placed < MINE_COUNT) {
    const r = Math.floor(Math.random() * MINE_ROWS);
    const c = Math.floor(Math.random() * MINE_COLS);
    if (!board[r][c].isMine) {
      board[r][c].isMine = true;
      placed++;
    }
  }

  // Calculate neighbor counts
  for (let r = 0; r < MINE_ROWS; r++) {
    for (let c = 0; c < MINE_COLS; c++) {
      if (board[r][c].isMine) continue;
      let count = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr;
          const nc = c + dc;
          if (
            nr >= 0 &&
            nr < MINE_ROWS &&
            nc >= 0 &&
            nc < MINE_COLS &&
            board[nr][nc].isMine
          ) {
            count++;
          }
        }
      }
      board[r][c].neighborMines = count;
    }
  }

  return board;
}

function MinesweeperApp({ }: AppContentProps) {
  const [board, setBoard] = useState<MineCell[][]>(createBoard);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [flags, setFlags] = useState(0);
  const [time, setTime] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started || gameOver || won) return;
    const interval = setInterval(() => setTime((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, [started, gameOver, won]);

  const revealCell = (r: number, c: number) => {
    if (gameOver || won) return;
    const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));
    const cell = newBoard[r][c];

    if (cell.isRevealed || cell.isFlagged) return;
    if (!started) setStarted(true);

    cell.isRevealed = true;

    if (cell.isMine) {
      // Reveal all mines
      newBoard.forEach((row) =>
        row.forEach((c) => {
          if (c.isMine) c.isRevealed = true;
        })
      );
      setGameOver(true);
      setBoard(newBoard);
      return;
    }

    // Flood fill for empty cells
    if (cell.neighborMines === 0) {
      const queue = [[r, c]];
      while (queue.length > 0) {
        const [cr, cc] = queue.shift()!;
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const nr = cr + dr;
            const nc = cc + dc;
            if (
              nr >= 0 &&
              nr < MINE_ROWS &&
              nc >= 0 &&
              nc < MINE_COLS &&
              !newBoard[nr][nc].isRevealed &&
              !newBoard[nr][nc].isFlagged
            ) {
              newBoard[nr][nc].isRevealed = true;
              if (newBoard[nr][nc].neighborMines === 0) {
                queue.push([nr, nc]);
              }
            }
          }
        }
      }
    }

    // Check win
    const unrevealed = newBoard
      .flat()
      .filter((c) => !c.isRevealed && !c.isMine).length;
    if (unrevealed === 0) {
      setWon(true);
    }

    setBoard(newBoard);
  };

  const flagCell = (e: React.MouseEvent, r: number, c: number) => {
    e.preventDefault();
    if (gameOver || won) return;
    const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));
    const cell = newBoard[r][c];
    if (cell.isRevealed) return;

    cell.isFlagged = !cell.isFlagged;
    setFlags(cell.isFlagged ? flags + 1 : flags - 1);
    setBoard(newBoard);
  };

  const reset = () => {
    setBoard(createBoard());
    setGameOver(false);
    setWon(false);
    setFlags(0);
    setTime(0);
    setStarted(false);
  };

  const NUM_COLORS = [
    "",
    "text-blue-400",
    "text-green-400",
    "text-red-400",
    "text-purple-400",
    "text-amber-400",
    "text-cyan-400",
    "text-white",
    "text-gray-400",
  ];

  return (
    <div className="h-full flex flex-col bg-[#1e1e1e] items-center">
      {/* Header */}
      <div className="flex items-center gap-4 py-3 px-4 w-full bg-[#252525] border-b border-white/5">
        <div className="flex items-center gap-1 bg-[#0c0c0c] px-3 py-1 rounded-lg font-mono text-sm text-red-400 min-w-[60px] justify-center border border-white/5">
          💣 {MINE_COUNT - flags}
        </div>
        <button
          onClick={reset}
          className="mx-auto text-xl hover:scale-110 transition-transform"
        >
          {gameOver ? "😵" : won ? "😎" : "🙂"}
        </button>
        <div className="flex items-center gap-1 bg-[#0c0c0c] px-3 py-1 rounded-lg font-mono text-sm text-[#00ff88] min-w-[60px] justify-center border border-white/5">
          ⏱ {time}
        </div>
      </div>

      {/* Board */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div
          className="inline-grid gap-0.5 bg-[#0c0c0c] p-1 rounded-lg"
          style={{
            gridTemplateColumns: `repeat(${MINE_COLS}, 1fr)`,
          }}
        >
          {board.map((row, r) =>
            row.map((cell, c) => (
              <button
                key={`${r}-${c}`}
                className={`w-8 h-8 text-xs font-bold flex items-center justify-center rounded transition-all ${cell.isRevealed
                  ? cell.isMine
                    ? "bg-red-500/20 text-red-400"
                    : "bg-[#2a2a2a]"
                  : "bg-[#3a3a3a] hover:bg-[#444] active:bg-[#2a2a2a]"
                  } ${cell.isFlagged && !cell.isRevealed ? "bg-amber-500/10" : ""}`}
                onClick={() => revealCell(r, c)}
                onContextMenu={(e) => flagCell(e, r, c)}
              >
                {cell.isRevealed
                  ? cell.isMine
                    ? "💣"
                    : cell.neighborMines > 0
                      ? (
                        <span className={NUM_COLORS[cell.neighborMines]}>
                          {cell.neighborMines}
                        </span>
                      )
                      : ""
                  : cell.isFlagged
                    ? "🚩"
                    : ""}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Game status */}
      {(gameOver || won) && (
        <div className="pb-3 text-center">
          <p
            className={`text-sm font-bold mb-2 ${won ? "text-[#00ff88]" : "text-red-400"
              }`}
          >
            {won ? "🎉 You won!" : "💥 Game over!"}
          </p>
          <button
            onClick={reset}
            className="px-4 py-1.5 rounded-lg bg-[#00ff88]/10 text-[#00ff88] text-xs font-mono hover:bg-[#00ff88]/20 transition-colors border border-[#00ff88]/20"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// WALLPAPER APP - Desktop Background Picker
// ═══════════════════════════════════════════════════════════════

function WallpaperApp({ closeWindow }: AppContentProps) {
  const { wallpaperId, setWallpaperId } = useWallpaper();

  return (
    <div className="h-full flex flex-col bg-[#1e1e1e]">
      {/* Toolbar */}
      <div className="shrink-0 bg-[#2b2b2b] border-b border-white/5 px-4 py-2.5 flex items-center gap-3">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#00ff88">
          <rect x="2" y="3" width="20" height="18" rx="2" />
          <circle cx="8" cy="9" r="2" fillOpacity="0.4" />
          <path d="M2 16l5-4 3 3 4-5 8 7v1a2 2 0 01-2 2H4a2 2 0 01-2-2v-2z" fillOpacity="0.3" />
        </svg>
        <span className="text-xs text-white/50 font-mono">
          Wallpapers — Choose your desktop background
        </span>
      </div>

      {/* Wallpaper Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-3 gap-3">
          {WALLPAPERS.map((wp) => (
            <button
              key={wp.id}
              className={`relative rounded-xl overflow-hidden border-2 transition-all aspect-video group ${wallpaperId === wp.id
                ? "border-[#00ff88] ring-2 ring-[#00ff88]/20 scale-[1.02]"
                : "border-white/10 hover:border-white/30"
                }`}
              onClick={() => setWallpaperId(wp.id)}
            >
              {wp.thumbnail ? (
                <img
                  src={wp.thumbnail}
                  alt={wp.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  className="w-full h-full"
                  style={{
                    background:
                      "linear-gradient(135deg, #0a0a0a 0%, #0d1117 25%, #0a0f0d 50%, #0d0f0a 75%, #0a0a0a 100%)",
                  }}
                >
                  <div
                    className="w-full h-full opacity-20"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 30% 40%, rgba(0,255,136,0.3) 0%, transparent 50%)",
                    }}
                  />
                </div>
              )}
              {/* Label overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent pt-5 pb-2 px-2">
                <span className="text-[11px] text-white font-medium drop-shadow-lg">
                  {wp.name}
                </span>
              </div>
              {/* Selected checkmark */}
              {wallpaperId === wp.id && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#00ff88] flex items-center justify-center shadow-lg">
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="shrink-0 border-t border-white/5 px-4 py-3 flex items-center justify-between bg-[#2b2b2b]/60">
        <span className="text-[10px] text-white/30 font-mono">
          {WALLPAPERS.length} wallpapers available
        </span>
        <button
          onClick={closeWindow}
          className="px-4 py-1.5 rounded-lg bg-[#00ff88]/10 text-[#00ff88] text-xs font-mono hover:bg-[#00ff88]/20 transition-colors border border-[#00ff88]/20"
        >
          Done
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// FLAPPY BIRD GAME
// ═══════════════════════════════════════════════════════════════

function FlappyBirdApp({ }: AppContentProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<{ bird: { y: number, v: number }, pipes: { x: number, gap: number }[], score: number, alive: boolean, frame: number }>({ bird: { y: 200, v: 0 }, pipes: [], score: 0, alive: true, frame: 0 });

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    const W = canvas.width, H = canvas.height;
    const g = gameRef.current;
    const reset = () => { g.bird = { y: 200, v: 0 }; g.pipes = []; g.score = 0; g.alive = true; g.frame = 0; };
    reset();
    const jump = () => { if (g.alive) g.bird.v = -6; else reset(); };
    canvas.onclick = jump;
    const onKey = (e: KeyboardEvent) => { if (e.code === "Space") { e.preventDefault(); jump(); } };
    window.addEventListener("keydown", onKey);
    let raf = 0;
    const loop = () => {
      g.frame++;
      if (g.alive) {
        g.bird.v += 0.3; g.bird.y += g.bird.v;
        if (g.frame % 90 === 0) g.pipes.push({ x: W, gap: 100 + Math.random() * 120 });
        g.pipes.forEach(p => { p.x -= 2.5; });
        g.pipes = g.pipes.filter(p => p.x > -60);
        g.pipes.forEach(p => {
          const topH = p.gap; const botY = topH + 120;
          if (g.bird.y < topH || g.bird.y > botY) { if (p.x < 170 && p.x > 120) g.alive = false; }
          if (p.x === 148) g.score++;
        });
        if (g.bird.y > H || g.bird.y < 0) g.alive = false;
      }
      ctx.fillStyle = "#0d1b2a"; ctx.fillRect(0, 0, W, H);
      // pipes
      ctx.fillStyle = "#00ff88";
      g.pipes.forEach(p => {
        ctx.fillRect(p.x, 0, 40, p.gap);
        ctx.fillRect(p.x, p.gap + 120, 40, H);
      });
      // bird
      ctx.fillStyle = "#FFD54F";
      ctx.beginPath(); ctx.arc(150, g.bird.y, 14, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#212121";
      ctx.beginPath(); ctx.arc(156, g.bird.y - 3, 3, 0, Math.PI * 2); ctx.fill();
      // score
      ctx.fillStyle = "#fff"; ctx.font = "bold 24px monospace"; ctx.textAlign = "center";
      ctx.fillText(String(g.score), W / 2, 40);
      if (!g.alive) {
        ctx.fillStyle = "rgba(0,0,0,0.6)"; ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = "#ff4444"; ctx.font = "bold 28px monospace"; ctx.fillText("GAME OVER", W / 2, H / 2 - 10);
        ctx.fillStyle = "#aaa"; ctx.font = "14px monospace"; ctx.fillText("Click to restart", W / 2, H / 2 + 20);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("keydown", onKey); };
  }, []);

  return <canvas ref={canvasRef} width={360} height={500} className="w-full h-full bg-[#0d1b2a] block" />;
}

// ═══════════════════════════════════════════════════════════════
// PONG GAME
// ═══════════════════════════════════════════════════════════════

function PongApp({ }: AppContentProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    const W = canvas.width, H = canvas.height;
    let pY = H / 2 - 40, aiY = H / 2 - 40;
    let bx = W / 2, by = H / 2, bvx = 3, bvy = 2;
    let pScore = 0, aiScore = 0;
    const onMove = (e: MouseEvent) => { const r = canvas.getBoundingClientRect(); pY = e.clientY - r.top - 40; };
    canvas.addEventListener("mousemove", onMove);
    let raf = 0;
    const loop = () => {
      // AI
      if (by > aiY + 40) aiY += 2.5; else if (by < aiY + 40) aiY -= 2.5;
      bx += bvx; by += bvy;
      if (by <= 0 || by >= H) bvy *= -1;
      // paddle hit
      if (bx <= 20 && by > pY && by < pY + 80) { bvx = Math.abs(bvx) * 1.02; bvy += (by - pY - 40) * 0.1; }
      if (bx >= W - 20 && by > aiY && by < aiY + 80) { bvx = -Math.abs(bvx) * 1.02; bvy += (by - aiY - 40) * 0.1; }
      if (bx < 0) { aiScore++; bx = W / 2; by = H / 2; bvx = 3; bvy = 2; }
      if (bx > W) { pScore++; bx = W / 2; by = H / 2; bvx = -3; bvy = 2; }
      ctx.fillStyle = "#0a0a1a"; ctx.fillRect(0, 0, W, H);
      ctx.setLineDash([6, 6]); ctx.strokeStyle = "rgba(255,255,255,0.15)"; ctx.beginPath(); ctx.moveTo(W / 2, 0); ctx.lineTo(W / 2, H); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = "#00ff88"; ctx.fillRect(6, pY, 10, 80);
      ctx.fillStyle = "#ff4444"; ctx.fillRect(W - 16, aiY, 10, 80);
      ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(bx, by, 6, 0, Math.PI * 2); ctx.fill();
      ctx.font = "bold 32px monospace"; ctx.textAlign = "center"; ctx.fillStyle = "#00ff88";
      ctx.fillText(String(pScore), W / 2 - 50, 40); ctx.fillStyle = "#ff4444"; ctx.fillText(String(aiScore), W / 2 + 50, 40);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); canvas.removeEventListener("mousemove", onMove); };
  }, []);

  return <canvas ref={canvasRef} width={460} height={340} className="w-full h-full bg-[#0a0a1a] block cursor-none" />;
}

// ═══════════════════════════════════════════════════════════════
// SNAKE GAME
// ═══════════════════════════════════════════════════════════════

function SnakeApp({ }: AppContentProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    const SIZE = 20;
    const COLS = Math.floor(canvas.width / SIZE);
    const ROWS = Math.floor(canvas.height / SIZE);

    let snake = [{ x: 5, y: 10 }];
    let dir = { x: 1, y: 0 };
    let food = { x: 15, y: 10 };
    let score = 0;
    let alive = true;

    const placeFood = () => {
      let valid = false;
      while (!valid) {
        food = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
        valid = !snake.some(s => s.x === food.x && s.y === food.y);
      }
    };

    const onKey = (e: KeyboardEvent) => {
      if (!alive) return;
      if (e.key === "ArrowUp" && dir.y !== 1) dir = { x: 0, y: -1 };
      else if (e.key === "ArrowDown" && dir.y !== -1) dir = { x: 0, y: 1 };
      else if (e.key === "ArrowLeft" && dir.x !== 1) dir = { x: -1, y: 0 };
      else if (e.key === "ArrowRight" && dir.x !== -1) dir = { x: 1, y: 0 };
      e.preventDefault();
    };
    window.addEventListener("keydown", onKey);

    let lastTime = 0;
    let raf = 0;
    const speed = 120; // ms per move

    const loop = (time: number) => {
      if (time - lastTime > speed && alive) {
        lastTime = time;
        const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

        // Walls
        if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS) alive = false;
        // Self
        if (snake.some(s => s.x === head.x && s.y === head.y)) alive = false;

        if (alive) {
          snake.unshift(head);
          if (head.x === food.x && head.y === food.y) {
            score += 10;
            placeFood();
          } else {
            snake.pop();
          }
        }
      }

      ctx.fillStyle = "#0f172a"; ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid
      ctx.strokeStyle = "rgba(30, 41, 59, 0.5)";
      ctx.lineWidth = 1;
      for (let i = 0; i < COLS; i++) {
        for (let j = 0; j < ROWS; j++) {
          ctx.strokeRect(i * SIZE, j * SIZE, SIZE, SIZE);
        }
      }

      // Food
      ctx.fillStyle = "#ef4444";
      ctx.beginPath();
      ctx.arc(food.x * SIZE + SIZE / 2, food.y * SIZE + SIZE / 2, SIZE / 2 - 2, 0, Math.PI * 2);
      ctx.fill();

      // Snake
      snake.forEach((s, i) => {
        ctx.fillStyle = i === 0 ? "#34d399" : "#10b981";
        ctx.fillRect(s.x * SIZE + 1, s.y * SIZE + 1, SIZE - 2, SIZE - 2);
      });

      // Score
      ctx.fillStyle = "white";
      ctx.font = "bold 16px monospace";
      ctx.textAlign = "left";
      ctx.fillText(`SCORE: ${score}`, 10, 24);

      if (!alive) {
        ctx.fillStyle = "rgba(0,0,0,0.7)"; ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#ef4444"; ctx.textAlign = "center"; ctx.font = "bold 24px monospace";
        ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("keydown", onKey); };
  }, []);

  return <canvas ref={canvasRef} width={460} height={340} className="w-full h-full block" />;
}

// ═══════════════════════════════════════════════════════════════
// TETRIS GAME
// ═══════════════════════════════════════════════════════════════

const TETRIS_SHAPES: number[][][] = [
  [[1, 1, 1, 1]],
  [[1, 1], [1, 1]],
  [[0, 1, 0], [1, 1, 1]],
  [[1, 0], [1, 0], [1, 1]],
  [[0, 1], [0, 1], [1, 1]],
  [[1, 1, 0], [0, 1, 1]],
  [[0, 1, 1], [1, 1, 0]],
];
const TETRIS_COLORS = ["#4FC3F7", "#FFD54F", "#AB47BC", "#FF7043", "#42A5F5", "#66BB6A", "#EF5350"];

function TetrisApp({ }: AppContentProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    const COLS = 10, ROWS = 20, SZ = 24;
    const W = COLS * SZ, H = ROWS * SZ;
    canvas.width = W; canvas.height = H;
    const board: number[][] = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
    let score = 0, alive = true;
    let si = Math.floor(Math.random() * 7);
    let shape = TETRIS_SHAPES[si].map(r => [...r]);
    let cx = Math.floor(COLS / 2) - 1, cy = 0;

    const fits = (s: number[][], x: number, y: number) => {
      for (let r = 0; r < s.length; r++) for (let c = 0; c < s[r].length; c++) {
        if (!s[r][c]) continue;
        const nx = x + c, ny = y + r;
        if (nx < 0 || nx >= COLS || ny >= ROWS) return false;
        if (ny >= 0 && board[ny][nx]) return false;
      }
      return true;
    };
    const place = () => {
      for (let r = 0; r < shape.length; r++) for (let c = 0; c < shape[r].length; c++) {
        if (shape[r][c] && cy + r >= 0) board[cy + r][cx + c] = si + 1;
      }
      // clear lines
      for (let r = ROWS - 1; r >= 0; r--) {
        if (board[r].every(v => v)) { board.splice(r, 1); board.unshift(Array(COLS).fill(0)); score += 100; r++; }
      }
      si = Math.floor(Math.random() * 7);
      shape = TETRIS_SHAPES[si].map(r => [...r]);
      cx = Math.floor(COLS / 2) - 1; cy = 0;
      if (!fits(shape, cx, cy)) alive = false;
    };
    const rotate = () => {
      const ns = shape[0].map((_, i) => shape.map(r => r[i]).reverse());
      if (fits(ns, cx, cy)) shape = ns;
    };

    const onKey = (e: KeyboardEvent) => {
      if (!alive) return;
      if (e.key === "ArrowLeft" && fits(shape, cx - 1, cy)) cx--;
      if (e.key === "ArrowRight" && fits(shape, cx + 1, cy)) cx++;
      if (e.key === "ArrowDown" && fits(shape, cx, cy + 1)) cy++;
      if (e.key === "ArrowUp") rotate();
      e.preventDefault();
    };
    window.addEventListener("keydown", onKey);

    let tick = 0, raf = 0;
    const loop = () => {
      tick++;
      if (alive && tick % 20 === 0) {
        if (fits(shape, cx, cy + 1)) cy++; else place();
      }
      ctx.fillStyle = "#0a0a0f"; ctx.fillRect(0, 0, W, H);
      // grid
      ctx.strokeStyle = "rgba(255,255,255,0.04)";
      for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) ctx.strokeRect(c * SZ, r * SZ, SZ, SZ);
      // board
      for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
        if (board[r][c]) { ctx.fillStyle = TETRIS_COLORS[board[r][c] - 1]; ctx.fillRect(c * SZ + 1, r * SZ + 1, SZ - 2, SZ - 2); }
      }
      // current piece
      ctx.fillStyle = TETRIS_COLORS[si];
      for (let r = 0; r < shape.length; r++) for (let c = 0; c < shape[r].length; c++) {
        if (shape[r][c]) ctx.fillRect((cx + c) * SZ + 1, (cy + r) * SZ + 1, SZ - 2, SZ - 2);
      }
      // score
      ctx.fillStyle = "#fff"; ctx.font = "bold 14px monospace"; ctx.textAlign = "left";
      ctx.fillText("Score:" + score, 4, 16);
      if (!alive) {
        ctx.fillStyle = "rgba(0,0,0,0.7)"; ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = "#ff4444"; ctx.font = "bold 20px monospace"; ctx.textAlign = "center"; ctx.fillText("GAME OVER", W / 2, H / 2);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("keydown", onKey); };
  }, []);

  return <canvas ref={canvasRef} width={240} height={480} className="w-full h-full bg-[#0a0a0f] block" />;
}

// ═══════════════════════════════════════════════════════════════
// APP COMPONENT REGISTRY
// ═══════════════════════════════════════════════════════════════

export const APP_COMPONENTS: Record<
  string,
  React.ComponentType<AppContentProps>
> = {
  resume: ResumeApp,
  about: AboutApp,
  projects: ProjectsApp,
  contact: ContactApp,
  terminal: TerminalApp,
  "text-editor": TextEditorApp,
  "file-manager": FileManagerApp,
  calculator: CalculatorApp,
  settings: SettingsApp,
  music: MusicApp,
  minesweeper: MinesweeperApp,
  wallpaper: WallpaperApp,
  "flappy-bird": FlappyBirdApp,
  pong: PongApp,
  snake: SnakeApp,
  tetris: TetrisApp,
};
