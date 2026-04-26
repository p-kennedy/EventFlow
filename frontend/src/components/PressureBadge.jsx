import styles from "./PressureBadge.module.css";

const LABELS = {
  low: "Low",
  medium: "Medium",
  high: "High",
  critical: "Critical",
};

export default function PressureBadge({ pressure }) {
  return (
    <span className={`${styles.badge} ${styles[pressure]}`}>
      {LABELS[pressure] ?? pressure}
    </span>
  );
}
