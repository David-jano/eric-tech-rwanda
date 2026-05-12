// app/api/youtube/route.ts
import { NextResponse } from "next/server";

const PLAYLIST_ID = "PLVA6X1Cp4EqKkf6AA5U-UCz60TKWfiVIU";

export async function GET() {
  try {
    const response = await fetch(
      `https://www.youtube.com/feeds/videos.xml?playlist_id=${PLAYLIST_ID}`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const xmlText = await response.text();

    return new NextResponse(xmlText, {
      status: 200,
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error fetching YouTube playlist:", error);
    return NextResponse.json(
      { error: "Failed to fetch playlist" },
      { status: 500 },
    );
  }
}
