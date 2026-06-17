"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState("");
  const [active, setActive] = useState(false);

  useEffect(() => {
    // Only run on devices with a fine pointer (real mouse)
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: mouse.x, y: mouse.y };
    let raf;

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouse.x}px, ${mouse.y}px)`;
      }

      // Detect interactive / labelled targets
      const el = e.target.closest("[data-cursor], a, button");
      if (el) {
        setActive(true);
        setLabel(el.getAttribute("data-cursor") || "");
      } else {
        setActive(false);
        setLabel("");
      }
    };

    const render = () => {
      // Smooth trailing ring (lerp)
      ring.x += (mouse.x - ring.x) * 0.15;
      ring.y += (mouse.y - ring.y) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px)`;
      }
      raf = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(render);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] hidden md:block" aria-hidden="true">
      {/* Center dot */}
      <div
        ref={dotRef}
        className="absolute left-0 top-0 -ml-1 -mt-1 h-2 w-2 rounded-full bg-cream mix-blend-difference"
      />
      {/* Trailing ring (grows + shows label on hover) */}
      <div
        ref={ringRef}
        className="absolute left-0 top-0 flex items-center justify-center rounded-full border border-cream/60 transition-[width,height,background-color] duration-300 ease-out mix-blend-difference"
        style={{
          width: active ? 84 : 36,
          height: active ? 84 : 36,
          marginLeft: active ? -42 : -18,
          marginTop: active ? -42 : -18,
          backgroundColor: active ? "rgba(247,249,245,0.12)" : "transparent",
        }}
      >
        {label && (
          <span className="select-none text-[0.6rem] font-medium uppercase tracking-[0.18em] text-cream">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
