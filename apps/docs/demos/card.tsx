'use client';

import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Chip } from '@trellis-ui/react';

export default function CardDemo() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Pro plan</CardTitle>
          <Chip color="primary">Popular</Chip>
        </div>
        <CardDescription>Everything you need to ship forms fast.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-semibold">
          $12<span className="text-sm font-normal text-muted-foreground"> / month</span>
        </p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Upgrade</Button>
      </CardFooter>
    </Card>
  );
}
