"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import PhotoPlaceholder from "./PhotoPlaceholder";
import SocialLinks from "./SocialLinks";
import { site } from "@/lib/site";

const links = [
  { href: "/about", label: "About", n: "01" },
  { href: "/amenities", label: "Amenities", n: "02" },
  { href: "/gallery", label: "Gallery", n: "03" },
  { href: "/reviews", label: "Reviews", n: "04" },
  { href: "/events", label: "Events", n: "05" },
  { href: "/contact", label: "Contact", n: "06" },
];

export default function MenuOverlay() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll + close on Escape while menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Fixed top bar: logo (left) + menu button (right) */}
      <header className="fixed inset-x-0 top-0 z-[80]">
        <div
          className={`transition-colors duration-500 ${
            scrolled && !open ? "bg-forest-950/70 backdrop-blur" : "bg-transparent"
          }`}
        >
          <div className="container-x relative flex h-20 items-center justify-start">
            <Link
              href="/"
              aria-label="DeerRidge RV Park home"
              className="relative z-[95]"
            >
              <Logo light mark="#f7f9f5" size={48} />
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              data-cursor={open ? "Close" : "Menu"}
              className={`absolute right-6 z-[95] inline-flex items-center gap-2.5 rounded-full border border-cream/25 bg-cream/5 px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-cream backdrop-blur transition-opacity hover:bg-cream/15 md:right-10 ${
                open ? "pointer-events-none opacity-0" : "opacity-100"
              }`}
            >
              <span>{open ? "Close" : "Menu"}</span>
              <span className="relative flex h-3 w-3.5 flex-col justify-between">
                <span
                  className={`h-px w-full transition-transform duration-300 ${
                    open ? "translate-y-[5px] rotate-45 bg-forest-950" : "bg-cream"
                  }`}
                />
                <span
                  className={`h-px w-full bg-cream transition-opacity duration-300 ${
                    open ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`h-px w-full transition-transform duration-300 ${
                    open ? "-translate-y-[5px] -rotate-45 bg-forest-950" : "bg-cream"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen overlay menu */}
      <div
        className={`fixed inset-0 z-[85] transition-[opacity,visibility] duration-500 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-forest-950/95 backdrop-blur-md"
          onClick={() => setOpen(false)}
        />

        {/* Dedicated close button */}
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
          data-cursor="Close"
          className="absolute right-6 top-5 z-[90] inline-flex items-center gap-2 rounded-full bg-cream px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-forest-950 transition-colors hover:bg-white md:right-10"
        >
          Close
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <div className="container-x relative flex h-full flex-col justify-center pt-20">
          <div className="grid gap-12 md:grid-cols-[1.3fr_1fr]">
            {/* Nav links */}
            <nav className="flex flex-col">
              <p className="eyebrow bracket-label mb-8">Navigation</p>
              <ul>
                {links.map((l, i) => (
                  <li
                    key={l.href}
                    className="overflow-hidden border-b border-forest-800"
                    style={{
                      transition: "transform 0.6s, opacity 0.6s",
                      transitionDelay: open ? `${0.15 + i * 0.07}s` : "0s",
                      transform: open ? "translateY(0)" : "translateY(20px)",
                      opacity: open ? 1 : 0,
                    }}
                  >
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      data-cursor="Go"
                      className="group flex items-baseline gap-5 py-4"
                    >
                      <span className="text-xs font-medium tracking-widest text-forest-400">
                        {l.n}
                      </span>
                      <span className="display capitalize text-2xl text-cream transition-colors group-hover:text-forest-300 md:text-4xl">
                        {l.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              <a
                href={site.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="Book"
                className="btn-pill mt-10 self-start"
              >
                Reserve Your Spot
              </a>
            </nav>

            {/* Contact + image */}
            <div className="flex flex-col justify-center gap-8">
              <PhotoPlaceholder
                label="Featured photo"
                className="hidden aspect-[4/3] md:block"
              />
              <div className="grid gap-5 text-sm">
                <div className="flex items-start justify-between gap-8">
                  <div>
                    <p className="eyebrow bracket-label">Find Us</p>
                    <p className="mt-3 text-forest-100">{site.address}</p>
                  </div>
                  <SocialLinks className="mt-1 shrink-0" />
                </div>
                <div>
                  <p className="eyebrow bracket-label">Get in Touch</p>
                  <a href={site.phoneHref} className="mt-3 block text-forest-100 hover:text-cream">
                    {site.phone}
                  </a>
                  {/* TODO: replace with the real email address */}
                  <p className="text-forest-300">[ add email address here ]</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
