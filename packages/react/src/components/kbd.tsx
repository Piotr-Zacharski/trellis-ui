import type { ComponentProps } from 'react';
import { cn } from '../utils';

/** Keyboard key, e.g. <Kbd>⌘</Kbd><Kbd>K</Kbd>. */
export function Kbd({ className, ...props }: ComponentProps<'kbd'>) {
  return (
    <kbd
      {...props}
      className={cn(
        'inline-flex h-5 min-w-5 items-center justify-center rounded-[calc(var(--tr-radius)*0.5)] border border-border border-b-2 bg-surface px-1 font-sans text-[11px] font-medium text-muted-foreground',
        className,
      )}
    />
  );
}
