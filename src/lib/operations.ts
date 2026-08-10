import type { AppData, AuditCategory, Person } from "@/domain/types";

const DAY = 86_400_000;

export function approvedMinutes(data: AppData, personId: string): number {
  return data.captures
    .filter((capture) => capture.personId === personId && capture.status === "aprovado")
    .reduce((total, capture) => total + capture.minutes, 0);
}

export function hasValidConsent(data: AppData, personId: string, today = new Date()): boolean {
  const date = today.toISOString().slice(0, 10);
  return data.consentRecords.some(
    (record) =>
      record.personId === personId &&
      record.active &&
      (!record.validUntil || record.validUntil >= date),
  );
}

export function memberProjection(data: AppData, person: Person, today = new Date()) {
  const cycle = data.cycles.find((item) => item.personId === person.id && item.status === "ativo");
  const minutes = approvedMinutes(data, person.id);
  const hours = minutes / 60;
  const goal = cycle?.goalHours ?? person.goalHours;
  if (!cycle)
    return { hours, goal, pace: 0, projection: hours, percentage: goal ? (hours / goal) * 100 : 0 };
  const start = new Date(`${cycle.startsAt}T12:00:00`);
  const end = new Date(`${cycle.endsAt}T12:00:00`);
  const elapsed = Math.max(
    1,
    Math.min(
      Math.ceil((today.getTime() - start.getTime()) / DAY) + 1,
      Math.ceil((end.getTime() - start.getTime()) / DAY) + 1,
    ),
  );
  const duration = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / DAY) + 1);
  const pace = hours / elapsed;
  const projection = pace * duration;
  return { hours, goal, pace, projection, percentage: goal ? (hours / goal) * 100 : 0 };
}

export interface GamificationItem {
  id: string;
  title: string;
  detail: string;
  progress: number;
  earned: boolean;
}

export function buildGamification(data: AppData, person: Person): GamificationItem[] {
  const captures = data.captures.filter((item) => item.personId === person.id);
  const approved = captures.filter((item) => item.status === "aprovado");
  const reviewed = captures.filter((item) => item.status !== "pendente");
  const approvedDays = new Set(approved.map((item) => item.recordedAt.slice(0, 10))).size;
  const accessDays = new Set(
    data.accessEvents
      .filter((item) => item.personId === person.id)
      .map((item) => item.accessedAt.slice(0, 10)),
  ).size;
  const progress = memberProjection(data, person);
  const quality = reviewed.length ? (approved.length / reviewed.length) * 100 : 0;
  const hours = progress.hours;
  const item = (id: string, title: string, detail: string, current: number, target: number) => ({
    id,
    title,
    detail,
    progress: Math.min(100, target ? (current / target) * 100 : 0),
    earned: current >= target,
  });
  return [
    item(
      "first-capture",
      "Primeira captura aprovada",
      "Conclua sua primeira revisão com aprovação.",
      approved.length,
      1,
    ),
    item("streak-3", "Constância de 3 dias", "Grave em três dias diferentes.", approvedDays, 3),
    item("streak-7", "Constância de 7 dias", "Grave em sete dias diferentes.", approvedDays, 7),
    item("goal-25", "25% da meta", "Complete um quarto da meta do ciclo.", progress.percentage, 25),
    item("goal-50", "50% da meta", "Complete metade da meta do ciclo.", progress.percentage, 50),
    item("goal-100", "Meta completa", "Alcance 100% da meta do ciclo.", progress.percentage, 100),
    item(
      "quality-90",
      "Qualidade 90%+",
      "Tenha 90% de aprovação em pelo menos 5 revisões.",
      reviewed.length >= 5 ? quality : reviewed.length * 18,
      90,
    ),
    item("access-7", "Presença no app", "Acesse o Clonex em sete dias diferentes.", accessDays, 7),
    item(
      "hours-10",
      "Primeiras 10 horas",
      "Libera elegibilidade para o primeiro pagamento.",
      hours,
      10,
    ),
    item(
      "hours-60",
      "60 horas aprovadas",
      "Mínimo do ciclo para manutenção do equipamento.",
      hours,
      60,
    ),
  ];
}

export interface OperationalAction {
  id: string;
  category: AuditCategory;
  title: string;
  detail: string;
  status: "critico" | "atencao" | "informativo";
  personId?: string;
  team?: string;
  entityId?: string;
}

export function buildOperationalActions(data: AppData, members: Person[]): OperationalAction[] {
  const actions: OperationalAction[] = [];
  for (const person of members.filter((item) => item.active)) {
    const cycle = data.cycles.find(
      (item) => item.personId === person.id && item.status === "ativo",
    );
    if (cycle && !hasValidConsent(data, person.id))
      actions.push({
        id: `consent-${person.id}`,
        category: "consentimento",
        title: "Consentimento pendente",
        detail: `${person.name} opera com ciclo ativo e sem termo válido.`,
        status: "critico",
        personId: person.id,
        team: person.team,
      });
    const projection = memberProjection(data, person);
    if (cycle && projection.projection < 60)
      actions.push({
        id: `retention-${person.id}`,
        category: "meta",
        title: "Risco para manutenção do equipamento",
        detail: `${person.name} projeta ${projection.projection.toFixed(1)}h; o mínimo é 60h.`,
        status: "atencao",
        personId: person.id,
        team: person.team,
      });
    if (projection.hours >= 10 && !data.payments.some((payment) => payment.personId === person.id))
      actions.push({
        id: `payment-${person.id}`,
        category: "pagamento",
        title: "Primeiro pagamento elegível",
        detail: `Sugerir 10h × R$ ${person.hourlyRate.toFixed(2)} para ${person.name}.`,
        status: "informativo",
        personId: person.id,
        team: person.team,
      });
  }
  for (const capture of data.captures.filter((item) => item.status === "pendente")) {
    const person = data.people.find((item) => item.id === capture.personId);
    if (person && members.some((item) => item.id === person.id))
      actions.push({
        id: `review-${capture.id}`,
        category: "captura",
        title: "Captura aguardando revisão",
        detail: `${person.name}: ${capture.activity}.`,
        status: "atencao",
        personId: person.id,
        team: person.team,
        entityId: capture.id,
      });
  }
  for (const request of data.captureChangeRequests.filter((item) => item.status === "pendente")) {
    const capture = data.captures.find((item) => item.id === request.captureId);
    const person = capture && data.people.find((item) => item.id === capture.personId);
    if (person && members.some((item) => item.id === person.id))
      actions.push({
        id: `change-${request.id}`,
        category: "captura",
        title: `Solicitação de ${request.type}`,
        detail: `${person.name}: ${request.reason}`,
        status: "atencao",
        personId: person.id,
        team: person.team,
        entityId: capture.id,
      });
  }
  for (const triage of data.memberTriages.filter((item) => item.status === "pendente")) {
    const person = data.people.find((item) => item.id === triage.personId);
    if (person && members.some((item) => item.id === person.id))
      actions.push({
        id: `triage-${triage.id}`,
        category: "pessoa",
        title: "Triagem de 10h pendente",
        detail: `Defina a continuidade de ${person.name}.`,
        status: "atencao",
        personId: person.id,
        team: person.team,
      });
  }
  for (const team of data.teams.filter((item) => !item.supervisorId))
    actions.push({
      id: `team-${team.id}`,
      category: "pessoa",
      title: "Equipe sem Sublíder",
      detail: `${team.name} está explicitamente sem responsável.`,
      status: "critico",
      team: team.name,
    });
  return actions;
}

export function membersForRole(
  data: AppData,
  role: "subleader" | "lider",
  teamValue?: string,
): Person[] {
  if (role === "lider")
    return data.people.filter((person) => person.role === "membro" && !person.archivedAt);
  return data.people.filter(
    (person) =>
      person.role === "membro" &&
      !person.archivedAt &&
      (person.teamId === teamValue || person.team === teamValue),
  );
}
