import { StreamSite } from "@/types";
import { Card } from "@/components/ui/Card";

export function SiteGrid({
  sites,
  loading,
  error,
}: {
  sites: StreamSite[];
  loading: boolean;
  error: string | null;
}) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-36 animate-pulse border border-line bg-panel"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="border border-alert/40 bg-panel p-6 font-mono text-sm text-alert">
        SIGNAL LOST — {error}
      </div>
    );
  }

  if (sites.length === 0) {
    return (
      <div className="border border-line bg-panel p-6 font-mono text-sm text-static">
        Nggak ada channel yang cocok. Coba kata kunci lain.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {sites.map((site, i) => (
        <Card key={site.url} site={site} index={i} />
      ))}
    </div>
  );
}
