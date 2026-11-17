'use client';

import { Checkbox, CheckboxGroup } from '@trellis-ui-pack/react';

export default function CheckboxGroupDemo() {
  return (
    <CheckboxGroup label="Notifications" defaultValue={['email']} description="Choose how we contact you.">
      <Checkbox value="email">E-mail</Checkbox>
      <Checkbox value="sms">SMS</Checkbox>
      <Checkbox value="push">Push notifications</Checkbox>
    </CheckboxGroup>
  );
}
