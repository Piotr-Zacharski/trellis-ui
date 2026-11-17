'use client';

import type { ReactNode } from 'react';
import {
  composeRenderProps,
  Radio as RACRadio,
  RadioGroup as RACRadioGroup,
  type RadioGroupProps as RACRadioGroupProps,
  type RadioProps,
  type ValidationResult,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { composeTailwindRenderProps, focusRing } from '../utils';
import { Description, FieldError, Label } from './field';

export interface RadioGroupProps extends Omit<RACRadioGroupProps, 'children'> {
  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: string | ((validation: ValidationResult) => string);
  children?: ReactNode;
}

export function RadioGroup({ label, description, errorMessage, children, className, ...props }: RadioGroupProps) {
  return (
    <RACRadioGroup {...props} className={composeTailwindRenderProps(className, 'group flex flex-col gap-2')}>
      {label && <Label>{label}</Label>}
      <div className="flex gap-2 group-data-[orientation=horizontal]:flex-row group-data-[orientation=horizontal]:gap-5 group-data-[orientation=vertical]:flex-col">
        {children}
      </div>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </RACRadioGroup>
  );
}

export const radioStyles = tv({
  extend: focusRing,
  base: 'size-5 shrink-0 rounded-full border border-input bg-background transition-[border-width,border-color]',
  variants: {
    isSelected: { true: 'border-[6px] border-primary' },
    isInvalid: { true: 'border-danger' },
    isDisabled: { true: 'opacity-50' },
  },
});

export function Radio({ className, children, ...props }: RadioProps) {
  return (
    <RACRadio
      {...props}
      className={composeTailwindRenderProps(className, 'flex cursor-default items-center gap-2.5 text-sm text-foreground')}
    >
      {composeRenderProps(children, (children, { isSelected, isInvalid, isDisabled, isFocusVisible }) => (
        <>
          <span className={radioStyles({ isSelected, isInvalid, isDisabled, isFocusVisible })} />
          {children}
        </>
      ))}
    </RACRadio>
  );
}
