'use client';

import { composeRenderProps, Link as RACLink, type LinkProps as RACLinkProps } from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { focusRing } from '../utils';

const linkStyles = tv({
  extend: focusRing,
  base: 'cursor-pointer rounded-sm underline-offset-4 transition-colors',
  variants: {
    color: {
      primary: 'text-primary hover:underline',
      foreground: 'text-foreground underline decoration-border hover:decoration-foreground',
      muted: 'text-muted-foreground hover:text-foreground',
    },
    isDisabled: { true: 'cursor-default opacity-50 hover:no-underline' },
  },
});

export interface LinkProps extends RACLinkProps {
  color?: 'primary' | 'foreground' | 'muted';
}

/** Accessible link. Works with client-side routers through React Aria's RouterProvider. */
export function Link({ color = 'primary', ...props }: LinkProps) {
  return (
    <RACLink
      {...props}
      className={composeRenderProps(props.className, (className, { isDisabled, isFocusVisible }) =>
        linkStyles({ color, isDisabled, isFocusVisible, className }),
      )}
    />
  );
}
