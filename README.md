# DeerRidge RV Park — Website

A Next.js website for DeerRidge RV Park (Ellerbe, NC), built in an
Aveon-inspired layout with a dark green & white theme. The homepage is fully
built; all other pages are "coming soon" placeholders.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000. For a production build: `npm run build` then `npm start`.

## Interactions (the Aveon-style touches)

- **Custom cursor** — a mouse-follower dot + trailing ring that grows and shows
  context labels (Book, Drag, Menu…) on hover. Desktop only; the native cursor
  is restored on touch devices. (`components/CustomCursor.jsx`)
- **Hidden nav + menu button** — the navbar is hidden; a Menu button in the
  top-right opens a full-screen overlay with staggered, animated links and
  contact details. (`components/MenuOverlay.jsx`)
- **Scroll reveals** (`Reveal.jsx`), **scrolling marquee** (`Marquee.jsx`),
  **animated stat counters** (`Counter.jsx`), **drag-to-explore gallery**
  (`DragGallery.jsx`), **FAQ accordion** (`Faq.jsx`), and a **live local clock**
  (`LiveClock.jsx`).

## Tech

- Next.js 14 (App Router) · React 18 · Tailwind CSS 3

## Project structure

```
app/
  layout.jsx         Root layout + fonts + custom cursor
  page.jsx           Homepage (hero, marquee, about, offerings, gallery,
                     quote, stats, reviews, nearby, FAQ, contact)
  not-found.jsx      404 page
  amenities|gallery|contact|sites|activities/   Coming-soon stubs
components/          All UI + interactive components
lib/site.js          Business info: phone, address, booking URL, email
public/photos/       Drop real photos here
```

## What to customize

1. **Photos** — every image is a `<PhotoPlaceholder>`. Add files to
   `public/photos/` and swap placeholders for Next.js `<Image>` (see
   `public/photos/README.txt`).
2. **Logo** — `components/Logo.jsx` has a placeholder buck SVG. Replace it with
   the real DeerRidge buck logo.
3. **Email** — search for `TODO` / `[ add email` and fill in the real address
   in `lib/site.js` and where it's shown.
4. **Booking** — Book / Reserve buttons link to the Campspot listing
   (set in `lib/site.js`).

## Content source

Park details (amenities, reviews, address, hours) were drawn from the DeerRidge
listing on Campspot. Phone: (910) 997-1104 · Address: 125 Cargo Rd, Ellerbe, NC 28338.
