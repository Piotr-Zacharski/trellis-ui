import type { ComponentProps } from 'react';
import { cn } from '../utils';

export function Card({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      {...props}
      className={cn('flex flex-col rounded-[calc(var(--tr-radius)*1.6)] border border-border bg-surface text-foreground shadow-xs', className)}
    />
  );
}

export function CardHeader({ className, ...props }: ComponentProps<'div'>) {
  return <div {...props} className={cn('flex flex-col gap-1 p-5 pb-0', className)} />;
}

export function CardTitle({ className, ...props }: ComponentProps<'h3'>) {
  return <h3 {...props} className={cn('text-base font-semibold leading-tight', className)} />;
}

export function CardDescription({ className, ...props }: ComponentProps<'p'>) {
  return <p {...props} className={cn('text-sm text-muted-foreground', className)} />;
}

export function CardContent({ className, ...props }: ComponentProps<'div'>) {
  return <div {...props} className={cn('p-5', className)} />;
}

export function CardFooter({ className, ...props }: ComponentProps<'div'>) {
  return <div {...props} className={cn('flex items-center gap-2 border-t border-border p-5 py-4', className)} />;
}
