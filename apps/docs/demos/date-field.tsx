'use client';

import { DateField, TimeField } from '@trellis-ui-pack/react';

export default function DateFieldDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <DateField label="Birth date" />
      <TimeField label="Meeting time" description="Uses the 12/24h format of your locale." />
    </div>
  );
}
