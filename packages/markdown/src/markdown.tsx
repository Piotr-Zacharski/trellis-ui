'use client';

import { cn } from '@trellis-ui-pack/react';
import { memo } from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CodeBlock } from './code-block';

const components: Components = {
  h1: ({ node: _, ...props }) => <h1 {...props} className="mt-6 mb-3 text-2xl font-semibold tracking-tight first:mt-0" />,
  h2: ({ node: _, ...props }) => <h2 {...props} className="mt-6 mb-2.5 text-xl font-semibold tracking-tight first:mt-0" />,
  h3: ({ node: _, ...props }) => <h3 {...props} className="mt-5 mb-2 text-base font-semibold first:mt-0" />,
  p: ({ node: _, ...props }) => <p {...props} className="my-3 first:mt-0 last:mb-0" />,
  ul: ({ node: _, ...props }) => <ul {...props} className="my-3 list-disc space-y-1 pl-6 marker:text-muted-foreground" />,
  ol: ({ node: _, ...props }) => <ol {...props} className="my-3 list-decimal space-y-1 pl-6 marker:text-muted-foreground" />,
  li: ({ node: _, ...props }) => <li {...props} className="pl-1" />,
  a: ({ node: _, ...props }) => (
    <a {...props} target="_blank" rel="noreferrer" className="font-medium text-primary underline-offset-4 hover:underline" />
  ),
  blockquote: ({ node: _, ...props }) => <blockquote {...props} className="my-3 border-l-2 border-border pl-4 text-muted-foreground" />,
  hr: () => <hr className="my-6 border-border" />,
  table: ({ node: _, ...props }) => (
    <div className="my-3 overflow-x-auto rounded-tr border border-border">
      <table {...props} className="w-full border-collapse text-sm" />
    </div>
  ),
  th: ({ node: _, ...props }) => <th {...props} className="border-b border-border bg-surface px-3 py-2 text-left font-medium" />,
  td: ({ node: _, ...props }) => <td {...props} className="border-b border-border px-3 py-2 [tr:last-child_&]:border-b-0" />,
  pre: ({ children }) => <>{children}</>,
  code: ({ node, className, children, ...props }) => {
    const match = /language-([\w-]+)/.exec(className ?? '');
    const text = String(children ?? '');
    const isBlock = !!match || text.includes('\n') || node?.position?.start.line !== node?.position?.end.line;
    if (!isBlock) {
      return (
        <code {...props} className="rounded-[calc(var(--tr-radius)*0.4)] bg-muted px-1.5 py-0.5 font-mono text-[0.875em]">
          {children}
        </code>
      );
    }
    return <CodeBlock code={text.replace(/\n$/, '')} language={match?.[1]} />;
  },
};

export interface MarkdownProps {
  /** Markdown source. Partial input from a streaming response is fine – unclosed code fences render as code. */
  children: string;
  className?: string;
}

/** Renders GitHub-flavoured Markdown (tables, task lists, strikethrough) with Trellis typography. Raw HTML is ignored. */
export const Markdown = memo(function Markdown({ children, className }: MarkdownProps) {
  return (
    <div className={cn('text-sm leading-7 break-words text-foreground', className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  );
});
