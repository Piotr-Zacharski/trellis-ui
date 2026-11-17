'use client';

import { LineChart } from '@trellis-ui/charts';
import { monthly } from './charts-data';

export default function LineChartDemo() {
  return (
    <LineChart
      className="w-full max-w-2xl"
      aria-label="Signups and trials per month"
      data={monthly}
      index="month"
      series={[
        { key: 'signups', label: 'Signups' },
        { key: 'trials', label: 'Trials' },
      ]}
    />
  );
}
