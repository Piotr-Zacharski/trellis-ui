'use client';

import { NumberField } from '@trellis-ui-pack/react';

export default function NumberFieldDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <NumberField label="Quantity" defaultValue={1} minValue={1} maxValue={99} />
      <NumberField
        label="Price"
        defaultValue={49.9}
        formatOptions={{ style: 'currency', currency: 'EUR' }}
        step={0.1}
        showStepper
        description="With showStepper – increment / decrement buttons."
      />
    </div>
  );
}
