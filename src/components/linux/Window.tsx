"use client";

import React from "react";

interface WindowProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  x: number;
  y: number;
  width: number;
  height: number;
  isMinimized: boolean;
  isMaximized: boolean;
  isActive: boolean;
  zIndex: number;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onMaximize: (id: string) => void;
  onFocus: (id: string) => void;
  onDragStart: (id: string, e: React.MouseEvent) => void;
  onResizeStart: (id: string, dir: string, e: React.MouseEvent) => void;
  children: React.ReactNode;
}

export default function Window({
  id,
  title,
  icon,
  x,
  y,
  width,
  height,
  isMinimized,
  isMaximized,
  isActive,
  zIndex,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onDragStart,
  onResizeStart,
  children,
}: WindowProps) {
  if (isMinimized) return null;

  const style: React.CSSProperties = isMaximized
    ? {
        top: 28,
        left: 68,
        width: "calc(100% - 68px)",
        height: "calc(100% - 28px)",
        zIndex,
        transition: "top 0.25s cubic-bezier(0.2, 0, 0, 1), left 0.25s cubic-bezier(0.2, 0, 0, 1), width 0.25s cubic-bezier(0.2, 0, 0, 1), height 0.25s cubic-bezier(0.2, 0, 0, 1)",
      }
    : { top: y, left: x, width, height, zIndex };

  return (
    <div
      className={`absolute flex flex-col overflow-hidden transition-shadow duration-200 animate-gnome-window-open ${
        isMaximized ? "" : "rounded-xl"
      } ${
        isActive
          ? "shadow-2xl shadow-black/50 ring-1 ring-white/10"
          : "shadow-lg shadow-black/30"
      }`}
      style={style}
      onMouseDown={() => onFocus(id)}
    >
      {/* GNOME Header Bar */}
      <div
        className={`flex items-center h-10 px-3 shrink-0 select-none ${
          isActive ? "bg-[#303030]" : "bg-[#252525]"
        } ${isMaximized ? "" : "rounded-t-xl"}`}
        onMouseDown={(e) => {
          if (e.button === 0 && !isMaximized) onDragStart(id, e);
        }}
        onDoubleClick={() => onMaximize(id)}
      >
        {/* App icon + title */}
        <div className="flex-1 flex items-center gap-2 min-w-0">
          <div className="w-4 h-4 shrink-0 flex items-center justify-center">
            {icon}
          </div>
          <span
            className={`text-xs font-medium truncate ${
              isActive ? "text-gray-200" : "text-gray-500"
            }`}
          >
            {title}
          </span>
        </div>

        {/* Window buttons (GNOME right-side) */}
        <div className="flex items-center gap-1 ml-2">
          {/* Minimize */}
          <button
            className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onMinimize(id);
            }}
            title="Minimize"
          >
            <svg width="12" height="2" viewBox="0 0 12 2">
              <rect
                width="12"
                height="2"
                rx="1"
                fill={isActive ? "#aaa" : "#666"}
              />
            </svg>
          </button>

          {/* Maximize */}
          <button
            className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onMaximize(id);
            }}
            title={isMaximized ? "Restore" : "Maximize"}
          >
            {isMaximized ? (
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                stroke={isActive ? "#aaa" : "#666"}
                strokeWidth="1.5"
              >
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <path d="M3 9V3a1 1 0 011-1h6" />
              </svg>
            ) : (
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                stroke={isActive ? "#aaa" : "#666"}
                strokeWidth="1.5"
              >
                <rect x="1.5" y="1.5" width="9" height="9" rx="1.5" />
              </svg>
            )}
          </button>

          {/* Close */}
          <button
            className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-red-500 transition-colors group"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onClose(id);
            }}
            title="Close"
          >
            <svg width="10" height="10" viewBox="0 0 10 10">
              <path
                d="M1.5 1.5L8.5 8.5M8.5 1.5L1.5 8.5"
                stroke={isActive ? "#aaa" : "#666"}
                strokeWidth="1.5"
                strokeLinecap="round"
                className="group-hover:stroke-white"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Window content */}
      <div className="flex-1 bg-[#1e1e1e] overflow-hidden">{children}</div>

      {/* Resize handles (invisible, only when not maximized) */}
      {!isMaximized && (
        <>
          {/* Edges */}
          <div
            className="absolute top-0 left-3 right-3 h-1 cursor-n-resize"
            onMouseDown={(e) => {
              e.stopPropagation();
              onResizeStart(id, "n", e);
            }}
          />
          <div
            className="absolute bottom-0 left-3 right-3 h-1 cursor-s-resize"
            onMouseDown={(e) => {
              e.stopPropagation();
              onResizeStart(id, "s", e);
            }}
          />
          <div
            className="absolute top-3 bottom-3 left-0 w-1 cursor-w-resize"
            onMouseDown={(e) => {
              e.stopPropagation();
              onResizeStart(id, "w", e);
            }}
          />
          <div
            className="absolute top-3 bottom-3 right-0 w-1 cursor-e-resize"
            onMouseDown={(e) => {
              e.stopPropagation();
              onResizeStart(id, "e", e);
            }}
          />
          {/* Corners */}
          <div
            className="absolute top-0 left-0 w-4 h-4 cursor-nw-resize"
            onMouseDown={(e) => {
              e.stopPropagation();
              onResizeStart(id, "nw", e);
            }}
          />
          <div
            className="absolute top-0 right-0 w-4 h-4 cursor-ne-resize"
            onMouseDown={(e) => {
              e.stopPropagation();
              onResizeStart(id, "ne", e);
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-4 h-4 cursor-sw-resize"
            onMouseDown={(e) => {
              e.stopPropagation();
              onResizeStart(id, "sw", e);
            }}
          />
          <div
            className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
            onMouseDown={(e) => {
              e.stopPropagation();
              onResizeStart(id, "se", e);
            }}
          />
        </>
      )}
    </div>
  );
}
