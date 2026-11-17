'use client';

import { Link } from '@trellis-ui/react';

export default function LinkDemo() {
  return (
    <div className="flex flex-col gap-3 text-sm">
      <Link href="#">Primary link</Link>
      <Link href="#" color="foreground">
        Foreground link
      </Link>
      <Link href="#" color="muted">
        Muted link
      </Link>
      <Link href="https://react-spectrum.adobe.com/react-aria/" target="_blank">
        External link ↗
      </Link>
      <Link isDisabled>Disabled link</Link>
    </div>
  );
}
