'use client';

import { type ComponentProps, type ReactNode, useState } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '../utils';

export const avatarStyles = tv({
  base: 'relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted font-medium text-muted-foreground select-none',
  variants: {
    size: {
      xs: 'size-6 text-[10px]',
      sm: 'size-8 text-xs',
      md: 'size-10 text-sm',
      lg: 'size-14 text-base',
    },
    isBordered: { true: 'ring-2 ring-background' },
  },
  defaultVariants: { size: 'md' },
});

export interface AvatarProps extends Omit<ComponentProps<'span'>, 'children'>, VariantProps<typeof avatarStyles> {
  src?: string;
  /** Used as alt text and to derive the initials fallback. */
  name?: string;
  /** Custom fallback (icon, initials) when there is no image or it fails to load. */
  fallback?: ReactNode;
  /** Small status dot. */
  status?: 'online' | 'away' | 'busy' | 'offline';
}

function initials(name?: string) {
  if (!name) return '';
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? '') + (parts.length > 1 ? (parts.at(-1)?.[0] ?? '') : '')).toUpperCase();
}

const statusColor = { online: 'bg-primary', away: 'bg-warning', busy: 'bg-danger', offline: 'bg-input' } as const;

export function Avatar({ src, name, fallback, status, size, isBordered, className, ...props }: AvatarProps) {
  const [failed, setFailed] = useState(false);
  const showImage = src && !failed;
  return (
    <span {...props} className={cn('relative inline-flex shrink-0', className)}>
      <span className={avatarStyles({ size, isBordered })} role={showImage ? undefined : 'img'} aria-label={showImage ? undefined : name}>
        {showImage ? (
          <img src={src} alt={name ?? ''} onError={() => setFailed(true)} className="size-full object-cover" />
        ) : (
          (fallback ?? <span aria-hidden="true">{initials(name)}</span>)
        )}
      </span>
      {status && (
        <span
          role="img"
          aria-label={status}
          className={cn('absolute right-0 bottom-0 size-[28%] min-h-2 min-w-2 rounded-full ring-2 ring-background', statusColor[status])}
        />
      )}
    </span>
  );
}

export interface AvatarGroupProps extends ComponentProps<'div'> {
  /** Show at most this many avatars, then a "+N" bubble. */
  max?: number;
  size?: AvatarProps['size'];
}

export function AvatarGroup({ max, size = 'md', className, children, ...props }: AvatarGroupProps) {
  const items = Array.isArray(children) ? children.flat() : [children];
  const visible = max ? items.slice(0, max) : items;
  const rest = items.length - visible.length;
  return (
    <div {...props} className={cn('flex items-center -space-x-2 [&>*]:ring-2 [&>*]:ring-background [&>*]:rounded-full', className)}>
      {visible}
      {rest > 0 && <span className={avatarStyles({ size })}>+{rest}</span>}
    </div>
  );
}
