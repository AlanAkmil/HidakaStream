"use client";

import { useState, MouseEvent, CSSProperties } from "react";
import { StreamSite } from "@/types";
import { accentFor, copyToClipboard } from "@/lib/utils";
import { Badge } from "./Badge";
import { SiteThumb } from "./SiteThumb";

export function Card({
  site,
  favorited,
  onToggleFavorite,
  onVisit,
  style,
}: {
  site: StreamSite;
  favorited: boolean;
  onToggleFavorite: (url: string) => void;
  onVisit: (url: string) => void;
  style?: CSSProperties;
}) {
  const [copied, setCopied] = useState(false);
  const accent = accentFor(site.name);

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
      style={style}
      className="group relative flex h-36 animate-riseIn overflow-hidden rounded-lg border border-tapeLine bg-tape transition-all duration-200 active:scale-[0.98] hover:-translate-y-0.5 hover:border-phosphor/50 hover:shadow-[0_8px_24px_-8px_rgba(140,255,194,0.15)]"
    >
      {/* spine kaset */}
      <span
        className="w-1.5 shrink-0 transition-all duration-200 group-hover:w-2"
        style={{ backgroundColor: accent }}
      />

      <div className="flex min-w-0 flex-1 flex-col justify-between p-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-wrap gap-1">
            {site.trusted && <Badge variant="phosphor">Trusted</Badge>}
            {site.isNew && <Badge variant="alert">New</Badge>}
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleFavorite(site.url);
            }}
            aria-label="Simpan favorit"
            className="shrink-0 transition-transform active:scale-90"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill={favorited ? "#FFC15C" : "none"}
              stroke={favorited ? "#FFC15C" : "#8A8397"}
              strokeWidth="1.8"
            >
              <path d="M12 3l2.9 6.3 6.9.8-5.1 4.9 1.3 6.9L12 18.4 5.9 21.9l1.3-6.9L2.1 10.1l6.9-.8L12 3z" />
            </svg>
          </button>
        </div>

        <div className="flex items-center gap-2.5">
          <SiteThumb name={site.name} domain={site.domain} size="md" />
          <h3
            className="min-w-0 truncate font-display text-2xl leading-none tracking-wide"
            style={{ color: accent }}
          >
            {site.name}
          </h3>
        </div>

        <div className="flex items-center justify-between gap-2">
          <span className="flex min-w-0 items-center gap-1 truncate font-mono text-[10px] text-fog">
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" className="shrink-0">
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
            className="shrink-0 text-fog transition-colors hover:text-phosphor"
          >
            {copied ? (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 13l4 4L19 7"
                  stroke="#8CFFC2"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <rect x="9" y="9" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.8" />
                <path d="M5 15V5a2 2 0 012-2h10" stroke="currentColor" strokeWidth="1.8" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </a>
  );
}
