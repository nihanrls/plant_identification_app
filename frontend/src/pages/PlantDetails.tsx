import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Plant, plantService } from '../services/plantService';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import ErrorMessage from '../components/Common/ErrorMessage';
import { toSlug } from '../utils/stringUtils';
import BackButton from '../components/Common/BackButton';
import PlantImage from '../components/Plants/PlantImage';
import CareInstructions from '../components/Plants/CareInstructions';
import HealthStatus from '../components/Plants/HealthStatus';

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
      <BackButton onClick={handleBack} label="Back to My Plants" />

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="md:flex">
          <PlantImage
            imageFilename={plant.image_filename}
            plantName={plant.name}
          />
          
          <div className="md:w-1/2 p-8">
            <h1 className="text-3xl font-bold text-green-800 mb-2">{plant.name}</h1>
            <p className="text-lg text-green-700 italic mb-6">{plant.scientific_name}</p>
            
            <div className="space-y-6">
              <CareInstructions
                watering={plant.watering}
                environment={plant.environment}
              />

              <HealthStatus
                diseaseName={plant.disease_name}
                diseaseProbability={plant.disease_probability}
                diseaseDetails={plant.disease_details}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantDetails; 