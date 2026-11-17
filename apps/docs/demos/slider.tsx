'use client';

import { Slider } from '@trellis-ui-pack/react';

export default function SliderDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-8">
      <Slider label="Volume" defaultValue={40} />
      <Slider
        label="Price range"
        defaultValue={[200, 800]}
        minValue={0}
        maxValue={1000}
        step={10}
        thumbLabels={['Minimum', 'Maximum']}
        formatOptions={{ style: 'currency', currency: 'USD', maximumFractionDigits: 0 }}
      />
    </div>
  );
}
