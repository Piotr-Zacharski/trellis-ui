'use client';

import type { ReactNode } from 'react';
import {
  DateField as RACDateField,
  type DateFieldProps as RACDateFieldProps,
  DateInput,
  DateSegment,
  type DateValue,
  TimeField as RACTimeField,
  type TimeFieldProps as RACTimeFieldProps,
  type TimeValue,
  type ValidationResult,
} from 'react-aria-components';
import { composeTailwindRenderProps } from '../utils';
import { dateSegmentClass } from './date-range-picker';
import { Description, FieldError, FieldGroup, Label } from './field';
import { CalendarIcon, ClockIcon } from './icons';

interface SharedProps {
  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export interface DateFieldProps<T extends DateValue> extends Omit<RACDateFieldProps<T>, 'children'>, SharedProps {}

/** Keyboard-only date entry, without a calendar popover. */
export function DateField<T extends DateValue>({ label, description, errorMessage, className, ...props }: DateFieldProps<T>) {
  return (
    <RACDateField {...props} className={composeTailwindRenderProps(className, 'group flex flex-col gap-1.5')}>
      {label && <Label>{label}</Label>}
      <FieldGroup className="gap-2 px-3">
        <CalendarIcon className="size-4 shrink-0 text-muted-foreground" />
        <DateInput className="flex flex-1 text-sm text-foreground">
          {(segment) => <DateSegment segment={segment} className={dateSegmentClass} />}
        </DateInput>
      </FieldGroup>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </RACDateField>
  );
}

export interface TimeFieldProps<T extends TimeValue> extends Omit<RACTimeFieldProps<T>, 'children'>, SharedProps {}

/** Time entry with hour / minute (and optionally second) segments. Uses the 12/24h format of the user's locale. */
export function TimeField<T extends TimeValue>({ label, description, errorMessage, className, ...props }: TimeFieldProps<T>) {
  return (
    <RACTimeField {...props} className={composeTailwindRenderProps(className, 'group flex flex-col gap-1.5')}>
      {label && <Label>{label}</Label>}
      <FieldGroup className="gap-2 px-3">
        <ClockIcon className="size-4 shrink-0 text-muted-foreground" />
        <DateInput className="flex flex-1 text-sm text-foreground">
          {(segment) => <DateSegment segment={segment} className={dateSegmentClass} />}
        </DateInput>
      </FieldGroup>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </RACTimeField>
  );
}
