'use client';

import type { Ref } from 'react';
import {
  composeRenderProps,
  FieldError as RACFieldError,
  type FieldErrorProps,
  Group,
  type GroupProps,
  Input as RACInput,
  type InputProps,
  Label as RACLabel,
  type LabelProps,
  Text,
  type TextProps,
  TextArea as RACTextArea,
  type TextAreaProps,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { cn, composeTailwindRenderProps } from '../utils';

export function Label(props: LabelProps) {
  return (
    <RACLabel
      {...props}
      className={cn('w-fit cursor-default text-sm font-medium text-foreground', props.className)}
    />
  );
}

export function Description(props: TextProps) {
  return <Text {...props} slot="description" className={cn('text-sm text-muted-foreground', props.className)} />;
}

export function FieldError(props: FieldErrorProps) {
  return <RACFieldError {...props} className={composeTailwindRenderProps(props.className, 'text-sm text-danger')} />;
}

export const inputStyles = tv({
  base: 'w-full min-w-0 rounded-tr border border-input bg-background px-3 text-sm text-foreground outline-none transition-[border-color,box-shadow] placeholder:text-muted-foreground',
  variants: {
    isFocused: { true: 'border-primary ring-3 ring-ring' },
    isInvalid: { true: 'border-danger' },
    isDisabled: { true: 'cursor-not-allowed opacity-50' },
  },
  compoundVariants: [{ isFocused: true, isInvalid: true, class: 'ring-danger/25' }],
});

export function Input(props: InputProps & { ref?: Ref<HTMLInputElement> }) {
  return (
    <RACInput
      {...props}
      className={composeRenderProps(props.className, (className, { isFocused, isInvalid, isDisabled }) =>
        inputStyles({ isFocused, isInvalid, isDisabled, className: cn('h-10', className) }),
      )}
    />
  );
}

export function TextArea(props: TextAreaProps & { ref?: Ref<HTMLTextAreaElement> }) {
  return (
    <RACTextArea
      {...props}
      className={composeRenderProps(props.className, (className, { isFocused, isInvalid, isDisabled }) =>
        inputStyles({ isFocused, isInvalid, isDisabled, className: cn('min-h-24 resize-y py-2', className) }),
      )}
    />
  );
}

export const fieldGroupStyles = tv({
  base: 'flex h-10 items-center overflow-hidden rounded-tr border border-input bg-background transition-[border-color,box-shadow]',
  variants: {
    isFocusWithin: { true: 'border-primary ring-3 ring-ring' },
    isInvalid: { true: 'border-danger' },
    isDisabled: { true: 'opacity-50' },
  },
  compoundVariants: [{ isFocusWithin: true, isInvalid: true, class: 'ring-danger/25' }],
});

/** A bordered container for an input with addons (buttons, icons) – used e.g. by NumberField. */
export function FieldGroup(props: GroupProps) {
  return (
    <Group
      {...props}
      className={composeRenderProps(props.className, (className, { isFocusWithin, isInvalid, isDisabled }) =>
        fieldGroupStyles({ isFocusWithin, isInvalid, isDisabled, className }),
      )}
    />
  );
}

/** Unstyled input meant to live inside a FieldGroup. */
export function FieldInput(props: InputProps & { ref?: Ref<HTMLInputElement> }) {
  return (
    <RACInput
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        'h-full min-w-0 flex-1 bg-transparent px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground',
      )}
    />
  );
}
