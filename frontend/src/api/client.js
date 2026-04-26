import { MOCK_EVENTS, MOCK_DEMAND_EVENTS } from "./mockData";

// Flip to false when the backend is live
const USE_MOCK = true;

const BASE = "/api";

async function get(path) {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`API error ${res.status}: ${path}`);
  return res.json();
}

export async function fetchEvents() {
  if (USE_MOCK) return MOCK_EVENTS;
  return get("/ingestion/events");
}

export async function fetchDemandEvents() {
  if (USE_MOCK) return MOCK_DEMAND_EVENTS;
  // demand events come embedded in /transport/schedule when backend is wired
  return get("/transport/schedule");
}

export async function fetchHotspots() {
  if (USE_MOCK) return [];
  const data = await get("/taxi/hotspots");
  return data.hotspots;
}
