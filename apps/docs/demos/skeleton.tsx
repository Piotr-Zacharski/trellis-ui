'use client';

import { Skeleton } from '@trellis-ui/react';

export default function SkeletonDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4 rounded-[calc(var(--tr-radius)*1.6)] border border-border p-5">
      <div className="flex items-center gap-3">
        <Skeleton className="size-10 rounded-full" />
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-3 w-1/3" />
        </div>
      </div>
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-4/5" />
    </div>
  );
}
