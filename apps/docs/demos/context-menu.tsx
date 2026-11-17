'use client';

import { ContextMenu, MenuItem, MenuSeparator, toast } from '@trellis-ui/react';

export default function ContextMenuDemo() {
  return (
    <ContextMenu
      aria-label="File actions"
      onAction={(key) => toast(`Action: ${key}`)}
      trigger={
        <div
          // biome-ignore lint/a11y/noNoninteractiveTabindex: focusable so keyboard users can open the context menu
          tabIndex={0}
          className="flex h-40 w-72 items-center justify-center rounded-[calc(var(--tr-radius)*1.4)] border-2 border-dashed border-input text-sm text-muted-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring"
        >
          Right-click here
        </div>
      }
    >
      <MenuItem id="copy" shortcut="⌘C">
        Copy
      </MenuItem>
      <MenuItem id="paste" shortcut="⌘V">
        Paste
      </MenuItem>
      <MenuSeparator />
      <MenuItem id="delete" variant="danger">
        Delete
      </MenuItem>
    </ContextMenu>
  );
}
