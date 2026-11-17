import type { ComponentProps, ReactNode } from 'react';
import { cn } from '../utils';
import { AttachmentPreview, type ChatAttachment } from './chat-input';

export interface ChatMessageProps extends ComponentProps<'div'> {
  role: 'user' | 'assistant';
  attachments?: ChatAttachment[];
  /** Avatar or icon shown next to assistant messages. */
  avatar?: ReactNode;
}

/** A single chat bubble. User messages are right-aligned, assistant messages left-aligned without a bubble. */
export function ChatMessage({ role, attachments, avatar, className, children, ...props }: ChatMessageProps) {
  const isUser = role === 'user';
  return (
    <div {...props} className={cn('flex w-full gap-3', isUser ? 'justify-end' : 'justify-start', className)}>
      {!isUser && avatar && <div className="shrink-0">{avatar}</div>}
      <div className={cn('flex min-w-0 max-w-[85%] flex-col gap-2', isUser && 'items-end')}>
        {attachments && attachments.length > 0 && (
          <div className={cn('flex flex-wrap gap-2', isUser && 'justify-end')}>
            {attachments.map((attachment) => (
              <AttachmentPreview
                key={attachment.id}
                attachment={attachment}
                className={attachment.kind === 'image' ? 'size-40' : undefined}
              />
            ))}
          </div>
        )}
        {children && (
          <div
            className={cn(
              'text-sm leading-6 whitespace-pre-wrap text-foreground',
              isUser && 'rounded-[calc(var(--tr-radius)*1.8)] bg-muted px-4 py-2.5',
            )}
          >
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
