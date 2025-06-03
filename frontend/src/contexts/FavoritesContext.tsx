import React, { createContext, useContext, useState, useEffect } from 'react';
import { Plant } from '../types/plant';

interface FavoritesContextType {
  favorites: Plant[];
  addToFavorites: (plant: Plant) => void;
  removeFromFavorites: (plantId: number) => void;
  isFavorite: (plantId: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Plant[]>(() => {
    const savedFavorites = localStorage.getItem('favoritePlants');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem('favoritePlants', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (plant: Plant) => {
    if (favorites.length >= 3) {
      alert('You can only add up to 3 plants to favorites!');
      return;
    }
    if (!favorites.some(fav => fav.id === plant.id)) {
      setFavorites([...favorites, plant]);
    }
  };

  const removeFromFavorites = (plantId: number) => {
    setFavorites(favorites.filter(plant => plant.id !== plantId));
  };

  const isFavorite = (plantId: number) => {
    return favorites.some(plant => plant.id === plantId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}; 