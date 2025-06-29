import React from 'react';
import { getImageUrl } from '../../utils/imageUtils';

interface PlantCardProps {
  name: string;
  image: string;
  desc: string;
}

export default function PlantCard({ name, image, desc }: PlantCardProps) {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
      <img 
        src={image} 
        alt={name} 
        className="w-20 h-20 rounded-full mb-2 object-cover" 
      />
      <div className="font-semibold text-green-800">{name}</div>
      <div className="text-s text-green-700">{desc}</div>
    </div>
  );
} 