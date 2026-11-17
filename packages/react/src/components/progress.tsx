'use client';

import type { ReactNode } from 'react';
import { ProgressBar as RACProgressBar, type ProgressBarProps as RACProgressBarProps } from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { cn, composeTailwindRenderProps } from '../utils';
import { Label } from './field';

type ProgressColor = 'primary' | 'neutral' | 'danger' | 'warning';

const fillColor: Record<ProgressColor, string> = {
  primary: 'bg-primary',
  neutral: 'bg-foreground',
  danger: 'bg-danger',
  warning: 'bg-warning',
};

const strokeColor: Record<ProgressColor, string> = {
  primary: 'stroke-primary',
  neutral: 'stroke-foreground',
  danger: 'stroke-danger',
  warning: 'stroke-warning',
};

const trackStyles = tv({
  base: 'relative w-full overflow-hidden rounded-full bg-muted',
  variants: {
    size: {
      sm: 'h-1',
      md: 'h-2',
      lg: 'h-3',
    },
  },
});

export interface ProgressBarProps extends Omit<RACProgressBarProps, 'children'> {
  label?: ReactNode;
  /** Show the formatted value (e.g. "40%") next to the label. */
  showValueLabel?: boolean;
  color?: ProgressColor;
  size?: 'sm' | 'md' | 'lg';
}

/** Linear progress. Omit `value` and pass `isIndeterminate` when the duration is unknown. */
export function ProgressBar({
  label,
  showValueLabel = false,
  color = 'primary',
  size = 'md',
  className,
  ...props
}: ProgressBarProps) {
  return (
    <RACProgressBar {...props} className={composeTailwindRenderProps(className, 'flex w-full flex-col gap-1.5')}>
      {({ percentage, valueText, isIndeterminate }) => (
        <>
          {(label || showValueLabel) && (
            <div className="flex items-center justify-between gap-2">
              {label ? <Label>{label}</Label> : <span />}
              {showValueLabel && !isIndeterminate && (
                <span className="text-sm tabular-nums text-muted-foreground">{valueText}</span>
              )}
            </div>
          )}
          <div className={trackStyles({ size })}>
            <div
              className={cn(
                'absolute inset-y-0 left-0 rounded-full',
                fillColor[color],
                isIndeterminate ? 'w-2/5 animate-tr-indeterminate' : 'transition-[width] duration-300',
              )}
              style={isIndeterminate ? undefined : { width: `${percentage ?? 0}%` }}
            />
          </div>
        </>
      )}
    </RACProgressBar>
  );
}

const circleSize = { sm: 'size-6', md: 'size-10', lg: 'size-16' } as const;

export interface ProgressCircleProps extends Omit<RACProgressBarProps, 'children'> {
  /** Show the percentage in the middle of the circle (best with `size="lg"`). */
  showValueLabel?: boolean;
  color?: ProgressColor;
  size?: 'sm' | 'md' | 'lg';
}

/** Circular progress. Requires `aria-label` (or `aria-labelledby`) since it has no visible label. */
export function ProgressCircle({
  showValueLabel = false,
  color = 'primary',
  size = 'md',
  className,
  ...props
}: ProgressCircleProps) {
  const radius = 14;
  const circumference = 2 * Math.PI * radius;

  return (
    <RACProgressBar
      {...props}
      className={composeTailwindRenderProps(className, cn('relative inline-flex shrink-0 items-center justify-center', circleSize[size]))}
    >
      {({ percentage, valueText, isIndeterminate }) => (
        <>
          <svg viewBox="0 0 32 32" fill="none" strokeWidth={3} className={cn('size-full', isIndeterminate && 'animate-spin')} aria-hidden="true">
            <circle cx="16" cy="16" r={radius} className="stroke-muted" />
            <circle
              cx="16"
              cy="16"
              r={radius}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={isIndeterminate ? circumference * 0.7 : circumference - ((percentage ?? 0) / 100) * circumference}
              transform="rotate(-90 16 16)"
              className={cn(strokeColor[color], !isIndeterminate && 'transition-[stroke-dashoffset] duration-300')}
            />
          </svg>
          {showValueLabel && !isIndeterminate && (
            <span className="absolute text-xs font-medium tabular-nums text-foreground">{valueText}</span>
          )}
        </>
      )}
    </RACProgressBar>
  );
}
