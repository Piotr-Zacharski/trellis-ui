import { composeRenderProps } from 'react-aria-components';
import { cn, tv } from 'tailwind-variants';

export { cn };

/** Shared keyboard focus ring. Extend it in component styles with `extend: focusRing`. */
export const focusRing = tv({
  base: 'outline-none',
  variants: {
    isFocusVisible: {
      true: 'ring-3 ring-ring ring-offset-2 ring-offset-background',
    },
  },
});

/** Merges a static Tailwind class string with a React Aria `className` that may be a render-prop function. */
export function composeTailwindRenderProps<T>(
  className: string | ((renderProps: T) => string) | undefined,
  tailwind: string,
): string | ((renderProps: T) => string) {
  return composeRenderProps(className, (className) => cn(tailwind, className) ?? '');
}
