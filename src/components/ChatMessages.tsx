import { useCallback, useEffect, useRef } from "react";
import LiteratureReport from "./LiteratureReport";
import type { ChatMessage } from "@/pages/Index";

interface ChatMessagesProps {
  messages: ChatMessage[];
  isLoading: boolean;
  onDeleteMessage: (index: number) => void;
}

const ChatMessages = ({ messages, isLoading, onDeleteMessage }: ChatMessagesProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 pt-6 pb-4 space-y-4">
      {messages.map((msg, i) => (
        <div key={i} className="animate-fade-in">
          {msg.type === "user" ? (
            <div className="flex justify-end">
              <div className="bg-primary text-primary-foreground rounded-2xl rounded-br-md px-4 py-2.5 max-w-[80%] text-sm">
                {msg.content}
              </div>
            </div>
          ) : (
            <div className="flex justify-start">
              <div className="max-w-full w-full space-y-2">
                <LiteratureReport
                  content={msg.content}
                  papers={msg.results || []}
                  onDelete={() => {
                    // Delete this AI message and the preceding user message
                    onDeleteMessage(i);
                  }}
                />
              </div>
            </div>
          )}
        </div>
      ))}

      {isLoading && (
        <div className="flex justify-start animate-fade-in">
          <div className="w-full bg-card border border-border rounded-xl p-6 animate-pulse space-y-3">
            <div className="h-3 bg-muted rounded w-1/4" />
            <div className="h-3 bg-muted rounded w-full" />
            <div className="h-3 bg-muted rounded w-5/6" />
            <div className="h-3 bg-muted rounded w-full" />
            <div className="h-3 bg-muted rounded w-3/4" />
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
};

export default ChatMessages;
