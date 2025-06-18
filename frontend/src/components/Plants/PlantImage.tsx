import React from 'react';
import { getImageUrl } from '../../utils/imageUtils';

interface PlantImageProps {
  imageFilename: string;
  plantName: string;
}

const PlantImage: React.FC<PlantImageProps> = ({ imageFilename, plantName }) => {
  return (
    <div className="md:w-1/2">
      <img
        src={getImageUrl(imageFilename)}
        alt={plantName}
        className="w-full h-96 object-cover"
      />
    </div>
  );
};

export default PlantImage; 