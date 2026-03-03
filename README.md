# Harsh Gupta — Dual-Interface Cybersecurity Portfolio

Welcome to the source code of my personal portfolio! This is a dynamic, highly interactive, and visually striking web application built to showcase my profile as a Cybersecurity Student, Ethical Hacker, and Full-Stack Developer.

**Live Demo**: *(Add your deployed link here!)*

## 🚀 Key Features

This portfolio is entirely unique, offering **two completely different interfaces** synchronized to the same core data:

### 1. Minimalist View (Simple View)
A clean, elegant, and modern layout that prioritizes readability, accessibility, and professional presentation. 
- Fast loading and fully responsive for mobile devices.
- Uses advanced CSS micro-animations to highlight key areas (e.g., hovering over social media links or the main name).
- Clearly structures my Experience, Projects, Skills, and Certifications.

### 2. HarshOS: Linux / Hacker View
By default, the portfolio boots into an immersive, simulated desktop environment — **HarshOS**. This view is tailored to the cybersecurity theme and functions exactly like a real Linux machine inside your browser!
- **Interactive Boot Sequence**: A simulated Linux kernel initialization screen plays when you load the site.
- **Dynamic File System**: The terminal (`TerminalApp`) isn't just static text. It dynamically reads my Live Profile data! You can literally `ls ~/projects` and `cat ~/skills/languages.txt` to read my real resume data straight from the terminal.
- **Cyberpunk Aesthetics**: Features multiple dynamic wallpapers (like Kali ASCII, matrix, and cyber landscapes) that you can swap via the built-in Settings app.
- **Mini-Games Dock**: At the bottom of the screen, there's a custom-styled dock to launch web-based games built right into the desktop:
  - 🐍 **Snake**
  - 🐦 **Flappy Bird**
  - 🏓 **Pong**
  - 🧩 **Tetris**
  - 💣 **Minesweeper**

### 3. Production & Hacker-Ready Security
The application enforces strict security headers via Next.js configurations to ensure it's as secure as it looks:
- `Content-Security-Policy` (CSP) deployed to mitigate XSS.
- `X-Frame-Options: DENY` blocks clickjacking attempts.
- `Strict-Transport-Security` enforces secure connections.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Directory)
- **Library**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS & Vanilla CSS (for complex cyber-animations and window management mechanics).
- **Deployment**: Vercel (recommended)

---

## 📦 Setting Up Locally

Want to run HarshOS on your own machine? Follow these easy steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/cazy8/PORTFOLIO.git
   cd PORTFOLIO
   ```

2. **Install dependencies:**
   Make sure you have Node.js installed, then run:
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Boot it up:**
   Open [http://localhost:3000](http://localhost:3000) in your browser. The Linux boot sequence will begin immediately!

---

## 🗂️ Project Structure Highlights
- `/src/app/page.tsx` — The entry point; handles routing to the Linux view.
- `/src/components/linux/LinuxDesktop.tsx` — The core window manager for HarshOS. Handles dragging, resizing, and docking apps.
- `/src/components/linux/apps.tsx` — Contains the logic for the Terminal, Games, File Manager, and Resume apps within Linux.
- `/src/components/NormalResumeView.tsx` — The cleanly designed "Simple View".

---

## 📫 Let's Connect!

I am actively open to internships, collaborations, and CTF team invitations! If you want to discuss vulnerability research, development, or just say hi:

- **Email**: harshgupta8125@gmail.com
- **Phone**: +91 9987315051
- **LinkedIn**: [h4rshg](https://linkedin.com/in/h4rshg)
- **GitHub**: [cazy8](https://github.com/cazy8)

---
*Built with ❤️ (and a lot of coffee) by Harsh Gupta.* 🐧
