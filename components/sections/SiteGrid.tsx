import { StreamSite } from "@/types";
import { Card } from "@/components/ui/Card";
import { ColorBars } from "@/components/ui/ColorBars";

export function SiteGrid({
  sites,
  loading,
  error,
  favorites,
  onToggleFavorite,
  onVisit,
}: {
  sites: StreamSite[];
  loading: boolean;
  error: string | null;
  favorites: string[];
  onToggleFavorite: (url: string) => void;
  onVisit: (url: string) => void;
}) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-36 animate-shimmer rounded-lg border border-tapeLine bg-[linear-gradient(110deg,#1A1620_25%,#241F2D_37%,#1A1620_63%)] bg-[length:200%_100%]"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="overflow-hidden rounded-lg border border-staticRed/40 bg-tape">
        <ColorBars animated height="h-1" />
        <div className="p-5 font-mono text-xs text-staticRed">
          SINYAL HILANG — {error}
        </div>
      </div>
    );
  }

  if (sites.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-tapeLine p-8 text-center">
        <p className="font-display text-2xl tracking-wide text-fog">
          NO SIGNAL
        </p>
        <p className="mt-1 font-mono text-xs text-fog">
          Nggak ada channel yang cocok. Coba kata kunci lain.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {sites.map((site, i) => (
        <Card
          key={site.url}
          site={site}
          favorited={favorites.includes(site.url)}
          onToggleFavorite={onToggleFavorite}
          onVisit={onVisit}
          style={{ animationDelay: `${Math.min(i, 10) * 40}ms` }}
        />
      ))}
    </div>
  );
}
