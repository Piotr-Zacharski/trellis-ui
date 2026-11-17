'use client';

import {
  Button as RACButton,
  type ButtonProps as RACButtonProps,
  composeRenderProps,
} from 'react-aria-components';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn, focusRing } from '../utils';
import { Spinner } from './spinner';

export const buttonStyles = tv({
  extend: focusRing,
  base: 'relative inline-flex cursor-default select-none items-center justify-center gap-2 whitespace-nowrap rounded-tr font-medium transition-[color,background-color,border-color,transform] data-pressed:scale-[0.97]',
  variants: {
    variant: {
      solid: '',
      soft: '',
      outline: 'border bg-transparent',
      ghost: 'bg-transparent',
    },
    color: {
      primary: '',
      neutral: '',
      danger: '',
    },
    size: {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 text-sm',
      lg: 'h-12 px-6 text-base',
      icon: 'size-10 p-0',
    },
    isDisabled: {
      true: 'opacity-50 data-pressed:scale-100',
    },
  },
  compoundVariants: [
    { variant: 'solid', color: 'primary', class: 'bg-primary text-primary-foreground hover:bg-primary-hover' },
    { variant: 'solid', color: 'neutral', class: 'bg-foreground text-background hover:bg-foreground/85' },
    { variant: 'solid', color: 'danger', class: 'bg-danger text-danger-foreground hover:bg-danger-hover' },
    { variant: 'soft', color: 'primary', class: 'bg-primary-soft text-primary hover:bg-primary-soft/70' },
    { variant: 'soft', color: 'neutral', class: 'bg-muted text-foreground hover:bg-border' },
    { variant: 'soft', color: 'danger', class: 'bg-danger-soft text-danger hover:bg-danger-soft/70' },
    { variant: 'outline', color: 'primary', class: 'border-primary text-primary hover:bg-primary-soft' },
    { variant: 'outline', color: 'neutral', class: 'border-input text-foreground hover:bg-muted' },
    { variant: 'outline', color: 'danger', class: 'border-danger text-danger hover:bg-danger-soft' },
    { variant: 'ghost', color: 'primary', class: 'text-primary hover:bg-primary-soft' },
    { variant: 'ghost', color: 'neutral', class: 'text-foreground hover:bg-muted' },
    { variant: 'ghost', color: 'danger', class: 'text-danger hover:bg-danger-soft' },
  ],
  defaultVariants: {
    variant: 'solid',
    color: 'primary',
    size: 'md',
  },
});

export interface ButtonProps extends RACButtonProps, Omit<VariantProps<typeof buttonStyles>, 'isDisabled' | 'isFocusVisible'> {}

export function Button({ variant, color, size, className, children, ...props }: ButtonProps) {
  return (
    <RACButton
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        buttonStyles({
          variant,
          color,
          size,
          isDisabled: renderProps.isDisabled,
          isFocusVisible: renderProps.isFocusVisible,
          className,
        }),
      )}
    >
      {composeRenderProps(children, (children, { isPending }) => (
        <>
          <span className={cn('inline-flex items-center gap-2', isPending && 'invisible')}>{children}</span>
          {isPending && <Spinner size="sm" aria-hidden className="absolute" />}
        </>
      ))}
    </RACButton>
  );
}
