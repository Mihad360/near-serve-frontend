"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MapPin, ArrowRight, Gavel, CheckCircle2, Clock, Table as TableIcon, LayoutGrid } from "lucide-react";
import { mockProviderBids } from "@/data/providerMock";
import { BidStatusChip } from "@/components/provider/ProviderChips";
import {
  formatCurrency,
  formatRelativeTime,
} from "@/lib/customer/format";
import { ROUTES } from "@/utils/navigation";
import { cn } from "@/lib/utils";
import type { BidStatus, ProviderBid } from "@/types/job";
import PageHeader from "@/components/shared/app/PageHeader";
import EmptyState from "@/components/shared/app/EmptyState";
import UseTable from "@/components/ui/UseTable";
import { useGetMyBidsQuery } from "@/redux/api/bidApi";

const FILTERS: Array<"all" | BidStatus> = [
  "all",
  "pending",
  "accepted",
  "lost",
];

const mapBackendProviderBid = (b: any): ProviderBid => ({
  id: b._id || b.id,
  jobId: b.jobId?._id || b.jobId,
  providerId: b.providerId,
  providerName: "You",
  providerRating: 5,
  providerJobsCompleted: 0,
  amount: b.price || 0,
  message: b.message || "",
  eta: b.etaMinutes ? `${b.etaMinutes} mins` : "1 hour",
  createdAt: b.createdAt || new Date().toISOString(),
  status: b.status === "rejected" ? "lost" : (b.status || "pending"),
  jobTitle: b.jobId?.title || "Service Job",
  jobCategory: b.jobId?.category || "Service",
  customerName: b.jobId?.customerId?.name || "Customer",
  jobBudget: b.jobId?.budget || b.price || 0,
  jobLocation: {
    address: b.jobId?.location?.address || "Service Location",
    lat: b.jobId?.location?.coordinates?.[1] || 37.7649,
    lng: b.jobId?.location?.coordinates?.[0] || -122.4214,
  },
});

export default function MyBidsPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<"all" | BidStatus>("all");
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");

  const { data: bidsResponse, isLoading } = useGetMyBidsQuery(
    filter !== "all" ? { status: filter === "lost" ? "rejected" : filter } : {}
  );

  const rawBids = bidsResponse?.data?.result || bidsResponse?.data;
  const bids: ProviderBid[] = Array.isArray(rawBids)
    ? rawBids.map(mapBackendProviderBid)
    : mockProviderBids;

  const filtered =
    filter === "all"
      ? bids
      : bids.filter((b) => b.status === filter);

  const acceptedBids = bids.filter((b) => b.status === "accepted");

  const getJobHref = (bid: ProviderBid) =>
    bid.status === "accepted"
      ? ROUTES.PROVIDER_ACTIVE(bid.jobId)
      : ROUTES.PROVIDER_JOB(bid.jobId);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Quotes & Proposals"
        title="My submitted bids"
        description="Monitor status updates on quotes you’ve sent to local customers."
      />

      {/* Action banner for accepted bids */}
      {acceptedBids.length > 0 && (
        <div className="bg-emerald-50 border border-emerald-200/80 rounded-3xl p-6 animate-fade-up shadow-xs">
          <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
            <CheckCircle2 className="size-4 text-emerald-600" />
            <span>{acceptedBids.length} Bid{acceptedBids.length === 1 ? "" : "s"} Accepted! Client Pre-funded the Job</span>
          </div>
          <p className="text-xs text-emerald-900 font-medium mb-4">
            Payment is safely held with NearServe. Start work and coordinate directly with the customer.
          </p>
          <div className="flex flex-wrap gap-2">
            {acceptedBids.map((b) => (
              <Link
                key={b.id}
                href={ROUTES.PROVIDER_ACTIVE(b.jobId)}
                className="inline-flex items-center gap-2 rounded-2xl bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 hover:bg-emerald-800 transition-all shadow-xs"
              >
                <span>Start Job: {b.jobTitle.length > 24 ? `${b.jobTitle.slice(0, 24)}…` : b.jobTitle}</span>
                <ArrowRight className="size-3.5" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Filter Tabs & View Mode Switcher */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 animate-fade-up hero-delay-1">
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none flex-1">
          {FILTERS.map((f) => {
            const count = f === "all" ? bids.length : bids.filter((b) => b.status === f).length;
            const active = filter === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={cn(
                  "shrink-0 rounded-full px-4 py-2.5 text-xs font-bold transition-all duration-200 flex items-center gap-1.5 capitalize",
                  active
                    ? "bg-ink text-white shadow-xs"
                    : "bg-stone-100 text-warm hover:bg-stone-200/80",
                )}
              >
                <span>{f === "all" ? "All Bids" : f}</span>
                <span className={cn("text-[10px] px-1.5 py-0.2 rounded-full", active ? "bg-white/20 text-white" : "bg-stone-200 text-muted")}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex rounded-2xl bg-stone-100 p-1 shrink-0 self-end sm:self-center shadow-xs">
          <button
            type="button"
            onClick={() => setViewMode("table")}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all",
              viewMode === "table"
                ? "bg-white text-ink shadow-xs"
                : "text-stone-600 hover:text-ink",
            )}
            title="Table View"
          >
            <TableIcon className="size-3.5" />
            <span>Table</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("cards")}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all",
              viewMode === "cards"
                ? "bg-white text-ink shadow-xs"
                : "text-stone-600 hover:text-ink",
            )}
            title="Card View"
          >
            <LayoutGrid className="size-3.5" />
            <span>Cards</span>
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-stone-100 rounded-3xl p-10 text-center animate-fade-up">
          <EmptyState
            icon={<Gavel className="size-6 text-brand" />}
            title="No bids found"
            description="Explore the live job feed and quote on tasks in your neighborhood to fill your schedule."
            action={
              <Link
                href={ROUTES.PROVIDER_HOME}
                className="inline-flex items-center gap-2 rounded-2xl bg-brand text-white text-sm font-bold px-6 py-3 shadow-sm hover:bg-brand-dark transition-all"
              >
                <span>Open Job Feed</span>
                <ArrowRight className="size-4" />
              </Link>
            }
          />
        </div>
      ) : viewMode === "table" ? (
        <div className="bg-stone-100 rounded-3xl p-5 md:p-6 shadow-xs animate-fade-up">
          <div className="bg-white rounded-2xl overflow-hidden shadow-xs">
            <UseTable<ProviderBid>
              data={filtered}
              hover
              striped
              onRowClick={(row) => router.push(getJobHref(row))}
              columns={[
                {
                  key: "jobTitle",
                  title: "Job Details",
                  render: (row) => (
                    <div className="py-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-ink text-sm hover:text-brand transition-colors">
                          {row.jobTitle}
                        </span>
                        <span className="text-[10px] font-bold text-muted bg-stone-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
                          {row.jobCategory}
                        </span>
                      </div>
                      <p className="text-xs text-muted mt-0.5 line-clamp-1 max-w-md">
                        &ldquo;{row.message}&rdquo;
                      </p>
                    </div>
                  ),
                },
                {
                  key: "customer",
                  title: "Client",
                  render: (row) => (
                    <span className="text-xs font-semibold text-stone-700">
                      {row.customerName}
                    </span>
                  ),
                },
                {
                  key: "location",
                  title: "Location",
                  render: (row) => (
                    <div className="flex items-center gap-1.5 text-xs text-stone-700 font-medium">
                      <MapPin className="size-3.5 text-brand shrink-0" />
                      <span className="truncate max-w-[150px]">{row.jobLocation.address}</span>
                    </div>
                  ),
                },
                {
                  key: "amount",
                  title: "Your Quote",
                  render: (row) => (
                    <span className="font-fraunces font-bold text-ink text-sm tabular-nums">
                      {formatCurrency(row.amount)}
                    </span>
                  ),
                },
                {
                  key: "eta",
                  title: "ETA",
                  render: (row) => (
                    <span className="text-xs text-stone-600 font-medium">
                      {row.eta}
                    </span>
                  ),
                },
                {
                  key: "status",
                  title: "Status",
                  render: (row) => <BidStatusChip status={row.status} />,
                },
                {
                  key: "createdAt",
                  title: "Submitted",
                  align: "right",
                  render: (row) => (
                    <span className="text-xs text-muted tabular-nums">
                      {formatRelativeTime(row.createdAt)}
                    </span>
                  ),
                },
                {
                  key: "action",
                  title: "",
                  align: "right",
                  render: (row) => (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-brand hover:underline">
                      {row.status === "accepted" ? "Go to Job" : "View"} <ArrowRight className="size-3.5" />
                    </span>
                  ),
                },
              ]}
            />
          </div>
        </div>
      ) : (
        <ul className="space-y-3 animate-fade-up">
          {filtered.map((bid, i) => (
            <li key={bid.id}>
              <Link
                href={getJobHref(bid)}
                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-stone-100/90 hover:bg-white rounded-3xl p-6 transition-all duration-300 shadow-xs hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <BidStatusChip status={bid.status} />
                    <span className="text-xs text-muted font-medium flex items-center gap-1 tabular-nums">
                      <Clock className="size-3 text-muted/70" />
                      {formatRelativeTime(bid.createdAt)}
                    </span>
                  </div>
                  <h3 className="font-fraunces text-xl font-bold text-ink group-hover:text-brand transition-colors duration-200">
                    {bid.jobTitle}
                  </h3>
                  <p className="mt-1 text-sm text-muted line-clamp-1">
                    &ldquo;{bid.message}&rdquo;
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-xs font-semibold text-warm">
                    <span className="inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-full text-stone-700 shadow-xs">
                      <MapPin className="size-3 text-brand" />
                      {bid.jobLocation.address}
                    </span>
                    <span>Client: {bid.customerName}</span>
                    <span>ETA: {bid.eta}</span>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-stone-200/60">
                  <div>
                    <div className="text-[10px] text-muted uppercase font-bold sm:text-right">Your Quote</div>
                    <p className="font-fraunces text-2xl font-bold text-ink tabular-nums">
                      {formatCurrency(bid.amount)}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-brand group-hover:translate-x-1 transition-transform">
                    {bid.status === "accepted" ? "Go to Active Job" : "View Details"}
                    <ArrowRight className="size-3.5" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
