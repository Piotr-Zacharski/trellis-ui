'use client';

import { Spinner } from '@trellis-ui/react';

export default function SpinnerDemo() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-6">
        <Spinner size="sm" color="primary" />
        <Spinner size="md" color="primary" />
        <Spinner size="lg" color="primary" />
        <Spinner size="lg" color="neutral" />
        <Spinner size="lg" color="danger" />
      </div>
      <div className="flex items-center gap-6">
        <Spinner variant="dots" size="sm" color="primary" />
        <Spinner variant="dots" size="md" color="primary" />
        <Spinner variant="dots" size="lg" color="primary" />
        <Spinner variant="dots" size="lg" color="neutral" />
      </div>
    </div>
  );
}
