-- ============================================================
-- MassageSchneider Database Schema
-- ============================================================

-- Roles for Supabase (PostgREST)
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'anon') THEN
    CREATE ROLE anon NOLOGIN NOINHERIT;
  END IF;
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'authenticated') THEN
    CREATE ROLE authenticated NOLOGIN NOINHERIT;
  END IF;
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'service_role') THEN
    CREATE ROLE service_role NOLOGIN NOINHERIT BYPASSRLS;
  END IF;
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'authenticator') THEN
    CREATE ROLE authenticator NOINHERIT LOGIN PASSWORD 'postgres';
  END IF;
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'supabase_auth_admin') THEN
    CREATE ROLE supabase_auth_admin NOINHERIT LOGIN PASSWORD 'postgres';
  END IF;
END
$$;

GRANT anon TO authenticator;
GRANT authenticated TO authenticator;
GRANT service_role TO authenticator;
GRANT ALL ON DATABASE massage_schneider TO supabase_auth_admin;

-- ── Categories ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT '💆',
  sort_order INT NOT NULL DEFAULT 0
);

-- ── Services ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS services (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT NOT NULL DEFAULT '',
  icon TEXT NOT NULL DEFAULT '💆',
  category_id TEXT NOT NULL REFERENCES categories(id),
  image TEXT NOT NULL DEFAULT '',
  tags TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── Service Durations (prices) ───────────────────────────
CREATE TABLE IF NOT EXISTS service_durations (
  id SERIAL PRIMARY KEY,
  service_id TEXT NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  minutes INT NOT NULL,
  price NUMERIC(8,2) NOT NULL
);

-- ── Users (app-level, linked to Supabase Auth) ──────────
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('admin', 'customer')),
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── Bookings ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS bookings (
  id TEXT PRIMARY KEY,
  customer_id TEXT NOT NULL REFERENCES users(id),
  customer_name TEXT NOT NULL,
  service_id TEXT NOT NULL REFERENCES services(id),
  service_name TEXT NOT NULL,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  duration INT NOT NULL,
  price NUMERIC(8,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('confirmed', 'pending', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── Updated_at trigger ───────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER services_updated_at
  BEFORE UPDATE ON services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── Row Level Security ───────────────────────────────────
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_durations ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Public read for categories, services, durations
CREATE POLICY "categories_public_read" ON categories FOR SELECT USING (true);
CREATE POLICY "services_public_read" ON services FOR SELECT USING (true);
CREATE POLICY "durations_public_read" ON service_durations FOR SELECT USING (true);

-- Service role (admin) can do everything
CREATE POLICY "categories_admin_all" ON categories FOR ALL TO service_role USING (true);
CREATE POLICY "services_admin_all" ON services FOR ALL TO service_role USING (true);
CREATE POLICY "durations_admin_all" ON service_durations FOR ALL TO service_role USING (true);
CREATE POLICY "users_admin_all" ON users FOR ALL TO service_role USING (true);
CREATE POLICY "bookings_admin_all" ON bookings FOR ALL TO service_role USING (true);

-- Customers can read own bookings
CREATE POLICY "bookings_customer_read" ON bookings
  FOR SELECT TO authenticated
  USING (customer_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- Customers can create bookings
CREATE POLICY "bookings_customer_insert" ON bookings
  FOR INSERT TO authenticated
  WITH CHECK (customer_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- Grant permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT SELECT ON categories, services, service_durations TO anon, authenticated;
GRANT ALL ON categories, services, service_durations, users, bookings TO service_role;
GRANT SELECT, INSERT ON bookings TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE service_durations_id_seq TO anon, authenticated, service_role;

-- ============================================================
-- SEED DATA
-- ============================================================

INSERT INTO categories (id, name, icon, sort_order) VALUES
  ('klassisch', 'Klassische Massagen', '💆', 1),
  ('wellness', 'Wellness', '🌿', 2),
  ('therapeutisch', 'Therapeutisch', '🩺', 3),
  ('speziell', 'Spezialmassagen', '✨', 4)
ON CONFLICT (id) DO NOTHING;

INSERT INTO services (id, name, description, long_description, icon, category_id, image, tags) VALUES
  ('klassische-massage', 'Klassische Massage', 'Gezielte Behandlung des Bewegungsapparates und der Muskulatur zur Lösung von Verspannungen.', 'Die klassische Massage zielt auf den Bewegungsapparat und die Muskulatur ab. Mit verschiedenen Grifftechniken werden Verspannungen gelöst, die Durchblutung angeregt und das allgemeine Wohlbefinden verbessert. Sie ist die Grundlage aller Massagetechniken und besonders wirksam bei Rücken-, Nacken- und Schulterbeschwerden.', '💆', 'klassisch', 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=600&h=400&fit=crop', '{beliebt}'),
  ('lymphdrainage', 'Lymphdrainage', 'Sanfte Massagetechnik zur Entschlackung, Entwässerung und Stärkung des Immunsystems.', 'Die Lymphdrainage ist eine sehr sanfte Massagetechnik, die für therapeutische als auch für kosmetische Behandlungen eingesetzt wird. Sie fördert die Entschlackung und Entwässerung des Körpers und erzeugt damit eine allgemeine Regeneration und Stärkung des Immunsystems.', '🫧', 'therapeutisch', 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&h=400&fit=crop', '{therapeutisch}'),
  ('kinesio-taping', 'Kinesio-Taping', 'Elastische Tapes zur Unterstützung der Beweglichkeit und Aktivierung der Selbstheilungskräfte.', 'Elastische Tapes werden professionell an den betroffenen Stellen aufgebracht. Das Tape unterstützt die Beweglichkeit, erhält sie aufrecht und aktiviert die Selbstheilungskräfte des Körpers.', '🩹', 'therapeutisch', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop', '{}'),
  ('kraeuterstempel', 'Kräuterstempelmassage', 'Traditionelle ostasiatische Massage mit heißem Öl und duftenden Kräuterstempeln.', 'Die Kräuterstempelmassage beruht auf uralten Traditionen der ostasiatischen Massagekunst. Mit heißem Öl und duftenden Kräuterstempeln erleben Körper, Geist und Sinne ein ganzheitliches Wohlfühlerlebnis.', '🌿', 'wellness', 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=400&fit=crop', '{beliebt}'),
  ('hot-stone', 'Hot Stone Massage', 'Massage mit heißen hawaiianischen Steinen für tiefe Entspannung von Körper und Seele.', 'Die Hot Stone Massage ist eine Massage mit heißen hawaiianischen Steinen. Die Wärme der Steine dringt tief in die Muskulatur ein, löst Verspannungen und sorgt für eine tiefe Entspannung von Körper und Seele.', '🪨', 'wellness', 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=600&h=400&fit=crop', '{beliebt}'),
  ('schroepfmassage', 'Schröpfmassage', 'Über 3.000 Jahre alte Technik mit Glasglocken zur Verbesserung der Durchblutung.', 'Die Schröpfmassage ist eine über 3.000 Jahre alte Technik. Glasglocken werden auf eingeölte Haut aufgesetzt und erzeugen durch Unterdruck eine durchblutungsfördernde Wirkung.', '🫙', 'speziell', 'https://images.unsplash.com/photo-1519824145371-296894a0daa9?w=600&h=400&fit=crop', '{}'),
  ('schwangerschaftsmassage', 'Schwangerschaftsmassage', 'Speziell abgestimmte Massage zur Unterstützung in der Schwangerschaft.', 'Die Schwangerschaftsmassage bietet speziell auf die Bedürfnisse werdender Mütter abgestimmte Programme.', '🤰', 'speziell', 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&h=400&fit=crop', '{}'),
  ('fussreflexzonen', 'Fußreflexzonenmassage', 'Gezielte Massage der Reflexzonen der Füße zur ganzheitlichen Behandlung.', 'Die Reflexzonen der Füße stellen den Körper mit all seinen Organen dar. Über vegetative Abläufe können Irritationen und Schwachstellen erkannt und durch gezielte Massage der entsprechenden Reflexzonen positiv beeinflusst werden.', '🦶', 'speziell', 'https://images.unsplash.com/photo-1519824145371-296894a0daa9?w=600&h=400&fit=crop', '{beliebt}')
ON CONFLICT (id) DO NOTHING;

INSERT INTO service_durations (service_id, minutes, price) VALUES
  ('klassische-massage', 25, 32), ('klassische-massage', 50, 58),
  ('lymphdrainage', 30, 36), ('lymphdrainage', 50, 60),
  ('kinesio-taping', 20, 28),
  ('kraeuterstempel', 50, 68), ('kraeuterstempel', 80, 95),
  ('hot-stone', 50, 65), ('hot-stone', 80, 92),
  ('schroepfmassage', 30, 38), ('schroepfmassage', 50, 62),
  ('schwangerschaftsmassage', 30, 38), ('schwangerschaftsmassage', 50, 62),
  ('fussreflexzonen', 30, 36), ('fussreflexzonen', 50, 58);

INSERT INTO users (id, email, name, role, phone) VALUES
  ('admin-1', 'admin@massageschneider.at', 'Sabine Schneider', 'admin', '0664 4126412'),
  ('customer-1', 'kunde@example.com', 'Maria Muster', 'customer', '0660 1234567')
ON CONFLICT (id) DO NOTHING;

INSERT INTO bookings (id, customer_id, customer_name, service_id, service_name, date, time, duration, price, status) VALUES
  ('b-1', 'customer-1', 'Maria Muster', 'klassische-massage', 'Klassische Massage', '2026-03-12', '10:00', 50, 58, 'confirmed'),
  ('b-2', 'customer-1', 'Maria Muster', 'hot-stone', 'Hot Stone Massage', '2026-03-18', '14:00', 80, 92, 'pending')
ON CONFLICT (id) DO NOTHING;
