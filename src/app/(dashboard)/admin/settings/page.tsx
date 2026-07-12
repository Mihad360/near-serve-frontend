"use client";

import PageHeader from "@/components/shared/app/PageHeader";

export default function AdminSettingsPage() {
  return (
    <div className="max-w-xl">
      <PageHeader
        eyebrow="Admin"
        title="Settings"
        description="Platform settings will live here (fees, support email, feature flags). Preview shell for now."
      />
      <div className="app-surface rounded-2xl p-6 space-y-4 text-sm text-muted">
        <p>
          Connected APIs are ready under{" "}
          <code className="text-xs text-ink">src/redux/api/adminApi.ts</code>.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Providers — approve / reject</li>
          <li>Users — block / unblock</li>
          <li>Jobs — cancel</li>
          <li>Payments — list + detail</li>
          <li>Disputes — resolve</li>
          <li>Reviews — delete</li>
        </ul>
      </div>
    </div>
  );
}
