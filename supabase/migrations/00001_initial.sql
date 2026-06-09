-- Profiles table (extends auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Events / Films
CREATE TYPE event_status AS ENUM ('active', 'developing', 'revealed', 'archived');

CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  host_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  cover_url TEXT,
  shot_limit INT NOT NULL DEFAULT 24,
  guest_cap INT NOT NULL DEFAULT 50,
  reveal_at TIMESTAMPTZ,
  is_revealed BOOLEAN NOT NULL DEFAULT false,
  status event_status NOT NULL DEFAULT 'active',
  join_code TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Hosts can read own events"
  ON events FOR SELECT
  USING (auth.uid() = host_id);

CREATE POLICY "Hosts can insert events"
  ON events FOR INSERT
  WITH CHECK (auth.uid() = host_id);

CREATE POLICY "Hosts can update own events"
  ON events FOR UPDATE
  USING (auth.uid() = host_id);

CREATE POLICY "Hosts can delete own events"
  ON events FOR DELETE
  USING (auth.uid() = host_id);

-- Guests
CREATE TABLE guests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  shots_remaining INT NOT NULL,
  joined_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE guests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Guests can read own guest entry"
  ON guests FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert guest entry"
  ON guests FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Guests can update own shots"
  ON guests FOR UPDATE
  USING (true);

-- Photos
CREATE TABLE photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  guest_id UUID REFERENCES guests(id) ON DELETE SET NULL,
  storage_path TEXT NOT NULL,
  width INT NOT NULL DEFAULT 0,
  height INT NOT NULL DEFAULT 0,
  taken_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE photos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone with event access can view photos"
  ON photos FOR SELECT
  USING (true);

CREATE POLICY "Guests can insert photos"
  ON photos FOR INSERT
  WITH CHECK (true);

-- Storage bucket for photos
INSERT INTO storage.buckets (id, name, public) VALUES ('photos', 'photos', false);

CREATE POLICY "Anyone can upload photos"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'photos');

CREATE POLICY "Anyone can view photos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'photos');
