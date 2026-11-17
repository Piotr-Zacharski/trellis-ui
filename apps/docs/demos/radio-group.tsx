'use client';

import { Radio, RadioGroup } from '@trellis-ui-pack/react';

export default function RadioGroupDemo() {
  return (
    <RadioGroup label="Plan" defaultValue="pro" description="You can change your plan at any time.">
      <Radio value="free">Free</Radio>
      <Radio value="pro">Pro</Radio>
      <Radio value="team">Team</Radio>
    </RadioGroup>
  );
}
