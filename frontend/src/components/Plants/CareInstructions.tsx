import React from 'react';

interface CareInstructionsProps {
  watering: string;
  environment: string;
}

const CareInstructions: React.FC<CareInstructionsProps> = ({ watering, environment }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Care Instructions</h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-1">Watering</h3>
          <p className="text-gray-600">{watering}</p>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-1">Environment</h3>
          <p className="text-gray-600">{environment}</p>
        </div>
      </div>
    </div>
  );
};

export default CareInstructions; 