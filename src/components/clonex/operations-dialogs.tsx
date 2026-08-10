import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";

import type { AffiliationType, GeographicRegion, Role, WorkloadType } from "@/domain/types";
import { formatHours, formatMoney } from "@/lib/formatters";
import { BRAZIL_STATES, GEOGRAPHIC_REGIONS, locationCode, regionForState } from "@/lib/locations";
import { useAppData } from "@/state/use-app-data";

function Modal({
  title,
  description,
  children,
  onClose,
}: {
  title: string;
  description: string;
  children: ReactNode;
  onClose(): void;
}) {
  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [onClose]);
  return (
    <div
      className="cx-dialog-backdrop"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <section
        className="cx-dialog cx-operation-dialog"
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <button className="cx-dialog-close" onClick={onClose} aria-label="Fechar">
          ×
        </button>
        <span className="cx-eyebrow">Operação</span>
        <h2>{title}</h2>
        <p>{description}</p>
        {children}
      </section>
    </div>
  );
}

export function MemberRegistrationDialog({ role, onClose }: { role: Role; onClose(): void }) {
  const { data, activeAccount, addCompany, addPerson } = useAppData();
  const [affiliation, setAffiliation] = useState<AffiliationType>("autonomo");
  const availableTeams = useMemo(
    () => data?.teams.filter((team) => role === "lider" || team.id === activeAccount?.teamId) ?? [],
    [activeAccount?.teamId, data?.teams, role],
  );
  const [teamId, setTeamId] = useState(activeAccount?.teamId ?? "");
  const selectedTeam = availableTeams.find((team) => team.id === teamId) ?? availableTeams[0];
  const [region, setRegion] = useState<GeographicRegion>(selectedTeam?.region ?? "Sudeste");
  const [state, setState] = useState(selectedTeam?.state ?? "MG");
  const [city, setCity] = useState(selectedTeam?.city ?? "Juiz de Fora");
  useEffect(() => {
    if (!teamId && availableTeams[0]) {
      setTeamId(availableTeams[0].id);
      setRegion(availableTeams[0].region ?? regionForState(availableTeams[0].state ?? "MG"));
      setState(availableTeams[0].state ?? "MG");
      setCity(availableTeams[0].city);
    }
  }, [availableTeams, teamId]);
  if (!data) return null;
  const appData = data;
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const team = appData.teams.find((item) => item.id === String(form.get("teamId")));
    if (!team) return;
    const email = String(form.get("email")).trim().toLowerCase();
    const memberCode = String(form.get("memberCode")).trim().toUpperCase();
    if (appData.accounts.some((account) => account.email.toLowerCase() === email)) {
      window.alert("Já existe uma conta com este e-mail.");
      return;
    }
    if (appData.people.some((person) => person.memberCode?.toUpperCase() === memberCode)) {
      window.alert("Este código de identificação já está em uso.");
      return;
    }
    let companyId = String(form.get("companyId") || "") || undefined;
    const newCompany = String(form.get("newCompany") || "").trim();
    if (affiliation === "empresa" && newCompany) {
      const cnpj = String(form.get("cnpj") || "");
      const contact = String(form.get("email") || "");
      companyId = addCompany(
        {
          name: newCompany,
          region,
          state,
          city,
          ...(cnpj ? { cnpj } : {}),
          ...(contact ? { contact } : {}),
        },
        role,
      );
    }
    addPerson(
      {
        name: String(form.get("name")),
        email,
        phone: "",
        team: team.name,
        teamId: team.id,
        region,
        state,
        city,
        memberCode,
        affiliation,
        ...(affiliation === "empresa" && companyId ? { companyId } : {}),
        workload: String(form.get("workload")) as WorkloadType,
        hourlyRate: Number(form.get("hourlyRate")),
        goalHours: Number(form.get("goalHours")),
        targetDaysPerWeek: Number(form.get("targetDaysPerWeek")),
        cycleStartsAt: String(form.get("cycleStartsAt")),
        equipmentIds: form.getAll("equipmentIds").map(String),
        serviceName: String(form.get("serviceName")),
        minuteCode: String(form.get("minuteCode")),
        weekendAvailability: String(form.get("weekendAvailability") || "nenhum") as
          "nenhum" | "sabado" | "domingo" | "ambos",
        ...(activeAccount?.personId ? { supervisorId: activeAccount.personId } : {}),
      },
      role,
    );
    onClose();
  }
  return (
    <Modal
      title="Cadastrar membro"
      description="Defina vínculo, ciclo, meta e equipamentos em um único fluxo."
      onClose={onClose}
    >
      <form className="cx-operation-form" onSubmit={submit}>
        <div className="cx-form-grid">
          <label>
            Nome completo
            <input name="name" required />
          </label>
          <label>
            E-mail
            <input name="email" type="email" required />
          </label>
          <label>
            Serviço realizado
            <input name="serviceName" placeholder="Ex.: manutenção automotiva" required />
          </label>
          <label>
            Código Minute
            <input name="minuteCode" placeholder="Ex.: JF1-NOME-26" required />
          </label>
          <label>
            Código de identificação
            <input
              name="memberCode"
              defaultValue={`${locationCode(state, city)}-${String(data.people.length + 1).padStart(4, "0")}`}
              required
            />
          </label>
          <label>
            Equipe
            <select
              name="teamId"
              value={selectedTeam?.id ?? ""}
              onChange={(event) => {
                const next = availableTeams.find((item) => item.id === event.target.value);
                setTeamId(event.target.value);
                if (next) {
                  setRegion(next.region ?? regionForState(next.state ?? "MG"));
                  setState(next.state ?? "MG");
                  setCity(next.city);
                }
              }}
              required
            >
              {availableTeams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
          </label>
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
            Vínculo
            <select
              name="affiliation"
              value={affiliation}
              onChange={(event) => setAffiliation(event.target.value as AffiliationType)}
            >
              <option value="autonomo">Autônomo</option>
              <option value="empresa">Empresa</option>
            </select>
          </label>
        </div>
        {affiliation === "empresa" ? (
          <div className="cx-company-choice">
            <label>
              Empresa existente
              <select name="companyId" defaultValue="">
                <option value="">Selecione</option>
                {data.companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>
            </label>
            <span>ou</span>
            <label>
              Nova empresa
              <input name="newCompany" placeholder="Nome da empresa" />
            </label>
            <label>
              CNPJ opcional
              <input name="cnpj" />
            </label>
          </div>
        ) : null}
        <div className="cx-form-grid">
          <label>
            Jornada
            <select name="workload" defaultValue="full_time">
              <option value="full_time">Full time</option>
              <option value="part_time">Part time</option>
            </select>
          </label>
          <label>
            Valor por hora
            <input name="hourlyRate" type="number" min="0" step="0.01" defaultValue="15" required />
          </label>
          <label>
            Início do ciclo
            <input name="cycleStartsAt" type="date" defaultValue="2026-08-07" required />
          </label>
          <label>
            Meta de horas
            <input name="goalHours" type="number" min="0" defaultValue="100" required />
          </label>
          <label>
            Dias por semana
            <input
              name="targetDaysPerWeek"
              type="number"
              min="1"
              max="7"
              defaultValue="5"
              required
            />
          </label>
          <label>
            Fim de semana
            <select name="weekendAvailability" defaultValue="nenhum">
              <option value="nenhum">Nenhum</option>
              <option value="sabado">Sábado</option>
              <option value="domingo">Domingo</option>
              <option value="ambos">Sábado e domingo</option>
            </select>
          </label>
        </div>
        <fieldset className="cx-equipment-options">
          <legend>Equipamentos disponíveis</legend>
          {data.equipment
            .filter(
              (item) =>
                item.status === "disponivel" &&
                (role === "lider" || item.teamId === activeAccount?.teamId),
            )
            .map((item) => (
              <label key={item.id}>
                <input name="equipmentIds" value={item.id} type="checkbox" /> {item.type} ·{" "}
                {item.model}
              </label>
            ))}
        </fieldset>
        <button className="cx-button" type="submit">
          Salvar membro e iniciar ciclo
        </button>
      </form>
    </Modal>
  );
}

export function PaymentDialog({ role, onClose }: { role: Role; onClose(): void }) {
  const { data, activeAccount, addPayment } = useAppData();
  const teamName = data?.teams.find((team) => team.id === activeAccount?.teamId)?.name;
  const visibleMembers =
    data?.people.filter(
      (person) => person.role === "membro" && (role === "lider" || person.team === teamName),
    ) ?? [];
  const first = visibleMembers[0]?.id ?? "";
  const [personId, setPersonId] = useState(first);
  const suggestion = useMemo(() => {
    if (!data) return null;
    const person = data.people.find((item) => item.id === personId);
    const cycle = data.cycles.find((item) => item.personId === personId && item.status === "ativo");
    const captures = data.captures.filter(
      (item) =>
        item.personId === personId &&
        item.status === "aprovado" &&
        (!cycle ||
          (item.recordedAt.slice(0, 10) >= cycle.startsAt &&
            item.recordedAt.slice(0, 10) <= cycle.endsAt)),
    );
    const hours = captures.reduce((sum, item) => sum + item.minutes, 0) / 60;
    return {
      person,
      cycle,
      captures,
      hours,
      equipmentIds: [...new Set(captures.map((item) => item.equipmentId))],
    };
  }, [data, personId]);
  if (!data || !suggestion?.person) return null;
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    addPayment(
      {
        personId,
        ...(suggestion?.cycle ? { cycleId: suggestion.cycle.id } : {}),
        hours: Number(form.get("hours")),
        hourlyRate: Number(form.get("hourlyRate")),
        amount: Number(form.get("amount")),
        captureIds: suggestion?.captures.map((item) => item.id) ?? [],
        equipmentIds: suggestion?.equipmentIds ?? [],
        status: String(form.get("status")) as "previsto" | "pago",
      },
      role,
    );
    onClose();
  }
  const amount = suggestion.hours * suggestion.person.hourlyRate;
  return (
    <Modal
      title="Registrar pagamento"
      description="A sugestão usa apenas capturas aprovadas no ciclo."
      onClose={onClose}
    >
      <form className="cx-operation-form" onSubmit={submit}>
        <label>
          Membro
          <select value={personId} onChange={(event) => setPersonId(event.target.value)}>
            {visibleMembers.map((person) => (
              <option key={person.id} value={person.id}>
                {person.name}
              </option>
            ))}
          </select>
        </label>
        <div className="cx-payment-source">
          <span>
            <small>Capturas aprovadas</small>
            <strong>{suggestion.captures.length}</strong>
          </span>
          <span>
            <small>Horas sugeridas</small>
            <strong>{formatHours(Math.round(suggestion.hours * 60))}</strong>
          </span>
          <span>
            <small>Equipamentos usados</small>
            <strong>{suggestion.equipmentIds.length}</strong>
          </span>
        </div>
        <div className="cx-form-grid">
          <label>
            Horas
            <input
              name="hours"
              type="number"
              min="0"
              step="0.01"
              defaultValue={suggestion.hours.toFixed(2)}
              key={`hours-${personId}`}
            />
          </label>
          <label>
            Valor/hora
            <input
              name="hourlyRate"
              type="number"
              min="0"
              step="0.01"
              defaultValue={suggestion.person.hourlyRate}
              key={`rate-${personId}`}
            />
          </label>
          <label>
            Valor total
            <input
              name="amount"
              type="number"
              min="0"
              step="0.01"
              defaultValue={amount.toFixed(2)}
              key={`amount-${personId}`}
            />
          </label>
          <label>
            Status
            <select name="status">
              <option value="previsto">Previsto</option>
              <option value="pago">Pago</option>
            </select>
          </label>
        </div>
        <p className="cx-muted">
          Sugestão inicial: {formatMoney(amount)}. Ajustes ficam registrados na auditoria.
        </p>
        <button className="cx-button" type="submit">
          Registrar pagamento
        </button>
      </form>
    </Modal>
  );
}
