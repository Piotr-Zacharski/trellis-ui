'use client';

import { type ReactNode, useEffect } from 'react';
import {
  Autocomplete,
  Dialog,
  Input,
  type MenuProps,
  Modal,
  ModalOverlay,
  SearchField,
  useFilter,
} from 'react-aria-components';
import { cn } from '../utils';
import { SearchIcon } from './icons';
import { MenuList } from './menu';

export { MenuItem as CommandItem, MenuSection as CommandSection, MenuSeparator as CommandSeparator } from './menu';

export interface CommandPaletteProps<T extends object> extends Omit<MenuProps<T>, 'className'> {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  placeholder?: string;
  /** Registers ⌘ + key (Ctrl + key on Windows/Linux) to toggle the palette. Pass `null` to disable. */
  shortcut?: string | null;
  /** Shown when nothing matches. */
  emptyState?: ReactNode;
  className?: string;
}

/** ⌘K command palette: a search field that filters a menu of actions. Closes after an action runs. */
export function CommandPalette<T extends object>({
  isOpen,
  onOpenChange,
  placeholder = 'Type a command or search…',
  shortcut = 'k',
  emptyState = 'No results found.',
  onAction,
  className,
  ...menuProps
}: CommandPaletteProps<T>) {
  const { contains } = useFilter({ sensitivity: 'base' });

  useEffect(() => {
    if (!shortcut) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === shortcut.toLowerCase() && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        onOpenChange(!isOpen);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [shortcut, isOpen, onOpenChange]);

  return (
    <ModalOverlay
      isDismissable
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 p-4 pt-[15vh] transition-opacity duration-150 data-entering:opacity-0 data-exiting:opacity-0"
    >
      <Modal
        className={cn(
          'w-full max-w-lg overflow-hidden rounded-[calc(var(--tr-radius)*1.6)] border border-border bg-background text-foreground shadow-2xl outline-none transition-[opacity,transform] duration-150 data-entering:scale-95 data-entering:opacity-0',
          className,
        )}
      >
        <Dialog aria-label="Command palette" className="flex max-h-[60vh] flex-col outline-none">
          <Autocomplete filter={contains}>
            <SearchField aria-label="Search commands" autoFocus className="flex items-center gap-2 border-b border-border px-4">
              <SearchIcon className="size-4 shrink-0 text-muted-foreground" />
              <Input
                placeholder={placeholder}
                className="h-12 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground [&::-webkit-search-cancel-button]:hidden"
              />
            </SearchField>
            <MenuList
              {...menuProps}
              onAction={(key, value) => {
                onAction?.(key, value);
                onOpenChange(false);
              }}
              renderEmptyState={() => <p className="px-3 py-6 text-center text-sm text-muted-foreground">{emptyState}</p>}
              className="flex-1 overflow-auto p-1.5"
            />
          </Autocomplete>
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
}
