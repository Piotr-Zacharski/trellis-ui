'use client';

import { getLocalTimeZone, today } from '@internationalized/date';
import { Calendar } from '@trellis-ui-pack/react';

export default function CalendarDemo() {
  return <Calendar aria-label="Appointment date" defaultValue={today(getLocalTimeZone())} />;
}
