'use client';

import { Kbd } from '@trellis-ui-pack/react';

export default function KbdDemo() {
  return (
    <div className="flex flex-col items-center gap-3 text-sm text-muted-foreground">
      <p className="flex items-center gap-1">
        Open the command palette with <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </p>
      <p className="flex items-center gap-1">
        Save: <Kbd>Ctrl</Kbd> + <Kbd>S</Kbd>
      </p>
    </div>
  );
}
