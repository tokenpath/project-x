import { FileUploaderProps } from "@/types/upload/upload";
import { ChangeEvent, DragEvent, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { AlertCircle, CheckCircle2, Plus, X, Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const FileUploader: React.FC<FileUploaderProps> = ({
  title,
  icon: Icon,
  description,
  accept = "*/*",
  maxSize = "5MB",
  previewType = "image",
  className = "",
  onChange = () => {},
  maxSizeInBytes,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (fileToValidate: File): boolean => {
    setError(null);

    if (accept !== "*/*") {
      const fileType = fileToValidate.type;
      const acceptedTypes = accept.split(",");
      const isValidType = acceptedTypes.some((type) => {
        if (type.includes("/*")) {
          const [mainType] = type.split("/");
          return fileType.startsWith(`${mainType}/`);
        }
        return type === fileType;
      });

      if (!isValidType) {
        setError(`Invalid file type. Accepted: ${accept}`);
        return false;
      }
    }

    if (maxSizeInBytes && fileToValidate.size > maxSizeInBytes) {
      setError(`File size exceeds ${maxSize}`);
      return false;
    }

    return true;
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && validateFile(droppedFile)) {
      handleFileChange(droppedFile);
    }
  };

  const handleFileChange = (newFile: File): void => {
    setFile(newFile);
    onChange(newFile);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && validateFile(selectedFile)) {
      handleFileChange(selectedFile);
    }
  };

  const removeFile = (): void => {
    setFile(null);
    onChange(null);
    setError(null);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const renderPreview = () => {
    if (!file) return null;
    const fileUrl = URL.createObjectURL(file);

    switch (previewType) {
      case "image":
        return (
          <div className="relative group mb-3">
            <div className="relative w-full h-48 overflow-hidden rounded-xl">
              <img
                src={fileUrl}
                alt="Preview"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Button
                variant="secondary"
                size="sm"
                onClick={() =>
                  document.getElementById(`file-${title}`)?.click()
                }
                className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg"
              >
                Change file
              </Button>
            </div>
          </div>
        );
      case "audio":
        return (
          <div className="bg-primary/5 p-4 rounded-xl mb-3 backdrop-blur-sm">
            <audio controls src={fileUrl} className="w-full" />
          </div>
        );
      case "cursor":
        return (
          <div className="flex items-center justify-center mb-3">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300" />
              <div className="relative bg-background p-6 rounded-xl">
                <img
                  src={fileUrl}
                  alt="Cursor Preview"
                  className="w-16 h-16 object-contain"
                />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card
      className={cn(
        "w-full overflow-hidden backdrop-blur-sm border-secondary/20",
        error && "border-red-500/50",
        className
      )}
    >
      <CardContent className="p-0">
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-4 border-b border-secondary/20">
          <div className="flex items-center gap-3 mb-1.5">
            <div className="p-2 rounded-lg bg-background/80 shadow-sm">
              <Icon className="w-4 h-4 text-primary" />
            </div>
            <span className="font-semibold text-primary/90">{title}</span>
          </div>
          <p className="text-xs text-secondary/80 ml-1">{description}</p>
        </div>

        <div className="p-4">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={cn(
              "border-2 border-dashed rounded-xl transition-all duration-300",
              "bg-gradient-to-b from-background to-secondary/5",
              file
                ? "border-primary/40 bg-primary/5"
                : "border-secondary/30 hover:border-primary/30",
              isDragging && "border-primary/50 bg-primary/10",
              error && "border-red-500/50 bg-red-50/50",
              "relative group"
            )}
          >
            {!file ? (
              <label
                htmlFor={`file-${title}`}
                className="flex flex-col items-center justify-center p-8 cursor-pointer"
              >
                <div className="relative group/icon">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur opacity-0 group-hover/icon:opacity-100 transition duration-300" />
                  <div className="relative w-16 h-16 rounded-full bg-background flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-300">
                    <Plus className="w-8 h-8 text-primary/70 group-hover:text-primary transition-colors duration-300" />
                  </div>
                </div>

                <input
                  type="file"
                  accept={accept}
                  onChange={handleInputChange}
                  className="hidden"
                  id={`file-${title}`}
                />

                <div className="text-center mt-6">
                  <span className="text-primary/80 font-medium">
                    Click to upload
                  </span>
                  <p className="text-xs text-secondary/70 mt-1">
                    or drag and drop
                  </p>
                </div>

                <Badge
                  variant="secondary"
                  className="mt-5 bg-background/80 shadow-sm"
                >
                  Max size: {maxSize}
                </Badge>
              </label>
            ) : (
              <div className="p-4">
                {renderPreview()}

                <div className="flex items-center justify-between bg-background/80 p-4 rounded-xl shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-500/10">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-primary/90 truncate max-w-[150px]">
                        {file.name}
                      </p>
                      <p className="text-xs text-secondary/70">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={removeFile}
                    className="h-9 w-9 rounded-lg hover:bg-red-500/10 hover:text-red-500 transition-colors duration-300"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {error && (
              <div className="mt-3 mx-4 text-sm text-red-500 bg-red-500/10 rounded-lg p-3 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
