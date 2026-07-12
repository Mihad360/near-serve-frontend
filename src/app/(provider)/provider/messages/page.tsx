import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { mockProviderConversations } from "@/data/providerMock";
import { formatRelativeTime } from "@/lib/customer/format";
import { ROUTES } from "@/utils/navigation";
import { cn } from "@/lib/utils";
import PageHeader from "@/components/shared/app/PageHeader";
import Avatar from "@/components/shared/app/Avatar";
import EmptyState from "@/components/shared/app/EmptyState";

export default function ProviderMessagesPage() {
  const sorted = [...mockProviderConversations].sort(
    (a, b) =>
      new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime(),
  );

  return (
    <div>
      <PageHeader
        eyebrow="Inbox"
        title="Messages"
        description="Chat with customers about your jobs and bids."
      />

      {sorted.length === 0 ? (
        <EmptyState
          icon={<MessageCircle className="size-6" />}
          title="No conversations yet"
          description="Accepted bids open a chat with the customer here."
        />
      ) : (
        <ul className="space-y-2.5">
          {sorted.map((conv, i) => (
            <li key={conv.id} className="animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
              <Link
                href={ROUTES.PROVIDER_CONVERSATION(conv.id)}
                className={cn(
                  "app-surface app-surface-hover flex items-start gap-4 rounded-2xl p-4 md:p-5",
                  conv.unreadCount > 0 && "border-l-[3px] border-l-brand",
                )}
              >
                <Avatar name={conv.participantName} pulse={conv.unreadCount > 0} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-ink">
                        {conv.participantName}
                      </p>
                      <p className="text-xs text-muted mt-0.5 truncate">
                        {conv.jobTitle}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span className="text-[11px] text-muted tabular-nums">
                        {formatRelativeTime(conv.lastMessageAt)}
                      </span>
                      {conv.unreadCount > 0 && (
                        <span className="size-5 rounded-full bg-brand text-white text-[10px] font-bold flex items-center justify-center shadow-[0_2px_8px_rgba(199,10,36,0.35)]">
                          {conv.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                  <p
                    className={cn(
                      "mt-2 text-sm truncate",
                      conv.unreadCount > 0
                        ? "text-ink font-medium"
                        : "text-muted",
                    )}
                  >
                    {conv.lastMessage}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
