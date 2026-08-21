"use client";

import { useEffect, useMemo, useRef, useState, RefObject } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { TabsScroll } from "@/components/layout/TabsScroll";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { HeroBanner } from "@/components/sections/HeroBanner";
import { RankingSection } from "@/components/sections/RankingSection";
import { SiteGrid } from "@/components/sections/SiteGrid";
import { ColorBars } from "@/components/ui/ColorBars";
import { ScrapeResponse, SiteCategory, StreamSite } from "@/types";
import {
  getFavorites,
  getRecents,
  pushRecent,
  clearRecents,
  toggleFavorite,
} from "@/lib/utils";

const MAIN_TABS: (SiteCategory | "All")[] = [
  "All",
  "Movies & Shows",
  "Anime",
  "Manga",
  "Live TV & Sports",
  "Paid",
  "Apps",
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [activeTab, setActiveTab] = useState<SiteCategory | "All">("All");
  const [sites, setSites] = useState<StreamSite[]>([]);
  const [totalIndexed, setTotalIndexed] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recents, setRecents] = useState<string[]>([]);

  const topRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const favoritesRef = useRef<HTMLDivElement>(null);
  const recentsRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFavorites(getFavorites());
    setRecents(getRecents());
  }, []);

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
        setTotalCategories(data.categories);
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
    return sites.filter((s) => s.category === activeTab);
  }, [sites, activeTab]);

  const movieSites = useMemo(
    () => sites.filter((s) => s.category === "Movies & Shows"),
    [sites]
  );
  const animeSites = useMemo(
    () => sites.filter((s) => s.category === "Anime"),
    [sites]
  );
  const liveTvSites = useMemo(
    () => sites.filter((s) => s.category === "Live TV & Sports"),
    [sites]
  );

  const recentSites = useMemo(
    () =>
      recents
        .map((url) => sites.find((s) => s.url === url))
        .filter((s): s is StreamSite => Boolean(s)),
    [recents, sites]
  );

  const favoriteSites = useMemo(
    () => sites.filter((s) => favorites.includes(s.url)),
    [sites, favorites]
  );

  const featured = sites.find((s) => s.trusted) ?? sites[0] ?? null;
  const promoted = sites.filter((s) => s.url !== featured?.url).slice(0, 2);

  function handleToggleFavorite(url: string) {
    setFavorites(toggleFavorite(url));
  }

  function handleVisit(url: string) {
    setRecents(pushRecent(url));
  }

  function scrollTo(ref: RefObject<HTMLElement>) {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function jumpToResults(tab: SiteCategory | "All") {
    setActiveTab(tab);
    scrollTo(resultsRef);
  }

  return (
    <main className="min-h-screen bg-ink pb-24">
      <ColorBars height="h-1" />

      <div ref={topRef} className="flex items-center gap-2 px-4 pb-3 pt-4">
        <span className="h-2 w-2 animate-flicker rounded-full bg-phosphor" />
        <span className="font-display text-xl tracking-wide text-paper">
          HidakaStream
        </span>
      </div>

      <TopBar
        query={query}
        onQueryChange={setQuery}
        onSearch={() => setSubmittedQuery(query)}
        onRefresh={() => load({ refresh: true, q: submittedQuery })}
        refreshing={refreshing}
      />

      {!loading && !error && totalIndexed > 0 && (
        <div className="mt-3 grid grid-cols-2 gap-2 px-4">
          <div className="rounded-md border border-tapeLine bg-tape py-2.5 text-center">
            <p className="font-display text-xl text-paper">{totalIndexed}</p>
            <p className="font-mono text-[9px] uppercase tracking-widest text-fog">
              Sites
            </p>
          </div>
          <div className="rounded-md border border-tapeLine bg-tape py-2.5 text-center">
            <p className="font-display text-xl text-paper">{totalCategories}</p>
            <p className="font-mono text-[9px] uppercase tracking-widest text-fog">
              Categories
            </p>
          </div>
        </div>
      )}

      <div ref={tabsRef} className="mt-4">
        <TabsScroll items={MAIN_TABS} active={activeTab} onChange={setActiveTab} />
      </div>

      <div className="mt-4">
        <HeroBanner featured={featured} promoted={promoted} />
      </div>

      {error && (
        <div className="mx-4 mt-6 overflow-hidden rounded-lg border border-staticRed/40 bg-tape">
          <ColorBars animated height="h-1" />
          <div className="p-4 font-mono text-xs text-staticRed">
            SINYAL HILANG — {error}
          </div>
        </div>
      )}

      <div ref={favoritesRef}>
        {favoriteSites.length > 0 && (
          <div className="mt-8 px-4">
            <h2 className="flex items-center gap-2 font-display text-xl tracking-wide text-paper">
              <span className="h-3.5 w-1 rounded-full bg-tapeAmber" />
              Favorit
              <span className="font-mono text-xs font-normal normal-case text-fog">
                {favoriteSites.length}
              </span>
            </h2>
            <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1">
              {favoriteSites.map((site) => (
                <a
                  key={site.url}
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleVisit(site.url)}
                  className="shrink-0 rounded-md border border-tapeAmber/40 bg-tape px-3 py-1.5 font-mono text-xs text-paper transition-colors hover:border-tapeAmber"
                >
                  {site.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      <div ref={recentsRef}>
        {recentSites.length > 0 && (
          <div className="mt-8 px-4">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 font-display text-xl tracking-wide text-paper">
                <span className="h-3.5 w-1 rounded-full bg-signalBlue" />
                Riwayat
              </h2>
              <button
                onClick={() => {
                  clearRecents();
                  setRecents([]);
                }}
                className="font-mono text-xs text-fog transition-colors hover:text-staticRed"
              >
                Hapus
              </button>
            </div>
            <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1">
              {recentSites.map((site) => (
                <a
                  key={site.url}
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleVisit(site.url)}
                  className="shrink-0 rounded-md border border-tapeLine bg-tape px-3 py-1.5 font-mono text-xs text-paper transition-colors hover:border-signalBlue/60"
                >
                  {site.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      <RankingSection
        title="Movies & Shows"
        sites={movieSites}
        loading={loading}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
        onVisit={handleVisit}
        onSeeAll={() => jumpToResults("Movies & Shows")}
      />

      <RankingSection
        title="Anime"
        sites={animeSites}
        loading={loading}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
        onVisit={handleVisit}
        onSeeAll={() => jumpToResults("Anime")}
      />

      <RankingSection
        title="Live TV & Sports"
        sites={liveTvSites}
        loading={loading}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
        onVisit={handleVisit}
        onSeeAll={() => jumpToResults("Live TV & Sports")}
      />

      <div ref={resultsRef} className="mt-8 px-4">
        <h2 className="mb-3 flex items-center gap-2 font-display text-xl tracking-wide text-paper">
          <span className="h-3.5 w-1 rounded-full bg-paper/40" />
          {activeTab === "All" ? "Semua Channel" : activeTab}
          <span className="font-mono text-xs font-normal normal-case text-fog">
            ({filteredSites.length})
          </span>
        </h2>
        <SiteGrid
          sites={filteredSites}
          loading={loading}
          error={null}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onVisit={handleVisit}
        />
      </div>

      <div className="mt-6">
        <Footer />
      </div>

      <BottomNav
        onHome={() => scrollTo(topRef)}
        onCategories={() => scrollTo(tabsRef)}
        onFavorites={() => scrollTo(favoritesRef)}
        onRecents={() => scrollTo(recentsRef)}
        onSearchTap={() => {
          scrollTo(topRef);
          setTimeout(() => {
            document
              .querySelector<HTMLInputElement>("input[placeholder^='Cari']")
              ?.focus();
          }, 400);
        }}
      />
    </main>
  );
}
