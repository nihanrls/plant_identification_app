import React from 'react';

interface PlantActionsProps {
  onViewDetails: () => void;
  onDelete: () => void;
}

const PlantActions: React.FC<PlantActionsProps> = ({ onViewDetails, onDelete }) => {
  return (
    <div className="flex justify-between items-center px-4 pb-4">
      <button
        onClick={onViewDetails}
        className="text-green-600 hover:text-green-700 font-medium"
      >
        View Details
      </button>
      <button
        onClick={onDelete}
        className="text-red-600 hover:text-red-700 font-medium"
      >
        Delete
      </button>
    </div>
  );
};

export default PlantActions; 