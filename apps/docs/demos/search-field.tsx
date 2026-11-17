'use client';

import { Kbd, SearchField, toast } from '@trellis-ui-pack/react';

export default function SearchFieldDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <SearchField label="Search" placeholder="Search projects…" onSubmit={(query) => toast(`Searching for “${query}”`)} />
      <p className="text-xs text-muted-foreground">
        Press <Kbd>Enter</Kbd> to search, <Kbd>Esc</Kbd> to clear.
      </p>
    </div>
  );
}
