'use client';

import { Avatar, Timeline, TimelineItem } from '@trellis-ui/react';

export default function TimelineDemo() {
  return (
    <Timeline className="w-full max-w-md">
      <TimelineItem title="Order placed" time="09:12" color="primary">
        Order #1042 was created.
      </TimelineItem>
      <TimelineItem title="Payment confirmed" time="09:14" color="primary" />
      <TimelineItem title="Ada commented" time="10:30" icon={<Avatar name="Ada Lovelace" size="xs" />}>
        “Please gift-wrap this one.”
      </TimelineItem>
      <TimelineItem title="Shipped" time="Tomorrow" />
    </Timeline>
  );
}
