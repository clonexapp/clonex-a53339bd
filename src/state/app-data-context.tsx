import { useEffect, useMemo, useState, type ReactNode } from "react";

import type { AppData, Role } from "@/domain/types";
import { localAppRepository } from "@/repositories/local-app-repository";
import { localAssetRepository } from "@/repositories/local-asset-repository";
import { AppDataContext, type AppDataContextValue } from "@/state/app-data-context-value";

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AppData | null>(null);

  useEffect(() => {
    void localAppRepository.load().then(setData);
  }, []);

  function update(updater: (current: AppData) => AppData) {
    setData((current) => {
      if (!current) return current;
      const next = updater(current);
      void localAppRepository.save(next);
      return next;
    });
  }

  function actorFor(role: Role): { actorName: string; actorId?: string } {
    if (role === "lider") return { actorName: "Matheus Gasparetto" };
    if (role === "subleader") return { actorName: "Marina Alves", actorId: "p6" };
    return { actorName: "Rafael Diniz", actorId: "p1" };
  }

  function nextMonth(dateValue: string): string {
    const [year = 2026, month = 1, day = 1] = dateValue.split("-").map(Number);
    const lastDay = new Date(year, month + 1, 0).getDate();
    return `${month === 12 ? year + 1 : year}-${String(month === 12 ? 1 : month + 1).padStart(2, "0")}-${String(Math.min(day, lastDay)).padStart(2, "0")}`;
  }

  const value = useMemo<AppDataContextValue>(
    () => ({
      data,
      addCapture(input) {
        update((current) => {
          const id = crypto.randomUUID();
          const occurredAt = new Date().toISOString();
          return {
            ...current,
            captures: [
              {
                id,
                personId: "p1",
                status: "pendente",
                recordedAt: occurredAt,
                ...input,
              },
              ...current.captures,
            ],
            auditEvents: [
              {
                id: crypto.randomUUID(),
                entity: "capture",
                entityId: id,
                action: "capture.created",
                actorId: "p1",
                actorName: "Rafael Diniz",
                actorRole: "membro",
                occurredAt,
                details: `Registrou ${input.minutes} minutos de ${input.activity}.`,
              },
              ...current.auditEvents,
            ],
          };
        });
      },
      addEquipment(input, actorRole) {
        update((current) => {
          const id = crypto.randomUUID();
          const actor = actorFor(actorRole);
          const occurredAt = new Date().toISOString();
          return {
            ...current,
            equipment: [...current.equipment, { id, status: "disponivel", ...input }],
            auditEvents: [
              {
                id: crypto.randomUUID(),
                entity: "equipment",
                entityId: id,
                action: "equipment.created",
                ...actor,
                actorRole,
                occurredAt,
                details: `Cadastrou ${input.type} ${input.model}.`,
              },
              ...current.auditEvents,
            ],
          };
        });
      },
      addCompany(input, actorRole) {
        const id = crypto.randomUUID();
        update((current) => {
          const actor = actorFor(actorRole);
          const occurredAt = new Date().toISOString();
          return {
            ...current,
            companies: [...current.companies, { id, active: true, ...input }],
            auditEvents: [
              {
                id: crypto.randomUUID(),
                entity: "company",
                entityId: id,
                action: "company.created",
                ...actor,
                actorRole,
                occurredAt,
                details: `Cadastrou a empresa ${input.name}.`,
              },
              ...current.auditEvents,
            ],
          };
        });
        return id;
      },
      addPerson(input, actorRole) {
        update((current) => {
          const id = crypto.randomUUID();
          const cycleId = crypto.randomUUID();
          const actor = actorFor(actorRole);
          const occurredAt = new Date().toISOString();
          const assignments = input.equipmentIds.map((equipmentId) => ({
            id: crypto.randomUUID(),
            equipmentId,
            personId: id,
            workload: input.workload,
            startsAt: input.cycleStartsAt,
            active: true,
          }));
          return {
            ...current,
            people: [
              ...current.people,
              {
                id,
                name: input.name,
                role: "membro",
                team: input.team,
                city: input.city,
                goalHours: input.goalHours,
                targetDaysPerWeek: input.targetDaysPerWeek,
                active: true,
                email: input.email,
                phone: input.phone,
                affiliation: input.affiliation,
                ...(input.companyId ? { companyId: input.companyId } : {}),
                workload: input.workload,
                hourlyRate: input.hourlyRate,
              },
            ],
            cycles: [
              ...current.cycles,
              {
                id: cycleId,
                personId: id,
                startsAt: input.cycleStartsAt,
                endsAt: nextMonth(input.cycleStartsAt),
                goalHours: input.goalHours,
                targetDaysPerWeek: input.targetDaysPerWeek,
                status: "ativo",
              },
            ],
            equipmentAssignments: [...current.equipmentAssignments, ...assignments],
            equipment: current.equipment.map((item) =>
              input.equipmentIds.includes(item.id)
                ? { ...item, assignedTo: id, status: "em_uso" }
                : item,
            ),
            auditEvents: [
              {
                id: crypto.randomUUID(),
                entity: "person",
                entityId: id,
                action: "person.created",
                ...actor,
                actorRole,
                occurredAt,
                details: `Cadastrou ${input.name} como ${input.affiliation === "empresa" ? "membro de empresa" : "autônomo"}.`,
              },
              ...current.auditEvents,
            ],
          };
        });
      },
      async addConsent(personId, file, validUntil, actorRole) {
        const storageKey = `consent-${personId}-${crypto.randomUUID()}`;
        await localAssetRepository.save(storageKey, file);
        update((current) => {
          const actor = actorFor(actorRole);
          const occurredAt = new Date().toISOString();
          return {
            ...current,
            consentRecords: [
              ...current.consentRecords.map((record) =>
                record.personId === personId ? { ...record, active: false } : record,
              ),
              {
                id: crypto.randomUUID(),
                personId,
                storageKey,
                fileName: file.name,
                mimeType: file.type || "application/octet-stream",
                size: file.size,
                uploadedAt: occurredAt,
                uploadedBy: actor.actorName,
                ...(validUntil ? { validUntil } : {}),
                active: true,
              },
            ],
            auditEvents: [
              {
                id: crypto.randomUUID(),
                entity: "consent",
                entityId: personId,
                action: "consent.uploaded",
                ...actor,
                actorRole,
                occurredAt,
                details: `Registrou o termo ${file.name}.`,
              },
              ...current.auditEvents,
            ],
          };
        });
      },
      downloadConsent(storageKey, fileName) {
        return localAssetRepository.open(storageKey, fileName);
      },
      addPayment(input, actorRole) {
        update((current) => {
          const actor = actorFor(actorRole);
          const occurredAt = new Date().toISOString();
          const cycle = current.cycles.find((item) => item.id === input.cycleId);
          const period = cycle
            ? `${cycle.startsAt.split("-").reverse().slice(0, 2).join("/")}–${cycle.endsAt.split("-").reverse().slice(0, 2).join("/")}`
            : "Período informado";
          const id = crypto.randomUUID();
          return {
            ...current,
            payments: [
              { id, period, registeredAt: occurredAt, registeredBy: actor.actorName, ...input },
              ...current.payments,
            ],
            auditEvents: [
              {
                id: crypto.randomUUID(),
                entity: "payment",
                entityId: id,
                action: "payment.created",
                ...actor,
                actorRole,
                occurredAt,
                details: `Registrou pagamento de ${input.hours}h no valor de R$ ${input.amount.toFixed(2)}.`,
              },
              ...current.auditEvents,
            ],
          };
        });
      },
      updateCycle(id, input, actorRole) {
        update((current) => {
          const actor = actorFor(actorRole);
          const occurredAt = new Date().toISOString();
          const cycle = current.cycles.find((item) => item.id === id);
          return {
            ...current,
            cycles: current.cycles.map((item) =>
              item.id === id
                ? {
                    ...item,
                    ...input,
                    goalHours: Math.max(0, input.goalHours),
                    targetDaysPerWeek: Math.min(7, Math.max(1, input.targetDaysPerWeek)),
                  }
                : item,
            ),
            people: cycle
              ? current.people.map((person) =>
                  person.id === cycle.personId
                    ? {
                        ...person,
                        goalHours: Math.max(0, input.goalHours),
                        targetDaysPerWeek: Math.min(7, Math.max(1, input.targetDaysPerWeek)),
                      }
                    : person,
                )
              : current.people,
            auditEvents: [
              {
                id: crypto.randomUUID(),
                entity: "cycle",
                entityId: id,
                action: "cycle.updated",
                ...actor,
                actorRole,
                occurredAt,
                details: `Atualizou o ciclo para ${input.startsAt} a ${input.endsAt}, com meta de ${input.goalHours}h.`,
              },
              ...current.auditEvents,
            ],
          };
        });
      },
      updateCaptureStatus(id, status, actorRole) {
        update((current) => {
          const actor = actorFor(actorRole);
          const occurredAt = new Date().toISOString();
          const capture = current.captures.find((item) => item.id === id);
          return {
            ...current,
            captures: current.captures.map((item) =>
              item.id === id
                ? { ...item, status, reviewedAt: occurredAt, reviewedBy: actor.actorName }
                : item,
            ),
            auditEvents: capture
              ? [
                  {
                    id: crypto.randomUUID(),
                    entity: "capture",
                    entityId: id,
                    action: status === "aprovado" ? "capture.approved" : "capture.rejected",
                    ...actor,
                    actorRole,
                    occurredAt,
                    details: `${status === "aprovado" ? "Aprovou" : "Reprovou"} ${capture.activity}.`,
                  },
                  ...current.auditEvents,
                ]
              : current.auditEvents,
          };
        });
      },
      updatePersonGoal(id, goalHours, actorRole) {
        update((current) => {
          const actor = actorFor(actorRole);
          const nextGoal = Math.max(0, goalHours);
          return {
            ...current,
            people: current.people.map((person) =>
              person.id === id ? { ...person, goalHours: nextGoal } : person,
            ),
            auditEvents: [
              {
                id: crypto.randomUUID(),
                entity: "goal",
                entityId: id,
                action: "goal.updated",
                ...actor,
                actorRole,
                occurredAt: new Date().toISOString(),
                details: `Alterou a meta mensal para ${nextGoal} horas.`,
              },
              ...current.auditEvents,
            ],
          };
        });
      },
      markNoticesRead(role) {
        update((current) => ({
          ...current,
          notices: current.notices.map((notice) =>
            notice.role === role ? { ...notice, read: true } : notice,
          ),
        }));
      },
      async resetDemo() {
        setData(await localAppRepository.reset());
      },
    }),
    [data],
  );

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}
