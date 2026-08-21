"use client";

import { useState, MouseEvent } from "react";
import { StreamSite } from "@/types";
import { accentFor, copyToClipboard, gradientFor, initials } from "@/lib/utils";
import { Badge } from "./Badge";

export function Card({
  site,
  favorited,
  onToggleFavorite,
  onVisit,
}: {
  site: StreamSite;
  favorited: boolean;
  onToggleFavorite: (url: string) => void;
  onVisit: (url: string) => void;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const ok = await copyToClipboard(site.url);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  }

  return (
    <a
      href={site.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => onVisit(site.url)}
      className="group relative flex h-36 flex-col justify-between rounded-xl border border-line bg-panel p-3.5 transition-colors hover:border-signal/60"
    >
      <div className="flex items-start justify-between">
        <div className="flex gap-1.5">
          {site.trusted && <Badge variant="signal">Trusted</Badge>}
          {site.isNew && <Badge variant="alert">New</Badge>}
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleFavorite(site.url);
          }}
          aria-label="Simpan favorit"
          className="shrink-0"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={favorited ? "#C8FF3D" : "none"}
            stroke={favorited ? "#C8FF3D" : "#5A6355"}
            strokeWidth="1.8"
          >
            <path d="M12 3l2.9 6.3 6.9.8-5.1 4.9 1.3 6.9L12 18.4 5.9 21.9l1.3-6.9L2.1 10.1l6.9-.8L12 3z" />
          </svg>
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br font-display text-xs text-paper ${gradientFor(
            site.name
          )}`}
        >
          {initials(site.name)}
        </div>
        <h3
          className="min-w-0 truncate font-display text-lg font-bold leading-tight"
          style={{ color: accentFor(site.name) }}
        >
          {site.name}
        </h3>
      </div>

      <div className="flex items-center justify-between">
        <span className="flex min-w-0 items-center gap-1 truncate font-mono text-[11px] text-static">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="shrink-0">
            <path
              d="M14 5h5v5M19 5l-8 8M9 5H5v14h14v-4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="truncate">{site.domain}</span>
        </span>
        <button
          onClick={handleCopy}
          aria-label="Salin tautan"
          className="shrink-0 text-static hover:text-signal"
        >
          {copied ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 13l4 4L19 7"
                stroke="#C8FF3D"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <rect x="9" y="9" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.8" />
              <path d="M5 15V5a2 2 0 012-2h10" stroke="currentColor" strokeWidth="1.8" />
            </svg>
          )}
        </button>
      </div>
    </a>
  );
}
