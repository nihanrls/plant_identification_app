import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { plantService } from '../services/plantService';
import { Plant } from '../types/plant';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import ErrorMessage from '../components/Common/ErrorMessage';
import { toSlug } from '../utils/stringUtils';
import BackButton from '../components/Common/BackButton';
import PlantImage from '../components/Plants/PlantImage';
import CareInstructions from '../components/Plants/CareInstructions';

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
        
        // Hem name hem de common_name ile slug eşleştirmesi yap
        const foundPlant = plants.find(p => {
          const nameSlug = toSlug(p.name || '');
          const commonNameSlug = toSlug(p.common_name || '');
          return nameSlug === slug || commonNameSlug === slug;
        });
        
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
            imageUrl={plant.image_url}
            plantName={plant.name || plant.common_name || ''}
          />
          
          <div className="md:w-1/2 p-8">
            <h1 className="text-3xl font-bold text-green-800 mb-2">
              {plant.name || plant.common_name}
            </h1>
            <p className="text-lg text-green-700 italic mb-6">{plant.scientific_name}</p>
            
            <div className="space-y-6">
              <CareInstructions
                careInstructions={plant.care_instructions}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantDetails; 