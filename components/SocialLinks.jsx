import { site } from "@/lib/site";

// Monochrome social circles that match the dark-green / cream vibe.
function Circle({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor={label}
      aria-label={`DeerRidge RV Park on ${label}`}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-forest-700 text-cream transition-colors duration-300 hover:border-forest-300 hover:bg-cream hover:text-forest-950"
    >
      {children}
    </a>
  );
}

export default function SocialLinks({ className = "" }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {/* Facebook */}
      <Circle href={site.facebookUrl} label="Facebook">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M15.12 5.32H17V2.14A26.1 26.1 0 0 0 14.26 2c-2.72 0-4.58 1.66-4.58 4.7v2.6H6.61v3.56h3.07V22h3.68v-9.14h3.06l.46-3.56h-3.52V7.05c0-1.03.28-1.73 1.76-1.73z" />
        </svg>
      </Circle>
      {/* Campspot (tent) */}
      <Circle href={site.bookingUrl} label="Campspot">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 4 3.5 19h17L12 4Z" />
          <path d="M12 11.5 9 19" />
          <path d="M12 11.5 15 19" />
        </svg>
      </Circle>
    </div>
  );
}
