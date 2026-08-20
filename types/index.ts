export interface StreamSite {
  name: string;
  url: string;
}

export interface ScrapeResponse {
  success: boolean;
  query: string;
  total_sites_indexed: number;
  total_found: number;
  results: StreamSite[];
  error?: string;
}

export type SiteCategory =
  | "Sports"
  | "Live TV"
  | "Movies"
  | "News"
  | "General";
