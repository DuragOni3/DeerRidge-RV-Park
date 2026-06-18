import { site } from "@/lib/site";

// Monochrome Facebook "f" in a bordered circle — matches the site's
// dark-green / cream vibe (no bright blue). `label` shows text next to it.
export default function FacebookButton({ className = "", label = "" }) {
  return (
    <a
      href={site.facebookUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="Facebook"
      aria-label="DeerRidge RV Park on Facebook"
      className={`group inline-flex items-center gap-3 ${className}`}
    >
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-forest-700 text-cream transition-colors duration-300 group-hover:border-forest-300 group-hover:bg-cream group-hover:text-forest-950">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M15.12 5.32H17V2.14A26.1 26.1 0 0 0 14.26 2c-2.72 0-4.58 1.66-4.58 4.7v2.6H6.61v3.56h3.07V22h3.68v-9.14h3.06l.46-3.56h-3.52V7.05c0-1.03.28-1.73 1.76-1.73z" />
        </svg>
      </span>
      {label && (
        <span className="text-sm text-forest-200 transition-colors group-hover:text-cream">
          {label}
        </span>
      )}
    </a>
  );
}
