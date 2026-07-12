import Link from "next/link";
import { MapPin, MessageSquare, ChevronRight } from "lucide-react";
import type { Job } from "@/types/job";
import { ROUTES } from "@/utils/navigation";
import StatusChip from "./StatusChip";
import { formatCurrency, formatRelativeTime } from "@/lib/customer/format";

type JobCardProps = {
  job: Job;
  index?: number;
};

export default function JobCard({ job, index = 0 }: JobCardProps) {
  return (
    <Link
      href={ROUTES.CUSTOMER_JOB(job.id)}
      className="group block app-surface app-surface-hover rounded-2xl p-5 md:p-6 animate-fade-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <StatusChip status={job.status} />
        <span className="text-xs text-muted shrink-0 tabular-nums">
          {formatRelativeTime(job.updatedAt)}
        </span>
      </div>

      <h3 className="font-fraunces text-xl font-semibold text-ink group-hover:text-brand transition-colors duration-300 leading-snug">
        {job.title}
      </h3>

      <p className="mt-2 text-sm text-muted line-clamp-2 leading-relaxed">
        {job.description}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-warm">
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="size-3.5 text-brand/70" />
          <span className="truncate max-w-[200px]">{job.location.address}</span>
        </span>
        <span className="font-semibold text-ink tabular-nums">
          {formatCurrency(job.budget)}
        </span>
        {job.bidCount > 0 && (
          <span className="inline-flex items-center gap-1 text-muted">
            <MessageSquare className="size-3.5" />
            {job.bidCount} bid{job.bidCount === 1 ? "" : "s"}
          </span>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-border/80 flex items-center justify-between">
        <span className="text-xs font-medium text-muted uppercase tracking-wider">
          {job.category}
          {job.providerName ? ` · ${job.providerName}` : ""}
        </span>
        <span className="inline-flex items-center gap-1 text-sm font-medium text-brand opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          View
          <ChevronRight className="size-4" />
        </span>
      </div>
    </Link>
  );
}
