'use client';

import type { ReactNode } from 'react';
import {
  Slider as RACSlider,
  type SliderProps as RACSliderProps,
  SliderOutput,
  SliderThumb,
  SliderTrack,
} from 'react-aria-components';
import { cn, composeTailwindRenderProps } from '../utils';
import { Label } from './field';

export interface SliderProps<T extends number | number[]> extends RACSliderProps<T> {
  label?: ReactNode;
  /** Show the formatted value next to the label. Defaults to `true`. */
  showValueLabel?: boolean;
  /** Accessible names for the thumbs of a range slider, e.g. `['Minimum', 'Maximum']`. */
  thumbLabels?: string[];
}

/** Pass a number for a single value, or an array of two numbers for a range. */
export function Slider<T extends number | number[]>({
  label,
  showValueLabel = true,
  thumbLabels,
  className,
  ...props
}: SliderProps<T>) {
  return (
    <RACSlider {...props} className={composeTailwindRenderProps(className, 'flex w-full flex-col gap-2')}>
      {(label || showValueLabel) && (
        <div className="flex items-center justify-between gap-2">
          {label ? <Label>{label}</Label> : <span />}
          {showValueLabel && <SliderOutput className="text-sm tabular-nums text-muted-foreground" />}
        </div>
      )}
      <SliderTrack className="relative h-5 w-full data-disabled:opacity-50">
        {({ state }) => {
          const isRange = state.values.length > 1;
          const start = isRange ? state.getThumbPercent(0) : 0;
          const end = state.getThumbPercent(isRange ? 1 : 0);
          return (
            <>
              <div className="absolute top-1/2 h-1.5 w-full -translate-y-1/2 rounded-full bg-muted" />
              <div
                className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-primary"
                style={{ left: `${start * 100}%`, width: `${(end - start) * 100}%` }}
              />
              {state.values.map((_, index) => (
                <SliderThumb
                  // biome-ignore lint/suspicious/noArrayIndexKey: thumbs are identified by index
                  key={index}
                  index={index}
                  aria-label={thumbLabels?.[index]}
                  className={({ isDragging, isFocusVisible }) =>
                    cn(
                      'top-0 size-5 cursor-grab rounded-full border-2 border-primary bg-background shadow-sm transition-[scale,box-shadow]',
                      isDragging && 'scale-110 cursor-grabbing',
                      isFocusVisible && 'ring-3 ring-ring',
                    )
                  }
                />
              ))}
            </>
          );
        }}
      </SliderTrack>
    </RACSlider>
  );
}
