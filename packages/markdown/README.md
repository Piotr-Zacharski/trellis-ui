# @trellis-ui-pack/markdown

Streaming-friendly Markdown and highlighted code blocks for React applications.

```bash
npm install @trellis-ui-pack/markdown @trellis-ui-pack/react react react-dom tailwindcss
```

```css
@import "tailwindcss";
@import "@trellis-ui-pack/react/styles.css";
@import "@trellis-ui-pack/markdown/styles.css";
```

```tsx
import { Markdown } from '@trellis-ui-pack/markdown';

export function Answer({ content }: { content: string }) {
  return <Markdown>{content}</Markdown>;
}
```

[Documentation and source](https://github.com/Piotr-Zacharski/trellis-ui)

## License

MIT
