import type { HTMLAttributes } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '../utils';

export const spinnerStyles = tv({
  base: 'inline-flex shrink-0 items-center justify-center',
  variants: {
    size: {
      sm: 'size-4',
      md: 'size-5',
      lg: 'size-8',
    },
    color: {
      current: 'text-current',
      primary: 'text-primary',
      neutral: 'text-muted-foreground',
      danger: 'text-danger',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'current',
  },
});

const dotSize = { sm: 'size-1', md: 'size-1.5', lg: 'size-2' } as const;

export interface SpinnerProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'color'>, VariantProps<typeof spinnerStyles> {
  /** `ring` – a rotating arc, `dots` – three pulsing dots. */
  variant?: 'ring' | 'dots';
  /** Accessible label. Pass `aria-hidden` instead when the spinner is purely decorative. */
  'aria-label'?: string;
}

export function Spinner({ variant = 'ring', size = 'md', color, className, ...props }: SpinnerProps) {
  const hidden = !!props['aria-hidden'];
  return (
    <span
      role={hidden ? undefined : 'status'}
      aria-label={hidden ? undefined : 'Loading'}
      {...props}
      className={spinnerStyles({ size, color, className })}
    >
      {variant === 'ring' ? (
        <svg viewBox="0 0 24 24" fill="none" className="size-full animate-spin" aria-hidden="true">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
          <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      ) : (
        <span className="flex items-center gap-[18%]" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={cn('animate-tr-dot rounded-full bg-current', dotSize[size])}
              style={{ animationDelay: `${i * 0.16}s` }}
            />
          ))}
        </span>
      )}
    </span>
  );
}
