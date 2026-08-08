import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";

import type { AffiliationType, Role, WorkloadType } from "@/domain/types";
import { formatHours, formatMoney } from "@/lib/formatters";
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
  const { data, addCompany, addPerson } = useAppData();
  const [affiliation, setAffiliation] = useState<AffiliationType>("autonomo");
  if (!data) return null;
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    let companyId = String(form.get("companyId") || "") || undefined;
    const newCompany = String(form.get("newCompany") || "").trim();
    if (affiliation === "empresa" && newCompany) {
      const cnpj = String(form.get("cnpj") || "");
      const contact = String(form.get("email") || "");
      companyId = addCompany(
        {
          name: newCompany,
          city: String(form.get("city")),
          ...(cnpj ? { cnpj } : {}),
          ...(contact ? { contact } : {}),
        },
        role,
      );
    }
    addPerson(
      {
        name: String(form.get("name")),
        email: String(form.get("email")),
        phone: "",
        team: String(form.get("team")),
        city: String(form.get("city")),
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
        supervisorId: String(form.get("team")) === "JF-1" ? "p6" : "p7",
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
            Equipe
            <select name="team" defaultValue="JF-1">
              <option>JF-1</option>
              <option>JF-2</option>
            </select>
          </label>
          <label>
            Cidade
            <input name="city" defaultValue="Juiz de Fora" required />
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
        </div>
        <fieldset className="cx-equipment-options">
          <legend>Equipamentos disponíveis</legend>
          {data.equipment
            .filter((item) => item.status === "disponivel")
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
  const { data, addPayment } = useAppData();
  const first = data?.people.find((person) => person.role === "membro")?.id ?? "";
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
            {data.people
              .filter((person) => person.role === "membro")
              .map((person) => (
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
