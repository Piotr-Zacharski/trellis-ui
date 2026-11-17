'use client';

import { Button, CommandItem, CommandPalette, CommandSection, Kbd, toast } from '@trellis-ui-pack/react';
import { useState } from 'react';

export default function CommandPaletteDemo() {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Button variant="outline" color="neutral" onPress={() => setOpen(true)}>
        Open command palette <Kbd>⌘K</Kbd>
      </Button>
      <CommandPalette isOpen={isOpen} onOpenChange={setOpen} onAction={(key) => toast(`Run: ${key}`)}>
        <CommandSection title="Suggestions">
          <CommandItem id="new-project" shortcut="⌘N">
            New project
          </CommandItem>
          <CommandItem id="invite">Invite teammates</CommandItem>
          <CommandItem id="search-docs">Search documentation</CommandItem>
        </CommandSection>
        <CommandSection title="Settings">
          <CommandItem id="profile">Profile</CommandItem>
          <CommandItem id="billing">Billing</CommandItem>
          <CommandItem id="theme" shortcut="⌘T">
            Toggle theme
          </CommandItem>
        </CommandSection>
      </CommandPalette>
    </>
  );
}
