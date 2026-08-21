import { NextRequest, NextResponse } from "next/server";
import { searchSites } from "@/lib/scraper";
import { ScrapeResponse } from "@/types";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q") ?? "";
  const refresh = searchParams.get("refresh") === "1";

  try {
    const { all, results } = await searchSites(query, refresh);
    const categoryCount = new Set(all.map((s) => s.category)).size;

    const payload: ScrapeResponse = {
      success: true,
      query,
      total_sites_indexed: all.length,
      total_found: results.length,
      categories: categoryCount,
      results,
    };

    return NextResponse.json(payload);
  } catch (error: any) {
    const payload: ScrapeResponse = {
      success: false,
      query,
      total_sites_indexed: 0,
      total_found: 0,
      categories: 0,
      results: [],
      error: error?.message ?? "Terjadi kesalahan tak terduga.",
    };

    return NextResponse.json(payload, { status: 502 });
  }
}
