import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plant, plantService } from '../services/plantService';
import PlantList from '../components/Plants/PlantList';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import ErrorMessage from '../components/Common/ErrorMessage';
import PageHeader from '../components/Common/PageHeader';
import { toSlug } from '../utils/stringUtils';

const MyPlants: React.FC = () => {
  const navigate = useNavigate();
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPlants();
  }, []);

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

  const handleViewDetails = (id: number) => {
    const plant = plants.find(p => p.id === id);
    if (plant) {
      navigate(`/plants/${toSlug(plant.name)}`);
    }
  };

  const handleAddPlant = () => {
    navigate('/identify');
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={fetchPlants} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="My Plants"
        actionButton={{
          label: 'Add New Plant',
          onClick: handleAddPlant,
        }}
      />

      <PlantList
        plants={plants}
        onViewDetails={handleViewDetails}
        onAddPlant={handleAddPlant}
      />
    </div>
  );
};

export default MyPlants; 