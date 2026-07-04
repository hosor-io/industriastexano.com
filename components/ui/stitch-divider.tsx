export default function StitchDivider({ className = "" }: { className?: string }) {
  return <div role="separator" aria-hidden="true" className={`stitch-divider w-full ${className}`} />;
}
