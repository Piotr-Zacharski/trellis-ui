import { zodResolver } from '@hookform/resolvers/zod';
import { type FieldValues, type Resolver, type UseFormProps, type UseFormReturn, useForm } from 'react-hook-form';
import type { z } from 'zod';

export type ZodFormSchema = z.ZodType<FieldValues, FieldValues>;

export type UseZodFormProps<TSchema extends ZodFormSchema> = Omit<
  UseFormProps<z.input<TSchema>, unknown, z.output<TSchema>>,
  'resolver'
>;

export type UseZodFormReturn<TSchema extends ZodFormSchema> = UseFormReturn<
  z.input<TSchema>,
  unknown,
  z.output<TSchema>
>;

/**
 * `useForm` pre-wired with a Zod schema.
 * Field values are typed from `z.input`, the submit handler receives the parsed `z.output`.
 */
export function useZodForm<TSchema extends ZodFormSchema>(
  schema: TSchema,
  props?: UseZodFormProps<TSchema>,
): UseZodFormReturn<TSchema> {
  return useForm<z.input<TSchema>, unknown, z.output<TSchema>>({
    mode: 'onTouched',
    ...props,
    // zodResolver's overloads can't be resolved against a generic schema, so narrow the type here.
    resolver: zodResolver(schema as any) as Resolver<z.input<TSchema>, unknown, z.output<TSchema>>,
  });
}
