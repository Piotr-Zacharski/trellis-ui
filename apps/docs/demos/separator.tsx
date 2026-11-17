'use client';

import { Separator } from '@trellis-ui/react';

export default function SeparatorDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4 text-sm">
      <div>
        <p className="font-medium">Trellis UI</p>
        <p className="text-muted-foreground">Accessible components for React.</p>
      </div>
      <Separator />
      <div className="flex h-5 items-center gap-4 text-muted-foreground">
        <span>Docs</span>
        <Separator orientation="vertical" />
        <span>Components</span>
        <Separator orientation="vertical" />
        <span>GitHub</span>
      </div>
    </div>
  );
}
