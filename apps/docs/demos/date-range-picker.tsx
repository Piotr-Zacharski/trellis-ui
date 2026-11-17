'use client';

import { getLocalTimeZone, today } from '@internationalized/date';
import { DateRangePicker, RangeCalendar } from '@trellis-ui/react';

export default function DateRangePickerDemo() {
  const now = today(getLocalTimeZone());
  return (
    <div className="flex flex-col items-center gap-8">
      <DateRangePicker label="Stay" className="w-full max-w-sm" />
      <RangeCalendar aria-label="Trip dates" defaultValue={{ start: now, end: now.add({ days: 4 }) }} />
    </div>
  );
}
