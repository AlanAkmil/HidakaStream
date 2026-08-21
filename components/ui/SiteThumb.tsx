"use client";

import { useState } from "react";
import { faviconUrl, gradientFor, initials } from "@/lib/utils";

export function SiteThumb({
  name,
  domain,
  size = "md",
}: {
  name: string;
  domain: string;
  size?: "sm" | "md" | "lg";
}) {
  const [failed, setFailed] = useState(false);

  const dimensions = {
    sm: "h-9 w-9 rounded-md",
    md: "h-11 w-11 rounded-lg",
    lg: "h-14 w-14 rounded-xl",
  }[size];

  if (failed) {
    return (
      <div
        className={`flex shrink-0 items-center justify-center bg-gradient-to-br font-display text-xs text-paper ${dimensions} ${gradientFor(
          name
        )}`}
      >
        {initials(name)}
      </div>
    );
  }

  return (
    <div
      className={`flex shrink-0 items-center justify-center overflow-hidden bg-void/40 p-1.5 ${dimensions}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={faviconUrl(domain, 128)}
        alt=""
        className="h-full w-full object-contain"
        loading="lazy"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
