// Image URL utilities for Supabase integration

export const getImageUrl = (filename: string | undefined): string => {
  if (!filename) return '/placeholder-plant.jpg';
  
  // Supabase URL'ini environment'dan al
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  
  if (supabaseUrl) {
    // Supabase storage URL formatı
    return `${supabaseUrl}/storage/v1/object/public/plant-images/${filename}`;
  }
  
  // Fallback olarak local URL
  return `http://127.0.0.1:5001/uploads/${filename}`;
};

export const getSupabaseConfig = async () => {
  try {
    const response = await fetch('http://127.0.0.1:5001/api/supabase-config');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching Supabase config:', error);
  }
  return null;
}; 