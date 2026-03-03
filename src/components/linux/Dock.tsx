"use client";

import React from "react";

interface DockApp {
  id: string;
  icon: React.ReactNode;
  name: string;
  isRunning: boolean;
  isActive: boolean;
}

interface DockProps {
  apps: DockApp[];
  onAppClick: (appId: string) => void;
  onShowApps: () => void;
}

export default function Dock({ apps, onAppClick, onShowApps }: DockProps) {
  return (
    <div className="absolute left-0 top-7 bottom-0 w-[68px] bg-black/50 backdrop-blur-xl border-r border-white/5 flex flex-col items-center py-3 z-[9998]">
      {/* Pinned & Running apps */}
      <div className="flex flex-col items-center gap-1 flex-1">
        {apps.map((app) => (
          <button
            key={app.id}
            className={`relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 ease-[cubic-bezier(0.2,0,0,1)] group ${
              app.isActive
                ? "bg-white/15 scale-105"
                : "hover:bg-white/10 hover:scale-110 active:scale-95"
            }`}
            onClick={() => onAppClick(app.id)}
            title={app.name}
          >
            {/* Icon */}
            <div className="w-8 h-8 flex items-center justify-center">
              {app.icon}
            </div>

            {/* Running indicator */}
            {app.isRunning && (
              <div
                className={`absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-r-full transition-all ${
                  app.isActive ? "h-5 bg-[#00ff88]" : "h-2 bg-white/50"
                }`}
              />
            )}

            {/* Tooltip */}
            <div className="absolute left-full ml-3 px-2.5 py-1 bg-[#1e1e1e] border border-white/10 rounded-lg text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 shadow-lg z-50">
              {app.name}
            </div>
          </button>
        ))}
      </div>

      {/* Separator */}
      <div className="w-8 h-px bg-white/10 my-2" />

      {/* Show Applications button */}
      <button
        className="w-12 h-12 rounded-xl flex items-center justify-center hover:bg-white/10 active:scale-90 transition-all duration-200 ease-[cubic-bezier(0.2,0,0,1)] group"
        onClick={onShowApps}
        title="Show Applications"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          className="opacity-70 group-hover:opacity-100 transition-opacity"
        >
          <rect x="1" y="1" width="5" height="5" rx="1.5" fill="white" />
          <rect x="8.5" y="1" width="5" height="5" rx="1.5" fill="white" />
          <rect x="16" y="1" width="5" height="5" rx="1.5" fill="white" />
          <rect x="1" y="8.5" width="5" height="5" rx="1.5" fill="white" />
          <rect x="8.5" y="8.5" width="5" height="5" rx="1.5" fill="white" />
          <rect x="16" y="8.5" width="5" height="5" rx="1.5" fill="white" />
          <rect x="1" y="16" width="5" height="5" rx="1.5" fill="white" />
          <rect x="8.5" y="16" width="5" height="5" rx="1.5" fill="white" />
          <rect x="16" y="16" width="5" height="5" rx="1.5" fill="white" />
        </svg>

        {/* Tooltip */}
        <div className="absolute left-full ml-3 px-2.5 py-1 bg-[#1e1e1e] border border-white/10 rounded-lg text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-lg z-50">
          Show Applications
        </div>
      </button>
    </div>
  );
}
