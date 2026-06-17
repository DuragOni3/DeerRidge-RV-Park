// Photo placeholder. Swap each one for a real image:
//   <Image src="/photos/your-photo.jpg" alt="..." fill className="object-cover" />
export default function PhotoPlaceholder({ label = "Photo", className = "", rounded = "rounded-2xl" }) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${rounded} border border-forest-200 bg-forest-50 ${className}`}
    >
      {/* Subtle pattern so empty slots read as intentional placeholders */}
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 14px, rgba(31,81,40,0.06) 14px, rgba(31,81,40,0.06) 28px)",
        }}
      />
      <div className="relative flex flex-col items-center gap-2 px-4 text-center">
        <svg
          viewBox="0 0 24 24"
          width="28"
          height="28"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-forest-400"
        >
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <circle cx="8.5" cy="9.5" r="1.5" />
          <path d="M21 16l-5-5L5 20" />
        </svg>
        <span className="text-xs font-medium uppercase tracking-wide text-forest-500">
          {label}
        </span>
      </div>
    </div>
  );
}
