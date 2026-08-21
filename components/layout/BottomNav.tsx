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
  star: (
    <path
      d="M12 3l2.9 6.3 6.9.8-5.1 4.9 1.3 6.9L12 18.4 5.9 21.9l1.3-6.9L2.1 10.1l6.9-.8L12 3z"
      stroke="currentColor"
      strokeWidth="1.8"
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
};

export function BottomNav({
  onHome,
  onCategories,
  onFavorites,
  onRecents,
  onSearchTap,
}: {
  onHome: () => void;
  onCategories: () => void;
  onFavorites: () => void;
  onRecents: () => void;
  onSearchTap: () => void;
}) {
  const [active, setActive] = useState("home");

  const TABS = [
    { key: "home", label: "Beranda", icon: "home" as const, action: onHome },
    { key: "kategori", label: "Kategori", icon: "grid" as const, action: onCategories },
    { key: "favorit", label: "Favorit", icon: "star" as const, action: onFavorites },
    { key: "riwayat", label: "Riwayat", icon: "clock" as const, action: onRecents },
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-tapeLine bg-ink/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-around px-2 py-2">
        {TABS.slice(0, 2).map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setActive(tab.key);
              tab.action();
            }}
            className={cn(
              "flex flex-col items-center gap-1 px-3 py-1 font-mono text-[10px] transition-colors active:scale-95",
              active === tab.key ? "text-phosphor" : "text-fog"
            )}
          >
            <svg width="19" height="19" viewBox="0 0 24 24">
              {ICONS[tab.icon]}
            </svg>
            {tab.label}
          </button>
        ))}

        <button
          onClick={onSearchTap}
          aria-label="Cari cepat"
          className="-mt-6 flex h-12 w-12 items-center justify-center rounded-full border-4 border-ink bg-phosphor text-ink shadow-lg shadow-phosphor/20 transition-transform active:scale-90"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2.5" />
            <path d="M20 20L16.5 16.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </button>

        {TABS.slice(2).map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setActive(tab.key);
              tab.action();
            }}
            className={cn(
              "flex flex-col items-center gap-1 px-3 py-1 font-mono text-[10px] transition-colors active:scale-95",
              active === tab.key ? "text-phosphor" : "text-fog"
            )}
          >
            <svg width="19" height="19" viewBox="0 0 24 24">
              {ICONS[tab.icon]}
            </svg>
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
