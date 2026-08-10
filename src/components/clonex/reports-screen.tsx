import { BadgeCheck, CalendarClock, Check, ChevronRight, Copy, Database } from "lucide-react";
import { useMemo, useState } from "react";

import type { AppData, MetricSource, ReportPeriod, Role } from "@/domain/types";
import { buildReportMetrics, formatReportText, reportScopeFor } from "@/lib/reporting";
import { Card, Progress } from "./dashboard-ui";
import { useAppData } from "@/state/use-app-data";

const METRIC_ICONS = {
  quantity: Database,
  predictability: CalendarClock,
  quality: BadgeCheck,
};

async function copyText(value: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }
  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

export function ReportsScreen({
  data,
  role,
  onOpenSource,
}: {
  data: AppData;
  role: Exclude<Role, "membro">;
  onOpenSource(source: MetricSource): void;
}) {
  const { activeAccount } = useAppData();
  const [period, setPeriod] = useState<ReportPeriod>("week");
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");
  const team = data.teams.find((item) => item.id === activeAccount?.teamId);
  const scope = useMemo(() => reportScopeFor(role, team?.name), [role, team?.name]);
  const metrics = useMemo(() => buildReportMetrics(data, scope, period), [data, period, scope]);
  const teams = useMemo(
    () =>
      role === "lider"
        ? [
            ...new Set(
              data.people.filter((person) => person.role === "membro").map((person) => person.team),
            ),
          ]
        : [],
    [data.people, role],
  );

  async function handleCopy() {
    try {
      const forecasts =
        role === "lider"
          ? data.teams.flatMap((item) => {
              const forecast = data.weeklyForecasts.find((entry) => entry.teamId === item.id);
              return forecast
                ? [
                    `${item.name}: ${forecast.expectedPeople} novas pessoas/negócios, ${forecast.expectedHours}h. ${forecast.notes || ""}`,
                  ]
                : [];
            })
          : data.weeklyForecasts
              .filter((item) => item.teamId === team?.id)
              .map(
                (forecast) =>
                  `${forecast.expectedPeople} novas pessoas/negócios, ${forecast.expectedHours}h. ${forecast.notes || ""}`,
              );
      await copyText(
        `${formatReportText(metrics, scope, period)}${forecasts.length ? `\nExpectativa semanal:\n${forecasts.join("\n")}` : ""}`,
      );
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    }
    window.setTimeout(() => setCopyStatus("idle"), 2200);
  }

  return (
    <div className="cx-page-stack">
      <div className="cx-report-heading">
        <div>
          <span className="cx-eyebrow">
            {role === "lider" ? "Cidade · Juiz de Fora" : `Minha equipe · ${team?.name ?? "—"}`}
          </span>
          <h1>Relatórios</h1>
          <p>Quantidade, constância e qualidade com origem verificável.</p>
        </div>
        <div className="cx-report-actions">
          <div className="cx-period-switch" aria-label="Período do relatório">
            <button
              className={period === "week" ? "is-active" : ""}
              onClick={() => setPeriod("week")}
            >
              Semana
            </button>
            <button
              className={period === "month" ? "is-active" : ""}
              onClick={() => setPeriod("month")}
            >
              Mês
            </button>
          </div>
          <button className="cx-button cx-button--ghost" onClick={() => void handleCopy()}>
            {copyStatus === "copied" ? <Check size={17} /> : <Copy size={17} />}
            {copyStatus === "copied"
              ? "Copiado"
              : copyStatus === "failed"
                ? "Tente novamente"
                : "Copiar relatório"}
          </button>
        </div>
      </div>

      <div className="cx-report-grid">
        {metrics.map((metric) => {
          const Icon = METRIC_ICONS[metric.metric as keyof typeof METRIC_ICONS];
          return (
            <button
              className={`cx-report-card cx-report-card--${metric.metric}`}
              key={metric.metric}
              onClick={() => onOpenSource(metric)}
              aria-label={`Abrir origem e histórico de ${metric.title}`}
            >
              <div className="cx-report-card-top">
                <span className="cx-report-icon">
                  <Icon size={18} />
                </span>
                <span className="cx-eyebrow">{metric.title}</span>
                <ChevronRight size={17} />
              </div>
              <strong>{metric.value}</strong>
              <p>{metric.actual}</p>
              <Progress value={metric.percentage} label="Resultado do período" />
              {metric.secondary ? (
                <div className="cx-report-secondary">
                  <span>{metric.secondary.label}</span>
                  <strong>{metric.secondary.value}</strong>
                  <b>{metric.secondary.percentage}%</b>
                </div>
              ) : null}
              <small>Toque para ver origem, pessoas e registros.</small>
            </button>
          );
        })}
      </div>

      {role === "lider" ? (
        <Card>
          <div className="cx-card-heading">
            <div>
              <span className="cx-eyebrow">Comparação</span>
              <h2>Ritmo por equipe</h2>
            </div>
            <span className="cx-cycle">{period === "week" ? "Semana" : "Mês"}</span>
          </div>
          <div className="cx-team-report-list">
            {teams.map((team) => {
              const teamMetric = buildReportMetrics(data, { kind: "team", value: team }, period)[0];
              return (
                <button key={team} onClick={() => onOpenSource(teamMetric)}>
                  <div>
                    <strong>{team}</strong>
                    <span>{teamMetric.actual}</span>
                  </div>
                  <b>{teamMetric.percentage}%</b>
                  <ChevronRight size={17} />
                </button>
              );
            })}
          </div>
        </Card>
      ) : null}
    </div>
  );
}
