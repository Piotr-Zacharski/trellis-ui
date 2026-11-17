// Generates demos/index.ts, lib/components.ts, missing component MDX pages and the components sidebar (meta.json).
import { existsSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const docs = fileURLToPath(new URL('..', import.meta.url));
const p = (type, description, def) => ({ type, description, ...(def ? { default: def } : {}) });
const field = {
  label: p('ReactNode', 'Visible label.'),
  description: p('ReactNode', 'Help text.'),
  errorMessage: p('string', 'Error shown when invalid.'),
  isDisabled: p('boolean', 'Disables the field.'),
};

// [slug, name, description, category, demos[], package, import, props?, notes?, form?]
const C = (slug, name, description, category, demos, pkg, imp, props, notes, form) => ({ slug, name, description, category, demos, pkg, imp, props, notes, form });
const R = (names) => `import { ${names} } from '@trellis-ui/react';`;

const catalog = [
  // Forms
  C('form', 'Form', 'React Hook Form + Zod, fully typed.', 'Forms', ['form-signup'], 'form'),
  C('text-field', 'Text Field', 'Text input with label, errors and addons.', 'Forms', ['text-field'], 'react'),
  C('textarea-field', 'Text Area', 'Multi-line text input.', 'Forms', ['textarea-field'], 'react'),
  C('number-field', 'Number Field', 'Locale-aware numeric input.', 'Forms', ['number-field'], 'react'),
  C('input-otp', 'Input OTP', 'One-time code with separate slots.', 'Forms', ['input-otp'], 'react', R('InputOTP'),
    { length: p('number', 'Number of characters.', '6'), type: p("'numeric' | 'alphanumeric'", 'Allowed characters.', "'numeric'"), groupSize: p('number', 'Insert a separator every N slots.'), onComplete: p('(code: string) => void', 'Called when all slots are filled.'), value: p('string', 'Controlled value.'), onChange: p('(value: string) => void', 'Called on every change.'), ...field },
    'A single real `<input>` sits on top of the slots, so pasting, SMS autofill (`autocomplete="one-time-code"`) and screen readers work as with any text field.', 'FormInputOTP'),
  C('search-field', 'Search Field', 'Search input with clear button.', 'Forms', ['search-field'], 'react', R('SearchField'),
    { onSubmit: p('(value: string) => void', 'Called on Enter.'), onClear: p('() => void', 'Called when cleared.'), placeholder: p('string', 'Placeholder.'), ...field }),
  C('select', 'Select', 'Pick one option from a list.', 'Forms', ['select'], 'react'),
  C('combo-box', 'Combobox', 'Searchable select with autocomplete.', 'Forms', ['combo-box'], 'react'),
  C('checkbox', 'Checkbox', 'Toggle a single option.', 'Forms', ['checkbox'], 'react'),
  C('checkbox-group', 'Checkbox Group', 'Pick several options from a set.', 'Forms', ['checkbox-group'], 'react', R('Checkbox, CheckboxGroup'),
    { value: p('string[]', 'Controlled checked values.'), defaultValue: p('string[]', 'Initially checked values.'), onChange: p('(value: string[]) => void', 'Called on change.'), orientation: p("'vertical' | 'horizontal'", 'Layout.', "'vertical'"), ...field }, null, 'FormCheckboxGroup'),
  C('radio-group', 'Radio Group', 'Pick exactly one of a few options.', 'Forms', ['radio-group'], 'react'),
  C('switch', 'Switch', 'Instant on/off setting.', 'Forms', ['switch'], 'react'),
  C('slider', 'Slider', 'Pick a value or a range by dragging.', 'Forms', ['slider'], 'react', R('Slider'),
    { value: p('number | number[]', 'Controlled value – an array makes it a range slider.'), defaultValue: p('number | number[]', 'Initial value.'), minValue: p('number', 'Minimum.', '0'), maxValue: p('number', 'Maximum.', '100'), step: p('number', 'Step.', '1'), formatOptions: p('Intl.NumberFormatOptions', 'Formatting of the value label.'), thumbLabels: p('string[]', 'Accessible names of range thumbs.'), showValueLabel: p('boolean', 'Show the value next to the label.', 'true') }, null, 'FormSlider'),
  C('rating', 'Rating', 'Star rating input.', 'Forms', ['rating'], 'react', R('Rating'),
    { value: p('number', 'Controlled rating.'), defaultValue: p('number', 'Initial rating.'), max: p('number', 'Number of stars.', '5'), size: p("'sm' | 'md' | 'lg'", 'Star size.', "'md'"), isReadOnly: p('boolean', 'Display only.'), ...field },
    'Built on a radio group: arrow keys change the value and screen readers announce “3 of 5 stars”.', 'FormRating'),
  C('tag-field', 'Tag Field', 'Type to add tags; removable tag lists.', 'Forms', ['tag-field'], 'react', R('Tag, TagField, TagGroup'),
    { value: p('string[]', 'Controlled tags (TagField).'), onChange: p('(tags: string[]) => void', 'Called when tags change.'), maxTags: p('number', 'Maximum number of tags.'), allowDuplicates: p('boolean', 'Allow the same tag twice.', 'false'), delimiters: p('string[]', 'Keys that commit a tag besides Enter.', "[',']"), onRemove: p('(keys: Set<Key>) => void', 'Makes TagGroup tags removable.'), ...field }, null, 'FormTagField'),
  C('date-picker', 'Date Picker', 'Date input with a calendar.', 'Forms', ['date-picker'], 'react'),
  C('date-range-picker', 'Date Range Picker', 'Pick a start and end date.', 'Forms', ['date-range-picker'], 'react', R('DateRangePicker, RangeCalendar'),
    { value: p('{ start: DateValue; end: DateValue } | null', 'Controlled range.'), onChange: p('(range) => void', 'Called when the range changes.'), minValue: p('DateValue', 'Earliest date.'), maxValue: p('DateValue', 'Latest date.'), ...field },
    'With `FormDateRangePicker` the form value is `{ start: Date, end: Date }` – validate it with `z.object({ start: z.date(), end: z.date() })`.', 'FormDateRangePicker'),
  C('date-field', 'Date & Time Field', 'Keyboard entry for dates and times.', 'Forms', ['date-field'], 'react', R('DateField, TimeField'),
    { granularity: p("'day' | 'hour' | 'minute' | 'second'", 'Smallest editable unit.'), hourCycle: p('12 | 24', 'Force a 12 or 24 hour clock.'), ...field },
    '`FormDateField` stores a `Date`; `FormTimeField` stores an `HH:mm` string, which pairs with `z.iso.time()`.', 'FormTimeField'),
  C('color-picker', 'Color Picker', 'Pick a color with area, hue and hex.', 'Forms', ['color-picker'], 'react', R('ColorPicker'),
    { value: p('string | Color', 'Controlled color.'), onChange: p('(color: Color) => void', 'Use `color.toString("hex")` for a string.'), swatches: p('string[]', 'Preset colors.'), label: p('ReactNode', 'Label.') }, null, 'FormColorPicker'),
  C('file-upload', 'File Upload', 'Drag & drop area with file list.', 'Forms', ['file-upload'], 'react', R('FileUpload'),
    { value: p('File[]', 'Controlled files.'), onChange: p('(files: File[]) => void', 'Called when files change.'), acceptedFileTypes: p('string[]', "MIME types or extensions, e.g. ['image/*', '.pdf']."), allowsMultiple: p('boolean', 'Allow several files.', 'true'), maxFiles: p('number', 'Maximum number of files.'), maxFileSize: p('number', 'Max size per file in bytes.'), ...field }, null, 'FormFileUpload'),
  C('fieldset', 'Fieldset', 'Group related fields under a legend.', 'Forms', ['fieldset'], 'react', R('Fieldset'),
    { legend: p('ReactNode', 'Group title.'), description: p('ReactNode', 'Text under the legend.'), disabled: p('boolean', 'Disables native controls inside.') }),
  // Actions
  C('button', 'Button', 'Triggers an action, with a pending state.', 'Actions', ['button-variants'], 'react'),
  C('toggle-button', 'Toggle Button', 'On/off buttons and segmented controls.', 'Actions', ['toggle-button'], 'react', R('ToggleButton, ToggleButtonGroup'),
    { selectionMode: p("'single' | 'multiple'", 'Group selection mode.', "'single'"), selectedKeys: p('Iterable<Key>', 'Controlled selection (group).'), onSelectionChange: p('(keys: Set<Key>) => void', 'Called when selection changes.'), isSelected: p('boolean', 'Controlled state (standalone button).') }, null, 'FormToggleButtonGroup'),
  C('link', 'Link', 'Accessible, router-aware link.', 'Actions', ['link'], 'react', R('Link'),
    { href: p('string', 'Destination.'), color: p("'primary' | 'foreground' | 'muted'", 'Color.', "'primary'"), target: p('string', 'Link target.'), isDisabled: p('boolean', 'Disables the link.') },
    'Wrap your app in React Aria\'s `RouterProvider` to make links use your client-side router.'),
  // Overlays
  C('dialog', 'Dialog', 'Modal window for focused tasks.', 'Overlays', ['dialog'], 'react'),
  C('alert-dialog', 'Alert Dialog', 'Confirmation that needs a decision.', 'Overlays', ['alert-dialog'], 'react', R('AlertDialog, DialogTrigger'),
    { title: p('ReactNode', 'Heading.'), variant: p("'primary' | 'danger'", 'Use danger for destructive actions.', "'primary'"), confirmLabel: p('ReactNode', 'Confirm button text.', "'Confirm'"), cancelLabel: p('ReactNode', 'Cancel button text.', "'Cancel'"), onConfirm: p('() => void | Promise<void>', 'May be async – shows a spinner until done.'), onCancel: p('() => void', 'Called on cancel.') },
    'Unlike `Dialog` it uses `role="alertdialog"`, focuses the confirm button and cannot be dismissed by clicking outside.'),
  C('drawer', 'Drawer', 'Panel sliding in from a screen edge.', 'Overlays', ['drawer'], 'react', R('Dialog, DialogTrigger, Drawer'),
    { placement: p("'left' | 'right' | 'top' | 'bottom'", 'Edge it slides from.', "'right'"), size: p("'sm' | 'md' | 'lg'", 'Width of side drawers.', "'md'"), isDismissable: p('boolean', 'Close on outside click.', 'true') }),
  C('popover', 'Popover', 'Popup anchored to a trigger.', 'Overlays', ['popover'], 'react'),
  C('tooltip', 'Tooltip', 'Short hint on hover or focus.', 'Overlays', ['tooltip'], 'react', R('Tooltip, TooltipTrigger'),
    { placement: p("'top' | 'bottom' | 'left' | 'right'", 'Position.', "'top'"), delay: p('number', 'Open delay in ms (TooltipTrigger).', '1500'), showArrow: p('boolean', 'Arrow.', 'true') },
    'Tooltips appear on hover and on keyboard focus. Keep them short and never put essential information only in a tooltip.'),
  C('hover-card', 'Hover Card', 'Rich preview on hover, e.g. profiles.', 'Overlays', ['hover-card'], 'react', R('HoverCard'),
    { content: p('ReactNode', 'Card content.'), placement: p('Placement', 'Position.', "'bottom'"), openDelay: p('number', 'ms before opening.', '300'), closeDelay: p('number', 'ms before closing.', '200') }),
  C('menu', 'Menu', 'Dropdown menu with sections and submenus.', 'Overlays', ['menu'], 'react', R('Menu, MenuItem, MenuSection, MenuSeparator, MenuTrigger, SubmenuTrigger'),
    { onAction: p('(key: Key) => void', 'Called when an item is chosen (Menu).'), selectionMode: p("'none' | 'single' | 'multiple'", 'Checkable items.'), shortcut: p('string', 'Shortcut hint (MenuItem).'), description: p('ReactNode', 'Second line (MenuItem).'), variant: p("'default' | 'danger'", 'Item color (MenuItem).') }),
  C('context-menu', 'Context Menu', 'Menu on right click.', 'Overlays', ['context-menu'], 'react', R('ContextMenu, MenuItem'),
    { trigger: p('ReactNode', 'Area that opens the menu.'), onAction: p('(key: Key) => void', 'Called when an item is chosen.') },
    'Keyboard users open it with <kbd>Shift</kbd>+<kbd>F10</kbd> or the context-menu key while the area is focused.'),
  C('command-palette', 'Command Palette', 'Search for actions with Cmd+K.', 'Overlays', ['command-palette'], 'react', R('CommandItem, CommandPalette, CommandSection'),
    { isOpen: p('boolean', 'Controlled open state.'), onOpenChange: p('(open: boolean) => void', 'Called to open/close.'), shortcut: p('string | null', 'Key used with ⌘/Ctrl to toggle.', "'k'"), onAction: p('(key: Key) => void', 'Called when a command runs.'), placeholder: p('string', 'Search placeholder.') }),
  // Navigation
  C('tabs', 'Tabs', 'Switch between related views.', 'Navigation', ['tabs'], 'react'),
  C('accordion', 'Accordion', 'Collapsible sections.', 'Navigation', ['accordion'], 'react', R('Accordion, AccordionItem, Disclosure'),
    { allowsMultipleExpanded: p('boolean', 'Open several at once (Accordion).'), defaultExpandedKeys: p('Iterable<Key>', 'Initially open items.'), variant: p("'bordered' | 'plain'", 'Style.', "'bordered'"), title: p('ReactNode', 'Header (AccordionItem).') }),
  C('breadcrumbs', 'Breadcrumbs', 'Trail of links to the current page.', 'Navigation', ['breadcrumbs'], 'react', R('Breadcrumb, Breadcrumbs'), { href: p('string', 'Link (Breadcrumb). Omit on the current page.') }),
  C('pagination', 'Pagination', 'Navigate pages of results.', 'Navigation', ['pagination'], 'react', R('Pagination'),
    { total: p('number', 'Number of pages.'), page: p('number', 'Controlled page (1-based).'), onChange: p('(page: number) => void', 'Called on page change.'), siblings: p('number', 'Pages around the current one.', '1'), boundaries: p('number', 'Pages at both ends.', '1') }),
  C('stepper', 'Stepper', 'Progress through a multi-step flow.', 'Navigation', ['stepper'], 'react', R('Stepper'),
    { steps: p('{ title; description? }[]', 'Steps.'), currentStep: p('number', 'Active step (0-based).'), orientation: p("'horizontal' | 'vertical'", 'Layout.', "'horizontal'") }),
  // Feedback
  C('toast', 'Toast', 'Brief, non-blocking notifications.', 'Feedback', ['toast'], 'react'),
  C('alert', 'Alert', 'Inline status message.', 'Feedback', ['alert'], 'react', R('Alert'),
    { title: p('ReactNode', 'Heading.'), color: p("'neutral' | 'primary' | 'success' | 'warning' | 'danger'", 'Color.', "'neutral'"), icon: p('ReactNode | null', 'Custom icon or null to hide.'), actions: p('ReactNode', 'Buttons under the text.'), onClose: p('() => void', 'Shows a dismiss button.') }),
  C('spinner', 'Spinner', 'Loading indicator – ring or dots.', 'Feedback', ['spinner'], 'react'),
  C('progress-bar', 'Progress Bar', 'Linear progress.', 'Feedback', ['progress-bar'], 'react'),
  C('progress-circle', 'Progress Circle', 'Circular progress.', 'Feedback', ['progress-circle'], 'react'),
  C('skeleton', 'Skeleton', 'Placeholder while content loads.', 'Feedback', ['skeleton'], 'react', R('Skeleton'), { className: p('string', 'Size and shape, e.g. `h-4 w-40` or `size-10 rounded-full`.') }),
  C('empty-state', 'Empty State', 'When there is nothing to show.', 'Feedback', ['empty-state'], 'react', R('EmptyState'),
    { icon: p('ReactNode', 'Illustration or icon.'), title: p('ReactNode', 'Heading.'), description: p('ReactNode', 'Explanation.'), actions: p('ReactNode', 'Call to action.') }),
  // Data display
  C('card', 'Card', 'Container for grouped content.', 'Data display', ['card'], 'react'),
  C('chip', 'Chip', 'Compact status or label.', 'Data display', ['chip'], 'react'),
  C('avatar', 'Avatar', 'User image with initials fallback.', 'Data display', ['avatar'], 'react', R('Avatar, AvatarGroup'),
    { src: p('string', 'Image URL.'), name: p('string', 'Alt text and initials source.'), size: p("'xs' | 'sm' | 'md' | 'lg'", 'Size.', "'md'"), status: p("'online' | 'away' | 'busy' | 'offline'", 'Status dot.'), max: p('number', 'Visible avatars (AvatarGroup).') }),
  C('badge', 'Badge', 'Count or dot on another element.', 'Data display', ['badge'], 'react', R('Badge'),
    { content: p('ReactNode', 'Count or text; omit for a dot.'), max: p('number', 'Show "99+" above this.', '99'), color: p("'primary' | 'danger' | 'warning' | 'neutral'", 'Color.', "'danger'"), placement: p("'top-right' | 'bottom-right' | 'top-left' | 'bottom-left'", 'Corner.', "'top-right'"), isInvisible: p('boolean', 'Hide the badge.') }),
  C('table', 'Table', 'Sortable, selectable data table.', 'Data display', ['table'], 'react', R('Cell, Column, Row, Table, TableBody, TableHeader'),
    { selectionMode: p("'none' | 'single' | 'multiple'", 'Row selection (Table).'), sortDescriptor: p('SortDescriptor', 'Current sort (Table).'), onSortChange: p('(d: SortDescriptor) => void', 'Called when a sortable column is pressed.'), allowsSorting: p('boolean', 'Makes a Column sortable.'), isRowHeader: p('boolean', 'Marks the column that labels each row.') }),
  C('timeline', 'Timeline', 'Events in chronological order.', 'Data display', ['timeline'], 'react', R('Timeline, TimelineItem'),
    { title: p('ReactNode', 'Event title.'), time: p('ReactNode', 'Date or time.'), icon: p('ReactNode', 'Replaces the dot.'), color: p("'primary' | 'neutral' | 'danger' | 'warning'", 'Dot color.', "'neutral'") }),
  C('kbd', 'Kbd', 'Keyboard key.', 'Data display', ['kbd'], 'react', R('Kbd')),
  C('separator', 'Separator', 'Visual divider.', 'Data display', ['separator'], 'react', R('Separator'), { orientation: p("'horizontal' | 'vertical'", 'Direction.', "'horizontal'") }),
  // AI
  C('chat', 'Chat', 'AI prompt box: files, images, voice.', 'AI', ['chat'], 'react'),
  C('chat-message-actions', 'Message Actions', 'Copy, regenerate and feedback.', 'AI', ['chat-actions'], 'react', R('ChatMessageActions'),
    { copyText: p('string', 'Text for the copy button.'), onRegenerate: p('() => void', 'Shows a regenerate button.'), feedback: p("'up' | 'down' | null", 'Controlled feedback.'), onFeedback: p('(value) => void', 'Shows thumbs up/down.') }),
  C('prompt-suggestions', 'Prompt Suggestions', 'Starter prompts for an empty chat.', 'AI', ['prompt-suggestions'], 'react', R('PromptSuggestions'),
    { suggestions: p('(string | { label; prompt; icon? })[]', 'Suggestions.'), onSelect: p('(prompt: string) => void', 'Called with the prompt text.') }),
  C('chain-of-thought', 'Chain of Thought', 'Collapsible reasoning and shimmer text.', 'AI', ['chain-of-thought'], 'react', R('ChainOfThought, TextShimmer'),
    { isStreaming: p('boolean', 'Shimmering title while thinking.'), title: p('ReactNode', 'e.g. "Thought for 8 seconds".'), defaultExpanded: p('boolean', 'Start open.') }),
  C('chat-tool', 'Tool Call', 'Status of a function / tool call.', 'AI', ['chat-tool'], 'react', R('ChatTool'),
    { name: p('string', 'Tool name.'), status: p("'running' | 'success' | 'error'", 'State.'), input: p('unknown', 'Arguments (shown as JSON).'), output: p('unknown', 'Result (shown as JSON).') }),
  C('chat-sources', 'Sources', 'Citations used by an answer.', 'AI', ['chat-sources'], 'react', R('ChatSources'), { sources: p('{ title; url }[]', 'Sources in citation order.') }),
  C('markdown', 'Markdown', 'Streaming-friendly Markdown for AI answers.', 'AI', ['markdown'], 'markdown', "import { Markdown } from '@trellis-ui/markdown';",
    { children: p('string', 'Markdown source – partial streamed text is fine.'), className: p('string', 'Extra classes.') },
    'Lives in its own package so the core stays dependency-free:\n\n```npm\nnpm i @trellis-ui/markdown\n```\n\nAdd `@import "@trellis-ui/markdown/styles.css";` to your CSS. GitHub-flavoured Markdown (tables, task lists) is supported; raw HTML is ignored for safety.'),
  C('code-block', 'Code Block', 'Code with copy button and highlighting.', 'AI', ['code-block'], 'markdown', "import { CodeBlock } from '@trellis-ui/markdown';",
    { code: p('string', 'Source code.'), language: p('string', 'Language label; JS/TS-like languages are highlighted.'), filename: p('string', 'Shown instead of the language.'), showLineNumbers: p('boolean', 'Line numbers.') },
    'Highlighting uses [sugar-high](https://sugar-high.vercel.app) (~1 kB). Fenced code inside `<Markdown>` renders as a CodeBlock automatically.'),
  // Layout
  C('app-layout', 'App Layout', 'Sidebar, navbar and content shell.', 'Layout', ['app-layout'], 'react',
    R('AppLayout, Navbar, Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarItem, SidebarSection'),
    { sidebar: p('ReactNode', 'Fixed column on desktop, drawer on mobile (AppLayout).'), navbar: p('ReactNode', 'Top bar (AppLayout).'), isActive: p('boolean', 'Current page (SidebarItem).'), icon: p('ReactNode', 'Icon (SidebarItem).'), badge: p('ReactNode', 'Count (SidebarItem).') },
    'Below the `md` breakpoint the sidebar moves into a drawer opened by the hamburger button that `Navbar` renders automatically.'),
  C('resizable', 'Resizable Panels', 'Draggable split panes.', 'Layout', ['resizable'], 'react', R('ResizablePanels'),
    { orientation: p("'horizontal' | 'vertical'", 'Direction.', "'horizontal'"), defaultSizes: p('number[]', 'Sizes in percent.'), minSizes: p('number[]', 'Minimum sizes in percent.'), onResize: p('(sizes: number[]) => void', 'Called while resizing.') },
    'Dividers are keyboard accessible: focus one and use the arrow keys (<kbd>Shift</kbd> for bigger steps), <kbd>Home</kbd> and <kbd>End</kbd>.'),
  // Charts
  C('line-chart', 'Line Chart', 'Trends over time.', 'Charts', ['line-chart'], 'charts', "import { LineChart } from '@trellis-ui/charts';", null, 'charts'),
  C('area-chart', 'Area Chart', 'Volume over time.', 'Charts', ['area-chart'], 'charts', "import { AreaChart } from '@trellis-ui/charts';", null, 'charts'),
  C('bar-chart', 'Bar Chart', 'Compare categories.', 'Charts', ['bar-chart'], 'charts', "import { BarChart } from '@trellis-ui/charts';", null, 'charts'),
  C('donut-chart', 'Donut Chart', 'Parts of a whole.', 'Charts', ['donut-chart'], 'charts', "import { DonutChart } from '@trellis-ui/charts';",
    { data: p('object[]', 'Rows.'), nameKey: p('string', 'Slice label key.'), valueKey: p('string', 'Slice value key.'), centerLabel: p('ReactNode', 'Text in the middle.'), centerDescription: p('ReactNode', 'Small text under it.'), colors: p('string[]', 'Slice colors.') }, 'chartsBase'),
  C('kpi', 'KPI & Sparkline', 'Metric cards with trend.', 'Charts', ['kpi'], 'react', "import { Kpi, TrendChip } from '@trellis-ui/react';\nimport { Sparkline } from '@trellis-ui/charts';",
    { title: p('ReactNode', 'Metric name.'), value: p('ReactNode', 'Formatted value.'), change: p('number', 'Percent change → TrendChip.'), invertTrend: p('boolean', 'Down is good (churn, latency).'), chart: p('ReactNode', 'e.g. a Sparkline.') }),
];

const chartProps = {
  data: p('object[]', 'Rows.'),
  index: p('string', 'Key of the x-axis value, e.g. `month`.'),
  series: p('{ key; label?; color? }[]', 'One entry per line / area / bar.'),
  height: p('number', 'Height in px.', '280'),
  valueFormatter: p('(value: number) => string', 'Formats axis ticks and tooltip values.'),
  showGrid: p('boolean', 'Grid lines.', 'true'),
  showLegend: p('boolean', 'Legend (default when more than one series).'),
  stacked: p('boolean', 'Stack series (Area/Bar).'),
  horizontal: p('boolean', 'Horizontal bars (Bar).'),
  'aria-label': p('string', 'Describe what the chart shows.'),
};
const chartsNote =
  'Charts live in their own package, built on [Recharts](https://recharts.org) and themed with the `--tr-chart-1…5` tokens:\n\n```npm\nnpm i @trellis-ui/charts\n```\n\nAdd `@import "@trellis-ui/charts/styles.css";` to your CSS.';

// 1. demos/index.ts
const demoFiles = readdirSync(join(docs, 'demos')).filter((f) => f.endsWith('.tsx')).map((f) => f.replace(/\.tsx$/, '')).sort();
const ident = (n) => `${n.replace(/(^|-)(\w)/g, (_, __, c) => c.toUpperCase())}Demo`;
writeFileSync(
  join(docs, 'demos/index.ts'),
  `// Generated – every file in /demos is registered here. The key is the file name.\nimport type { ComponentType } from 'react';\n${demoFiles
    .map((f) => `import ${ident(f)} from './${f}';`)
    .join('\n')}\n\nexport const demos = {\n${demoFiles.map((f) => `  '${f}': ${ident(f)},`).join('\n')}\n} satisfies Record<string, ComponentType>;\n\nexport type DemoName = keyof typeof demos;\n`,
);

// 2. lib/components.ts
const categories = [...new Set(catalog.map((c) => c.category))];
writeFileSync(
  join(docs, 'lib/components.ts'),
  `// Generated from the component catalog. Drives the /docs/components grid, the home page and the sidebar order.
import type { DemoName } from '@/demos';

export const categories = ${JSON.stringify(categories)} as const;
export type Category = (typeof categories)[number];

export interface ComponentEntry {
  slug: string;
  name: string;
  description: string;
  category: Category;
  demo: DemoName;
  package: 'react' | 'form' | 'markdown' | 'charts';
}

export const componentList: ComponentEntry[] = ${JSON.stringify(
    catalog.map((c) => ({ slug: c.slug, name: c.name, description: c.description, category: c.category, demo: c.demos[0], package: c.pkg })),
    null,
    2,
  )};
`,
);

// 3. Missing MDX pages
let created = 0;
for (const c of catalog) {
  const file = join(docs, 'content/docs/components', `${c.slug}.mdx`);
  if (existsSync(file)) continue;
  const props = c.notes === 'charts' || c.notes === 'chartsBase' ? (c.props ?? chartProps) : c.props;
  const notes = c.notes === 'charts' || c.notes === 'chartsBase' ? chartsNote : c.notes;
  const form = c.form
    ? `\n## With React Hook Form\n\nUse \`${c.form}\` from \`@trellis-ui/form\` – same props plus \`name\` and \`control\`:\n\n\`\`\`tsx\n<${c.form} control={form.control} name="fieldName" label="Label" />\n\`\`\`\n\nThe [Form](/docs/components/form) page has an example with every field.\n`
    : '';
  writeFileSync(
    file,
    `---\ntitle: ${c.name}\ndescription: ${c.description}\n---\n\n${c.demos.map((d) => `<ComponentPreview name="${d}" />`).join('\n\n')}\n\n## Import\n\n\`\`\`tsx\n${c.imp}\n\`\`\`\n${notes ? `\n${notes}\n` : ''}${form}${props ? `\n## Props\n\n<TypeTable type={${JSON.stringify(props, null, 2)}} />\n` : ''}`,
  );
  created++;
}

// 4. Sidebar
const pages = ['index'];
for (const category of categories) {
  pages.push(`---${category}---`, ...catalog.filter((c) => c.category === category).map((c) => c.slug));
}
writeFileSync(join(docs, 'content/docs/components/meta.json'), `${JSON.stringify({ title: 'Components', pages }, null, 2)}\n`);

console.log(`demos: ${demoFiles.length}, components: ${catalog.length}, new pages: ${created}, categories: ${categories.join(', ')}`);
