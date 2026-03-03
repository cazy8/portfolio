"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface TopBarProps {
  onActivities: () => void;
  activeWindowTitle?: string;
}

export default function TopBar({
  onActivities,
  activeWindowTitle,
}: TopBarProps) {
  const router = useRouter();
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      );
      setDate(
        now.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-7 bg-black/80 backdrop-blur-md flex items-center px-3 select-none z-[9999] relative">
      {/* Activities button */}
      <button
        onClick={onActivities}
        className="text-[11px] text-white/90 hover:text-white font-semibold tracking-wide px-2 py-0.5 rounded hover:bg-white/10 transition-all"
      >
        Activities
      </button>

      <button
        onClick={() => router.push("/resume?view=normal")}
        className="text-[11px] text-green-400 hover:text-green-300 font-semibold tracking-wide ml-2 px-2 py-0.5 rounded hover:bg-white/10 transition-all flex items-center gap-1"
      >
        <span>⚡</span> Simple View
      </button>

      {/* Active window title (left area) */}
      {activeWindowTitle && (
        <span className="text-[11px] text-white/50 ml-4 truncate max-w-[200px] hidden sm:block">
          {activeWindowTitle}
        </span>
      )}

      {/* Center: Clock & Date */}
      <div className="flex-1 flex justify-center">
        <button
          onClick={() => setShowCalendar(!showCalendar)}
          className="text-[11px] text-white/90 font-medium px-2 py-0.5 rounded hover:bg-white/10 transition-all"
        >
          {date} {time}
        </button>
      </div>

      {/* Right: System tray */}
      <div className="flex items-center gap-0.5">
        {/* Network */}
        <button className="w-6 h-6 rounded flex items-center justify-center hover:bg-white/10 transition-colors">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            opacity="0.8"
          >
            <path d="M5 12.55a11 11 0 0114 0" />
            <path d="M8.53 16.11a6 6 0 016.95 0" />
            <circle cx="12" cy="20" r="1" fill="white" />
          </svg>
        </button>

        {/* Volume */}
        <button className="w-6 h-6 rounded flex items-center justify-center hover:bg-white/10 transition-colors">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            opacity="0.8"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="white" fillOpacity="0.8" />
            <path d="M15.54 8.46a5 5 0 010 7.07" />
            <path d="M19.07 4.93a10 10 0 010 14.14" />
          </svg>
        </button>

        {/* Battery */}
        <button className="w-6 h-6 rounded flex items-center justify-center hover:bg-white/10 transition-colors">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            opacity="0.8"
          >
            <rect x="2" y="7" width="18" height="10" rx="2" />
            <rect x="4" y="9" width="12" height="6" rx="1" fill="#00ff88" fillOpacity="0.8" />
            <path d="M22 11v2" strokeWidth="2" />
          </svg>
        </button>

        {/* Power */}
        <button className="w-6 h-6 rounded flex items-center justify-center hover:bg-white/10 transition-colors ml-1">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            opacity="0.7"
          >
            <path d="M12 2v6" />
            <path d="M18.36 6.64A9 9 0 115.64 6.64" />
          </svg>
        </button>
      </div>

      {/* Calendar dropdown */}
      {showCalendar && (
        <>
          <div
            className="fixed inset-0 z-[9998]"
            onClick={() => setShowCalendar(false)}
          />
          <div className="absolute top-7 left-1/2 -translate-x-1/2 z-[9999] bg-[#2b2b2b] border border-white/10 rounded-xl shadow-2xl p-4 w-72">
            <div className="text-center mb-3">
              <p className="text-white text-sm font-semibold">{date}</p>
              <p className="text-white/60 text-xs font-mono">{time}</p>
            </div>
            <div className="border-t border-white/10 pt-3">
              <p className="text-white/40 text-xs text-center">
                No notifications
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
