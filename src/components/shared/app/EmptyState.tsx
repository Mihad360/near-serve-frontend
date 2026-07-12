import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type EmptyStateProps = {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
};

export default function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-dashed border-border-warm px-6 py-16 text-center",
        "bg-[linear-gradient(165deg,rgba(255,255,255,0.72)_0%,rgba(250,246,239,0.55)_100%)]",
        "animate-fade-up",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(199,10,36,0.06), transparent 42%), radial-gradient(circle at 80% 70%, rgba(26,18,8,0.04), transparent 45%)",
        }}
      />
      <div className="relative z-10 flex flex-col items-center">
        {icon && (
          <div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-white border border-border text-brand shadow-[0_8px_24px_rgba(26,18,8,0.06)] animate-float-slow">
            {icon}
          </div>
        )}
        <p className="font-fraunces text-xl md:text-2xl text-ink mb-2">{title}</p>
        <p className="text-sm text-muted max-w-sm leading-relaxed mb-6">
          {description}
        </p>
        {action}
      </div>
    </div>
  );
}
