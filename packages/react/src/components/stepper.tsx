import type { ReactNode } from 'react';
import { cn } from '../utils';
import { CheckIcon } from './icons';

export interface Step {
  title: ReactNode;
  description?: ReactNode;
}

export interface StepperProps {
  steps: Step[];
  /** Index of the active step (0-based). Steps before it are shown as completed. */
  currentStep: number;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  'aria-label'?: string;
}

/** Progress through a multi-step flow, e.g. a checkout or onboarding wizard. */
export function Stepper({ steps, currentStep, orientation = 'horizontal', className, 'aria-label': ariaLabel = 'Progress' }: StepperProps) {
  const isHorizontal = orientation === 'horizontal';
  return (
    <ol aria-label={ariaLabel} className={cn('flex w-full', isHorizontal ? 'flex-row items-start' : 'flex-col', className)}>
      {steps.map((step, index) => {
        const status = index < currentStep ? 'complete' : index === currentStep ? 'current' : 'upcoming';
        const isLast = index === steps.length - 1;
        return (
          <li
            // biome-ignore lint/suspicious/noArrayIndexKey: steps are positional
            key={index}
            aria-current={status === 'current' ? 'step' : undefined}
            className={cn('relative flex', isHorizontal ? 'flex-1 flex-col items-center text-center' : 'gap-3 pb-6 last:pb-0')}
          >
            {!isLast && (
              <span
                aria-hidden="true"
                className={cn(
                  'absolute',
                  isHorizontal ? 'top-4 left-[calc(50%+1.25rem)] h-0.5 w-[calc(100%-2.5rem)]' : 'top-9 bottom-1 left-4 w-0.5 -translate-x-1/2',
                  status === 'complete' ? 'bg-primary' : 'bg-border',
                )}
              />
            )}
            <span
              className={cn(
                'relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold',
                status === 'complete' && 'border-primary bg-primary text-primary-foreground',
                status === 'current' && 'border-primary bg-background text-primary',
                status === 'upcoming' && 'border-border bg-background text-muted-foreground',
              )}
            >
              {status === 'complete' ? <CheckIcon className="size-4" /> : index + 1}
              <span className="sr-only">{status === 'complete' ? ' (completed)' : status === 'current' ? ' (current)' : ''}</span>
            </span>
            <span className={cn('flex flex-col gap-0.5', isHorizontal ? 'mt-2 px-2' : 'pt-1')}>
              <span className={cn('text-sm font-medium', status === 'upcoming' ? 'text-muted-foreground' : 'text-foreground')}>
                {step.title}
              </span>
              {step.description && <span className="text-xs text-muted-foreground">{step.description}</span>}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
