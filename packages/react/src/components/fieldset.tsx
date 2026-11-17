import type { ComponentProps, ReactNode } from 'react';
import { cn } from '../utils';

export interface FieldsetProps extends ComponentProps<'fieldset'> {
  legend?: ReactNode;
  description?: ReactNode;
}

/** Groups related fields under a legend. `disabled` disables every native control inside. */
export function Fieldset({ legend, description, className, children, ...props }: FieldsetProps) {
  return (
    <fieldset {...props} className={cn('flex min-w-0 flex-col gap-4 disabled:opacity-60', className)}>
      {(legend || description) && (
        <div className="flex flex-col gap-1">
          {legend && <legend className="text-base font-semibold text-foreground">{legend}</legend>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      )}
      {children}
    </fieldset>
  );
}
