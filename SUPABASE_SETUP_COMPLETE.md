# 🚀 Supabase Kurulum Tamamlama Rehberi

## ✅ Tamamlanan Adımlar
- ✅ Supabase dependencies yüklendi
- ✅ Environment dosyaları oluşturuldu
- ✅ Supabase client dosyaları hazırlandı
- ✅ Database schema hazırlandı

## 🔧 Tamamlanması Gereken Adımlar

### 1. Supabase Proje Bilgilerini Alma
1. https://supabase.com/dashboard adresine gidin
2. Projenizi seçin
3. **Settings > API** bölümüne gidin
4. Şu bilgileri kopyalayın:
   - **Project URL**
   - **anon public** (SUPABASE_ANON_KEY)
   - **service_role secret** (SUPABASE_SERVICE_ROLE_KEY)

### 2. Backend .env Dosyasını Güncelleme
```bash
cd backend
nano .env  # veya tercih ettiğiniz editör
```

Şu değerleri gerçek bilgilerinizle değiştirin:
```env
SUPABASE_URL=https://your-actual-project-id.supabase.co
SUPABASE_ANON_KEY=your-actual-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-actual-service-role-key
DATABASE_URL=postgresql://postgres:your-password@db.your-project-ref.supabase.co:5432/postgres
```

### 3. Frontend .env Dosyasını Güncelleme
```bash
cd frontend
nano .env
```

```env
VITE_SUPABASE_URL=https://your-actual-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-actual-anon-key
```

### 4. Supabase Database Schema'sını Oluşturma
1. Supabase Dashboard > SQL Editor
2. `backend/supabase_schema.sql` dosyasının içeriğini kopyalayın
3. SQL Editor'da çalıştırın

### 5. Storage Bucket Oluşturma
1. Supabase Dashboard > Storage
2. "New Bucket" tıklayın
3. Bucket adı: `plant-images`
4. "Public bucket" seçeneğini işaretleyin
5. "Create bucket" tıklayın

### 6. Test Etme
```bash
# Backend test
cd backend
python -c "from supabase_client import supabase_client; print('✅ Supabase bağlantısı başarılı!')"

# Frontend test
cd frontend
npm run dev
```

## 🎯 Sonuç
Bu adımları tamamladıktan sonra:
- ✅ Verileriniz cloud'da saklanacak
- ✅ Resimler Supabase Storage'da olacak
- ✅ Real-time güncellemeler çalışacak
- ✅ Her yerden erişilebilir olacak

## 🔗 Faydalı Linkler
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Dashboard](https://supabase.com/dashboard)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security) 