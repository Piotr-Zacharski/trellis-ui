'use client';

import { Avatar, Badge, Button } from '@trellis-ui/react';

const BellIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-5" aria-hidden="true">
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
);

export default function BadgeDemo() {
  return (
    <div className="flex items-center gap-8">
      <Badge content={5}>
        <Button variant="outline" color="neutral" size="icon" aria-label="Notifications, 5 unread">
          <BellIcon />
        </Button>
      </Badge>
      <Badge content={120} color="primary">
        <Avatar name="Ada Lovelace" />
      </Badge>
      <Badge color="primary" placement="bottom-right">
        <Avatar name="Grace Hopper" />
      </Badge>
    </div>
  );
}
