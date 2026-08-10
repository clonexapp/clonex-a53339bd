import {
  eachDayOfInterval,
  endOfMonth,
  format,
  isWeekend,
  isWithinInterval,
  startOfMonth,
  startOfWeek,
} from "date-fns";

import type {
  AppData,
  Capture,
  MetricHistoryItem,
  MetricSource,
  ReportPeriod,
  ReportScope,
} from "@/domain/types";
import { formatHours } from "@/lib/formatters";

function percentage(value: number, total: number) {
  return total > 0 ? Math.round((value / total) * 100) : 0;
}

function referenceDate(data: AppData) {
  const timestamps = data.captures.map((capture) => new Date(capture.recordedAt).getTime());
  return new Date(timestamps.length ? Math.max(...timestamps) : Date.now());
}

function personMatchesScope(person: AppData["people"][number], scope: ReportScope) {
  if (scope.kind === "person") return person.id === scope.value;
  if (scope.kind === "team") return person.teamId === scope.value || person.team === scope.value;
  if (scope.kind === "city") return person.city === scope.value;
  if (scope.kind === "state") return person.state === scope.value;
  if (scope.kind === "region") return person.region === scope.value;
  return scope.kind === "country";
}

function scopePeople(data: AppData, scope: ReportScope) {
  return data.people.filter(
    (person) =>
      person.role === "membro" &&
      person.active &&
      !person.archivedAt &&
      personMatchesScope(person, scope),
  );
}

function reportInterval(data: AppData, period: ReportPeriod) {
  const end = referenceDate(data);
  const start = period === "week" ? startOfWeek(end, { weekStartsOn: 1 }) : startOfMonth(end);
  const projectedEnd =
    period === "week" ? new Date(start.getTime() + 6 * 86_400_000) : endOfMonth(end);
  return { start, end, projectedEnd };
}

function businessDays(start: Date, end: Date) {
  return eachDayOfInterval({ start, end }).filter((day) => !isWeekend(day)).length;
}

function capturesInScope(data: AppData, scope: ReportScope, period: ReportPeriod) {
  const ids = new Set(scopePeople(data, scope).map((person) => person.id));
  const interval = reportInterval(data, period);
  return data.captures.filter(
    (capture) =>
      ids.has(capture.personId) &&
      isWithinInterval(new Date(capture.recordedAt), { start: interval.start, end: interval.end }),
  );
}

function latestUpdate(captures: Capture[]) {
  const dates = captures.flatMap((capture) =>
    [capture.recordedAt, capture.reviewedAt].filter(Boolean),
  );
  if (!dates.length) return "Sem registros no período";
  const latest = new Date(Math.max(...dates.map((date) => new Date(date!).getTime())));
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(latest);
}

function personCaptureHistory(
  data: AppData,
  captures: Capture[],
  valueFor: (
    personCaptures: Capture[],
    personId: string,
  ) => Pick<MetricHistoryItem, "value" | "percentage" | "summary">,
) {
  const peopleById = new Map(data.people.map((person) => [person.id, person]));
  return [...new Set(captures.map((capture) => capture.personId))]
    .map((personId) => {
      const items = captures.filter((capture) => capture.personId === personId);
      const person = peopleById.get(personId);
      const value = valueFor(items, personId);
      return {
        id: `history-${personId}`,
        personId,
        actorName: person?.name ?? "Pessoa removida",
        occurredAt: items[0]?.recordedAt ?? new Date().toISOString(),
        captureIds: items.map((capture) => capture.id),
        ...value,
      } satisfies MetricHistoryItem;
    })
    .sort((a, b) => b.occurredAt.localeCompare(a.occurredAt));
}

function quantityMetric(data: AppData, scope: ReportScope, period: ReportPeriod): MetricSource {
  const people = scopePeople(data, scope);
  const captures = capturesInScope(data, scope, period);
  const minutes = captures.reduce((sum, capture) => sum + capture.minutes, 0);
  const targetHours =
    people.reduce((sum, person) => sum + person.goalHours, 0) / (period === "week" ? 4 : 1);
  const targetMinutes = targetHours * 60;
  return {
    metric: "quantity",
    title: "Quantidade",
    value: formatHours(minutes),
    actual: `${formatHours(minutes)} de ${Math.round(targetHours)}h`,
    percentage: percentage(minutes, targetMinutes),
    formula: "Horas registradas ÷ meta do período",
    origin: "Soma das capturas registradas no Clonex pelas pessoas do escopo.",
    updatedAt: latestUpdate(captures),
    history: personCaptureHistory(data, captures, (items, personId) => {
      const personMinutes = items.reduce((sum, capture) => sum + capture.minutes, 0);
      const person = data.people.find((candidate) => candidate.id === personId);
      const personTarget = (person?.goalHours ?? 0) / (period === "week" ? 4 : 1);
      return {
        summary: `${items.length} captura${items.length === 1 ? "" : "s"} contribuíram para o total`,
        value: `${formatHours(personMinutes)} de ${Math.round(personTarget)}h`,
        percentage: percentage(personMinutes, personTarget * 60),
      };
    }),
  };
}

function predictabilityMetric(
  data: AppData,
  scope: ReportScope,
  period: ReportPeriod,
): MetricSource {
  const people = scopePeople(data, scope);
  const captures = capturesInScope(data, scope, period);
  const { start, end, projectedEnd } = reportInterval(data, period);
  const elapsedDays = Math.max(1, businessDays(start, end));
  const totalDays = Math.max(elapsedDays, businessDays(start, projectedEnd));
  const monthlyTarget = people.reduce((sum, person) => sum + person.goalHours, 0);
  const targetHours = monthlyTarget / (period === "week" ? 4 : 1);
  const actualHours = captures.reduce((sum, capture) => sum + capture.minutes, 0) / 60;
  const projectedHours = (actualHours / elapsedDays) * totalDays;
  const history = people.map((person) => {
    const items = captures.filter((capture) => capture.personId === person.id);
    const days = new Set(items.map((capture) => format(new Date(capture.recordedAt), "yyyy-MM-dd")))
      .size;
    const weeksElapsed = Math.max(1, Math.ceil(elapsedDays / 5));
    const expectedDays = Math.min(elapsedDays, person.targetDaysPerWeek * weeksElapsed);
    return {
      id: `predictability-${person.id}`,
      personId: person.id,
      actorName: person.name,
      summary: `${days} dias com captura de ${expectedDays} esperados`,
      value: `${days}/${expectedDays} dias`,
      percentage: percentage(days, expectedDays),
      occurredAt: items[0]?.recordedAt ?? end.toISOString(),
      captureIds: items.map((capture) => capture.id),
    } satisfies MetricHistoryItem;
  });
  const onPace = history.filter((item) => (item.percentage ?? 0) >= 80).length;
  return {
    metric: "predictability",
    title: "Previsibilidade",
    value: `${onPace} de ${people.length}`,
    actual: `${onPace} ${onPace === 1 ? "pessoa" : "pessoas"} no ritmo`,
    percentage: percentage(onPace, people.length),
    formula: "Pessoas com presença em pelo menos 80% dos dias esperados",
    origin: "Dias distintos com pelo menos uma captura registrada por pessoa.",
    updatedAt: latestUpdate(captures),
    history,
    secondary: {
      label: "Projeção até o fim do período",
      value: `${Math.round(projectedHours)}h de ${Math.round(targetHours)}h`,
      percentage: percentage(projectedHours, targetHours),
    },
  };
}

function qualityMetric(data: AppData, scope: ReportScope, period: ReportPeriod): MetricSource {
  const captures = capturesInScope(data, scope, period);
  const reviewed = captures.filter((capture) => capture.status !== "pendente");
  const approved = reviewed.filter((capture) => capture.status === "aprovado");
  const rejected = reviewed.filter((capture) => capture.status === "reprovado");
  const pending = captures.filter((capture) => capture.status === "pendente");
  return {
    metric: "quality",
    title: "Qualidade",
    value: `${percentage(approved.length, reviewed.length)}%`,
    actual: `${approved.length} de ${reviewed.length} revisadas aprovadas`,
    percentage: percentage(approved.length, reviewed.length),
    formula: "Capturas aprovadas ÷ capturas revisadas",
    origin: "Status de revisão registrado por sublíderes e líder geral.",
    updatedAt: latestUpdate(captures),
    history: personCaptureHistory(data, captures, (items) => {
      const personReviewed = items.filter((capture) => capture.status !== "pendente");
      const personApproved = personReviewed.filter((capture) => capture.status === "aprovado");
      const personPending = items.filter((capture) => capture.status === "pendente").length;
      return {
        summary: `${personApproved.length} aprovadas, ${personReviewed.length - personApproved.length} reprovadas e ${personPending} pendentes`,
        value: `${personApproved.length}/${personReviewed.length} aprovadas`,
        percentage: percentage(personApproved.length, personReviewed.length),
      };
    }),
    secondary: {
      label: "Aguardando revisão",
      value: `${pending.length} captura${pending.length === 1 ? "" : "s"}`,
      percentage: percentage(pending.length, captures.length),
    },
  };
}

export function buildReportMetrics(
  data: AppData,
  scope: ReportScope,
  period: ReportPeriod,
): [MetricSource, MetricSource, MetricSource] {
  return [
    quantityMetric(data, scope, period),
    predictabilityMetric(data, scope, period),
    qualityMetric(data, scope, period),
  ];
}

export function buildActivePeopleSource(data: AppData, scope: ReportScope): MetricSource {
  const people = scopePeople(data, scope);
  const allPeople = data.people.filter(
    (person) => person.role === "membro" && !person.archivedAt && personMatchesScope(person, scope),
  );
  return {
    metric: "active_people",
    title: "Pessoas ativas",
    value: String(people.length),
    actual: `${people.length} de ${allPeople.length} pessoas cadastradas`,
    percentage: percentage(people.length, allPeople.length),
    formula: "Pessoas com vínculo ativo ÷ pessoas cadastradas",
    origin: "Cadastro local de participantes e situação atual do vínculo.",
    updatedAt: "Atualizado com o cadastro da equipe",
    history: allPeople.map((person) => ({
      id: `person-${person.id}`,
      personId: person.id,
      actorName: person.name,
      summary: `${person.team} · ${person.city}`,
      value: person.active ? "Ativo" : "Inativo",
      percentage: person.active ? 100 : 0,
      occurredAt: referenceDate(data).toISOString(),
      captureIds: data.captures
        .filter((capture) => capture.personId === person.id)
        .map((capture) => capture.id),
    })),
  };
}

export function buildPendingReviewsSource(
  data: AppData,
  scope: ReportScope,
  period: ReportPeriod,
): MetricSource {
  const captures = capturesInScope(data, scope, period);
  const pending = captures.filter((capture) => capture.status === "pendente");
  return {
    metric: "pending_reviews",
    title: "Capturas aguardando revisão",
    value: String(pending.length),
    actual: `${pending.length} de ${captures.length} capturas`,
    percentage: percentage(pending.length, captures.length),
    formula: "Capturas pendentes ÷ capturas registradas",
    origin: "Fila de revisão da equipe no período selecionado.",
    updatedAt: latestUpdate(captures),
    history: personCaptureHistory(data, pending, (items) => ({
      summary: "Registros ainda sem decisão de qualidade",
      value: `${items.length} pendente${items.length === 1 ? "" : "s"}`,
      percentage: percentage(items.length, pending.length),
    })),
  };
}

export function reportScopeFor(
  role: "subleader" | "lider",
  teamValue = "Equipe Pedro",
): ReportScope {
  return role === "subleader"
    ? { kind: "team", value: teamValue }
    : { kind: "country", value: "Brasil" };
}

export function formatReportText(
  metrics: MetricSource[],
  scope: ReportScope,
  period: ReportPeriod,
) {
  const label = period === "week" ? "Semana" : "Mês";
  return [
    `Clonex · Relatório ${label} · ${scope.value}`,
    ...metrics.map((metric) => `${metric.title}: ${metric.actual} (${metric.percentage}%)`),
    `Gerado a partir dos registros locais do Clonex.`,
  ].join("\n");
}
