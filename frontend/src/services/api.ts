import axios from 'axios';
import { Plant } from '../types/plant';

const API_URL = 'http://127.0.0.1:5001';

export const fetchPlants = async () => {
  try {
    const response = await fetch(`${API_URL}/api/plants/`);
    if (!response.ok) {
      throw new Error('Failed to fetch plants');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching plants:', error);
    throw error;
  }
};

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await axios.post(`${API_URL}/upload`, formData);
  return response.data;
};

export const addPlant = async (plantData: any) => {
  try {
    const response = await fetch(`${API_URL}/api/plants/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(plantData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to add plant');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error adding plant:', error);
    throw error;
  }
};

export const getPlants = async () => {
  const response = await axios.get<Plant[]>(`${API_URL}/api/plants`);
  return response;
}; 