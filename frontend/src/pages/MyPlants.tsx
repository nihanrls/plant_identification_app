import React, { useEffect, useState } from 'react';
import { Plant, plantService } from '../services/plantService';
import PlantList from '../components/Plants/PlantList';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import ErrorMessage from '../components/Common/ErrorMessage';
import PageHeader from '../components/Common/PageHeader';

const MyPlants: React.FC = () => {
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

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this plant?')) {
      try {
        await plantService.deletePlant(id);
        setPlants(plants.filter(plant => plant.id !== id));
      } catch (err) {
        console.error('Error deleting plant:', err);
        alert('Failed to delete plant. Please try again.');
      }
    }
  };

  const handleViewDetails = (id: number) => {
    // TODO: Implement view details functionality
    console.log('View details for plant:', id);
  };

  const handleAddPlant = () => {
    // TODO: Implement add plant functionality
    console.log('Add new plant');
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
        onDelete={handleDelete}
        onViewDetails={handleViewDetails}
        onAddPlant={handleAddPlant}
      />
    </div>
  );
};

export default MyPlants; 