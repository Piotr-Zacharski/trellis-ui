'use client';

import { Button } from '@trellis-ui/react';

export default function ButtonVariants() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="solid">Solid</Button>
      <Button variant="soft">Soft</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  );
}
