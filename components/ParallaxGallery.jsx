"use client";

import { useEffect, useRef } from "react";

// Gallery (GreenSock-pen feel): the dark-green section scrolls while each photo
// drifts slowly inside its window (parallax), so the photo reads as near-still
// and the cutout reveals it. Each photo is sized to its OWN frame (object-cover)
// so it isn't over-zoomed, and `pos` controls the focal point.
//
// images: array of { src, pos } (or plain "src" strings). 6 entries.
const items = [
  { col: "col-span-full", h: "h-[58vh]" },
  { col: "col-span-full lg:col-[2/span_4]", h: "h-[55vh] lg:h-[62vh]" },
  { col: "col-span-full lg:col-[8/span_4]", h: "h-[55vh] lg:h-[62vh]" },
  { col: "col-span-full", h: "h-[58vh]" },
  { col: "col-span-full lg:col-[8/span_4]", h: "h-[70vh] lg:h-[82vh]" },
  { col: "col-span-full lg:col-[2/span_4]", h: "h-[70vh] lg:h-[82vh]" },
];

export default function ParallaxGallery({ images = [] }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const layers = Array.from(root.querySelectorAll("[data-px]"));
    let raf = 0;

    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      for (const layer of layers) {
        const frame = layer.parentElement;
        const r = frame.getBoundingClientRect();
        let p = (vh - r.top) / (vh + r.height); // 0 entering bottom -> 1 leaving top
        p = Math.min(1, Math.max(0, p));
        const extra = layer.offsetHeight - frame.offsetHeight; // overflow to travel
        layer.style.transform = `translate3d(0, ${(-p * extra).toFixed(1)}px, 0)`;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="bg-forest-950">
      <div
        ref={rootRef}
        className="mx-auto grid max-w-[2200px] grid-cols-1 gap-x-4 gap-y-[12vh] px-6 md:px-12 lg:grid-cols-12 lg:gap-y-[20vh]"
      >
        {items.map((it, i) => {
          const entry = images[i];
          const img = typeof entry === "string" ? entry : entry?.src;
          const pos = (typeof entry === "object" && entry?.pos) || "center";
          // taller layer = more drift but more crop/zoom; lower = "backed up"
          const layerH = (typeof entry === "object" && entry?.h) || 210;
          return (
            <div
              key={i}
              className={`relative overflow-hidden rounded-2xl bg-forest-900 ${it.col} ${it.h}`}
            >
              {img ? (
                <img
                  data-px
                  src={img}
                  alt=""
                  className="absolute inset-x-0 top-0 w-full object-cover will-change-transform"
                  style={{ objectPosition: pos, height: `${layerH}%` }}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-cream/70">
                  <span className="text-xs font-medium uppercase tracking-wide">Photo {i + 1}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
