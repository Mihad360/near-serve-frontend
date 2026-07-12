"use client";

import { use, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, Send } from "lucide-react";
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
        <h1 className="font-fraunces text-2xl text-ink mb-3">
          Conversation not found
        </h1>
        <Link
          href={ROUTES.PROVIDER_MESSAGES}
          className="text-brand font-medium text-sm"
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
    <div className="flex flex-col h-[calc(100vh-8rem)] lg:h-[calc(100vh-4rem)] max-w-2xl -mx-1">
      <div className="shrink-0 mb-4 animate-fade-up">
        <Link
          href={ROUTES.PROVIDER_MESSAGES}
          className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink mb-4 transition-colors"
        >
          <ArrowLeft className="size-4" />
          Inbox
        </Link>
        <div className="flex items-center gap-3">
          <Avatar name={conversation.participantName} />
          <div>
            <h1 className="font-fraunces text-xl font-semibold text-ink">
              {conversation.participantName}
            </h1>
            <Link
              href={jobHref}
              className="text-xs text-muted hover:text-brand transition-colors"
            >
              {conversation.jobTitle}
            </Link>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto rounded-2xl border border-border bg-[linear-gradient(180deg,rgba(255,255,255,0.95)_0%,rgba(250,246,239,0.5)_100%)] p-4 md:p-5 space-y-3 shadow-[0_8px_32px_rgba(26,18,8,0.05)]">
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
                  "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm",
                  mine
                    ? "bg-brand text-white rounded-br-md shadow-[0_4px_14px_rgba(199,10,36,0.2)]"
                    : "bg-white text-ink border border-border rounded-bl-md",
                )}
              >
                <p>{msg.text}</p>
                <p
                  className={cn(
                    "mt-1 text-[10px]",
                    mine ? "text-white/60" : "text-muted",
                  )}
                >
                  {formatDateTime(msg.createdAt)}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <form
        onSubmit={handleSend}
        className="shrink-0 mt-3 flex gap-2 items-end"
      >
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Write a message…"
          className="flex-1 rounded-xl border border-border bg-white/95 px-4 py-3 text-sm text-ink placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand shadow-sm"
        />
        <button
          type="submit"
          aria-label="Send"
          className="app-btn size-12 rounded-xl bg-brand hover:bg-brand-dark text-white flex items-center justify-center shrink-0 shadow-[0_4px_16px_rgba(199,10,36,0.25)]"
        >
          <Send className="size-4" />
        </button>
      </form>
    </div>
  );
}
