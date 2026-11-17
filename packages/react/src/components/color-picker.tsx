'use client';

import { type ReactNode, useContext } from 'react';
import {
  Button as RACButton,
  type Color,
  ColorArea,
  ColorField,
  ColorPicker as RACColorPicker,
  ColorPickerStateContext,
  ColorSlider,
  ColorSwatch,
  ColorSwatchPicker,
  ColorSwatchPickerItem,
  ColorThumb,
  Dialog,
  DialogTrigger,
  Input,
  SliderTrack,
} from 'react-aria-components';
import { cn } from '../utils';
import { Label } from './field';
import { Popover } from './popover';

export interface ColorPickerProps {
  value?: string | Color;
  defaultValue?: string | Color;
  onChange?: (color: Color) => void;
  label?: ReactNode;
  /** Preset colors shown under the editor. */
  swatches?: string[];
  errorMessage?: string;
  isDisabled?: boolean;
  className?: string;
}

const thumbClass =
  'size-6 rounded-full border-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,0.2),inset_0_0_0_1px_rgba(0,0,0,0.2)] data-focus-visible:size-7';

function ColorValue() {
  const state = useContext(ColorPickerStateContext);
  return <span className="font-mono uppercase">{state?.color.toString('hex')}</span>;
}

const DEFAULT_SWATCHES = ['#16a34a', '#0ea5e9', '#6366f1', '#d946ef', '#ef4444', '#f97316', '#eab308', '#171717'];

/** Swatch button that opens a saturation/brightness area, hue slider, hex input and presets. */
export function ColorPicker({
  value,
  defaultValue = '#16a34a',
  onChange,
  label,
  swatches = DEFAULT_SWATCHES,
  errorMessage,
  isDisabled,
  className,
}: ColorPickerProps) {
  return (
    <RACColorPicker value={value} defaultValue={value === undefined ? defaultValue : undefined} onChange={onChange}>
      <DialogTrigger>
        <div className={cn('flex flex-col gap-1.5', className)}>
          {label && <Label elementType="span">{label}</Label>}
          <RACButton
            isDisabled={isDisabled}
            className={({ isFocusVisible }) =>
              cn(
                'flex h-10 w-fit cursor-default items-center gap-2 rounded-tr border border-input bg-background pr-3 pl-1.5 text-sm text-foreground outline-none hover:bg-muted',
                isFocusVisible && 'border-primary ring-3 ring-ring',
                errorMessage && 'border-danger',
                isDisabled && 'opacity-50',
              )
            }
          >
            <ColorSwatch className="size-7 rounded-[calc(var(--tr-radius)*0.7)] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)]" />
            <ColorValue />
          </RACButton>
          {errorMessage && <p className="text-sm text-danger">{errorMessage}</p>}
        </div>
        <Popover placement="bottom start">
          <Dialog aria-label="Color editor" className="flex w-60 flex-col gap-3 p-3 outline-none">
            <ColorArea
              colorSpace="hsb"
              xChannel="saturation"
              yChannel="brightness"
              className="h-40 w-full rounded-[calc(var(--tr-radius)*0.8)]"
            >
              <ColorThumb className={thumbClass} />
            </ColorArea>
            <ColorSlider colorSpace="hsb" channel="hue">
              <SliderTrack className="h-6 w-full rounded-full">
                <ColorThumb className={cn(thumbClass, 'top-1/2')} />
              </SliderTrack>
            </ColorSlider>
            <ColorField aria-label="Hex color" className="flex flex-col">
              <Input className="h-9 rounded-tr border border-input bg-background px-3 font-mono text-sm uppercase text-foreground outline-none data-focused:border-primary data-focused:ring-3 data-focused:ring-ring" />
            </ColorField>
            {swatches.length > 0 && (
              <ColorSwatchPicker className="flex flex-wrap gap-1.5">
                {swatches.map((color) => (
                  <ColorSwatchPickerItem
                    key={color}
                    color={color}
                    className="rounded-[calc(var(--tr-radius)*0.6)] outline-none data-focus-visible:ring-3 data-focus-visible:ring-ring data-selected:ring-2 data-selected:ring-foreground"
                  >
                    <ColorSwatch className="size-6 rounded-[calc(var(--tr-radius)*0.6)]" />
                  </ColorSwatchPickerItem>
                ))}
              </ColorSwatchPicker>
            )}
          </Dialog>
        </Popover>
      </DialogTrigger>
    </RACColorPicker>
  );
}
