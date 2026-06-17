"use client";

import { useEffect, useState } from "react";

// Live local clock for the park's timezone (Eastern Time).
export default function LiveClock() {
  const [now, setNow] = useState(null);

  useEffect(() => {
    const update = () => setNow(new Date());
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const tz = "America/New_York";
  const date = now
    ? now.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        timeZone: tz,
      })
    : "—";
  const time = now
    ? now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: tz,
      })
    : "—";

  return (
    <div className="flex flex-col gap-1 text-sm text-forest-300">
      <span>Ellerbe — North Carolina</span>
      <span>{date}</span>
      <span className="font-serif text-2xl font-light tabular-nums text-cream">{time}</span>
    </div>
  );
}
