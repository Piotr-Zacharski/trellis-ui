'use client';

import { DonutChart } from '@trellis-ui/charts';

const traffic = [
  { source: 'Search', visits: 4210 },
  { source: 'Direct', visits: 2380 },
  { source: 'Social', visits: 1290 },
  { source: 'Referral', visits: 760 },
];

export default function DonutChartDemo() {
  const total = traffic.reduce((sum, t) => sum + t.visits, 0);
  return (
    <DonutChart
      className="w-full max-w-sm"
      aria-label="Traffic by source"
      data={traffic}
      nameKey="source"
      valueKey="visits"
      centerLabel={total.toLocaleString()}
      centerDescription="visits"
    />
  );
}
