"use client";

import { useState, useCallback, useRef } from "react";
import type { UploadedFile } from "@/types";
import { MAX_UPLOAD_SIZE } from "@/lib/constants";

interface DropZoneProps {
  onFilesSelected: (files: UploadedFile[]) => void;
}

export default function DropZone({ onFilesSelected }: DropZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<UploadedFile[]>([]);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFiles = useCallback(
    async (fileList: FileList) => {
      setError(null);
      const files: UploadedFile[] = [];

      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];

        if (file.size > MAX_UPLOAD_SIZE) {
          setError(`File "${file.name}" exceeds 50MB limit.`);
          return;
        }

        const content = await readFileAsBase64(file);
        files.push({
          path: file.webkitRelativePath || file.name,
          content,
          size: file.size,
        });
      }

      setSelectedFiles(files);
      onFilesSelected(files);
    },
    [onFilesSelected]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      if (e.dataTransfer.files.length > 0) {
        processFiles(e.dataTransfer.files);
      }
    },
    [processFiles]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        processFiles(e.target.files);
      }
    },
    [processFiles]
  );

  return (
    <div className="space-y-4">
      {/* Drop zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative rounded-2xl border-2 border-dashed p-10 text-center cursor-pointer transition-all duration-200 ${
          isDragOver
            ? "border-brand-400 bg-brand-500/5 scale-[1.01]"
            : "border-white/10 hover:border-white/20 hover:bg-white/[0.02]"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          onChange={handleFileInput}
          className="hidden"
          accept=".zip,.js,.ts,.tsx,.jsx,.html,.css,.json,.md,.py,.go,.rs"
        />

        <div className="flex flex-col items-center gap-3">
          {/* Upload icon */}
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors duration-200 ${
              isDragOver
                ? "bg-brand-500/20 text-brand-400"
                : "bg-white/5 text-white/30"
            }`}
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path d="M7 18a4.6 4.4 0 01-.3-8.8 7 7 0 0113.6 2.8h.5a3.5 3.5 0 01.5 7H7z" />
              <path d="M15 13l-3-3-3 3M12 10v8" />
            </svg>
          </div>

          <div>
            <p className="text-sm text-white/60">
              <span className="text-brand-400 font-medium">Click to upload</span>{" "}
              or drag and drop
            </p>
            <p className="text-xs text-white/30 mt-1">
              ZIP files or individual source files up to 50MB
            </p>
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <p className="text-xs text-red-400 px-2">{error}</p>
      )}

      {/* File list */}
      {selectedFiles.length > 0 && (
        <div className="rounded-xl bg-white/[0.02] border border-white/5 max-h-40 overflow-y-auto">
          {selectedFiles.map((file, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-4 py-2 text-xs border-b border-white/5 last:border-0"
            >
              <span className="text-white/60 font-mono truncate flex-1">
                {file.path}
              </span>
              <span className="text-white/20 ml-3 flex-shrink-0">
                {formatSize(file.size)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1]); // Strip data URI prefix
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${(bytes / 1048576).toFixed(1)}MB`;
}
