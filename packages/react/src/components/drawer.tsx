'use client';

import { Modal as RACModal, ModalOverlay, type ModalOverlayProps } from 'react-aria-components';
import { tv } from 'tailwind-variants';

const drawerStyles = tv({
  base: 'fixed flex flex-col border-border bg-background text-foreground shadow-2xl outline-none transition-transform duration-300 ease-out',
  variants: {
    placement: {
      right: 'inset-y-0 right-0 h-full w-full border-l data-entering:translate-x-full data-exiting:translate-x-full',
      left: 'inset-y-0 left-0 h-full w-full border-r data-entering:-translate-x-full data-exiting:-translate-x-full',
      bottom: 'inset-x-0 bottom-0 max-h-[85vh] w-full rounded-t-[calc(var(--tr-radius)*2)] border-t data-entering:translate-y-full data-exiting:translate-y-full',
      top: 'inset-x-0 top-0 max-h-[85vh] w-full rounded-b-[calc(var(--tr-radius)*2)] border-b data-entering:-translate-y-full data-exiting:-translate-y-full',
    },
    size: {
      sm: '',
      md: '',
      lg: '',
    },
  },
  compoundVariants: [
    { placement: ['left', 'right'], size: 'sm', class: 'max-w-xs' },
    { placement: ['left', 'right'], size: 'md', class: 'max-w-md' },
    { placement: ['left', 'right'], size: 'lg', class: 'max-w-2xl' },
  ],
});

export interface DrawerProps extends ModalOverlayProps {
  placement?: 'left' | 'right' | 'top' | 'bottom';
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Panel that slides in from an edge of the screen. Use it like Modal: inside a DialogTrigger, with a Dialog as child.
 * Dismissable by outside click and Escape by default.
 */
export function Drawer({ placement = 'right', size = 'md', isDismissable = true, className, ...props }: DrawerProps) {
  return (
    <ModalOverlay
      isDismissable={isDismissable}
      {...props}
      className="fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 data-entering:opacity-0 data-exiting:opacity-0"
    >
      <RACModal {...props} className={drawerStyles({ placement, size, className: typeof className === 'string' ? className : undefined })} />
    </ModalOverlay>
  );
}
