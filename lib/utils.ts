export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function getDomain(url: string): string {
  try {
    return new URL(url).hostname;
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

const ACCENT_COLORS = [
  "#FF5A7A",
  "#4FD1FF",
  "#B98CFF",
  "#7DFFB0",
  "#FFC24F",
  "#FF9F5A",
];

function hashOf(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

export function gradientFor(name: string): string {
  return GRADIENTS[hashOf(name) % GRADIENTS.length];
}

export function accentFor(name: string): string {
  return ACCENT_COLORS[hashOf(name) % ACCENT_COLORS.length];
}

export function initials(name: string): string {
  const clean = name.trim();
  if (!clean) return "??";
  const parts = clean.split(/\s+/);
  if (parts.length === 1) return clean.slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

// --- Favorit & riwayat kunjungan (localStorage, sisi klien saja) ---

const FAVORITES_KEY = "hidakastream:favorites";
const RECENTS_KEY = "hidakastream:recents";
const RECENTS_LIMIT = 8;

function readList(key: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function writeList(key: string, list: string[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(list));
}

export function getFavorites(): string[] {
  return readList(FAVORITES_KEY);
}

export function toggleFavorite(url: string): string[] {
  const current = readList(FAVORITES_KEY);
  const next = current.includes(url)
    ? current.filter((u) => u !== url)
    : [...current, url];
  writeList(FAVORITES_KEY, next);
  return next;
}

export function getRecents(): string[] {
  return readList(RECENTS_KEY);
}

export function pushRecent(url: string): string[] {
  const current = readList(RECENTS_KEY).filter((u) => u !== url);
  const next = [url, ...current].slice(0, RECENTS_LIMIT);
  writeList(RECENTS_KEY, next);
  return next;
}

export function clearRecents(): void {
  writeList(RECENTS_KEY, []);
}
