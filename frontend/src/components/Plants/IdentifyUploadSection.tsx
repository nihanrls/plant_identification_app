import React from 'react';
import ImageUploader from './ImageUploader';

interface IdentifyUploadSectionProps {
  selectedImage: File | null;
  previewUrl: string | null;
  onImageSelect: (file: File) => void;
  onIdentify: () => void;
  showIdentifyButton: boolean;
}

const IdentifyUploadSection: React.FC<IdentifyUploadSectionProps> = ({
  selectedImage,
  previewUrl,
  onImageSelect,
  onIdentify,
  showIdentifyButton,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Upload Plant Image</h2>
      <ImageUploader
        onImageSelect={onImageSelect}
        selectedImage={selectedImage}
        previewUrl={previewUrl}
      />
      
      {showIdentifyButton && (
        <button
          onClick={onIdentify}
          className="mt-4 w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors"
        >
          Identify Plant
        </button>
      )}
    </div>
  );
};

export default IdentifyUploadSection; 