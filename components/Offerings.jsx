"use client";

import { useState } from "react";
import PhotoPlaceholder from "./PhotoPlaceholder";

// Clickable amenity cards. Click a card to expand it — revealing a photo
// placeholder and a short description of that feature.
export default function Offerings({ items = [] }) {
  const [open, setOpen] = useState(null);

  return (
    <div className="grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((o, i) => {
        const isOpen = open === i;
        return (
          <button
            key={o.n}
            type="button"
            onClick={() => setOpen(isOpen ? null : i)}
            data-cursor={isOpen ? "Close" : "Open"}
            aria-expanded={isOpen}
            className={`group h-full rounded-2xl border p-7 text-left transition-colors duration-300 ${
              isOpen
                ? "border-forest-600 bg-forest-900"
                : "border-forest-800 bg-forest-950 hover:bg-forest-900"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-serif text-sm text-forest-400">/{o.n}</span>
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full border border-forest-600 text-cream transition-transform duration-300 ${
                  isOpen ? "rotate-45 bg-cream text-forest-950" : ""
                }`}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </div>

            <h3 className="mt-8 font-serif text-2xl font-light text-cream">{o.title}</h3>

            {/* expanding panel */}
            <div
              className="grid overflow-hidden transition-all duration-500 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="min-h-0">
                <PhotoPlaceholder label={o.title} className="mt-5 aspect-[4/3]" />
                <p className="mt-4 text-sm leading-relaxed text-forest-200">{o.desc}</p>
              </div>
            </div>

            {!isOpen && (
              <p className="mt-4 text-xs uppercase tracking-[0.18em] text-forest-500">
                Click to view
              </p>
            )}
          </button>
        );
      })}
    </div>
  );
}
