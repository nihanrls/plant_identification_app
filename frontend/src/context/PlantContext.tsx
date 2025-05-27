import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Plant, plantService } from '../services/plantService';

interface PlantContextType {
  plants: Plant[];
  setPlants: React.Dispatch<React.SetStateAction<Plant[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  fetchPlants: () => Promise<void>;
  deletePlant: (id: number) => Promise<void>;
}

const PlantContext = createContext<PlantContextType | undefined>(undefined);

export const PlantProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlants = async () => {
    try {
      setLoading(true);
      const data = await plantService.getAllPlants();
      setPlants(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch plants. Please try again later.');
      console.error('Error fetching plants:', err);
    } finally {
      setLoading(false);
    }
  };

  const deletePlant = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this plant?')) {
      setPlants(plants.filter(plant => plant.id !== id));
      
      try {
        await plantService.deletePlant(id);
      } catch (err) {
        console.error('Error deleting plant:', err);
        const plantToRestore = plants.find(plant => plant.id === id);
        if (plantToRestore) {
          setPlants(prevPlants => [...prevPlants, plantToRestore]);
        }
      }
    }
  };

  return (
    <PlantContext.Provider value={{
      plants,
      setPlants,
      loading,
      setLoading,
      error,
      setError,
      fetchPlants,
      deletePlant
    }}>
      {children}
    </PlantContext.Provider>
  );
};

export const usePlants = () => {
  const context = useContext(PlantContext);
  if (context === undefined) {
    throw new Error('usePlants must be used within a PlantProvider');
  }
  return context;
}; 