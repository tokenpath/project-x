"use client"

import { FileUploader } from "@/components/upload/file-upload";
import { FileUploadGridProps } from "@/types/upload/upload";
import { Upload } from "lucide-react";

const FileUploadGrid: React.FC<FileUploadGridProps> = ({ onFilesChange = () => {} }) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 max-w-7xl mx-auto">
        <FileUploader
          title="Background Image"
          icon={Upload}
          accept="image/*"
          previewType="image"
          maxSize="5MB"
          maxSizeInBytes={5 * 1024 * 1024}
          description="Upload a background image for your profile"
          onChange={(file) => onFilesChange('background', file)}
        />
        
        <FileUploader
          title="Audio Track"
          icon={Upload}
          accept="audio/*"
          previewType="audio"
          maxSize="10MB"
          maxSizeInBytes={10 * 1024 * 1024}
          description="Add background music or sound effects"
          onChange={(file) => onFilesChange('audio', file)}
        />
        
        <FileUploader
          title="Profile Avatar"
          icon={Upload}
          accept="image/*"
          previewType="image"
          maxSize="2MB"
          maxSizeInBytes={2 * 1024 * 1024}
          description="Choose a profile picture or avatar"
          onChange={(file) => onFilesChange('avatar', file)}
        />
        
        <FileUploader
          title="Custom Cursor"
          icon={Upload}
          accept="image/*"
          previewType="cursor"
          maxSize="1MB"
          maxSizeInBytes={1024 * 1024}
          description="Upload a custom cursor image"
          onChange={(file) => onFilesChange('cursor', file)}
        />
      </div>
    );
  };
  
  export default FileUploadGrid;