'use client';

import type { ReactNode } from 'react';
import {
  CheckboxGroup as RACCheckboxGroup,
  type CheckboxGroupProps as RACCheckboxGroupProps,
  type ValidationResult,
} from 'react-aria-components';
import { cn, composeTailwindRenderProps } from '../utils';
import { Description, FieldError, Label } from './field';

export interface CheckboxGroupProps extends Omit<RACCheckboxGroupProps, 'children'> {
  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: string | ((validation: ValidationResult) => string);
  orientation?: 'vertical' | 'horizontal';
  children?: ReactNode;
}

/** A set of related checkboxes whose value is an array of the selected `value`s. */
export function CheckboxGroup({
  label,
  description,
  errorMessage,
  orientation = 'vertical',
  children,
  className,
  ...props
}: CheckboxGroupProps) {
  return (
    <RACCheckboxGroup {...props} className={composeTailwindRenderProps(className, 'flex flex-col gap-2')}>
      {label && <Label>{label}</Label>}
      <div className={cn('flex', orientation === 'horizontal' ? 'flex-row flex-wrap gap-x-5 gap-y-2' : 'flex-col gap-2')}>
        {children}
      </div>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </RACCheckboxGroup>
  );
}
