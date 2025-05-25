import React, { useEffect, useState } from 'react';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import CalendarWidget from '../components/Dashboard/CalendarWidget';
import { fetchPlants } from '../services/api';
import { Plant } from '../types/plant';
import PlantCard from '../components/Dashboard/PlantCard';

const Home = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPlants = async () => {
      try {
        const data = await fetchPlants();
        console.log('Fetched plants:', data);
        setPlants(data);
      } catch (error) {
        console.error('Error fetching plants:', error);
      } finally {
        setLoading(false);
      }
    };
    loadPlants();
  }, []);

  const recentPlants = [...plants].slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-8">
      <DashboardHeader />
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-6">Recently Added Plants</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            <div>Loading plants...</div>
          ) : recentPlants.length > 0 ? (
            recentPlants.map((plant) => (
              <PlantCard
                key={plant.id}
                name={plant.common_name || plant.name || ''}
                image={plant.image_filename}
                desc={plant.scientific_name}
              />
            ))
          ) : (
            <div>No plants found</div>
          )}
        </div>
      </div>

      {/* Upcoming Events Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-6">Upcoming Events</h2>
        <CalendarWidget />
      </div>
    </div>
  );
};

export default Home;
