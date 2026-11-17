'use client';

import { cn } from '@trellis-ui-pack/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Button as RACButton } from 'react-aria-components';
import { highlight } from 'sugar-high';

export interface CodeBlockProps {
  code: string;
  /** Shown in the header, e.g. `tsx`. Highlighting works for JS/TS-like languages; others render as plain text. */
  language?: string;
  /** Shown instead of the language, e.g. `app/page.tsx`. */
  filename?: string;
  showLineNumbers?: boolean;
  className?: string;
}

const HIGHLIGHTED = new Set(['js', 'jsx', 'ts', 'tsx', 'javascript', 'typescript', 'json', 'css', 'java', 'c', 'cpp', 'cs', 'go', 'rust', 'swift', 'kotlin', 'php']);

/** Code with a header, copy button and lightweight syntax highlighting (sugar-high, ~1 kB). */
export function CodeBlock({ code, language, filename, showLineNumbers = false, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const html = useMemo(() => (language && HIGHLIGHTED.has(language.toLowerCase()) ? highlight(code) : null), [code, language]);

  return (
    <figure
      className={cn(
        'trellis-code not-prose my-3 overflow-hidden rounded-[calc(var(--tr-radius)*1.2)] border border-border bg-surface text-foreground',
        showLineNumbers && 'trellis-code-numbered',
        className,
      )}
    >
      <figcaption className="flex h-9 items-center justify-between border-b border-border pr-1.5 pl-3.5 text-xs text-muted-foreground">
        <span className="font-mono">{filename ?? language ?? 'text'}</span>
        <RACButton
          aria-label={copied ? 'Copied' : 'Copy code'}
          onPress={async () => {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            clearTimeout(timer.current);
            timer.current = setTimeout(() => setCopied(false), 1500);
          }}
          className={({ isFocusVisible }) =>
            cn(
              'flex h-7 cursor-default items-center gap-1.5 rounded-[calc(var(--tr-radius)*0.6)] px-2 outline-none hover:bg-muted hover:text-foreground',
              isFocusVisible && 'ring-3 ring-ring',
            )
          }
        >
          {copied ? 'Copied' : 'Copy'}
        </RACButton>
      </figcaption>
      <pre className="overflow-x-auto p-3.5 font-mono text-[13px] leading-6">
        {html ? (
          // biome-ignore lint/security/noDangerouslySetInnerHtml: sugar-high escapes the code and only emits <span> tokens
          <code dangerouslySetInnerHTML={{ __html: html }} />
        ) : (
          <code>
            {code.split('\n').map((line, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: lines are positional
              <span key={i} className="sh__line">
                {line}
                {'\n'}
              </span>
            ))}
          </code>
        )}
      </pre>
    </figure>
  );
}
