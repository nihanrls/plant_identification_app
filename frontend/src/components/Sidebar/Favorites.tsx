import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../../contexts/FavoritesContext';
import { toSlug } from '../../utils/stringUtils';

export default function Favorites() {
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  const handlePlantClick = (plantName: string) => {
    navigate(`/plants/${toSlug(plantName)}`);
  };

  if (favorites.length === 0) {
    return (
      <div className="mt-8">
        <div className="text-xs text-green-900 mb-2 font-semibold">Favorites</div>
        <div className="text-sm text-green-700">No favorite plants yet</div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="text-xs text-green-900 mb-2 font-semibold">Favorites</div>
      <div className="flex flex-col gap-2">
        {favorites.map((plant) => (
          <div
            key={plant.id}
            onClick={() => handlePlantClick(plant.name)}
            className="bg-accent text-green-800 px-3 py-2 rounded-xl text-sm cursor-pointer hover:bg-accent-dark transition-colors"
          >
            {plant.name}
          </div>
        ))}
      </div>
    </div>
  );
}
