import React from 'react';

interface PlantInfoProps {
  name: string;
  scientificName: string;
  watering: string;
  environment: string;
}

const PlantInfo: React.FC<PlantInfoProps> = ({
  name,
  scientificName,
  watering,
  environment,
}) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        {name}
      </h2>
      <p className="text-sm text-gray-600 italic mb-2">
        {scientificName}
      </p>
      <div className="space-y-2 mb-4">
        <p className="text-gray-700">
          <span className="font-medium">Watering:</span> {watering}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Environment:</span> {environment}
        </p>
      </div>
    </div>
  );
};

export default PlantInfo; 