import React from 'react';

interface PlantActionsProps {
  onViewDetails: () => void;
}

const PlantActions: React.FC<PlantActionsProps> = ({ onViewDetails }) => {
  return (
    <button
      onClick={onViewDetails}
      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200"
    >
      View Details
    </button>
  );
};

export default PlantActions; 