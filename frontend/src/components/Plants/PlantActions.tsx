import React from 'react';

interface PlantActionsProps {
  onViewDetails: () => void;
}

const PlantActions: React.FC<PlantActionsProps> = ({ onViewDetails }) => {
  return (
    <div className="flex justify-center items-center px-4 pb-4">
      <button
        onClick={onViewDetails}
        className="text-green-600 hover:text-green-700 font-medium"
      >
        View Details
      </button>
    </div>
  );
};

export default PlantActions; 