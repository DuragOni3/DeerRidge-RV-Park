// DeerRidge buck logo (public/photos/logo.jpg). The `mark` prop is unused now
// that the real logo is an image, but kept so existing callers don't break.
export default function Logo({ className = "", mark, showText = true, light = false, size = 36 }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <img
        src="/photos/logo.jpg"
        alt="DeerRidge RV Park logo"
        width={size}
        height={size}
        style={{ width: size, height: size }}
        className="shrink-0 rounded-full object-cover ring-1 ring-cream/20"
      />
      {showText && (
        <span className="flex flex-col leading-none">
          <span
            className={`font-serif text-2xl font-semibold tracking-tight ${
              light ? "text-cream" : "text-forest-800"
            }`}
          >
            DeerRidge
          </span>
          <span
            className={`mt-1 text-[0.75rem] font-medium uppercase tracking-[0.3em] ${
              light ? "text-forest-100" : "text-forest-500"
            }`}
          >
            RV Park
          </span>
        </span>
      )}
    </span>
  );
}
