"use client";

import { useEffect, useState, useCallback } from "react";

const TITLES = [
  "Cybersecurity Researcher",
  "CTF Player",
  "Full-Stack Developer",
  "Bug Bounty Hunter",
  "Security Enthusiast",
];

export default function HeroSection() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [resumeModal, setResumeModal] = useState(false);

  const tick = useCallback(() => {
    const current = TITLES[titleIndex];
    if (!isDeleting) {
      setDisplayText(current.substring(0, charIndex + 1));
      setCharIndex((prev) => prev + 1);
      if (charIndex + 1 === current.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      setDisplayText(current.substring(0, charIndex - 1));
      setCharIndex((prev) => prev - 1);
      if (charIndex - 1 === 0) {
        setIsDeleting(false);
        setTitleIndex((prev) => (prev + 1) % TITLES.length);
      }
    }
  }, [charIndex, isDeleting, titleIndex]);

  useEffect(() => {
    const speed = isDeleting ? 40 : 80;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting]);

  const [showSocials, setShowSocials] = useState(false);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center grid-bg overflow-hidden"
    >
      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-accent/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-accent/3 blur-3xl pointer-events-none" />

      {/* Scan line overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.02]">
        <div className="w-full h-px bg-accent" style={{ animation: "scanline 8s linear infinite" }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">


        {/* ═══ Circular Profile Image & Socials ═══ */}
        <div className="mx-auto mb-10 animate-fade-in-up opacity-0 animation-delay-200 flex flex-col items-center gap-6">
          <div className="w-48 h-48 rounded-full overflow-hidden ring-4 ring-accent/30 shadow-2xl shadow-accent/20 transition-transform duration-500 hover:scale-105 hover:shadow-accent/40">
            <img src="/profile.png" alt="Harsh Gupta" className="w-full h-full object-cover" />
          </div>

          <div className="flex flex-col items-center gap-4">
            <button className="btn-app-drawer font-mono text-sm" onClick={() => setShowSocials(!showSocials)}>
              {showSocials ? "Hide Socials" : "Connect With Me"}
            </button>

            <div className={`transition-all duration-300 overflow-hidden ${showSocials ? "max-h-20 opacity-100 mt-2" : "max-h-0 opacity-0 m-0"}`}>
              <ul className="social-menu">
                <li className="social-item github" onClick={() => window.open("https://github.com/cazy8", "_blank")}>
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                  </svg>
                  <span className="tooltip font-mono">GitHub</span>
                </li>
                <li className="social-item linkedin" onClick={() => window.open("https://www.linkedin.com/in/h4rshg/", "_blank")}>
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                  </svg>
                  <span className="tooltip font-mono">LinkedIn</span>
                </li>
                <li className="social-item discord" onClick={() => window.open("https://discord.com/users/cazy8", "_blank")}>
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"></path>
                  </svg>
                  <span className="tooltip font-mono">Discord</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Name */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-6 animate-fade-in-up opacity-0 animation-delay-200">
          <span className="text-text-primary">Harsh </span>
          <span className="text-accent animate-glow">Gupta</span>
        </h1>

        {/* Typing subtitle */}
        <div className="font-mono text-lg sm:text-2xl text-text-secondary mb-8 animate-fade-in-up opacity-0 animation-delay-400 h-8">
          <span className="text-accent mr-2">$</span>
          <span>{displayText}</span>
          <span className="animate-blink text-accent ml-0.5">▊</span>
        </div>

        {/* Description */}
        <p className="max-w-2xl mx-auto text-text-secondary leading-relaxed mb-12 animate-fade-in-up opacity-0 animation-delay-600">
          Passionate about breaking and building secure systems. I compete in CTFs,
          hunt bugs, and craft clean full-stack applications — always learning, always hacking.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up opacity-0 animation-delay-800">
          <a
            href="#projects"
            className="group relative px-8 py-3 bg-accent text-bg-primary font-mono font-semibold text-sm rounded overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-accent/20"
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              View Projects
            </span>
            <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </a>

          <button
            onClick={() => setResumeModal(true)}
            className="group px-8 py-3 border border-border text-text-primary font-mono text-sm rounded hover:border-accent/40 hover:text-accent transition-all duration-300 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            View Resume
          </button>

          <a
            href="tel:+919987315051"
            className="group px-8 py-3 border border-border text-text-primary font-mono text-sm rounded hover:border-accent/40 hover:text-accent transition-all duration-300 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            +91 9987315051
          </a>
        </div>

        {/* ── Bento Grid (inspired by enscribe.dev) ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-16 max-w-3xl mx-auto animate-fade-in-up opacity-0 animation-delay-800">
          {/* GitHub */}
          <a
            href="https://github.com/cazy8"
            target="_blank"
            rel="noopener noreferrer"
            className="group glass rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:border-accent/20 transition-all duration-300 aspect-square"
          >
            <svg className="w-8 h-8 text-text-secondary group-hover:text-accent transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <span className="font-mono text-xs text-text-secondary group-hover:text-accent transition-colors">GitHub</span>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/h4rshg/"
            target="_blank"
            rel="noopener noreferrer"
            className="group glass rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:border-accent/20 transition-all duration-300 aspect-square"
          >
            <svg className="w-8 h-8 text-text-secondary group-hover:text-accent transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            <span className="font-mono text-xs text-text-secondary group-hover:text-accent transition-colors">LinkedIn</span>
          </a>

          {/* Resume card */}
          <button
            onClick={() => setResumeModal(true)}
            className="group glass rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:border-accent/20 transition-all duration-300 aspect-square"
          >
            <svg className="w-8 h-8 text-text-secondary group-hover:text-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="font-mono text-xs text-text-secondary group-hover:text-accent transition-colors">Resume</span>
          </button>

          {/* CTF / Flag */}
          <a
            href="/flag.txt"
            className="group glass rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:border-accent/20 transition-all duration-300 aspect-square"
          >
            <span className="text-3xl group-hover:animate-pulse">🏴</span>
            <span className="font-mono text-xs text-text-secondary group-hover:text-accent transition-colors">flag.txt</span>
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
          <span className="font-mono text-xs text-text-secondary tracking-widest">
            SCROLL
          </span>
          <div className="w-px h-8 bg-linear-to-b from-accent/50 to-transparent animate-pulse" />
        </div>
      </div>

      {/* ── Resume View Chooser Modal ── */}
      {resumeModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setResumeModal(false)}
        >
          <div
            className="glass rounded-2xl border border-border/50 p-8 max-w-md w-full mx-4 shadow-2xl shadow-black/40"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Terminal bar */}
            <div className="flex items-center gap-2 mb-6">
              <span className="w-3 h-3 rounded-full bg-red-500/80 cursor-pointer" onClick={() => setResumeModal(false)} />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-3 font-mono text-xs text-text-secondary">
                choose-resume-view
              </span>
            </div>

            <h3 className="text-xl font-bold text-text-primary mb-2">
              View Resume
            </h3>
            <p className="text-text-secondary text-sm mb-6">
              Choose how you&apos;d like to explore the resume:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Linux UI View */}
              <a
                href="/resume?view=linux"
                className="group rounded-xl border border-border/50 bg-bg-primary p-5 hover:border-accent/30 hover:bg-accent/5 transition-all duration-300 text-center"
              >
                <div className="text-4xl mb-3">🐧</div>
                <h4 className="font-mono text-sm font-semibold text-text-primary group-hover:text-accent transition-colors mb-1">
                  Linux Terminal
                </h4>
                <p className="text-text-secondary text-xs">
                  Interactive bash shell with commands like <code className="text-accent">cat</code>, <code className="text-accent">ls</code>, <code className="text-accent">neofetch</code>
                </p>
              </a>

              {/* Normal View */}
              <a
                href="/resume?view=normal"
                className="group rounded-xl border border-border/50 bg-bg-primary p-5 hover:border-accent/30 hover:bg-accent/5 transition-all duration-300 text-center"
              >
                <div className="text-4xl mb-3">📄</div>
                <h4 className="font-mono text-sm font-semibold text-text-primary group-hover:text-accent transition-colors mb-1">
                  Normal View
                </h4>
                <p className="text-text-secondary text-xs">
                  Clean document layout with sections, skills, and download option
                </p>
              </a>
            </div>

            {/* Download PDF direct */}
            <a
              href="/resume.pdf"
              download
              className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-border/30 font-mono text-xs text-text-secondary hover:text-accent hover:border-accent/30 transition-all"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download PDF directly
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
