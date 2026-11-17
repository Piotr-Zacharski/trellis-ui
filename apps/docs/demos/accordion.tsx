'use client';

import { Accordion, AccordionItem } from '@trellis-ui/react';

export default function AccordionDemo() {
  return (
    <Accordion className="max-w-lg" defaultExpandedKeys={['forms']}>
      <AccordionItem id="forms" title="Does Trellis work with React Hook Form?">
        Yes – @trellis-ui/form wires every input to React Hook Form and Zod, with typed field names.
      </AccordionItem>
      <AccordionItem id="ssr" title="Can I use it with Next.js server components?">
        Components are marked with “use client”, so you can render them from server components directly.
      </AccordionItem>
      <AccordionItem id="theme" title="How do I change the colors?">
        Override the --tr-* CSS variables after importing the styles.
      </AccordionItem>
    </Accordion>
  );
}
