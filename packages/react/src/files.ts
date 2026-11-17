/** Checks a file against `accept`-style types: MIME types, wildcards (`image/*`) or extensions (`.pdf`). */
export function matchesFileType(file: File, accepted?: string[]) {
  if (!accepted?.length) return true;
  return accepted.some((type) =>
    type.endsWith('/*')
      ? file.type.startsWith(type.slice(0, -1))
      : type.startsWith('.')
        ? file.name.toLowerCase().endsWith(type.toLowerCase())
        : file.type === type,
  );
}

export function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}
