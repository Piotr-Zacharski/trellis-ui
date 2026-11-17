'use client';

import { ToggleButton, ToggleButtonGroup } from '@trellis-ui-pack/react';

export default function ToggleButtonDemo() {
  return (
    <div className="flex flex-col items-center gap-6">
      <ToggleButtonGroup aria-label="View" defaultSelectedKeys={['list']}>
        <ToggleButton id="list">List</ToggleButton>
        <ToggleButton id="board">Board</ToggleButton>
        <ToggleButton id="calendar">Calendar</ToggleButton>
      </ToggleButtonGroup>
      <ToggleButtonGroup aria-label="Text style" selectionMode="multiple" defaultSelectedKeys={['bold']}>
        <ToggleButton id="bold" aria-label="Bold">
          <b>B</b>
        </ToggleButton>
        <ToggleButton id="italic" aria-label="Italic">
          <i>I</i>
        </ToggleButton>
        <ToggleButton id="underline" aria-label="Underline">
          <u>U</u>
        </ToggleButton>
      </ToggleButtonGroup>
      <ToggleButton defaultSelected>Pin to top</ToggleButton>
    </div>
  );
}
