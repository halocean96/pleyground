"use client";

import { Input } from "@/components/ui/input";
import { useChat } from "@ai-sdk/react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.map((m) => (
        <div key={m.id} className="whitespace-pre-wrap">
          {m.role === "user" ? "User: " : "AI: "}
          {m.content}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <Input
          className="fixed dark:bg-zinc-900 bottom-0 w-full max-w-md mb-8"
          value={input}
          placeholder="물어보세요"
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
