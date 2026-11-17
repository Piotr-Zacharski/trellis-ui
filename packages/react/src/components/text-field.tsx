'use client';

import type { ReactNode, Ref } from 'react';
import {
  TextField as RACTextField,
  type TextFieldProps as RACTextFieldProps,
  type ValidationResult,
} from 'react-aria-components';
import { composeTailwindRenderProps } from '../utils';
import { Description, FieldError, FieldGroup, FieldInput, Input, Label, TextArea } from './field';

export interface TextFieldProps extends Omit<RACTextFieldProps, 'children'> {
  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: string | ((validation: ValidationResult) => string);
  placeholder?: string;
  inputRef?: Ref<HTMLInputElement>;
  /** Content inside the field before the input – an icon, currency sign, `https://`… */
  startContent?: ReactNode;
  /** Content inside the field after the input – a unit, button, keyboard hint… */
  endContent?: ReactNode;
}

export function TextField({
  label,
  description,
  errorMessage,
  placeholder,
  inputRef,
  startContent,
  endContent,
  className,
  ...props
}: TextFieldProps) {
  const hasAddons = startContent != null || endContent != null;
  return (
    <RACTextField {...props} className={composeTailwindRenderProps(className, 'flex flex-col gap-1.5')}>
      {label && <Label>{label}</Label>}
      {hasAddons ? (
        <FieldGroup>
          {startContent != null && <span className="flex shrink-0 items-center pl-3 text-sm text-muted-foreground">{startContent}</span>}
          <FieldInput ref={inputRef} placeholder={placeholder} className={startContent != null ? 'pl-2' : undefined} />
          {endContent != null && <span className="flex shrink-0 items-center pr-3 text-sm text-muted-foreground">{endContent}</span>}
        </FieldGroup>
      ) : (
        <Input ref={inputRef} placeholder={placeholder} />
      )}
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </RACTextField>
  );
}

export interface TextAreaFieldProps extends Omit<TextFieldProps, 'inputRef' | 'startContent' | 'endContent'> {
  inputRef?: Ref<HTMLTextAreaElement>;
  rows?: number;
}

export function TextAreaField({
  label,
  description,
  errorMessage,
  placeholder,
  inputRef,
  rows,
  className,
  ...props
}: TextAreaFieldProps) {
  return (
    <RACTextField {...props} className={composeTailwindRenderProps(className, 'flex flex-col gap-1.5')}>
      {label && <Label>{label}</Label>}
      <TextArea ref={inputRef} placeholder={placeholder} rows={rows} />
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </RACTextField>
  );
}
