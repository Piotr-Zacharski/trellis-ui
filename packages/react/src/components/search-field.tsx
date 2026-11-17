'use client';

import type { ReactNode, Ref } from 'react';
import {
  Button as RACButton,
  SearchField as RACSearchField,
  type SearchFieldProps as RACSearchFieldProps,
  type ValidationResult,
} from 'react-aria-components';
import { composeTailwindRenderProps } from '../utils';
import { Description, FieldError, FieldGroup, FieldInput, Label } from './field';
import { SearchIcon, XIcon } from './icons';

export interface SearchFieldProps extends Omit<RACSearchFieldProps, 'children'> {
  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: string | ((validation: ValidationResult) => string);
  placeholder?: string;
  inputRef?: Ref<HTMLInputElement>;
}

/** Text input for search: Escape clears it, Enter calls `onSubmit`. */
export function SearchField({ label, description, errorMessage, placeholder, inputRef, className, ...props }: SearchFieldProps) {
  return (
    <RACSearchField {...props} className={composeTailwindRenderProps(className, 'group flex flex-col gap-1.5')}>
      {label && <Label>{label}</Label>}
      <FieldGroup className="pr-1 pl-3">
        <SearchIcon className="size-4 shrink-0 text-muted-foreground" />
        <FieldInput ref={inputRef} placeholder={placeholder} className="px-2 [&::-webkit-search-cancel-button]:hidden" />
        <RACButton className="flex size-7 cursor-default items-center justify-center rounded-full text-muted-foreground outline-none group-data-empty:invisible hover:bg-muted data-focus-visible:ring-3 data-focus-visible:ring-ring">
          <XIcon className="size-3.5" />
        </RACButton>
      </FieldGroup>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </RACSearchField>
  );
}
