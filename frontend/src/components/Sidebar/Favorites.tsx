import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../../context/FavoritesContext';
import { toSlug } from '../../utils/stringUtils';

export default function Favorites() {
  const { favorites, clearFavorites } = useFavorites();
  const navigate = useNavigate();

  const handlePlantClick = (plant: any) => {
    const plantName = plant.name || plant.common_name || 'plant';
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
      <div className="text-xs text-green-900 mb-2 font-semibold flex items-center justify-between">
        <span>Favorites</span>
        {favorites.length > 0 && (
          <button
            onClick={clearFavorites}
            className="ml-2 px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
            title="Clear all favorites"
          >
            Clear
          </button>
        )}
      </div>
      <div className="flex flex-col gap-2">
        {favorites.map((plant) => (
          <div
            key={plant.id}
            onClick={() => handlePlantClick(plant)}
            className="bg-accent text-green-800 px-3 py-2 rounded-xl text-sm cursor-pointer hover:bg-accent-dark transition-colors"
          >
            {plant.name || plant.common_name || 'Unknown Plant'}
          </div>
        ))}
      </div>
    </div>
  );
}
