"use client";

import { StreamSite } from "@/types";
import { categorize, gradientFor, initials } from "@/lib/utils";

export function HeroBanner({
  featured,
  promoted,
}: {
  featured: StreamSite | null;
  promoted: StreamSite[];
}) {
  if (!featured) {
    return <div className="mx-4 h-64 animate-pulse rounded-2xl bg-panel" />;
  }

  return (
    <div className="px-4">
      <a
        href={featured.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`relative flex h-64 flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br p-4 ${gradientFor(
          featured.name
        )}`}
      >
        <div className="flex items-start justify-between">
          <span className="rounded-full bg-signal/90 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide text-void">
            Sedang tayang
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-paper/50">
            {categorize(featured)}
          </span>
        </div>

        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            <h2 className="truncate font-display text-2xl font-semibold text-paper drop-shadow-sm">
              {featured.name}
            </h2>
            <p className="mt-1 font-mono text-xs text-paper/60">
              Tap untuk nonton langsung
            </p>
          </div>
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-signal text-void">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </div>
      </a>

      {promoted.length > 0 && (
        <div className="mt-3 grid grid-cols-2 gap-3">
          {promoted.slice(0, 2).map((site) => (
            <a
              key={site.url}
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 rounded-xl border border-line bg-panel p-2.5"
            >
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br font-display text-xs text-paper ${gradientFor(
                  site.name
                )}`}
              >
                {initials(site.name)}
              </div>
              <div className="min-w-0">
                <p className="truncate font-display text-[13px] text-paper">
                  {site.name}
                </p>
                <p className="truncate font-mono text-[10px] text-static">
                  {categorize(site)}
                </p>
              </div>
              <span className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-signal/15 text-signal">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
