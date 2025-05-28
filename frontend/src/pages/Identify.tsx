import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plant, plantService } from '../services/plantService';
import IdentifyHeader from '../components/Plants/IdentifyHeader';
import IdentifyUploadSection from '../components/Plants/IdentifyUploadSection';
import IdentificationResult from '../components/Plants/IdentificationResult';
import ErrorMessage from '../components/Common/ErrorMessage';

const Identify: React.FC = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [identifiedPlant, setIdentifiedPlant] = useState<Plant | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    setPreviewUrl(URL.createObjectURL(file));
    setIdentifiedPlant(null);
    setError(null);
  };

  const handleIdentify = async () => {
    if (!selectedImage) return;

    try {
      setLoading(true);
      setError(null);
      const result = await plantService.identifyPlant(selectedImage);
      setIdentifiedPlant(result);
    } catch (err) {
      setError('Failed to identify plant. Please try again.');
      console.error('Error identifying plant:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCollection = () => {
    navigate('/my-plants');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <IdentifyHeader loading={loading} />

        {!loading && (
          <>
            <IdentifyUploadSection
              selectedImage={selectedImage}
              previewUrl={previewUrl}
              onImageSelect={handleImageSelect}
              onIdentify={handleIdentify}
              showIdentifyButton={!!selectedImage && !identifiedPlant}
            />

            {error && (
              <ErrorMessage
                message={error}
                onRetry={() => setError(null)}
              />
            )}

            {identifiedPlant && previewUrl && (
              <IdentificationResult
                plant={identifiedPlant}
                onAddToCollection={handleAddToCollection}
                uploadedImageUrl={previewUrl}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Identify; 