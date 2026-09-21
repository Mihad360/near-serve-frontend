"use client";

import { use, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, Send, CheckCheck } from "lucide-react";
import { getProviderConversationById } from "@/data/providerMock";
import { formatDateTime } from "@/lib/customer/format";
import { ROUTES } from "@/utils/navigation";
import { cn } from "@/lib/utils";
import Avatar from "@/components/shared/app/Avatar";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default function ProviderConversationPage({ params }: PageProps) {
  const { id } = use(params);
  const conversation = getProviderConversationById(id);
  const [draft, setDraft] = useState("");
  const [extra, setExtra] = useState<
    Array<{ id: string; text: string; createdAt: string }>
  >([]);

  if (!conversation) {
    return (
      <div className="py-20 text-center animate-fade-up">
        <h1 className="font-fraunces text-2xl font-bold text-ink mb-3">
          Conversation not found
        </h1>
        <Link
          href={ROUTES.PROVIDER_MESSAGES}
          className="text-brand font-bold text-sm"
        >
          Back to inbox
        </Link>
      </div>
    );
  }

  const messages = [
    ...conversation.messages,
    ...extra.map((m) => ({
      id: m.id,
      conversationId: conversation.id,
      senderId: "prov-1",
      senderRole: "provider" as const,
      text: m.text,
      createdAt: m.createdAt,
    })),
  ];

  function handleSend(e: FormEvent) {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setExtra((prev) => [
      ...prev,
      {
        id: `local-${Date.now()}`,
        text,
        createdAt: new Date().toISOString(),
      },
    ]);
    setDraft("");
  }

  const jobHref =
    conversation.jobId.startsWith("job-a") ||
    conversation.jobId === "job-a1" ||
    conversation.jobId === "job-a2"
      ? ROUTES.PROVIDER_ACTIVE(conversation.jobId)
      : ROUTES.PROVIDER_JOB(conversation.jobId);

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] lg:h-[calc(100vh-5rem)] max-w-3xl mx-auto space-y-3">
      {/* Header bar */}
      <div className="shrink-0 bg-stone-100 rounded-2xl px-5 py-3.5 shadow-xs flex items-center justify-between gap-3 animate-fade-up">
        <div className="flex items-center gap-3">
          <Link
            href={ROUTES.PROVIDER_MESSAGES}
            className="p-1.5 rounded-xl hover:bg-stone-200 text-muted transition-colors shrink-0"
            title="Back to inbox"
          >
            <ArrowLeft className="size-4" />
          </Link>
          <Avatar name={conversation.participantName} size="sm" />
          <div>
            <h1 className="font-bold text-ink text-sm leading-tight">
              {conversation.participantName}
            </h1>
            <Link
              href={jobHref}
              className="text-[11px] text-muted hover:text-brand font-medium transition-colors line-clamp-1"
            >
              Job: {conversation.jobTitle}
            </Link>
          </div>
        </div>

        <Link
          href={jobHref}
          className="hidden sm:inline-flex items-center gap-1.5 bg-white text-ink text-xs font-bold px-3.5 py-1.5 rounded-xl shadow-xs hover:bg-stone-50 transition-all"
        >
          <span>View Job Details</span>
        </Link>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto bg-stone-100/70 rounded-3xl p-4 md:p-6 space-y-3 shadow-xs">
        {messages.map((msg, i) => {
          const mine = msg.senderRole === "provider";
          return (
            <div
              key={msg.id}
              className={cn(
                "flex chat-bubble-in",
                mine ? "justify-end" : "justify-start",
              )}
              style={{ animationDelay: `${Math.min(i, 8) * 40}ms` }}
            >
              <div
                className={cn(
                  "max-w-[78%] rounded-3xl px-4 py-2.5 text-sm leading-relaxed shadow-xs",
                  mine
                    ? "bg-brand text-white rounded-br-xs shadow-md shadow-brand/15"
                    : "bg-white text-ink rounded-bl-xs shadow-xs",
                )}
              >
                <p className="font-medium text-xs sm:text-sm">{msg.text}</p>
                <div
                  className={cn(
                    "mt-1 flex items-center justify-end gap-1 text-[10px]",
                    mine ? "text-white/70" : "text-muted",
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

      {/* Input box */}
      <form
        onSubmit={handleSend}
        className="shrink-0 bg-stone-100 rounded-2xl p-2 flex gap-2 items-center shadow-xs"
      >
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Write a message to customer…"
          className="flex-1 rounded-xl bg-white px-4 py-3 text-xs sm:text-sm text-ink placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-brand/20 shadow-xs font-medium"
        />
        <button
          type="submit"
          aria-label="Send"
          className="size-11 rounded-xl bg-brand hover:bg-brand-dark text-white flex items-center justify-center shrink-0 shadow-md shadow-brand/25 transition-all hover:scale-105"
        >
          <Send className="size-4" />
        </button>
      </form>
    </div>
  );
}
