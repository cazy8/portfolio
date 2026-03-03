"use client";

const SKILL_CATEGORIES = [
  {
    category: "Offensive Security",
    icon: "🔓",
    skills: [
      { name: "Penetration Testing", level: 90 },
      { name: "Web App Security", level: 85 },
      { name: "Network Security", level: 80 },
      { name: "Reverse Engineering", level: 75 },
      { name: "Malware Analysis", level: 70 },
    ],
  },
  {
    category: "Development",
    icon: "💻",
    skills: [
      { name: "Python", level: 90 },
      { name: "JavaScript / TypeScript", level: 85 },
      { name: "React / Next.js", level: 80 },
      { name: "Node.js", level: 80 },
      { name: "SQL / NoSQL", level: 75 },
    ],
  },
  {
    category: "Tools & Platforms",
    icon: "🛠️",
    skills: [
      { name: "Burp Suite", level: 90 },
      { name: "Wireshark", level: 85 },
      { name: "Metasploit", level: 80 },
      { name: "Docker / Linux", level: 85 },
      { name: "Git / CI/CD", level: 80 },
    ],
  },
  {
    category: "CTF Categories",
    icon: "🏴",
    skills: [
      { name: "Web Exploitation", level: 90 },
      { name: "Cryptography", level: 80 },
      { name: "Forensics", level: 75 },
      { name: "Binary Exploitation", level: 70 },
      { name: "OSINT", level: 85 },
    ],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-accent text-sm">03.</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary">
            Skills &amp; Arsenal
          </h2>
          <div className="flex-1 h-px bg-border" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {SKILL_CATEGORIES.map((cat) => (
            <div
              key={cat.category}
              className="glass rounded-xl overflow-hidden hover:border-accent/20 transition-all duration-300"
            >
              {/* Terminal bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-4 font-mono text-xs text-text-secondary">
                  {cat.icon} {cat.category.toLowerCase().replace(/\s+/g, "-")}
                </span>
              </div>

              <div className="p-6 space-y-4">
                <h3 className="font-mono text-accent text-sm mb-4">
                  <span className="text-text-secondary">$ </span>
                  scan --category &quot;{cat.category}&quot;
                </h3>

                {cat.skills.map((skill) => (
                  <div key={skill.name} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-sm text-text-primary">
                        {skill.name}
                      </span>
                      <span className="font-mono text-xs text-text-secondary">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-bg-primary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-linear-to-r from-accent/80 to-accent rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
