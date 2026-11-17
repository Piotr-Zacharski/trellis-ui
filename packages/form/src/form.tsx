'use client';

import { cn } from '@trellis-ui-pack/react';
import type { ComponentProps } from 'react';
import {
  type FieldValues,
  FormProvider,
  type SubmitErrorHandler,
  type SubmitHandler,
  type UseFormReturn,
} from 'react-hook-form';

export interface FormProps<TFieldValues extends FieldValues, TTransformedValues>
  extends Omit<ComponentProps<'form'>, 'onSubmit' | 'onInvalid'> {
  form: UseFormReturn<TFieldValues, any, TTransformedValues>;
  onSubmit: SubmitHandler<TTransformedValues>;
  onInvalid?: SubmitErrorHandler<TFieldValues>;
}

/** Provides the form context to every `Form*` field and wires `handleSubmit`. */
export function Form<TFieldValues extends FieldValues, TTransformedValues = TFieldValues>({
  form,
  onSubmit,
  onInvalid,
  className,
  children,
  ...props
}: FormProps<TFieldValues, TTransformedValues>) {
  return (
    <FormProvider {...form}>
      <form
        noValidate
        {...props}
        onSubmit={form.handleSubmit(onSubmit, onInvalid)}
        className={cn('flex flex-col gap-5', className)}
      >
        {children}
      </form>
    </FormProvider>
  );
}
