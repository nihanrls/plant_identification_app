import React from 'react';

interface PlantInfoProps {
  name: string;
  scientificName: string;
  care_instructions: string;
}

const PlantInfo: React.FC<PlantInfoProps> = ({
  name,
  scientificName,
  care_instructions,
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
          <span className="font-medium">Care Instructions:</span> {care_instructions}
        </p>
      </div>
    </div>
  );
};

export default PlantInfo; 