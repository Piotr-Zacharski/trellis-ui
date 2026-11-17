'use client';

import type { ReactNode } from 'react';
import {
  Button as RACButton,
  Text,
  UNSTABLE_Toast as RACToast,
  UNSTABLE_ToastContent as RACToastContent,
  UNSTABLE_ToastQueue as ToastQueue,
  UNSTABLE_ToastRegion as RACToastRegion,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { cn, focusRing } from '../utils';
import { AlertIcon, CircleCheckIcon, InfoIcon, XIcon } from './icons';

export type ToastVariant = 'default' | 'success' | 'danger' | 'warning';

export interface ToastContent {
  title: ReactNode;
  description?: ReactNode;
  variant?: ToastVariant;
}

export interface ToastOptions {
  description?: ReactNode;
  /** Auto-dismiss after this many ms. Pass `0` to keep the toast until it is closed. Defaults to 5000. */
  timeout?: number;
  onClose?: () => void;
}

/** The global queue rendered by `<Toaster />`. */
export const toastQueue = new ToastQueue<ToastContent>({ maxVisibleToasts: 5 });

function show(variant: ToastVariant, title: ReactNode, { description, timeout = 5000, onClose }: ToastOptions = {}) {
  return toastQueue.add({ title, description, variant }, { timeout: timeout || undefined, onClose });
}

/**
 * Show a toast from anywhere – event handlers, form submit callbacks, etc.
 * Returns the toast key, which can be passed to `toast.dismiss`.
 */
export const toast = Object.assign((title: ReactNode, options?: ToastOptions) => show('default', title, options), {
  success: (title: ReactNode, options?: ToastOptions) => show('success', title, options),
  error: (title: ReactNode, options?: ToastOptions) => show('danger', title, options),
  warning: (title: ReactNode, options?: ToastOptions) => show('warning', title, options),
  dismiss: (key: string) => toastQueue.close(key),
});

const toastStyles = tv({
  base: 'flex w-[min(22rem,calc(100vw-2rem))] items-start gap-3 rounded-tr border border-border bg-background p-4 text-foreground shadow-lg outline-none',
  variants: {
    isFocusVisible: { true: 'ring-3 ring-ring' },
  },
});

const iconByVariant = {
  default: { Icon: InfoIcon, className: 'text-muted-foreground' },
  success: { Icon: CircleCheckIcon, className: 'text-primary' },
  danger: { Icon: AlertIcon, className: 'text-danger' },
  warning: { Icon: AlertIcon, className: 'text-warning' },
} as const;

const placements = {
  'top-start': 'top-4 left-4',
  'top-end': 'top-4 right-4',
  'bottom-start': 'bottom-4 left-4',
  'bottom-end': 'bottom-4 right-4',
} as const;

export interface ToasterProps {
  placement?: keyof typeof placements;
  className?: string;
}

const closeButtonStyles = tv({
  extend: focusRing,
  base: '-m-1 flex size-7 shrink-0 cursor-default items-center justify-center rounded-full text-muted-foreground hover:bg-muted',
});

/** Renders the toasts. Mount it once, near the root of your app. */
export function Toaster({ placement = 'bottom-end', className }: ToasterProps) {
  return (
    <RACToastRegion
      queue={toastQueue}
      className={cn('fixed z-[100] flex flex-col gap-2 outline-none', placements[placement], className)}
    >
      {({ toast }) => {
        const { Icon, className: iconClassName } = iconByVariant[toast.content.variant ?? 'default'];
        return (
          <RACToast toast={toast} className={({ isFocusVisible }) => toastStyles({ isFocusVisible })}>
            <Icon className={cn('mt-0.5 size-4 shrink-0', iconClassName)} />
            <RACToastContent className="flex min-w-0 flex-1 flex-col gap-0.5">
              <Text slot="title" className="text-sm font-semibold">
                {toast.content.title}
              </Text>
              {toast.content.description && (
                <Text slot="description" className="text-sm text-muted-foreground">
                  {toast.content.description}
                </Text>
              )}
            </RACToastContent>
            <RACButton slot="close" aria-label="Close" className={({ isFocusVisible }) => closeButtonStyles({ isFocusVisible })}>
              <XIcon className="size-3.5" />
            </RACButton>
          </RACToast>
        );
      }}
    </RACToastRegion>
  );
}
