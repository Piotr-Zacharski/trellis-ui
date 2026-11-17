'use client';

import { createContext, useContext } from 'react';
import {
  composeRenderProps,
  Tab as RACTab,
  TabList as RACTabList,
  type TabListProps as RACTabListProps,
  TabPanel as RACTabPanel,
  type TabPanelProps,
  type TabProps,
  Tabs as RACTabs,
  type TabsProps,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { composeTailwindRenderProps, focusRing } from '../utils';

type TabsVariant = 'solid' | 'underline';

const TabsVariantContext = createContext<TabsVariant>('solid');

export function Tabs(props: TabsProps) {
  return (
    <RACTabs
      {...props}
      className={composeTailwindRenderProps(props.className, 'flex flex-col gap-4 data-[orientation=vertical]:flex-row')}
    />
  );
}

const tabListStyles = tv({
  base: 'flex w-fit data-[orientation=vertical]:flex-col',
  variants: {
    variant: {
      solid: 'gap-1 rounded-tr bg-muted p-1',
      underline: 'gap-4 border-b border-border data-[orientation=vertical]:border-r data-[orientation=vertical]:border-b-0',
    },
  },
});

export interface TabListProps<T extends object> extends RACTabListProps<T> {
  /** `solid` renders a segmented control, `underline` a classic tab bar. */
  variant?: TabsVariant;
}

export function TabList<T extends object>({ variant = 'solid', className, ...props }: TabListProps<T>) {
  return (
    <TabsVariantContext.Provider value={variant}>
      <RACTabList
        {...props}
        className={composeTailwindRenderProps(className, tabListStyles({ variant }))}
      />
    </TabsVariantContext.Provider>
  );
}

const tabStyles = tv({
  extend: focusRing,
  base: 'flex cursor-default items-center justify-center gap-2 text-sm font-medium whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground',
  variants: {
    variant: {
      solid: 'h-8 rounded-[calc(var(--tr-radius)*0.7)] px-3',
      underline: '-mb-px h-10 border-b-2 border-transparent px-1',
    },
    isSelected: { true: 'text-foreground' },
    isDisabled: { true: 'opacity-50 hover:text-muted-foreground' },
  },
  compoundVariants: [
    { variant: 'solid', isSelected: true, class: 'bg-background shadow-sm' },
    { variant: 'underline', isSelected: true, class: 'border-primary' },
  ],
});

export function Tab(props: TabProps) {
  const variant = useContext(TabsVariantContext);
  return (
    <RACTab
      {...props}
      className={composeRenderProps(props.className, (className, { isSelected, isDisabled, isFocusVisible }) =>
        tabStyles({ variant, isSelected, isDisabled, isFocusVisible, className }),
      )}
    />
  );
}

export function TabPanel(props: TabPanelProps) {
  return (
    <RACTabPanel
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        'flex-1 rounded-tr text-sm text-foreground outline-none data-focus-visible:ring-3 data-focus-visible:ring-ring',
      )}
    />
  );
}
