"use client";

// Seamless scrolling marquee. Duplicates its items so the loop is continuous.
export default function Marquee({ items = [], className = "" }) {
  const content = (
    <div className="marquee-track">
      {[0, 1].map((dup) => (
        <div key={dup} className="flex items-center" aria-hidden={dup === 1}>
          {items.map((item, i) => (
            <span key={`${dup}-${i}`} className="flex items-center">
              <span className="px-8 font-serif text-2xl font-light text-cream/90 md:text-3xl">
                {item}
              </span>
              <span className="text-forest-500">/</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <div className={`marquee overflow-hidden ${className}`}>
      {content}
    </div>
  );
}
