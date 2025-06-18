# Supabase Kurulum Rehberi

## 1. Supabase Projesi Oluşturma
1. https://supabase.com adresine gidin
2. Yeni proje oluşturun
3. Proje adı: "plant-identification-app"
4. Database password belirleyin
5. Region seçin (en yakın bölge)

## 2. Environment Variables
`.env` dosyasına şu değişkenleri ekleyin:

```env
# Supabase Configuration
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Database URL (Supabase PostgreSQL)
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
```

## 3. Database Schema
Supabase SQL Editor'da şu tabloyu oluşturun:

```sql
CREATE TABLE plants (
    id SERIAL PRIMARY KEY,
    scientific_name VARCHAR(256) NOT NULL,
    common_name VARCHAR(256),
    image_filename VARCHAR(256),
    care_instructions TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS) - Opsiyonel
ALTER TABLE plants ENABLE ROW LEVEL SECURITY;

-- Herkesin okuma yapabilmesi için
CREATE POLICY "Allow public read access" ON plants
    FOR SELECT USING (true);

-- Herkesin yazabilmesi için (herkese açık)
CREATE POLICY "Allow public insert" ON plants
    FOR INSERT WITH CHECK (true);

-- Herkesin güncelleyebilmesi için
CREATE POLICY "Allow public update" ON plants
    FOR UPDATE USING (true);

-- Herkesin silebilmesi için
CREATE POLICY "Allow public delete" ON plants
    FOR DELETE USING (true);
```

## 4. Storage Bucket Oluşturma
1. Supabase Dashboard > Storage
2. "plant-images" adında yeni bucket oluşturun
3. Public bucket yapın (herkesin erişebilmesi için)

## 5. Backend Güncellemeleri
- `requirements.txt`'ye supabase-py ekleyin
- `config.py`'yi güncelleyin
- `app.py`'de Supabase client'ı kullanın

## 6. Frontend Güncellemeleri
- `package.json`'a @supabase/supabase-js ekleyin
- Environment variables ekleyin
- API calls'ları güncelleyin 