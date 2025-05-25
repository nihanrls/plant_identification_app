import { useEffect, useState } from 'react';
import PlantCard from './PlantCard';
import { fetchPlants } from '../../services/api';

interface Plant {
  id: number;
  name: string;
  scientific_name: string;
  image_filename: string;
  watering: string;
  environment: string;
}

export default function PlantList() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPlants = async () => {
      try {
        const data = await fetchPlants();
        setPlants(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load plants');
        setLoading(false);
      }
    };

    loadPlants();
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {plants.map((plant) => (
        <PlantCard
          key={plant.id}
          name={plant.name}
          image={plant.image_filename}
          desc={plant.scientific_name}
        />
      ))}
    </div>
  );
} 