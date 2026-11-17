import type { ComponentProps, ReactNode } from 'react';
import { cn } from '../utils';

/** Vertical list of events in chronological order. */
export function Timeline({ className, ...props }: ComponentProps<'ol'>) {
  return <ol {...props} className={cn('flex flex-col', className)} />;
}

export interface TimelineItemProps extends Omit<ComponentProps<'li'>, 'title'> {
  title: ReactNode;
  /** Date or time label. */
  time?: ReactNode;
  /** Replaces the dot, e.g. with an icon or avatar. */
  icon?: ReactNode;
  color?: 'primary' | 'neutral' | 'danger' | 'warning';
}

const dotColor = { primary: 'bg-primary', neutral: 'bg-input', danger: 'bg-danger', warning: 'bg-warning' } as const;

export function TimelineItem({ title, time, icon, color = 'neutral', className, children, ...props }: TimelineItemProps) {
  return (
    <li {...props} className={cn('group relative flex gap-4 pb-6 last:pb-0', className)}>
      <span aria-hidden="true" className="absolute top-7 bottom-0 left-3 w-px -translate-x-1/2 bg-border group-last:hidden" />
      <span className="relative flex size-6 shrink-0 items-center justify-center">
        {icon ? (
          <span className="flex size-6 items-center justify-center rounded-full bg-muted text-muted-foreground [&>svg]:size-3.5">{icon}</span>
        ) : (
          <span className={cn('size-2.5 rounded-full ring-4 ring-background', dotColor[color])} />
        )}
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-1 pt-0.5">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3">
          <span className="text-sm font-medium text-foreground">{title}</span>
          {time && <span className="text-xs text-muted-foreground">{time}</span>}
        </div>
        {children && <div className="text-sm text-muted-foreground">{children}</div>}
      </div>
    </li>
  );
}
