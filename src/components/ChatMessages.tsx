import { useEffect, useRef } from "react";
import ResultCard from "./ResultCard";
import type { ChatMessage } from "@/pages/Index";

interface ChatMessagesProps {
  messages: ChatMessage[];
  isLoading: boolean;
}

const ChatMessages = ({ messages, isLoading }: ChatMessagesProps) => {
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
                <p className="text-sm text-muted-foreground mb-3">{msg.content}</p>
                {msg.results?.map((result, j) => (
                  <ResultCard key={j} {...result} />
                ))}
              </div>
            </div>
          )}
        </div>
      ))}

      {isLoading && (
        <div className="flex justify-start animate-fade-in">
          <div className="space-y-3 w-full">
            {[1, 2].map((i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-5 animate-pulse">
                <div className="h-4 bg-muted rounded w-3/4 mb-3" />
                <div className="h-3 bg-muted rounded w-1/3 mb-3" />
                <div className="h-3 bg-muted rounded w-full" />
                <div className="h-3 bg-muted rounded w-5/6 mt-1" />
              </div>
            ))}
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
};

export default ChatMessages;
