'use client';

import { type MouseEvent, type ReactNode, useRef, useState } from 'react';
import {
  composeRenderProps,
  Header,
  Keyboard,
  Menu as RACMenu,
  MenuItem as RACMenuItem,
  type MenuItemProps as RACMenuItemProps,
  type MenuProps as RACMenuProps,
  MenuSection as RACMenuSection,
  type MenuSectionProps as RACMenuSectionProps,
  type PopoverProps,
  Separator,
  Text,
} from 'react-aria-components';
import { cn, composeTailwindRenderProps } from '../utils';
import { CheckIcon, ChevronRightIcon } from './icons';
import { Popover } from './popover';

export { MenuTrigger, SubmenuTrigger } from 'react-aria-components';

export interface MenuProps<T extends object> extends RACMenuProps<T> {
  placement?: PopoverProps['placement'];
}

/** Dropdown menu. Put it after a Button inside `MenuTrigger`. Renders its own popover. */
export function Menu<T extends object>({ placement, ...props }: MenuProps<T>) {
  return (
    <Popover placement={placement} className="min-w-48 p-1">
      <MenuList {...props} />
    </Popover>
  );
}

/** The menu list without a popover – for command palettes and context menus. */
export function MenuList<T extends object>(props: RACMenuProps<T>) {
  return <RACMenu {...props} className={composeTailwindRenderProps(props.className, 'max-h-[inherit] overflow-auto outline-none')} />;
}

export interface MenuItemProps extends RACMenuItemProps {
  /** Leading icon. */
  icon?: ReactNode;
  /** Secondary line under the label. */
  description?: ReactNode;
  /** Keyboard shortcut hint, e.g. `⌘C`. */
  shortcut?: string;
  variant?: 'default' | 'danger';
}

export function MenuItem({ icon, description, shortcut, variant = 'default', children, ...props }: MenuItemProps) {
  const textValue = props.textValue ?? (typeof children === 'string' ? children : undefined);
  return (
    <RACMenuItem
      {...props}
      textValue={textValue}
      className={composeTailwindRenderProps(
        props.className,
        cn(
          'group flex cursor-default items-center gap-2.5 rounded-[calc(var(--tr-radius)*0.6)] px-2.5 py-2 text-sm outline-none data-disabled:opacity-50',
          variant === 'danger'
            ? 'text-danger data-focused:bg-danger-soft'
            : 'text-foreground data-focused:bg-muted data-open:bg-muted',
        ),
      )}
    >
      {composeRenderProps(children, (children, { selectionMode, isSelected, hasSubmenu }) => (
        <>
          {selectionMode !== 'none' && (
            <span className="flex size-4 shrink-0 items-center justify-center">{isSelected && <CheckIcon className="size-4" />}</span>
          )}
          {icon && <span className="flex size-4 shrink-0 items-center justify-center text-muted-foreground [&>svg]:size-4">{icon}</span>}
          <span className="flex min-w-0 flex-1 flex-col">
            <Text slot="label" className="truncate">
              {children}
            </Text>
            {description && (
              <Text slot="description" className="text-xs text-muted-foreground">
                {description}
              </Text>
            )}
          </span>
          {shortcut && <Keyboard className="font-sans text-xs text-muted-foreground">{shortcut}</Keyboard>}
          {hasSubmenu && <ChevronRightIcon className="size-4 text-muted-foreground" />}
        </>
      ))}
    </RACMenuItem>
  );
}

export interface MenuSectionProps<T extends object> extends Omit<RACMenuSectionProps<T>, 'children'> {
  title?: ReactNode;
  children?: ReactNode;
}

export function MenuSection<T extends object>({ title, children, ...props }: MenuSectionProps<T>) {
  return (
    <RACMenuSection {...props} className={cn('flex flex-col', props.className)}>
      {title && <Header className="px-2.5 pt-2 pb-1 text-xs font-medium text-muted-foreground">{title}</Header>}
      {children}
    </RACMenuSection>
  );
}

export function MenuSeparator() {
  return <Separator className="mx-1 my-1 border-t border-border" />;
}

export interface ContextMenuProps<T extends object> extends RACMenuProps<T> {
  /** The area that opens the menu on right click (or Shift+F10 / the context-menu key when focused). */
  trigger: ReactNode;
  className?: string;
}

/** Opens a menu at the pointer on right click. */
export function ContextMenu<T extends object>({ trigger, className, onAction, ...menuProps }: ContextMenuProps<T>) {
  const anchorRef = useRef<HTMLSpanElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);

  const open = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setPosition({ x: event.clientX, y: event.clientY });
  };

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: context menu area; keyboard users open it with Shift+F10 / the menu key
    <div
      className={className}
      onContextMenu={open}
      onKeyDown={(event) => {
        if (event.key === 'ContextMenu' || (event.shiftKey && event.key === 'F10')) {
          event.preventDefault();
          const rect = event.currentTarget.getBoundingClientRect();
          setPosition({ x: rect.left + 16, y: rect.top + 16 });
        }
      }}
    >
      {trigger}
      <span ref={anchorRef} aria-hidden="true" className="pointer-events-none fixed size-0" style={{ left: position?.x, top: position?.y }} />
      <Popover
        triggerRef={anchorRef}
        isOpen={position !== null}
        onOpenChange={(isOpen) => !isOpen && setPosition(null)}
        placement="bottom start"
        offset={2}
        className="min-w-48 p-1"
      >
        <MenuList
          {...menuProps}
          autoFocus="first"
          onAction={(key, value) => {
            onAction?.(key, value);
            setPosition(null);
          }}
        />
      </Popover>
    </div>
  );
}
