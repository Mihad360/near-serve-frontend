import { cn } from "@/lib/utils";

const PALETTES = [
  "from-[#2a1a12] to-[#5c3d2e]",
  "from-[#1a1208] to-[#3d2a1c]",
  "from-[#4a1a1f] to-[#8b2a32]",
  "from-[#2c2418] to-[#6b5244]",
  "from-[#1e2a1a] to-[#3d4f35]",
] as const;

type AvatarProps = {
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  pulse?: boolean;
};

const SIZES = {
  sm: "size-9 text-sm",
  md: "size-11 text-base",
  lg: "size-14 text-xl",
  xl: "size-16 text-2xl",
} as const;

function paletteFor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return PALETTES[Math.abs(hash) % PALETTES.length];
}

export default function Avatar({
  name,
  size = "md",
  className,
  pulse,
}: AvatarProps) {
  const initial = name.trim().charAt(0).toUpperCase() || "?";

  return (
    <div className={cn("relative shrink-0", className)}>
      {pulse && (
        <span
          aria-hidden
          className="absolute inset-0 rounded-full bg-brand/25 animate-pulse-ring"
        />
      )}
      <div
        className={cn(
          "relative flex items-center justify-center rounded-full bg-gradient-to-br text-cream font-fraunces font-semibold shadow-[0_4px_14px_rgba(26,18,8,0.12)] ring-2 ring-white/80",
          SIZES[size],
          paletteFor(name),
        )}
        aria-hidden
      >
        {initial}
      </div>
    </div>
  );
}
