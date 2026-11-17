'use client';

import { BarChart } from '@trellis-ui-pack/charts';
import { monthly } from './charts-data';

export default function BarChartDemo() {
  return (
    <div className="grid w-full max-w-3xl gap-8 md:grid-cols-2">
      <BarChart
        aria-label="Signups and trials per month"
        data={monthly}
        index="month"
        series={[
          { key: 'signups', label: 'Signups' },
          { key: 'trials', label: 'Trials' },
        ]}
      />
      <BarChart
        aria-label="Signups per month"
        data={monthly.slice(0, 4)}
        index="month"
        series={[{ key: 'signups', label: 'Signups' }]}
        horizontal
      />
    </div>
  );
}
