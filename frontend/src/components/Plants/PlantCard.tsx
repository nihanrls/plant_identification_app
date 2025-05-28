import React from 'react';
import { Plant } from '../../services/plantService';
import PlantImage from './PlantImage';
import PlantInfo from './PlantInfo';
import PlantActions from './PlantActions';

interface PlantCardProps {
  plant: Plant;
  onViewDetails: (id: number) => void;
}

const PlantCard: React.FC<PlantCardProps> = ({ plant, onViewDetails }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <PlantImage
        imageFilename={plant.image_filename}
        plantName={plant.name}
      />
      <PlantInfo
        name={plant.name}
        scientificName={plant.scientific_name}
        watering={plant.watering}
        environment={plant.environment}
      />
      <PlantActions
        onViewDetails={() => onViewDetails(plant.id)}
      />
    </div>
  );
};

export default PlantCard; 