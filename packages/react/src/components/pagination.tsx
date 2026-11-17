'use client';

import { useState } from 'react';
import { Button as RACButton } from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { cn, focusRing } from '../utils';
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from './icons';

export interface PaginationProps {
  /** Total number of pages. */
  total: number;
  /** Current page (1-based). */
  page?: number;
  defaultPage?: number;
  onChange?: (page: number) => void;
  /** Pages shown on each side of the current page. */
  siblings?: number;
  /** Pages always shown at the start and end. */
  boundaries?: number;
  className?: string;
  'aria-label'?: string;
}

const pageStyles = tv({
  extend: focusRing,
  base: 'flex h-9 min-w-9 cursor-default items-center justify-center rounded-tr px-2 text-sm font-medium tabular-nums text-foreground transition-colors hover:bg-muted',
  variants: {
    isCurrent: { true: 'bg-primary text-primary-foreground hover:bg-primary-hover' },
    isDisabled: { true: 'opacity-40 hover:bg-transparent' },
  },
});

type PageItem = number | 'start-ellipsis' | 'end-ellipsis';

function range(from: number, to: number) {
  return Array.from({ length: Math.max(0, to - from + 1) }, (_, i) => from + i);
}

/** Builds the list of visible pages, e.g. [1, 'start-ellipsis', 5, 6, 7, 'end-ellipsis', 20]. */
export function getPaginationItems(total: number, page: number, siblings = 1, boundaries = 1): PageItem[] {
  const totalShown = boundaries * 2 + siblings * 2 + 3;
  if (total <= totalShown) return range(1, total);

  const left = Math.max(page - siblings, boundaries + 2);
  const right = Math.min(page + siblings, total - boundaries - 1);
  const items: PageItem[] = [...range(1, boundaries)];

  if (left > boundaries + 2) items.push('start-ellipsis');
  else items.push(boundaries + 1);

  items.push(...range(Math.max(left, boundaries + 2), Math.min(right, total - boundaries - 1)));

  if (right < total - boundaries - 1) items.push('end-ellipsis');
  else items.push(total - boundaries);

  items.push(...range(total - boundaries + 1, total));
  return [...new Set(items)];
}

export function Pagination({
  total,
  page: controlledPage,
  defaultPage = 1,
  onChange,
  siblings = 1,
  boundaries = 1,
  className,
  'aria-label': ariaLabel = 'Pagination',
}: PaginationProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultPage);
  const page = controlledPage ?? uncontrolled;
  const go = (next: number) => {
    const clamped = Math.min(Math.max(next, 1), total);
    if (controlledPage === undefined) setUncontrolled(clamped);
    onChange?.(clamped);
  };

  return (
    <nav aria-label={ariaLabel} className={cn('flex items-center', className)}>
      <ul className="flex items-center gap-1">
        <li>
          <RACButton
            aria-label="Previous page"
            isDisabled={page <= 1}
            onPress={() => go(page - 1)}
            className={({ isFocusVisible, isDisabled }) => pageStyles({ isFocusVisible, isDisabled })}
          >
            <ChevronLeftIcon className="size-4" />
          </RACButton>
        </li>
        {getPaginationItems(total, page, siblings, boundaries).map((item) =>
          typeof item === 'number' ? (
            <li key={item}>
              <RACButton
                aria-label={`Page ${item}`}
                aria-current={item === page ? 'page' : undefined}
                onPress={() => go(item)}
                className={({ isFocusVisible }) => pageStyles({ isFocusVisible, isCurrent: item === page })}
              >
                {item}
              </RACButton>
            </li>
          ) : (
            <li key={item} aria-hidden="true" className="flex h-9 w-9 items-center justify-center text-muted-foreground">
              <MoreHorizontalIcon className="size-4" />
            </li>
          ),
        )}
        <li>
          <RACButton
            aria-label="Next page"
            isDisabled={page >= total}
            onPress={() => go(page + 1)}
            className={({ isFocusVisible, isDisabled }) => pageStyles({ isFocusVisible, isDisabled })}
          >
            <ChevronRightIcon className="size-4" />
          </RACButton>
        </li>
      </ul>
    </nav>
  );
}
