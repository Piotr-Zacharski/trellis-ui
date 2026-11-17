'use client';

import type { ReactNode } from 'react';
import {
  Cell as RACCell,
  type CellProps,
  Collection,
  Column as RACColumn,
  type ColumnProps as RACColumnProps,
  composeRenderProps,
  Row as RACRow,
  type RowProps,
  Table as RACTable,
  TableBody as RACTableBody,
  type TableBodyProps,
  TableHeader as RACTableHeader,
  type TableHeaderProps,
  type TableProps,
  useTableOptions,
} from 'react-aria-components';
import { cn, composeTailwindRenderProps } from '../utils';
import { Checkbox } from './checkbox';
import { ChevronUpIcon } from './icons';

/**
 * Accessible data table with keyboard navigation, optional row selection (`selectionMode`) and sorting
 * (`sortDescriptor` / `onSortChange` + `allowsSorting` on columns). Wrap it in a scroll container for many rows.
 */
export function Table(props: TableProps) {
  return (
    <div className="w-full overflow-auto rounded-[calc(var(--tr-radius)*1.4)] border border-border">
      <RACTable {...props} className={composeTailwindRenderProps(props.className, 'w-full border-separate border-spacing-0 text-sm')} />
    </div>
  );
}

export function TableHeader<T extends object>({ columns, children, ...props }: TableHeaderProps<T>) {
  const { selectionBehavior, selectionMode, allowsDragging } = useTableOptions();
  return (
    <RACTableHeader {...props} className={cn('bg-surface', props.className)}>
      {allowsDragging && <RACColumn />}
      {selectionBehavior === 'toggle' && (
        <RACColumn width={44} minWidth={44} className="border-b border-border px-3 py-2.5">
          {selectionMode === 'multiple' && <Checkbox slot="selection" />}
        </RACColumn>
      )}
      <Collection items={columns}>{children}</Collection>
    </RACTableHeader>
  );
}

export interface ColumnProps extends RACColumnProps {
  children?: ReactNode;
}

export function Column({ children, ...props }: ColumnProps) {
  return (
    <RACColumn
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        'cursor-default border-b border-border px-4 py-2.5 text-left text-xs font-medium tracking-wide text-muted-foreground uppercase outline-none data-focus-visible:ring-3 data-focus-visible:ring-ring data-focus-visible:ring-inset',
      )}
    >
      {({ allowsSorting, sortDirection }) => (
        <span className="flex items-center gap-1">
          {children}
          {allowsSorting && (
            <ChevronUpIcon
              aria-hidden
              className={cn('size-3.5 transition-transform', !sortDirection && 'opacity-0', sortDirection === 'descending' && 'rotate-180')}
            />
          )}
        </span>
      )}
    </RACColumn>
  );
}

export function TableBody<T extends object>(props: TableBodyProps<T>) {
  return <RACTableBody {...props} className={cn('[&>tr:last-child>td]:border-b-0', props.className)} />;
}

export function Row<T extends object>({ id, columns, children, ...props }: RowProps<T>) {
  const { selectionBehavior, allowsDragging } = useTableOptions();
  return (
    <RACRow
      id={id}
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        'cursor-default text-foreground outline-none hover:bg-muted/50 data-selected:bg-primary-soft/60 data-focus-visible:ring-3 data-focus-visible:ring-ring data-focus-visible:ring-inset',
      )}
    >
      {allowsDragging && <RACCell />}
      {selectionBehavior === 'toggle' && (
        <Cell>
          <Checkbox slot="selection" />
        </Cell>
      )}
      <Collection items={columns}>{children}</Collection>
    </RACRow>
  );
}

export function Cell(props: CellProps) {
  return (
    <RACCell
      {...props}
      className={composeRenderProps(props.className, (className, { isFocusVisible }) =>
        cn('border-b border-border px-4 py-3 outline-none', isFocusVisible && 'ring-3 ring-ring ring-inset', className),
      )}
    />
  );
}
