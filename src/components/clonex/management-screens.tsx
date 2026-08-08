import {
  AlertTriangle,
  Award,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileCheck2,
  Filter,
  HardHat,
  History,
  Smartphone,
  Target,
  Users,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import type { AppData, AuditCategory, Capture, Role } from "@/domain/types";
import { formatDate, formatHours, formatMoney } from "@/lib/formatters";
import {
  approvedMinutes,
  buildGamification,
  buildOperationalActions,
  hasValidConsent,
  memberProjection,
  membersForRole,
} from "@/lib/operations";
import { useAppData } from "@/state/use-app-data";
import { Card, Progress, StatCard, StatusBadge } from "./dashboard-ui";
import { GoalBattery } from "./goal-battery";

export function ConsentKpis({ data, members }: { data: AppData; members: AppData["people"] }) {
  const operating = members.filter(
    (person) =>
      person.active &&
      data.cycles.some((cycle) => cycle.personId === person.id && cycle.status === "ativo"),
  );
  const valid = operating.filter((person) => hasValidConsent(data, person.id));
  return (
    <div className="cx-stats-grid cx-consent-kpis">
      <StatCard
        label="Termos válidos"
        value={String(valid.length)}
        detail="Consentimentos ativos"
        tone="accent"
      />
      <StatCard
        label="Pessoas operando"
        value={String(operating.length)}
        detail="Com ciclo ativo"
      />
      <StatCard
        label="Cobertura real"
        value={`${operating.length ? Math.round((valid.length / operating.length) * 100) : 0}%`}
        detail={`${valid.length} de ${operating.length} pessoas`}
      />
      <StatCard
        label="Sem termo ou vencido"
        value={String(operating.length - valid.length)}
        detail="Exigem intervenção"
        tone="warning"
      />
    </div>
  );
}

export function ActivitiesScreen({
  data,
  role,
  onOpenCapture,
  onOpenPerson,
}: {
  data: AppData;
  role: Exclude<Role, "membro">;
  onOpenCapture(id: string): void;
  onOpenPerson(id: string): void;
}) {
  const { markActivitiesSeen } = useAppData();
  const [tab, setTab] = useState<"actions" | "history">("actions");
  const [team, setTeam] = useState("all");
  const [category, setCategory] = useState<"all" | AuditCategory>("all");
  const [person, setPerson] = useState("all");
  const [period, setPeriod] = useState("30");
  const [targetRole, setTargetRole] = useState("all");
  const [situation, setSituation] = useState("all");
  const members = membersForRole(data, role);
  const ids = new Set(members.map((item) => item.id));
  const actions = buildOperationalActions(data, members).filter(
    (item) =>
      (team === "all" || item.team === team) &&
      (category === "all" || item.category === category) &&
      (person === "all" || item.personId === person) &&
      (situation === "all" || item.status === situation),
  );
  const cutoff = Date.now() - Number(period) * 86_400_000;
  const events = data.auditEvents.filter(
    (event) =>
      (role === "lider" || !event.targetPersonId || ids.has(event.targetPersonId)) &&
      (team === "all" || event.team === team) &&
      (category === "all" || event.category === category) &&
      (person === "all" || event.targetPersonId === person) &&
      (targetRole === "all" || event.actorRole === targetRole) &&
      (period === "all" || new Date(event.occurredAt).getTime() >= cutoff),
  );
  useEffect(() => {
    markActivitiesSeen(role);
  }, [role, markActivitiesSeen]);
  function open(entityId?: string, personId?: string) {
    if (entityId && data.captures.some((item) => item.id === entityId)) onOpenCapture(entityId);
    else if (personId) onOpenPerson(personId);
  }
  return (
    <div className="cx-page-stack">
      <div className="cx-page-heading">
        <div>
          <span className="cx-eyebrow">Central operacional</span>
          <h1>Atividades</h1>
          <p>Ações necessárias e histórico auditado em ordem cronológica.</p>
        </div>
      </div>
      <div className="cx-activity-tabs">
        <button className={tab === "actions" ? "is-active" : ""} onClick={() => setTab("actions")}>
          <AlertTriangle size={17} /> Ações <b>{actions.length}</b>
        </button>
        <button className={tab === "history" ? "is-active" : ""} onClick={() => setTab("history")}>
          <History size={17} /> Histórico <b>{events.length}</b>
        </button>
      </div>
      <Card className="cx-activity-filters">
        <Filter size={17} />
        <select value={team} onChange={(e) => setTeam(e.target.value)}>
          <option value="all">Todas as equipes</option>
          {data.teams.map((item) => (
            <option key={item.id} value={item.name}>
              {item.name} · {data.people.find((person) => person.id === item.supervisorId)?.name}
            </option>
          ))}
        </select>
        <select value={category} onChange={(e) => setCategory(e.target.value as typeof category)}>
          <option value="all">Todas as categorias</option>
          {["captura", "pessoa", "equipamento", "consentimento", "meta", "pagamento", "ciclo"].map(
            (item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ),
          )}
        </select>
        <select value={person} onChange={(e) => setPerson(e.target.value)}>
          <option value="all">Todas as pessoas</option>
          {members.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        {role === "lider" ? (
          <select value={targetRole} onChange={(e) => setTargetRole(e.target.value)}>
            <option value="all">Todos os papéis</option>
            <option value="membro">Membros</option>
            <option value="subleader">Sublíderes</option>
            <option value="lider">Líder geral</option>
          </select>
        ) : null}
        <select value={period} onChange={(e) => setPeriod(e.target.value)}>
          <option value="7">Últimos 7 dias</option>
          <option value="30">Últimos 30 dias</option>
          <option value="90">Últimos 90 dias</option>
          <option value="all">Todo o histórico</option>
        </select>
        {tab === "actions" ? (
          <select value={situation} onChange={(e) => setSituation(e.target.value)}>
            <option value="all">Todas as situações</option>
            <option value="critico">Críticas</option>
            <option value="atencao">Atenção</option>
            <option value="informativo">Informativas</option>
          </select>
        ) : null}
      </Card>
      <div className="cx-activity-list">
        {tab === "actions"
          ? actions.map((item) => (
              <button
                key={item.id}
                className={`is-${item.status}`}
                onClick={() => open(item.entityId, item.personId)}
              >
                <span>
                  <AlertTriangle />
                </span>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.detail}</p>
                  <small>
                    {item.team} · {item.category}
                  </small>
                </div>
                <ChevronRight />
              </button>
            ))
          : events.map((event) => (
              <button key={event.id} onClick={() => open(event.entityId, event.targetPersonId)}>
                <span>
                  <History />
                </span>
                <div>
                  <strong>{event.actorName}</strong>
                  <p>{event.details}</p>
                  <small>
                    {formatDate(event.occurredAt)} · {event.team ?? "Cidade"} · {event.category}
                  </small>
                </div>
                <ChevronRight />
              </button>
            ))}
      </div>
    </div>
  );
}

export function InsightsScreen({
  data,
  onOpenPerson,
}: {
  data: AppData;
  onOpenPerson(id: string): void;
}) {
  const members = membersForRole(data, "subleader");
  const actions = buildOperationalActions(data, members);
  const approved = members.reduce((sum, person) => sum + approvedMinutes(data, person.id), 0);
  const projected = members.reduce(
    (sum, person) => sum + memberProjection(data, person).projection,
    0,
  );
  return (
    <div className="cx-page-stack">
      <div className="cx-page-heading">
        <div>
          <span className="cx-eyebrow">Leitura da operação</span>
          <h1>Insights</h1>
          <p>Riscos, ritmo, projeção, revisões, pagamentos e equipamentos da JF-1.</p>
        </div>
      </div>
      <ConsentKpis data={data} members={members} />
      <div className="cx-stats-grid">
        <StatCard
          label="Horas aprovadas"
          value={formatHours(approved)}
          detail="Base de selos e pagamentos"
          tone="accent"
        />
        <StatCard
          label="Projeção do ciclo"
          value={`${projected.toFixed(1)}h`}
          detail="Mantendo o ritmo atual"
        />
        <StatCard
          label="Revisões pendentes"
          value={String(
            data.captures.filter(
              (item) =>
                item.status === "pendente" && members.some((person) => person.id === item.personId),
            ).length,
          )}
          detail="Precisam de decisão"
          tone="warning"
        />
      </div>
      <div className="cx-insights-grid">
        {actions.map((item) => (
          <button key={item.id} onClick={() => item.personId && onOpenPerson(item.personId)}>
            <AlertTriangle />
            <span>
              <strong>{item.title}</strong>
              <small>{item.detail}</small>
            </span>
            <ChevronRight />
          </button>
        ))}
      </div>
    </div>
  );
}

export function LeaderOverview({
  data,
  onOpenTeam,
}: {
  data: AppData;
  onOpenTeam(team: string): void;
}) {
  const members = data.people.filter((person) => person.role === "membro");
  const approved = members.reduce((sum, person) => sum + approvedMinutes(data, person.id), 0);
  const projection = members.reduce(
    (sum, person) => sum + memberProjection(data, person).projection,
    0,
  );
  const goal = members.reduce(
    (sum, person) =>
      sum +
      (data.cycles.find((cycle) => cycle.personId === person.id && cycle.status === "ativo")
        ?.goalHours ?? person.goalHours),
    0,
  );
  const actions = buildOperationalActions(data, members);
  return (
    <div className="cx-page-stack">
      <div className="cx-page-heading">
        <div>
          <span className="cx-eyebrow">Visão geral da cidade</span>
          <h1>Controle da operação</h1>
          <p>Consolidado gerencial e desempenho de cada Sublíder.</p>
        </div>
      </div>
      <div className="cx-stats-grid cx-leader-kpis">
        <StatCard
          label="Horas aprovadas"
          value={formatHours(approved)}
          detail={`${projection.toFixed(1)}h projetadas`}
          tone="accent"
        />
        <StatCard
          label="Meta somada"
          value={`${goal}h`}
          detail={`${goal ? Math.round((approved / 60 / goal) * 100) : 0}% realizado`}
        />
        <StatCard
          label="Membros full / part"
          value={`${members.filter((p) => p.workload === "full_time").length} / ${members.filter((p) => p.workload === "part_time").length}`}
          detail="Jornadas ativas"
        />
        <StatCard
          label="Equipamentos full / part"
          value={`${data.equipmentAssignments.filter((a) => a.active && a.workload === "full_time").length} / ${data.equipmentAssignments.filter((a) => a.active && a.workload === "part_time").length}`}
          detail="Alocações vigentes"
        />
        <StatCard
          label="Elegíveis 10h"
          value={String(members.filter((p) => approvedMinutes(data, p.id) >= 600).length)}
          detail="Primeiro pagamento"
        />
        <StatCard
          label="Risco abaixo de 60h"
          value={String(actions.filter((a) => a.id.startsWith("retention")).length)}
          detail="Pela projeção atual"
          tone="warning"
        />
      </div>
      <ConsentKpis data={data} members={members} />
      <div className="cx-team-grid">
        {data.teams.map((team) => {
          const teamMembers = members.filter((p) => p.team === team.name);
          const minutes = teamMembers.reduce((sum, p) => sum + approvedMinutes(data, p.id), 0);
          const teamGoal = teamMembers.reduce((sum, p) => sum + p.goalHours, 0);
          const supervisor = data.people.find((p) => p.id === team.supervisorId);
          return (
            <button key={team.id} className="cx-team-card" onClick={() => onOpenTeam(team.name)}>
              <div>
                <span className="cx-avatar">
                  {supervisor?.name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </span>
                <span>
                  <small>Sublíder · {team.name}</small>
                  <strong>{supervisor?.name}</strong>
                </span>
                <ChevronRight />
              </div>
              <GoalBattery minutes={minutes} goalHours={teamGoal} compact />
              <dl>
                <div>
                  <dt>Membros</dt>
                  <dd>{teamMembers.length}</dd>
                </div>
                <div>
                  <dt>Projeção</dt>
                  <dd>
                    {teamMembers
                      .reduce((s, p) => s + memberProjection(data, p).projection, 0)
                      .toFixed(0)}
                    h
                  </dd>
                </div>
                <div>
                  <dt>Termos</dt>
                  <dd>
                    {teamMembers.filter((p) => hasValidConsent(data, p.id)).length}/
                    {teamMembers.length}
                  </dd>
                </div>
              </dl>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function TeamPanel({
  data,
  teamName,
  onClose,
  onOpenPerson,
}: {
  data: AppData;
  teamName: string;
  onClose(): void;
  onOpenPerson(id: string): void;
}) {
  useEffect(() => {
    const close = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [onClose]);
  const team = data.teams.find((item) => item.name === teamName);
  const members = data.people.filter((p) => p.role === "membro" && p.team === teamName);
  const supervisor = data.people.find((p) => p.id === team?.supervisorId);
  const minutes = members.reduce((sum, p) => sum + approvedMinutes(data, p.id), 0);
  const goal = members.reduce((sum, p) => sum + p.goalHours, 0);
  const assignments = data.equipmentAssignments.filter(
    (a) => a.active && members.some((p) => p.id === a.personId),
  );
  return (
    <div className="cx-source-layer" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <section className="cx-source-panel cx-team-panel" role="dialog" aria-modal="true">
        <header className="cx-source-header">
          <span className="cx-source-icon">
            <Users />
          </span>
          <div>
            <span className="cx-eyebrow">Sublíder · {teamName}</span>
            <h2>{supervisor?.name}</h2>
          </div>
          <button onClick={onClose}>
            <X />
          </button>
        </header>
        <div className="cx-source-body">
          <GoalBattery minutes={minutes} goalHours={goal} />
          <div className="cx-team-summary">
            <span>
              <HardHat />{" "}
              {
                assignments.filter(
                  (a) => data.equipment.find((e) => e.id === a.equipmentId)?.type === "capacete",
                ).length
              }{" "}
              capacetes
            </span>
            <span>
              <Smartphone />{" "}
              {
                assignments.filter(
                  (a) => data.equipment.find((e) => e.id === a.equipmentId)?.type === "celular",
                ).length
              }{" "}
              celulares
            </span>
            <span>
              <FileCheck2 /> {members.filter((p) => hasValidConsent(data, p.id)).length}/
              {members.length} termos
            </span>
            <span>
              <Target />{" "}
              {members.reduce((s, p) => s + memberProjection(data, p).projection, 0).toFixed(0)}h
              projetadas
            </span>
          </div>
          <h3>Membros da equipe</h3>
          <div className="cx-team-members">
            {members.map((person) => (
              <button key={person.id} onClick={() => onOpenPerson(person.id)}>
                <span className={`cx-workload is-${person.workload}`}>
                  {person.workload === "full_time" ? "Full time" : "Part time"}
                </span>
                <strong>{person.name}</strong>
                <small>
                  {formatHours(approvedMinutes(data, person.id))} aprovadas ·{" "}
                  {hasValidConsent(data, person.id) ? "termo válido" : "sem termo"}
                </small>
                <ChevronRight />
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export function Gamification({ data, personId }: { data: AppData; personId: string }) {
  const person = data.people.find((p) => p.id === personId);
  if (!person) return null;
  const items = buildGamification(data, person);
  return (
    <Card>
      <div className="cx-card-heading">
        <div>
          <span className="cx-eyebrow">Gamificação individual</span>
          <h2>Selos e desafios</h2>
        </div>
        <Award />
      </div>
      <div className="cx-badges">
        {items
          .filter((i) => i.earned)
          .map((i) => (
            <span key={i.id}>
              <Award />
              <strong>{i.title}</strong>
            </span>
          ))}
      </div>
      <div className="cx-challenges">
        {items
          .filter((i) => !i.earned)
          .slice(0, 4)
          .map((i) => (
            <div key={i.id}>
              <span>
                <strong>{i.title}</strong>
                <small>{i.detail}</small>
              </span>
              <b>{Math.round(i.progress)}%</b>
              <Progress value={i.progress} label="" />
            </div>
          ))}
      </div>
    </Card>
  );
}

export function CaptureDetailPanel({
  data,
  captureId,
  onClose,
}: {
  data: AppData;
  captureId: string;
  onClose(): void;
}) {
  const capture = data.captures.find((c) => c.id === captureId);
  useEffect(() => {
    const close = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [onClose]);
  if (!capture) return null;
  const person = data.people.find((p) => p.id === capture.personId);
  const equipment = data.equipment.find((e) => e.id === capture.equipmentId);
  const events = data.auditEvents.filter(
    (e) => e.entity === "capture" && e.entityId === capture.id,
  );
  return (
    <div className="cx-source-layer" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <section className="cx-source-panel" role="dialog" aria-modal="true">
        <header className="cx-source-header">
          <span className="cx-source-icon">
            <Clock3 />
          </span>
          <div>
            <span className="cx-eyebrow">Captura completa</span>
            <h2>{capture.activity}</h2>
          </div>
          <button onClick={onClose}>
            <X />
          </button>
        </header>
        <div className="cx-source-body">
          <div className="cx-capture-detail-hero">
            <strong>{formatHours(capture.minutes)}</strong>
            <StatusBadge status={capture.status} />
          </div>
          <dl className="cx-source-definition">
            <div>
              <dt>Pessoa e equipe</dt>
              <dd>
                {person?.name} · {person?.team}
              </dd>
            </div>
            <div>
              <dt>Data e horário</dt>
              <dd>{new Date(capture.recordedAt).toLocaleString("pt-BR")}</dd>
            </div>
            <div>
              <dt>Equipamento</dt>
              <dd>
                {equipment?.assetCode} · {equipment?.type} · {equipment?.model}
              </dd>
            </div>
            <div>
              <dt>Revisão</dt>
              <dd>
                {capture.reviewedBy
                  ? `${capture.reviewedBy} · ${capture.reviewedAt ? new Date(capture.reviewedAt).toLocaleString("pt-BR") : ""}`
                  : "Aguardando responsável"}
              </dd>
            </div>
            <div>
              <dt>Referência Minute</dt>
              <dd>
                {capture.minuteReference ??
                  "Preparado para vínculo futuro; vídeo não reproduzido nesta etapa."}
              </dd>
            </div>
          </dl>
          <h3>Histórico</h3>
          <div className="cx-audit-list">
            {events.length ? (
              events.map((e) => (
                <article key={e.id}>
                  <strong>{e.actorName}</strong>
                  <span>{new Date(e.occurredAt).toLocaleString("pt-BR")}</span>
                  <p>{e.details}</p>
                </article>
              ))
            ) : (
              <p>Registro criado em {new Date(capture.recordedAt).toLocaleString("pt-BR")}.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
