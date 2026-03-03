import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Harsh Gupta | Security Researcher & Developer",
  description:
    "Portfolio of Harsh Gupta — Cybersecurity enthusiast, CTF player, and full-stack developer.",
  keywords: [
    "Harsh Gupta",
    "cybersecurity",
    "portfolio",
    "CTF",
    "developer",
    "security researcher",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bg-primary text-text-primary font-sans noise antialiased">
        {children}
      </body>
    </html>
  );
}
