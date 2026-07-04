import Image from "next/image";

type LogoProps = {
  className?: string;
  /** "ink" for light backgrounds, "gold" for the navy header/footer, "white" for dark photo overlays */
  tone?: "ink" | "gold" | "white";
};

const sources = {
  ink: "/brand/logo-ink.png",
  gold: "/brand/logo-gold.png",
  white: "/brand/logo-white.png",
};

export default function Logo({ className = "h-10", tone = "ink" }: LogoProps) {
  return (
    <Image
      src={sources[tone]}
      alt="Industrias Texano"
      width={960}
      height={364}
      priority
      className={`w-auto object-contain ${className}`}
    />
  );
}
