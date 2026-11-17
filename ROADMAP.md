# Trellis roadmap

Gap analysis against HeroUI (free) and HeroUI Pro, November 2026. Our focus is forms, so form fields come first.

## Status

All five milestones below are implemented (November 2026). Ideas for later: DataGrid with virtualization, Kanban, rich-text editor, emoji picker, Carousel, collapsible icon-only sidebar.

## Before the roadmap

Button, Card, Checkbox, Chip, ComboBox, Calendar, DatePicker, Dialog/Modal, NumberField, Popover, ProgressBar, ProgressCircle,
RadioGroup, Select, Spinner, Switch, Tabs, TextField, TextAreaField, Toast, ChatInput, ChatMessage, useVoiceRecorder,
Form (`useZodForm`, `Form*` fields, `SubmitButton`).

## 1. Forms (each one also gets a `Form*` wrapper)

- [x] CheckboxGroup
- [x] Slider / RangeSlider
- [x] InputOTP
- [x] DateRangePicker + RangeCalendar
- [x] TimeField / DateField
- [x] SearchField
- [x] TagGroup (tag input)
- [x] InputGroup (prefix / suffix / addons)
- [x] Fieldset
- [x] FileUpload / DropZone
- [x] Rating
- [x] ToggleButton / ToggleButtonGroup / segmented control
- [x] ColorPicker (Area, Slider, Swatch, Field)

## 2. Overlays & navigation

- [x] Tooltip
- [x] Dropdown / Menu (+ ContextMenu)
- [x] Drawer / Sheet
- [x] AlertDialog
- [x] Accordion / Disclosure
- [x] Breadcrumbs
- [x] Pagination
- [x] Command palette
- [x] Stepper
- [x] HoverCard

## 3. Data display

- [x] Avatar / AvatarGroup
- [x] Badge
- [x] Alert
- [x] Skeleton
- [x] Separator
- [x] Kbd
- [x] Link
- [x] Table (sorting, selection) → DataGrid later
- [x] EmptyState
- [x] Timeline

## 4. AI (extends the chat components)

- [x] ChatMessageActions (copy, regenerate, rate)
- [x] Markdown + CodeBlock (streaming-safe)
- [x] PromptSuggestion chips
- [x] TextShimmer / ChatLoader
- [x] ChainOfThought / reasoning disclosure
- [x] ChatSource (citations)
- [x] ChatTool (tool call status)

## 5. Layout & charts

- [x] Sidebar / AppLayout / Navbar
- [x] Resizable panels
- [x] Charts (line, bar, area, pie) + KPI / TrendChip
