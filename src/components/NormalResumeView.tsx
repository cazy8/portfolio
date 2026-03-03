"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const TAGLINES = [
  "CSE Student",
  "CTFer",
  "Security Researcher",
  "Cybersecurity Enthusiast",
  "Web Developer",
];

const SOCIALS = [
  {
    name: "GitHub",
    url: "https://github.com/cazy8",
    color: "#333",
    hoverColor: "#6e5494",
    icon: (
      <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "Discord",
    url: "https://discord.com/users/cazy8",
    color: "#5865F2",
    hoverColor: "#7289da",
    icon: (
      <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/h4rshg",
    color: "#0077B5",
    hoverColor: "#00a0dc",
    icon: (
      <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "Gmail",
    url: "mailto:harshgupta8125@gmail.com",
    color: "#EA4335",
    hoverColor: "#ff6659",
    icon: (
      <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
      </svg>
    ),
  },
  {
    name: "Phone",
    url: "tel:+919987315051",
    color: "#25D366",
    hoverColor: "#128C7E",
    icon: (
      <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
      </svg>
    ),
  },
];

const PROJECTS = [
  {
    name: "Docker Security Scanner",
    desc: "A comprehensive Docker container security scanning tool that analyzes images for vulnerabilities, misconfigurations, and security best practices.",
    tech: "Python, Docker, Security, CLI",
    url: "https://github.com/cazy8/docker-security-scanner",
  },
  {
    name: "Hotel Management System",
    desc: "Full-stack hotel management system built with the MERN stack featuring room booking, guest management, and admin dashboard.",
    tech: "MongoDB, Express, React, Node.js",
    url: "https://github.com/cazy8/Hotel-Management-System-Mern-Stack",
  },
  {
    name: "AI Network Intrusion Detection",
    desc: "AI-powered network intrusion detection system using machine learning to identify malicious network traffic and potential security threats.",
    tech: "Python, ML, TensorFlow, Networking",
    url: "https://github.com/cazy8/AI-Based-Network-Intrusion-Detection-System",
  },
];

/* ─── Tech-stack icon SVGs (inline, small) ─── */
const ICONS: Record<string, React.ReactNode> = {
  HTML5: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="#E34F26"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.071-.757.541-6.03H5.745l1.44 16.217 5.79 1.588 5.84-1.607.791-8.696H9.843l-.312 3.5h5.089l-.353 3.734-4.303 1.2-4.291-1.198-.285-3.236h3.379l.151 1.683 1.054.29 1.054-.29.11-1.183h-2.604z" /></svg>,
  CSS3: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="#1572B6"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.002l5.166-1.424 1.424-13.165z" /></svg>,
  JavaScript: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="#F7DF1E"><path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.405-.6-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" /></svg>,
  "React.js": <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="#61DAFB"><path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.31 0-.6.045-.87.128C3.727 2.1 2.796 4.859 3.726 8.73c-1.91.96-3.165 2.296-3.165 3.472 0 2.543 3.878 4.298 8.558 4.493-.49.383-.93.826-1.3 1.327-.29.387-.51.81-.64 1.258-.59 2.05.44 3.69 2.373 3.69 1.346 0 3.107-.96 4.888-2.622 1.78 1.653 3.542 2.602 4.887 2.602 1.934 0 2.963-1.64 2.373-3.69a4.74 4.74 0 0 0-.64-1.258c-.37-.5-.81-.944-1.3-1.327 4.68-.195 8.558-1.95 8.558-4.493 0-1.176-1.255-2.512-3.165-3.472.93-3.871-.001-6.63-2.607-7.269a2.35 2.35 0 0 0-.87-.128zM12 15.004a3.002 3.002 0 1 1 0-6.004 3.002 3.002 0 0 1 0 6.004z" /></svg>,
  "Node.js": <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="#339933"><path d="M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.604.065-.037.151-.023.218.017l2.256 1.339a.29.29 0 0 0 .272 0l8.795-5.076a.277.277 0 0 0 .134-.238V6.921a.28.28 0 0 0-.137-.242l-8.791-5.072a.278.278 0 0 0-.271 0L3.075 6.68a.284.284 0 0 0-.139.241v10.15a.27.27 0 0 0 .138.236l2.409 1.392c1.307.654 2.108-.116 2.108-.89V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.112.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551L2.28 18.675a1.853 1.853 0 0 1-.922-1.603V6.921c0-.66.353-1.277.922-1.603L11.075.242a1.932 1.932 0 0 1 1.846 0l8.794 5.076c.57.326.922.943.922 1.603v10.15a1.86 1.86 0 0 1-.922 1.604l-8.795 5.078a1.834 1.834 0 0 1-.922.247z" /></svg>,
  Python: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="#3776AB"><path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09-.33.22zM21.1 6.11l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.89.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01.21.03zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08-.33.23z" /></svg>,
  Java: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="#ED8B00"><path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0 0 .07-.062.09-.118M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.889 4.832 0 6.836-2.274-2.053-3.943-3.858-2.824-5.539 1.644-2.469 6.197-3.665 5.189-7.627" /></svg>,
  "C/C++": <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="#00599C"><path d="M22.394 6c-.167-.29-.398-.543-.652-.69L12.926.22c-.509-.294-1.34-.294-1.848 0L2.26 5.31c-.508.293-.923 1.013-.923 1.6v10.18c0 .294.104.62.271.91.167.29.398.543.652.69l8.816 5.09c.508.293 1.34.293 1.848 0l8.816-5.09c.254-.147.485-.4.652-.69.167-.29.27-.616.27-.91V6.91c.003-.294-.1-.62-.268-.91zM12 19.11c-3.92 0-7.109-3.19-7.109-7.11 0-3.92 3.19-7.11 7.109-7.11a7.133 7.133 0 0 1 6.156 3.553l-3.076 1.78a3.567 3.567 0 0 0-3.08-1.78A3.56 3.56 0 0 0 8.444 12 3.56 3.56 0 0 0 12 15.555a3.57 3.57 0 0 0 3.08-1.778l3.078 1.78A7.135 7.135 0 0 1 12 19.11zm7.11-6.715h-.79v.79h-.79v-.79h-.79v-.79h.79v-.79h.79v.79h.79zm2.962 0h-.79v.79h-.79v-.79h-.79v-.79h.79v-.79h.79v.79h.79z" /></svg>,
  Bash: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="#4EAA25"><path d="M21.038 4.9l-7.577-4.42C13.009.21 12.504.1 12 .1c-.504 0-1.009.11-1.462.38L2.962 4.9C2.056 5.43 1.5 6.41 1.5 7.47v8.86c0 1.06.556 2.04 1.462 2.57l7.576 4.42c.453.27.958.38 1.462.38s1.009-.11 1.461-.38l7.577-4.42c.907-.53 1.462-1.51 1.462-2.57V7.47c0-1.06-.556-2.04-1.462-2.57zM15.17 16.1h-.59v-1.62l-2.08 1.62h-.08l-2.08-1.62V16.1H9.8v-4.2h.56l2.12 1.65 2.12-1.65h.57v4.2zm-4.52-5.09H8.6v-.6h2.05v.6zm5.33 0h-2.05v-.6h2.05v.6z" /></svg>,
  Docker: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="#2496ED"><path d="M13.983 11.078h2.119a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.119a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 0 0 .186-.186V3.574a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.186m0 2.716h2.118a.187.187 0 0 0 .186-.186V6.29a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 0 0 .184-.186V6.29a.185.185 0 0 0-.185-.185H8.1a.185.185 0 0 0-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 0 0 .185-.186V6.29a.185.185 0 0 0-.185-.185H5.136a.186.186 0 0 0-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 0 0 .185-.185V9.006a.185.185 0 0 0-.185-.186h-2.119a.186.186 0 0 0-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 0 0-.75.748 11.376 11.376 0 0 0 .692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 0 0 3.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288z" /></svg>,
  Git: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="#F05032"><path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.66 2.66c.645-.222 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187" /></svg>,
  Linux: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="#FCC624"><path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 0 0-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.368 1.884 1.43.868.07 1.723-.188 2.502-.681.518-.299.957-.644 1.237-1.093.277-.437.44-.954.397-1.507-.023-.06-.024-.122-.022-.139.148-.129.335-.253.523-.417.39-.28.752-.625.898-1.128a1.63 1.63 0 0 0-.04-1.087c-.089-.254-.207-.48-.327-.667-.144-.143-.267-.344-.36-.477-.168-.192-.266-.398-.157-.673.072-.218.167-.382.237-.578.338-.532.556-1.1.578-1.684.023-.578-.145-1.093-.6-1.459l-.003-.002c.005-.049-.014-.117-.02-.168-.168-.779-.52-1.397-1.023-1.818-.535-.461-1.204-.71-1.932-.737-.14-.008-.281 0-.404.012L15.07 6.56c-.183-.452-.32-.898-.373-1.197-.064-.373-.069-.74-.077-1.121-.01-.47-.036-.957-.135-1.509-.154-.912-.464-1.644-.95-2.207C12.965.405 12.47.017 12.014.003c-.014-.001-.028-.001-.042-.001-.015 0-.03-.002-.045-.002h.078zm-.063 1.031c.236.007.637.269.975.737.338.466.604 1.094.723 1.81.084.478.107.92.115 1.366.009.388.016.77.094 1.217.078.445.26 1.009.534 1.625-.457.397-.933.737-1.472.967-.611.286-1.292.447-2.06.447-.697.001-1.314-.14-1.878-.359.177-.503.383-.875.631-1.238.708-.978.908-1.918.997-3.162.068-1.217.085-3.238 1.34-3.41h.001zM7.43 10.61c.124-.002.248.01.37.036.923.199 1.448.884 1.743 1.604.228.478.345 1.048.469 1.438.241.833.577 1.323 1.455 1.588l.007.003c-.17.255-.326.528-.442.821-.16.388-.266.837-.257 1.357-.063.019-.128.034-.193.053l-.01.002c-1.237.266-2.048.39-2.726.363-.34-.014-.612-.065-.845-.18-.233-.117-.436-.31-.668-.605-.305-.363-.478-.805-.519-1.172-.041-.363.019-.65.133-.898a5.315 5.315 0 0 1 1.1-1.6c.345-.407.69-.885.985-1.49a3.09 3.09 0 0 0 .206-.575c.046-.196.064-.37.052-.527a.594.594 0 0 0-.09-.252c-.037-.059-.093-.084-.168-.089m9.143.04c-.073 0-.152.019-.233.065a.548.548 0 0 0-.193.198.64.64 0 0 0-.07.281c-.013.154.008.34.058.543.051.214.128.447.222.675.262.564.563 1.004.862 1.378a5.26 5.26 0 0 1 1.103 1.6c.125.271.186.59.14.975-.048.39-.232.862-.558 1.256-.246.312-.461.516-.711.641-.25.123-.544.178-.908.193-.724.028-1.613-.1-2.903-.372a6.604 6.604 0 0 0-.117-.032c.023-.563-.083-1.054-.264-1.48-.167-.392-.37-.688-.563-.937 1.017-.318 1.42-.93 1.696-1.879.129-.381.24-.95.468-1.428.306-.716.834-1.39 1.782-1.593a1.48 1.48 0 0 1 .19-.025m-2.507 7.327c.013.644.177 1.143.449 1.539.29.41.682.703 1.109.918a5.011 5.011 0 0 0 1.326.497c.47.113.899.171 1.238.194-.074.1-.167.2-.283.332-.272.312-.64.6-1.064.856-.678.392-1.349.6-1.942.539-.535-.044-1.068-.444-1.342-1.025l-.006-.012c.08-.251.12-.567.059-.978-.024-.166-.058-.37-.058-.582a.844.844 0 0 1 .065-.328c.053-.111.125-.192.263-.272.245-.146.362-.455.331-.767h.007m-7.153.002c-.035.318.086.635.336.785.155.093.235.181.293.3.06.12.09.279.09.456 0 .203-.032.4-.058.565-.06.41-.02.728.06.98-.318.636-.91 1.075-1.504 1.12-.643.05-1.385-.177-2.128-.604a5.267 5.267 0 0 1-1.074-.865 3.576 3.576 0 0 1-.282-.328c.207-.012.432-.04.68-.089a5.24 5.24 0 0 0 1.458-.536c.437-.223.84-.524 1.14-.938.276-.386.44-.872.46-1.504m3.606.174" /></svg>,
  AWS: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="#FF9900"><path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.374 6.18 6.18 0 0 1-.248-.467c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.032-.863.104-.296.072-.583.16-.862.272-.129.056-.224.088-.28.096a.49.49 0 0 1-.127.024c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 0 1-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 0 1-.056.2l-1.923 6.17c-.048.16-.104.264-.168.312a.528.528 0 0 1-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.216-.151-.248-.223a.563.563 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024s.12.064.2.112c.271.152.566.272.886.36.32.088.632.128.943.128.503 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758.777.777 0 0 0-.215-.559c-.144-.151-.415-.287-.806-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 0 1-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.176 0 .359.008.535.032.183.024.35.056.518.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 0 1 .24.2.43.43 0 0 1 .071.263v.375c0 .168-.064.256-.184.256a.83.83 0 0 1-.303-.096 3.652 3.652 0 0 0-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.71 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167zM21.698 16.207c-2.626 1.94-6.442 2.969-9.722 2.969-4.598 0-8.74-1.7-11.87-4.526-.247-.223-.024-.527.271-.351 3.384 1.963 7.559 3.153 11.877 3.153 2.914 0 6.114-.607 9.06-1.852.439-.2.814.288.384.607zM22.792 14.961c-.336-.43-2.22-.207-3.074-.103-.255.032-.295-.192-.063-.36 1.5-1.053 3.967-.75 4.254-.399.287.36-.08 2.826-1.485 4.007-.215.184-.423.088-.327-.151.32-.79 1.03-2.57.695-2.994z" /></svg>,
  Azure: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="#0078D4"><path d="M5.483 21.3H24L14.025 4.013l-3.038 8.347 5.836 6.938L5.483 21.3zM13.23 2.7L6.105 8.677 0 19.253h5.505v.014L13.23 2.7z" /></svg>,
  Wireshark: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="#1679A7"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm-1 4v2.5L8 12l3 3.5V18l5-6-5-6z" /></svg>,
  Metasploit: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="#2596CD"><circle cx="12" cy="12" r="10" fill="none" stroke="#2596CD" strokeWidth="2" /><path d="M8 8l8 8M16 8l-8 8" stroke="#2596CD" strokeWidth="2" /></svg>,
  Nmap: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="#0E83CD"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" fill="none" stroke="#0E83CD" strokeWidth="1.5" /><path d="M7.5 4.21l4.5 2.6 4.5-2.6M7.5 19.79V14.6L3 12m18 0l-4.5 2.6v5.19M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" fill="none" stroke="#0E83CD" strokeWidth="1.5" /></svg>,
  Splunk: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="#000000"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm1 17h-2v-2h2v2zm0-4h-2V7h2v6z" fill="#65A637" /></svg>,
  Windows: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="#0078D6"><path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" /></svg>,
  Express: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="#888"><path d="M24 18.588a1.529 1.529 0 0 1-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 0 1-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 0 1 1.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 0 1 1.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 0 0 0 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 0 0 2.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 0 1-2.589 3.957 6.272 6.272 0 0 1-7.306-.933 6.575 6.575 0 0 1-1.64-3.858c0-.235-.08-.455-.134-.666A88.33 88.33 0 0 1 0 11.577zm1.127-.286h9.654c-.042-3.368-2.387-5.768-5.452-5.768-3.286 0-4.07 2.636-4.202 5.768z" /></svg>,
};

/* ─── Skill categories with icon keys ─── */
const SKILLS: { category: string; emoji: string; items: { name: string; icon?: string }[] }[] = [
  {
    category: "Web Development",
    emoji: "🌐",
    items: [
      { name: "HTML5", icon: "HTML5" },
      { name: "CSS3", icon: "CSS3" },
      { name: "JavaScript", icon: "JavaScript" },
      { name: "React.js", icon: "React.js" },
      { name: "Node.js / Express", icon: "Node.js" },
      { name: "Responsive Design" },
    ],
  },
  {
    category: "Programming Languages",
    emoji: "💻",
    items: [
      { name: "C / C++", icon: "C/C++" },
      { name: "Python", icon: "Python" },
      { name: "JavaScript", icon: "JavaScript" },
      { name: "Bash", icon: "Bash" },
    ],
  },
  {
    category: "Offensive Security",
    emoji: "🔓",
    items: [
      { name: "Web Application Security" },
      { name: "VAPT" },
      { name: "Penetration Testing" },
      { name: "OWASP Top 10" },
      { name: "Red Teaming" },
      { name: "XSS / CSRF Mitigation" },
    ],
  },
  {
    category: "Security Tools",
    emoji: "🛡️",
    items: [
      { name: "Burp Suite" },
      { name: "Nmap", icon: "Nmap" },
      { name: "Metasploit", icon: "Metasploit" },
      { name: "Wireshark", icon: "Wireshark" },
      { name: "OWASP ZAP" },
      { name: "SQLmap" },
      { name: "Hydra" },
      { name: "John the Ripper" },
      { name: "Nessus" },
      { name: "Nikto" },
      { name: "Splunk", icon: "Splunk" },
    ],
  },
  {
    category: "Cloud & Platforms",
    emoji: "☁️",
    items: [
      { name: "Azure", icon: "Azure" },
      { name: "AWS", icon: "AWS" },
      { name: "Linux (Ubuntu / Kali)", icon: "Linux" },
      { name: "Windows", icon: "Windows" },
      { name: "Docker", icon: "Docker" },
      { name: "Multicloud Networking" },
    ],
  },
  {
    category: "Tools & DevOps",
    emoji: "🔧",
    items: [
      { name: "Git", icon: "Git" },
      { name: "Docker", icon: "Docker" },
      { name: "CI / CD" },
    ],
  },
];

const RESUME_DATA = {
  name: "Harsh Gupta",
  summary:
    "Passionate cybersecurity researcher and full-stack developer with expertise in penetration testing, CTF competitions, web application security, and building secure modern web applications. Active CTF player and bug bounty hunter striving to make the digital world safer.",
  experience: [
    {
      role: "Cybersecurity Researcher",
      org: "Independent",
      period: "2024 — Present",
      points: [
        "Active CTF competitor across multiple platforms",
        "Conducted vulnerability assessments and penetration testing for web applications",
        "Bug bounty hunting — identifying and responsibly disclosing security vulnerabilities",
        "Published CTF writeups covering web exploitation, reverse engineering, and cryptography",
      ],
    },
    {
      role: "Full-Stack Developer",
      org: "Freelance",
      period: "2023 — Present",
      points: [
        "Built modern web applications using React, Next.js, Node.js, and TypeScript",
        "Implemented security best practices including input validation, authentication, and authorization",
        "Developed RESTful APIs and integrated third-party services",
        "Created responsive, accessible UI components with Tailwind CSS",
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
  certifications: [
    { title: "Certified Network Security Practitioner (CNSP)", org: "The SecOps Group" },
    { title: "Aviatrix ACE Multicloud Network Associate", org: "Aviatrix" },
    { title: "Jr. Penetration Tester Learning Path", org: "TryHackMe" },
    { title: "CyberPeace First Responders & Myth Busters", org: "CyberPeace Foundation" },
    { title: "Certified Phishing Prevention Specialist (CPPS)", org: "Hack & Fix" },
    { title: "Certified Red Team Operations Management (CRTOM)", org: "Red Team Leaders" },
  ],
};

export default function NormalResumeView() {
  const router = useRouter();

  /* ── Typewriter cycling tagline ── */
  const [tagIndex, setTagIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);
  const [pdfLoading, setPdfLoading] = useState(true);
  const [pdfError, setPdfError] = useState(false);
  const blobUrlRef = useRef<string | null>(null);
  const [clockTime, setClockTime] = useState('');
  const [clockDate, setClockDate] = useState('');

  useEffect(() => {
    const current = TAGLINES[tagIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && charIndex < current.length) {
      timeout = setTimeout(() => setCharIndex((c) => c + 1), 80);
    } else if (!isDeleting && charIndex === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((c) => c - 1), 40);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTagIndex((i) => (i + 1) % TAGLINES.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, tagIndex]);

  /* Fetch PDF as blob to bypass browser iframe embedding restrictions */
  useEffect(() => {
    let cancelled = false;
    fetch('/resume.pdf')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch PDF');
        return res.blob();
      })
      .then((blob) => {
        if (cancelled) return;
        const url = URL.createObjectURL(blob);
        blobUrlRef.current = url;
        setPdfBlobUrl(url);
        setPdfLoading(false);
      })
      .catch(() => {
        if (!cancelled) {
          setPdfLoading(false);
          setPdfError(true);
        }
      });
    return () => {
      cancelled = true;
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = null;
      }
    };
  }, []);

  /* Real-time clock */
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setClockTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }));
      setClockDate(now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen bg-bg-primary relative overflow-hidden">
      {/* Gradient orbs (HeroSection style) */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-accent/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-accent/3 blur-3xl pointer-events-none" />
      {/* Scan line overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.02]">
        <div className="w-full h-px bg-accent" style={{ animation: 'scanline 8s linear infinite' }} />
      </div>
      {/* ── Real-time Clock (top-right, big-bear-52 style) ── */}
      <div className="rt-clock-wrap">
        <div className="rt-clock-time">{clockTime}</div>
        <div className="rt-clock-date">{clockDate}</div>
      </div>

      {/* ── Toggle to Linux View — evil-dragon-24 style ── */}
      <div className="ed-toggle-wrap">
        <label className="ed-label" onClick={() => router.push("/resume?view=linux")}>
          <span className="ed-circle">
            <span className="ed-penguin">🐧</span>
          </span>
          <span className="ed-title">Linux</span>
        </label>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* ═══════════ HERO ═══════════ */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center mb-14">

          {/* ── Centered Circular Profile Photo ── */}
          <div className="flex justify-center mb-8 animate-fade-in-up opacity-0">
            <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden ring-4 ring-accent/30 shadow-2xl shadow-accent/20 transition-transform duration-500 hover:scale-105 hover:ring-accent/50 hover:shadow-accent/40 relative">
              <Image src="/profile.png" alt="Harsh Gupta" fill className="object-cover" priority />
            </div>
          </div>

          {/* Name with underline hover (curvy-crab-71) */}
          <h1 className="name-hover text-5xl sm:text-6xl font-bold tracking-tight mb-4 animate-fade-in-up opacity-0 animation-delay-200 inline-block cursor-default">
            <span className="text-text-primary">Harsh </span>
            <span className="text-accent animate-glow">Gupta</span>
          </h1>

          {/* Typing subtitle */}
          <div className="font-mono text-lg sm:text-2xl text-text-secondary mb-8 animate-fade-in-up opacity-0 animation-delay-400 h-8">
            <span className="text-accent mr-2">$</span>
            <span>{TAGLINES[tagIndex].slice(0, charIndex)}</span>
            <span className="animate-blink text-accent ml-0.5">▊</span>
          </div>

          {/* Description */}
          <p className="max-w-2xl mx-auto text-text-secondary leading-relaxed mb-10 animate-fade-in-up opacity-0 animation-delay-600">
            Passionate about breaking and building secure systems. I compete in CTFs, hunt bugs, and craft clean full-stack applications — always learning, always hacking.
          </p>

          {/* ── Social Icons (brave-shrimp-86 tooltip) ── */}
          <ul className="bs-wrapper animate-fade-in-up opacity-0 animation-delay-800">
            {SOCIALS.map((s) => (
              <li key={s.name} className={`bs-icon bs-${s.name.toLowerCase()}`}>
                <span className="bs-tooltip">{s.name}</span>
                <a
                  href={s.url}
                  target={s.url.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="bs-link"
                >
                  {s.icon}
                </a>
              </li>
            ))}
          </ul>

          {/* ── Side-by-side Navigation Buttons ── */}
          <div className="flex items-center justify-center gap-4 animate-fade-in-up opacity-0 animation-delay-800 mt-2">
            <a href="#projects" className="nav-btn group">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
              View Projects
            </a>
            <a href="#resume-pdf" className="nav-btn group">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              View Resume
            </a>
          </div>
        </div>


        {/* ═══════════ EDUCATION ═══════════ */}
        <section className="mb-10" id="education">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-px bg-green-500/40" />
            Education
          </h2>
          {RESUME_DATA.education.map((edu) => (
            <div key={edu.degree} className="relative pl-6 border-l border-[#333]">
              <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-green-500 -translate-x-[calc(50%+0.5px)]" />
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                <h3 className="font-semibold text-white">{edu.degree}</h3>
                <span className="font-mono text-xs text-gray-500">{edu.period}</span>
              </div>
              <p className="text-green-400/80 text-sm font-mono">{edu.school}</p>
              <p className="text-gray-400 text-sm mt-1">{edu.details}</p>
            </div>
          ))}
        </section>

        {/* ═══════════ SKILLS (concise flat tags) ═══════════ */}
        <section className="mb-10" id="skills">
          <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-3">
            <span className="w-8 h-px bg-green-500/40" />
            Skills
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {SKILLS.map((group) => (
              <div key={group.category} className="mi-card">
                <div className="mi-bg" />
                <h3 className="mi-title">{group.emoji} {group.category}</h3>
                <div className="flex flex-wrap gap-2 relative z-10">
                  {group.items.map((skill) => (
                    <span
                      key={skill.name}
                      className="mi-tag"
                    >
                      {skill.icon && ICONS[skill.icon] ? ICONS[skill.icon] : null}
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════ PROJECTS ═══════════ */}
        <section className="mb-10" id="projects">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-px bg-green-500/40" />
            Projects
          </h2>
          <div className="grid gap-5">
            {PROJECTS.map((project) => (
              <a
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl border border-[#222] bg-[#111] p-6 hover:border-green-500/20 transition-all flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-bg-card border border-[#2a2a2a] flex items-center justify-center shrink-0 group-hover:border-green-500/30 transition-colors">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-500 group-hover:text-green-400 transition-colors">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white group-hover:text-green-400 transition-colors mb-1">
                    {project.name}
                    <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-xs">↗</span>
                  </h3>
                  <p className="text-gray-400 text-sm mb-2 leading-relaxed">{project.desc}</p>
                  <p className="font-mono text-xs text-gray-500">{project.tech}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ═══════════ CERTIFICATIONS ═══════════ */}
        <section className="mb-10" id="certifications">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="w-8 h-px bg-green-500/40" />
            Certifications
          </h2>
          <ul className="space-y-3">
            {RESUME_DATA.certifications.map((cert, i) => (
              <li key={i} className="flex items-start gap-3 group">
                <span className="mt-0.5 w-6 h-6 rounded-md bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0 group-hover:bg-green-500/20 transition-colors">
                  <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 text-green-400" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </span>
                <div>
                  <p className="text-gray-300 text-sm font-medium">{cert.title}</p>
                  <p className="text-gray-500 text-xs font-mono">{cert.org}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* ═══════════ RESUME PDF PREVIEW ═══════════ */}
        <section className="mb-10" id="resume-pdf">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-px bg-green-500/40" />
            Resume
          </h2>
          <div className="rounded-xl border border-[#222] bg-[#111] overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 bg-bg-card border-b border-[#222]">
              <span className="font-mono text-xs text-gray-400">HARSH_GUPTA_RESUME.pdf</span>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-green-400 hover:text-green-300 font-mono transition-colors"
              >
                Open in new tab ↗
              </a>
            </div>
            {pdfLoading && (
              <div className="flex items-center justify-center" style={{ height: "80vh" }}>
                <span className="font-mono text-sm text-gray-500 animate-pulse">Loading PDF...</span>
              </div>
            )}
            {!pdfLoading && pdfError && (
              <div className="flex flex-col items-center justify-center gap-4 py-16 px-8 text-center" style={{ height: "80vh" }}>
                <svg className="w-16 h-16 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-gray-400 text-sm font-mono">Could not load PDF preview.</p>
                <div className="flex gap-3 mt-2">
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 font-mono text-sm hover:bg-green-500/20 transition-colors flex items-center gap-2"
                  >
                    Open in Tab ↗
                  </a>
                  <a
                    href="/resume.pdf"
                    download
                    className="px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-gray-400 font-mono text-sm hover:bg-white/10 transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download
                  </a>
                </div>
              </div>
            )}
            {!pdfLoading && pdfBlobUrl && (
              <iframe
                src={pdfBlobUrl}
                className="w-full border-0"
                style={{ height: "80vh" }}
                title="Resume PDF"
              />
            )}
          </div>
        </section>
      </div>

      {/* ── Permanent Contact Footer ── */}
      <footer className="perm-footer">
        <div className="perm-footer-inner">
          <span className="font-mono text-sm text-accent font-semibold">Contact Me</span>
          <div className="flex items-center gap-6 font-mono text-xs text-text-secondary">
            <a href="tel:+919987315051" className="hover:text-accent transition-colors flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              +91 9987315051
            </a>
            <a href="mailto:harshgupta8125@gmail.com" className="hover:text-accent transition-colors flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              harshgupta8125@gmail.com
            </a>
          </div>
        </div>
      </footer>

      {/* ═══════════ ALL CUSTOM STYLES ═══════════ */}
      <style jsx>{`
        /* ── curvy-crab-71 Name Underline Hover ── */
        .name-hover {
          position: relative;
          display: inline-block;
        }
        .name-hover::before {
          margin-left: auto;
        }
        .name-hover::after, .name-hover::before {
          content: '';
          width: 0%;
          height: 3px;
          background: #00ff88;
          display: block;
          transition: 0.5s;
          border-radius: 2px;
        }
        .name-hover:hover::after, .name-hover:hover::before {
          width: 100%;
        }

        /* ── brave-shrimp-86 Social Icons ── */
        .bs-wrapper {
          display: inline-flex;
          list-style: none;
          padding: 0;
          margin: 0 0 16px 0;
          justify-content: center;
        }
        .bs-icon {
          position: relative;
          background: #1a1a1a;
          border: 1px solid #2a2a2a;
          border-radius: 50%;
          margin: 0 8px;
          width: 50px;
          height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          box-shadow: 0 10px 10px rgba(0, 0, 0, 0.15);
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        .bs-link {
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          color: inherit;
        }
        .bs-icon svg {
          width: 20px;
          height: 20px;
        }
        .bs-icon svg path {
          fill: #fff;
        }
        .bs-tooltip {
          position: absolute;
          top: 0;
          font-size: 13px;
          font-family: var(--font-mono);
          background: #1a1a1a;
          color: #fff;
          padding: 5px 10px;
          border-radius: 5px;
          box-shadow: 0 10px 10px rgba(0, 0, 0, 0.15);
          opacity: 0;
          pointer-events: none;
          transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          white-space: nowrap;
        }
        .bs-tooltip::before {
          position: absolute;
          content: '';
          height: 8px;
          width: 8px;
          background: #1a1a1a;
          bottom: -3px;
          left: 50%;
          transform: translate(-50%) rotate(45deg);
          transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        .bs-icon:hover .bs-tooltip {
          top: -42px;
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
        }
        .bs-icon:hover span,
        .bs-icon:hover .bs-tooltip {
          text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.1);
        }
        .bs-github:hover,
        .bs-github:hover .bs-tooltip,
        .bs-github:hover .bs-tooltip::before {
          background: #6e5494;
          border-color: #6e5494;
        }
        .bs-discord:hover,
        .bs-discord:hover .bs-tooltip,
        .bs-discord:hover .bs-tooltip::before {
          background: #5865F2;
          border-color: #5865F2;
        }
        .bs-linkedin:hover,
        .bs-linkedin:hover .bs-tooltip,
        .bs-linkedin:hover .bs-tooltip::before {
          background: #0077B5;
          border-color: #0077B5;
        }
        .bs-gmail:hover,
        .bs-gmail:hover .bs-tooltip,
        .bs-gmail:hover .bs-tooltip::before {
          background: #EA4335;
          border-color: #EA4335;
        }

        /* ── Side-by-side Nav Buttons ── */
        .nav-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          border-radius: 10px;
          background: #111;
          border: 1px solid #222;
          color: #a3a3a3;
          font-family: var(--font-mono);
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          cursor: pointer;
        }
        .nav-btn:hover {
          background: #1a1a1a;
          border-color: rgba(0, 255, 136, 0.2);
          color: #00ff88;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 255, 136, 0.1);
        }
        .nav-btn svg {
          opacity: 0.5;
          transition: opacity 0.3s;
        }
        .nav-btn:hover svg {
          opacity: 1;
        }

        /* ── Permanent Contact Footer ── */
        .perm-footer {
          width: 100%;
          padding-bottom: 0;
        }
        .perm-footer-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 24px;
          padding: 16px 24px;
          background: rgba(10, 10, 10, 0.95);
          backdrop-filter: blur(12px);
          border-top: 1px solid rgba(0, 255, 136, 0.15);
        }

        /* ── massive-insect-5 Skill Cards ── */
        .mi-card {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          padding: 20px;
          transition: all 0.4s ease-in-out;
        }
        .mi-card:hover {
          transform: scale(1.02);
        }
        .mi-bg {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 100% 107%, #00ff8820 0%, #0a0a0a 40%, #111 100%);
          border: 1px solid #222;
          border-radius: 20px;
          transition: all 0.4s ease;
        }
        .mi-card:hover .mi-bg {
          background: radial-gradient(circle at 100% 107%, #00ff8830 0%, #0e1a14 40%, #111 100%);
          border-color: rgba(0, 255, 136, 0.2);
        }
        .mi-title {
          position: relative;
          z-index: 10;
          font-family: var(--font-mono);
          font-size: 12px;
          color: rgba(0, 255, 136, 0.7);
          margin-bottom: 10px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .mi-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 12px;
          border-radius: 999px;
          font-family: var(--font-mono);
          font-size: 12px;
          color: #ccc;
          background: rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.25s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          cursor: default;
        }
        .mi-tag:hover {
          background: rgba(0, 255, 136, 0.1);
          border-color: rgba(0, 255, 136, 0.3);
          color: #00ff88;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 255, 136, 0.08);
        }

        /* ── Phone social icon ── */
        .bs-phone:hover,
        .bs-phone:hover .bs-tooltip,
        .bs-phone:hover .bs-tooltip::before {
          background: #25D366;
          border-color: #25D366;
        }

        /* ── Real-time Clock (big-bear-52 inspired) ── */
        .rt-clock-wrap {
          position: fixed;
          top: 12px;
          right: 130px;
          z-index: 50;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          font-family: var(--font-mono, monospace);
          pointer-events: none;
          user-select: none;
        }
        .rt-clock-time {
          font-size: 18px;
          font-weight: 900;
          letter-spacing: 3px;
          color: #00ff88;
          text-shadow: 0 0 8px rgba(0,255,136,0.25);
          border: 1px solid rgba(0,255,136,0.15);
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(8px);
          padding: 2px 10px;
          border-radius: 6px;
          display: inline-flex;
        }
        .rt-clock-date {
          font-size: 9px;
          letter-spacing: 1.5px;
          color: rgba(255,255,255,0.35);
          text-transform: uppercase;
          margin-top: 2px;
          padding-right: 2px;
        }

        /* ── evil-dragon-24 Toggle ── */
        .ed-toggle-wrap {
          position: fixed;
          top: 12px;
          right: 16px;
          z-index: 50;
        }
        .ed-label {
          background-color: transparent;
          border: 2px solid #00ff88;
          display: flex;
          align-items: center;
          border-radius: 50px;
          width: 105px;
          cursor: pointer;
          transition: all 0.4s ease;
          padding: 4px;
          position: relative;
        }
        .ed-label:hover {
          border-color: #00cc6a;
          box-shadow: 0 0 12px rgba(0,255,136,0.2);
        }
        .ed-circle {
          height: 32px;
          width: 32px;
          border-radius: 50%;
          background-color: #00ff88;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: all 0.4s ease;
          position: relative;
          font-size: 16px;
          line-height: 1;
        }
        .ed-label:hover .ed-circle {
          box-shadow: 0 0 0 6px rgba(0,255,136,0.15);
        }
        .ed-penguin {
          filter: drop-shadow(0 1px 1px rgba(0,0,0,0.3));
        }
        .ed-title {
          font-size: 12px;
          font-weight: 700;
          color: rgba(255,255,255,0.7);
          font-family: var(--font-mono, monospace);
          letter-spacing: 1px;
          text-transform: uppercase;
          position: absolute;
          right: 12px;
          transition: color 0.3s;
        }
        .ed-label:hover .ed-title {
          color: #00ff88;
        }
      `}</style>
    </div>
  );
}
