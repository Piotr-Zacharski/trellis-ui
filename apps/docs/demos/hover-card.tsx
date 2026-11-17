'use client';

import { Avatar, Button, HoverCard, Link } from '@trellis-ui-pack/react';

export default function HoverCardDemo() {
  return (
    <p className="text-sm text-foreground">
      Built with love by{' '}
      <HoverCard
        content={
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Avatar name="Ada Lovelace" size="lg" />
              <div>
                <p className="font-semibold">Ada Lovelace</p>
                <p className="text-sm text-muted-foreground">@ada · Maintainer</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Writes components and the occasional analytical engine.</p>
            <Button size="sm" variant="soft">
              Follow
            </Button>
          </div>
        }
      >
        <Link href="#ada">@ada</Link>
      </HoverCard>{' '}
      and contributors.
    </p>
  );
}
