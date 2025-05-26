import React from 'react';

interface PlantImageProps {
  imageFilename: string;
  plantName: string;
}

const PlantImage: React.FC<PlantImageProps> = ({ imageFilename, plantName }) => {
  return (
    <img
      src={`http://localhost:5000/uploads/${imageFilename}`}
      alt={plantName}
      className="w-full h-48 object-cover"
    />
  );
};

export default PlantImage; 