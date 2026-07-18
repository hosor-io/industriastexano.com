type CareLabelProps = {
  children: React.ReactNode;
  tilt?: "left" | "right" | "none";
  className?: string;
};

/** The rotated "garment tag" badge motif used throughout the Stitch design (EST. 1980, SPEC:, MOD:, etc). */
export default function CareLabel({ children, tilt = "left", className = "" }: CareLabelProps) {
  const tiltClass =
    tilt === "left" ? "care-label-tilt-left" : tilt === "right" ? "care-label-tilt-right" : "";
  return (
    <div
      className={`inline-block border-2 border-ink bg-surface-container-lowest px-3 py-2 hard-shadow ${tiltClass} ${className}`}
    >
      {children}
    </div>
  );
}
