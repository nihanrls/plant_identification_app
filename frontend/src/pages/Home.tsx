import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import { fetchPlants } from '../services/api';
import { Plant } from '../types/plant';
import PlantCard from '../components/Dashboard/PlantCard';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { getImageUrl } from '../utils/imageUtils';

const Home = () => {
  const navigate = useNavigate();
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

  const EmptyPlantsMessage = () => (
    <div className="text-center text-green-700">
      No plants found.{' '}
      <span 
        className="text-green-600 font-semibold cursor-pointer hover:text-green-800 hover:underline"
        onClick={() => navigate('/identify')}
      >
        Click here
      </span>
      {' '}to add your first plant!
    </div>
  );

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
                image={plant.image_url || getImageUrl(plant.image_filename)}
                desc={plant.scientific_name}
              />
            ))
          ) : (
            <EmptyPlantsMessage />
          )}
        </div>
      </div>

      <div className="mt-12">
        <div 
          className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
          onClick={() => navigate('/help')}
        >
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-full">
              <HelpOutlineIcon className="text-green-600 text-3xl" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-green-800">Need Help?</h3>
              <p className="text-green-700 mt-1">
                Check out our help center for guides, FAQs, and support resources.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
