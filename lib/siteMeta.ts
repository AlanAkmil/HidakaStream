import { SiteCategory } from "@/types";

export interface SiteMeta {
  category: SiteCategory;
  trusted: boolean;
  isNew?: boolean;
}

/**
 * Peta metadata situs, diambil dari struktur kategori asli tbcpl.lol
 * (halaman itu sendiri, bukan cuma dugaan keyword). CLI scraper cuma
 * narik {name, url}, jadi info kategori/trusted ini kita "tempel" manual
 * berdasarkan domain. Kalau tbcpl nambah situs baru yang belum ada di
 * peta ini, dia bakal jatuh ke kategori "Other" (lihat fallback di scraper.ts).
 *
 * Update terakhir: 20 Agu 2026 — 107 situs, 6 kategori.
 */
export const SITE_META: Record<string, SiteMeta> = {
  // Movies & Shows
  "1shows.org": { category: "Movies & Shows", trusted: true },
  "1flex.org": { category: "Movies & Shows", trusted: true },
  "1tube.org": { category: "Movies & Shows", trusted: true },
  "shuttletv.su": { category: "Movies & Shows", trusted: false },
  "flickystream.dad": { category: "Movies & Shows", trusted: true },
  "meowtv.ru": { category: "Movies & Shows", trusted: false },
  "rivestream.ru": { category: "Movies & Shows", trusted: false },
  "cinema.army": { category: "Movies & Shows", trusted: false },
  "watch.spencerdevs.xyz": { category: "Movies & Shows", trusted: false },
  "primeflix.ru": { category: "Movies & Shows", trusted: false },
  "nepu.cc": { category: "Movies & Shows", trusted: false },
  "flixgaze.com": { category: "Movies & Shows", trusted: false },
  "netplayz.top": { category: "Movies & Shows", trusted: false },
  "hollymoviehd.cc": { category: "Movies & Shows", trusted: false },
  "cinejoy.to": { category: "Movies & Shows", trusted: false },
  "movy.bz": { category: "Movies & Shows", trusted: false },
  "cinemacity.cc": { category: "Movies & Shows", trusted: false },
  "onlyflix.to": { category: "Movies & Shows", trusted: false },
  "popcornmovies.ac": { category: "Movies & Shows", trusted: false },
  "hdtodayz.net": { category: "Movies & Shows", trusted: false },
  "willow.arlen.icu": { category: "Movies & Shows", trusted: false },
  "fmovies-hd.to": { category: "Movies & Shows", trusted: false },
  "flixway.ru": { category: "Movies & Shows", trusted: false },
  "streamingunity.vip": { category: "Movies & Shows", trusted: false },

  // Anime
  "reanime.to": { category: "Anime", trusted: true },
  "animepahe.pw": { category: "Anime", trusted: true },
  "anikototv.to": { category: "Anime", trusted: true },
  "enma.lol": { category: "Anime", trusted: true },
  "miruro.to": { category: "Anime", trusted: true },
  "anime.nexus": { category: "Anime", trusted: false },
  "anidb.app": { category: "Anime", trusted: false },
  "anikage.cc": { category: "Anime", trusted: false },
  "anidap.lol": { category: "Anime", trusted: false },
  "kitetsu.net": { category: "Anime", trusted: false },
  "senpaiflix.fun": { category: "Anime", trusted: false },
  "animex.one": { category: "Anime", trusted: false },
  "animetvplus.xyz": { category: "Anime", trusted: false },
  "anistream.one": { category: "Anime", trusted: false },
  "kaa.lt": { category: "Anime", trusted: false },
  "justanime.to": { category: "Anime", trusted: false },
  "aniwaves.ru": { category: "Anime", trusted: false },
  "animeheaven.me": { category: "Anime", trusted: false },
  "anitaku.io": { category: "Anime", trusted: false },
  "lunarx.to": { category: "Anime", trusted: false },

  // Manga
  "mangaball.net": { category: "Manga", trusted: true },
  "atsu.moe": { category: "Manga", trusted: true },
  "onisaga.com": { category: "Manga", trusted: true },
  "kagane.to": { category: "Manga", trusted: false },
  "aquareader.org": { category: "Manga", trusted: false },
  "comick.dev": { category: "Manga", trusted: false },
  "comix.to": { category: "Manga", trusted: false },
  "mangadot.net": { category: "Manga", trusted: false },
  "mangabuddy1.co.uk": { category: "Manga", trusted: false },
  "qtoon.org": { category: "Manga", trusted: false },
  "specterscans.com": { category: "Manga", trusted: false },
  "mangago.me": { category: "Manga", trusted: false },
  "mangafire.to": { category: "Manga", trusted: false },
  "allmanga.to": { category: "Manga", trusted: false },
  "mangakakalot.gg": { category: "Manga", trusted: false },
  "asurascans.com": { category: "Manga", trusted: false },
  "readcomicsonline.ru": { category: "Manga", trusted: false },
  "mangahub.io": { category: "Manga", trusted: false },
  "weebcentral.com": { category: "Manga", trusted: false },
  "mangakatana.com": { category: "Manga", trusted: false },
  "likemanga.ink": { category: "Manga", trusted: false },
  "mangaxo.com": { category: "Manga", trusted: false },
  "kingofshojo.com": { category: "Manga", trusted: false, isNew: true },

  // Live TV & Sports
  "dlstreams.st": { category: "Live TV & Sports", trusted: true },
  "ondemand.st": { category: "Live TV & Sports", trusted: true },
  "streamed.pk": { category: "Live TV & Sports", trusted: true },
  "en97.sportplus.watch": { category: "Live TV & Sports", trusted: false },
  "venuevault.live": { category: "Live TV & Sports", trusted: false },
  "thetvapptv.com": { category: "Live TV & Sports", trusted: false },
  "ntv.cx": { category: "Live TV & Sports", trusted: false },
  "publiciptv.com": { category: "Live TV & Sports", trusted: false },
  "streamking.cx": { category: "Live TV & Sports", trusted: false },
  "thestreameast.top": { category: "Live TV & Sports", trusted: false },
  "v2.sportsurge.net": { category: "Live TV & Sports", trusted: false },
  "famelack.com": { category: "Live TV & Sports", trusted: false },
  "sportsbite.org": { category: "Live TV & Sports", trusted: false },
  "stmify.com": { category: "Live TV & Sports", trusted: false },
  "ppv.st": { category: "Live TV & Sports", trusted: false },
  "fifstream1.gt.tc": { category: "Live TV & Sports", trusted: false, isNew: true },

  // Paid
  "disneyplus.com": { category: "Paid", trusted: false },
  "shudder.com": { category: "Paid", trusted: false },
  "auth.hulu.com": { category: "Paid", trusted: false },
  "netflix.com": { category: "Paid", trusted: false },
  "viki.com": { category: "Paid", trusted: false },
  "hbomax.com": { category: "Paid", trusted: false },
  "tv.apple.com": { category: "Paid", trusted: false },
  "amazon.com": { category: "Paid", trusted: false },
  "paramountplus.com": { category: "Paid", trusted: false },
  "crunchyroll.com": { category: "Paid", trusted: false },
  "mgmplus.com": { category: "Paid", trusted: false },
  "peacocktv.com": { category: "Paid", trusted: false },
  "amcplus.com": { category: "Paid", trusted: false },

  // Apps
  "playtorrio.pages.dev": { category: "Apps", trusted: false },
  "beetvs.com.co": { category: "Apps", trusted: false },
  "hdobox.net": { category: "Apps", trusted: false },
  "moviesbox.com.co": { category: "Apps", trusted: false },
  "netmirror.gg": { category: "Apps", trusted: false },
  "pikashowtv.in": { category: "Apps", trusted: false },
  "mobiflix.tv": { category: "Apps", trusted: false },
  "youcineapkpro.com": { category: "Apps", trusted: false, isNew: true },
  "playfy.live": { category: "Apps", trusted: false },
};

export function lookupMeta(domain: string): SiteMeta {
  return (
    SITE_META[domain] ?? {
      category: "Other",
      trusted: false,
    }
  );
}
