'use client';

import { useContext } from 'react';
import {
  composeRenderProps,
  ToggleButton as RACToggleButton,
  ToggleButtonGroup as RACToggleButtonGroup,
  type ToggleButtonGroupProps,
  type ToggleButtonProps as RACToggleButtonProps,
  ToggleGroupStateContext,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { composeTailwindRenderProps, focusRing } from '../utils';

const toggleButtonStyles = tv({
  extend: focusRing,
  base: 'inline-flex cursor-default items-center justify-center gap-2 text-sm font-medium whitespace-nowrap transition-colors',
  variants: {
    isInGroup: {
      true: 'h-8 rounded-[calc(var(--tr-radius)*0.7)] px-3 text-muted-foreground hover:text-foreground',
      false: 'h-10 rounded-tr border border-input bg-background px-4 text-foreground hover:bg-muted',
    },
    isSelected: { true: '' },
    isDisabled: { true: 'opacity-50' },
  },
  compoundVariants: [
    { isInGroup: true, isSelected: true, class: 'bg-background text-foreground shadow-sm hover:text-foreground' },
    { isInGroup: false, isSelected: true, class: 'border-primary bg-primary-soft text-primary hover:bg-primary-soft' },
  ],
});

export interface ToggleButtonProps extends RACToggleButtonProps {}

/** A button with an on/off state. Inside a ToggleButtonGroup it renders as a segment. */
export function ToggleButton(props: ToggleButtonProps) {
  const isInGroup = !!useContext(ToggleGroupStateContext);
  return (
    <RACToggleButton
      {...props}
      className={composeRenderProps(props.className, (className, { isSelected, isDisabled, isFocusVisible }) =>
        toggleButtonStyles({ isInGroup, isSelected, isDisabled, isFocusVisible, className }),
      )}
    />
  );
}

export type { ToggleButtonGroupProps };

/** Segmented control. Use `selectionMode="single"` (default) or `"multiple"`. */
export function ToggleButtonGroup({ selectionMode = 'single', ...props }: ToggleButtonGroupProps) {
  return (
    <RACToggleButtonGroup
      selectionMode={selectionMode}
      disallowEmptySelection={selectionMode === 'single'}
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        'inline-flex w-fit gap-0.5 rounded-tr bg-muted p-1 data-[orientation=vertical]:flex-col',
      )}
    />
  );
}
