'use client';

import { Kbd, TextField } from '@trellis-ui/react';

export default function InputGroupDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <TextField label="Website" startContent="https://" placeholder="trellis.dev" />
      <TextField label="Price" startContent="$" endContent="USD" placeholder="0.00" inputMode="decimal" />
      <TextField
        aria-label="Search"
        placeholder="Search…"
        startContent={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-4" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        }
        endContent={<Kbd>⌘K</Kbd>}
      />
    </div>
  );
}
