import { Check, ChevronDown, ChevronUp, Clock3, Plus, X } from "lucide-react";
import { useState } from "react";

import type { AppData, MetricSource, Role } from "@/domain/types";
import { formatDate, formatHours, formatMoney } from "@/lib/formatters";
import {
  buildActivePeopleSource,
  buildPendingReviewsSource,
  buildReportMetrics,
  reportScopeFor,
} from "@/lib/reporting";
import { useAppData } from "@/state/use-app-data";
import { GoalBattery } from "./goal-battery";
import { Card, EmptyState, Progress, StatCard, StatusBadge } from "./dashboard-ui";

interface ScreenProps {
  data: AppData;
  role: Role;
  onAddCapture(): void;
  onAddEquipment(): void;
  onAddPayment?(): void;
  onOpenSource(source: MetricSource): void;
  onOpenCapture(id: string): void;
}

export function OverviewScreen({
  data,
  role,
  onAddCapture,
  onOpenSource,
  onOpenCapture,
}: ScreenProps) {
  const member = data.people.find((person) => person.id === "p1") ?? data.people[0];
  const memberCaptures = data.captures.filter((capture) => capture.personId === member?.id);
  const memberMinutes = memberCaptures
    .filter((capture) => capture.status === "aprovado")
    .reduce((sum, capture) => sum + capture.minutes, 0);
  const scope =
    role === "membro"
      ? { kind: "person" as const, value: member?.id ?? "p1" }
      : reportScopeFor(role);
  const overviewMetrics = buildReportMetrics(data, scope, "month");
  const quantitySource = overviewMetrics[0];
  const qualitySource = overviewMetrics[2];
  const activeSource = buildActivePeopleSource(data, scope);
  const pendingSource = buildPendingReviewsSource(data, scope, "month");

  if (role === "membro" && member) {
    const cycle = data.cycles.find(
      (item) => item.personId === member.id && item.status === "ativo",
    );
    const goalHours = cycle?.goalHours ?? member.goalHours;
    return (
      <div className="cx-page-stack">
        <PageHeading
          eyebrow="Minha operação"
          title={`Olá, ${member.name.split(" ")[0]}`}
          description="Acompanhe seu ciclo e registre as capturas do dia."
          action={
            <button className="cx-button" onClick={onAddCapture}>
              <Plus size={17} /> Nova captura
            </button>
          }
        />
        <div className="cx-stats-grid">
          <StatCard
            label="Horas registradas"
            value={formatHours(memberMinutes)}
            detail="Neste ciclo"
            tone="accent"
            onClick={() => onOpenSource(quantitySource)}
          />
          <StatCard
            label="Meta mensal"
            value={`${goalHours}h`}
            detail={`${Math.max(0, goalHours - memberMinutes / 60).toFixed(0)}h restantes`}
            onClick={() => onOpenSource(quantitySource)}
          />
          <StatCard
            label="Aprovação"
            value={`${Math.round(memberCaptures.length ? (memberCaptures.filter((item) => item.status === "aprovado").length / memberCaptures.length) * 100 : 0)}%`}
            detail="Qualidade das capturas"
            onClick={() => onOpenSource(qualitySource)}
          />
        </div>
        <Card>
          <div className="cx-card-heading">
            <div>
              <span className="cx-eyebrow">Progresso do ciclo</span>
              <h2>Meta de produção</h2>
            </div>
            <span className="cx-cycle">
              {cycle
                ? `${formatDate(`${cycle.startsAt}T12:00:00`)} — ${formatDate(`${cycle.endsAt}T12:00:00`)}`
                : "Ciclo atual"}
            </span>
          </div>
          <button className="cx-battery-button" onClick={() => onOpenSource(quantitySource)}>
            <GoalBattery minutes={memberMinutes} goalHours={goalHours} />
          </button>
        </Card>
        <RecentCaptures
          data={data}
          captures={memberCaptures.slice(0, 4)}
          onOpenCapture={onOpenCapture}
        />
      </div>
    );
  }

  return (
    <div className="cx-page-stack">
      <PageHeading
        eyebrow={role === "lider" ? "Visão geral da cidade" : "Operação JF-1"}
        title={role === "lider" ? "Controle da operação" : "Sua equipe hoje"}
        description="Indicadores atualizados a partir dos registros da equipe."
      />
      <div className="cx-stats-grid">
        <StatCard
          label="Horas capturadas"
          value={quantitySource.value}
          detail={quantitySource.actual}
          tone="accent"
          onClick={() => onOpenSource(quantitySource)}
        />
        <StatCard
          label="Pessoas ativas"
          value={activeSource.value}
          detail={activeSource.actual}
          onClick={() => onOpenSource(activeSource)}
        />
        <StatCard
          label="Aprovação"
          value={`${qualitySource.percentage}%`}
          detail={qualitySource.actual}
          tone={Number(pendingSource.value) ? "warning" : "default"}
          onClick={() => onOpenSource(qualitySource)}
        />
      </div>
      <Card className="cx-aggregate-battery">
        <GoalBattery
          minutes={data.captures
            .filter(
              (capture) =>
                capture.status === "aprovado" &&
                (role === "lider" ||
                  data.people.find((person) => person.id === capture.personId)?.team === "JF-1"),
            )
            .reduce((sum, capture) => sum + capture.minutes, 0)}
          goalHours={data.people
            .filter(
              (person) => person.role === "membro" && (role === "lider" || person.team === "JF-1"),
            )
            .reduce(
              (sum, person) =>
                sum +
                (data.cycles.find(
                  (cycle) => cycle.personId === person.id && cycle.status === "ativo",
                )?.goalHours ?? person.goalHours),
              0,
            )}
        />
      </Card>
      <div className="cx-two-columns">
        <Card>
          <div className="cx-card-heading">
            <div>
              <span className="cx-eyebrow">Equipes</span>
              <h2>Ritmo por equipe</h2>
            </div>
          </div>
          {["JF-1", "JF-2"].map((team) => {
            const people = data.people.filter(
              (person) => person.team === team && person.role === "membro",
            );
            const ids = new Set(people.map((person) => person.id));
            const minutes = data.captures
              .filter((capture) => ids.has(capture.personId) && capture.status === "aprovado")
              .reduce((sum, capture) => sum + capture.minutes, 0);
            const goal = people.reduce((sum, person) => sum + person.goalHours, 0);
            return (
              <Progress
                key={team}
                label={`${team} · ${formatHours(minutes)} de ${goal}h`}
                value={goal ? (minutes / 60 / goal) * 100 : 0}
                onClick={() =>
                  onOpenSource(buildReportMetrics(data, { kind: "team", value: team }, "month")[0])
                }
              />
            );
          })}
        </Card>
        <Card>
          <div className="cx-card-heading">
            <div>
              <span className="cx-eyebrow">Atenção</span>
              <h2>Pendências</h2>
            </div>
          </div>
          <div className="cx-alert-list">
            <AlertItem
              value={Number(pendingSource.value)}
              label="capturas para revisar"
              onClick={() => onOpenSource(pendingSource)}
            />
            <AlertItem
              value={data.equipment.filter((item) => item.status === "manutencao").length}
              label="equipamento em manutenção"
            />
            <AlertItem
              value={data.people.filter((person) => !person.active).length}
              label="pessoa inativa"
            />
          </div>
        </Card>
      </div>
      <RecentCaptures
        data={data}
        captures={data.captures.slice(0, 5)}
        onOpenCapture={onOpenCapture}
      />
    </div>
  );
}

export function CapturesScreen({ data, role, onAddCapture, onOpenCapture }: ScreenProps) {
  const { updateCaptureStatus } = useAppData();
  const captures =
    role === "membro"
      ? data.captures.filter((capture) => capture.personId === "p1")
      : data.captures;
  return (
    <div className="cx-page-stack">
      <PageHeading
        eyebrow="Produção"
        title="Capturas"
        description="Registros enviados pela equipe e seus estados de revisão."
        action={
          role === "membro" ? (
            <button className="cx-button" onClick={onAddCapture}>
              <Plus size={17} /> Nova captura
            </button>
          ) : undefined
        }
      />
      <Card className="cx-table-card">
        <div className="cx-table-wrap">
          <table className="cx-table">
            <thead>
              <tr>
                <th>Pessoa</th>
                <th>Atividade</th>
                <th>Duração</th>
                <th>Data</th>
                <th>Status</th>
                {role !== "membro" && <th>Ações</th>}
              </tr>
            </thead>
            <tbody>
              {captures.map((capture) => {
                const person = data.people.find((item) => item.id === capture.personId);
                return (
                  <tr
                    key={capture.id}
                    className="cx-clickable-row"
                    onClick={() => onOpenCapture(capture.id)}
                  >
                    <td>
                      <strong>{person?.name ?? "Pessoa removida"}</strong>
                      <small>{person?.team}</small>
                    </td>
                    <td>{capture.activity}</td>
                    <td>{formatHours(capture.minutes)}</td>
                    <td>{formatDate(capture.recordedAt)}</td>
                    <td>
                      <StatusBadge status={capture.status} />
                    </td>
                    {role !== "membro" && (
                      <td>
                        <div className="cx-row-actions">
                          <button
                            aria-label="Aprovar captura"
                            onClick={(event) => {
                              event.stopPropagation();
                              updateCaptureStatus(capture.id, "aprovado", role);
                            }}
                          >
                            <Check size={16} />
                          </button>
                          <button
                            aria-label="Reprovar captura"
                            onClick={(event) => {
                              event.stopPropagation();
                              updateCaptureStatus(capture.id, "reprovado", role);
                            }}
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export function PeopleScreen({ data, role }: ScreenProps) {
  const { updatePersonGoal } = useAppData();
  const members = data.people.filter((person) => person.role === "membro");
  return (
    <div className="cx-page-stack">
      <PageHeading
        eyebrow="Equipe"
        title="Pessoas"
        description="Metas, vínculo e progresso de cada participante."
      />
      <div className="cx-people-grid">
        {members.map((person) => {
          const minutes = data.captures
            .filter((capture) => capture.personId === person.id)
            .reduce((sum, capture) => sum + capture.minutes, 0);
          const progress = person.goalHours ? (minutes / 60 / person.goalHours) * 100 : 0;
          return (
            <Card key={person.id} className="cx-person-card">
              <div className="cx-person-top">
                <div className="cx-avatar">
                  {person.name
                    .split(" ")
                    .map((part) => part[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <div>
                  <h2>{person.name}</h2>
                  <p>
                    {person.team} · {person.city}
                  </p>
                </div>
                <span className={`cx-presence ${person.active ? "is-active" : ""}`}>
                  {person.active ? "Ativo" : "Inativo"}
                </span>
              </div>
              <Progress
                value={progress}
                label={`${formatHours(minutes)} de ${person.goalHours}h`}
              />
              <div className="cx-goal-control">
                <span>Meta mensal</span>
                <div>
                  <button
                    aria-label="Diminuir meta"
                    onClick={() => updatePersonGoal(person.id, person.goalHours - 10, role)}
                  >
                    <ChevronDown size={16} />
                  </button>
                  <strong>{person.goalHours}h</strong>
                  <button
                    aria-label="Aumentar meta"
                    onClick={() => updatePersonGoal(person.id, person.goalHours + 10, role)}
                  >
                    <ChevronUp size={16} />
                  </button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export function EquipmentScreen({ data, onAddEquipment }: ScreenProps) {
  const [typeFilter, setTypeFilter] = useState<"all" | "capacete" | "celular">("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [ownerFilter, setOwnerFilter] = useState("all");
  const [workloadFilter, setWorkloadFilter] = useState("all");
  const filteredEquipment = data.equipment.filter((item) => {
    const assignment = data.equipmentAssignments.find(
      (candidate) => candidate.equipmentId === item.id && candidate.active,
    );
    return (
      (typeFilter === "all" || item.type === typeFilter) &&
      (statusFilter === "all" || item.status === statusFilter) &&
      (ownerFilter === "all" || item.owner === ownerFilter) &&
      (workloadFilter === "all" || assignment?.workload === workloadFilter)
    );
  });
  return (
    <div className="cx-page-stack">
      <PageHeading
        eyebrow="Inventário"
        title="Equipamentos"
        description="Capacetes e celulares disponíveis para a operação."
        action={
          <button className="cx-button" onClick={onAddEquipment}>
            <Plus size={17} /> Equipamento
          </button>
        }
      />
      <div className="cx-stats-grid">
        <StatCard label="Total" value={String(data.equipment.length)} detail="Itens cadastrados" />
        <StatCard
          label="Disponíveis"
          value={String(data.equipment.filter((item) => item.status === "disponivel").length)}
          detail="Prontos para alocar"
          tone="accent"
        />
        <StatCard
          label="Em manutenção"
          value={String(data.equipment.filter((item) => item.status === "manutencao").length)}
          detail="Precisam de atenção"
          tone="warning"
        />
      </div>
      <div className="cx-equipment-filters" aria-label="Filtros de equipamentos">
        <div className="cx-filter-tabs">
          {(["all", "capacete", "celular"] as const).map((value) => (
            <button
              key={value}
              className={typeFilter === value ? "is-active" : ""}
              onClick={() => setTypeFilter(value)}
            >
              {value === "all" ? "Todos" : value === "capacete" ? "Capacetes" : "Celulares"}
            </button>
          ))}
        </div>
        <select
          aria-label="Filtrar por situação"
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
        >
          <option value="all">Todas as situações</option>
          <option value="disponivel">Disponíveis</option>
          <option value="em_uso">Em uso</option>
          <option value="manutencao">Manutenção</option>
        </select>
        <select
          aria-label="Filtrar por proprietário"
          value={ownerFilter}
          onChange={(event) => setOwnerFilter(event.target.value)}
        >
          <option value="all">Todos os proprietários</option>
          <option value="clonex">Clonex</option>
          <option value="proprio">Próprio</option>
        </select>
        <select
          aria-label="Filtrar por jornada"
          value={workloadFilter}
          onChange={(event) => setWorkloadFilter(event.target.value)}
        >
          <option value="all">Full e part time</option>
          <option value="full_time">Full time</option>
          <option value="part_time">Part time</option>
        </select>
      </div>
      <div className="cx-equipment-grid">
        {filteredEquipment.map((item) => {
          const person = data.people.find((candidate) => candidate.id === item.assignedTo);
          const assignment = data.equipmentAssignments.find(
            (candidate) => candidate.equipmentId === item.id && candidate.active,
          );
          const company = data.companies.find((candidate) => candidate.id === person?.companyId);
          return (
            <Card key={item.id} className="cx-equipment-card">
              <div className="cx-equipment-icon">
                <img
                  src={
                    item.type === "capacete"
                      ? "/images/clonex-helmet-3d.png"
                      : "/images/clonex-phone-3d.png"
                  }
                  alt={item.type === "capacete" ? "Capacete 3D" : "Celular 3D"}
                  loading="lazy"
                />
              </div>
              <div>
                <span className="cx-eyebrow">{item.type}</span>
                <h2>{item.model}</h2>
                <p>
                  {item.assetCode} · {item.color}
                  {item.size ? ` · tamanho ${item.size}` : ""}
                </p>
                <p>
                  {person
                    ? `Com ${person.name}`
                    : item.owner === "clonex"
                      ? "Patrimônio Clonex"
                      : "Equipamento próprio"}
                </p>
                {assignment ? (
                  <small className={`cx-equipment-allocation is-${assignment.workload}`}>
                    {assignment.workload === "full_time" ? "Full time" : "Part time"}
                    {company ? ` · ${company.name}` : ""}
                  </small>
                ) : null}
              </div>
              <StatusBadge status={item.status} />
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export function FinanceScreen({ data, onAddPayment }: ScreenProps) {
  const paid = data.payments
    .filter((payment) => payment.status === "pago")
    .reduce((sum, payment) => sum + payment.amount, 0);
  const forecast = data.payments
    .filter((payment) => payment.status === "previsto")
    .reduce((sum, payment) => sum + payment.amount, 0);
  return (
    <div className="cx-page-stack">
      <PageHeading
        eyebrow="Financeiro"
        title="Pagamentos"
        description="Valores calculados a partir das horas registradas."
        action={
          onAddPayment ? (
            <button className="cx-button" onClick={onAddPayment}>
              <Plus size={17} /> Registrar pagamento
            </button>
          ) : undefined
        }
      />
      <div className="cx-stats-grid">
        <StatCard
          label="Pago no ciclo"
          value={formatMoney(paid)}
          detail="Pagamentos concluídos"
          tone="accent"
        />
        <StatCard label="Previsto" value={formatMoney(forecast)} detail="Próximos fechamentos" />
        <StatCard
          label="Horas remuneradas"
          value={`${data.payments.reduce((sum, payment) => sum + payment.hours, 0)}h`}
          detail="No período listado"
        />
      </div>
      <Card className="cx-table-card">
        <div className="cx-table-wrap">
          <table className="cx-table">
            <thead>
              <tr>
                <th>Pessoa</th>
                <th>Período</th>
                <th>Horas</th>
                <th>Valor</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.payments.map((payment) => (
                <tr key={payment.id}>
                  <td>
                    <strong>
                      {data.people.find((person) => person.id === payment.personId)?.name}
                    </strong>
                  </td>
                  <td>{payment.period}</td>
                  <td>{payment.hours}h</td>
                  <td>{formatMoney(payment.amount)}</td>
                  <td>
                    <StatusBadge status={payment.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export function GoalsScreen({ data }: ScreenProps) {
  const member = data.people.find((person) => person.id === "p1");
  if (!member) return <EmptyState>Perfil de membro não encontrado.</EmptyState>;
  const minutes = data.captures
    .filter((capture) => capture.personId === member.id)
    .reduce((sum, capture) => sum + capture.minutes, 0);
  const cycle = data.cycles.find((item) => item.personId === member.id && item.status === "ativo");
  const goalHours = cycle?.goalHours ?? member.goalHours;
  return (
    <div className="cx-page-stack">
      <PageHeading
        eyebrow="Meu ciclo"
        title="Metas"
        description="Sua meta é definida pelo responsável da equipe."
      />
      <Card className="cx-goal-hero">
        <span className="cx-eyebrow">Meta atual</span>
        <strong>{goalHours} horas</strong>
        <p>Você já registrou {formatHours(minutes)} neste ciclo.</p>
        <GoalBattery minutes={minutes} goalHours={goalHours} />
      </Card>
      <Card>
        <div className="cx-card-heading">
          <div>
            <span className="cx-eyebrow">Como avançar</span>
            <h2>Ritmo recomendado</h2>
          </div>
        </div>
        <div className="cx-rhythm">
          <Clock3 size={20} />
          <div>
            <strong>{Math.max(0, (goalHours - minutes / 60) / 20).toFixed(1)}h por dia útil</strong>
            <p>Estimativa para concluir a meta nos próximos 20 dias.</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

function RecentCaptures({
  data,
  captures,
  onOpenCapture,
}: {
  data: AppData;
  captures: AppData["captures"];
  onOpenCapture(id: string): void;
}) {
  return (
    <Card>
      <div className="cx-card-heading">
        <div>
          <span className="cx-eyebrow">Atividade recente</span>
          <h2>Últimas capturas</h2>
        </div>
      </div>
      {captures.length ? (
        <div className="cx-list">
          {captures.map((capture) => (
            <button
              className="cx-list-row cx-list-row--button"
              key={capture.id}
              onClick={() => onOpenCapture(capture.id)}
            >
              <div className="cx-list-icon">
                <Clock3 size={17} />
              </div>
              <div>
                <strong>{capture.activity}</strong>
                <span>
                  {data.people.find((person) => person.id === capture.personId)?.name} ·{" "}
                  {formatDate(capture.recordedAt)}
                </span>
              </div>
              <div className="cx-list-value">
                <strong>{formatHours(capture.minutes)}</strong>
                <StatusBadge status={capture.status} />
              </div>
            </button>
          ))}
        </div>
      ) : (
        <EmptyState>Nenhuma captura registrada.</EmptyState>
      )}
    </Card>
  );
}

function PageHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <header className="cx-page-heading">
      <div>
        <span className="cx-eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {action}
    </header>
  );
}

function AlertItem({
  value,
  label,
  onClick,
}: {
  value: number;
  label: string;
  onClick?: () => void;
}) {
  const content = (
    <>
      <strong>{value}</strong>
      <span>{label}</span>
    </>
  );
  return onClick ? (
    <button type="button" className="cx-alert-item cx-data-button" onClick={onClick}>
      {content}
    </button>
  ) : (
    <div className="cx-alert-item">{content}</div>
  );
}
