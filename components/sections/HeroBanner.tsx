"use client";

import { StreamSite } from "@/types";
import { gradientFor } from "@/lib/utils";
import { SiteThumb } from "@/components/ui/SiteThumb";
import { ColorBars } from "@/components/ui/ColorBars";

export function HeroBanner({
  featured,
  promoted,
}: {
  featured: StreamSite | null;
  promoted: StreamSite[];
}) {
  if (!featured) {
    return (
      <div className="mx-4 h-60 animate-pulse rounded-lg border border-tapeLine bg-tape" />
    );
  }

  return (
    <div className="px-4">
      <a
        href={featured.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`group relative flex h-60 animate-tuneIn flex-col justify-between overflow-hidden rounded-lg border border-tapeLine bg-gradient-to-br p-4 shadow-[0_0_0px_rgba(140,255,194,0)] transition-shadow duration-500 hover:shadow-[0_0_24px_-4px_rgba(140,255,194,0.35)] ${gradientFor(
          featured.name
        )}`}
      >
        <div className="pointer-events-none absolute inset-0 bg-scan opacity-60" />
        <div className="pointer-events-none absolute inset-0 bg-noise" />
        <div className="pointer-events-none absolute inset-x-0 h-16 bg-gradient-to-b from-phosphor/10 via-phosphor/0 to-transparent animate-sweep" />

        <div className="relative z-10 flex items-start justify-between">
          <span className="flex items-center gap-1.5 rounded-sm bg-phosphor px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-ink">
            <span className="h-1.5 w-1.5 animate-flicker rounded-full bg-staticRed" />
            {featured.trusted ? "Trusted" : "On Air"}
          </span>
          <span className="rounded-sm bg-ink/50 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-paper/70">
            {featured.category}
          </span>
        </div>

        <div className="relative z-10 flex items-end justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <SiteThumb name={featured.name} domain={featured.domain} size="lg" />
            <div className="min-w-0">
              <h2 className="truncate font-display text-4xl leading-none tracking-wide text-paper drop-shadow-sm">
                {featured.name}
              </h2>
              <p className="mt-1.5 font-mono text-[11px] text-paper/60">
                Tap untuk nonton langsung
              </p>
            </div>
          </div>
          <span className="flex h-11 w-11 shrink-0 animate-breathe items-center justify-center rounded-full bg-phosphor text-ink transition-transform group-hover:scale-110">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10">
          <ColorBars height="h-1" />
        </div>
      </a>

      {promoted.length > 0 && (
        <div className="mt-3 grid grid-cols-2 gap-3">
          {promoted.slice(0, 2).map((site, i) => (
            <a
              key={site.url}
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ animationDelay: `${i * 60}ms` }}
              className="flex animate-riseIn items-center gap-2.5 rounded-md border border-tapeLine bg-tape p-2.5 transition-all active:scale-[0.98] hover:border-phosphor/50"
            >
              <SiteThumb name={site.name} domain={site.domain} size="sm" />
              <div className="min-w-0">
                <p className="truncate font-display text-base tracking-wide text-paper">
                  {site.name}
                </p>
                <p className="truncate font-mono text-[10px] text-fog">
                  {site.category}
                </p>
              </div>
              <span className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-phosphor/15 text-phosphor">
                <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
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
