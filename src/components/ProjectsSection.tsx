"use client";

import { useState } from "react";

interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  period: string;
  type: "commercial" | "open-source" | "community" | "personal";
  year: number;
}

const PROJECTS: Project[] = [
  {
    title: "Portfolio v2",
    description:
      "Terminal-inspired portfolio featuring a Linux resume viewer, bento grid layout, dark hacker aesthetic, and smooth animations — inspired by enscribe.dev et al.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "React"],
    github: "https://github.com/cazy8",
    period: "2026 — Present",
    type: "personal",
    year: 2026,
  },
  {
    title: "Cyb3rfy",
    description:
      "A comprehensive cybersecurity platform for learning and practicing offensive security techniques, featuring hands-on labs, real-world scenarios, and a Linux-inspired portfolio OS interface.",
    tags: ["Python", "Flask", "Security", "CTF"],
    link: "https://cyb3rfy-4f78151744f8.herokuapp.com/",
    period: "2025 — Present",
    type: "personal",
    year: 2025,
  },
  {
    title: "CTF Writeups",
    description:
      "Collection of detailed CTF challenge writeups and solutions, covering web exploitation, reverse engineering, cryptography, forensics, and OSINT.",
    tags: ["CTF", "Security", "Writeups", "Web Exploitation"],
    github: "https://github.com/cazy8",
    period: "2024 — Present",
    type: "community",
    year: 2024,
  },
  {
    title: "Security Tools",
    description:
      "Custom-built security and pentesting tools for reconnaissance, vulnerability scanning, and exploitation. Automated workflows for bug bounty hunting.",
    tags: ["Python", "Bash", "Security", "Automation"],
    github: "https://github.com/cazy8",
    period: "2024 — Present",
    type: "open-source",
    year: 2024,
  },
];

const TYPE_COLORS: Record<string, string> = {
  commercial: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  "open-source": "text-green-400 bg-green-400/10 border-green-400/20",
  community: "text-purple-400 bg-purple-400/10 border-purple-400/20",
  personal: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
};

export default function ProjectsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  /* group by year, sorted descending */
  const byYear = PROJECTS.reduce<Record<number, Project[]>>((acc, p) => {
    (acc[p.year] ??= []).push(p);
    return acc;
  }, {});
  const years = Object.keys(byYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <section id="projects" className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto">
        {/* header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-accent text-sm">02.</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary">
              Projects
            </h2>
            <div className="flex-1 h-px bg-border" />
          </div>
          <p className="text-text-secondary max-w-xl">
            Some work I&apos;ve done ヽ(o^ ^o)ﾉ
          </p>
        </div>

        {/* timeline */}
        {years.map((year) => (
          <div key={year} className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="font-mono text-2xl font-bold text-accent/60">
                {year}
              </span>
              <div className="flex-1 h-px bg-border/40" />
            </div>

            <div className="space-y-4">
              {byYear[year].map((project) => {
                const gi = PROJECTS.indexOf(project);
                return (
                  <div
                    key={project.title}
                    className="group relative rounded-xl border border-border/50 bg-bg-card/30 hover:border-accent/20 hover:bg-bg-card/60 transition-all duration-500 overflow-hidden"
                    onMouseEnter={() => setHoveredIndex(gi)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-linear-to-r from-accent/[0.03] via-transparent to-transparent" />

                    <div className="relative p-6 sm:p-8 flex flex-col sm:flex-row gap-6">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                          <h3 className="text-lg font-bold text-text-primary group-hover:text-accent transition-colors">
                            {project.title}
                          </h3>
                          <span
                            className={`px-2 py-0.5 rounded-full font-mono text-[10px] uppercase tracking-wider border ${TYPE_COLORS[project.type]}`}
                          >
                            {project.type}
                          </span>
                        </div>
                        <p className="text-text-secondary text-sm leading-relaxed mb-4">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 font-mono text-xs text-text-secondary bg-bg-primary rounded border border-border/50 hover:border-accent/30 hover:text-accent transition-all"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-4 shrink-0">
                        <span className="font-mono text-xs text-text-secondary whitespace-nowrap">
                          {project.period}
                        </span>
                        <div className="flex gap-3">
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-lg border border-border/50 text-text-secondary hover:text-accent hover:border-accent/30 transition-all"
                            >
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                              </svg>
                            </a>
                          )}
                          {project.link && (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-lg border border-border/50 text-text-secondary hover:text-accent hover:border-accent/30 transition-all"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
