'use client';

import { getLocalTimeZone, today } from '@internationalized/date';
import { DatePicker } from '@trellis-ui-pack/react';

export default function DatePickerDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <DatePicker label="Event date" />
      <DatePicker
        label="Delivery date"
        defaultValue={today(getLocalTimeZone()).add({ days: 3 })}
        minValue={today(getLocalTimeZone())}
        description="Only future dates can be selected."
      />
    </div>
  );
}
