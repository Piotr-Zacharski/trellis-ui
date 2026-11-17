import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import type { DemoName } from '@/demos';
import { Demo } from './demo';

/** Live preview + source code of a file from /demos, used in MDX as <ComponentPreview name="button-variants" />. */
export async function ComponentPreview({ name }: { name: DemoName }) {
  const code = await readFile(path.join(process.cwd(), 'demos', `${name}.tsx`), 'utf8');

  return (
    <Tabs items={['Preview', 'Code']} className="not-prose">
      <Tab value="Preview" className="p-0">
        <div className="flex min-h-48 items-center justify-center bg-background p-8 text-foreground">
          <Demo name={name} />
        </div>
      </Tab>
      <Tab value="Code">
        <DynamicCodeBlock lang="tsx" code={code.replace("'use client';\n\n", '')} />
      </Tab>
    </Tabs>
  );
}
