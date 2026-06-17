"use client";

import { useState } from "react";

export default function Faq({ items = [] }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="divide-y divide-forest-800 border-y border-forest-800">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              data-cursor={isOpen ? "Close" : "Open"}
              className="flex w-full items-center justify-between gap-6 py-6 text-left"
            >
              <span className="font-serif text-xl font-light text-cream md:text-2xl">
                {item.q}
              </span>
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-forest-600 text-cream transition-transform duration-300 ${
                  isOpen ? "rotate-45 bg-cream text-forest-950" : ""
                }`}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </button>
            <div
              className="grid overflow-hidden transition-all duration-500 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="min-h-0">
                <p className="max-w-2xl pb-6 leading-relaxed text-forest-200">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
