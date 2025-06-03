import React from 'react';
import { Plant } from '../../services/plantService';
import CareInstructions from './CareInstructions';


interface IdentificationResultProps {
  plant: Plant;
  onAddToCollection: () => void;
  uploadedImageUrl: string;
}

const IdentificationResult: React.FC<IdentificationResultProps> = ({
  plant,
  onAddToCollection,
  uploadedImageUrl,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="md:flex">
        <div className="md:w-1/2">
          <img
            src={uploadedImageUrl}
            alt={plant.name}
            className="w-full h-96 object-cover"
          />
        </div>
        <div className="md:w-1/2 p-8">
          <h1 className="text-3xl font-bold text-green-800 mb-2">{plant.name}</h1>
          <p className="text-lg text-green-700 italic mb-2">{plant.scientific_name}</p>
          {plant.common_name && (
            <p className="text-lg text-gray-600 mb-6">Common Name: {plant.common_name}</p>
          )}
          
          <div className="space-y-6">
            <CareInstructions
              watering={plant.watering}
              environment={plant.environment}
            />


            <button
              onClick={onAddToCollection}
              className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors"
            >
              Add to My Collection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdentificationResult; 