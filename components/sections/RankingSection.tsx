"use client";

import { StreamSite } from "@/types";
import { Card } from "@/components/ui/Card";

export function RankingSection({
  title,
  sites,
  loading,
  favorites,
  onToggleFavorite,
  onVisit,
  onSeeAll,
}: {
  title: string;
  sites: StreamSite[];
  loading: boolean;
  favorites: string[];
  onToggleFavorite: (url: string) => void;
  onVisit: (url: string) => void;
  onSeeAll?: () => void;
}) {
  if (!loading && sites.length === 0) return null;

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between px-4">
        <h2 className="font-display text-lg font-semibold text-paper">
          {title}
          <span className="ml-2 font-mono text-xs font-normal text-static">
            {sites.length}
          </span>
        </h2>
        {onSeeAll && (
          <button
            onClick={onSeeAll}
            className="flex items-center gap-1 font-mono text-xs text-static"
          >
            Semua
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>

      <div className="mt-3 flex gap-3 overflow-x-auto px-4 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {loading &&
          Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-32 w-48 shrink-0 animate-pulse rounded-xl bg-panel"
            />
          ))}

        {!loading &&
          sites.slice(0, 10).map((site) => (
            <div key={site.url} className="w-48 shrink-0">
              <Card
                site={site}
                favorited={favorites.includes(site.url)}
                onToggleFavorite={onToggleFavorite}
                onVisit={onVisit}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
