'use client';

import { type ReactNode, useState } from 'react';
import { Dialog as RACDialog, Heading } from 'react-aria-components';
import { cn } from '../utils';
import { Button } from './button';
import { Modal, type ModalProps } from './dialog';
import { AlertIcon, InfoIcon } from './icons';

export interface AlertDialogProps extends Omit<ModalProps, 'children' | 'isDismissable'> {
  title: ReactNode;
  children?: ReactNode;
  /** `danger` for destructive actions. */
  variant?: 'primary' | 'danger';
  confirmLabel?: ReactNode;
  cancelLabel?: ReactNode;
  /** May return a promise – the confirm button shows a spinner until it resolves, then the dialog closes. */
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
}

/**
 * Confirmation dialog that requires an explicit choice. It can't be dismissed by clicking outside.
 * Use inside a DialogTrigger, or control it with `isOpen` / `onOpenChange`.
 */
export function AlertDialog({
  title,
  children,
  variant = 'primary',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  size = 'sm',
  ...props
}: AlertDialogProps) {
  const [isPending, setPending] = useState(false);
  const Icon = variant === 'danger' ? AlertIcon : InfoIcon;

  return (
    <Modal {...props} size={size} isDismissable={false} isKeyboardDismissDisabled={isPending}>
      <RACDialog role="alertdialog" className="flex flex-col gap-4 p-6 outline-none">
        {({ close }) => (
          <>
            <div className="flex gap-4">
              <span
                className={cn(
                  'flex size-10 shrink-0 items-center justify-center rounded-full',
                  variant === 'danger' ? 'bg-danger-soft text-danger' : 'bg-primary-soft text-primary',
                )}
              >
                <Icon className="size-5" />
              </span>
              <div className="flex flex-col gap-1.5 pt-1.5">
                <Heading slot="title" className="text-base leading-tight font-semibold">
                  {title}
                </Heading>
                {children && <div className="text-sm text-muted-foreground">{children}</div>}
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="ghost"
                color="neutral"
                isDisabled={isPending}
                onPress={() => {
                  onCancel?.();
                  close();
                }}
              >
                {cancelLabel}
              </Button>
              <Button
                color={variant}
                autoFocus
                isPending={isPending}
                onPress={async () => {
                  setPending(true);
                  try {
                    await onConfirm?.();
                    close();
                  } finally {
                    setPending(false);
                  }
                }}
              >
                {confirmLabel}
              </Button>
            </div>
          </>
        )}
      </RACDialog>
    </Modal>
  );
}
