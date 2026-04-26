import PressureBadge from "./PressureBadge";
import styles from "./EventCard.module.css";
import { fmtTime, fmtShortDate, fmtNum } from "../utils/format";

export default function EventCard({ event, demand }) {
  const pressure = demand?.transport_pressure ?? "low";

  return (
    <div className={`${styles.card} ${styles[pressure]}`}>
      <div className={styles.header}>
        <div className={styles.name}>{event.name}</div>
        <PressureBadge pressure={pressure} />
      </div>

      <div className={styles.venue}>{event.venue_name}</div>

      <div className={styles.footer}>
        <span className={styles.time}>
          {fmtShortDate(event.start_time)} · {fmtTime(event.start_time)}
        </span>
        {event.expected_attendance && (
          <span className={styles.crowd}>
            {fmtNum(event.expected_attendance)} attending
          </span>
        )}
      </div>

      {demand && (
        <div className={styles.dispersal}>
          <span className={styles.dispersalLabel}>Peak dispersal</span>
          <span>
            {fmtTime(demand.peak_dispersal_start)}–{fmtTime(demand.peak_dispersal_end)}
          </span>
          <span className={styles.radius}>{demand.demand_radius_km} km radius</span>
        </div>
      )}
    </div>
  );
}
