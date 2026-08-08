import { BatteryCharging } from "lucide-react";

import { formatHours } from "@/lib/formatters";

export function GoalBattery({
  minutes,
  goalHours,
  compact = false,
}: {
  minutes: number;
  goalHours: number;
  compact?: boolean;
}) {
  const percentage = goalHours > 0 ? (minutes / 60 / goalHours) * 100 : 0;
  const fill = Math.min(100, Math.max(0, percentage));
  return (
    <div className={`cx-battery ${compact ? "is-compact" : ""}`}>
      <div className="cx-battery-heading">
        <span>
          <BatteryCharging size={18} /> Progresso do ciclo
        </span>
        <strong>{Math.round(percentage)}%</strong>
      </div>
      <div
        className="cx-battery-shell"
        aria-label={`${formatHours(minutes)} de ${goalHours} horas, ${Math.round(percentage)}%`}
      >
        <span style={{ width: `${fill}%` }} />
      </div>
      <small>
        {formatHours(minutes)} de {goalHours}h
      </small>
    </div>
  );
}
