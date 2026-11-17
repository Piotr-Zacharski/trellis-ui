'use client';

import { type ReactNode, type Ref, useEffect, useId, useMemo, useState } from 'react';
import { Button as RACButton, DropZone, FileTrigger, isFileDropItem } from 'react-aria-components';
import { formatFileSize, matchesFileType } from '../files';
import { cn } from '../utils';
import { FileIcon, UploadIcon, XIcon } from './icons';

export interface FileUploadProps {
  value?: File[];
  defaultValue?: File[];
  onChange?: (files: File[]) => void;
  /** MIME types or extensions, e.g. `['image/*', '.pdf']`. */
  acceptedFileTypes?: string[];
  allowsMultiple?: boolean;
  maxFiles?: number;
  /** Max size per file in bytes. */
  maxFileSize?: number;
  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: string;
  isInvalid?: boolean;
  isDisabled?: boolean;
  /** Custom text inside the drop area. */
  children?: ReactNode;
  /** Receives the browse button – lets forms focus the field on error. */
  buttonRef?: Ref<HTMLButtonElement>;
  className?: string;
}

function FileRow({ file, onRemove }: { file: File; onRemove: () => void }) {
  const preview = useMemo(() => (file.type.startsWith('image/') ? URL.createObjectURL(file) : null), [file]);
  useEffect(() => () => void (preview && URL.revokeObjectURL(preview)), [preview]);

  return (
    <li className="flex items-center gap-3 rounded-tr border border-border bg-surface p-2 pr-3">
      {preview ? (
        <img src={preview} alt="" className="size-10 rounded-[calc(var(--tr-radius)*0.8)] object-cover" />
      ) : (
        <span className="flex size-10 items-center justify-center rounded-[calc(var(--tr-radius)*0.8)] bg-primary-soft text-primary">
          <FileIcon className="size-4" />
        </span>
      )}
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-sm font-medium text-foreground">{file.name}</span>
        <span className="text-xs text-muted-foreground">{formatFileSize(file.size)}</span>
      </span>
      <RACButton
        aria-label={`Remove ${file.name}`}
        onPress={onRemove}
        className="flex size-7 cursor-default items-center justify-center rounded-full text-muted-foreground outline-none hover:bg-muted hover:text-foreground data-focus-visible:ring-3 data-focus-visible:ring-ring"
      >
        <XIcon className="size-3.5" />
      </RACButton>
    </li>
  );
}

/** Drag & drop area with a browse button and a removable file list. */
export function FileUpload({
  value: controlledValue,
  defaultValue = [],
  onChange,
  acceptedFileTypes,
  allowsMultiple = true,
  maxFiles,
  maxFileSize,
  label,
  description,
  errorMessage,
  isInvalid = !!errorMessage,
  isDisabled,
  children,
  buttonRef,
  className,
}: FileUploadProps) {
  const id = useId();
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const [notice, setNotice] = useState<string | null>(null);
  const files = controlledValue ?? uncontrolled;
  const limit = allowsMultiple ? maxFiles : 1;

  const update = (next: File[]) => {
    if (controlledValue === undefined) setUncontrolled(next);
    onChange?.(next);
  };

  const add = (incoming: File[]) => {
    const accepted: File[] = [];
    let rejected: string | null = null;
    for (const file of incoming) {
      if (!matchesFileType(file, acceptedFileTypes)) rejected = `${file.name}: this file type is not supported.`;
      else if (maxFileSize && file.size > maxFileSize) rejected = `${file.name} is larger than ${formatFileSize(maxFileSize)}.`;
      else accepted.push(file);
    }
    let next = allowsMultiple ? [...files, ...accepted] : accepted.slice(0, 1);
    if (limit !== undefined && next.length > limit) {
      next = next.slice(0, limit);
      rejected = `You can upload up to ${limit} file${limit > 1 ? 's' : ''}.`;
    }
    setNotice(rejected);
    update(next);
  };

  const message = errorMessage ?? notice;

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {label && (
        <span id={`${id}-label`} className="w-fit text-sm font-medium text-foreground">
          {label}
        </span>
      )}
      <DropZone
        isDisabled={isDisabled}
        aria-labelledby={label ? `${id}-label` : undefined}
        getDropOperation={(types) => (types.has('Files') ? 'copy' : 'cancel')}
        onDrop={async (event) => add(await Promise.all(event.items.filter(isFileDropItem).map((item) => item.getFile())))}
        className={({ isDropTarget, isFocusVisible }) =>
          cn(
            'flex flex-col items-center justify-center gap-2 rounded-[calc(var(--tr-radius)*1.4)] border-2 border-dashed border-input bg-surface px-6 py-8 text-center outline-none transition-colors',
            isDropTarget && 'border-primary bg-primary-soft/50',
            isFocusVisible && 'ring-3 ring-ring',
            isInvalid && 'border-danger',
            isDisabled && 'opacity-50',
          )
        }
      >
        <span className="flex size-10 items-center justify-center rounded-full bg-primary-soft text-primary">
          <UploadIcon className="size-5" />
        </span>
        <div className="text-sm text-foreground">
          {children ?? (
            <>
              Drag & drop {allowsMultiple ? 'files' : 'a file'} here, or{' '}
              <FileTrigger
                allowsMultiple={allowsMultiple}
                acceptedFileTypes={acceptedFileTypes}
                onSelect={(list) => list && add(Array.from(list))}
              >
                <RACButton
                  ref={buttonRef}
                  isDisabled={isDisabled}
                  className="cursor-default font-medium text-primary underline-offset-4 outline-none hover:underline data-focus-visible:underline"
                >
                  browse
                </RACButton>
              </FileTrigger>
            </>
          )}
        </div>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
      </DropZone>
      {message && <p className="text-sm text-danger">{message}</p>}
      {files.length > 0 && (
        <ul className="flex flex-col gap-2" aria-label="Selected files">
          {files.map((file, index) => (
            <FileRow
              key={`${file.name}-${file.size}-${file.lastModified}`}
              file={file}
              onRemove={() => update(files.filter((_, i) => i !== index))}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
