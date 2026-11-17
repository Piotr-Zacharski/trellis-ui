'use client';

import type { ReactNode } from 'react';
import {
  Dialog,
  type DialogProps,
  Heading,
  OverlayArrow,
  Popover as RACPopover,
  type PopoverProps,
} from 'react-aria-components';
import { composeTailwindRenderProps } from '../utils';

export { DialogTrigger as PopoverTrigger } from 'react-aria-components';

export const popoverClassName =
  'overflow-auto rounded-tr border border-border bg-background text-foreground shadow-lg outline-none transition-[opacity,transform] duration-150 data-entering:scale-95 data-entering:opacity-0 data-exiting:opacity-0';

/** Bare floating panel – also used internally by Select, ComboBox and DatePicker. */
export function Popover(props: PopoverProps) {
  return <RACPopover offset={6} {...props} className={composeTailwindRenderProps(props.className, popoverClassName)} />;
}

export interface PopoverContentProps extends Omit<PopoverProps, 'children'> {
  title?: ReactNode;
  /** Render a small arrow pointing at the trigger. */
  showArrow?: boolean;
  children?: DialogProps['children'];
}

/** Popup with dialog semantics, opened by a `PopoverTrigger`. Closes on outside click and Escape. */
export function PopoverContent({ title, showArrow = false, children, className, ...props }: PopoverContentProps) {
  return (
    <Popover
      offset={showArrow ? 10 : 6}
      {...props}
      className={composeTailwindRenderProps(className, 'max-w-80 overflow-visible')}
    >
      {showArrow && (
        <OverlayArrow className="group">
          <svg
            width={12}
            height={12}
            viewBox="0 0 12 12"
            className="block fill-background stroke-border group-data-[placement=bottom]:rotate-180 group-data-[placement=left]:-rotate-90 group-data-[placement=right]:rotate-90"
          >
            <path d="M0 0 L6 6 L12 0" />
          </svg>
        </OverlayArrow>
      )}
      <Dialog className="p-4 text-sm outline-none">
        {(renderProps) => (
          <>
            {title && (
              <Heading slot="title" className="mb-1 text-sm font-semibold">
                {title}
              </Heading>
            )}
            {typeof children === 'function' ? children(renderProps) : children}
          </>
        )}
      </Dialog>
    </Popover>
  );
}
