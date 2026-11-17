'use client';

import type { ComponentProps, ReactNode } from 'react';
import { Button as RACButton } from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { AlertIcon, CircleCheckIcon, InfoIcon, XIcon } from './icons';

const alertStyles = tv({
  base: 'flex w-full gap-3 rounded-[calc(var(--tr-radius)*1.4)] border p-4 text-sm',
  variants: {
    color: {
      neutral: 'border-border bg-surface text-foreground',
      primary: 'border-primary/30 bg-primary-soft text-foreground',
      success: 'border-primary/30 bg-primary-soft text-foreground',
      warning: 'border-warning/40 bg-warning-soft text-foreground',
      danger: 'border-danger/30 bg-danger-soft text-foreground',
    },
  },
});

const iconColor = {
  neutral: 'text-muted-foreground',
  primary: 'text-primary',
  success: 'text-primary',
  warning: 'text-warning-foreground dark:text-warning',
  danger: 'text-danger',
} as const;

export interface AlertProps extends Omit<ComponentProps<'div'>, 'title' | 'color'> {
  title?: ReactNode;
  color?: keyof typeof iconColor;
  /** Replace the default icon, or pass `null` to hide it. */
  icon?: ReactNode;
  /** Buttons or links rendered under the text. */
  actions?: ReactNode;
  /** Shows a close button. */
  onClose?: () => void;
}

/** Inline message about the state of a page or form. Danger and warning alerts are announced to screen readers. */
export function Alert({ title, color = 'neutral', icon, actions, onClose, className, children, ...props }: AlertProps) {
  const DefaultIcon = color === 'success' ? CircleCheckIcon : color === 'danger' || color === 'warning' ? AlertIcon : InfoIcon;
  return (
    <div role={color === 'danger' || color === 'warning' ? 'alert' : 'status'} {...props} className={alertStyles({ color, className })}>
      {icon !== null && (
        <span className={`mt-0.5 shrink-0 [&>svg]:size-4 ${iconColor[color]}`}>{icon ?? <DefaultIcon />}</span>
      )}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        {title && <p className="leading-5 font-semibold">{title}</p>}
        {children && <div className="text-muted-foreground">{children}</div>}
        {actions && <div className="mt-2 flex flex-wrap gap-2">{actions}</div>}
      </div>
      {onClose && (
        <RACButton
          aria-label="Dismiss"
          onPress={onClose}
          className="-m-1 flex size-7 shrink-0 cursor-default items-center justify-center rounded-full text-muted-foreground outline-none hover:bg-black/5 dark:hover:bg-white/10 data-focus-visible:ring-3 data-focus-visible:ring-ring"
        >
          <XIcon className="size-3.5" />
        </RACButton>
      )}
    </div>
  );
}
