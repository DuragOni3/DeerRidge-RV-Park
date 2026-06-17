"use client";

import { useEffect, useRef } from "react";
import PhotoPlaceholder from "./PhotoPlaceholder";

// Pinned horizontal-scroll gallery (GSAP-style, but dependency-free).
// The tall outer section provides vertical scroll distance; the inner panel is
// sticky/pinned to the viewport, and the image track slides left horizontally
// in proportion to how far the section has been scrolled through.
export default function HorizontalGallery({ count = 8 }) {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const total = wrap.offsetHeight - vh; // vertical distance available
      const scrolled = Math.min(Math.max(-wrap.getBoundingClientRect().top, 0), total);
      const progress = total > 0 ? scrolled / total : 0;
      const max = Math.max(0, track.scrollWidth - window.innerWidth);
      track.style.transform = `translate3d(${-(progress * max).toFixed(2)}px,0,0)`;
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

  // taller section = slower, longer horizontal scroll
  const heightVh = Math.max(220, count * 30);

  return (
    <section
      ref={wrapRef}
      style={{ height: `${heightVh}vh` }}
      className="relative"
      aria-label="Photo gallery"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div
          ref={trackRef}
          data-cursor="Scroll"
          className="flex gap-6 px-6 will-change-transform md:gap-8 md:px-10"
        >
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="shrink-0">
              <PhotoPlaceholder
                label={`Photo ${i + 1}`}
                className="h-[58vh] w-[80vw] sm:w-[52vw] md:w-[36vw] lg:w-[30vw]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
