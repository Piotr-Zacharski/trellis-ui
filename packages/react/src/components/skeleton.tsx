import type { ComponentProps } from 'react';
import { cn } from '../utils';

/** Placeholder shape shown while content loads. Size it with classes, e.g. `h-4 w-40` or `size-10 rounded-full`. */
export function Skeleton({ className, ...props }: ComponentProps<'div'>) {
  return <div aria-hidden="true" {...props} className={cn('animate-pulse rounded-tr bg-muted', className)} />;
}
