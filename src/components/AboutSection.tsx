"use client";

export default function AboutSection() {
  return (
    <section id="about" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-accent text-sm">01.</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary">
            About Me
          </h2>
          <div className="flex-1 h-px bg-border" />
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left — bio */}
          <div className="lg:col-span-3 space-y-6">
            {/* Terminal card */}
            <div className="glass rounded-xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-4 font-mono text-xs text-text-secondary">
                  harsh@portfolio:~$ cat about.md
                </span>
              </div>
              <div className="p-6 font-mono text-sm leading-relaxed text-text-secondary space-y-4">
                <p>
                  <span className="text-accent">## </span>
                  <span className="text-text-primary font-semibold">
                    Hello, I&apos;m Harsh Gupta
                  </span>
                </p>
                <p>
                  A cybersecurity researcher and developer who thrives at the
                  intersection of{" "}
                  <span className="text-accent">offensive security</span> and
                  modern web development.
                </p>
                <p>
                  I actively participate in{" "}
                  <span className="text-accent">CTF competitions</span>, hunting
                  for vulnerabilities and solving complex challenges. When I&apos;m
                  not hacking, I build full-stack applications with clean
                  architecture and robust security practices.
                </p>
                <p>
                  Currently pursuing my passion for making the digital world a
                  safer place, one exploit at a time.
                </p>
                <p className="text-accent">
                  &gt; &quot;The quieter you become, the more you can hear.&quot;
                </p>
              </div>
            </div>
          </div>

          {/* Right — stats / quick info */}
          <div className="lg:col-span-2 space-y-4">
            {[
              { label: "Location", value: "India", icon: "📍" },
              { label: "Focus", value: "Offensive Security", icon: "🔐" },
              { label: "Education", value: "Computer Science", icon: "🎓" },
              { label: "Status", value: "Open to Opportunities", icon: "🟢" },
            ].map((item) => (
              <div
                key={item.label}
                className="glass rounded-xl p-4 flex items-center gap-4 hover:border-accent/20 transition-all duration-300 group"
              >
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="font-mono text-xs text-text-secondary uppercase tracking-wider">
                    {item.label}
                  </p>
                  <p className="text-text-primary font-medium group-hover:text-accent transition-colors">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
