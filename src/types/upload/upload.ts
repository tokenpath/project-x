import { LucideIcon } from "lucide-react";

export type PreviewType = "image" | "audio" | "cursor";

export interface FileUploaderProps {
  title: string;
  icon: LucideIcon;
  description: string;
  accept?: string;
  maxSize?: string;
  previewType?: PreviewType;
  className?: string;
  onChange?: (file: File | null) => void;
  maxSizeInBytes?: number;
}

export interface FileUploadGridProps {
    onFilesChange?: (type: string, file: File | null) => void;
}