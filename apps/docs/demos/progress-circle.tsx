'use client';

import { ProgressCircle } from '@trellis-ui/react';
import { useEffect, useState } from 'react';

export default function ProgressCircleDemo() {
  const [value, setValue] = useState(25);

  useEffect(() => {
    const id = setInterval(() => setValue((v) => (v >= 100 ? 0 : v + 5)), 500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center gap-6">
      <ProgressCircle aria-label="Loading" value={value} size="sm" />
      <ProgressCircle aria-label="Loading" value={value} size="md" />
      <ProgressCircle aria-label="Loading" value={value} size="lg" showValueLabel />
      <ProgressCircle aria-label="Syncing" isIndeterminate size="lg" color="neutral" />
    </div>
  );
}
