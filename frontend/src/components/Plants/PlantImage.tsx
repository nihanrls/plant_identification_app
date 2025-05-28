import React from 'react';

interface PlantImageProps {
  imageFilename: string;
  plantName: string;
}

const PlantImage: React.FC<PlantImageProps> = ({ imageFilename, plantName }) => {
  return (
    <div className="md:w-1/2">
      <img
        src={`http://127.0.0.1:5000/uploads/${imageFilename}`}
        alt={plantName}
        className="w-full h-96 object-cover"
      />
    </div>
  );
};

export default PlantImage; 