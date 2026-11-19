// Serverless function on Vercel: GET /api/github
//
// GitHub has no public JSON for the contribution calendar (the GraphQL API
// needs a token), so this reads the same HTML snippet github.com shows on a
// profile page and turns it into JSON for the heatmap.
//
// Returns: { total, days: [{ date: "2026-11-19", count: 3, level: 0-4 }] }
import { activity } from "../src/data.js";

// Browsers keep the answer for 5 minutes. Vercel's CDN keeps it for an hour,
// then serves the old one for up to a day while it fetches a fresh copy.
const CACHE = "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400";

export async function GET() {
  try {
    const url = `https://github.com/users/${activity.github.username}/contributions`;
    const response = await fetch(url, { headers: { "User-Agent": "himanshunaik.dev" } });
    if (!response.ok) throw new Error(`GitHub responded ${response.status}`);

    const days = parseCalendar(await response.text());
    if (days.length === 0) throw new Error("No contribution days found in GitHub's HTML");

    const total = days.reduce((sum, day) => sum + day.count, 0);
    return json({ total, days }, 200, CACHE);
  } catch (error) {
    return json({ error: error.message }, 502, "no-store");
  }
}

// Each day is a <td data-date="..." data-level="0-4" id="...">, and its count
// lives in a matching <tool-tip for="that id">3 contributions on ...</tool-tip>.
function parseCalendar(html) {
  const countById = new Map();
  for (const [, id, text] of html.matchAll(/<tool-tip[^>]*\sfor="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g)) {
    const match = text.trim().match(/^([\d,]+) contributions? on/);
    countById.set(id, match ? Number(match[1].replace(/,/g, "")) : 0);
  }

  const days = [];
  for (const [tag] of html.matchAll(/<td\b[^>]*\bContributionCalendar-day\b[^>]*>/g)) {
    const attr = (name) => tag.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1];
    const date = attr("data-date");
    if (!date) continue; // the "Less ... More" legend uses the same class, without a date
    days.push({
      date,
      count: countById.get(attr("id")) ?? 0,
      level: Number(attr("data-level") ?? 0),
    });
  }

  return days.sort((a, b) => a.date.localeCompare(b.date));
}

function json(body, status, cacheControl) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": cacheControl },
  });
}
