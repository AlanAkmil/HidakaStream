"use client";

import { StreamSite } from "@/types";
import { Card } from "@/components/ui/Card";
import { useReveal } from "@/lib/hooks";
import { cn } from "@/lib/utils";

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
  const { ref, visible } = useReveal<HTMLDivElement>();

  if (!loading && sites.length === 0) return null;

  return (
    <div
      ref={ref}
      className={cn(
        "mt-8 transition-all duration-500",
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      )}
    >
      <div className="flex items-center justify-between px-4">
        <h2 className="flex items-center gap-2 font-display text-xl tracking-wide text-paper">
          <span className="h-3.5 w-1 rounded-full bg-phosphor" />
          {title}
          <span className="font-mono text-xs font-normal normal-case text-fog">
            {sites.length}
          </span>
        </h2>
        {onSeeAll && (
          <button
            onClick={onSeeAll}
            className="flex items-center gap-1 font-mono text-xs text-fog transition-colors hover:text-phosphor"
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

      <div className="no-scrollbar mt-3 flex gap-3 overflow-x-auto px-4 pb-1">
        {loading &&
          Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-36 w-48 shrink-0 animate-pulse rounded-lg border border-tapeLine bg-tape"
            />
          ))}

        {!loading &&
          visible &&
          sites.slice(0, 10).map((site, i) => (
            <div key={site.url} className="w-48 shrink-0">
              <Card
                site={site}
                favorited={favorites.includes(site.url)}
                onToggleFavorite={onToggleFavorite}
                onVisit={onVisit}
                style={{ animationDelay: `${Math.min(i, 6) * 60}ms` }}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
