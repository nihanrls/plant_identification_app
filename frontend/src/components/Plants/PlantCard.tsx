import React from 'react';
import { Plant } from '../../services/plantService';
import PlantActions from './PlantActions';

interface PlantCardProps {
  plant: Plant;
  onViewDetails: (id: number) => void;
}

const PlantCard: React.FC<PlantCardProps> = ({ plant, onViewDetails }) => {
  const imageUrl = `http://127.0.0.1:5000/uploads/${plant.image_filename}`;
  
  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center relative group">
      <img src={imageUrl} alt={plant.name} className="w-20 h-20 rounded-full mb-2 object-cover" />
      <div className="font-semibold text-green-800">{plant.name}</div>
      <div className="text-sm text-green-700">{plant.scientific_name}</div>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <PlantActions onViewDetails={() => onViewDetails(plant.id)} />
      </div>
    </div>
  );
};

export default PlantCard; 