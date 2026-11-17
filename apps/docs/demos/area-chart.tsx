'use client';

import { AreaChart } from '@trellis-ui/charts';
import { monthly } from './charts-data';

export default function AreaChartDemo() {
  return (
    <AreaChart
      className="w-full max-w-2xl"
      aria-label="Revenue per month"
      data={monthly}
      index="month"
      series={[{ key: 'revenue', label: 'Revenue' }]}
      valueFormatter={(v) => `$${(v / 1000).toFixed(1)}k`}
    />
  );
}
