'use client';

import { FileUpload } from '@trellis-ui/react';

export default function FileUploadDemo() {
  return (
    <FileUpload
      className="w-full max-w-md"
      label="Attachments"
      description="PNG, JPG or PDF, up to 5 MB each."
      acceptedFileTypes={['image/png', 'image/jpeg', 'application/pdf']}
      maxFileSize={5 * 1024 * 1024}
      maxFiles={5}
    />
  );
}
