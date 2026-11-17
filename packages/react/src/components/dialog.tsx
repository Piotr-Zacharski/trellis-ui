'use client';

import type { ComponentProps, ReactNode } from 'react';
import {
  Button as RACButton,
  Dialog as RACDialog,
  type DialogProps as RACDialogProps,
  Heading,
  Modal as RACModal,
  ModalOverlay,
  type ModalOverlayProps,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { cn, focusRing } from '../utils';
import { XIcon } from './icons';

export { DialogTrigger } from 'react-aria-components';

const modalStyles = tv({
  base: 'w-full max-w-md rounded-[calc(var(--tr-radius)*1.6)] border border-border bg-background text-foreground shadow-2xl outline-none transition-[opacity,transform] duration-200 data-entering:scale-95 data-entering:opacity-0 data-exiting:scale-95 data-exiting:opacity-0',
  variants: {
    size: {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-2xl',
    },
  },
});

export interface ModalProps extends ModalOverlayProps {
  size?: 'sm' | 'md' | 'lg';
}

export function Modal({ size = 'md', className, ...props }: ModalProps) {
  return (
    <ModalOverlay
      {...props}
      className="fixed inset-0 z-50 flex min-h-full items-center justify-center bg-black/40 p-4 backdrop-blur-[2px] transition-opacity duration-200 data-entering:opacity-0 data-exiting:opacity-0"
    >
      <RACModal {...props} className={modalStyles({ size, className: typeof className === 'string' ? className : undefined })} />
    </ModalOverlay>
  );
}

const closeButtonStyles = tv({
  extend: focusRing,
  base: 'absolute top-3 right-3 flex size-8 cursor-default items-center justify-center rounded-full text-muted-foreground hover:bg-muted',
});

export interface DialogProps extends RACDialogProps {
  title?: ReactNode;
  /** Render a close (×) button in the corner. Defaults to `true`. */
  showCloseButton?: boolean;
}

export function Dialog({ title, showCloseButton = true, className, children, ...props }: DialogProps) {
  return (
    <RACDialog {...props} className={cn('relative flex max-h-[inherit] flex-col gap-4 overflow-auto p-6 outline-none', className)}>
      {(renderProps) => (
        <>
          {title && (
            <Heading slot="title" className="pr-8 text-lg font-semibold leading-tight">
              {title}
            </Heading>
          )}
          {typeof children === 'function' ? children(renderProps) : children}
          {showCloseButton && (
            <RACButton slot="close" aria-label="Close" className={({ isFocusVisible }) => closeButtonStyles({ isFocusVisible })}>
              <XIcon className="size-4" />
            </RACButton>
          )}
        </>
      )}
    </RACDialog>
  );
}

export function DialogFooter({ className, ...props }: ComponentProps<'div'>) {
  return <div {...props} className={cn('mt-2 flex justify-end gap-2', className)} />;
}
