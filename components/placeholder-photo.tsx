import Image from "next/image";

type PlaceholderPhotoProps = {
  label: string;
  alt: string;
  src?: string;
  className?: string;
  grayscaleHover?: boolean;
};

/**
 * Fills the exact slot/aspect-ratio Stitch designed for each product/mill
 * photo, but with a clearly labeled placeholder pattern instead of Stitch's
 * temporary Google-hosted preview images. Pass `src` once the client's real
 * photography is available and this renders a normal optimized next/image.
 */
export default function PlaceholderPhoto({
  label,
  alt,
  src,
  className = "",
  grayscaleHover = false,
}: PlaceholderPhotoProps) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className={`object-cover ${grayscaleHover ? "grayscale transition-all duration-700 hover:grayscale-0" : ""} ${className}`}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={`flex h-full w-full flex-col items-center justify-center gap-2 bg-surface-container-high text-on-surface-variant ${className}`}
      style={{
        backgroundImage:
          "repeating-linear-gradient(135deg, var(--color-surface-container-high) 0px, var(--color-surface-container-high) 10px, var(--color-surface-container) 10px, var(--color-surface-container) 20px)",
      }}
    >
      <span className="material-symbols-outlined text-3xl opacity-60" aria-hidden="true">
        photo_camera
      </span>
      <span className="font-label-tech text-[10px] uppercase tracking-widest opacity-70 text-center px-4">
        Foto pendiente — {label}
      </span>
    </div>
  );
}
