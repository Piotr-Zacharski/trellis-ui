'use client';

import { Separator as RACSeparator, type SeparatorProps } from 'react-aria-components';
import { cn } from '../utils';

export function Separator({ orientation = 'horizontal', className, ...props }: SeparatorProps) {
  return (
    <RACSeparator
      {...props}
      orientation={orientation}
      className={cn('shrink-0 bg-border', orientation === 'horizontal' ? 'h-px w-full' : 'w-px self-stretch', className)}
    />
  );
}
