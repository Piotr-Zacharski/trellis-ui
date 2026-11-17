'use client';

import { composeRenderProps, Switch as RACSwitch, type SwitchProps as RACSwitchProps } from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { composeTailwindRenderProps, focusRing } from '../utils';

export const switchTrackStyles = tv({
  extend: focusRing,
  base: 'flex h-6 w-10 shrink-0 items-center rounded-full bg-input px-0.5 transition-colors',
  variants: {
    isSelected: { true: 'bg-primary' },
    isDisabled: { true: 'opacity-50' },
  },
});

export const switchThumbStyles = tv({
  base: 'size-5 rounded-full bg-white shadow-sm transition-transform',
  variants: {
    isSelected: { true: 'translate-x-4' },
  },
});

export interface SwitchProps extends RACSwitchProps {}

export function Switch({ className, children, ...props }: SwitchProps) {
  return (
    <RACSwitch
      {...props}
      className={composeTailwindRenderProps(className, 'group flex cursor-default items-center gap-2.5 text-sm text-foreground')}
    >
      {composeRenderProps(children, (children, { isSelected, isDisabled, isFocusVisible }) => (
        <>
          <span className={switchTrackStyles({ isSelected, isDisabled, isFocusVisible })}>
            <span className={switchThumbStyles({ isSelected })} />
          </span>
          {children}
        </>
      ))}
    </RACSwitch>
  );
}
