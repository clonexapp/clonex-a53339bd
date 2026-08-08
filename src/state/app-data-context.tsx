import { useEffect, useMemo, useState, type ReactNode } from "react";

import type { AppData, Role } from "@/domain/types";
import { localAppRepository } from "@/repositories/local-app-repository";
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
