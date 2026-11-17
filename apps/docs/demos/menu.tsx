'use client';

import { Button, Menu, MenuItem, MenuSection, MenuSeparator, MenuTrigger, SubmenuTrigger, toast } from '@trellis-ui/react';

export default function MenuDemo() {
  return (
    <MenuTrigger>
      <Button variant="outline" color="neutral">
        Actions
      </Button>
      <Menu onAction={(key) => toast(`Selected: ${key}`)}>
        <MenuSection title="File">
          <MenuItem id="new" shortcut="⌘N">
            New file
          </MenuItem>
          <MenuItem id="open" shortcut="⌘O">
            Open…
          </MenuItem>
          <SubmenuTrigger>
            <MenuItem id="share">Share</MenuItem>
            <Menu>
              <MenuItem id="email">E-mail</MenuItem>
              <MenuItem id="link">Copy link</MenuItem>
            </Menu>
          </SubmenuTrigger>
        </MenuSection>
        <MenuSeparator />
        <MenuItem id="rename" description="Change the file name">
          Rename
        </MenuItem>
        <MenuItem id="delete" variant="danger" shortcut="⌫">
          Delete
        </MenuItem>
      </Menu>
    </MenuTrigger>
  );
}
