import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { activity } from "../data.js";

// Contents of the "Activity" card: a GitHub and a LeetCode heatmap,
// one square per day for the last year, darker = busier.
export default function Activity() {
  return (
    <div className="activity">
      <Heatmap
        name="GitHub"
        url={activity.github.url}
        api="/api/github"
        unit="contribution"
        variant="github"
        summarize={(data) => `${data.total.toLocaleString("en-US")} contributions in the last year`}
      />
      <Heatmap
        name="LeetCode"
        url={activity.leetcode.url}
        api="/api/leetcode"
        unit="submission"
        variant="leetcode"
        summarize={({ solved }) =>
          `${solved.all} solved · ${solved.easy} easy · ${solved.medium} medium · ${solved.hard} hard`
        }
      />
    </div>
  );
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAY_MS = 24 * 60 * 60 * 1000;

// The last 53 weeks as columns of 7 dates (Sunday on top), ending today.
// Both heatmaps share it, so their columns line up.
const WEEKS = buildWeeks(new Date());
const MONTH_LABELS = buildMonthLabels(WEEKS);

function Heatmap({ name, url, api, unit, variant, summarize }) {
  // null = still loading. Once the /api function answers, data holds its JSON.
  const [data, setData] = useState(null);
  const [failed, setFailed] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    let ignore = false; // stops a late answer from updating a removed component
    fetch(api)
      .then((response) => {
        if (!response.ok) throw new Error(`${api} responded ${response.status}`);
        return response.json();
      })
      .then((json) => !ignore && setData(json))
      .catch(() => !ignore && setFailed(true));
    return () => {
      ignore = true;
    };
  }, [api]);

  // On phones the year is wider than the card, so start scrolled to the newest week.
  useLayoutEffect(() => {
    const box = scrollRef.current;
    box.scrollLeft = box.scrollWidth;
  }, []);

  // date → { count, level }, for quick lookups while drawing the squares
  const byDate = new Map((data?.days ?? []).map((day) => [day.date, day]));
  const status = failed ? "couldn't load right now" : data ? summarize(data) : "loading…";

  return (
    <div className={`heatmap heatmap-${variant}`}>
      <div className="heatmap-head">
        <a href={url} target="_blank" rel="noreferrer">
          {name} <span aria-hidden="true">↗</span>
        </a>
        <p className="mono">{status}</p>
      </div>

      <div className="heatmap-scroll" ref={scrollRef}>
        <div className="heatmap-months" aria-hidden="true">
          {MONTH_LABELS.map((month) => (
            <span key={month.week} style={{ gridColumn: month.week + 1 }}>
              {month.label}
            </span>
          ))}
        </div>

        <div className="heatmap-days" role="img" aria-label={`${name} activity, last 12 months: ${status}`}>
          {WEEKS.flat().map((date) => {
            const day = byDate.get(date);
            const count = day?.count ?? 0;
            return (
              <span
                key={date}
                className="heatmap-cell"
                data-level={day?.level ?? 0}
                title={data ? `${count} ${unit}${count === 1 ? "" : "s"} on ${formatDate(date)}` : undefined}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Dates are "YYYY-MM-DD" strings, the same format both /api functions return.
// Doing the math in UTC avoids daylight-saving surprises.
function buildWeeks(today) {
  const end = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  const start = end - (52 * 7 + new Date(end).getUTCDay()) * DAY_MS; // a Sunday, 52 weeks back

  const weeks = [];
  for (let time = start, i = 0; time <= end; time += DAY_MS, i++) {
    if (i % 7 === 0) weeks.push([]);
    weeks[weeks.length - 1].push(new Date(time).toISOString().slice(0, 10));
  }
  return weeks;
}

// Put a month name above the first week of each month.
function buildMonthLabels(weeks) {
  const labels = [];
  weeks.forEach((week, index) => {
    const month = Number(week[0].slice(5, 7)) - 1;
    const previous = index > 0 ? Number(weeks[index - 1][0].slice(5, 7)) - 1 : null;
    if (month !== previous) labels.push({ week: index, label: MONTHS[month] });
  });

  // The first column is usually the tail end of a month: drop its label if
  // the next one is too close. Same for a label squeezed into the last columns.
  if (labels.length > 1 && labels[1].week < 3) labels.shift();
  return labels.filter((label) => label.week <= weeks.length - 3);
}

function formatDate(date) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}
