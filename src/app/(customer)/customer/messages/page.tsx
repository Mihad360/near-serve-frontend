"use client";

import { Suspense, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { 
  MessageCircle, 
  Search, 
  Clock, 
  Send, 
  CheckCheck, 
  ArrowRight, 
  MapPin, 
  ShieldCheck, 
  User, 
  Sparkles,
  ArrowLeft
} from "lucide-react";
import { mockConversations, getConversationById } from "@/data/customerMock";
import { formatDateTime, formatRelativeTime } from "@/lib/customer/format";
import { ROUTES } from "@/utils/navigation";
import { cn } from "@/lib/utils";
import PageHeader from "@/components/shared/app/PageHeader";
import Avatar from "@/components/shared/app/Avatar";
import EmptyState from "@/components/shared/app/EmptyState";

function CustomerMessagesSplitView() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get("id") || mockConversations[0]?.id || null;

  const [selectedId, setSelectedId] = useState<string | null>(initialId);
  const [search, setSearch] = useState("");
  const [draft, setDraft] = useState("");
  const [extraMessages, setExtraMessages] = useState<Record<string, Array<{ id: string; text: string; createdAt: string }>>>({});

  const sorted = [...mockConversations].sort(
    (a, b) =>
      new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime(),
  );

  const filtered = sorted.filter(
    (c) =>
      c.participantName.toLowerCase().includes(search.toLowerCase()) ||
      c.jobTitle.toLowerCase().includes(search.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(search.toLowerCase())
  );

  const activeConversation = selectedId
    ? getConversationById(selectedId) || mockConversations.find((c) => c.id === selectedId) || null
    : null;

  const currentExtra = selectedId ? extraMessages[selectedId] || [] : [];
  const currentMessages = activeConversation
    ? [
        ...activeConversation.messages,
        ...currentExtra.map((m) => ({
          id: m.id,
          conversationId: activeConversation.id,
          senderId: "cust-1",
          senderRole: "customer" as const,
          text: m.text,
          createdAt: m.createdAt,
        })),
      ]
    : [];

  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text || !selectedId) return;

    setExtraMessages((prev) => ({
      ...prev,
      [selectedId]: [
        ...(prev[selectedId] || []),
        {
          id: `local-${Date.now()}`,
          text,
          createdAt: new Date().toISOString(),
        },
      ],
    }));
    setDraft("");
  };

  return (
    <div className="space-y-6 w-full">
      <PageHeader
        eyebrow="Direct Messages"
        title="Messages"
        description="Chat directly with booked service providers regarding timing, access, and job details."
      />

      {/* Main Split-Pane Container */}
      <div className="bg-stone-100 rounded-3xl p-3 md:p-4 shadow-xs flex flex-col md:flex-row gap-3 h-[calc(100vh-14rem)] min-h-[580px] max-h-[850px] overflow-hidden">
        {/* Left Pane: Conversation List */}
        <div className={cn(
          "w-full md:w-[320px] lg:w-[360px] shrink-0 flex flex-col bg-white rounded-2xl overflow-hidden shadow-xs border border-stone-200/60",
          selectedId && "hidden md:flex"
        )}>
          {/* Search Header */}
          <div className="p-3.5 border-b border-stone-100 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-fraunces text-base font-bold text-ink">Inbox</span>
              <span className="text-[11px] font-bold text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full">
                {filtered.length} chats
              </span>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-stone-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search chats..."
                className="w-full rounded-xl bg-stone-50 pl-9 pr-3 py-2 text-xs font-medium text-ink placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-brand/20 border-none"
              />
            </div>
          </div>

          {/* List Items */}
          <div className="flex-1 overflow-y-auto divide-y divide-stone-100 scrollbar-none">
            {filtered.length === 0 ? (
              <div className="p-8 text-center text-xs text-muted">
                No chats found.
              </div>
            ) : (
              filtered.map((conv) => {
                const isSelected = selectedId === conv.id;
                const isUnread = conv.unreadCount > 0;
                return (
                  <button
                    key={conv.id}
                    type="button"
                    onClick={() => setSelectedId(conv.id)}
                    className={cn(
                      "w-full text-left p-3.5 flex items-start gap-3 transition-colors duration-150 relative group",
                      isSelected
                        ? "bg-brand/5 border-l-4 border-l-brand"
                        : "hover:bg-stone-50",
                    )}
                  >
                    <div className="relative shrink-0">
                      <Avatar name={conv.participantName} size="sm" pulse={isUnread} />
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className={cn("text-xs truncate", isSelected ? "font-bold text-brand" : "font-bold text-ink")}>
                          {conv.participantName}
                        </span>
                        <span className="text-[10px] text-stone-400 tabular-nums shrink-0">
                          {formatRelativeTime(conv.lastMessageAt)}
                        </span>
                      </div>

                      <div className="text-[10px] text-muted font-medium truncate mb-1 bg-stone-100/70 px-1.5 py-0.2 rounded inline-block max-w-[170px]">
                        {conv.jobTitle}
                      </div>

                      <p className={cn("text-xs truncate", isUnread ? "text-ink font-semibold" : "text-muted")}>
                        {conv.lastMessage}
                      </p>
                    </div>

                    {isUnread && (
                      <span className="size-2 rounded-full bg-brand shrink-0 self-center" />
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Pane: Active Chat Area */}
        <div className={cn(
          "flex-1 flex flex-col bg-white rounded-2xl overflow-hidden shadow-xs border border-stone-200/60",
          !selectedId && "hidden md:flex"
        )}>
          {activeConversation ? (
            <>
              {/* Chat Top Header */}
              <div className="px-4 py-3 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedId(null)}
                    className="md:hidden p-1.5 rounded-lg hover:bg-stone-200 text-stone-600"
                    aria-label="Back to conversation list"
                  >
                    <ArrowLeft className="size-4" />
                  </button>

                  <div className="relative shrink-0">
                    <Avatar name={activeConversation.participantName} size="sm" />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-bold text-ink text-sm leading-tight">
                        {activeConversation.participantName}
                      </h2>
                      <span className="text-[10px] text-emerald-700 bg-emerald-50 font-bold px-2 py-0.2 rounded-full">
                        Online
                      </span>
                    </div>
                    <Link
                      href={ROUTES.CUSTOMER_JOB(activeConversation.jobId)}
                      className="text-[11px] text-muted hover:text-brand font-medium transition-colors line-clamp-1 inline-block"
                    >
                      Job: {activeConversation.jobTitle}
                    </Link>
                  </div>
                </div>

                <Link
                  href={ROUTES.CUSTOMER_JOB(activeConversation.jobId)}
                  className="hidden sm:inline-flex items-center gap-1 bg-white text-ink text-xs font-bold px-3 py-1.5 rounded-xl border border-stone-200 shadow-xs hover:bg-stone-50 transition-all"
                >
                  <span>View Job</span>
                  <ArrowRight className="size-3 text-muted" />
                </Link>
              </div>

              {/* Chat Messages Body */}
              <div className="flex-1 overflow-y-auto p-4 md:p-5 space-y-3 bg-[#fdfcf9] scrollbar-none">
                <div className="text-center my-2">
                  <span className="text-[11px] font-medium text-stone-400 bg-stone-100 px-3 py-1 rounded-full">
                    Direct conversation protected by NearServe
                  </span>
                </div>

                {currentMessages.map((msg) => {
                  const mine = msg.senderRole === "customer";
                  return (
                    <div
                      key={msg.id}
                      className={cn(
                        "flex items-end gap-2",
                        mine ? "justify-end" : "justify-start",
                      )}
                    >
                      {!mine && (
                        <Avatar name={activeConversation.participantName} size="sm" />
                      )}

                      <div
                        className={cn(
                          "max-w-[75%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed shadow-xs",
                          mine
                            ? "bg-brand text-white rounded-br-xs shadow-brand/10"
                            : "bg-white text-ink rounded-bl-xs border border-stone-200/70",
                        )}
                      >
                        <p className="font-medium">{msg.text}</p>
                        <div
                          className={cn(
                            "mt-1 flex items-center justify-end gap-1 text-[10px]",
                            mine ? "text-white/75" : "text-stone-400",
                          )}
                        >
                          <span>{formatDateTime(msg.createdAt)}</span>
                          {mine && <CheckCheck className="size-3 text-white/90" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Chat Input Bar */}
              <form
                onSubmit={handleSend}
                className="p-3 border-t border-stone-100 bg-white flex items-center gap-2"
              >
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder={`Reply to ${activeConversation.participantName}…`}
                  className="flex-1 rounded-xl bg-stone-100/80 px-4 py-2.5 text-xs sm:text-sm text-ink placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-brand/20 font-medium"
                />
                <button
                  type="submit"
                  aria-label="Send message"
                  className="size-10 rounded-xl bg-brand hover:bg-brand-dark text-white flex items-center justify-center shrink-0 shadow-md shadow-brand/20 transition-all hover:scale-105 cursor-pointer"
                >
                  <Send className="size-4" />
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-muted">
              <div className="w-14 h-14 rounded-2xl bg-stone-100 flex items-center justify-center text-brand mb-3 shadow-xs">
                <MessageCircle className="size-7" />
              </div>
              <h3 className="font-fraunces text-lg font-bold text-ink mb-1">
                Select a conversation
              </h3>
              <p className="text-xs text-muted max-w-xs">
                Choose a provider from the left list to review messages and coordinate job details.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MessagesInboxPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-sm text-muted">Loading messages…</div>
      }
    >
      <CustomerMessagesSplitView />
    </Suspense>
  );
}
