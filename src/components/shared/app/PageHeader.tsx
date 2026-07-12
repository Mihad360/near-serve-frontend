import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
};

export default function PageHeader({
  eyebrow,
  title,
  description,
  action,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 animate-fade-up",
        className,
      )}
    >
      <div className="min-w-0">
        {eyebrow && (
          <p className="text-xs uppercase tracking-[0.16em] text-muted font-medium mb-2">
            {eyebrow}
          </p>
        )}
        <h1 className="font-fraunces text-3xl md:text-4xl font-semibold text-ink tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="mt-2 text-muted text-sm md:text-base max-w-md leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
