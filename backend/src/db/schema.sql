-- Run once against your PostgreSQL database:
-- psql $DATABASE_URL -f src/db/schema.sql

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS users_photos (
  id          UUID      PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url   TEXT      NOT NULL,
  cedula_hash TEXT      UNIQUE NOT NULL,
  ip_address  TEXT,
  created_at  TIMESTAMP DEFAULT NOW()
);
