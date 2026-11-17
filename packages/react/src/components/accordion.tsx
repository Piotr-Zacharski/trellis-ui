'use client';

import type { ReactNode } from 'react';
import {
  Button as RACButton,
  Disclosure as RACDisclosure,
  DisclosureGroup,
  type DisclosureGroupProps,
  DisclosurePanel,
  type DisclosureProps as RACDisclosureProps,
  Heading,
} from 'react-aria-components';
import { cn, composeTailwindRenderProps } from '../utils';
import { ChevronDownIcon } from './icons';

export interface AccordionProps extends DisclosureGroupProps {
  variant?: 'bordered' | 'plain';
}

/** A stack of collapsible sections. Set `allowsMultipleExpanded` to open several at once. */
export function Accordion({ variant = 'bordered', ...props }: AccordionProps) {
  return (
    <DisclosureGroup
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        cn(
          'flex w-full flex-col divide-y divide-border',
          variant === 'bordered' && 'rounded-[calc(var(--tr-radius)*1.4)] border border-border px-4',
        ),
      )}
    />
  );
}

export interface DisclosureProps extends Omit<RACDisclosureProps, 'children'> {
  title: ReactNode;
  children?: ReactNode;
}

/** A single collapsible section – use it alone or inside an Accordion (where it needs an `id`). */
export function Disclosure({ title, children, ...props }: DisclosureProps) {
  return (
    <RACDisclosure {...props} className={composeTailwindRenderProps(props.className, 'group w-full')}>
      <Heading level={3} className="m-0">
        <RACButton
          slot="trigger"
          className={({ isFocusVisible }) =>
            cn(
              'flex w-full cursor-default items-center justify-between gap-4 rounded-tr py-4 text-left text-sm font-medium text-foreground outline-none group-data-disabled:opacity-50',
              isFocusVisible && 'ring-3 ring-ring',
            )
          }
        >
          {title}
          <ChevronDownIcon className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-expanded:rotate-180" />
        </RACButton>
      </Heading>
      <DisclosurePanel className="text-sm text-muted-foreground">
        <div className="pb-4">{children}</div>
      </DisclosurePanel>
    </RACDisclosure>
  );
}

/** Alias for use inside an Accordion. */
export const AccordionItem = Disclosure;
