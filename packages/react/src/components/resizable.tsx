'use client';

import { Children, type KeyboardEvent, type PointerEvent, type ReactNode, useRef, useState } from 'react';
import { cn } from '../utils';

export interface ResizablePanelsProps {
  /** One child per panel; drag handles are inserted between them. */
  children: ReactNode;
  orientation?: 'horizontal' | 'vertical';
  /** Initial sizes in percent. Defaults to equal sizes. */
  defaultSizes?: number[];
  /** Minimum size of each panel in percent. */
  minSizes?: number[];
  onResize?: (sizes: number[]) => void;
  className?: string;
}

/** Side-by-side (or stacked) panels with draggable, keyboard-accessible dividers. */
export function ResizablePanels({
  children,
  orientation = 'horizontal',
  defaultSizes,
  minSizes = [],
  onResize,
  className,
}: ResizablePanelsProps) {
  const panels = Children.toArray(children);
  const containerRef = useRef<HTMLDivElement>(null);
  const [sizes, setSizes] = useState(() => defaultSizes ?? panels.map(() => 100 / panels.length));
  const isHorizontal = orientation === 'horizontal';

  const resize = (index: number, delta: number) => {
    setSizes((current) => {
      const next = [...current];
      const a = current[index] ?? 0;
      const b = current[index + 1] ?? 0;
      const minA = minSizes[index] ?? 5;
      const minB = minSizes[index + 1] ?? 5;
      const clamped = Math.max(minA - a, Math.min(delta, b - minB));
      next[index] = a + clamped;
      next[index + 1] = b - clamped;
      onResize?.(next);
      return next;
    });
  };

  const startDrag = (index: number) => (event: PointerEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;
    event.preventDefault();
    const handle = event.currentTarget;
    handle.setPointerCapture(event.pointerId);
    const total = isHorizontal ? container.offsetWidth : container.offsetHeight;
    let last = isHorizontal ? event.clientX : event.clientY;

    const move = (e: globalThis.PointerEvent) => {
      const position = isHorizontal ? e.clientX : e.clientY;
      resize(index, ((position - last) / total) * 100);
      last = position;
    };
    const up = () => {
      handle.removeEventListener('pointermove', move);
      handle.removeEventListener('pointerup', up);
    };
    handle.addEventListener('pointermove', move);
    handle.addEventListener('pointerup', up);
  };

  const onKeyDown = (index: number) => (event: KeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? 10 : 2;
    const decrease = isHorizontal ? 'ArrowLeft' : 'ArrowUp';
    const increase = isHorizontal ? 'ArrowRight' : 'ArrowDown';
    if (event.key === decrease) resize(index, -step);
    else if (event.key === increase) resize(index, step);
    else if (event.key === 'Home') resize(index, -100);
    else if (event.key === 'End') resize(index, 100);
    else return;
    event.preventDefault();
  };

  return (
    <div ref={containerRef} className={cn('flex h-full w-full overflow-hidden', isHorizontal ? 'flex-row' : 'flex-col', className)}>
      {panels.map((panel, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: panels are positional
        <div key={index} className="contents">
          <div className="min-h-0 min-w-0 overflow-auto" style={{ flexBasis: `${sizes[index]}%`, flexGrow: 0, flexShrink: 0 }}>
            {panel}
          </div>
          {index < panels.length - 1 && (
            // biome-ignore lint/a11y/useSemanticElements: an interactive window splitter has no native element
            <div
              role="separator"
              tabIndex={0}
              aria-orientation={isHorizontal ? 'vertical' : 'horizontal'}
              aria-valuenow={Math.round(sizes[index] ?? 0)}
              aria-valuemin={minSizes[index] ?? 5}
              aria-valuemax={100}
              aria-label="Resize panels"
              onPointerDown={startDrag(index)}
              onKeyDown={onKeyDown(index)}
              className={cn(
                'group relative z-10 flex shrink-0 touch-none items-center justify-center bg-border outline-none focus-visible:bg-primary',
                isHorizontal ? 'w-px cursor-col-resize' : 'h-px cursor-row-resize',
              )}
            >
              <span
                className={cn(
                  'absolute rounded-full border border-border bg-background shadow-sm transition-colors group-hover:border-primary group-focus-visible:border-primary',
                  isHorizontal ? 'h-6 w-1.5' : 'h-1.5 w-6',
                )}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
