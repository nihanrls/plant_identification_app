import React from 'react';
import { Plant } from '../../types/plant';
import PlantCard from './PlantCard';
import EmptyPlantList from './EmptyPlantList';

interface PlantListProps {
  plants: Plant[];
  onViewDetails: (id: number) => void;
  onAddPlant: () => void;
}

const PlantList: React.FC<PlantListProps> = ({
  plants,
  onViewDetails,
  onAddPlant,
}) => {
  if (plants.length === 0) {
    return <EmptyPlantList onAddPlant={onAddPlant} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {plants.map((plant) => (
        <PlantCard
          key={plant.id}
          plant={plant}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
};

export default PlantList; 