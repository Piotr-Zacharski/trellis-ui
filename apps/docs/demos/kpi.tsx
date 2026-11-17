'use client';

import { Sparkline } from '@trellis-ui-pack/charts';
import { Kpi, TrendChip } from '@trellis-ui-pack/react';

export default function KpiDemo() {
  return (
    <div className="flex w-full max-w-3xl flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <Kpi title="Revenue" value="$48,210" change={12.5} description="vs. last month" chart={<Sparkline data={[3, 5, 4, 6, 7, 6, 9]} />} />
        <Kpi
          title="Churn"
          value="2.4%"
          change={-0.8}
          invertTrend
          description="lower is better"
          chart={<Sparkline data={[6, 5, 5, 4, 4, 3, 3]} color="var(--tr-chart-2)" />}
        />
        <Kpi title="Active users" value="1,204" change={0} description="no change" chart={<Sparkline data={[4, 5, 4, 5, 4, 5, 4]} color="var(--tr-chart-3)" />} />
      </div>
      <div className="flex items-center justify-center gap-2">
        <TrendChip value={4.2} />
        <TrendChip value={-1.5} />
        <TrendChip value={-3} invert />
      </div>
    </div>
  );
}
