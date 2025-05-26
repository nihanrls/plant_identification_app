import React from 'react';
import { useNavigate } from 'react-router-dom';

interface EmptyPlantListProps {
  onAddPlant: () => void;
}

const EmptyPlantList: React.FC<EmptyPlantListProps> = ({ onAddPlant }) => {
  const navigate = useNavigate();

  const handleAddPlant = () => {
    navigate('/identify');
  };

  return (
    <div className="text-center py-12">
      <p className="text-gray-600 text-lg">You haven't added any plants yet.</p>
      <button
        onClick={handleAddPlant}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
      >
        Add Your First Plant
      </button>
    </div>
  );
};

export default EmptyPlantList; 