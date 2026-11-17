'use client';

import type { ReactNode, Ref } from 'react';
import {
  Button as RACButton,
  ComboBox as RACComboBox,
  type ComboBoxProps as RACComboBoxProps,
  ListBox,
  type ListBoxItemProps,
  type ValidationResult,
} from 'react-aria-components';
import { cn, composeTailwindRenderProps } from '../utils';
import { Description, FieldError, FieldGroup, FieldInput, Label } from './field';
import { ChevronDownIcon } from './icons';
import { Popover } from './popover';
import { SelectItem } from './select';

export interface ComboBoxProps<T extends object> extends Omit<RACComboBoxProps<T, 'single'>, 'children'> {
  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: string | ((validation: ValidationResult) => string);
  placeholder?: string;
  items?: Iterable<T>;
  children: ReactNode | ((item: T) => ReactNode);
  inputRef?: Ref<HTMLInputElement>;
}

export function ComboBox<T extends object>({
  label,
  description,
  errorMessage,
  placeholder,
  items,
  children,
  inputRef,
  className,
  ...props
}: ComboBoxProps<T>) {
  return (
    <RACComboBox {...props} className={composeTailwindRenderProps(className, 'group flex flex-col gap-1.5')}>
      {({ isOpen }) => (
        <>
          {label && <Label>{label}</Label>}
          <FieldGroup className="pr-1">
            <FieldInput ref={inputRef} placeholder={placeholder} />
            <RACButton className="flex size-8 cursor-default items-center justify-center rounded-full text-muted-foreground outline-none hover:bg-muted">
              <ChevronDownIcon className={cn('size-4 transition-transform', isOpen && 'rotate-180')} />
            </RACButton>
          </FieldGroup>
          {description && <Description>{description}</Description>}
          <FieldError>{errorMessage}</FieldError>
          <Popover className="min-w-(--trigger-width) p-1">
            <ListBox
              items={items}
              className="max-h-72 outline-none"
              renderEmptyState={() => <p className="px-2.5 py-2 text-sm text-muted-foreground">No results</p>}
            >
              {children}
            </ListBox>
          </Popover>
        </>
      )}
    </RACComboBox>
  );
}

export function ComboBoxItem(props: ListBoxItemProps) {
  return <SelectItem {...props} />;
}
