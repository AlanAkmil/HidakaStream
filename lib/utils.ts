import { SiteCategory, StreamSite } from "@/types";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const CATEGORY_KEYWORDS: Record<Exclude<SiteCategory, "General">, string[]> = {
  Sports: ["sport", "live", "daddy", "stream", "match", "score"],
  "Live TV": ["tv", "channel", "cast"],
  Movies: ["movie", "film", "cinema", "flix"],
  News: ["news", "berita"],
};

export function categorize(site: StreamSite): SiteCategory {
  const haystack = `${site.name} ${site.url}`.toLowerCase();

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS) as [
    Exclude<SiteCategory, "General">,
    string[]
  ][]) {
    if (keywords.some((kw) => haystack.includes(kw))) {
      return category;
    }
  }

  return "General";
}

export function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

const GRADIENTS = [
  "from-[#3A2B5E] to-[#1B1030]",
  "from-[#1F3B4D] to-[#0E1B24]",
  "from-[#4A2340] to-[#1A0E1A]",
  "from-[#2B4A3E] to-[#0F1E18]",
  "from-[#4A3320] to-[#1E140C]",
  "from-[#2A2E4A] to-[#101124]",
];

export function gradientFor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return GRADIENTS[Math.abs(hash) % GRADIENTS.length];
}

export function initials(name: string): string {
  const clean = name.trim();
  if (!clean) return "??";
  const parts = clean.split(/\s+/);
  if (parts.length === 1) return clean.slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}
