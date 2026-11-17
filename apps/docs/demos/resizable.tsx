'use client';

import { ResizablePanels } from '@trellis-ui/react';

export default function ResizableDemo() {
  return (
    <div className="h-72 w-full max-w-2xl overflow-hidden rounded-[calc(var(--tr-radius)*1.4)] border border-border">
      <ResizablePanels defaultSizes={[25, 75]} minSizes={[15, 30]}>
        <div className="flex h-full items-center justify-center bg-surface text-sm text-muted-foreground">Sidebar</div>
        <ResizablePanels orientation="vertical" defaultSizes={[65, 35]}>
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">Editor</div>
          <div className="flex h-full items-center justify-center bg-surface text-sm text-muted-foreground">Terminal</div>
        </ResizablePanels>
      </ResizablePanels>
    </div>
  );
}
