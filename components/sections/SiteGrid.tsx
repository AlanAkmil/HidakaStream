import { StreamSite } from "@/types";
import { Card } from "@/components/ui/Card";

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
          <div key={i} className="h-32 animate-pulse rounded-xl bg-panel" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-alert/40 bg-panel p-6 font-mono text-sm text-alert">
        SIGNAL LOST — {error}
      </div>
    );
  }

  if (sites.length === 0) {
    return (
      <div className="rounded-xl border border-line bg-panel p-6 font-mono text-sm text-static">
        Nggak ada channel yang cocok. Coba kata kunci lain.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {sites.map((site) => (
        <Card
          key={site.url}
          site={site}
          favorited={favorites.includes(site.url)}
          onToggleFavorite={onToggleFavorite}
          onVisit={onVisit}
        />
      ))}
    </div>
  );
}
