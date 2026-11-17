'use client';

import { Pagination } from '@trellis-ui-pack/react';
import { useState } from 'react';

export default function PaginationDemo() {
  const [page, setPage] = useState(6);
  return (
    <div className="flex flex-col items-center gap-3">
      <Pagination total={20} page={page} onChange={setPage} />
      <p className="text-sm text-muted-foreground">Page {page} of 20</p>
    </div>
  );
}
