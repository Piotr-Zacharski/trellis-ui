'use client';

import type { ReactNode } from 'react';
import {
  Button as RACButton,
  composeRenderProps,
  ListBox,
  ListBoxItem,
  type ListBoxItemProps,
  Select as RACSelect,
  type SelectProps as RACSelectProps,
  SelectValue,
  type ValidationResult,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { cn, composeTailwindRenderProps } from '../utils';
import { Description, FieldError, Label } from './field';
import { CheckIcon, ChevronDownIcon } from './icons';
import { Popover } from './popover';

export interface SelectProps<T extends object> extends Omit<RACSelectProps<T, 'single'>, 'children'> {
  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: string | ((validation: ValidationResult) => string);
  items?: Iterable<T>;
  children: ReactNode | ((item: T) => ReactNode);
}

export const selectTriggerStyles = tv({
  base: 'flex h-10 w-full cursor-default items-center gap-2 rounded-tr border border-input bg-background px-3 text-left text-sm text-foreground outline-none transition-[border-color,box-shadow]',
  variants: {
    isFocusVisible: { true: 'border-primary ring-3 ring-ring' },
    isOpen: { true: 'border-primary' },
    isInvalid: { true: 'border-danger' },
    isDisabled: { true: 'opacity-50' },
  },
});

export function Select<T extends object>({
  label,
  description,
  errorMessage,
  items,
  children,
  className,
  ...props
}: SelectProps<T>) {
  return (
    <RACSelect {...props} className={composeTailwindRenderProps(className, 'group flex flex-col gap-1.5')}>
      {({ isOpen, isInvalid, isDisabled }) => (
        <>
          {label && <Label>{label}</Label>}
          <RACButton
            className={({ isFocusVisible }) => selectTriggerStyles({ isFocusVisible, isOpen, isInvalid, isDisabled })}
          >
            <SelectValue className="flex-1 truncate data-placeholder:text-muted-foreground" />
            <ChevronDownIcon className={cn('size-4 text-muted-foreground transition-transform', isOpen && 'rotate-180')} />
          </RACButton>
          {description && <Description>{description}</Description>}
          <FieldError>{errorMessage}</FieldError>
          <Popover className="min-w-(--trigger-width) p-1">
            <ListBox items={items} className="max-h-72 outline-none">
              {children}
            </ListBox>
          </Popover>
        </>
      )}
    </RACSelect>
  );
}

export function SelectItem(props: ListBoxItemProps) {
  const textValue = props.textValue ?? (typeof props.children === 'string' ? props.children : undefined);
  return (
    <ListBoxItem
      {...props}
      textValue={textValue}
      className={composeTailwindRenderProps(
        props.className,
        'flex cursor-default items-center gap-2 rounded-[calc(var(--tr-radius)*0.6)] px-2.5 py-2 text-sm text-foreground outline-none data-focused:bg-muted data-disabled:opacity-50',
      )}
    >
      {composeRenderProps(props.children, (children, { isSelected }) => (
        <>
          <span className="flex-1 truncate">{children}</span>
          {isSelected && <CheckIcon className="size-4 text-primary" />}
        </>
      ))}
    </ListBoxItem>
  );
}
