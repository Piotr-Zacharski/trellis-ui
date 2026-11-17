'use client';

import { OverlayArrow, Tooltip as RACTooltip, type TooltipProps as RACTooltipProps } from 'react-aria-components';
import { composeTailwindRenderProps } from '../utils';

export { TooltipTrigger } from 'react-aria-components';

export interface TooltipProps extends Omit<RACTooltipProps, 'children'> {
  children: React.ReactNode;
  showArrow?: boolean;
}

/**
 * Short hint shown on hover or keyboard focus of its trigger.
 * Wrap the trigger and the tooltip in `TooltipTrigger`; the trigger must be focusable (e.g. a Button).
 */
export function Tooltip({ children, showArrow = true, offset = 8, ...props }: TooltipProps) {
  return (
    <RACTooltip
      offset={offset}
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        'max-w-64 rounded-[calc(var(--tr-radius)*0.8)] bg-foreground px-2.5 py-1.5 text-xs text-background shadow-md transition-[opacity,transform] duration-150 data-entering:scale-95 data-entering:opacity-0 data-exiting:opacity-0',
      )}
    >
      {showArrow && (
        <OverlayArrow className="group">
          <svg
            width={8}
            height={8}
            viewBox="0 0 8 8"
            className="block fill-foreground group-data-[placement=bottom]:rotate-180 group-data-[placement=left]:-rotate-90 group-data-[placement=right]:rotate-90"
          >
            <path d="M0 0 L4 4 L8 0" />
          </svg>
        </OverlayArrow>
      )}
      {children}
    </RACTooltip>
  );
}
