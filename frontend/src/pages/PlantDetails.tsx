import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Plant, plantService } from '../services/plantService';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import ErrorMessage from '../components/Common/ErrorMessage';
import { toSlug } from '../utils/stringUtils';

const PlantDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [plant, setPlant] = useState<Plant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlant = async () => {
      try {
        setLoading(true);
        const plants = await plantService.getAllPlants();
        const foundPlant = plants.find(p => toSlug(p.name) === slug);
        
        if (foundPlant) {
          setPlant(foundPlant);
        } else {
          setError('Plant not found');
        }
      } catch (err) {
        setError('Failed to fetch plant details. Please try again later.');
        console.error('Error fetching plant:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlant();
  }, [slug]);

  const handleBack = () => {
    navigate('/my-plants');
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !plant) {
    return <ErrorMessage message={error || 'Plant not found'} onRetry={handleBack} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={handleBack}
        className="mb-6 text-green-600 hover:text-green-700 flex items-center"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to My Plants
      </button>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              src={`http://127.0.0.1:5000/uploads/${plant.image_filename}`}
              alt={plant.name}
              className="w-full h-96 object-cover"
            />
          </div>
          <div className="md:w-1/2 p-8">
            <h1 className="text-3xl font-bold text-green-800 mb-2">{plant.name}</h1>
            <p className="text-lg text-green-700 italic mb-6">{plant.scientific_name}</p>
            
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Care Instructions</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-1">Watering</h3>
                    <p className="text-gray-600">{plant.watering}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-1">Environment</h3>
                    <p className="text-gray-600">{plant.environment}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 rounded-lg border">
                <h2 className="text-xl font-semibold mb-2">Health Status</h2>
                {plant.disease_name ? (
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-lg font-medium text-red-700 mb-1">Detected Disease</h3>
                      <p className="text-red-600">{plant.disease_name}</p>
                    </div>
                    {plant.disease_probability && (
                      <div>
                        <h3 className="text-lg font-medium text-red-700 mb-1">Confidence</h3>
                        <p className="text-red-600">
                          {(plant.disease_probability * 100).toFixed(1)}% probability
                        </p>
                      </div>
                    )}
                    {plant.disease_details && (
                      <div>
                        <h3 className="text-lg font-medium text-red-700 mb-1">Details</h3>
                        <p className="text-red-600">{plant.disease_details}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 text-green-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-lg">No diseases detected. Your plant appears to be healthy!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantDetails; 