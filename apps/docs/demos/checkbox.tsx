'use client';

import { Checkbox } from '@trellis-ui-pack/react';

export default function CheckboxDemo() {
  return (
    <div className="flex flex-col gap-3">
      <Checkbox defaultSelected>Send me product updates</Checkbox>
      <Checkbox>Subscribe to the newsletter</Checkbox>
      <Checkbox isIndeterminate>Select all</Checkbox>
      <Checkbox isDisabled>Disabled</Checkbox>
    </div>
  );
}
