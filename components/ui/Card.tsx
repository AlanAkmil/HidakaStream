"use client";

import { StreamSite } from "@/types";
import { categorize, getDomain, initials } from "@/lib/utils";
import { Badge } from "./Badge";

export function Card({ site, index }: { site: StreamSite; index: number }) {
  const category = categorize(site);

  return (
    <a
      href={site.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col justify-between border border-line bg-panel p-4 transition-colors hover:border-signal"
    >
      <div className="flex items-start justify-between">
        <span className="font-mono text-[10px] text-static">
          CH.{String(index + 1).padStart(2, "0")}
        </span>
        <Badge variant={category === "General" ? "default" : "signal"}>
          {category}
        </Badge>
      </div>

      <div className="my-5 flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-line font-display text-sm text-paper group-hover:border-signal group-hover:text-signal">
          {initials(site.name)}
        </div>
        <div className="min-w-0">
          <h3 className="truncate font-display text-base text-paper">
            {site.name}
          </h3>
          <p className="truncate font-mono text-xs text-static">
            {getDomain(site.url)}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-line pt-3 font-mono text-[10px] uppercase tracking-widest text-static">
        <span>Tune in</span>
        <span className="text-signal opacity-0 transition-opacity group-hover:opacity-100">
          →
        </span>
      </div>
    </a>
  );
}
