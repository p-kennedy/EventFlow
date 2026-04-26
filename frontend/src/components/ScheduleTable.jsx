import PressureBadge from "./PressureBadge";
import styles from "./ScheduleTable.module.css";
import { fmtTime, fmtNum } from "../utils/format";

export default function ScheduleTable({ events, demandMap }) {
  const sorted = [...events].sort(
    (a, b) => new Date(a.start_time) - new Date(b.start_time)
  );

  if (sorted.length === 0) {
    return <div className={styles.empty}>No events scheduled.</div>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerRow}>
        <span>Time</span>
        <span>Event</span>
        <span>Venue</span>
        <span>Attendance</span>
        <span>Radius</span>
        <span>Pressure</span>
      </div>
      {sorted.map((ev) => {
        const d = demandMap[ev.id];
        return (
          <div key={ev.id} className={styles.row}>
            <span className={styles.time}>{fmtTime(ev.start_time)}</span>
            <span className={styles.eventName}>{ev.name}</span>
            <span className={styles.venue}>{ev.venue_name}</span>
            <span className={styles.stat}>
              {ev.expected_attendance ? fmtNum(ev.expected_attendance) : "—"}
            </span>
            <span className={styles.stat}>
              {d ? `${d.demand_radius_km} km` : "—"}
            </span>
            <span>
              {d ? <PressureBadge pressure={d.transport_pressure} /> : "—"}
            </span>
          </div>
        );
      })}
    </div>
  );
}
