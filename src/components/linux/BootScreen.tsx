"use client";

import React, { useState, useEffect } from "react";

type BootPhase = "grub" | "splash" | "login" | "done";

interface BootScreenProps {
  onBootComplete: () => void;
}

const GRUB_ENTRIES = [
  { label: "HarshOS GNU/Linux 6.8.0-harsh", selected: true },
  { label: "HarshOS GNU/Linux (recovery mode)", selected: false },
  { label: "Memory test (memtest86+.bin)", selected: false },
  { label: "System setup (UEFI Firmware Settings)", selected: false },
];

const TUX_ASCII = [
  "         .--.       ",
  "        |o_o |      ",
  "        |:_/ |      ",
  "       //   \\ \\     ",
  "      (|     | )    ",
  "     /'\\_   _/`\\    ",
  "     \\___)=(___/    ",
];

export default function BootScreen({ onBootComplete }: BootScreenProps) {
  const [phase, setPhase] = useState<BootPhase>("grub");

  useEffect(() => {
    if (phase === "done") {
      onBootComplete();
    }
  }, [phase, onBootComplete]);
  const [grubTimer, setGrubTimer] = useState(3);
  const [splashProgress, setSplashProgress] = useState(0);
  const [loginFade, setLoginFade] = useState(false);
  const [bootLogs, setBootLogs] = useState<string[]>([]);

  // GRUB countdown
  useEffect(() => {
    if (phase !== "grub") return;
    if (grubTimer <= 0) {
      setPhase("splash");
      return;
    }
    const t = setTimeout(() => setGrubTimer((p) => p - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, grubTimer]);

  // Splash loading
  useEffect(() => {
    if (phase !== "splash") return;

    const BOOT_MESSAGES = [
      "[  OK  ] Started systemd-journald.service — Journal Service.",
      "[  OK  ] Mounted /boot/efi.",
      "[  OK  ] Reached target Local File Systems.",
      "[  OK  ] Started NetworkManager.service — Network Manager.",
      "[  OK  ] Reached target Network.",
      "[  OK  ] Started sshd.service — OpenSSH server daemon.",
      "[  OK  ] Started lightdm.service — Light Display Manager.",
      "[  OK  ] Reached target Multi-User System.",
      "[  OK  ] Reached target Graphical Interface.",
      "         Starting HarshOS Desktop Environment...",
    ];

    let idx = 0;
    const logInterval = setInterval(() => {
      if (idx < BOOT_MESSAGES.length) {
        const msg = BOOT_MESSAGES[idx];
        idx++;
        setBootLogs((prev) => [...prev, msg]);
        setSplashProgress((idx / BOOT_MESSAGES.length) * 100);
      } else {
        clearInterval(logInterval);
        setTimeout(() => setPhase("login"), 400);
      }
    }, 250);

    return () => clearInterval(logInterval);
  }, [phase]);

  // Login auto-dismiss
  useEffect(() => {
    if (phase !== "login") return;
    const t1 = setTimeout(() => setLoginFade(true), 800);
    const t2 = setTimeout(() => {
      setPhase("done");
      onBootComplete();
    }, 1400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [phase, onBootComplete]);

  const skipBoot = () => {
    setPhase("done");
    onBootComplete();
  };

  if (phase === "done") return null;

  return (
    <div
      className="fixed inset-0 z-[99999] select-none"
      onClick={phase === "grub" ? () => setGrubTimer(0) : undefined}
    >
      {/* Skip button */}
      <button
        onClick={skipBoot}
        className="absolute top-4 right-4 z-10 text-xs text-white/30 hover:text-white/60 font-mono transition-colors"
      >
        Skip →
      </button>

      {/* GRUB Phase */}
      {phase === "grub" && (
        <div className="w-full h-full bg-[#1a0a2e] flex flex-col items-center justify-center font-mono">
          <div className="w-[600px] max-w-[90vw]">
            <div className="text-center mb-6">
              <h1 className="text-white text-lg font-bold tracking-wider">
                GNU GRUB version 2.12
              </h1>
              <p className="text-gray-500 text-xs mt-1">Minimal BASH-like line editing is supported.</p>
            </div>

            <div className="border border-gray-600 bg-black/30 p-1">
              {GRUB_ENTRIES.map((entry, i) => (
                <div
                  key={i}
                  className={`px-3 py-1.5 text-sm ${entry.selected
                    ? "bg-white text-black font-bold"
                    : "text-gray-300"
                    }`}
                >
                  {entry.selected ? "*" : " "} {entry.label}
                </div>
              ))}
            </div>

            <div className="mt-6 text-gray-400 text-xs text-center space-y-1">
              <p>
                Use the ↑ and ↓ keys to select which entry is highlighted.
              </p>
              <p>
                The highlighted entry will be started automatically in{" "}
                <span className="text-white font-bold">{grubTimer}s</span>.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Splash/Boot Phase */}
      {phase === "splash" && (
        <div className="w-full h-full bg-[#0c0c0c] flex flex-col items-center justify-center">
          {/* Tux ASCII Art */}
          <div className="mb-6 text-center">
            <pre className="text-[#00ff88] text-sm leading-tight font-mono inline-block text-left">
              {TUX_ASCII.join("\n")}
            </pre>
            <h1 className="text-2xl font-bold text-white tracking-widest font-mono mt-3">
              HarshOS
            </h1>
            <p className="text-xs text-gray-500 font-mono mt-1">
              GNU/Linux 6.8.0-harsh — kernel loading
            </p>
          </div>

          {/* Progress bar (Linux-style) */}
          <div className="w-[300px] h-[3px] bg-white/10 rounded-full mb-6 overflow-hidden">
            <div
              className="h-full bg-[#00ff88] rounded-full transition-all duration-300"
              style={{ width: `${splashProgress}%` }}
            />
          </div>

          {/* Boot logs */}
          <div className="w-[600px] max-w-[90vw] h-48 overflow-hidden font-mono text-xs">
            {bootLogs.map((log, i) => {
              if (!log) return null;
              return (
                <div
                  key={i}
                  className="py-0.5 animate-fadeIn"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  {log.includes("[  OK  ]") ? (
                    <>
                      <span className="text-[#00ff88]">[  OK  ]</span>
                      <span className="text-gray-400">{log.replace("[  OK  ]", "")}</span>
                    </>
                  ) : (
                    <span className="text-gray-400">{log}</span>
                  )}
                </div>
              );
            })}
            <span className="inline-block w-2 h-4 bg-[#00ff88] animate-pulse" />
          </div>
        </div>
      )}

      {/* Login Phase */}
      {phase === "login" && (
        <div
          className={`w-full h-full bg-[#0c0c0c] flex flex-col items-center justify-center transition-opacity duration-500 ${loginFade ? "opacity-0" : "opacity-100"
            }`}
        >
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-linear-to-br from-[#00ff88] to-[#00aa55] flex items-center justify-center text-3xl font-bold text-black mb-4 shadow-lg shadow-green-500/20">
            HG
          </div>

          <h2 className="text-xl font-semibold text-white mb-1 font-mono">
            harsh
          </h2>
          <p className="text-sm text-gray-400 font-mono mb-6">harsh@admin</p>

          {/* Auto-login indicator */}
          <div className="flex items-center gap-2 text-xs text-[#00ff88] font-mono">
            <div className="w-3 h-3 border-2 border-[#00ff88] border-t-transparent rounded-full animate-spin" />
            Authenticating...
          </div>
        </div>
      )}
    </div>
  );
}
