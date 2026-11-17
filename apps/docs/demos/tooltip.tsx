'use client';

import { Button, Tooltip, TooltipTrigger } from '@trellis-ui-pack/react';

export default function TooltipDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <TooltipTrigger>
        <Button variant="outline" color="neutral">
          Hover me
        </Button>
        <Tooltip>Saves your changes</Tooltip>
      </TooltipTrigger>
      <TooltipTrigger delay={0}>
        <Button variant="outline" color="neutral">
          Right
        </Button>
        <Tooltip placement="right">No delay, placed on the right</Tooltip>
      </TooltipTrigger>
    </div>
  );
}
