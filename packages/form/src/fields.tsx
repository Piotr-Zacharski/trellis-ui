'use client';

import { CalendarDate, getLocalTimeZone, parseTime, type Time } from '@internationalized/date';
import type { ReactNode } from 'react';
import {
  Button,
  type ButtonProps,
  Checkbox,
  type CheckboxProps,
  CheckboxGroup,
  type CheckboxGroupProps,
  ColorPicker,
  type ColorPickerProps,
  DateField,
  type DateFieldProps,
  DateRangePicker,
  type DateRangePickerProps,
  FileUpload,
  type FileUploadProps,
  InputOTP,
  type InputOTPProps,
  Rating,
  type RatingProps,
  Slider,
  type SliderProps,
  TagField,
  type TagFieldProps,
  TimeField,
  type TimeFieldProps,
  ToggleButtonGroup,
  type ToggleButtonGroupProps,
  ComboBox,
  type ComboBoxProps,
  DatePicker,
  type DatePickerProps,
  NumberField,
  type NumberFieldProps,
  RadioGroup,
  type RadioGroupProps,
  Select,
  type SelectProps,
  Switch,
  type SwitchProps,
  TextAreaField,
  type TextAreaFieldProps,
  TextField,
  type TextFieldProps,
} from '@trellis-ui-pack/react';
import {
  type Control,
  type FieldPath,
  type FieldValues,
  type UseControllerProps,
  useController,
  useFormState,
} from 'react-hook-form';

/**
 * Props shared by every `Form*` field.
 * Pass `control={form.control}` to get `name` autocompletion from your schema;
 * without it the field reads the control from the nearest `<Form>`.
 */
export interface FormFieldProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> {
  name: TName;
  control?: Control<TFieldValues, any, any>;
  rules?: UseControllerProps<TFieldValues, TName>['rules'];
}

/** Props the form owns – they can't be passed to a `Form*` field directly. */
type ControlledKeys = 'name' | 'value' | 'defaultValue' | 'onChange' | 'isInvalid' | 'errorMessage' | 'validationBehavior';

function useField<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  name,
  control,
  rules,
}: FormFieldProps<TFieldValues, TName>) {
  const { field, fieldState } = useController<TFieldValues, TName>({ name, control, rules });
  return {
    field,
    shared: {
      name: field.name,
      onBlur: field.onBlur,
      isInvalid: fieldState.invalid,
      errorMessage: fieldState.error?.message,
      validationBehavior: 'aria' as const,
    },
  };
}

export type FormTextFieldProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> =
  FormFieldProps<TFieldValues, TName> & Omit<TextFieldProps, ControlledKeys | 'inputRef'>;

export function FormTextField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ name, control, rules, ...props }: FormTextFieldProps<TFieldValues, TName>) {
  const { field, shared } = useField({ name, control, rules });
  return (
    <TextField
      {...props}
      {...shared}
      isDisabled={props.isDisabled || field.disabled}
      value={field.value ?? ''}
      onChange={field.onChange}
      inputRef={field.ref}
    />
  );
}

export type FormTextAreaFieldProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> =
  FormFieldProps<TFieldValues, TName> & Omit<TextAreaFieldProps, ControlledKeys | 'inputRef'>;

export function FormTextAreaField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ name, control, rules, ...props }: FormTextAreaFieldProps<TFieldValues, TName>) {
  const { field, shared } = useField({ name, control, rules });
  return (
    <TextAreaField
      {...props}
      {...shared}
      isDisabled={props.isDisabled || field.disabled}
      value={field.value ?? ''}
      onChange={field.onChange}
      inputRef={field.ref}
    />
  );
}

export type FormNumberFieldProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> =
  FormFieldProps<TFieldValues, TName> & Omit<NumberFieldProps, ControlledKeys | 'inputRef'>;

/** Empty input is reported to the form as `undefined` (React Aria uses `NaN`). */
export function FormNumberField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ name, control, rules, ...props }: FormNumberFieldProps<TFieldValues, TName>) {
  const { field, shared } = useField({ name, control, rules });
  return (
    <NumberField
      {...props}
      {...shared}
      isDisabled={props.isDisabled || field.disabled}
      value={field.value ?? Number.NaN}
      onChange={(value) => field.onChange(Number.isNaN(value) ? undefined : value)}
      inputRef={field.ref}
    />
  );
}

export type FormSelectProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  T extends object,
> = FormFieldProps<TFieldValues, TName> & Omit<SelectProps<T>, ControlledKeys>;

export function FormSelect<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  T extends object = object,
>({ name, control, rules, ...props }: FormSelectProps<TFieldValues, TName, T>) {
  const { field, shared } = useField({ name, control, rules });
  return (
    <Select<T>
      {...props}
      {...shared}
      isDisabled={props.isDisabled || field.disabled}
      value={field.value ?? null}
      onChange={field.onChange}
    />
  );
}

export type FormRadioGroupProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> =
  FormFieldProps<TFieldValues, TName> & Omit<RadioGroupProps, ControlledKeys>;

export function FormRadioGroup<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ name, control, rules, ...props }: FormRadioGroupProps<TFieldValues, TName>) {
  const { field, shared } = useField({ name, control, rules });
  return (
    <RadioGroup
      {...props}
      {...shared}
      isDisabled={props.isDisabled || field.disabled}
      value={field.value ?? null}
      onChange={field.onChange}
    />
  );
}

export type FormComboBoxProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  T extends object,
> = FormFieldProps<TFieldValues, TName> & Omit<ComboBoxProps<T>, ControlledKeys | 'inputRef'>;

/** Stores the selected item's key (`id`) in the form. */
export function FormComboBox<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  T extends object = object,
>({ name, control, rules, ...props }: FormComboBoxProps<TFieldValues, TName, T>) {
  const { field, shared } = useField({ name, control, rules });
  return (
    <ComboBox<T>
      {...props}
      {...shared}
      isDisabled={props.isDisabled || field.disabled}
      value={field.value ?? null}
      onChange={field.onChange}
      inputRef={field.ref}
    />
  );
}

export type FormDatePickerProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> =
  FormFieldProps<TFieldValues, TName> & Omit<DatePickerProps<CalendarDate>, ControlledKeys>;

function toCalendarDate(value: unknown): CalendarDate | null {
  if (!(value instanceof Date) || Number.isNaN(value.getTime())) return null;
  return new CalendarDate(value.getFullYear(), value.getMonth() + 1, value.getDate());
}

/** Works with `z.date()`: the form value is a JS `Date` (local midnight), or `undefined` when empty. */
export function FormDatePicker<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ name, control, rules, ...props }: FormDatePickerProps<TFieldValues, TName>) {
  const { field, shared } = useField({ name, control, rules });
  return (
    <DatePicker<CalendarDate>
      {...props}
      {...shared}
      isDisabled={props.isDisabled || field.disabled}
      value={toCalendarDate(field.value)}
      onChange={(value) => field.onChange(value ? value.toDate(getLocalTimeZone()) : undefined)}
    />
  );
}

function FieldMessage({ children }: { children?: string }) {
  if (!children) return null;
  return <p className="text-sm text-danger">{children}</p>;
}

export type FormCheckboxProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> =
  FormFieldProps<TFieldValues, TName> & Omit<CheckboxProps, ControlledKeys | 'isSelected' | 'defaultSelected' | 'inputRef'>;

export function FormCheckbox<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ name, control, rules, ...props }: FormCheckboxProps<TFieldValues, TName>) {
  const { field, shared } = useField({ name, control, rules });
  const { errorMessage, ...checkboxShared } = shared;
  return (
    <div className="flex flex-col gap-1.5">
      <Checkbox
        {...props}
        {...checkboxShared}
        isDisabled={props.isDisabled || field.disabled}
        isSelected={!!field.value}
        onChange={field.onChange}
        inputRef={field.ref}
      />
      <FieldMessage>{errorMessage}</FieldMessage>
    </div>
  );
}

export type FormSwitchProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> =
  FormFieldProps<TFieldValues, TName> & Omit<SwitchProps, ControlledKeys | 'isSelected' | 'defaultSelected' | 'inputRef'>;

export function FormSwitch<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ name, control, rules, ...props }: FormSwitchProps<TFieldValues, TName>) {
  const { field, shared } = useField({ name, control, rules });
  const { errorMessage, isInvalid: _isInvalid, validationBehavior: _validationBehavior, ...switchShared } = shared;
  return (
    <div className="flex flex-col gap-1.5">
      <Switch
        {...props}
        {...switchShared}
        isDisabled={props.isDisabled || field.disabled}
        isSelected={!!field.value}
        onChange={field.onChange}
        inputRef={field.ref}
      />
      <FieldMessage>{errorMessage}</FieldMessage>
    </div>
  );
}

export interface SubmitButtonProps extends Omit<ButtonProps, 'type'> {
  control?: Control<any, any, any>;
}

/** Submit button that shows a spinner while the form's `onSubmit` promise is pending. */
export function SubmitButton({ control, isPending, ...props }: SubmitButtonProps) {
  const { isSubmitting } = useFormState({ control });
  return <Button {...props} type="submit" isPending={isPending || isSubmitting} />;
}

export type FormCheckboxGroupProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> =
  FormFieldProps<TFieldValues, TName> & Omit<CheckboxGroupProps, ControlledKeys>;

/** Form value: `string[]` of the checked `value`s. */
export function FormCheckboxGroup<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ name, control, rules, ...props }: FormCheckboxGroupProps<TFieldValues, TName>) {
  const { field, shared } = useField({ name, control, rules });
  return (
    <CheckboxGroup
      {...props}
      {...shared}
      isDisabled={props.isDisabled || field.disabled}
      value={field.value ?? []}
      onChange={field.onChange}
    />
  );
}

export type FormSliderProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> =
  FormFieldProps<TFieldValues, TName> & Omit<SliderProps<number | number[]>, ControlledKeys>;

/** Form value: a number, or `[min, max]` for a range (set the shape with `defaultValues`). */
export function FormSlider<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ name, control, rules, ...props }: FormSliderProps<TFieldValues, TName>) {
  const { field, fieldState } = useController<TFieldValues, TName>({ name, control, rules });
  return (
    <div className="flex flex-col gap-1.5">
      <Slider
        {...props}
        isDisabled={props.isDisabled || field.disabled}
        value={field.value ?? props.minValue ?? 0}
        onChange={field.onChange}
        onChangeEnd={field.onBlur}
      />
      <FieldMessage>{fieldState.error?.message}</FieldMessage>
    </div>
  );
}

export type FormInputOTPProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> =
  FormFieldProps<TFieldValues, TName> & Omit<InputOTPProps, ControlledKeys | 'inputRef' | 'onBlur'>;

export function FormInputOTP<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ name, control, rules, ...props }: FormInputOTPProps<TFieldValues, TName>) {
  const { field, fieldState } = useController<TFieldValues, TName>({ name, control, rules });
  return (
    <InputOTP
      {...props}
      name={field.name}
      isDisabled={props.isDisabled || field.disabled}
      value={field.value ?? ''}
      onChange={field.onChange}
      onBlur={field.onBlur}
      inputRef={field.ref}
      isInvalid={fieldState.invalid}
      errorMessage={fieldState.error?.message}
    />
  );
}

function toDate(value: CalendarDate) {
  return value.toDate(getLocalTimeZone());
}

/** First error message under an object-valued field, e.g. `range` or `range.end`. */
function firstErrorMessage(error: unknown): string | undefined {
  if (!error || typeof error !== 'object') return undefined;
  if ('message' in error && typeof error.message === 'string') return error.message;
  for (const nested of Object.values(error)) {
    const message = firstErrorMessage(nested);
    if (message) return message;
  }
  return undefined;
}

export type FormDateRangePickerProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> =
  FormFieldProps<TFieldValues, TName> & Omit<DateRangePickerProps<CalendarDate>, ControlledKeys>;

/** Works with `z.object({ start: z.date(), end: z.date() })` – the form value is `{ start: Date, end: Date }`. */
export function FormDateRangePicker<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ name, control, rules, ...props }: FormDateRangePickerProps<TFieldValues, TName>) {
  const { field, fieldState } = useController<TFieldValues, TName>({ name, control, rules });
  const { errors } = useFormState({ control, name });
  const errorMessage = firstErrorMessage(name.split('.').reduce<unknown>((acc, key) => (acc as any)?.[key], errors));
  const start = toCalendarDate(field.value?.start);
  const end = toCalendarDate(field.value?.end);
  return (
    <DateRangePicker<CalendarDate>
      {...props}
      onBlur={field.onBlur}
      validationBehavior="aria"
      isInvalid={fieldState.invalid || !!errorMessage}
      errorMessage={errorMessage}
      isDisabled={props.isDisabled || field.disabled}
      value={start && end ? { start, end } : null}
      onChange={(range) => field.onChange(range ? { start: toDate(range.start), end: toDate(range.end) } : undefined)}
    />
  );
}

export type FormDateFieldProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> =
  FormFieldProps<TFieldValues, TName> & Omit<DateFieldProps<CalendarDate>, ControlledKeys>;

/** Keyboard-only date entry for `z.date()`. */
export function FormDateField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ name, control, rules, ...props }: FormDateFieldProps<TFieldValues, TName>) {
  const { field, shared } = useField({ name, control, rules });
  return (
    <DateField<CalendarDate>
      {...props}
      {...shared}
      isDisabled={props.isDisabled || field.disabled}
      value={toCalendarDate(field.value)}
      onChange={(value) => field.onChange(value ? toDate(value) : undefined)}
    />
  );
}

function parseTimeValue(value: unknown): Time | null {
  if (typeof value !== 'string' || !value) return null;
  try {
    return parseTime(value);
  } catch {
    return null;
  }
}

export type FormTimeFieldProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> =
  FormFieldProps<TFieldValues, TName> & Omit<TimeFieldProps<Time>, ControlledKeys>;

/** Form value: an `HH:mm` string (`HH:mm:ss` with `granularity="second"`) – pairs with `z.iso.time()`. */
export function FormTimeField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ name, control, rules, ...props }: FormTimeFieldProps<TFieldValues, TName>) {
  const { field, shared } = useField({ name, control, rules });
  return (
    <TimeField<Time>
      {...props}
      {...shared}
      isDisabled={props.isDisabled || field.disabled}
      value={parseTimeValue(field.value)}
      onChange={(next) => field.onChange(next ? next.toString().slice(0, props.granularity === 'second' ? 8 : 5) : undefined)}
    />
  );
}

export type FormTagFieldProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> =
  FormFieldProps<TFieldValues, TName> & Omit<TagFieldProps, ControlledKeys | 'inputRef' | 'onBlur' | 'isInvalid'>;

/** Form value: `string[]`. */
export function FormTagField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ name, control, rules, ...props }: FormTagFieldProps<TFieldValues, TName>) {
  const { field, fieldState } = useController<TFieldValues, TName>({ name, control, rules });
  return (
    <TagField
      {...props}
      name={field.name}
      isDisabled={props.isDisabled || field.disabled}
      value={field.value ?? []}
      onChange={field.onChange}
      onBlur={field.onBlur}
      inputRef={field.ref}
      isInvalid={fieldState.invalid}
      errorMessage={firstErrorMessage(fieldState.error)}
    />
  );
}

export type FormFileUploadProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> =
  FormFieldProps<TFieldValues, TName> & Omit<FileUploadProps, ControlledKeys | 'buttonRef' | 'isInvalid'>;

/** Form value: `File[]` – validate with `z.array(z.instanceof(File))`. */
export function FormFileUpload<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ name, control, rules, ...props }: FormFileUploadProps<TFieldValues, TName>) {
  const { field, fieldState } = useController<TFieldValues, TName>({ name, control, rules });
  return (
    <FileUpload
      {...props}
      isDisabled={props.isDisabled || field.disabled}
      value={field.value ?? []}
      onChange={(files) => {
        field.onChange(files);
        field.onBlur();
      }}
      buttonRef={field.ref}
      isInvalid={fieldState.invalid}
      errorMessage={firstErrorMessage(fieldState.error)}
    />
  );
}

export type FormRatingProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> =
  FormFieldProps<TFieldValues, TName> & Omit<RatingProps, ControlledKeys | 'inputRef' | 'onBlur' | 'isInvalid'>;

/** Form value: number of stars, `undefined` until rated. */
export function FormRating<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ name, control, rules, ...props }: FormRatingProps<TFieldValues, TName>) {
  const { field, fieldState } = useController<TFieldValues, TName>({ name, control, rules });
  return (
    <Rating
      {...props}
      name={field.name}
      isDisabled={props.isDisabled || field.disabled}
      value={field.value ?? 0}
      onChange={field.onChange}
      onBlur={field.onBlur}
      inputRef={field.ref}
      isInvalid={fieldState.invalid}
      errorMessage={fieldState.error?.message}
    />
  );
}

export type FormToggleButtonGroupProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> =
  FormFieldProps<TFieldValues, TName> &
    Omit<ToggleButtonGroupProps, 'selectedKeys' | 'defaultSelectedKeys' | 'onSelectionChange' | 'selectionMode'> & {
      label?: ReactNode;
    };

/** Single-choice segmented control. Form value: the `id` of the selected ToggleButton. */
export function FormToggleButtonGroup<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ name, control, rules, label, ...props }: FormToggleButtonGroupProps<TFieldValues, TName>) {
  const { field, fieldState } = useController<TFieldValues, TName>({ name, control, rules });
  return (
    <div className="flex flex-col gap-1.5">
      {label && <span className="text-sm font-medium text-foreground">{label}</span>}
      <ToggleButtonGroup
        aria-label={typeof label === 'string' ? label : undefined}
        {...props}
        selectionMode="single"
        isDisabled={props.isDisabled || field.disabled}
        selectedKeys={field.value != null ? [field.value] : []}
        onSelectionChange={(keys) => {
          field.onChange([...keys][0]);
          field.onBlur();
        }}
      />
      <FieldMessage>{fieldState.error?.message}</FieldMessage>
    </div>
  );
}

export type FormColorPickerProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> =
  FormFieldProps<TFieldValues, TName> & Omit<ColorPickerProps, 'value' | 'defaultValue' | 'onChange' | 'errorMessage'>;

/** Form value: a hex string like `#16a34a`. */
export function FormColorPicker<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ name, control, rules, ...props }: FormColorPickerProps<TFieldValues, TName>) {
  const { field, fieldState } = useController<TFieldValues, TName>({ name, control, rules });
  return (
    <ColorPicker
      {...props}
      isDisabled={props.isDisabled || field.disabled}
      value={field.value || '#000000'}
      onChange={(color) => {
        field.onChange(color.toString('hex'));
        field.onBlur();
      }}
      errorMessage={fieldState.error?.message}
    />
  );
}
