'use client';

import { type ReactNode, useEffect, useRef, useState } from 'react';
import { Popover as RACPopover, type PopoverProps } from 'react-aria-components';
import { cn } from '../utils';
import { popoverClassName } from './popover';

export interface HoverCardProps {
  /** The element that opens the card on hover or focus – usually a link. */
  children: ReactNode;
  /** Card content. */
  content: ReactNode;
  placement?: PopoverProps['placement'];
  openDelay?: number;
  closeDelay?: number;
  className?: string;
}

/**
 * Rich preview shown while hovering or focusing a trigger, e.g. a user profile behind an @mention.
 * Unlike a Tooltip it can hold interactive content; it is supplementary, so the trigger should work on its own too.
 */
export function HoverCard({ children, content, placement = 'bottom', openDelay = 300, closeDelay = 200, className }: HoverCardProps) {
  const triggerRef = useRef<HTMLSpanElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => () => clearTimeout(timer.current), []);

  const schedule = (open: boolean) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(open), open ? openDelay : closeDelay);
  };

  return (
    <>
      {/* biome-ignore lint/a11y/noStaticElementInteractions: hover/focus wrapper around a focusable trigger */}
      <span
        ref={triggerRef}
        className="inline-flex"
        onPointerEnter={(e) => e.pointerType === 'mouse' && schedule(true)}
        onPointerLeave={(e) => e.pointerType === 'mouse' && schedule(false)}
        onFocus={() => schedule(true)}
        onBlur={() => schedule(false)}
      >
        {children}
      </span>
      <RACPopover
        triggerRef={triggerRef}
        isOpen={isOpen}
        onOpenChange={setOpen}
        isNonModal
        placement={placement}
        offset={8}
        className={cn(popoverClassName, 'w-72 p-4', className)}
      >
        {/* biome-ignore lint/a11y/noStaticElementInteractions: keeps the card open while the pointer is over it */}
        <div onPointerEnter={() => clearTimeout(timer.current)} onPointerLeave={() => schedule(false)}>
          {content}
        </div>
      </RACPopover>
    </>
  );
}
