'use client';

import { CodeBlock } from '@trellis-ui/markdown';

const code = `export function Greeting({ name }: { name: string }) {
  // Say hello
  return <p className="text-lg">Hello, {name}!</p>;
}`;

export default function CodeBlockDemo() {
  return (
    <div className="w-full max-w-xl">
      <CodeBlock code={code} language="tsx" filename="greeting.tsx" showLineNumbers />
    </div>
  );
}
