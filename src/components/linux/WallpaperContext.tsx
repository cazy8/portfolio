"use client";

import React, { createContext, useContext } from "react";

// ═══════════════════════════════════════════════════════════════
// WALLPAPER OPTIONS
// ═══════════════════════════════════════════════════════════════

export interface WallpaperOption {
  id: string;
  name: string;
  url: string | null; // null = default gradient
  thumbnail: string | null;
}

export const WALLPAPERS: WallpaperOption[] = [
  {
    id: "default",
    name: "Default (Gradient)",
    url: null,
    thumbnail: null,
  },
  {
    id: "kali-ascii",
    name: "Kali ASCII",
    url: "/wallpapers/kali-ascii.png",
    thumbnail: "/wallpapers/kali-ascii.png",
  },
  {
    id: "falkland-penguins",
    name: "Falkland Penguins",
    url: "/wallpapers/penguins-falkland.jpg",
    thumbnail: "/wallpapers/penguins-falkland.jpg",
  },
  {
    id: "cyber-city",
    name: "Cyber City",
    url: "/wallpapers/cyber-city.jpg",
    thumbnail: "/wallpapers/cyber-city.jpg",
  },
  {
    id: "dark-landscape",
    name: "Dark Landscape",
    url: "/wallpapers/dark-landscape.jpg",
    thumbnail: "/wallpapers/dark-landscape.jpg",
  },
  {
    id: "night-scene",
    name: "Night Scene",
    url: "/wallpapers/night-scene.jpg",
    thumbnail: "/wallpapers/night-scene.jpg",
  },
  {
    id: "abstract-dark",
    name: "Abstract Dark",
    url: "/wallpapers/abstract-dark.jpg",
    thumbnail: "/wallpapers/abstract-dark.jpg",
  },
  {
    id: "pixel-rural",
    name: "Pixel Rural Space",
    url: "/wallpapers/pixel-rural.avif",
    thumbnail: "/wallpapers/pixel-rural.avif",
  },
  {
    id: "retro-pixel",
    name: "Retro Pixel Art",
    url: "/wallpapers/retro-pixel.jpg",
    thumbnail: "/wallpapers/retro-pixel.jpg",
  },
];

// ═══════════════════════════════════════════════════════════════
// CONTEXT
// ═══════════════════════════════════════════════════════════════

interface WallpaperContextType {
  wallpaperId: string;
  setWallpaperId: (id: string) => void;
}

const WallpaperContext = createContext<WallpaperContextType>({
  wallpaperId: "kali-ascii",
  setWallpaperId: () => { },
});

export const WallpaperProvider = WallpaperContext.Provider;

export function useWallpaper() {
  return useContext(WallpaperContext);
}
