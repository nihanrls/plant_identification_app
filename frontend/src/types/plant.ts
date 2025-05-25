export interface Plant {
  id: number;
  common_name: string;
  scientific_name: string;
  watering: string;
  environment: string;
  disease_name?: string;
  disease_probability?: number;
  disease_details?: string;
  created_at: string;
  updated_at: string;
  image_filename: string;
} 