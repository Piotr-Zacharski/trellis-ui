'use client';

import { ProgressBar } from '@trellis-ui/react';
import { useEffect, useState } from 'react';

export default function ProgressBarDemo() {
  const [value, setValue] = useState(10);

  useEffect(() => {
    const id = setInterval(() => setValue((v) => (v >= 100 ? 0 : v + 10)), 800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <ProgressBar label="Uploading" value={value} showValueLabel />
      <ProgressBar label="Storage" value={85} color="warning" showValueLabel size="sm" />
      <ProgressBar label="Processing…" isIndeterminate />
    </div>
  );
}
