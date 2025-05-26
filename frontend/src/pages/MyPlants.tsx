import React, { useEffect, useState } from 'react';
import { Plant, plantService } from '../services/plantService';

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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 text-center">
          <p className="text-xl font-semibold">{error}</p>
          <button
            onClick={fetchPlants}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Plants</h1>
        <button
          onClick={() => {/* TODO: Implement add plant functionality */}}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Add New Plant
        </button>
      </div>

      {plants.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">You haven't added any plants yet.</p>
          <button
            onClick={() => {/* TODO: Implement add plant functionality */}}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Add Your First Plant
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plants.map((plant) => (
            <div
              key={plant.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={`http://localhost:5000/uploads/${plant.image_filename}`}
                alt={plant.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {plant.name}
                </h2>
                <p className="text-sm text-gray-600 italic mb-2">
                  {plant.scientific_name}
                </p>
                <div className="space-y-2 mb-4">
                  <p className="text-gray-700">
                    <span className="font-medium">Watering:</span> {plant.watering}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Environment:</span> {plant.environment}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => {/* TODO: Implement view details */}}
                    className="text-green-600 hover:text-green-700 font-medium"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleDelete(plant.id)}
                    className="text-red-600 hover:text-red-700 font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPlants; 