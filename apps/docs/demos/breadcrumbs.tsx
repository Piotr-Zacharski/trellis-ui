'use client';

import { Breadcrumb, Breadcrumbs } from '@trellis-ui/react';

export default function BreadcrumbsDemo() {
  return (
    <Breadcrumbs>
      <Breadcrumb href="#home">Home</Breadcrumb>
      <Breadcrumb href="#projects">Projects</Breadcrumb>
      <Breadcrumb href="#trellis">Trellis</Breadcrumb>
      <Breadcrumb>Settings</Breadcrumb>
    </Breadcrumbs>
  );
}
