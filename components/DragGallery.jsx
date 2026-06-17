"use client";

import { useRef, useState } from "react";
import PhotoPlaceholder from "./PhotoPlaceholder";

// Horizontal drag-to-scroll gallery of photo placeholders.
export default function DragGallery({ count = 7 }) {
  const ref = useRef(null);
  const state = useRef({ down: false, startX: 0, scroll: 0, moved: false });
  const [dragging, setDragging] = useState(false);

  const onDown = (e) => {
    const el = ref.current;
    state.current = {
      down: true,
      startX: e.pageX - el.offsetLeft,
      scroll: el.scrollLeft,
      moved: false,
    };
    setDragging(true);
  };
  const onMove = (e) => {
    if (!state.current.down) return;
    e.preventDefault();
    const el = ref.current;
    const x = e.pageX - el.offsetLeft;
    el.scrollLeft = state.current.scroll - (x - state.current.startX);
    state.current.moved = true;
  };
  const end = () => {
    state.current.down = false;
    setDragging(false);
  };

  return (
    <div
      ref={ref}
      onMouseDown={onDown}
      onMouseMove={onMove}
      onMouseUp={end}
      onMouseLeave={end}
      data-cursor="Drag"
      className={`no-scrollbar flex gap-5 overflow-x-auto pb-2 ${
        dragging ? "cursor-grabbing select-none" : "cursor-grab"
      }`}
      style={{ scrollSnapType: "x proximity" }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="shrink-0"
          style={{ scrollSnapAlign: "start" }}
        >
          <PhotoPlaceholder
            label={`Photo ${i + 1}`}
            className="h-[340px] w-[280px] md:h-[460px] md:w-[360px]"
          />
        </div>
      ))}
    </div>
  );
}
