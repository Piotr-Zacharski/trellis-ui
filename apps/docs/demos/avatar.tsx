'use client';

import { Avatar, AvatarGroup } from '@trellis-ui-pack/react';

export default function AvatarDemo() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-3">
        <Avatar name="Ada Lovelace" size="xs" />
        <Avatar name="Grace Hopper" size="sm" status="online" />
        <Avatar name="Alan Turing" status="away" />
        <Avatar name="Linus" size="lg" status="busy" />
      </div>
      <AvatarGroup max={4}>
        <Avatar name="Ada Lovelace" />
        <Avatar name="Grace Hopper" />
        <Avatar name="Alan Turing" />
        <Avatar name="Margaret Hamilton" />
        <Avatar name="Dennis Ritchie" />
        <Avatar name="Barbara Liskov" />
      </AvatarGroup>
    </div>
  );
}
