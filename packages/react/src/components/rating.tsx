'use client';

import { type ReactNode, type Ref, useState } from 'react';
import { Radio, RadioGroup } from 'react-aria-components';
import { cn } from '../utils';
import { Description, FieldError, Label } from './field';
import { StarIcon } from './icons';

export interface RatingProps {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  onBlur?: () => void;
  /** Number of stars. */
  max?: number;
  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: string;
  isInvalid?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  name?: string;
  inputRef?: Ref<HTMLInputElement>;
  className?: string;
  'aria-label'?: string;
}

const starSize = { sm: 'size-4', md: 'size-6', lg: 'size-8' } as const;

/** Star rating built on a radio group – arrow keys change the value, screen readers announce "3 of 5 stars". */
export function Rating({
  value: controlledValue,
  defaultValue = 0,
  onChange,
  onBlur,
  max = 5,
  label,
  description,
  errorMessage,
  isInvalid = !!errorMessage,
  isDisabled,
  isReadOnly,
  size = 'md',
  name,
  inputRef,
  className,
  'aria-label': ariaLabel,
}: RatingProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const [hovered, setHovered] = useState<number | null>(null);
  const value = controlledValue ?? uncontrolled;
  const shown = hovered ?? value;

  return (
    <RadioGroup
      aria-label={label ? undefined : (ariaLabel ?? 'Rating')}
      name={name}
      value={value ? String(value) : null}
      onChange={(next) => {
        const number = Number(next);
        if (controlledValue === undefined) setUncontrolled(number);
        onChange?.(number);
      }}
      onBlur={onBlur}
      orientation="horizontal"
      isDisabled={isDisabled}
      isReadOnly={isReadOnly}
      isInvalid={isInvalid}
      validationBehavior="aria"
      className={cn('flex flex-col gap-1.5', className)}
    >
      {label && <Label>{label}</Label>}
      {/* biome-ignore lint/a11y/noStaticElementInteractions: hover preview only */}
      <div className="flex w-fit items-center gap-0.5" onPointerLeave={() => setHovered(null)}>
        {Array.from({ length: max }, (_, i) => {
          const star = i + 1;
          return (
            <Radio
              key={star}
              value={String(star)}
              aria-label={`${star} of ${max} stars`}
              inputRef={star === 1 ? inputRef : undefined}
              onHoverStart={() => !isReadOnly && setHovered(star)}
              className={({ isFocusVisible }) =>
                cn('cursor-default rounded-sm outline-none', isFocusVisible && 'ring-3 ring-ring', (isDisabled || isReadOnly) && 'cursor-default')
              }
            >
              <StarIcon
                className={cn(
                  starSize[size],
                  'transition-colors',
                  star <= shown ? 'fill-warning text-warning' : 'fill-transparent text-input',
                  isDisabled && 'opacity-50',
                )}
              />
            </Radio>
          );
        })}
      </div>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </RadioGroup>
  );
}
