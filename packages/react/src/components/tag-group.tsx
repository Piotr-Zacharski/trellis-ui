'use client';

import { type KeyboardEvent, type ReactNode, type Ref, useId, useRef, useState } from 'react';
import {
  Button as RACButton,
  Tag as RACTag,
  TagGroup as RACTagGroup,
  type TagGroupProps as RACTagGroupProps,
  TagList,
  type TagListProps,
  type TagProps,
} from 'react-aria-components';
import { cn, composeTailwindRenderProps } from '../utils';
import { Description, Label } from './field';
import { XIcon } from './icons';

export interface TagGroupProps<T extends object> extends Omit<RACTagGroupProps, 'children'>, Pick<TagListProps<T>, 'items' | 'children' | 'renderEmptyState'> {
  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: string;
}

/** A focusable list of tags. Pass `onRemove` to make them removable (also with Backspace / Delete). */
export function TagGroup<T extends object>({
  label,
  description,
  errorMessage,
  items,
  children,
  renderEmptyState,
  className,
  ...props
}: TagGroupProps<T>) {
  return (
    <RACTagGroup {...props} className={cn('flex flex-col gap-1.5', className)}>
      {label && <Label>{label}</Label>}
      <TagList items={items} renderEmptyState={renderEmptyState} className="flex flex-wrap gap-1.5">
        {children}
      </TagList>
      {description && <Description>{description}</Description>}
      {errorMessage && <p className="text-sm text-danger">{errorMessage}</p>}
    </RACTagGroup>
  );
}

export function Tag({ children, className, ...props }: TagProps) {
  const textValue = props.textValue ?? (typeof children === 'string' ? children : undefined);
  return (
    <RACTag
      {...props}
      textValue={textValue}
      className={composeTailwindRenderProps(
        className,
        'flex h-7 cursor-default items-center gap-1 rounded-full border border-border bg-muted px-2.5 text-xs font-medium text-foreground outline-none data-focus-visible:ring-3 data-focus-visible:ring-ring data-selected:border-primary data-selected:bg-primary-soft data-selected:text-primary data-disabled:opacity-50',
      )}
    >
      {({ allowsRemoving }) => (
        <>
          {children as ReactNode}
          {allowsRemoving && (
            <RACButton
              slot="remove"
              className="-mr-1 flex size-4 cursor-default items-center justify-center rounded-full text-muted-foreground outline-none hover:bg-border hover:text-foreground"
            >
              <XIcon className="size-3" />
            </RACButton>
          )}
        </>
      )}
    </RACTag>
  );
}

export interface TagFieldProps {
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  onBlur?: () => void;
  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: string;
  isInvalid?: boolean;
  isDisabled?: boolean;
  placeholder?: string;
  maxTags?: number;
  allowDuplicates?: boolean;
  /** Keys that commit the typed text as a tag. Enter always does. */
  delimiters?: string[];
  name?: string;
  inputRef?: Ref<HTMLInputElement>;
  className?: string;
}

/** Tag input: type and press Enter or comma to add, Backspace on an empty input removes the last tag. */
export function TagField({
  value: controlledValue,
  defaultValue = [],
  onChange,
  onBlur,
  label,
  description,
  errorMessage,
  isInvalid = !!errorMessage,
  isDisabled,
  placeholder = 'Add a tag…',
  maxTags,
  allowDuplicates = false,
  delimiters = [','],
  name,
  inputRef,
  className,
}: TagFieldProps) {
  const id = useId();
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const [draft, setDraft] = useState('');
  const localInputRef = useRef<HTMLInputElement>(null);
  const tags = controlledValue ?? uncontrolled;
  const isFull = maxTags !== undefined && tags.length >= maxTags;

  const update = (next: string[]) => {
    if (controlledValue === undefined) setUncontrolled(next);
    onChange?.(next);
  };

  const commit = () => {
    const tag = draft.trim();
    if (!tag || isFull || (!allowDuplicates && tags.includes(tag))) return;
    update([...tags, tag]);
    setDraft('');
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || delimiters.includes(event.key)) {
      if (draft.trim()) {
        event.preventDefault();
        commit();
      } else if (event.key !== 'Enter') {
        event.preventDefault();
      }
    } else if (event.key === 'Backspace' && draft === '' && tags.length > 0) {
      update(tags.slice(0, -1));
    }
  };

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <label htmlFor={id} className="w-fit text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      {/* biome-ignore lint/a11y/noStaticElementInteractions: clicking the box focuses the input */}
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: keyboard users focus the input directly */}
      <div
        onClick={() => localInputRef.current?.focus()}
        className={cn(
          'flex min-h-10 flex-wrap items-center gap-1.5 rounded-tr border border-input bg-background px-2 py-1.5 transition-[border-color,box-shadow] focus-within:border-primary focus-within:ring-3 focus-within:ring-ring',
          isInvalid && 'border-danger focus-within:ring-danger/25',
          isDisabled && 'opacity-50',
        )}
      >
        {tags.length > 0 && (
          <RACTagGroup
            aria-label={typeof label === 'string' ? label : 'Tags'}
            onRemove={(keys) => update(tags.filter((tag) => !keys.has(tag)))}
            className="contents"
          >
            <TagList className="contents">
              {tags.map((tag) => (
                <Tag key={tag} id={tag}>
                  {tag}
                </Tag>
              ))}
            </TagList>
          </RACTagGroup>
        )}
        <input
          ref={(node) => {
            localInputRef.current = node;
            if (typeof inputRef === 'function') inputRef(node);
            else if (inputRef) inputRef.current = node;
          }}
          id={id}
          name={name}
          value={draft}
          disabled={isDisabled || isFull}
          placeholder={isFull ? '' : placeholder}
          aria-invalid={isInvalid || undefined}
          aria-describedby={[description && `${id}-description`, isInvalid && errorMessage && `${id}-error`].filter(Boolean).join(' ') || undefined}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={onKeyDown}
          onBlur={() => {
            commit();
            onBlur?.();
          }}
          className="h-7 min-w-24 flex-1 bg-transparent px-1 text-sm text-foreground outline-none placeholder:text-muted-foreground"
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
