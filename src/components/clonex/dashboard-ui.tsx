import type { ReactNode } from "react";

import type { CaptureStatus, EquipmentStatus } from "@/domain/types";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`cx-card ${className}`}>{children}</section>;
}

export function StatCard({
  label,
  value,
  detail,
  tone = "default",
}: {
  label: string;
  value: string;
  detail: string;
  tone?: "default" | "accent" | "warning";
}) {
  return (
    <Card className={`cx-stat cx-stat--${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{detail}</small>
    </Card>
  );
}

export function StatusBadge({
  status,
}: {
  status: CaptureStatus | EquipmentStatus | "pago" | "previsto";
}) {
  const labels: Record<string, string> = {
    aprovado: "Aprovado",
    pendente: "Pendente",
    reprovado: "Reprovado",
    disponivel: "Disponível",
    em_uso: "Em uso",
    manutencao: "Manutenção",
    pago: "Pago",
    previsto: "Previsto",
  };
  return <span className={`cx-badge cx-badge--${status}`}>{labels[status]}</span>;
}

export function Progress({ value, label }: { value: number; label: string }) {
  const safeValue = Math.min(100, Math.max(0, value));
  return (
    <div className="cx-progress-block">
      <div className="cx-progress-label">
        <span>{label}</span>
        <strong>{Math.round(safeValue)}%</strong>
      </div>
      <div className="cx-progress" aria-label={`${label}: ${Math.round(safeValue)}%`}>
        <span style={{ width: `${safeValue}%` }} />
      </div>
    </div>
  );
}

export function EmptyState({ children }: { children: ReactNode }) {
  return <div className="cx-empty">{children}</div>;
}
