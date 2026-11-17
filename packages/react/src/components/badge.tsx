import type { ComponentProps, ReactNode } from 'react';
import { cn } from '../utils';

export interface BadgeProps extends Omit<ComponentProps<'span'>, 'content' | 'color'> {
  /** Number or short text. Numbers above `max` show as "99+". Omit for a plain dot. */
  content?: ReactNode;
  max?: number;
  color?: 'primary' | 'danger' | 'warning' | 'neutral';
  /** Hide the badge (e.g. when the count is 0). */
  isInvisible?: boolean;
  placement?: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left';
  /** The element the badge is attached to. */
  children: ReactNode;
}

const colors = {
  primary: 'bg-primary text-primary-foreground',
  danger: 'bg-danger text-danger-foreground',
  warning: 'bg-warning text-black',
  neutral: 'bg-foreground text-background',
} as const;

const placements = {
  'top-right': 'top-0 right-0 translate-x-1/3 -translate-y-1/3',
  'bottom-right': 'right-0 bottom-0 translate-x-1/3 translate-y-1/3',
  'top-left': 'top-0 left-0 -translate-x-1/3 -translate-y-1/3',
  'bottom-left': 'bottom-0 left-0 -translate-x-1/3 translate-y-1/3',
} as const;

/** Count or dot attached to the corner of another element (avatar, icon button…). */
export function Badge({
  content,
  max = 99,
  color = 'danger',
  isInvisible,
  placement = 'top-right',
  className,
  children,
  ...props
}: BadgeProps) {
  const text = typeof content === 'number' && content > max ? `${max}+` : content;
  const isDot = content === undefined;
  return (
    <span className="relative inline-flex shrink-0">
      {children}
      {!isInvisible && (
        <span
          {...props}
          className={cn(
            'pointer-events-none absolute z-10 flex items-center justify-center rounded-full font-semibold ring-2 ring-background tabular-nums',
            isDot ? 'size-2.5' : 'h-5 min-w-5 px-1.5 text-[11px]',
            colors[color],
            placements[placement],
            className,
          )}
        >
          {text}
        </span>
      )}
    </span>
  );
}
