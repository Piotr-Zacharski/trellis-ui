'use client';

import { TextAreaField } from '@trellis-ui-pack/react';

export default function TextAreaFieldDemo() {
  return (
    <div className="w-full max-w-sm">
      <TextAreaField label="Bio" placeholder="Tell us a little about yourself" description="Max. 280 characters." />
    </div>
  );
}
