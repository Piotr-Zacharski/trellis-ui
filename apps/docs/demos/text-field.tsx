'use client';

import { TextField } from '@trellis-ui/react';

export default function TextFieldDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <TextField label="Name" placeholder="Ada Lovelace" description="As it appears on your ID." />
      <TextField label="E-mail" type="email" placeholder="ada@example.com" isRequired />
      <TextField label="Username" defaultValue="taken" isInvalid errorMessage="This username is already taken." />
    </div>
  );
}
