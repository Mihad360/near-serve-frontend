import Link from "next/link";
import { MapPin, MessageSquare, ChevronRight, Clock, ArrowRight } from "lucide-react";
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
      className="group block bg-stone-100/90 hover:bg-white rounded-3xl p-6 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 animate-fade-up"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <StatusChip status={job.status} />
        <span className="text-xs text-muted flex items-center gap-1 font-medium tabular-nums">
          <Clock className="w-3 h-3 text-muted/70" />
          {formatRelativeTime(job.updatedAt)}
        </span>
      </div>

      <h3 className="font-fraunces text-xl font-semibold text-ink group-hover:text-brand transition-colors duration-200 leading-snug">
        {job.title}
      </h3>

      <p className="mt-2 text-sm text-muted line-clamp-2 leading-relaxed">
        {job.description}
      </p>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-stone-200/60">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-warm">
          <span className="inline-flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-full text-stone-700 shadow-xs">
            <MapPin className="size-3 text-brand" />
            <span className="truncate max-w-[180px]">{job.location.address}</span>
          </span>
          <span className="bg-brand/10 text-brand px-2.5 py-1 rounded-full font-bold">
            Budget: {formatCurrency(job.budget)}
          </span>
          {job.bidCount > 0 && (
            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-full font-bold">
              <MessageSquare className="size-3 text-emerald-600" />
              {job.bidCount} bid{job.bidCount === 1 ? "" : "s"}
            </span>
          )}
        </div>

        <span className="inline-flex items-center gap-1 text-xs font-bold text-brand group-hover:translate-x-1 transition-transform duration-200">
          View details
          <ArrowRight className="size-3.5" />
        </span>
      </div>
    </Link>
  );
}
