import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  Building2,
  CalendarDays,
  Download,
  FileCheck2,
  Plus,
  Upload,
  Users,
  Wrench,
} from "lucide-react";

import { Card, EmptyState, StatusBadge } from "@/components/clonex/dashboard-ui";
import { GoalBattery } from "@/components/clonex/goal-battery";
import { Gamification } from "@/components/clonex/management-screens";
import { SupervisorManual } from "@/components/clonex/supervisor-manual";
import { PaymentRates } from "@/components/clonex/payment-rates";
import type { AppData, GeographicRegion, Role } from "@/domain/types";
import { formatDate, formatHours, formatMoney } from "@/lib/formatters";
import { BRAZIL_STATES, GEOGRAPHIC_REGIONS, regionForState } from "@/lib/locations";
import { approvedMinutes, memberProjection } from "@/lib/operations";
import { effectiveAlertPolicy } from "@/lib/alert-policies";
import { useAppData } from "@/state/use-app-data";

function personMinutes(data: AppData, personId: string) {
  return data.captures
    .filter((capture) => capture.personId === personId && capture.status === "aprovado")
    .reduce((sum, capture) => sum + capture.minutes, 0);
}

export function PeopleOperationsScreen({
  data,
  role,
  onSelectPerson,
  onSelectCompany,
  onAddPerson,
}: {
  data: AppData;
  role: Role;
  onSelectPerson(id: string): void;
  onSelectCompany(id: string): void;
  onAddPerson(): void;
}) {
  const { activeAccount } = useAppData();
  const [includeInactive, setIncludeInactive] = useState(false);
  const [regionFilter, setRegionFilter] = useState("all");
  const [stateFilter, setStateFilter] = useState("all");
  const activeTeam = data.teams.find((team) => team.id === activeAccount?.teamId);
  const members = data.people.filter(
    (person) =>
      person.role === "membro" &&
      (includeInactive ? true : person.active && !person.archivedAt) &&
      (role === "lider" ||
        person.teamId === activeAccount?.teamId ||
        person.team === activeTeam?.name) &&
      (regionFilter === "all" || person.region === regionFilter) &&
      (stateFilter === "all" || person.state === stateFilter),
  );
  const visibleCompanyIds = new Set(
    members.flatMap((person) => (person.companyId ? [person.companyId] : [])),
  );
  return (
    <div className="cx-page-stack">
      <div className="cx-page-heading">
        <div>
          <span className="cx-eyebrow">Equipe e vínculos</span>
          <h1>Pessoas</h1>
          <p>Autônomos, empresas, ciclos e disponibilidade operacional.</p>
        </div>
        {role === "subleader" ? (
          <button className="cx-button cx-add-action" onClick={onAddPerson}>
            <Plus size={17} /> Cadastrar membro
          </button>
        ) : null}
      </div>
      <div className="cx-people-filters">
        {role === "lider" ? (
          <>
            <label>
              Região
              <select
                value={regionFilter}
                onChange={(event) => setRegionFilter(event.target.value)}
              >
                <option value="all">Todas</option>
                {GEOGRAPHIC_REGIONS.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <label>
              Estado
              <select value={stateFilter} onChange={(event) => setStateFilter(event.target.value)}>
                <option value="all">Todos</option>
                {BRAZIL_STATES.map(([code, name]) => (
                  <option key={code} value={code}>
                    {code} · {name}
                  </option>
                ))}
              </select>
            </label>
          </>
        ) : null}
        <label className="cx-inline-filter">
          <input
            type="checkbox"
            checked={includeInactive}
            onChange={(event) => setIncludeInactive(event.target.checked)}
          />
          Mostrar membros inativos e arquivados
        </label>
      </div>
      {visibleCompanyIds.size ? (
        <div className="cx-company-grid">
          {data.companies
            .filter((company) => visibleCompanyIds.has(company.id))
            .map((company) => {
              const count = members.filter((person) => person.companyId === company.id).length;
              return (
                <button
                  className="cx-company-card"
                  key={company.id}
                  onClick={() => onSelectCompany(company.id)}
                >
                  <img src="/images/clonex-company-3d.png" alt="Empresa 3D" loading="lazy" />
                  <span>
                    <small>Empresa</small>
                    <strong>{company.name}</strong>
                    <em>
                      {count} {count === 1 ? "membro" : "membros"}
                    </em>
                  </span>
                </button>
              );
            })}
        </div>
      ) : null}
      <div className="cx-people-grid">
        {members.map((person) => {
          const company = data.companies.find((item) => item.id === person.companyId);
          const cycle = data.cycles.find(
            (item) => item.personId === person.id && item.status === "ativo",
          );
          return (
            <button
              className="cx-card cx-person-card cx-person-card-button"
              key={person.id}
              onClick={() => onSelectPerson(person.id)}
            >
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
                    {company?.name ?? "Autônomo"} ·{" "}
                    {person.workload === "full_time" ? "Full time" : "Part time"}
                  </p>
                </div>
                <span className={`cx-presence ${person.active ? "is-active" : ""}`}>
                  {person.archivedAt ? "Arquivado" : person.active ? "Ativo" : "Inativo"}
                </span>
              </div>
              <small>
                {person.memberCode ?? "Sem código"} · {person.state ?? "MG"}/{person.city}
              </small>
              <GoalBattery
                minutes={personMinutes(data, person.id)}
                goalHours={cycle?.goalHours ?? person.goalHours}
                compact
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function MemberDetailScreen({
  data,
  personId,
  role,
  onBack,
  onOpenCapture,
}: {
  data: AppData;
  personId: string;
  role: Role;
  onBack(): void;
  onOpenCapture?(id: string): void;
}) {
  const {
    addConsent,
    addSignedConsent,
    downloadConsent,
    updateCycle,
    declareConsent,
    confirmEquipment,
    completeTriage,
    updateMemberProfile,
    setMemberActive,
    archiveMember,
  } = useAppData();
  const [assetCode, setAssetCode] = useState("");
  const [downloadError, setDownloadError] = useState(false);
  const [consentFileName, setConsentFileName] = useState("");
  const person = data.people.find((item) => item.id === personId);
  if (!person) return <EmptyState>Membro não encontrado.</EmptyState>;
  const company = data.companies.find((item) => item.id === person.companyId);
  const cycle =
    data.cycles.find((item) => item.personId === person.id && item.status === "ativo") ??
    data.cycles.find((item) => item.personId === person.id);
  const assignments = data.equipmentAssignments.filter(
    (item) => item.personId === person.id && item.active,
  );
  const consent = data.consentRecords
    .filter((item) => item.personId === person.id && item.active)
    .at(-1);
  const captures = data.captures.filter((item) => item.personId === person.id);
  const payments = data.payments.filter((item) => item.personId === person.id);
  const projection = memberProjection(data, person);
  const alertPolicy = effectiveAlertPolicy(data, person).values;
  const declaration = data.consentDeclarations.find((item) => item.personId === person.id);
  const triage = data.memberTriages.find(
    (item) => item.personId === person.id && item.status === "pendente",
  );

  async function upload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const file = form.get("consent");
    if (!(file instanceof File) || !file.size) return;
    await addConsent(personId, file, String(form.get("validUntil") || "") || undefined, role);
    event.currentTarget.reset();
    setConsentFileName("");
  }

  function saveCycle(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!cycle) return;
    const form = new FormData(event.currentTarget);
    updateCycle(
      cycle.id,
      {
        startsAt: String(form.get("startsAt")),
        endsAt: String(form.get("endsAt")),
        goalHours: Number(form.get("goalHours")),
        targetDaysPerWeek: Number(form.get("targetDaysPerWeek")),
      },
      role,
    );
  }

  function saveOperationalProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const state = String(form.get("state"));
    updateMemberProfile(
      personId,
      {
        memberCode: String(form.get("memberCode")),
        region: String(form.get("region") || regionForState(state)) as GeographicRegion,
        state,
        city: String(form.get("city")),
      },
      role,
    );
  }

  return (
    <div className="cx-page-stack">
      <button className="cx-back-button" onClick={onBack}>
        <ArrowLeft size={18} /> {role === "membro" ? "Voltar ao início" : "Voltar para Pessoas"}
      </button>
      <div className="cx-member-hero">
        <div className="cx-avatar cx-avatar-large">
          {person.name
            .split(" ")
            .map((part) => part[0])
            .slice(0, 2)
            .join("")}
        </div>
        <div>
          <span className="cx-eyebrow">Perfil operacional</span>
          <h1>{person.name}</h1>
          <p>
            {company?.name ?? "Profissional autônomo"} · {person.team} · {person.state ?? "MG"}/
            {person.city}
          </p>
        </div>
        <span className={`cx-presence ${person.active ? "is-active" : ""}`}>
          {person.archivedAt ? "Arquivado" : person.active ? "Ativo" : "Inativo"}
        </span>
      </div>
      {role !== "membro" ? (
        <Card>
          <div className="cx-card-heading">
            <div>
              <span className="cx-eyebrow">Administração do membro</span>
              <h2>Identificação e localidade</h2>
            </div>
          </div>
          <form className="cx-form-grid cx-member-admin-form" onSubmit={saveOperationalProfile}>
            <label>
              Código de identificação
              <input name="memberCode" defaultValue={person.memberCode} required />
            </label>
            <label>
              Região
              <select name="region" defaultValue={person.region ?? "Sudeste"}>
                {GEOGRAPHIC_REGIONS.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <label>
              Estado
              <select name="state" defaultValue={person.state ?? "MG"}>
                {BRAZIL_STATES.map(([code, name]) => (
                  <option key={code} value={code}>
                    {code} · {name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Cidade
              <input name="city" defaultValue={person.city} required />
            </label>
            <button className="cx-button" type="submit">
              Salvar dados
            </button>
          </form>
          {!person.archivedAt ? (
            <div className="cx-member-account-actions">
              <button
                className="cx-button cx-button-secondary"
                onClick={() => {
                  const action = person.active ? "desativar" : "reativar";
                  if (window.confirm(`Confirma ${action} ${person.name}?`))
                    setMemberActive(person.id, !person.active, role);
                }}
              >
                {person.active ? "Desativar membro" : "Reativar membro"}
              </button>
              <button
                className="cx-button cx-button-danger"
                onClick={() => {
                  if (
                    window.confirm(
                      `Arquivar ${person.name}? O acesso será desativado e o histórico será preservado para auditoria.`,
                    )
                  ) {
                    archiveMember(person.id, role);
                    onBack();
                  }
                }}
              >
                Excluir e arquivar membro
              </button>
            </div>
          ) : (
            <p className="cx-muted">
              Este membro está arquivado. Capturas, pagamentos e auditorias permanecem preservados.
            </p>
          )}
        </Card>
      ) : null}
      {person.role === "subleader" ? (
        <SupervisorManual
          data={data}
          teamId={data.teams.find((team) => team.name === person.team)?.id ?? ""}
        />
      ) : null}
      <div className="cx-detail-grid">
        <Card>
          <span className="cx-eyebrow">Jornada e contato</span>
          <div className="cx-info-list">
            <p>
              <strong>{person.workload === "full_time" ? "Full time" : "Part time"}</strong>
              <span>Regime do membro</span>
            </p>
            <p>
              <strong>{person.email || "Não informado"}</strong>
              <span>E-mail de acesso futuro</span>
            </p>
            <p>
              <strong>{person.serviceName}</strong>
              <span>Serviço cadastrado</span>
            </p>
            <p>
              <strong>
                {data.people.find((item) => item.id === person.supervisorId)?.name ??
                  "Sublíder não definido"}
              </strong>
              <span>Sublíder responsável</span>
            </p>
            <p>
              <strong>{person.minuteCode}</strong>
              <span>Código individual Minute</span>
            </p>
            <p>
              <strong>{person.memberCode ?? "Não informado"}</strong>
              <span>Código de identificação Clonex</span>
            </p>
            <p>
              <strong>
                {
                  {
                    nenhum: "Sem fim de semana",
                    sabado: "Sábado",
                    domingo: "Domingo",
                    ambos: "Sábado e domingo",
                  }[person.weekendAvailability]
                }
              </strong>
              <span>Disponibilidade no fim de semana</span>
            </p>
          </div>
        </Card>
        <Card>
          <span className="cx-eyebrow">Ciclo atual</span>
          {cycle ? (
            <>
              <div className="cx-cycle-dates">
                <CalendarDays size={19} />
                <strong>
                  {new Date(`${cycle.startsAt}T12:00:00`).toLocaleDateString("pt-BR")} —{" "}
                  {new Date(`${cycle.endsAt}T12:00:00`).toLocaleDateString("pt-BR")}
                </strong>
              </div>
              <GoalBattery minutes={approvedMinutes(data, person.id)} goalHours={cycle.goalHours} />
              <div className="cx-projection-grid">
                <span>
                  <small>Ritmo diário</small>
                  <strong>{projection.pace.toFixed(1)}h</strong>
                </span>
                <span>
                  <small>Projeção</small>
                  <strong>{projection.projection.toFixed(1)}h</strong>
                </span>
                <span>
                  <small>Até primeiro pagamento</small>
                  <strong>
                    {Math.max(0, alertPolicy.firstPaymentHours - projection.hours).toFixed(1)}h
                  </strong>
                </span>
                <span>
                  <small>Até retenção do equipamento</small>
                  <strong>
                    {Math.max(0, alertPolicy.equipmentRetentionHours - projection.hours).toFixed(1)}
                    h
                  </strong>
                </span>
                <span>
                  <small>Até a meta</small>
                  <strong>{Math.max(0, projection.goal - projection.hours).toFixed(1)}h</strong>
                </span>
              </div>
              {role !== "membro" ? (
                <form className="cx-cycle-form" onSubmit={saveCycle}>
                  <label>
                    Início
                    <input name="startsAt" type="date" defaultValue={cycle.startsAt} />
                  </label>
                  <label>
                    Fim
                    <input name="endsAt" type="date" defaultValue={cycle.endsAt} />
                  </label>
                  <label>
                    Meta
                    <input name="goalHours" type="number" min="0" defaultValue={cycle.goalHours} />
                  </label>
                  <label>
                    Dias/semana
                    <input
                      name="targetDaysPerWeek"
                      type="number"
                      min="1"
                      max="7"
                      defaultValue={cycle.targetDaysPerWeek}
                    />
                  </label>
                  <button type="submit">Atualizar ciclo</button>
                </form>
              ) : null}
            </>
          ) : (
            <EmptyState>Nenhum ciclo ativo.</EmptyState>
          )}
        </Card>
      </div>
      <div className="cx-detail-grid">
        <Card>
          <div className="cx-card-heading">
            <div>
              <span className="cx-eyebrow">Equipamentos</span>
              <h2>Alocações atuais</h2>
            </div>
          </div>
          {assignments.length ? (
            <div className="cx-allocation-list">
              {assignments.map((assignment) => {
                const equipment = data.equipment.find((item) => item.id === assignment.equipmentId);
                return (
                  <article key={assignment.id}>
                    <img
                      src={
                        equipment?.type === "celular"
                          ? "/images/clonex-phone-3d.png"
                          : "/images/clonex-helmet-3d.png"
                      }
                      alt={equipment?.type ?? "Equipamento"}
                    />
                    <div>
                      <strong>{equipment?.model ?? "Equipamento"}</strong>
                      <span>
                        {assignment.workload === "full_time" ? "Full time" : "Part time"} · desde{" "}
                        {new Date(`${assignment.startsAt}T12:00:00`).toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <EmptyState>Sem equipamento alocado.</EmptyState>
          )}
          {role === "membro" ? (
            <form
              className="cx-claim-equipment"
              onSubmit={(event) => {
                event.preventDefault();
                if (confirmEquipment(person.id, assetCode)) setAssetCode("");
              }}
            >
              <label>
                Confirmar celular Clonex pelo e-mail/código
                <input
                  value={assetCode}
                  onChange={(event) => setAssetCode(event.target.value)}
                  placeholder="clonex.cel.1@gmail.com"
                  required
                />
              </label>
              <button className="cx-button" type="submit">
                Confirmar recebimento
              </button>
            </form>
          ) : null}
        </Card>
        <Card>
          <div className="cx-card-heading">
            <div>
              <span className="cx-eyebrow">Documentos</span>
              <h2>Termo de consentimento</h2>
            </div>
          </div>
          {consent ? (
            <div className="cx-consent-record">
              <FileCheck2 size={24} />
              <div>
                <strong>
                  {consent.fileName ??
                    `Assinatura ${consent.mode === "fisico" ? "física" : "digital"}`}
                </strong>
                <span>
                  Registrado por {consent.uploadedBy} em {formatDate(consent.uploadedAt)}
                </span>
              </div>
              {consent.storageKey && consent.fileName ? (
                <button
                  aria-label="Baixar termo"
                  onClick={() =>
                    consent.storageKey &&
                    consent.fileName &&
                    void downloadConsent(consent.storageKey, consent.fileName).then((found) =>
                      setDownloadError(!found),
                    )
                  }
                >
                  <Download size={18} />
                </button>
              ) : null}
            </div>
          ) : (
            <EmptyState>Consentimento ainda não registrado.</EmptyState>
          )}
          {downloadError ? (
            <p className="cx-inline-warning">
              Arquivo demonstrativo sem conteúdo local. Substitua pelo termo real.
            </p>
          ) : null}
          {role !== "membro" ? (
            <>
              <form className="cx-consent-form" onSubmit={upload}>
                <label className="cx-file-picker">
                  <span>Arquivo</span>
                  <input
                    required
                    name="consent"
                    type="file"
                    accept="application/pdf,image/png,image/jpeg"
                    onChange={(event) => setConsentFileName(event.target.files?.[0]?.name ?? "")}
                  />
                  <strong>
                    <Upload size={17} />
                    <span>{consentFileName || "Selecionar PDF ou imagem"}</span>
                  </strong>
                </label>
                <label>
                  Validade opcional
                  <input name="validUntil" type="date" />
                </label>
                <button className="cx-button" type="submit">
                  Registrar termo
                </button>
              </form>
              <div className="cx-consent-signatures">
                <span>Ou registrar assinatura:</span>
                <button onClick={() => addSignedConsent(personId, "fisico", undefined, role)}>
                  Física
                </button>
                <button onClick={() => addSignedConsent(personId, "digital", undefined, role)}>
                  Digital
                </button>
              </div>
            </>
          ) : null}
          {role === "membro" && !declaration ? (
            <button
              className="cx-button cx-declare-consent"
              onClick={() => declareConsent(person.id)}
            >
              Declaro que assinei o termo
            </button>
          ) : null}
          {declaration ? (
            <p className="cx-consent-declared">
              Declaração enviada em {formatDate(declaration.declaredAt)}.{" "}
              {consent ? "Validada pelo Sublíder." : "Aguardando validação oficial."}
            </p>
          ) : null}
        </Card>
      </div>
      {triage && role !== "membro" ? (
        <Card>
          <span className="cx-eyebrow">Triagem de 10 horas</span>
          <h2>Decisão de continuidade</h2>
          <form
            className="cx-triage-form"
            onSubmit={(event) => {
              event.preventDefault();
              const form = new FormData(event.currentTarget);
              completeTriage(
                triage.id,
                String(form.get("decision")) as "continuar" | "pausar" | "encerrar",
                String(form.get("notes")),
              );
            }}
          >
            <select name="decision">
              <option value="continuar">Continuar</option>
              <option value="pausar">Pausar</option>
              <option value="encerrar">Encerrar</option>
            </select>
            <textarea name="notes" placeholder="Observação da triagem" required />
            <button className="cx-button">Concluir triagem</button>
          </form>
        </Card>
      ) : null}
      <Gamification data={data} personId={person.id} />
      <PaymentRates data={data} person={person} />
      <Card>
        <div className="cx-card-heading">
          <div>
            <span className="cx-eyebrow">Histórico</span>
            <h2>Capturas e pagamentos</h2>
          </div>
        </div>
        <div className="cx-member-history">
          <div>
            {captures.slice(0, 6).map((capture) => (
              <button
                key={capture.id}
                className="cx-history-button"
                onClick={() => onOpenCapture?.(capture.id)}
              >
                <span>
                  <strong>{capture.activity}</strong>
                  <small>
                    {formatDate(capture.recordedAt)} · {formatHours(capture.minutes)}
                  </small>
                </span>
                <StatusBadge status={capture.status} />
              </button>
            ))}
          </div>
          <div>
            {payments.map((payment) => (
              <article key={payment.id}>
                <span>
                  <strong>{formatMoney(payment.amount)}</strong>
                  <small>
                    {payment.period} · {payment.hours}h · {payment.equipmentIds.length}{" "}
                    equipamento(s)
                  </small>
                </span>
                <StatusBadge status={payment.status} />
              </article>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}

export function CompanyDialog({
  data,
  companyId,
  onSelectPerson,
  onClose,
}: {
  data: AppData;
  companyId: string;
  onSelectPerson(id: string): void;
  onClose(): void;
}) {
  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [onClose]);
  const company = data.companies.find((item) => item.id === companyId);
  if (!company) return null;
  const members = data.people.filter((person) => person.companyId === company.id);
  return (
    <div
      className="cx-dialog-backdrop"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <section
        className="cx-dialog cx-company-dialog"
        role="dialog"
        aria-modal="true"
        aria-label={`Empresa ${company.name}`}
      >
        <button className="cx-dialog-close" onClick={onClose} aria-label="Fechar empresa">
          ×
        </button>
        <img
          className="cx-company-hero-image"
          src="/images/clonex-company-3d.png"
          alt="Prédio 3D da empresa"
        />
        <span className="cx-eyebrow">Empresa</span>
        <h2>{company.name}</h2>
        <p>
          {company.cnpj ?? "CNPJ não informado"} · {company.city}
        </p>
        <div className="cx-company-members">
          <strong>
            <Users size={18} /> {members.length} membros
          </strong>
          {members.map((person) => (
            <button key={person.id} onClick={() => onSelectPerson(person.id)}>
              <span className="cx-avatar">
                {person.name
                  .split(" ")
                  .map((part) => part[0])
                  .slice(0, 2)
                  .join("")}
              </span>
              <span>
                <strong>{person.name}</strong>
                <small>{person.workload === "full_time" ? "Full time" : "Part time"}</small>
              </span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

export function PendingScreen({
  data,
  onSelectPerson,
}: {
  data: AppData;
  onSelectPerson(id: string): void;
}) {
  const insights = useMemo(() => {
    const items: { id: string; tone: string; title: string; detail: string; personId?: string }[] =
      [];
    for (const person of data.people.filter((item) => item.role === "membro" && item.active)) {
      const cycle = data.cycles.find(
        (item) => item.personId === person.id && item.status === "ativo",
      );
      const minutes = personMinutes(data, person.id);
      if (!data.consentRecords.some((item) => item.personId === person.id && item.active))
        items.push({
          id: `consent-${person.id}`,
          tone: "critical",
          title: "Consentimento ausente",
          detail: `${person.name} ainda não possui termo registrado.`,
          personId: person.id,
        });
      if (cycle && cycle.goalHours > 0 && minutes / 60 / cycle.goalHours < 0.35)
        items.push({
          id: `goal-${person.id}`,
          tone: "warning",
          title: "Meta em risco",
          detail: `${person.name} está abaixo de 35% da meta do ciclo.`,
          personId: person.id,
        });
      if (cycle) {
        const daysToEnd = Math.ceil(
          (new Date(`${cycle.endsAt}T12:00:00`).getTime() -
            new Date("2026-08-07T12:00:00-03:00").getTime()) /
            86400000,
        );
        if (daysToEnd >= 0 && daysToEnd <= 7)
          items.push({
            id: `cycle-${person.id}`,
            tone: "info",
            title: "Ciclo perto do fechamento",
            detail: `O ciclo de ${person.name} termina em ${daysToEnd} dia(s).`,
            personId: person.id,
          });
      }
    }
    const pending = data.captures.filter((capture) => capture.status === "pendente").length;
    if (pending)
      items.push({
        id: "reviews",
        tone: "warning",
        title: "Revisões pendentes",
        detail: `${pending} captura(s) aguardam revisão.`,
      });
    const maintenance = data.equipment.filter((item) => item.status === "manutencao").length;
    if (maintenance)
      items.push({
        id: "maintenance",
        tone: "critical",
        title: "Manutenção necessária",
        detail: `${maintenance} equipamento(s) indisponíveis. `,
      });
    const unpaid = data.payments.filter((item) => item.status === "previsto").length;
    if (unpaid)
      items.push({
        id: "payments",
        tone: "info",
        title: "Pagamentos previstos",
        detail: `${unpaid} pagamento(s) precisam de acompanhamento.`,
      });
    return items;
  }, [data]);
  return (
    <div className="cx-page-stack">
      <div className="cx-page-heading">
        <div>
          <span className="cx-eyebrow">Centro de ação</span>
          <h1>Pendências</h1>
          <p>Prioridades geradas a partir de metas, documentos e operação.</p>
        </div>
      </div>
      <div className="cx-pending-grid">
        {insights.map((item) => (
          <button
            key={item.id}
            className={`cx-pending-card is-${item.tone}`}
            onClick={() => item.personId && onSelectPerson(item.personId)}
          >
            <span>{item.title.includes("Manutenção") ? <Wrench /> : <AlertTriangle />}</span>
            <div>
              <strong>{item.title}</strong>
              <p>{item.detail}</p>
              <small>
                {item.personId ? "Abrir perfil relacionado" : "Acompanhar na área correspondente"}
              </small>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
