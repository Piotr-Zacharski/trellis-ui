import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/index.ts'],
  format: 'esm',
  dts: true,
  sourcemap: true,
  clean: true,
  // One output file per module keeps the "use client" directives intact for React Server Components.
  unbundle: true,
});
