import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/api';

export interface Plant {
  id: number;
  name: string;
  scientific_name: string;
  common_name?: string;
  image_filename: string;
  watering: string;
  environment: string;
}

export const plantService = {
  getAllPlants: async (): Promise<Plant[]> => {
    const response = await axios.get(`${API_URL}/plants/`);
    return response.data;
  },

  getPlantById: async (id: number): Promise<Plant> => {
    const response = await axios.get(`${API_URL}/plants/${id}`);
    return response.data;
  },

  deletePlant: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/plants/${id}`);
  },

  identifyPlant: async (imageFile: File): Promise<Plant> => {
    const formData = new FormData();
    formData.append('file', imageFile);

    const response = await axios.post('http://127.0.0.1:5000/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  }
}; 