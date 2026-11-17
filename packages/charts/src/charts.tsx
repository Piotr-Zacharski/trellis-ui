'use client';

import { cn } from '@trellis-ui-pack/react';
import type { ReactNode } from 'react';
import {
  Area,
  Bar,
  CartesianGrid,
  Cell,
  Line,
  Pie,
  AreaChart as RAreaChart,
  BarChart as RBarChart,
  LineChart as RLineChart,
  PieChart as RPieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export type ChartDatum = Record<string, string | number | null | undefined>;

export interface ChartSeries {
  /** Key of the value in each data row. */
  key: string;
  label?: string;
  /** Any CSS color. Defaults to the --tr-chart-1…5 palette. */
  color?: string;
}

interface CartesianChartProps {
  data: ChartDatum[];
  /** Key of the x-axis value in each row, e.g. `month`. */
  index: string;
  series: ChartSeries[];
  height?: number;
  valueFormatter?: (value: number) => string;
  showGrid?: boolean;
  showLegend?: boolean;
  showYAxis?: boolean;
  className?: string;
  /** Accessible description of what the chart shows. */
  'aria-label'?: string;
}

const palette = (i: number) => `var(--tr-chart-${(i % 5) + 1})`;
const colorOf = (s: ChartSeries, i: number) => s.color ?? palette(i);
const defaultFormatter = (value: number) => value.toLocaleString();

const axisProps = {
  tickLine: false,
  axisLine: false,
  tick: { fill: 'var(--tr-muted-foreground)', fontSize: 12 },
} as const;

interface TooltipItem {
  dataKey?: unknown;
  name?: unknown;
  value?: unknown;
  color?: string;
  payload?: unknown;
}

function ChartTooltip({
  active,
  payload,
  label,
  valueFormatter,
}: { active?: boolean; payload?: readonly TooltipItem[]; label?: ReactNode; valueFormatter: (value: number) => string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="min-w-36 rounded-[calc(var(--tr-radius)*0.8)] border border-border bg-background px-3 py-2 text-xs text-foreground shadow-lg">
      {label != null && <p className="mb-1.5 font-medium">{label}</p>}
      <ul className="flex flex-col gap-1">
        {payload.map((item) => (
          <li key={String(item.dataKey ?? item.name)} className="flex items-center gap-2">
            <span className="size-2 shrink-0 rounded-full" style={{ background: item.color ?? (item.payload as { fill?: string })?.fill }} />
            <span className="flex-1 text-muted-foreground">{String(item.name)}</span>
            <span className="font-medium tabular-nums">{valueFormatter(Number(item.value))}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Legend({ items }: { items: { label: ReactNode; color: string }[] }) {
  return (
    <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 pt-3 text-xs text-muted-foreground">
      {items.map((item, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: legend order is stable
        <li key={i} className="flex items-center gap-1.5">
          <span className="size-2 rounded-full" style={{ background: item.color }} />
          {item.label}
        </li>
      ))}
    </ul>
  );
}

function Frame({
  height,
  className,
  label,
  legend,
  children,
}: {
  height: number;
  className?: string;
  label?: string;
  legend?: ReactNode;
  children: React.ReactElement;
}) {
  return (
    <figure role="figure" aria-label={label} className={cn('w-full text-foreground', className)}>
      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </div>
      {legend}
    </figure>
  );
}

function cartesianCommon(
  { index, showGrid = true, showYAxis = true, valueFormatter = defaultFormatter }: CartesianChartProps,
  options: { horizontal?: boolean } = {},
) {
  return [
    showGrid && <CartesianGrid key="grid" stroke="var(--tr-border)" strokeDasharray="3 3" vertical={!!options.horizontal} horizontal={!options.horizontal} />,
    options.horizontal ? (
      <XAxis key="x" type="number" {...axisProps} tickFormatter={valueFormatter} hide={!showYAxis} />
    ) : (
      <XAxis key="x" dataKey={index} {...axisProps} tickMargin={8} />
    ),
    options.horizontal ? (
      <YAxis key="y" type="category" dataKey={index} {...axisProps} width={90} />
    ) : (
      <YAxis key="y" {...axisProps} tickFormatter={valueFormatter} width={48} hide={!showYAxis} />
    ),
    <Tooltip
      key="tooltip"
      cursor={{ stroke: 'var(--tr-border)', fill: 'var(--tr-muted)', fillOpacity: 0.5 }}
      content={({ active, payload, label }) => (
        <ChartTooltip active={active} payload={payload} label={label} valueFormatter={valueFormatter} />
      )}
    />,
  ];
}

export interface LineChartProps extends CartesianChartProps {
  curved?: boolean;
  showDots?: boolean;
}

export function LineChart({ curved = true, showDots = false, ...props }: LineChartProps) {
  const { data, series, height = 280, showLegend = series.length > 1, className } = props;
  return (
    <Frame
      height={height}
      className={className}
      label={props['aria-label']}
      legend={showLegend && <Legend items={series.map((s, i) => ({ label: s.label ?? s.key, color: colorOf(s, i) }))} />}
    >
      <RLineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        {cartesianCommon(props)}
        {series.map((s, i) => (
          <Line
            key={s.key}
            dataKey={s.key}
            name={s.label ?? s.key}
            type={curved ? 'monotone' : 'linear'}
            stroke={colorOf(s, i)}
            strokeWidth={2}
            dot={showDots}
            activeDot={{ r: 4, strokeWidth: 0 }}
          />
        ))}
      </RLineChart>
    </Frame>
  );
}

export interface AreaChartProps extends CartesianChartProps {
  stacked?: boolean;
  curved?: boolean;
}

export function AreaChart({ stacked = false, curved = true, ...props }: AreaChartProps) {
  const { data, series, height = 280, showLegend = series.length > 1, className } = props;
  return (
    <Frame
      height={height}
      className={className}
      label={props['aria-label']}
      legend={showLegend && <Legend items={series.map((s, i) => ({ label: s.label ?? s.key, color: colorOf(s, i) }))} />}
    >
      <RAreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <defs>
          {series.map((s, i) => (
            <linearGradient key={s.key} id={`tr-area-${s.key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={colorOf(s, i)} stopOpacity={0.3} />
              <stop offset="100%" stopColor={colorOf(s, i)} stopOpacity={0.02} />
            </linearGradient>
          ))}
        </defs>
        {cartesianCommon(props)}
        {series.map((s, i) => (
          <Area
            key={s.key}
            dataKey={s.key}
            name={s.label ?? s.key}
            type={curved ? 'monotone' : 'linear'}
            stackId={stacked ? 'stack' : undefined}
            stroke={colorOf(s, i)}
            strokeWidth={2}
            fill={`url(#tr-area-${s.key})`}
            activeDot={{ r: 4, strokeWidth: 0 }}
          />
        ))}
      </RAreaChart>
    </Frame>
  );
}

export interface BarChartProps extends CartesianChartProps {
  stacked?: boolean;
  /** Bars grow left-to-right, with categories on the y-axis. */
  horizontal?: boolean;
}

export function BarChart({ stacked = false, horizontal = false, ...props }: BarChartProps) {
  const { data, series, height = 280, showLegend = series.length > 1, className } = props;
  return (
    <Frame
      height={height}
      className={className}
      label={props['aria-label']}
      legend={showLegend && <Legend items={series.map((s, i) => ({ label: s.label ?? s.key, color: colorOf(s, i) }))} />}
    >
      <RBarChart data={data} layout={horizontal ? 'vertical' : 'horizontal'} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        {cartesianCommon(props, { horizontal })}
        {series.map((s, i) => (
          <Bar
            key={s.key}
            dataKey={s.key}
            name={s.label ?? s.key}
            stackId={stacked ? 'stack' : undefined}
            fill={colorOf(s, i)}
            radius={stacked ? 0 : horizontal ? [0, 4, 4, 0] : [4, 4, 0, 0]}
            maxBarSize={40}
          />
        ))}
      </RBarChart>
    </Frame>
  );
}

export interface DonutChartProps {
  data: ChartDatum[];
  /** Key of the slice label. */
  nameKey: string;
  /** Key of the slice value. */
  valueKey: string;
  /** Per-slice colors, defaults to the chart palette. */
  colors?: string[];
  /** Big text in the middle, e.g. the total. */
  centerLabel?: ReactNode;
  centerDescription?: ReactNode;
  height?: number;
  valueFormatter?: (value: number) => string;
  showLegend?: boolean;
  className?: string;
  'aria-label'?: string;
}

export function DonutChart({
  data,
  nameKey,
  valueKey,
  colors,
  centerLabel,
  centerDescription,
  height = 240,
  valueFormatter = defaultFormatter,
  showLegend = true,
  className,
  'aria-label': ariaLabel,
}: DonutChartProps) {
  const colorAt = (i: number) => colors?.[i] ?? palette(i);
  return (
    <Frame
      height={height}
      className={className}
      label={ariaLabel}
      legend={showLegend && <Legend items={data.map((d, i) => ({ label: String(d[nameKey]), color: colorAt(i) }))} />}
    >
      <RPieChart>
        <Tooltip content={({ active, payload }) => <ChartTooltip active={active} payload={payload} valueFormatter={valueFormatter} />} />
        <Pie data={data} dataKey={valueKey} nameKey={nameKey} innerRadius="62%" outerRadius="90%" paddingAngle={2} stroke="none">
          {data.map((d, i) => (
            <Cell key={String(d[nameKey])} fill={colorAt(i)} />
          ))}
        </Pie>
        {centerLabel != null && (
          <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
            <tspan x="50%" dy={centerDescription ? '-0.4em' : 0} className="fill-foreground text-xl font-semibold">
              {centerLabel}
            </tspan>
            {centerDescription && (
              <tspan x="50%" dy="1.6em" className="fill-muted-foreground text-xs">
                {centerDescription}
              </tspan>
            )}
          </text>
        )}
      </RPieChart>
    </Frame>
  );
}

export interface SparklineProps {
  data: number[];
  color?: string;
  height?: number;
  /** Area fill under the line. */
  filled?: boolean;
  className?: string;
}

/** Tiny trend line without axes – for KPI cards and tables. Pure SVG, no Recharts needed. */
export function Sparkline({ data, color = 'var(--tr-chart-1)', height = 36, filled = true, className }: SparklineProps) {
  if (data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;
  const points = data.map((v, i) => [(i / (data.length - 1)) * 100, 100 - ((v - min) / span) * 90 - 5] as const);
  const line = points.map(([x, y], i) => `${i ? 'L' : 'M'}${x},${y}`).join(' ');
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={cn('w-full', className)} style={{ height }} aria-hidden="true">
      {filled && <path d={`${line} L100,100 L0,100 Z`} fill={color} opacity={0.12} />}
      <path d={line} fill="none" stroke={color} strokeWidth={2} vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
    </svg>
  );
}
