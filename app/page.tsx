"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { TabsScroll } from "@/components/layout/TabsScroll";
import { BottomNav } from "@/components/layout/BottomNav";
import { HeroBanner } from "@/components/sections/HeroBanner";
import { RankingSection } from "@/components/sections/RankingSection";
import { SiteGrid } from "@/components/sections/SiteGrid";
import { Footer } from "@/components/layout/Footer";
import { ScrapeResponse, SiteCategory, StreamSite } from "@/types";
import { categorize } from "@/lib/utils";

const MAIN_TABS: (SiteCategory | "All")[] = [
  "All",
  "Sports",
  "Live TV",
  "Movies",
  "News",
  "General",
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [activeTab, setActiveTab] = useState<SiteCategory | "All">("All");
  const [sites, setSites] = useState<StreamSite[]>([]);
  const [totalIndexed, setTotalIndexed] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resultsRef = useRef<HTMLDivElement>(null);

  async function load(opts: { refresh?: boolean; q?: string } = {}) {
    const q = opts.q ?? submittedQuery;
    opts.refresh ? setRefreshing(true) : setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `/api/scrape?q=${encodeURIComponent(q)}${opts.refresh ? "&refresh=1" : ""}`
      );
      const data: ScrapeResponse = await res.json();

      if (!data.success) {
        setError(data.error ?? "Gagal mengambil data.");
        setSites([]);
        setTotalIndexed(0);
      } else {
        setSites(data.results);
        setTotalIndexed(data.total_sites_indexed);
      }
    } catch (e: any) {
      setError(e?.message ?? "Gagal terhubung ke server.");
      setSites([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    load({ q: submittedQuery });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submittedQuery]);

  const filteredSites = useMemo(() => {
    if (activeTab === "All") return sites;
    return sites.filter((s) => categorize(s) === activeTab);
  }, [sites, activeTab]);

  const sportsSites = useMemo(
    () => sites.filter((s) => categorize(s) === "Sports"),
    [sites]
  );
  const liveTvSites = useMemo(
    () => sites.filter((s) => categorize(s) === "Live TV"),
    [sites]
  );

  const featured = sites[0] ?? null;
  const promoted = sites.slice(1, 3);

  function jumpToResults(tab: SiteCategory | "All") {
    setActiveTab(tab);
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main className="min-h-screen bg-void pb-24">
      <div className="flex items-center gap-2 px-4 pt-4">
        <span className="h-2 w-2 animate-flicker rounded-full bg-signal" />
        <span className="font-display text-base font-semibold text-paper">
          HidakaStream
        </span>
      </div>

      <div className="mt-3">
        <TopBar
          query={query}
          onQueryChange={setQuery}
          onSearch={() => setSubmittedQuery(query)}
          onRefresh={() => load({ refresh: true, q: submittedQuery })}
          refreshing={refreshing}
        />
      </div>

      <div className="mt-4">
        <TabsScroll
          items={MAIN_TABS}
          active={activeTab}
          onChange={setActiveTab}
        />
      </div>

      <div className="mt-4">
        <HeroBanner featured={featured} promoted={promoted} />
      </div>

      {error && (
        <div className="mx-4 mt-6 rounded-xl border border-alert/40 bg-panel p-4 font-mono text-xs text-alert">
          SIGNAL LOST — {error}
        </div>
      )}

      <RankingSection
        title="Peringkat Sports"
        sites={sportsSites}
        loading={loading}
        onSeeAll={() => jumpToResults("Sports")}
      />

      <RankingSection
        title="Peringkat Live TV"
        sites={liveTvSites}
        loading={loading}
        onSeeAll={() => jumpToResults("Live TV")}
      />

      <div ref={resultsRef} className="mt-8 px-4">
        <h2 className="mb-3 font-display text-lg font-semibold text-paper">
          {activeTab === "All" ? "Semua Channel" : activeTab}
          <span className="ml-2 font-mono text-xs font-normal text-static">
            ({filteredSites.length})
          </span>
        </h2>
        <SiteGrid sites={filteredSites} loading={loading} error={null} />
      </div>

      <p className="mt-8 px-4 font-mono text-[10px] text-static">
        {totalIndexed > 0 && `${totalIndexed} channel terindeks dari tbcpl.lol`}
      </p>

      <div className="mt-6">
        <Footer />
      </div>

      <BottomNav
        onSearchTap={() =>
          document
            .querySelector<HTMLInputElement>("input[placeholder^='Cari']")
            ?.focus()
        }
      />
    </main>
  );
}
