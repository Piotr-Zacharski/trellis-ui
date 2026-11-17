import type { ComponentProps, ReactNode } from 'react';
import { cn } from '../utils';

export interface TrendChipProps extends ComponentProps<'span'> {
  /** Change in percent, e.g. `12.5` or `-3`. */
  value: number;
  /** For metrics where down is good (e.g. churn, latency). */
  invert?: boolean;
}

/** Colored ▲ / ▼ percentage change. */
export function TrendChip({ value, invert = false, className, ...props }: TrendChipProps) {
  const isUp = value > 0;
  const isGood = value === 0 ? null : invert ? !isUp : isUp;
  return (
    <span
      {...props}
      className={cn(
        'inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-xs font-medium tabular-nums',
        isGood === null && 'bg-muted text-muted-foreground',
        isGood === true && 'bg-primary-soft text-primary',
        isGood === false && 'bg-danger-soft text-danger',
        className,
      )}
    >
      <span aria-hidden="true">{value === 0 ? '•' : isUp ? '▲' : '▼'}</span>
      <span className="sr-only">{value === 0 ? 'No change' : isUp ? 'Up' : 'Down'}</span>
      {Math.abs(value).toLocaleString(undefined, { maximumFractionDigits: 1 })}%
    </span>
  );
}

export interface KpiProps extends Omit<ComponentProps<'div'>, 'title'> {
  title: ReactNode;
  value: ReactNode;
  /** Percent change, rendered as a TrendChip. */
  change?: number;
  invertTrend?: boolean;
  /** Small text under the value, e.g. "vs. last month". */
  description?: ReactNode;
  icon?: ReactNode;
  /** A sparkline or chart rendered at the bottom. */
  chart?: ReactNode;
}

/** Key metric card. Put several in a `grid` for a dashboard header. */
export function Kpi({ title, value, change, invertTrend, description, icon, chart, className, ...props }: KpiProps) {
  return (
    <div
      {...props}
      className={cn('flex flex-col gap-2 rounded-[calc(var(--tr-radius)*1.6)] border border-border bg-surface p-5 text-foreground', className)}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm text-muted-foreground">{title}</span>
        {icon && <span className="text-muted-foreground [&>svg]:size-4">{icon}</span>}
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-semibold tracking-tight tabular-nums">{value}</span>
        {change !== undefined && <TrendChip value={change} invert={invertTrend} />}
      </div>
      {description && <span className="text-xs text-muted-foreground">{description}</span>}
      {chart && <div className="mt-1">{chart}</div>}
    </div>
  );
}
