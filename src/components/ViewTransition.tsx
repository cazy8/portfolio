"use client";

import React from "react";

/**
 * Circuit Board Loader Transition
 * Inspired by https://uiverse.io/Vosoone/smooth-penguin-53 (MIT License)
 * Shows a 3-second animated circuit board loader when switching views.
 */

// Each trace: background path (dark) + animated flow path (colored, glowing)
const TRACES = [
  // Top-left traces
  { d: "M200,150 L200,100 L140,100 L140,40", color: "#00ccff", delay: "0s" },
  { d: "M200,150 L160,150 L160,80 L100,80 L100,30", color: "#ffea00", delay: "0.4s" },
  { d: "M200,150 L200,110 L90,110 L90,50", color: "#00ff15", delay: "0.8s" },
  // Top-right traces
  { d: "M200,150 L200,100 L260,100 L260,40", color: "#9900ff", delay: "0.2s" },
  { d: "M200,150 L240,150 L240,80 L300,80 L300,30", color: "#00ccff", delay: "0.6s" },
  { d: "M200,150 L200,110 L310,110 L310,50", color: "#ffea00", delay: "1s" },
  // Bottom-left traces
  { d: "M200,150 L200,200 L140,200 L140,260", color: "#00ff15", delay: "0.3s" },
  { d: "M200,150 L160,150 L160,220 L100,220 L100,270", color: "#9900ff", delay: "0.7s" },
  { d: "M200,150 L200,190 L80,190 L80,260", color: "#00ccff", delay: "1.1s" },
  // Bottom-right traces
  { d: "M200,150 L200,200 L260,200 L260,260", color: "#ffea00", delay: "0.5s" },
  { d: "M200,150 L240,150 L240,220 L300,220 L300,270", color: "#00ff15", delay: "0.9s" },
  { d: "M200,150 L200,190 L320,190 L320,260", color: "#9900ff", delay: "1.3s" },
  // Horizontal extensions
  { d: "M200,150 L50,150", color: "#00ccff", delay: "0.15s" },
  { d: "M200,150 L350,150", color: "#ffea00", delay: "0.55s" },
  // Short diagonal-style (right-angle) branches
  { d: "M140,100 L110,100 L110,70", color: "#9900ff", delay: "1.2s" },
  { d: "M260,100 L290,100 L290,70", color: "#00ff15", delay: "0.35s" },
  { d: "M140,200 L110,200 L110,240", color: "#ffea00", delay: "0.75s" },
  { d: "M260,200 L290,200 L290,240", color: "#00ccff", delay: "1.05s" },
];

// Small dots at trace endpoints and junctions
const DOTS = [
  { cx: 140, cy: 40 }, { cx: 100, cy: 30 }, { cx: 90, cy: 50 },
  { cx: 260, cy: 40 }, { cx: 300, cy: 30 }, { cx: 310, cy: 50 },
  { cx: 140, cy: 260 }, { cx: 100, cy: 270 }, { cx: 80, cy: 260 },
  { cx: 260, cy: 260 }, { cx: 300, cy: 270 }, { cx: 320, cy: 260 },
  { cx: 50, cy: 150 }, { cx: 350, cy: 150 },
  { cx: 110, cy: 70 }, { cx: 290, cy: 70 },
  { cx: 110, cy: 240 }, { cx: 290, cy: 240 },
];

export default function ViewTransition({ targetView }: { targetView: string }) {
  return (
    <div className="fixed inset-0 z-[999999] bg-[#0c0c0c] flex flex-col items-center justify-center select-none">
      {/* Circuit board SVG */}
      <div className="w-[90vw] max-w-[600px] aspect-[4/3]">
        <svg viewBox="0 0 400 300" className="w-full h-full">
          {/* Background traces (dark gray lines) */}
          {TRACES.map((trace, i) => (
            <path
              key={`bg-${i}`}
              d={trace.d}
              className="circuit-trace-bg"
            />
          ))}

          {/* Junction dots */}
          {DOTS.map((dot, i) => (
            <circle
              key={`dot-${i}`}
              cx={dot.cx}
              cy={dot.cy}
              r="2.5"
              fill="#333"
            />
          ))}

          {/* Central chip */}
          <rect x="175" y="130" width="50" height="40" rx="4" fill="#1a1a1a" stroke="#444" strokeWidth="1.5" />
          <rect x="182" y="137" width="36" height="26" rx="2" fill="none" stroke="#555" strokeWidth="0.8" />
          {/* Chip pins (top & bottom) */}
          {[182, 190, 198, 206, 214].map((px) => (
            <React.Fragment key={`pin-${px}`}>
              <line x1={px} y1="126" x2={px} y2="130" stroke="#555" strokeWidth="1.2" />
              <line x1={px} y1="170" x2={px} y2="174" stroke="#555" strokeWidth="1.2" />
            </React.Fragment>
          ))}
          {/* Chip pins (left & right) */}
          {[137, 145, 153, 161].map((py) => (
            <React.Fragment key={`pin-${py}`}>
              <line x1="171" y1={py} x2="175" y2={py} stroke="#555" strokeWidth="1.2" />
              <line x1="225" y1={py} x2="229" y2={py} stroke="#555" strokeWidth="1.2" />
            </React.Fragment>
          ))}

          {/* Animated flow traces (colored, glowing) */}
          {TRACES.map((trace, i) => (
            <path
              key={`flow-${i}`}
              d={trace.d}
              className="circuit-trace-flow"
              style={{
                stroke: trace.color,
                filter: `drop-shadow(0 0 6px ${trace.color})`,
                animationDelay: trace.delay,
              }}
            />
          ))}

          {/* Pulsing glow on dots */}
          {DOTS.map((dot, i) => (
            <circle
              key={`glow-${i}`}
              cx={dot.cx}
              cy={dot.cy}
              r="2.5"
              fill="none"
              stroke="#00ccff"
              strokeWidth="0.8"
              opacity="0"
              className="circuit-dot-pulse"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </svg>
      </div>

      {/* Label */}
      <div className="mt-6 text-center">
        <p className="text-white/70 text-sm font-mono tracking-widest circuit-text-pulse">
          {targetView === "linux" ? "Booting Linux Environment" : "Switching to Simple View"}
        </p>
        <div className="flex items-center justify-center gap-1.5 mt-3">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-[#00ccff] circuit-loading-dot"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .circuit-trace-bg {
          stroke: #333;
          stroke-width: 1.8;
          fill: none;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        .circuit-trace-flow {
          stroke-width: 1.8;
          fill: none;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 40 400;
          stroke-dashoffset: 438;
          animation: circuitFlow 3s cubic-bezier(0.5, 0, 0.9, 1) infinite;
        }
        .circuit-dot-pulse {
          animation: dotPulse 2s ease-in-out infinite;
        }
        .circuit-text-pulse {
          animation: textPulse 2s ease-in-out infinite;
        }
        .circuit-loading-dot {
          animation: loadingDot 1.2s ease-in-out infinite;
        }
        @keyframes circuitFlow {
          0% {
            stroke-dashoffset: 438;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        @keyframes dotPulse {
          0%, 100% { opacity: 0; }
          50% { opacity: 0.6; }
        }
        @keyframes textPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes loadingDot {
          0%, 80%, 100% { opacity: 0.2; transform: scale(0.8); }
          40% { opacity: 1; transform: scale(1.3); }
        }
      `}</style>
    </div>
  );
}
