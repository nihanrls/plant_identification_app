import React from 'react';
import PlantCard from './PlantCard';

export default function PlantList() {
  // Örnek veri
  const plants = [
    { name: 'Aloe Vera', image: '/aloe.jpg', desc: 'Bakımı kolay, şifalı bitki.' },
    { name: 'Kaktüs', image: '/cactus.jpg', desc: 'Az su isteyen dayanıklı bitki.' },
  ];
  return (
    <div className="grid grid-cols-2 gap-6">
      {plants.map((plant) => (
        <div key={plant.name}>
          <PlantCard name={plant.name} image={plant.image} desc={plant.desc} />
        </div>
      ))}
    </div>
  );
} 