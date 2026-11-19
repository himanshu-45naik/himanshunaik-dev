// Serverless function on Vercel: GET /api/leetcode
//
// LeetCode's GraphQL API blocks requests from other websites (CORS), so the
// browser can't call it directly. This function calls it from the server and
// passes back only what the heatmap needs.
//
// Returns: {
//   solved: { all, easy, medium, hard },
//   activeDays,
//   days: [{ date: "2026-11-19", count: 3, level: 0-4 }]
// }
import { activity } from "../src/data.js";

// Browsers keep the answer for 5 minutes. Vercel's CDN keeps it for an hour,
// then serves the old one for up to a day while it fetches a fresh copy.
const CACHE = "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400";

// Without a year, userCalendar covers the last 12 months.
const QUERY = `
  query activity($username: String!) {
    matchedUser(username: $username) {
      submitStats { acSubmissionNum { difficulty count } }
      userCalendar { submissionCalendar }
    }
  }
`;

export async function GET() {
  try {
    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
        "User-Agent": "himanshunaik.dev",
      },
      body: JSON.stringify({ query: QUERY, variables: { username: activity.leetcode.username } }),
    });
    if (!response.ok) throw new Error(`LeetCode responded ${response.status}`);

    const { data, errors } = await response.json();
    const user = data?.matchedUser;
    if (errors || !user) throw new Error(errors?.[0]?.message ?? "LeetCode user not found");

    // "All" / "Easy" / "Medium" / "Hard" → { all, easy, medium, hard }
    const solved = {};
    for (const { difficulty, count } of user.submitStats.acSubmissionNum) {
      solved[difficulty.toLowerCase()] = count;
    }

    const days = toDays(JSON.parse(user.userCalendar.submissionCalendar));
    return json({ solved, activeDays: days.length, days }, 200, CACHE);
  } catch (error) {
    return json({ error: error.message }, 502, "no-store");
  }
}

// LeetCode sends { "<unix seconds at UTC midnight>": submissions }.
// Shades 1-4 split the active days into quarters, like GitHub does, so one
// very busy day doesn't make every other day look the same pale color.
function toDays(calendar) {
  const entries = Object.entries(calendar).filter(([, count]) => count > 0);
  const sorted = entries.map(([, count]) => count).sort((a, b) => a - b);
  const quartile = (q) => sorted[Math.floor((sorted.length - 1) * q)];
  const [q1, q2, q3] = [quartile(0.25), quartile(0.5), quartile(0.75)];

  return entries
    .map(([seconds, count]) => ({
      date: new Date(Number(seconds) * 1000).toISOString().slice(0, 10),
      count,
      level: count <= q1 ? 1 : count <= q2 ? 2 : count <= q3 ? 3 : 4,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

function json(body, status, cacheControl) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": cacheControl },
  });
}
