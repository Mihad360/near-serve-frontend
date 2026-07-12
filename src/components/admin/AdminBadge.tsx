import { cn } from "@/lib/utils";

const STYLES: Record<string, string> = {
  success: "bg-[#e8f5e9] text-[#1b5e20]",
  warning: "bg-[#fff3e0] text-[#9a5b00]",
  danger: "bg-[#f5e6e6] text-[#8b1a1a]",
  info: "bg-[#e8eef8] text-[#1e4a8c]",
  muted: "bg-[#f0ebe4] text-warm",
};

export default function AdminBadge({
  label,
  tone = "muted",
}: {
  label: string;
  tone?: keyof typeof STYLES;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide uppercase",
        STYLES[tone],
      )}
    >
      {label}
    </span>
  );
}
