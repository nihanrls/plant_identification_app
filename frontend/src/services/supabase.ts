import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Plant {
  id: number
  scientific_name: string
  common_name: string
  image_filename: string
  care_instructions?: string
  created_at?: string
  updated_at?: string
}

export class SupabaseService {
  // Tüm bitkileri getir
  static async getPlants(): Promise<Plant[]> {
    try {
      const { data, error } = await supabase
        .from('plants')
        .select('*')
        .order('id', { ascending: false })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching plants:', error)
      return []
    }
  }

  // Yeni bitki ekle
  static async addPlant(plant: Omit<Plant, 'id' | 'created_at' | 'updated_at'>): Promise<Plant | null> {
    try {
      const { data, error } = await supabase
        .from('plants')
        .insert([plant])
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error adding plant:', error)
      return null
    }
  }

  // Bitki sil
  static async deletePlant(id: number): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('plants')
        .delete()
        .eq('id', id)

      if (error) throw error
      return true
    } catch (error) {
      console.error('Error deleting plant:', error)
      return false
    }
  }

  // Resim yükle
  static async uploadImage(file: File, fileName: string): Promise<string | null> {
    try {
      const { data, error } = await supabase.storage
        .from('plant-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (error) throw error

      // Public URL al
      const { data: urlData } = supabase.storage
        .from('plant-images')
        .getPublicUrl(fileName)

      return urlData.publicUrl
    } catch (error) {
      console.error('Error uploading image:', error)
      return null
    }
  }

  // Resim URL'ini al
  static getImageUrl(fileName: string): string {
    const { data } = supabase.storage
      .from('plant-images')
      .getPublicUrl(fileName)
    
    return data.publicUrl
  }

  // Real-time subscription (opsiyonel)
  static subscribeToPlants(callback: (plants: Plant[]) => void) {
    return supabase
      .channel('plants_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'plants' },
        () => {
          // Değişiklik olduğunda tüm bitkileri yeniden getir
          this.getPlants().then(callback)
        }
      )
      .subscribe()
  }
} 