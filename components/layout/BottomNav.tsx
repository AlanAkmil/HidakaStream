"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const ICONS = {
  home: (
    <path
      d="M4 11L12 4l8 7M6 10v9h12v-9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  grid: (
    <path
      d="M4 4h7v7H4V4zm9 0h7v7h-7V4zM4 13h7v7H4v-7zm9 0h7v7h-7v-7z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M12 8v4l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M5 20c1.5-4 5-5 7-5s5.5 1 7 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    </>
  ),
};

const TABS = [
  { key: "home", label: "Beranda", icon: "home" as const },
  { key: "kategori", label: "Kategori", icon: "grid" as const },
  { key: "riwayat", label: "Riwayat", icon: "clock" as const },
  { key: "aku", label: "Aku", icon: "user" as const },
];

export function BottomNav({ onSearchTap }: { onSearchTap: () => void }) {
  const [active, setActive] = useState("home");

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-void/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-around px-2 py-2">
        {TABS.slice(0, 2).map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className={cn(
              "flex flex-col items-center gap-1 px-3 py-1 font-mono text-[10px]",
              active === tab.key ? "text-signal" : "text-static"
            )}
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              {ICONS[tab.icon]}
            </svg>
            {tab.label}
          </button>
        ))}

        <button
          onClick={onSearchTap}
          aria-label="Cari cepat"
          className="-mt-6 flex h-12 w-12 items-center justify-center rounded-full border-4 border-void bg-signal text-void shadow-lg active:scale-95"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2.5" />
            <path d="M20 20L16.5 16.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </button>

        {TABS.slice(2).map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className={cn(
              "flex flex-col items-center gap-1 px-3 py-1 font-mono text-[10px]",
              active === tab.key ? "text-signal" : "text-static"
            )}
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              {ICONS[tab.icon]}
            </svg>
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
