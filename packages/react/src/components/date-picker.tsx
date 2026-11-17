'use client';

import type { ReactNode } from 'react';
import {
  Button as RACButton,
  Calendar as RACCalendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  type CalendarProps as RACCalendarProps,
  DateInput,
  DatePicker as RACDatePicker,
  type DatePickerProps as RACDatePickerProps,
  DateSegment,
  type DateValue,
  Dialog,
  Heading,
  type ValidationResult,
} from 'react-aria-components';
import { composeTailwindRenderProps } from '../utils';
import { Description, FieldError, FieldGroup, Label } from './field';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from './icons';
import { Popover } from './popover';

const iconButtonClass =
  'flex size-8 cursor-default items-center justify-center rounded-full text-muted-foreground outline-none hover:bg-muted data-focus-visible:ring-3 data-focus-visible:ring-ring data-disabled:opacity-40';

export interface CalendarProps<T extends DateValue> extends Omit<RACCalendarProps<T>, 'children'> {
  errorMessage?: string;
}

export function Calendar<T extends DateValue>({ errorMessage, className, ...props }: CalendarProps<T>) {
  return (
    <RACCalendar {...props} className={composeTailwindRenderProps(className, 'w-fit text-foreground')}>
      <header className="flex items-center gap-1 pb-3">
        <RACButton slot="previous" className={iconButtonClass}>
          <ChevronLeftIcon className="size-4" />
        </RACButton>
        <Heading className="flex-1 text-center text-sm font-semibold" />
        <RACButton slot="next" className={iconButtonClass}>
          <ChevronRightIcon className="size-4" />
        </RACButton>
      </header>
      <CalendarGrid className="border-separate border-spacing-0.5">
        <CalendarGridHeader>
          {(day) => <CalendarHeaderCell className="size-9 text-xs font-medium text-muted-foreground">{day}</CalendarHeaderCell>}
        </CalendarGridHeader>
        <CalendarGridBody>
          {(date) => (
            <CalendarCell
              date={date}
              className="flex size-9 cursor-default items-center justify-center rounded-full text-sm tabular-nums outline-none hover:bg-muted data-outside-month:invisible data-focus-visible:ring-3 data-focus-visible:ring-ring data-disabled:opacity-40 data-unavailable:text-muted-foreground data-unavailable:line-through data-selected:bg-primary data-selected:text-primary-foreground"
            />
          )}
        </CalendarGridBody>
      </CalendarGrid>
      {errorMessage && <p className="pt-2 text-sm text-danger">{errorMessage}</p>}
    </RACCalendar>
  );
}

export interface DatePickerProps<T extends DateValue> extends Omit<RACDatePickerProps<T>, 'children'> {
  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function DatePicker<T extends DateValue>({ label, description, errorMessage, className, ...props }: DatePickerProps<T>) {
  return (
    <RACDatePicker {...props} className={composeTailwindRenderProps(className, 'group flex flex-col gap-1.5')}>
      {label && <Label>{label}</Label>}
      <FieldGroup className="gap-1 pr-1 pl-3">
        <DateInput className="flex flex-1 text-sm text-foreground">
          {(segment) => (
            <DateSegment
              segment={segment}
              className="rounded-[calc(var(--tr-radius)*0.4)] px-0.5 tabular-nums outline-none data-placeholder:text-muted-foreground data-focused:bg-primary data-focused:text-primary-foreground data-[type=literal]:px-0"
            />
          )}
        </DateInput>
        <RACButton className={iconButtonClass}>
          <CalendarIcon className="size-4" />
        </RACButton>
      </FieldGroup>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
      <Popover placement="bottom start">
        <Dialog className="p-3 outline-none">
          <Calendar />
        </Dialog>
      </Popover>
    </RACDatePicker>
  );
}
