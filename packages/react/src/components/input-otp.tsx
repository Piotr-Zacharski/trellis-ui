'use client';

import { Fragment, type ReactNode, type Ref, useId, useState } from 'react';
import { cn } from '../utils';

export interface InputOTPProps {
  /** Number of characters. */
  length?: number;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Called once every slot is filled. */
  onComplete?: (value: string) => void;
  onBlur?: () => void;
  /** `numeric` shows the number keyboard on mobile. */
  type?: 'numeric' | 'alphanumeric';
  /** Insert a separator after every N slots, e.g. `3` → `123-456`. */
  groupSize?: number;
  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: string;
  isInvalid?: boolean;
  isDisabled?: boolean;
  autoFocus?: boolean;
  name?: string;
  inputRef?: Ref<HTMLInputElement>;
  className?: string;
  'aria-label'?: string;
}

/** One-time code input. Uses a single real input, so paste, autofill (`one-time-code`) and screen readers just work. */
export function InputOTP({
  length = 6,
  value: controlledValue,
  defaultValue = '',
  onChange,
  onComplete,
  onBlur,
  type = 'numeric',
  groupSize,
  label,
  description,
  errorMessage,
  isInvalid = !!errorMessage,
  isDisabled,
  autoFocus,
  name,
  inputRef,
  className,
  'aria-label': ariaLabel,
}: InputOTPProps) {
  const id = useId();
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const [isFocused, setFocused] = useState(false);
  const value = controlledValue ?? uncontrolled;
  const activeIndex = Math.min(value.length, length - 1);

  const handleChange = (raw: string) => {
    const cleaned = (type === 'numeric' ? raw.replace(/\D/g, '') : raw.replace(/[^a-z0-9]/gi, '').toUpperCase()).slice(0, length);
    if (controlledValue === undefined) setUncontrolled(cleaned);
    onChange?.(cleaned);
    if (cleaned.length === length && cleaned !== value) onComplete?.(cleaned);
  };

  const describedBy = [description && `${id}-description`, isInvalid && errorMessage && `${id}-error`].filter(Boolean).join(' ');

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <label htmlFor={id} className="w-fit text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <div className={cn('relative flex w-fit items-center gap-2', isDisabled && 'opacity-50')}>
        {Array.from({ length }, (_, i) => {
          const char = value[i];
          const isActive = isFocused && i === activeIndex;
          return (
            // biome-ignore lint/suspicious/noArrayIndexKey: slots are positional
            <Fragment key={i}>
              {groupSize && i > 0 && i % groupSize === 0 && <span className="text-muted-foreground" aria-hidden="true">–</span>}
              <div
                aria-hidden="true"
                className={cn(
                  'relative flex size-11 items-center justify-center rounded-tr border border-input bg-background text-lg font-medium text-foreground transition-[border-color,box-shadow]',
                  isInvalid && 'border-danger',
                  isActive && 'border-primary ring-3 ring-ring',
                  isActive && isInvalid && 'ring-danger/25',
                )}
              >
                {char}
                {isActive && !char && <span className="h-5 w-px animate-pulse bg-foreground" />}
              </div>
            </Fragment>
          );
        })}
        <input
          ref={inputRef}
          id={id}
          name={name}
          value={value}
          disabled={isDisabled}
          autoFocus={autoFocus}
          autoComplete="one-time-code"
          inputMode={type === 'numeric' ? 'numeric' : 'text'}
          pattern={type === 'numeric' ? '[0-9]*' : '[A-Za-z0-9]*'}
          maxLength={length}
          aria-label={label ? undefined : (ariaLabel ?? 'One-time code')}
          aria-invalid={isInvalid || undefined}
          aria-describedby={describedBy || undefined}
          onChange={(event) => handleChange(event.target.value)}
          onFocus={(event) => {
            setFocused(true);
            const end = event.target.value.length;
            event.target.setSelectionRange(end, end);
          }}
          onBlur={() => {
            setFocused(false);
            onBlur?.();
          }}
          className="absolute inset-0 cursor-text bg-transparent text-transparent caret-transparent opacity-0 outline-none disabled:cursor-not-allowed"
        />
      </div>
      {description && (
        <p id={`${id}-description`} className="text-sm text-muted-foreground">
          {description}
        </p>
      )}
      {isInvalid && errorMessage && (
        <p id={`${id}-error`} className="text-sm text-danger">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
