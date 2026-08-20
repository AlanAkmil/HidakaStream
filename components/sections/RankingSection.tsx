"use client";

import { StreamSite } from "@/types";
import { categorize, gradientFor, initials } from "@/lib/utils";
import { cn } from "@/lib/utils";

const RANK_STYLE: Record<number, string> = {
  1: "bg-rank1 text-void",
  2: "bg-rank2 text-void",
  3: "bg-rank3 text-void",
};

export function RankingSection({
  title,
  sites,
  loading,
  onSeeAll,
}: {
  title: string;
  sites: StreamSite[];
  loading: boolean;
  onSeeAll?: () => void;
}) {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between px-4">
        <h2 className="font-display text-lg font-semibold text-paper">
          {title}
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
              className="h-44 w-28 shrink-0 animate-pulse rounded-xl bg-panel"
            />
          ))}

        {!loading && sites.length === 0 && (
          <p className="py-6 font-mono text-xs text-static">
            Belum ada channel di kategori ini.
          </p>
        )}

        {!loading &&
          sites.slice(0, 10).map((site, i) => (
            <a
              key={site.url}
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-28 shrink-0"
            >
              <div
                className={`relative flex h-40 w-28 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br ${gradientFor(
                  site.name
                )}`}
              >
                <span
                  className={cn(
                    "absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-br-lg font-display text-xs font-bold",
                    RANK_STYLE[i + 1] ?? "bg-void/70 text-paper"
                  )}
                >
                  {i + 1}
                </span>
                <span className="font-display text-2xl text-paper/90">
                  {initials(site.name)}
                </span>
              </div>
              <p className="mt-1.5 truncate font-mono text-[12px] text-paper">
                {site.name}
              </p>
              <p className="truncate font-mono text-[10px] text-static">
                {categorize(site)}
              </p>
            </a>
          ))}
      </div>
    </div>
  );
}
