import React, { useRef, useState } from 'react';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  selectedImage: File | null;
  previewUrl: string | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageSelect,
  selectedImage,
  previewUrl,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      onImageSelect(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
        ${isDragging ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-green-500'}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        className="hidden"
      />
      
      {previewUrl ? (
        <div className="space-y-4">
          <img
            src={previewUrl}
            alt="Preview"
            className="max-h-64 mx-auto rounded-lg"
          />
          <p className="text-sm text-gray-500">
            {selectedImage?.name}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <svg
            className="w-12 h-12 mx-auto text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <div className="text-gray-600">
            <p className="font-medium">Click to upload or drag and drop</p>
            <p className="text-sm">PNG, JPG, JPEG up to 10MB</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader; 