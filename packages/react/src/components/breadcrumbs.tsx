'use client';

import {
  Breadcrumb as RACBreadcrumb,
  type BreadcrumbProps as RACBreadcrumbProps,
  Breadcrumbs as RACBreadcrumbs,
  type BreadcrumbsProps,
  Link,
  type LinkProps,
} from 'react-aria-components';
import { cn, composeTailwindRenderProps } from '../utils';
import { ChevronRightIcon } from './icons';

/** Trail of links to the current page. The last Breadcrumb is marked as the current page. */
export function Breadcrumbs<T extends object>(props: BreadcrumbsProps<T>) {
  return <RACBreadcrumbs {...props} className={cn('flex flex-wrap items-center gap-1 text-sm', props.className)} />;
}

export interface BreadcrumbProps extends Omit<RACBreadcrumbProps, 'children'>, Pick<LinkProps, 'href' | 'target' | 'routerOptions'> {
  children: React.ReactNode;
}

export function Breadcrumb({ href, target, routerOptions, children, ...props }: BreadcrumbProps) {
  return (
    <RACBreadcrumb {...props} className={composeTailwindRenderProps(props.className, 'flex items-center gap-1')}>
      {({ isCurrent }) => (
        <>
          <Link
            href={href}
            target={target}
            routerOptions={routerOptions}
            className={({ isFocusVisible }) =>
              cn(
                'rounded-sm outline-none',
                isCurrent ? 'font-medium text-foreground' : 'text-muted-foreground hover:text-foreground',
                isFocusVisible && 'ring-3 ring-ring',
              )
            }
          >
            {children}
          </Link>
          {!isCurrent && <ChevronRightIcon aria-hidden className="size-3.5 text-muted-foreground" />}
        </>
      )}
    </RACBreadcrumb>
  );
}
