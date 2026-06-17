"use client";

import { useEffect, useRef } from "react";

// Comet-trail reveal hero with a "living" spotlight:
// The photo sits underneath. Every frame the canvas is repainted FULLY solid
// dark-green, then we "cut" holes to reveal the photo:
//   1. a comet TRAIL of fading soft circles that taper to a point.
//   2. a HEAD blob at the cursor whose edge undulates with layered sine waves
//      over time, so it breathes/wobbles like it's alive.
// Put your hero photo at public/photos/hero.png (or change `image` below).
export default function HeroReveal({ image = "/photos/hero.png", children }) {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;
    const ctx = canvas.getContext("2d");

    const GREEN = "6,21,10"; // forest-950
    const HEAD = 170; // base radius of the spotlight head
    const LIFE = 4000; // ms a trail point lasts (higher = slower return to green)
    const TAPER = 1.6; // higher = sharper, more triangular tail
    const EASE = 0.12; // how much the head lags the cursor (lower = more ripple)

    let w = 0,
      h = 0;

    const resize = () => {
      const r = section.getBoundingClientRect();
      w = r.width;
      h = r.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // Touch / no mouse: lift the green to ~35% so the photo is still visible.
    if (!window.matchMedia("(pointer: fine)").matches) {
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = `rgba(${GREEN},0.35)`;
      ctx.fillRect(0, 0, w, h);
      return () => window.removeEventListener("resize", resize);
    }

    const points = []; // { x, y, t }
    let target = null; // latest cursor pos
    let last = null;
    const head = { x: 0, y: 0 };
    let hasHead = false;
    let inside = false;
    let headOpacity = 0; // eases 0..1 so the head fades in/out
    let speed = 0; // smoothed cursor speed (px/ms)
    let phase = 0; // wave phase that advances as the cursor moves
    let lastMoveT = 0;
    let raf;

    // soft, feathered circular hole (used for the comet trail)
    const cut = (x, y, radius, strength) => {
      if (radius < 0.5 || strength <= 0.01) return;
      const g = ctx.createRadialGradient(x, y, 0, x, y, radius);
      g.addColorStop(0, `rgba(0,0,0,${strength})`);
      g.addColorStop(0.6, `rgba(0,0,0,${strength * 0.9})`);
      g.addColorStop(0.85, `rgba(0,0,0,${strength * 0.4})`);
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    };

    // living blob hole (used for the head) — radius wobbles around the circle
    const SEG = 140;
    const cutBlob = (cx, cy, baseR, strength, time, ph) => {
      if (strength <= 0.01) return;
      const breathe = 1 + 0.05 * Math.sin(time * 0.0016);
      ctx.save();
      ctx.globalCompositeOperation = "destination-out";
      ctx.filter = "blur(6px)"; // crisp edge so the wobble is clearly visible
      ctx.beginPath();
      for (let i = 0; i <= SEG; i++) {
        const a = (i / SEG) * Math.PI * 2;
        // layered sine waves; `ph` advances with cursor movement so the ripples
        // travel around the edge as the mouse moves (not just over time)
        const wob =
          1 +
          0.06 * Math.sin(a * 8 + time * 0.0026 + ph) +
          0.05 * Math.sin(a * 13 - time * 0.0019 + ph * 0.8) +
          0.035 * Math.sin(a * 19 + time * 0.0034 + ph * 1.3);
        const r = baseR * breathe * wob;
        const x = cx + Math.cos(a) * r;
        const y = cy + Math.sin(a) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fillStyle = `rgba(0,0,0,${strength})`;
      ctx.fill();
      ctx.restore();
    };

    const addPoint = (x, y) => {
      const now = performance.now();
      if (last) {
        const dx = x - last.x;
        const dy = y - last.y;
        const dist = Math.hypot(dx, dy);
        const steps = Math.min(40, Math.floor(dist / 9));
        for (let i = 1; i <= steps; i++) {
          points.push({ x: last.x + (dx * i) / steps, y: last.y + (dy * i) / steps, t: now });
        }
      }
      points.push({ x, y, t: now });
      last = { x, y };
      if (points.length > 600) points.splice(0, points.length - 600);
    };

    const onMove = (e) => {
      const r = section.getBoundingClientRect();
      const nx = e.clientX - r.left;
      const ny = e.clientY - r.top;
      const now = performance.now();
      if (target) {
        const d = Math.hypot(nx - target.x, ny - target.y);
        const dt = Math.max(1, now - lastMoveT);
        speed = 0.8 * speed + 0.2 * (d / dt); // smoothed px/ms
        phase += d * 0.03; // waves travel with movement
      }
      lastMoveT = now;
      target = { x: nx, y: ny };
      inside = true;
      addPoint(nx, ny);
    };
    const onEnter = () => (inside = true);
    const onLeave = () => (inside = false);

    const loop = () => {
      const now = performance.now();

      // 1) repaint FULLY solid green every frame
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = `rgb(${GREEN})`;
      ctx.fillRect(0, 0, w, h);

      // 2) comet trail (newest big, oldest shrinks to a sharp point)
      ctx.globalCompositeOperation = "destination-out";
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const age = (now - p.t) / LIFE;
        if (age >= 1) continue;
        const f = 1 - age;
        // per-point ripple makes the tail edge undulate; 0.8 keeps the trail a
        // touch smaller than the head blob so the head's waves show at the front
        const ripple = 1 + 0.16 * Math.sin(i * 0.8 + now * 0.006);
        cut(p.x, p.y, HEAD * 0.8 * Math.pow(f, TAPER) * ripple, Math.pow(f, 0.8));
      }

      // 3) living head blob that eases toward the cursor (hover keeps it on)
      if (target) {
        if (!hasHead) {
          head.x = target.x;
          head.y = target.y;
          hasHead = true;
        }
        // faster cursor -> smaller ease -> head lags more, so the tail "falls
        // off" / stretches behind a fast drag
        const ease = Math.max(0.05, EASE - speed * 0.03);
        head.x += (target.x - head.x) * ease;
        head.y += (target.y - head.y) * ease;
      }
      speed *= 0.9; // decay speed when the mouse isn't moving
      headOpacity += ((inside ? 1 : 0) - headOpacity) * 0.08;
      if (hasHead && headOpacity > 0.01) {
        cutBlob(head.x, head.y, HEAD, headOpacity, now, phase);
      }

      // 4) drop dead trail points
      while (points.length && now - points[0].t >= LIFE) points.shift();

      raf = requestAnimationFrame(loop);
    };

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseenter", onEnter);
    section.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("resize", resize);
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseenter", onEnter);
      section.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-screen overflow-hidden bg-forest-950"
    >
      {/* the photo, always fully present underneath */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${image}')` }}
        aria-hidden="true"
      />
      {/* green cover that the cursor erases; repainted solid every frame */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
      {/* subtle gradient at the very bottom so the heading stays readable */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-950 via-transparent to-transparent" />
      {/* content sits on its own layer above everything */}
      <div className="relative z-10 flex min-h-screen flex-col justify-end">
        {children}
      </div>
    </section>
  );
}
