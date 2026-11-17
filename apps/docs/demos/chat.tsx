'use client';

import { type ChatAttachment, ChatInput, ChatMessage, Spinner } from '@trellis-ui-pack/react';
import { useEffect, useRef, useState } from 'react';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  text: string;
  attachments?: ChatAttachment[];
}

function fakeReply(text: string, attachments: ChatAttachment[]) {
  const parts = [
    attachments.length > 0 &&
      `I received ${attachments.length} attachment${attachments.length > 1 ? 's' : ''}: ${attachments.map((a) => a.file.name).join(', ')}.`,
    text && `You wrote: “${text}”.`,
    'This is a demo, so the answer is streamed from a canned string – plug in your own model API here.',
  ];
  return parts.filter(Boolean).join(' ');
}

const Avatar = () => (
  <span className="flex size-8 items-center justify-center rounded-full bg-primary-soft text-xs font-semibold text-primary">AI</span>
);

export default function ChatDemo() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, role: 'assistant', text: 'Hi! Attach a file, paste a screenshot, record a voice note or just type.' },
  ]);
  const [isPending, setPending] = useState(false);
  const streamRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  useEffect(() => () => clearInterval(streamRef.current), []);

  const stop = () => {
    clearInterval(streamRef.current);
    setPending(false);
  };

  return (
    <div className="flex h-[30rem] w-full max-w-xl flex-col gap-3">
      <div ref={scrollRef} className="flex flex-1 flex-col gap-4 overflow-y-auto pr-1">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            role={message.role}
            attachments={message.attachments}
            avatar={message.role === 'assistant' ? <Avatar /> : undefined}
          >
            {message.text}
          </ChatMessage>
        ))}
        {isPending && messages.at(-1)?.role === 'user' && (
          <ChatMessage role="assistant" avatar={<Avatar />}>
            <Spinner variant="dots" color="neutral" aria-label="Assistant is typing" />
          </ChatMessage>
        )}
      </div>

      <ChatInput
        placeholder="Ask anything…"
        maxFileSize={10 * 1024 * 1024}
        isPending={isPending}
        onStop={stop}
        onSubmit={({ text, attachments }) => {
          const reply = fakeReply(text, attachments).split(' ');
          const replyId = Date.now() + 1;
          setMessages((prev) => [...prev, { id: Date.now(), role: 'user', text, attachments }]);
          setPending(true);

          // Simulate a streamed answer.
          let i = 0;
          setTimeout(() => {
            streamRef.current = setInterval(() => {
              i++;
              setMessages((prev) => [
                ...prev.filter((m) => m.id !== replyId),
                { id: replyId, role: 'assistant', text: reply.slice(0, i).join(' ') },
              ]);
              if (i >= reply.length) stop();
            }, 60);
          }, 700);
        }}
      />
    </div>
  );
}
