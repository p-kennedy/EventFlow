import { useState, useEffect } from "react";
import MetricCard from "../components/MetricCard";
import EventCard from "../components/EventCard";
import ScheduleTable from "../components/ScheduleTable";
import { useDashboardData } from "../hooks/useDashboardData";
import { fmtNum, fmtLiveTime } from "../utils/format";
import styles from "./Dashboard.module.css";

const PRESSURE_ORDER = { critical: 0, high: 1, medium: 2, low: 3 };

export default function Dashboard() {
  const { events, demandMap, loading, error, refresh, metrics } =
    useDashboardData();
  const [now, setNow] = useState(fmtLiveTime());
  const [view, setView] = useState("cards"); // "cards" | "schedule"

  // Tick the clock
  useEffect(() => {
    const id = setInterval(() => setNow(fmtLiveTime()), 30_000);
    return () => clearInterval(id);
  }, []);

  const sortedEvents = [...events].sort((a, b) => {
    const pa = demandMap[a.id]?.transport_pressure ?? "low";
    const pb = demandMap[b.id]?.transport_pressure ?? "low";
    if (PRESSURE_ORDER[pa] !== PRESSURE_ORDER[pb])
      return PRESSURE_ORDER[pa] - PRESSURE_ORDER[pb];
    return new Date(a.start_time) - new Date(b.start_time);
  });

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>City Dashboard</h1>
          <span className={styles.subtitle}>Transport pressure overview</span>
        </div>
        <div className={styles.headerRight}>
          <span className={styles.clock}>{now}</span>
          <button
            className={styles.refreshBtn}
            onClick={refresh}
            disabled={loading}
            aria-label="Refresh data"
          >
            {loading ? "↻" : "↺"} Refresh
          </button>
        </div>
      </header>

      {/* Error banner */}
      {error && (
        <div className={styles.errorBanner} role="alert">
          Failed to load data: {error}
          <button onClick={refresh} className={styles.retryBtn}>
            Retry
          </button>
        </div>
      )}

      {/* Metrics */}
      <section className={styles.metrics} aria-label="Summary metrics">
        <MetricCard
          label="Active events"
          value={loading ? "…" : metrics.activeEvents}
          sub="today"
        />
        <MetricCard
          label="Expected crowd"
          value={loading ? "…" : fmtNum(metrics.totalCrowd)}
          sub="across all venues"
        />
        <MetricCard
          label="High pressure"
          value={loading ? "…" : metrics.criticalCount}
          sub="critical + high events"
          accent={metrics.criticalCount > 0 ? "#a32d2d" : undefined}
        />
        <MetricCard
          label="Avg demand radius"
          value={loading ? "…" : metrics.avgRadius ? `${metrics.avgRadius} km` : "—"}
          sub="transport coverage"
        />
      </section>

      {/* View toggle + Events section */}
      <section className={styles.eventsSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            {view === "cards" ? "Upcoming Events" : "Today's Schedule"}
          </h2>
          <div className={styles.toggleGroup} role="group" aria-label="View mode">
            <button
              className={`${styles.toggle} ${view === "cards" ? styles.toggleActive : ""}`}
              onClick={() => setView("cards")}
            >
              Cards
            </button>
            <button
              className={`${styles.toggle} ${view === "schedule" ? styles.toggleActive : ""}`}
              onClick={() => setView("schedule")}
            >
              Schedule
            </button>
          </div>
        </div>

        {loading && (
          <div className={styles.loadingState}>
            Loading events…
          </div>
        )}

        {!loading && events.length === 0 && !error && (
          <div className={styles.emptyState}>
            No events found. Add events via the ingestion API.
          </div>
        )}

        {!loading && view === "cards" && events.length > 0 && (
          <div className={styles.cardsGrid}>
            {sortedEvents.map((ev) => (
              <EventCard
                key={ev.id}
                event={ev}
                demand={demandMap[ev.id] ?? null}
              />
            ))}
          </div>
        )}

        {!loading && view === "schedule" && events.length > 0 && (
          <ScheduleTable events={events} demandMap={demandMap} />
        )}
      </section>
    </div>
  );
}
