'use client';

import {
  Checkbox as RACCheckbox,
  type CheckboxProps as RACCheckboxProps,
  composeRenderProps,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { composeTailwindRenderProps, focusRing } from '../utils';
import { CheckIcon, MinusIcon } from './icons';

export const checkboxBoxStyles = tv({
  extend: focusRing,
  base: 'flex size-5 shrink-0 items-center justify-center rounded-[calc(var(--tr-radius)*0.5)] border border-input bg-background text-primary-foreground transition-colors',
  variants: {
    isSelected: { true: 'border-primary bg-primary' },
    isInvalid: { true: 'border-danger' },
    isDisabled: { true: 'opacity-50' },
  },
  compoundVariants: [{ isSelected: true, isInvalid: true, class: 'border-danger bg-danger text-danger-foreground' }],
});

export interface CheckboxProps extends RACCheckboxProps {}

export function Checkbox({ className, children, ...props }: CheckboxProps) {
  return (
    <RACCheckbox
      {...props}
      className={composeTailwindRenderProps(className, 'group flex cursor-default items-center gap-2.5 text-sm text-foreground')}
    >
      {composeRenderProps(children, (children, { isSelected, isIndeterminate, isInvalid, isDisabled, isFocusVisible }) => (
        <>
          <span className={checkboxBoxStyles({ isSelected: isSelected || isIndeterminate, isInvalid, isDisabled, isFocusVisible })}>
            {isIndeterminate ? <MinusIcon className="size-3.5" /> : isSelected ? <CheckIcon className="size-3.5" /> : null}
          </span>
          {children}
        </>
      ))}
    </RACCheckbox>
  );
}
