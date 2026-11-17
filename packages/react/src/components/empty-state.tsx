import type { ComponentProps, ReactNode } from 'react';
import { cn } from '../utils';

export interface EmptyStateProps extends Omit<ComponentProps<'div'>, 'title'> {
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  /** Primary / secondary actions, e.g. "Create project". */
  actions?: ReactNode;
}

/** Shown when a list, table or search has nothing to display. */
export function EmptyState({ icon, title, description, actions, className, ...props }: EmptyStateProps) {
  return (
    <div {...props} className={cn('flex flex-col items-center justify-center gap-2 px-6 py-12 text-center', className)}>
      {icon && (
        <span className="mb-2 flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground [&>svg]:size-6">{icon}</span>
      )}
      <p className="text-base font-semibold text-foreground">{title}</p>
      {description && <p className="max-w-sm text-sm text-muted-foreground">{description}</p>}
      {actions && <div className="mt-3 flex flex-wrap justify-center gap-2">{actions}</div>}
    </div>
  );
}
