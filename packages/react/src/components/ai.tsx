'use client';

import { type ComponentProps, type ReactNode, useEffect, useRef, useState } from 'react';
import {
  Button as RACButton,
  Disclosure,
  DisclosurePanel,
  ToggleButton as RACToggleButton,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { cn, focusRing } from '../utils';
import { CheckIcon, ChevronDownIcon } from './icons';
import { Spinner } from './spinner';
import { Tooltip, TooltipTrigger } from './tooltip';

/* ------------------------------------------------------------------------------------------------
 * TextShimmer
 * ----------------------------------------------------------------------------------------------*/

export interface TextShimmerProps extends ComponentProps<'span'> {
  /** Seconds per sweep. */
  duration?: number;
}

/** Text with a moving highlight – for "Thinking…" or "Searching the web…" states. */
export function TextShimmer({ duration = 2, className, style, ...props }: TextShimmerProps) {
  return (
    <span
      {...props}
      style={{ animationDuration: `${duration}s`, ...style }}
      className={cn(
        'animate-tr-shimmer bg-[linear-gradient(90deg,var(--tr-muted-foreground)_0%,var(--tr-muted-foreground)_40%,var(--tr-foreground)_50%,var(--tr-muted-foreground)_60%,var(--tr-muted-foreground)_100%)] bg-[length:200%_100%] bg-clip-text text-transparent',
        className,
      )}
    />
  );
}

/* ------------------------------------------------------------------------------------------------
 * ChatMessageActions
 * ----------------------------------------------------------------------------------------------*/

const actionStyles = tv({
  extend: focusRing,
  base: 'flex size-8 cursor-default items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground',
  variants: {
    isSelected: { true: 'text-foreground' },
  },
});

const CopyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
    <rect width="14" height="14" x="8" y="8" rx="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
);
const RefreshIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
    <path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M8 16H3v5" />
  </svg>
);
const ThumbIcon = ({ down, filled }: { down?: boolean; filled?: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn('size-4', down && 'rotate-180')}
    aria-hidden="true"
  >
    <path d="M7 10v12M15 5.9 14 10h5.8a2 2 0 0 1 1.9 2.6l-2.3 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.8a2 2 0 0 0 1.8-1.1L12 2a3.1 3.1 0 0 1 3 3.9Z" />
  </svg>
);

function ActionButton({ label, onPress, children }: { label: string; onPress?: () => void; children: ReactNode }) {
  return (
    <TooltipTrigger delay={500}>
      <RACButton aria-label={label} onPress={onPress} className={({ isFocusVisible }) => actionStyles({ isFocusVisible })}>
        {children}
      </RACButton>
      <Tooltip>{label}</Tooltip>
    </TooltipTrigger>
  );
}

export interface ChatMessageActionsProps {
  /** Text copied by the copy button. Omit to hide the button. */
  copyText?: string;
  onRegenerate?: () => void;
  /** Current feedback – controlled. */
  feedback?: 'up' | 'down' | null;
  /** Shows thumbs up / down when provided. */
  onFeedback?: (feedback: 'up' | 'down' | null) => void;
  /** Extra actions. */
  children?: ReactNode;
  className?: string;
}

/** Toolbar under an assistant message: copy, regenerate, thumbs up / down. */
export function ChatMessageActions({ copyText, onRegenerate, feedback = null, onFeedback, children, className }: ChatMessageActionsProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <div role="toolbar" aria-label="Message actions" className={cn('flex items-center gap-0.5', className)}>
      {copyText !== undefined && (
        <ActionButton
          label={copied ? 'Copied' : 'Copy'}
          onPress={async () => {
            await navigator.clipboard.writeText(copyText);
            setCopied(true);
            clearTimeout(timer.current);
            timer.current = setTimeout(() => setCopied(false), 1500);
          }}
        >
          {copied ? <CheckIcon className="size-4 text-primary" /> : <CopyIcon />}
        </ActionButton>
      )}
      {onRegenerate && (
        <ActionButton label="Regenerate" onPress={onRegenerate}>
          <RefreshIcon />
        </ActionButton>
      )}
      {onFeedback &&
        (['up', 'down'] as const).map((value) => (
          <RACToggleButton
            key={value}
            aria-label={value === 'up' ? 'Good response' : 'Bad response'}
            isSelected={feedback === value}
            onChange={(isSelected) => onFeedback(isSelected ? value : null)}
            className={({ isFocusVisible, isSelected }) => actionStyles({ isFocusVisible, isSelected })}
          >
            {({ isSelected }) => <ThumbIcon down={value === 'down'} filled={isSelected} />}
          </RACToggleButton>
        ))}
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------------------------------------
 * PromptSuggestions
 * ----------------------------------------------------------------------------------------------*/

export interface PromptSuggestionsProps {
  suggestions: Array<string | { label: ReactNode; prompt: string; icon?: ReactNode }>;
  onSelect: (prompt: string) => void;
  className?: string;
}

/** Clickable starter prompts shown in an empty chat. */
export function PromptSuggestions({ suggestions, onSelect, className }: PromptSuggestionsProps) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {suggestions.map((suggestion) => {
        const item = typeof suggestion === 'string' ? { label: suggestion, prompt: suggestion } : suggestion;
        return (
          <RACButton
            key={item.prompt}
            onPress={() => onSelect(item.prompt)}
            className={({ isFocusVisible }) =>
              cn(
                'flex cursor-default items-center gap-2 rounded-full border border-border bg-background px-3.5 py-2 text-left text-sm text-foreground outline-none transition-colors hover:bg-muted',
                isFocusVisible && 'ring-3 ring-ring',
              )
            }
          >
            {'icon' in item && item.icon && <span className="text-muted-foreground [&>svg]:size-4">{item.icon}</span>}
            {item.label}
          </RACButton>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------------------------------------
 * ChainOfThought
 * ----------------------------------------------------------------------------------------------*/

export interface ChainOfThoughtProps {
  /** Reasoning text or steps. */
  children: ReactNode;
  /** Still thinking – shows a shimmering title and keeps the panel open. */
  isStreaming?: boolean;
  /** e.g. "Thought for 12 seconds". */
  title?: ReactNode;
  defaultExpanded?: boolean;
  className?: string;
}

/** Collapsible reasoning trace above an assistant answer. */
export function ChainOfThought({ children, isStreaming = false, title, defaultExpanded = false, className }: ChainOfThoughtProps) {
  return (
    <Disclosure defaultExpanded={defaultExpanded} className={cn('group flex flex-col gap-2', className)}>
      <RACButton
        slot="trigger"
        className={({ isFocusVisible }) =>
          cn(
            'flex w-fit cursor-default items-center gap-1.5 rounded-sm text-sm text-muted-foreground outline-none hover:text-foreground',
            isFocusVisible && 'ring-3 ring-ring',
          )
        }
      >
        {isStreaming ? <TextShimmer>{title ?? 'Thinking…'}</TextShimmer> : (title ?? 'Show reasoning')}
        <ChevronDownIcon className="size-3.5 transition-transform group-data-expanded:rotate-180" />
      </RACButton>
      <DisclosurePanel>
        <div className="border-l-2 border-border pl-4 text-sm leading-6 whitespace-pre-wrap text-muted-foreground">{children}</div>
      </DisclosurePanel>
    </Disclosure>
  );
}

/* ------------------------------------------------------------------------------------------------
 * ChatSources
 * ----------------------------------------------------------------------------------------------*/

export interface ChatSource {
  title: string;
  url: string;
  /** Optional favicon URL; defaults to the site's /favicon.ico. */
  icon?: string;
}

/** Numbered citation chips that link to the sources an answer used. */
export function ChatSources({ sources, className }: { sources: ChatSource[]; className?: string }) {
  return (
    <ol aria-label="Sources" className={cn('flex flex-wrap gap-2', className)}>
      {sources.map((source, index) => {
        let host = source.url;
        try {
          host = new URL(source.url).hostname.replace(/^www\./, '');
        } catch {}
        return (
          <li key={source.url}>
            <a
              href={source.url}
              target="_blank"
              rel="noreferrer"
              title={source.title}
              className="flex max-w-60 items-center gap-2 rounded-full border border-border bg-surface py-1 pr-3 pl-1 text-xs text-foreground outline-none transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring"
            >
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-semibold text-muted-foreground">
                {index + 1}
              </span>
              <span className="truncate">{source.title}</span>
              <span className="shrink-0 text-muted-foreground">{host}</span>
            </a>
          </li>
        );
      })}
    </ol>
  );
}

/* ------------------------------------------------------------------------------------------------
 * ChatTool
 * ----------------------------------------------------------------------------------------------*/

export interface ChatToolProps {
  /** Tool / function name. */
  name: string;
  status: 'running' | 'success' | 'error';
  /** Arguments sent to the tool. */
  input?: unknown;
  /** Result returned by the tool. */
  output?: unknown;
  className?: string;
}

function formatJson(value: unknown) {
  return typeof value === 'string' ? value : JSON.stringify(value, null, 2);
}

/** Status card for a tool / function call made by the assistant. Expand it to see input and output. */
export function ChatTool({ name, status, input, output, className }: ChatToolProps) {
  return (
    <Disclosure className={cn('group w-full max-w-md rounded-[calc(var(--tr-radius)*1.4)] border border-border bg-surface', className)}>
      <RACButton
        slot="trigger"
        className={({ isFocusVisible }) =>
          cn(
            'flex w-full cursor-default items-center gap-2.5 rounded-[inherit] px-3 py-2.5 text-left text-sm outline-none',
            isFocusVisible && 'ring-3 ring-ring',
          )
        }
      >
        {status === 'running' ? (
          <Spinner size="sm" color="neutral" aria-hidden />
        ) : (
          <span className={cn('size-2 rounded-full', status === 'success' ? 'bg-primary' : 'bg-danger')} />
        )}
        <span className="font-mono text-xs text-foreground">{name}</span>
        <span className="text-xs text-muted-foreground">
          {status === 'running' ? <TextShimmer>Running…</TextShimmer> : status === 'success' ? 'Completed' : 'Failed'}
        </span>
        <ChevronDownIcon className="ml-auto size-3.5 text-muted-foreground transition-transform group-data-expanded:rotate-180" />
      </RACButton>
      <DisclosurePanel>
        <div className="flex flex-col gap-2 border-t border-border p-3">
          {input !== undefined && (
            <div>
              <p className="mb-1 text-xs font-medium text-muted-foreground">Input</p>
              <pre className="overflow-auto rounded-tr bg-muted p-2 text-xs text-foreground">{formatJson(input)}</pre>
            </div>
          )}
          {output !== undefined && (
            <div>
              <p className="mb-1 text-xs font-medium text-muted-foreground">Output</p>
              <pre className="max-h-60 overflow-auto rounded-tr bg-muted p-2 text-xs text-foreground">{formatJson(output)}</pre>
            </div>
          )}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
