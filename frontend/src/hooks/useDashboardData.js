import { useState, useEffect, useCallback } from "react";
import { fetchEvents, fetchDemandEvents } from "../api/client";

export function useDashboardData() {
  const [events, setEvents] = useState([]);
  const [demandEvents, setDemandEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [evts, demand] = await Promise.all([
        fetchEvents(),
        fetchDemandEvents(),
      ]);
      setEvents(evts);
      setDemandEvents(demand);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    // Poll every 60s when backend is live — harmless against mock
    const interval = setInterval(load, 60_000);
    return () => clearInterval(interval);
  }, [load]);

  // Build a quick lookup: event_id → demand
  const demandMap = Object.fromEntries(
    demandEvents.map((d) => [d.event_id, d])
  );

  // Derived metrics
  const totalCrowd = demandEvents.reduce(
    (sum, d) => sum + d.crowd_size_estimate,
    0
  );
  const criticalCount = demandEvents.filter(
    (d) => d.transport_pressure === "critical" || d.transport_pressure === "high"
  ).length;
  const avgRadius =
    demandEvents.length > 0
      ? (
          demandEvents.reduce((sum, d) => sum + d.demand_radius_km, 0) /
          demandEvents.length
        ).toFixed(1)
      : null;

  return {
    events,
    demandMap,
    loading,
    error,
    refresh: load,
    metrics: {
      activeEvents: events.length,
      totalCrowd,
      criticalCount,
      avgRadius,
    },
  };
}
