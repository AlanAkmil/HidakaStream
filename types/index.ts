export interface StreamSite {
  name: string;
  url: string;
  domain: string;
  category: SiteCategory;
  trusted: boolean;
  isNew?: boolean;
}

export interface ScrapeResponse {
  success: boolean;
  query: string;
  total_sites_indexed: number;
  total_found: number;
  categories: number;
  results: StreamSite[];
  error?: string;
}

export type SiteCategory =
  | "Movies & Shows"
  | "Anime"
  | "Manga"
  | "Live TV & Sports"
  | "Paid"
  | "Apps"
  | "Other";
