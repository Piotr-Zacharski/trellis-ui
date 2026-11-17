'use client';

import { Rating } from '@trellis-ui/react';

export default function RatingDemo() {
  return (
    <div className="flex flex-col gap-6">
      <Rating label="How was your stay?" defaultValue={4} />
      <Rating label="Read-only" value={3} isReadOnly size="sm" />
      <Rating aria-label="Large" defaultValue={2} size="lg" max={10} />
    </div>
  );
}
