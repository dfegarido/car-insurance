const STAR_PATH =
  "M10 1.5 12.2 7.3 18.1 7.3 13.4 11.2 15.6 17 10 13.6 4.4 17 6.6 11.2 1.9 7.3 7.8 7.3Z";

/** Inline SVG — stays sharp at any screen density (replaces raster star.webp). */
export function StarRating({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={100}
      height={20}
      viewBox="0 0 100 20"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="presentation"
    >
      {[0, 20, 40, 60, 80].map((x) => (
        <path key={x} d={STAR_PATH} fill="#005a9f" transform={`translate(${x}, 0)`} />
      ))}
    </svg>
  );
}
