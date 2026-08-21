import { StreamSite } from "@/types";

/**
 * Situs yang ditambahin manual, di luar hasil scrape tbcpl.lol.
 * Ditandain `pinned: true` (bukan `trusted`) karena statusnya belum
 * diverifikasi lewat proses trust tbcpl — ini murni tambahan manual.
 */
export const MANUAL_SITES: StreamSite[] = [
  {
    name: "LK21",
    url: "https://tv12.lk21official.cc/",
    domain: "tv12.lk21official.cc",
    category: "Movies & Shows",
    trusted: false,
    pinned: true,
  },
];
