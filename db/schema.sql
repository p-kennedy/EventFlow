CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS events (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source          TEXT NOT NULL,
    external_id     TEXT,
    name            TEXT NOT NULL,
    venue_name      TEXT NOT NULL,
    venue_lat       DOUBLE PRECISION NOT NULL,
    venue_lng       DOUBLE PRECISION NOT NULL,
    start_time      TIMESTAMPTZ NOT NULL,
    end_time        TIMESTAMPTZ NOT NULL,
    expected_attendance INTEGER,
    raw_data        JSONB,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE (source, external_id)
);

CREATE TABLE IF NOT EXISTS demand_events (
    id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id              UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    peak_dispersal_start  TIMESTAMPTZ NOT NULL,
    peak_dispersal_end    TIMESTAMPTZ NOT NULL,
    demand_radius_km      DOUBLE PRECISION NOT NULL,
    transport_pressure    TEXT NOT NULL CHECK (transport_pressure IN ('low', 'medium', 'high', 'critical')),
    crowd_size_estimate   INTEGER NOT NULL,
    full_payload          JSONB NOT NULL,
    created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_events_start_time ON events (start_time);
CREATE INDEX IF NOT EXISTS idx_demand_events_event_id ON demand_events (event_id);
