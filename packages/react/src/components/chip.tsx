import type { ComponentProps } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

export const chipStyles = tv({
  base: 'inline-flex w-fit items-center gap-1 rounded-full font-medium whitespace-nowrap',
  variants: {
    variant: {
      soft: '',
      solid: '',
      outline: 'border bg-transparent',
    },
    color: {
      primary: '',
      neutral: '',
      danger: '',
      warning: '',
    },
    size: {
      sm: 'h-5 px-2 text-xs',
      md: 'h-6 px-2.5 text-xs',
      lg: 'h-7 px-3 text-sm',
    },
  },
  compoundVariants: [
    { variant: 'soft', color: 'primary', class: 'bg-primary-soft text-primary' },
    { variant: 'soft', color: 'neutral', class: 'bg-muted text-foreground' },
    { variant: 'soft', color: 'danger', class: 'bg-danger-soft text-danger' },
    { variant: 'soft', color: 'warning', class: 'bg-warning-soft text-warning-foreground' },
    { variant: 'solid', color: 'primary', class: 'bg-primary text-primary-foreground' },
    { variant: 'solid', color: 'neutral', class: 'bg-foreground text-background' },
    { variant: 'solid', color: 'danger', class: 'bg-danger text-danger-foreground' },
    { variant: 'solid', color: 'warning', class: 'bg-warning text-black' },
    { variant: 'outline', color: 'primary', class: 'border-primary text-primary' },
    { variant: 'outline', color: 'neutral', class: 'border-input text-foreground' },
    { variant: 'outline', color: 'danger', class: 'border-danger text-danger' },
    { variant: 'outline', color: 'warning', class: 'border-warning text-warning-foreground' },
  ],
  defaultVariants: {
    variant: 'soft',
    color: 'neutral',
    size: 'md',
  },
});

export interface ChipProps extends Omit<ComponentProps<'span'>, 'color'>, VariantProps<typeof chipStyles> {}

export function Chip({ variant, color, size, className, ...props }: ChipProps) {
  return <span {...props} className={chipStyles({ variant, color, size, className })} />;
}
