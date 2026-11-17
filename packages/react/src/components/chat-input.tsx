'use client';

import {
  type ClipboardEvent,
  type KeyboardEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { Button as RACButton, DropZone, FileTrigger, isFileDropItem } from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { formatFileSize as formatSize, matchesFileType as matchesType } from '../files';
import { cn, focusRing } from '../utils';
import { ArrowUpIcon, CheckIcon, FileIcon, MicIcon, PaperclipIcon, StopIcon, TrashIcon, XIcon } from './icons';
import { useVoiceRecorder } from './use-voice-recorder';

export type ChatAttachmentKind = 'image' | 'audio' | 'file';

export interface ChatAttachment {
  id: string;
  file: File;
  kind: ChatAttachmentKind;
  /** Object URL for previews. After submit it belongs to you – revoke it with URL.revokeObjectURL when done. */
  url: string;
}

export interface ChatInputMessage {
  text: string;
  attachments: ChatAttachment[];
}

export interface ChatInputProps {
  /** Called on Enter or the send button. The input is cleared once the returned promise resolves. */
  onSubmit: (message: ChatInputMessage) => void | Promise<void>;
  placeholder?: string;
  /** Controlled text. */
  value?: string;
  onChange?: (value: string) => void;
  /** MIME types accepted by the attach button, drag & drop and paste, e.g. `['image/*', 'application/pdf']`. */
  acceptedFileTypes?: string[];
  allowsAttachments?: boolean;
  allowsVoice?: boolean;
  maxAttachments?: number;
  /** Max size per file in bytes. */
  maxFileSize?: number;
  /** The assistant is responding: the send button becomes a stop button. */
  isPending?: boolean;
  onStop?: () => void;
  isDisabled?: boolean;
  /** Extra controls rendered in the toolbar, e.g. a model picker. */
  toolbar?: ReactNode;
  className?: string;
  'aria-label'?: string;
}

const iconButtonStyles = tv({
  extend: focusRing,
  base: 'flex size-9 shrink-0 cursor-default items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground',
  variants: {
    isDisabled: { true: 'opacity-40 hover:bg-transparent' },
  },
});

const sendButtonStyles = tv({
  extend: focusRing,
  base: 'flex size-9 shrink-0 cursor-default items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary-hover',
  variants: {
    isDisabled: { true: 'bg-muted text-muted-foreground hover:bg-muted' },
  },
});

let idCounter = 0;
const nextId = () => `att-${Date.now()}-${idCounter++}`;

function kindOf(file: File): ChatAttachmentKind {
  if (file.type.startsWith('image/')) return 'image';
  if (file.type.startsWith('audio/')) return 'audio';
  return 'file';
}

function formatDuration(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
}

/**
 * Prompt box for AI chats: auto-growing textarea, file & image attachments (button, drag & drop, paste),
 * voice recording and a send / stop button.
 */
export function ChatInput({
  onSubmit,
  placeholder = 'Send a message…',
  value: controlledValue,
  onChange,
  acceptedFileTypes,
  allowsAttachments = true,
  allowsVoice = true,
  maxAttachments = 10,
  maxFileSize,
  isPending = false,
  onStop,
  isDisabled = false,
  toolbar,
  className,
  'aria-label': ariaLabel = 'Message',
}: ChatInputProps) {
  const [uncontrolledValue, setUncontrolledValue] = useState('');
  const text = controlledValue ?? uncontrolledValue;
  const setText = useCallback(
    (next: string) => {
      if (controlledValue === undefined) setUncontrolledValue(next);
      onChange?.(next);
    },
    [controlledValue, onChange],
  );

  const [attachments, setAttachments] = useState<ChatAttachment[]>([]);
  const [notice, setNotice] = useState<string | null>(null);
  const [isSubmitting, setSubmitting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recorder = useVoiceRecorder();
  const isRecording = recorder.status === 'recording' || recorder.status === 'requesting';

  // Revoke preview URLs that are still owned by the input when it unmounts.
  const attachmentsRef = useRef(attachments);
  attachmentsRef.current = attachments;
  useEffect(() => () => attachmentsRef.current.forEach((a) => URL.revokeObjectURL(a.url)), []);

  // Auto-grow the textarea up to its max height.
  useLayoutEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, [text]);

  const addFiles = useCallback(
    (files: File[]) => {
      const rejected: string[] = [];
      setAttachments((current) => {
        const next = [...current];
        for (const file of files) {
          if (next.length >= maxAttachments) {
            rejected.push(`You can attach up to ${maxAttachments} files.`);
            break;
          }
          if (!matchesType(file, acceptedFileTypes)) {
            rejected.push(`${file.name}: this file type is not supported.`);
            continue;
          }
          if (maxFileSize && file.size > maxFileSize) {
            rejected.push(`${file.name} is larger than ${formatSize(maxFileSize)}.`);
            continue;
          }
          next.push({ id: nextId(), file, kind: kindOf(file), url: URL.createObjectURL(file) });
        }
        return next;
      });
      setNotice(rejected[0] ?? null);
    },
    [acceptedFileTypes, maxAttachments, maxFileSize],
  );

  const removeAttachment = (id: string) => {
    setAttachments((current) => {
      const removed = current.find((a) => a.id === id);
      if (removed) URL.revokeObjectURL(removed.url);
      return current.filter((a) => a.id !== id);
    });
    textareaRef.current?.focus();
  };

  const canSend = !isDisabled && !isPending && !isSubmitting && !isRecording && (text.trim() !== '' || attachments.length > 0);

  const submit = async () => {
    if (!canSend) return;
    setSubmitting(true);
    try {
      await onSubmit({ text: text.trim(), attachments });
      setText('');
      setAttachments([]); // URLs now belong to the caller.
      setNotice(null);
    } finally {
      setSubmitting(false);
      textareaRef.current?.focus();
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      void submit();
    }
  };

  const onPaste = (event: ClipboardEvent<HTMLTextAreaElement>) => {
    if (!allowsAttachments) return;
    const files = Array.from(event.clipboardData.files);
    if (files.length > 0) {
      event.preventDefault();
      addFiles(files);
    }
  };

  const finishRecording = async () => {
    const file = await recorder.stop();
    if (file) addFiles([file]);
  };

  return (
    <DropZone
      isDisabled={!allowsAttachments || isDisabled}
      getDropOperation={(types) => (allowsAttachments && types.has('Files') ? 'copy' : 'cancel')}
      onDrop={async (event) => {
        const files = await Promise.all(event.items.filter(isFileDropItem).map((item) => item.getFile()));
        addFiles(files);
      }}
      className={({ isDropTarget }) =>
        cn(
          'relative flex w-full flex-col gap-2 rounded-[calc(var(--tr-radius)*2)] border border-input bg-background p-2 text-foreground shadow-sm transition-[border-color,box-shadow] focus-within:border-primary focus-within:ring-3 focus-within:ring-ring',
          isDropTarget && 'border-primary bg-primary-soft/40 ring-3 ring-ring',
          isDisabled && 'opacity-60',
          className,
        )
      }
    >
      {({ isDropTarget }) => (
        <>
          {isDropTarget && (
            <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center rounded-[inherit] text-sm font-medium text-primary">
              Drop files to attach
            </div>
          )}

          {attachments.length > 0 && (
            <ul className="flex flex-wrap gap-2 px-1 pt-1" aria-label="Attachments">
              {attachments.map((attachment) => (
                <li key={attachment.id} className="group relative">
                  <AttachmentPreview attachment={attachment} />
                  <RACButton
                    aria-label={`Remove ${attachment.file.name}`}
                    onPress={() => removeAttachment(attachment.id)}
                    className="absolute -top-1.5 -right-1.5 flex size-5 cursor-default items-center justify-center rounded-full border border-border bg-background text-muted-foreground shadow-sm outline-none hover:text-foreground data-focus-visible:ring-3 data-focus-visible:ring-ring"
                  >
                    <XIcon className="size-3" />
                  </RACButton>
                </li>
              ))}
            </ul>
          )}

          {isRecording ? (
            <div className="flex h-11 items-center gap-3 px-2" role="status" aria-live="polite">
              <span className="size-2.5 shrink-0 animate-pulse rounded-full bg-danger" />
              <span className="w-10 text-sm tabular-nums text-muted-foreground">{formatDuration(recorder.duration)}</span>
              <div className="flex h-8 flex-1 items-center gap-0.5 overflow-hidden" aria-hidden="true">
                {recorder.levels.map((level, i) => (
                  <span
                    // biome-ignore lint/suspicious/noArrayIndexKey: fixed-length meter
                    key={i}
                    className="w-1 flex-1 rounded-full bg-primary transition-[height] duration-75"
                    style={{ height: `${Math.max(10, level * 100)}%` }}
                  />
                ))}
              </div>
              <span className="sr-only">Recording…</span>
            </div>
          ) : (
            <textarea
              ref={textareaRef}
              rows={1}
              value={text}
              disabled={isDisabled}
              placeholder={placeholder}
              aria-label={ariaLabel}
              onChange={(event) => setText(event.target.value)}
              onKeyDown={onKeyDown}
              onPaste={onPaste}
              className="max-h-52 min-h-11 w-full resize-none bg-transparent px-2 py-2.5 text-sm leading-6 text-foreground outline-none placeholder:text-muted-foreground"
            />
          )}

          {(notice || recorder.error) && <p className="px-2 text-xs text-danger">{notice ?? recorder.error}</p>}

          <div className="flex items-center gap-1">
            {isRecording ? (
              <RACButton
                aria-label="Discard recording"
                onPress={recorder.cancel}
                className={({ isFocusVisible }) => iconButtonStyles({ isFocusVisible })}
              >
                <TrashIcon className="size-4" />
              </RACButton>
            ) : (
              <>
                {allowsAttachments && (
                  <FileTrigger
                    allowsMultiple
                    acceptedFileTypes={acceptedFileTypes}
                    onSelect={(list) => list && addFiles(Array.from(list))}
                  >
                    <RACButton
                      aria-label="Attach files"
                      isDisabled={isDisabled || attachments.length >= maxAttachments}
                      className={({ isFocusVisible, isDisabled }) => iconButtonStyles({ isFocusVisible, isDisabled })}
                    >
                      <PaperclipIcon className="size-4" />
                    </RACButton>
                  </FileTrigger>
                )}
                {toolbar}
              </>
            )}

            <div className="ml-auto flex items-center gap-1">
              {allowsVoice && recorder.isSupported && !isPending && (
                <RACButton
                  aria-label={isRecording ? 'Stop recording and attach' : 'Record voice message'}
                  isDisabled={isDisabled || recorder.status === 'requesting'}
                  onPress={isRecording ? finishRecording : recorder.start}
                  className={({ isFocusVisible, isDisabled }) =>
                    cn(iconButtonStyles({ isFocusVisible, isDisabled }), isRecording && 'bg-danger-soft text-danger hover:bg-danger-soft hover:text-danger')
                  }
                >
                  {isRecording ? <CheckIcon className="size-4" /> : <MicIcon className="size-4" />}
                </RACButton>
              )}
              {isPending ? (
                <RACButton
                  aria-label="Stop generating"
                  onPress={onStop}
                  className={({ isFocusVisible }) => sendButtonStyles({ isFocusVisible })}
                >
                  <StopIcon className="size-3.5" />
                </RACButton>
              ) : (
                <RACButton
                  aria-label="Send message"
                  isDisabled={!canSend}
                  onPress={submit}
                  className={({ isFocusVisible, isDisabled }) => sendButtonStyles({ isFocusVisible, isDisabled })}
                >
                  <ArrowUpIcon className="size-4" />
                </RACButton>
              )}
            </div>
          </div>
        </>
      )}
    </DropZone>
  );
}

/** Thumbnail for an image, inline player for audio, file chip otherwise. Also usable inside chat messages. */
export function AttachmentPreview({ attachment, className }: { attachment: ChatAttachment; className?: string }) {
  if (attachment.kind === 'image') {
    return (
      <img
        src={attachment.url}
        alt={attachment.file.name}
        className={cn('size-16 rounded-[calc(var(--tr-radius)*1.2)] border border-border object-cover', className)}
      />
    );
  }
  if (attachment.kind === 'audio') {
    return (
      <div className={cn('flex h-16 items-center gap-2 rounded-[calc(var(--tr-radius)*1.2)] border border-border bg-surface px-3', className)}>
        <MicIcon className="size-4 shrink-0 text-primary" />
        {/* biome-ignore lint/a11y/useMediaCaption: user voice recording */}
        <audio src={attachment.url} controls className="h-8 w-52" />
      </div>
    );
  }
  return (
    <div
      className={cn('flex h-16 max-w-56 items-center gap-2.5 rounded-[calc(var(--tr-radius)*1.2)] border border-border bg-surface px-3', className)}
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-[calc(var(--tr-radius)*0.8)] bg-primary-soft text-primary">
        <FileIcon className="size-4" />
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="truncate text-sm font-medium">{attachment.file.name}</span>
        <span className="text-xs text-muted-foreground">{formatSize(attachment.file.size)}</span>
      </span>
    </div>
  );
}
