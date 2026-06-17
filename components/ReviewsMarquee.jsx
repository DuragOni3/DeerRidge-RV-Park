"use client";

import { site } from "@/lib/site";

function Stars({ count }) {
  return (
    <div className="flex gap-1" aria-label={`${count} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24"
          fill={i <= count ? "#7fae86" : "none"} stroke="#7fae86" strokeWidth="1.5">
          <path d="M12 2l3 6.5 7 .9-5 4.8 1.2 7L12 18l-6.4 3.2 1.2-7-5-4.8 7-.9z" />
        </svg>
      ))}
    </div>
  );
}

// Continuously scrolling, clickable review cards (like the amenities marquee).
// Each card links to the park's Google reviews. Pauses on hover.
export default function ReviewsMarquee({ items = [] }) {
  // repeat so one loop is always wider than the screen (seamless scroll)
  const seq = [...items, ...items];

  return (
    <div className="marquee overflow-hidden py-2">
      <div className="marquee-track">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex" aria-hidden={dup === 1}>
            {seq.map((r, i) => (
              <a
                key={`${dup}-${i}`}
                href={site.googleReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="Reviews"
                className="mx-3 flex min-h-[230px] w-[360px] shrink-0 flex-col whitespace-normal rounded-2xl border border-forest-800 bg-forest-900/40 p-7 transition-colors hover:bg-forest-900"
              >
                <Stars count={r.stars} />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-forest-100">
                  “{r.quote}”
                </blockquote>
                <figcaption className="mt-5 flex items-center justify-between text-sm">
                  <span>
                    <span className="font-medium text-cream">{r.name}</span>
                    <span className="text-forest-400"> · {r.date}</span>
                  </span>
                  {/* tiny Google "G" mark */}
                  <svg width="15" height="15" viewBox="0 0 48 48" aria-hidden="true">
                    <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.6 2.7 30.1 0 24 0 14.6 0 6.4 5.4 2.5 13.2l7.9 6.1C12.2 13.2 17.6 9.5 24 9.5z" />
                    <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.5 3-2.2 5.5-4.7 7.2l7.3 5.7c4.3-3.9 6.7-9.7 6.7-17.4z" />
                    <path fill="#FBBC05" d="M10.4 28.3c-.5-1.5-.8-3.1-.8-4.8s.3-3.3.8-4.8l-7.9-6.1C.9 16.1 0 19.9 0 23.5s.9 7.4 2.5 10.9l7.9-6.1z" />
                    <path fill="#34A853" d="M24 47c6.1 0 11.3-2 15-5.5l-7.3-5.7c-2 1.4-4.7 2.3-7.7 2.3-6.4 0-11.8-3.7-13.6-9.8l-7.9 6.1C6.4 42.6 14.6 47 24 47z" />
                  </svg>
                </figcaption>
              </a>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
