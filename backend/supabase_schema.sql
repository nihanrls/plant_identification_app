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