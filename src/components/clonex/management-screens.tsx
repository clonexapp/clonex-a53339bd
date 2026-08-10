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
import { createPortal } from "react-dom";

import type {
  AccessAccount,
  AppData,
  AuditCategory,
  Capture,
  Equipment,
  GeographicRegion,
  Role,
} from "@/domain/types";
import { formatDate, formatHours, formatMoney } from "@/lib/formatters";
import { BRAZIL_STATES, GEOGRAPHIC_REGIONS, regionForState } from "@/lib/locations";
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
  const { activeAccount, markActivitiesSeen } = useAppData();
  const [tab, setTab] = useState<"actions" | "history">("actions");
  const [team, setTeam] = useState("all");
  const [category, setCategory] = useState<"all" | AuditCategory>("all");
  const [person, setPerson] = useState("all");
  const [period, setPeriod] = useState("30");
  const [targetRole, setTargetRole] = useState("all");
  const [situation, setSituation] = useState("all");
  const members = membersForRole(data, role, activeAccount?.teamId);
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
  const { activeAccount } = useAppData();
  const members = membersForRole(data, "subleader", activeAccount?.teamId);
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
          <p>Riscos, ritmo, projeção, revisões, pagamentos e equipamentos da sua equipe.</p>
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
  const members = data.people.filter((person) => person.role === "membro" && !person.archivedAt);
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
          <span className="cx-eyebrow">Visão geral nacional</span>
          <h1>Controle da operação</h1>
          <p>Consolidado por região, estado, cidade, equipe e Sublíder.</p>
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

function SupervisorAccountDialog({
  account,
  data,
  onClose,
}: {
  account?: AccessAccount;
  data: AppData;
  onClose(): void;
}) {
  const { saveSupervisor } = useAppData();
  const accountTeam = data.teams.find((team) => team.id === account?.teamId);
  const [teamChoice, setTeamChoice] = useState(accountTeam?.id ?? "__new__");
  const [state, setState] = useState(accountTeam?.state ?? "MG");
  const [region, setRegion] = useState<GeographicRegion>(
    accountTeam?.region ?? regionForState(accountTeam?.state ?? "MG"),
  );
  const [city, setCity] = useState(accountTeam?.city ?? "Juiz de Fora");
  const isNewTeam = teamChoice === "__new__";

  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className="cx-dialog-backdrop cx-supervisor-account-backdrop"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <section
        className="cx-dialog cx-operation-dialog cx-supervisor-account-dialog"
        role="dialog"
        aria-modal="true"
        aria-label={account ? "Editar Sublíder" : "Novo Sublíder"}
      >
        <button className="cx-dialog-close" onClick={onClose} aria-label="Fechar">
          ×
        </button>
        <span className="cx-eyebrow">Conta operacional</span>
        <h2>{account ? "Editar Sublíder" : "Novo Sublíder"}</h2>
        <form
          className="cx-operation-form"
          onSubmit={(event) => {
            event.preventDefault();
            const form = new FormData(event.currentTarget);
            const email = String(form.get("email")).trim().toLowerCase();
            const teamName = String(form.get("teamName") ?? "").trim();
            if (
              data.accounts.some(
                (item) => item.id !== account?.id && item.email.toLowerCase() === email,
              )
            ) {
              window.alert("Já existe uma conta com este e-mail.");
              return;
            }
            if (
              isNewTeam &&
              data.teams.some((team) => team.name.toLowerCase() === teamName.toLowerCase())
            ) {
              window.alert("Já existe uma equipe com este nome.");
              return;
            }
            const selectedTeam = data.teams.find((team) => team.id === teamChoice);
            if (selectedTeam?.supervisorId && selectedTeam.supervisorId !== account?.personId) {
              window.alert(
                "Esta equipe já possui um Sublíder responsável. Edite a conta atual ou crie outra equipe.",
              );
              return;
            }
            saveSupervisor({
              ...(account ? { accountId: account.id } : {}),
              ...(account?.personId ? { personId: account.personId } : {}),
              name: String(form.get("name")),
              email,
              ...(isNewTeam ? { teamName } : { teamId: teamChoice }),
              region,
              state,
              city,
              status: String(form.get("status")) as "pendente" | "ativa" | "desativada",
            });
            onClose();
          }}
        >
          <div className="cx-form-grid">
            <label>
              Nome
              <input name="name" defaultValue={account?.name} required />
            </label>
            <label>
              E-mail único
              <input name="email" type="email" defaultValue={account?.email} required />
            </label>
            <label>
              Equipe
              <select
                value={teamChoice}
                onChange={(event) => {
                  const choice = event.target.value;
                  setTeamChoice(choice);
                  const team = data.teams.find((item) => item.id === choice);
                  if (team) {
                    setState(team.state ?? "MG");
                    setRegion(team.region ?? regionForState(team.state ?? "MG"));
                    setCity(team.city);
                  }
                }}
              >
                {data.teams.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.name} · {team.state ?? "MG"}
                  </option>
                ))}
                <option value="__new__">+ Criar nova equipe</option>
              </select>
            </label>
            {isNewTeam ? (
              <label>
                Nome da nova equipe
                <input name="teamName" placeholder="Ex.: Equipe Recife" required />
              </label>
            ) : null}
            <label>
              Região
              <select
                value={region}
                onChange={(event) => setRegion(event.target.value as GeographicRegion)}
              >
                {GEOGRAPHIC_REGIONS.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <label>
              Estado
              <select
                value={state}
                onChange={(event) => {
                  setState(event.target.value);
                  setRegion(regionForState(event.target.value));
                }}
              >
                {BRAZIL_STATES.map(([code, name]) => (
                  <option key={code} value={code}>
                    {code} · {name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Cidade
              <input value={city} onChange={(event) => setCity(event.target.value)} required />
            </label>
            <label>
              Situação da conta
              <select name="status" defaultValue={account?.status ?? "pendente"}>
                <option value="pendente">Pendente</option>
                <option value="ativa">Ativa</option>
                <option value="desativada">Desativada</option>
              </select>
            </label>
          </div>
          <p className="cx-muted">
            Nenhuma senha é criada ou armazenada nesta etapa. O escopo de acesso fica limitado à
            equipe escolhida.
          </p>
          <button className="cx-button">Salvar</button>
        </form>
      </section>
    </div>,
    document.body,
  );
}

export function SupervisorsScreen({
  data,
  onOpenTeam,
}: {
  data: AppData;
  onOpenTeam(team: string): void;
}) {
  const [editing, setEditing] = useState<string | null>(null);
  const supervisors = data.accounts.filter((account) => account.role === "subleader");
  const editingAccount = data.accounts.find((account) => account.id === editing);
  return (
    <div className="cx-page-stack">
      <div className="cx-page-heading">
        <div>
          <span className="cx-eyebrow">Governança de equipes</span>
          <h1>Sublíderes</h1>
          <p>Contas pendentes, responsáveis, operação e riscos por equipe.</p>
        </div>
        <button className="cx-button" onClick={() => setEditing("new")}>
          Cadastrar Sublíder
        </button>
      </div>
      <div className="cx-team-grid">
        {supervisors.map((account) => {
          const team = data.teams.find((item) => item.id === account.teamId);
          const members = data.people.filter(
            (person) =>
              person.role === "membro" &&
              !person.archivedAt &&
              (person.teamId === team?.id || person.team === team?.name),
          );
          const minutes = members.reduce(
            (sum, person) => sum + approvedMinutes(data, person.id),
            0,
          );
          const goal = members.reduce((sum, person) => sum + person.goalHours, 0);
          const forecast = data.weeklyForecasts.find((item) => item.teamId === team?.id);
          return (
            <article key={account.id} className="cx-team-card cx-supervisor-card">
              <button onClick={() => team && onOpenTeam(team.name)}>
                <div>
                  <span className="cx-avatar">
                    {account.name
                      .split(" ")
                      .map((part) => part[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                  <span className="cx-supervisor-card-copy">
                    <small>
                      {account.status} · {team?.name ?? "Sem equipe"}
                    </small>
                    <strong>{account.name}</strong>
                    <em className="cx-supervisor-email">{account.email}</em>
                    {team ? (
                      <em>
                        {team.region ?? "Sudeste"} · {team.state ?? "MG"} · {team.city}
                      </em>
                    ) : null}
                  </span>
                  <ChevronRight />
                </div>
                <GoalBattery minutes={minutes} goalHours={goal} compact />
                <dl>
                  <div>
                    <dt>Membros</dt>
                    <dd>{members.length}</dd>
                  </div>
                  <div>
                    <dt>Termos</dt>
                    <dd>
                      {members.filter((person) => hasValidConsent(data, person.id)).length}/
                      {members.length}
                    </dd>
                  </div>
                  <div>
                    <dt>Expectativa</dt>
                    <dd>{forecast?.expectedHours ?? 0}h</dd>
                  </div>
                </dl>
              </button>
              <button className="cx-edit-supervisor" onClick={() => setEditing(account.id)}>
                Editar conta
              </button>
            </article>
          );
        })}
      </div>
      {editing ? (
        <SupervisorAccountDialog
          key={editing}
          {...(editingAccount ? { account: editingAccount } : {})}
          data={data}
          onClose={() => setEditing(null)}
        />
      ) : null}
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
  const members = data.people.filter(
    (person) =>
      person.role === "membro" &&
      !person.archivedAt &&
      (person.teamId === team?.id || person.team === teamName),
  );
  const supervisor = data.people.find((p) => p.id === team?.supervisorId);
  const supervisorAccount = data.accounts.find(
    (account) => account.personId === supervisor?.id && account.role === "subleader",
  );
  const latestForecast = data.weeklyForecasts.find((item) => item.teamId === team?.id);
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
          <div className="cx-account-summary">
            <span>
              <small>Conta</small>
              <strong>{supervisorAccount?.email ?? "Equipe sem responsável"}</strong>
            </span>
            <span className={`cx-account-status is-${supervisorAccount?.status ?? "desativada"}`}>
              {supervisorAccount?.status ?? "crítico"}
            </span>
          </div>
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
          <div className="cx-forecast-summary">
            <strong>Expectativa semanal</strong>
            <span>
              {latestForecast?.expectedPeople ?? 0} novas pessoas ·{" "}
              {latestForecast?.expectedHours ?? 0}h estimadas
            </span>
            <p>{latestForecast?.notes || "Ainda não preenchida pelo Sublíder."}</p>
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

const EQUIPMENT_GUIDELINES: Record<Equipment["type"], string[]> = {
  capacete: [
    "Confira ajuste, fixação e estrutura antes de iniciar a operação.",
    "Mantenha o equipamento limpo e não opere se houver trinca ou folga.",
    "Avise o Sublíder sobre dano, manutenção ou troca de responsável.",
  ],
  celular: [
    "Mantenha bateria, armazenamento e sincronização do Minute disponíveis.",
    "Não altere a conta operacional do aparelho sem orientação do Sublíder.",
    "Avise imediatamente em caso de dano, perda ou falha de envio.",
  ],
};

export function EquipmentDetailPanel({
  data,
  equipmentId,
  onClose,
  onOpenCapture,
}: {
  data: AppData;
  equipmentId: string;
  onClose(): void;
  onOpenCapture(id: string): void;
}) {
  const equipment = data.equipment.find((item) => item.id === equipmentId);

  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [onClose]);

  if (!equipment) return null;
  const assignments = data.equipmentAssignments
    .filter((item) => item.equipmentId === equipment.id)
    .sort((a, b) => b.startsAt.localeCompare(a.startsAt));
  const activeAssignment = assignments.find((item) => item.active);
  const assignedPerson = data.people.find((item) => item.id === activeAssignment?.personId);
  const team = data.teams.find((item) => item.id === equipment.teamId);
  const captures = data.captures
    .filter((item) => item.equipmentId === equipment.id)
    .sort((a, b) => b.recordedAt.localeCompare(a.recordedAt));
  const events = data.auditEvents.filter(
    (item) =>
      item.entity === "equipment" &&
      (item.entityId === equipment.id || item.entityId === equipment.batchId),
  );
  const isClonexPhone = equipment.type === "celular" && equipment.owner === "clonex";

  return (
    <div
      className="cx-source-layer"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <section className="cx-source-panel" role="dialog" aria-modal="true">
        <span className="cx-source-handle" />
        <header className="cx-source-header">
          <span className="cx-source-icon">
            {equipment.type === "capacete" ? <HardHat /> : <Smartphone />}
          </span>
          <div>
            <span className="cx-eyebrow">Detalhes do equipamento</span>
            <h2>{equipment.model}</h2>
          </div>
          <button onClick={onClose} aria-label="Fechar detalhes do equipamento">
            <X />
          </button>
        </header>
        <div className="cx-source-body cx-equipment-detail-body">
          <div className="cx-equipment-detail-hero">
            <img
              src={
                equipment.type === "capacete"
                  ? "/images/clonex-helmet-3d.png"
                  : "/images/clonex-phone-3d.png"
              }
              alt={equipment.type === "capacete" ? "Capacete" : "Celular"}
              loading="eager"
            />
            <div>
              <span className="cx-eyebrow">{equipment.type}</span>
              <strong>{equipment.color}</strong>
              <StatusBadge status={equipment.status} />
            </div>
          </div>
          <dl className="cx-source-definition">
            {isClonexPhone ? (
              <div>
                <dt>E-mail/código do celular</dt>
                <dd className="cx-break-text">{equipment.deviceEmail ?? equipment.assetCode}</dd>
              </div>
            ) : null}
            <div>
              <dt>Origem e características</dt>
              <dd>
                {equipment.owner === "clonex" ? "Clonex" : "Próprio"} · {equipment.color}
                {equipment.size ? ` · tamanho ${equipment.size}` : ""}
              </dd>
            </div>
            <div>
              <dt>Equipe responsável</dt>
              <dd>{team?.name ?? assignedPerson?.team ?? "Sem equipe definida"}</dd>
            </div>
            <div>
              <dt>Uso atual</dt>
              <dd>
                {assignedPerson
                  ? `${assignedPerson.name} · ${activeAssignment?.workload === "part_time" ? "Part time" : "Full time"}`
                  : "Disponível, sem pessoa alocada"}
              </dd>
            </div>
            {activeAssignment ? (
              <div>
                <dt>Período e confirmação</dt>
                <dd>
                  Desde {formatDate(activeAssignment.startsAt)} ·{" "}
                  {activeAssignment.confirmedAt
                    ? `recebido em ${formatDate(activeAssignment.confirmedAt)}`
                    : "recebimento pendente"}
                </dd>
              </div>
            ) : null}
          </dl>

          <div className="cx-equipment-guidelines">
            <span className="cx-eyebrow">Diretrizes de uso</span>
            <ul>
              {EQUIPMENT_GUIDELINES[equipment.type].map((guideline) => (
                <li key={guideline}>{guideline}</li>
              ))}
            </ul>
          </div>

          <div className="cx-equipment-usage">
            <div className="cx-card-heading">
              <div>
                <span className="cx-eyebrow">Uso registrado</span>
                <h3>{captures.length} capturas</h3>
              </div>
            </div>
            {captures.length ? (
              captures.map((capture) => {
                const person = data.people.find((item) => item.id === capture.personId);
                return (
                  <button
                    key={capture.id}
                    onClick={() => onOpenCapture(capture.id)}
                    className="cx-equipment-usage-row"
                  >
                    <span>
                      <strong>{capture.activity}</strong>
                      <small>
                        {person?.name ?? "Pessoa"} · {formatDate(capture.recordedAt)}
                      </small>
                    </span>
                    <span>
                      {formatHours(capture.minutes)} <ChevronRight size={17} />
                    </span>
                  </button>
                );
              })
            ) : (
              <p className="cx-muted">Nenhuma captura vinculada a este equipamento.</p>
            )}
          </div>

          {events.length ? (
            <div className="cx-equipment-audit">
              <span className="cx-eyebrow">Histórico operacional</span>
              {events.map((event) => (
                <div key={event.id}>
                  <strong>{event.details}</strong>
                  <small>
                    {event.actorName} · {new Date(event.occurredAt).toLocaleString("pt-BR")}
                  </small>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </section>
    </div>
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
  const { activeAccount, requestCaptureChange, withdrawCaptureChange, resolveCaptureChange } =
    useAppData();
  const [requestType, setRequestType] = useState<"correcao" | "cancelamento">("correcao");
  const [reason, setReason] = useState("");
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
  const changeRequest = data.captureChangeRequests.find(
    (item) => item.captureId === capture.id && item.status === "pendente",
  );
  const canRequest =
    activeAccount?.role === "membro" && activeAccount.personId === capture.personId;
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
                {equipment?.deviceEmail
                  ? `${equipment.deviceEmail} · ${equipment.type} · ${equipment.model}`
                  : `${equipment?.type ?? "Equipamento"} · ${equipment?.model ?? "Não identificado"}`}
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
          {changeRequest ? (
            <div className="cx-change-request">
              <span className="cx-eyebrow">Solicitação pendente</span>
              <strong>{changeRequest.type === "correcao" ? "Correção" : "Cancelamento"}</strong>
              <p>{changeRequest.reason}</p>
              {canRequest ? (
                <button
                  className="cx-button cx-button--ghost"
                  onClick={() => withdrawCaptureChange(changeRequest.id)}
                >
                  Retirar solicitação
                </button>
              ) : activeAccount?.role === "subleader" ? (
                <div className="cx-request-actions">
                  <button
                    className="cx-button"
                    onClick={() => resolveCaptureChange(changeRequest.id, true)}
                  >
                    Aprovar
                  </button>
                  <button
                    className="cx-button cx-button--ghost"
                    onClick={() => resolveCaptureChange(changeRequest.id, false)}
                  >
                    Rejeitar
                  </button>
                </div>
              ) : (
                <small>A decisão cabe ao Sublíder responsável pela equipe.</small>
              )}
            </div>
          ) : canRequest ? (
            <form
              className="cx-change-request"
              onSubmit={(event) => {
                event.preventDefault();
                requestCaptureChange({
                  captureId: capture.id,
                  type: requestType,
                  reason,
                  ...(requestType === "correcao"
                    ? {
                        proposed: {
                          activity: String(new FormData(event.currentTarget).get("activity")),
                          minutes: Number(new FormData(event.currentTarget).get("minutes")),
                          equipmentId: String(new FormData(event.currentTarget).get("equipmentId")),
                          recordedAt: String(new FormData(event.currentTarget).get("recordedAt")),
                        },
                      }
                    : {}),
                });
                setReason("");
              }}
            >
              <span className="cx-eyebrow">Corrigir registro</span>
              <select
                value={requestType}
                onChange={(event) => setRequestType(event.target.value as typeof requestType)}
              >
                <option value="correcao">Solicitar correção</option>
                <option value="cancelamento">Solicitar cancelamento</option>
              </select>
              {requestType === "correcao" ? (
                <>
                  <input name="activity" defaultValue={capture.activity} required />
                  <input
                    name="minutes"
                    type="number"
                    min="1"
                    defaultValue={capture.minutes}
                    required
                  />
                  <input
                    name="recordedAt"
                    type="datetime-local"
                    defaultValue={capture.recordedAt.slice(0, 16)}
                    required
                  />
                  <select name="equipmentId" defaultValue={capture.equipmentId}>
                    {data.equipment
                      .filter((item) => item.assignedTo === capture.personId)
                      .map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.deviceEmail ? `${item.deviceEmail} · ` : ""}
                          {item.model}
                        </option>
                      ))}
                  </select>
                </>
              ) : null}
              <textarea
                value={reason}
                onChange={(event) => setReason(event.target.value)}
                placeholder="Explique obrigatoriamente o motivo"
                required
              />
              <button className="cx-button">Enviar ao Sublíder</button>
            </form>
          ) : null}
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
