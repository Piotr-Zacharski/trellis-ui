'use client';

import type { ReactNode } from 'react';
import {
  Button as RACButton,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  DateInput,
  DateRangePicker as RACDateRangePicker,
  type DateRangePickerProps as RACDateRangePickerProps,
  DateSegment,
  type DateValue,
  Dialog,
  Heading,
  RangeCalendar as RACRangeCalendar,
  type RangeCalendarProps as RACRangeCalendarProps,
  type ValidationResult,
} from 'react-aria-components';
import { cn, composeTailwindRenderProps } from '../utils';
import { Description, FieldError, FieldGroup, Label } from './field';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from './icons';
import { Popover } from './popover';

const iconButtonClass =
  'flex size-8 cursor-default items-center justify-center rounded-full text-muted-foreground outline-none hover:bg-muted data-focus-visible:ring-3 data-focus-visible:ring-ring data-disabled:opacity-40';

export const dateSegmentClass =
  'rounded-[calc(var(--tr-radius)*0.4)] px-0.5 tabular-nums outline-none data-placeholder:text-muted-foreground data-focused:bg-primary data-focused:text-primary-foreground data-[type=literal]:px-0';

export interface RangeCalendarProps<T extends DateValue> extends Omit<RACRangeCalendarProps<T>, 'children'> {}

export function RangeCalendar<T extends DateValue>({ className, ...props }: RangeCalendarProps<T>) {
  return (
    <RACRangeCalendar {...props} className={composeTailwindRenderProps(className, 'w-fit text-foreground')}>
      <header className="flex items-center gap-1 pb-3">
        <RACButton slot="previous" className={iconButtonClass}>
          <ChevronLeftIcon className="size-4" />
        </RACButton>
        <Heading className="flex-1 text-center text-sm font-semibold" />
        <RACButton slot="next" className={iconButtonClass}>
          <ChevronRightIcon className="size-4" />
        </RACButton>
      </header>
      <CalendarGrid className="border-separate border-spacing-y-0.5">
        <CalendarGridHeader>
          {(day) => <CalendarHeaderCell className="size-9 text-xs font-medium text-muted-foreground">{day}</CalendarHeaderCell>}
        </CalendarGridHeader>
        <CalendarGridBody>
          {(date) => (
            <CalendarCell date={date} className="group size-9 cursor-default text-sm outline-none data-outside-month:invisible">
              {({ formattedDate, isSelected, isSelectionStart, isSelectionEnd, isFocusVisible, isDisabled, isUnavailable }) => (
                <span
                  className={cn(
                    'flex size-full items-center justify-center tabular-nums',
                    isSelected && 'bg-primary-soft',
                    isSelectionStart && 'rounded-l-full',
                    isSelectionEnd && 'rounded-r-full',
                  )}
                >
                  <span
                    className={cn(
                      'flex size-9 items-center justify-center rounded-full hover:bg-muted',
                      (isSelectionStart || isSelectionEnd) && 'bg-primary text-primary-foreground hover:bg-primary',
                      isFocusVisible && 'ring-3 ring-ring',
                      isDisabled && 'opacity-40',
                      isUnavailable && 'text-muted-foreground line-through',
                    )}
                  >
                    {formattedDate}
                  </span>
                </span>
              )}
            </CalendarCell>
          )}
        </CalendarGridBody>
      </CalendarGrid>
    </RACRangeCalendar>
  );
}

export interface DateRangePickerProps<T extends DateValue> extends Omit<RACDateRangePickerProps<T>, 'children'> {
  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function DateRangePicker<T extends DateValue>({
  label,
  description,
  errorMessage,
  className,
  ...props
}: DateRangePickerProps<T>) {
  return (
    <RACDateRangePicker {...props} className={composeTailwindRenderProps(className, 'group flex flex-col gap-1.5')}>
      {label && <Label>{label}</Label>}
      <FieldGroup className="gap-1 pr-1 pl-3">
        <DateInput slot="start" className="flex text-sm text-foreground">
          {(segment) => <DateSegment segment={segment} className={dateSegmentClass} />}
        </DateInput>
        <span aria-hidden="true" className="px-1 text-muted-foreground">
          –
        </span>
        <DateInput slot="end" className="flex flex-1 text-sm text-foreground">
          {(segment) => <DateSegment segment={segment} className={dateSegmentClass} />}
        </DateInput>
        <RACButton className={iconButtonClass}>
          <CalendarIcon className="size-4" />
        </RACButton>
      </FieldGroup>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
      <Popover placement="bottom start">
        <Dialog className="p-3 outline-none">
          <RangeCalendar />
        </Dialog>
      </Popover>
    </RACDateRangePicker>
  );
}
