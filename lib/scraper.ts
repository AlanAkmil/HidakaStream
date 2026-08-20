import { StreamSite } from "@/types";

const SOURCE_URL = "https://tbcpl.lol/";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36";

// TBCPL pakai Next.js, datanya ke-embed ter-escape di HTML kayak:
// \"name\":\"DaddyLive\",\"url\":\"https://dlstreams.st/\"
const ENTRY_REGEX = /\\"name\\":\\"([^\\"]+)\\",\\"url\\":\\"([^\\"]+)\\"/g;

let cache: { data: StreamSite[]; fetchedAt: number } | null = null;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 menit

async function fetchHtml(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: { "User-Agent": UA },
    // jangan biarkan Next.js cache request ini selamanya
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Gagal mengakses ${url}. Status Code: ${res.status}`);
  }

  return res.text();
}

function parseSites(html: string): StreamSite[] {
  const regex = new RegExp(ENTRY_REGEX);
  const sites: StreamSite[] = [];
  let match: RegExpExecArray | null;

  while ((match = regex.exec(html)) !== null) {
    sites.push({ name: match[1], url: match[2] });
  }

  // Dedup berdasarkan URL
  const uniqueMap = new Map<string, StreamSite>();
  sites.forEach((site) => uniqueMap.set(site.url, site));
  return Array.from(uniqueMap.values());
}

export async function getAllSites(forceRefresh = false): Promise<StreamSite[]> {
  const now = Date.now();

  if (!forceRefresh && cache && now - cache.fetchedAt < CACHE_TTL_MS) {
    return cache.data;
  }

  const html = await fetchHtml(SOURCE_URL);
  const sites = parseSites(html);

  if (sites.length === 0) {
    throw new Error(
      "Tidak ada data yang ditemukan. Struktur website tbcpl.lol mungkin telah berubah."
    );
  }

  cache = { data: sites, fetchedAt: now };
  return sites;
}

export async function searchSites(
  query: string,
  forceRefresh = false
): Promise<{ all: StreamSite[]; results: StreamSite[] }> {
  const all = await getAllSites(forceRefresh);
  const q = query.trim().toLowerCase();

  if (!q) {
    return { all, results: all };
  }

  const results = all.filter(
    (site) =>
      site.name.toLowerCase().includes(q) || site.url.toLowerCase().includes(q)
  );

  return { all, results };
}
