"use client";

import { useState, type FormEvent } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("sent");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-accent text-sm">04.</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary">
            Get in Touch
          </h2>
          <div className="flex-1 h-px bg-border" />
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left info */}
          <div className="lg:col-span-2 space-y-6">
            <p className="text-text-secondary leading-relaxed">
              Whether you have a security concern, a project idea, or just want
              to connect — my inbox is always open.
            </p>

            <div className="space-y-4">
              {[
                {
                  label: "Email",
                  value: "harsh@example.com",
                  icon: "📧",
                },
                {
                  label: "GitHub",
                  value: "@cazy8",
                  link: "https://github.com/cazy8",
                  icon: "🐙",
                },
                {
                  label: "LinkedIn",
                  value: "/in/h4rshg",
                  link: "https://www.linkedin.com/in/h4rshg/",
                  icon: "💼",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="glass rounded-lg p-4 flex items-center gap-3 group hover:border-accent/20 transition-all"
                >
                  <span className="text-xl">{item.icon}</span>
                  <div>
                    <p className="font-mono text-xs text-text-secondary uppercase tracking-wider">
                      {item.label}
                    </p>
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-primary hover:text-accent transition-colors text-sm"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-text-primary text-sm">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="glass rounded-xl overflow-hidden"
            >
              {/* Terminal bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-4 font-mono text-xs text-text-secondary">
                  harsh@portfolio:~$ compose-message
                </span>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-xs text-text-secondary mb-2 uppercase tracking-wider">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full bg-bg-primary border border-border rounded-lg px-4 py-3 text-text-primary font-mono text-sm focus:border-accent/50 focus:outline-none transition-colors placeholder:text-text-secondary/40"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-xs text-text-secondary mb-2 uppercase tracking-wider">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full bg-bg-primary border border-border rounded-lg px-4 py-3 text-text-primary font-mono text-sm focus:border-accent/50 focus:outline-none transition-colors placeholder:text-text-secondary/40"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-xs text-text-secondary mb-2 uppercase tracking-wider">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full bg-bg-primary border border-border rounded-lg px-4 py-3 text-text-primary font-mono text-sm focus:border-accent/50 focus:outline-none transition-colors placeholder:text-text-secondary/40"
                    placeholder="Project Collaboration"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs text-text-secondary mb-2 uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full bg-bg-primary border border-border rounded-lg px-4 py-3 text-text-primary font-mono text-sm focus:border-accent/50 focus:outline-none transition-colors resize-none placeholder:text-text-secondary/40"
                    placeholder="Hey Harsh, I'd like to talk about..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full py-3 bg-accent text-bg-primary font-mono font-semibold text-sm rounded-lg hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {status === "idle" && (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Send Message
                    </>
                  )}
                  {status === "sending" && "Sending..."}
                  {status === "sent" && "✓ Message Sent!"}
                  {status === "error" && "✗ Failed — Try Again"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
