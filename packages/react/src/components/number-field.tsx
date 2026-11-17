'use client';

import type { ReactNode, Ref } from 'react';
import {
  Button as RACButton,
  NumberField as RACNumberField,
  type NumberFieldProps as RACNumberFieldProps,
  type ValidationResult,
} from 'react-aria-components';
import { composeTailwindRenderProps } from '../utils';
import { Description, FieldError, FieldGroup, FieldInput, Label } from './field';
import { ChevronDownIcon, ChevronUpIcon } from './icons';

export interface NumberFieldProps extends Omit<RACNumberFieldProps, 'children'> {
  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: string | ((validation: ValidationResult) => string);
  placeholder?: string;
  inputRef?: Ref<HTMLInputElement>;
  /** Show increment / decrement buttons. Arrow keys and the mouse wheel work either way. */
  showStepper?: boolean;
}

const stepperClass =
  'flex flex-1 cursor-default items-center justify-center px-2 text-muted-foreground outline-none hover:bg-muted data-pressed:bg-border data-disabled:opacity-40';

export function NumberField({
  label,
  description,
  errorMessage,
  placeholder,
  inputRef,
  showStepper = false,
  className,
  ...props
}: NumberFieldProps) {
  return (
    <RACNumberField {...props} className={composeTailwindRenderProps(className, 'group flex flex-col gap-1.5')}>
      {label && <Label>{label}</Label>}
      <FieldGroup>
        <FieldInput ref={inputRef} placeholder={placeholder} />
        {showStepper && (
          <div className="flex h-full flex-col border-l border-input">
            <RACButton slot="increment" className={stepperClass}>
              <ChevronUpIcon className="size-3.5" />
            </RACButton>
            <RACButton slot="decrement" className={`${stepperClass} border-t border-input`}>
              <ChevronDownIcon className="size-3.5" />
            </RACButton>
          </div>
        )}
      </FieldGroup>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </RACNumberField>
  );
}
