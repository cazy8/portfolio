"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import BootScreen from "./BootScreen";
import TopBar from "./TopBar";
import Dock from "./Dock";
import Window from "./Window";
import { APPS, APP_COMPONENTS } from "./apps";
import { WALLPAPERS, WallpaperProvider } from "./WallpaperContext";

// ═══════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════

interface WindowState {
  id: string;
  appId: string;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  minWidth: number;
  minHeight: number;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  prevBounds?: { x: number; y: number; width: number; height: number };
}

interface DragState {
  windowId: string;
  offsetX: number;
  offsetY: number;
}

interface ResizeState {
  windowId: string;
  direction: string;
  startX: number;
  startY: number;
  startBounds: { x: number; y: number; width: number; height: number };
}

interface IconDragState {
  appId: string;
  offsetX: number;
  offsetY: number;
  startX: number;
  startY: number;
  started: boolean; // only true after threshold movement
}

// ═══════════════════════════════════════════════════════════════
// DESKTOP ICON GRID LAYOUT
// ═══════════════════════════════════════════════════════════════

const DESKTOP_APPS = APPS.filter((a) => a.showOnDesktop);

const ICON_W = 90;
const ICON_H = 90;
const ICON_GAP = 4;
const GRID_COLS = 3;
const GRID_START_X_OFFSET = 80; // from right edge
const GRID_START_Y = 38; // below top bar

function computeInitialPositions(): Record<string, { x: number; y: number }> {
  const pos: Record<string, { x: number; y: number }> = {};
  const screenW = typeof window !== "undefined" ? window.innerWidth : 1920;
  DESKTOP_APPS.forEach((app, i) => {
    const col = i % GRID_COLS;
    const row = Math.floor(i / GRID_COLS);
    pos[app.id] = {
      x: screenW - GRID_START_X_OFFSET - (GRID_COLS - col) * (ICON_W + ICON_GAP),
      y: GRID_START_Y + row * (ICON_H + ICON_GAP),
    };
  });
  return pos;
}

// ═══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════

export default function LinuxDesktop({ initialApp }: { initialApp?: string }) {
  const router = useRouter();

  // Boot state
  const [booted, setBooted] = useState(false);
  const [hasOpenedInitial, setHasOpenedInitial] = useState(false);

  // Window management
  const [windows, setWindows] = useState<WindowState[]>([]);
  const nextZIndexRef = useRef(1);

  // Drag & resize
  const [dragState, setDragState] = useState<DragState | null>(null);
  const [resizeState, setResizeState] = useState<ResizeState | null>(null);
  const dragRef = useRef<DragState | null>(null);
  const resizeRef = useRef<ResizeState | null>(null);

  // Activities overlay
  const [showActivities, setShowActivities] = useState(false);

  // Apps drawer (bottom-left)
  const [showAppDrawer, setShowAppDrawer] = useState(false);

  // Desktop icon positions (drag & drop)
  const [iconPositions, setIconPositions] = useState<Record<string, { x: number; y: number }>>({});
  const [iconDrag, setIconDrag] = useState<IconDragState | null>(null);
  const iconDragRef = useRef<IconDragState | null>(null);

  // Initialize icon positions on mount
  useEffect(() => {
    setIconPositions(computeInitialPositions());
  }, []);

  // Wallpaper
  const [wallpaperId, setWallpaperId] = useState("kali-ascii");

  // Right-click context menu
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const currentWallpaper = WALLPAPERS.find((w) => w.id === wallpaperId) ?? WALLPAPERS[0];

  // Keep refs in sync
  dragRef.current = dragState;
  resizeRef.current = resizeState;
  iconDragRef.current = iconDrag;

  // ─── Drag & Resize handlers ────────────────────────────────────────

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const drag = dragRef.current;
      const resize = resizeRef.current;
      const iDrag = iconDragRef.current;

      if (iDrag) {
        const dx = e.clientX - iDrag.startX;
        const dy = e.clientY - iDrag.startY;
        // Only start actual drag after 5px movement threshold
        if (!iDrag.started && Math.abs(dx) + Math.abs(dy) < 5) return;
        if (!iDrag.started) {
          iconDragRef.current = { ...iDrag, started: true };
          setIconDrag((prev) => prev ? { ...prev, started: true } : prev);
        }
        const newX = e.clientX - iDrag.offsetX;
        const newY = e.clientY - iDrag.offsetY;
        setIconPositions((prev) => ({
          ...prev,
          [iDrag.appId]: {
            x: Math.max(68, Math.min(newX, window.innerWidth - ICON_W)),
            y: Math.max(28, Math.min(newY, window.innerHeight - ICON_H)),
          },
        }));
        return;
      }

      if (drag) {
        const newX = e.clientX - drag.offsetX;
        const newY = Math.max(28, e.clientY - drag.offsetY);
        setWindows((prev) =>
          prev.map((w) =>
            w.id === drag.windowId ? { ...w, x: newX, y: newY } : w
          )
        );
      }

      if (resize) {
        const dx = e.clientX - resize.startX;
        const dy = e.clientY - resize.startY;
        const sb = resize.startBounds;

        setWindows((prev) =>
          prev.map((w) => {
            if (w.id !== resize.windowId) return w;
            let { x, y, width, height } = sb;

            if (resize.direction.includes("e"))
              width = Math.max(w.minWidth, sb.width + dx);
            if (resize.direction.includes("s"))
              height = Math.max(w.minHeight, sb.height + dy);
            if (resize.direction.includes("w")) {
              const newWidth = Math.max(w.minWidth, sb.width - dx);
              x = sb.x + (sb.width - newWidth);
              width = newWidth;
            }
            if (resize.direction.includes("n")) {
              const newHeight = Math.max(w.minHeight, sb.height - dy);
              y = Math.max(28, sb.y + (sb.height - newHeight));
              height = newHeight;
            }

            return { ...w, x, y, width, height };
          })
        );
      }
    };

    const handleMouseUp = () => {
      const iDrag = iconDragRef.current;
      // If icon was being tracked but never exceeded threshold → it's a click
      if (iDrag && !iDrag.started) {
        // Use a microtask so state updates flush first
        const appId = iDrag.appId;
        setTimeout(() => {
          // Trigger open via custom event since we can't call openApp from effect
          window.dispatchEvent(new CustomEvent("icon-click", { detail: appId }));
        }, 0);
      }
      setDragState(null);
      setResizeState(null);
      setIconDrag(null);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // ─── Window management functions ───────────────────────────

  const focusWindow = useCallback(
    (id: string) => {
      const newZ = nextZIndexRef.current++;
      setWindows((prev) =>
        prev.map((w) => (w.id === id ? { ...w, zIndex: newZ } : w))
      );
    },
    []
  );

  const openApp = useCallback(
    (appId: string) => {
      const appConfig = APPS.find((a) => a.id === appId);
      if (!appConfig) return;

      // Handle external links (Simple View) — use router for client-side nav
      if (appConfig.isExternal && appConfig.externalUrl) {
        router.push(appConfig.externalUrl);
        return;
      }

      // Check if single instance and already open
      if (appConfig.singleInstance) {
        const existing = windows.find((w) => w.appId === appId);
        if (existing) {
          // Focus and un-minimize
          focusWindow(existing.id);
          if (existing.isMinimized) {
            setWindows((prev) =>
              prev.map((w) =>
                w.id === existing.id ? { ...w, isMinimized: false } : w
              )
            );
          }
          return;
        }
      }

      // Calculate position (cascade from previous windows)
      const openCount = windows.filter((w) => !w.isMinimized).length;
      const offset = (openCount % 8) * 30;
      const x = 100 + offset;
      const y = 60 + offset;

      const newZ = nextZIndexRef.current++;

      const newWindow: WindowState = {
        id: `${appId}-${Date.now()}`,
        appId,
        title: appConfig.name,
        x,
        y,
        width: appConfig.defaultWidth,
        height: appConfig.defaultHeight,
        minWidth: appConfig.minWidth,
        minHeight: appConfig.minHeight,
        isMinimized: false,
        isMaximized: false,
        zIndex: newZ,
      };

      setWindows((prev) => [...prev, newWindow]);
      setShowActivities(false);
    },
    [windows, focusWindow]
  );

  // Listen for icon-click custom events (from mouseup handler)
  useEffect(() => {
    const handler = (e: Event) => {
      const appId = (e as CustomEvent).detail;
      if (appId) openApp(appId);
    };
    window.addEventListener("icon-click", handler);
    return () => window.removeEventListener("icon-click", handler);
  }, [openApp]);

  // Auto-launch initial app
  useEffect(() => {
    if (booted && initialApp && !hasOpenedInitial) {
      // Small timeout to let the desktop render first
      const t = setTimeout(() => {
        openApp(initialApp);
        setHasOpenedInitial(true);
      }, 100);
      return () => clearTimeout(t);
    }
  }, [booted, initialApp, hasOpenedInitial, openApp]);

  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
    );
  }, []);

  const maximizeWindow = useCallback(
    (id: string) => {
      setWindows((prev) =>
        prev.map((w) => {
          if (w.id !== id) return w;
          if (w.isMaximized) {
            // Restore
            return {
              ...w,
              isMaximized: false,
              ...(w.prevBounds || {}),
            };
          }
          // Maximize
          return {
            ...w,
            isMaximized: true,
            prevBounds: { x: w.x, y: w.y, width: w.width, height: w.height },
          };
        })
      );
    },
    []
  );

  const handleDragStart = useCallback(
    (id: string, e: React.MouseEvent) => {
      const win = windows.find((w) => w.id === id);
      if (!win) return;
      focusWindow(id);
      setDragState({
        windowId: id,
        offsetX: e.clientX - win.x,
        offsetY: e.clientY - win.y,
      });
    },
    [windows, focusWindow]
  );

  const handleResizeStart = useCallback(
    (id: string, direction: string, e: React.MouseEvent) => {
      const win = windows.find((w) => w.id === id);
      if (!win) return;
      focusWindow(id);
      setResizeState({
        windowId: id,
        direction,
        startX: e.clientX,
        startY: e.clientY,
        startBounds: {
          x: win.x,
          y: win.y,
          width: win.width,
          height: win.height,
        },
      });
    },
    [windows, focusWindow]
  );

  // ─── Dock data ─────────────────────────────────────────────

  const dockApps = React.useMemo(() => {
    const pinnedIds = APPS.filter((a) => a.pinnedToDock).map((a) => a.id);
    const runningIds = [...new Set(windows.map((w) => w.appId))];
    const allIds = [
      ...pinnedIds,
      ...runningIds.filter((id) => !pinnedIds.includes(id)),
    ];

    const activeWindowId = windows
      .filter((w) => !w.isMinimized)
      .sort((a, b) => b.zIndex - a.zIndex)[0]?.id;

    return allIds
      .map((id) => {
        const app = APPS.find((a) => a.id === id);
        if (!app) return null;
        const isRunning = windows.some((w) => w.appId === id);
        const isActive = windows.some(
          (w) => w.appId === id && w.id === activeWindowId
        );
        const Icon = app.iconComponent;
        return {
          id: app.id,
          name: app.name,
          icon: <Icon size={28} />,
          isRunning,
          isActive,
        };
      })
      .filter(Boolean) as {
        id: string;
        name: string;
        icon: React.ReactNode;
        isRunning: boolean;
        isActive: boolean;
      }[];
  }, [windows]);

  const handleDockAppClick = useCallback(
    (appId: string) => {
      const existingWindows = windows.filter((w) => w.appId === appId);
      if (existingWindows.length > 0) {
        const vis = existingWindows.find((w) => !w.isMinimized);
        if (vis) {
          // Check if active — if so, minimize
          const activeId = windows
            .filter((w) => !w.isMinimized)
            .sort((a, b) => b.zIndex - a.zIndex)[0]?.id;
          if (vis.id === activeId) {
            minimizeWindow(vis.id);
          } else {
            focusWindow(vis.id);
          }
        } else {
          // All minimized — restore the latest
          const latest = existingWindows.sort(
            (a, b) => b.zIndex - a.zIndex
          )[0];
          setWindows((prev) =>
            prev.map((w) =>
              w.id === latest.id ? { ...w, isMinimized: false } : w
            )
          );
          focusWindow(latest.id);
        }
      } else {
        openApp(appId);
      }
    },
    [windows, openApp, minimizeWindow, focusWindow]
  );

  // ─── Active window title ──────────────────────────────────

  const activeWindowTitle = React.useMemo(() => {
    const active = windows
      .filter((w) => !w.isMinimized)
      .sort((a, b) => b.zIndex - a.zIndex)[0];
    return active?.title;
  }, [windows]);

  // ─── Desktop right-click ──────────────────────────────────

  const handleDesktopContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const handleDesktopClick = () => {
    setContextMenu(null);
    setShowActivities(false);
    setShowAppDrawer(false);
  };

  // ─── Double-click handling for desktop icons ──────────────

  const handleIconDoubleClick = useCallback(
    (appId: string) => {
      openApp(appId);
    },
    [openApp]
  );

  // ─── Render ────────────────────────────────────────────────

  if (!booted) {
    return <BootScreen onBootComplete={() => setBooted(true)} />;
  }

  return (
    <WallpaperProvider value={{ wallpaperId, setWallpaperId }}>
      <div
        className="fixed inset-0 overflow-hidden select-none"
        style={{
          background: currentWallpaper.url
            ? `url(${currentWallpaper.url}) center/cover no-repeat`
            : "linear-gradient(135deg, #0a0a0a 0%, #0d1117 25%, #0a0f0d 50%, #0d0f0a 75%, #0a0a0a 100%)",
        }}
        onClick={handleDesktopClick}
      >
        {/* Wallpaper pattern overlay (only for default) */}
        {!currentWallpaper.url && (
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(0,255,136,0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(0,255,136,0.1) 0%, transparent 50%),
              linear-gradient(rgba(0,255,136,0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,136,0.02) 1px, transparent 1px)
            `,
              backgroundSize: "100% 100%, 100% 100%, 40px 40px, 40px 40px",
            }}
          />
        )}

        {/* Darken overlay for image wallpapers (improves readability) */}
        {currentWallpaper.url && (
          <div className="absolute inset-0 bg-black/30 pointer-events-none" />
        )}

        {/* Top Bar */}
        <TopBar
          onActivities={() => setShowAppDrawer(!showAppDrawer)}
          activeWindowTitle={activeWindowTitle}
        />

        {/* Dock */}
        <Dock
          apps={dockApps}
          onAppClick={handleDockAppClick}
          onShowApps={() => setShowAppDrawer(!showAppDrawer)}
        />

        {/* ── Games Dock (bottom center, little-warthog-77 cyber style) ── */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-[9998] flex gap-1">
          {[
            { id: "flappy-bird", label: "_Flappy", tag: "g1" },
            { id: "pong", label: "_Pong", tag: "g2" },
            { id: "minesweeper", label: "_Mines", tag: "g3" },
            { id: "snake", label: "_Snke", tag: "g4" },
            { id: "tetris", label: "_Tetris", tag: "g5" },
          ].map((game) => (
            <button
              key={game.id}
              className="gd-btn group"
              onClick={() => openApp(game.id)}
              title={game.label.replace("_", "")}
            >
              <span className="gd-text">{game.label}</span>
              <span className="gd-glitch" aria-hidden="true">{game.label}</span>
              <span className="gd-tag">{game.tag}</span>
            </button>
          ))}
          <style>{`
          .gd-btn {
            position: relative;
            height: 32px;
            width: 72px;
            color: white;
            text-transform: uppercase;
            font-size: 8px;
            font-weight: 900;
            letter-spacing: 2px;
            font-family: var(--font-mono, monospace);
            line-height: 32px;
            text-align: center;
            cursor: pointer;
            border: none;
            background: none;
            padding: 0;
          }
          .gd-text { position: relative; z-index: 2; }
          .gd-btn::after, .gd-btn::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            clip-path: polygon(11% 0, 95% 0, 100% 25%, 90% 90%, 95% 90%, 85% 90%, 85% 100%, 7% 100%, 0 80%);
            z-index: -1;
          }
          .gd-btn::before {
            background: #00ff88;
            transform: translateX(3px);
          }
          .gd-btn::after {
            background: #ff184c;
          }
          .gd-btn:hover::after {
            background: #006042;
          }
          .gd-glitch {
            position: absolute;
            top: -3px; left: -3px; right: -3px; bottom: -3px;
            background: #fded00;
            text-shadow: 2px 2px #fded00, -2px -2px hsl(60, 90%, 60%);
            clip-path: polygon(11% 0, 95% 0, 100% 25%, 90% 90%, 95% 90%, 85% 90%, 85% 100%, 7% 100%, 0 80%);
            display: none;
            font-size: 8px;
            font-weight: 900;
            letter-spacing: 2px;
            text-transform: uppercase;
            line-height: 32px;
            text-align: center;
          }
          .gd-glitch::before {
            content: '';
            position: absolute;
            inset: 3px;
            clip-path: polygon(11% 0, 95% 0, 100% 25%, 90% 90%, 95% 90%, 85% 90%, 85% 100%, 7% 100%, 0 80%);
            background: #ff184c;
            z-index: -1;
          }
          .gd-btn:hover .gd-glitch {
            display: block;
            animation: gdGlitch 2s infinite;
          }
          .gd-btn:hover .gd-glitch::before { background: #006042; }
          .gd-tag {
            background: #fded00;
            color: #323232;
            font-size: 5px;
            font-weight: 700;
            letter-spacing: 1px;
            position: absolute;
            width: 13px;
            height: 5px;
            top: 0;
            left: 78%;
            line-height: 5px;
          }
          @keyframes gdGlitch {
            0% { clip-path: polygon(0 2%, 100% 2%, 100% 95%, 95% 95%, 95% 90%, 85% 90%, 85% 95%, 8% 95%, 0 70%); }
            2%,8% { clip-path: polygon(0 78%, 100% 78%, 100% 100%, 95% 100%, 95% 90%, 85% 90%, 85% 100%, 8% 100%, 0 78%); transform: translateX(-3%); }
            6% { transform: translateX(3%); }
            10% { clip-path: polygon(0 44%, 100% 44%, 100% 54%, 95% 54%, 95% 54%, 85% 54%, 85% 54%, 8% 54%, 0 54%); }
            14%,21% { clip-path: polygon(0 0, 100% 0, 100% 0, 95% 0, 95% 0, 85% 0, 85% 0, 8% 0, 0 0); }
            35%,45% { clip-path: polygon(0 40%, 100% 40%, 100% 85%, 95% 85%, 95% 85%, 85% 85%, 85% 85%, 8% 85%, 0 70%); }
            55% { clip-path: polygon(0 63%, 100% 63%, 100% 80%, 95% 80%, 95% 80%, 85% 80%, 85% 80%, 8% 80%, 0 70%); }
            31%,61%,100% { clip-path: polygon(0 0, 100% 0, 100% 0, 95% 0, 95% 0, 85% 0, 85% 0, 8% 0, 0 0); }
          }
        `}</style>
        </div>

        {/* Desktop Icons (draggable, single-click opens) */}
        {DESKTOP_APPS.map((app) => {
          const Icon = app.iconComponent;
          const pos = iconPositions[app.id];
          if (!pos) return null;
          const isDragging = iconDrag?.appId === app.id && iconDrag.started;
          return (
            <div
              key={app.id}
              className="absolute pointer-events-auto"
              style={{
                left: pos.x,
                top: pos.y,
                width: ICON_W,
                height: ICON_H,
                zIndex: isDragging ? 9000 : 1,
                cursor: isDragging ? "grabbing" : "pointer",
                opacity: isDragging ? 0.7 : 1,
                transition: isDragging ? "none" : "opacity 0.15s",
              }}
              onMouseDown={(e) => {
                if (e.button !== 0) return;
                e.preventDefault();
                setIconDrag({
                  appId: app.id,
                  offsetX: e.clientX - pos.x,
                  offsetY: e.clientY - pos.y,
                  startX: e.clientX,
                  startY: e.clientY,
                  started: false,
                });
              }}
              onContextMenu={handleDesktopContextMenu}
            >
              <div className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-white/8 active:bg-white/12 transition-all group h-full justify-center">
                <div className="w-12 h-12 flex items-center justify-center transition-transform group-hover:scale-110 group-active:scale-95">
                  <Icon size={44} />
                </div>
                <span className="text-[11px] text-white/80 text-center leading-tight font-medium drop-shadow-lg group-hover:text-white transition-colors select-none">
                  {app.name}
                </span>
              </div>
            </div>
          );
        })}

        {/* Windows */}
        {windows.map((win) => {
          const AppComponent = APP_COMPONENTS[win.appId];
          const appConfig = APPS.find((a) => a.id === win.appId);
          if (!AppComponent || !appConfig) return null;

          const isActive =
            win.id ===
            windows
              .filter((w) => !w.isMinimized)
              .sort((a, b) => b.zIndex - a.zIndex)[0]?.id;

          const Icon = appConfig.iconComponent;

          return (
            <Window
              key={win.id}
              id={win.id}
              title={win.title}
              icon={<Icon size={16} />}
              x={win.x}
              y={win.y}
              width={win.width}
              height={win.height}
              isMinimized={win.isMinimized}
              isMaximized={win.isMaximized}
              isActive={isActive}
              zIndex={win.zIndex}
              onClose={closeWindow}
              onMinimize={minimizeWindow}
              onMaximize={maximizeWindow}
              onFocus={focusWindow}
              onDragStart={handleDragStart}
              onResizeStart={handleResizeStart}
            >
              <AppComponent
                windowId={win.id}
                closeWindow={() => closeWindow(win.id)}
              />
            </Window>
          );
        })}

        {/* App Drawer (bottom-left, slides up from dock) */}
        {showAppDrawer && (
          <div
            className="fixed inset-0 z-[9990] bg-black/20 animate-gnome-overlay-in"
            onClick={(e) => { e.stopPropagation(); setShowAppDrawer(false); }}
          >
            <div
              className="absolute left-[68px] bottom-0 w-[360px] max-h-[calc(100vh-40px)] bg-[#1a1a1a]/95 backdrop-blur-xl border-t border-r border-white/10 rounded-tr-2xl shadow-2xl flex flex-col overflow-hidden"
              style={{ animation: "slideUp 0.25s cubic-bezier(0.2, 0, 0, 1)" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Search bar */}
              <div className="px-4 pt-4 pb-2">
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="opacity-40 shrink-0">
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                  <span className="text-xs text-white/30 font-mono">All Applications</span>
                </div>
              </div>

              {/* App grid */}
              <div className="flex-1 overflow-y-auto px-3 pb-4">
                <div className="grid grid-cols-4 gap-1">
                  {APPS.map((app, idx) => {
                    const Icon = app.iconComponent;
                    return (
                      <button
                        key={app.id}
                        className="flex flex-col items-center gap-1.5 p-3 rounded-xl hover:bg-white/5 active:bg-white/10 transition-all group animate-gnome-app-item"
                        style={{ animationDelay: `${idx * 30}ms`, opacity: 0 }}
                        onClick={() => {
                          openApp(app.id);
                          setShowAppDrawer(false);
                        }}
                      >
                        <div className="transition-transform group-hover:scale-110 group-active:scale-95">
                          <Icon size={40} />
                        </div>
                        <span className="text-[10px] text-gray-400 group-hover:text-white text-center transition-colors leading-tight">
                          {app.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Context Menu */}
        {contextMenu && (
          <div
            className="fixed z-[9995] bg-[#2b2b2b] border border-white/10 rounded-xl shadow-2xl py-1 min-w-[180px] overflow-hidden animate-context-menu"
            style={{ top: contextMenu.y, left: contextMenu.x }}
            onClick={(e) => e.stopPropagation()}
          >
            {[
              {
                label: "Open Terminal",
                action: () => openApp("terminal"),
              },
              {
                label: "Open File Manager",
                action: () => openApp("file-manager"),
              },
              { label: "divider", action: () => { } },
              {
                label: "Change Wallpaper",
                action: () => openApp("wallpaper"),
              },
              {
                label: "Display Settings",
                action: () => openApp("settings"),
              },
              { label: "divider", action: () => { } },
              {
                label: "About HarshOS",
                action: () => openApp("settings"),
              },
            ].map((item, i) =>
              item.label === "divider" ? (
                <div key={i} className="h-px bg-white/5 my-1" />
              ) : (
                <button
                  key={i}
                  className="w-full text-left px-4 py-1.5 text-xs transition-colors text-gray-300 hover:bg-white/5 hover:text-white"
                  onClick={() => {
                    item.action();
                    setContextMenu(null);
                  }}
                >
                  {item.label}
                </button>
              )
            )}
          </div>
        )}

        {/* Prevent text selection during drag */}
        {(dragState || resizeState || (iconDrag && iconDrag.started)) && (
          <div
            className="fixed inset-0 z-[99999]"
            style={{
              cursor: resizeState
                ? `${resizeState.direction}-resize`
                : "grabbing",
            }}
          />
        )}
      </div>
    </WallpaperProvider>
  );
}
