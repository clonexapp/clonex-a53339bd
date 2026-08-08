import { seedData } from "@/data/seed";
import type { AppData, Person } from "@/domain/types";
import type { AppRepository } from "@/repositories/app-repository";

const STORAGE_KEY = "clonex:app-data:v4";
const PREVIOUS_STORAGE_KEY = "clonex:app-data:v3";
const OLDER_STORAGE_KEY = "clonex:app-data:v2";
const LEGACY_STORAGE_KEY = "clonex:app-data:v1";

function cloneSeed(): AppData {
  return structuredClone(seedData);
}

function normalizeData(value: Partial<AppData>): AppData {
  const fallback = cloneSeed();
  const people: Person[] = (value.people ?? fallback.people).map((person) => ({
    ...person,
    targetDaysPerWeek: person.targetDaysPerWeek ?? 5,
    email: person.email ?? "",
    phone: person.phone ?? "",
    affiliation: person.affiliation ?? "autonomo",
    workload: person.workload ?? "full_time",
    hourlyRate: person.hourlyRate ?? 15,
    serviceName: person.serviceName ?? "Captura de atividades operacionais",
    supervisorId:
      person.supervisorId ??
      (person.role === "membro" ? (person.team === "JF-1" ? "p6" : "p7") : undefined),
    minuteCode: person.minuteCode ?? `MIN-${person.id.toUpperCase()}`,
  }));
  const marina = people.find((person) => person.id === "p6");
  if (marina) marina.team = "JF-1";
  if (!people.some((person) => person.id === "p7")) {
    const secondSupervisor = fallback.people.find((person) => person.id === "p7");
    if (secondSupervisor) people.push(secondSupervisor);
  }
  const cycles =
    value.cycles ??
    people
      .filter((person) => person.role === "membro")
      .map((person) => ({
        id: `migrated-cycle-${person.id}`,
        personId: person.id,
        startsAt: "2026-08-06",
        endsAt: "2026-09-06",
        goalHours: person.goalHours,
        targetDaysPerWeek: person.targetDaysPerWeek,
        status: "ativo" as const,
      }));
  return {
    people,
    teams: value.teams ?? fallback.teams,
    companies: value.companies ?? fallback.companies,
    cycles,
    captures: value.captures ?? fallback.captures,
    equipment: (value.equipment ?? fallback.equipment).map((item, index) => ({
      ...item,
      color: item.color ?? (item.type === "capacete" ? "Roxo" : "Preto"),
      batchId: item.batchId ?? `migrated-batch-${item.id}`,
      assetCode: item.assetCode ?? `CX-${String(index + 1).padStart(4, "0")}`,
      ...(item.type === "capacete" && !item.size
        ? { size: item.model.replace("Tamanho ", "") }
        : {}),
    })),
    equipmentAssignments:
      value.equipmentAssignments ??
      (value.equipment ?? fallback.equipment).flatMap((item) =>
        item.assignedTo
          ? [
              {
                id: `migrated-assignment-${item.id}`,
                equipmentId: item.id,
                personId: item.assignedTo,
                workload: "full_time" as const,
                startsAt: "2026-08-06",
                active: true,
              },
            ]
          : [],
      ),
    consentRecords: (value.consentRecords ?? fallback.consentRecords).map((record) => ({
      ...record,
      mode: record.mode ?? "upload",
      signedAt: record.signedAt ?? record.uploadedAt,
      signedBy: record.signedBy ?? record.uploadedBy,
    })),
    policyAcceptances: value.policyAcceptances ?? [],
    payments: (value.payments ?? fallback.payments).map((payment) => ({
      ...payment,
      captureIds: payment.captureIds ?? [],
      equipmentIds: payment.equipmentIds ?? [],
      hourlyRate:
        payment.hourlyRate ??
        (people.find((person) => person.id === payment.personId)?.hourlyRate || 15),
      registeredAt: payment.registeredAt ?? new Date().toISOString(),
      registeredBy: payment.registeredBy ?? "Migração local",
    })),
    notices: value.notices ?? fallback.notices,
    auditEvents: (value.auditEvents ?? fallback.auditEvents).map((event) => ({
      ...event,
      category:
        event.category ??
        (
          {
            capture: "captura",
            person: "pessoa",
            equipment: "equipamento",
            consent: "consentimento",
            goal: "meta",
            payment: "pagamento",
            cycle: "ciclo",
            company: "pessoa",
            assignment: "equipamento",
          } as const
        )[event.entity],
      targetPersonId:
        event.targetPersonId ??
        (event.entity === "person" || event.entity === "goal" ? event.entityId : undefined),
    })),
    accessEvents: value.accessEvents ?? fallback.accessEvents,
    activitySeen: value.activitySeen ?? [],
  };
}

export const localAppRepository: AppRepository = {
  async load() {
    if (typeof window === "undefined") return cloneSeed();

    const stored =
      window.localStorage.getItem(STORAGE_KEY) ??
      window.localStorage.getItem(PREVIOUS_STORAGE_KEY) ??
      window.localStorage.getItem(OLDER_STORAGE_KEY) ??
      window.localStorage.getItem(LEGACY_STORAGE_KEY);
    if (!stored) return cloneSeed();

    try {
      const data = normalizeData(JSON.parse(stored) as Partial<AppData>);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return data;
    } catch {
      return cloneSeed();
    }
  },

  async save(data) {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  },

  async reset() {
    const data = cloneSeed();
    await this.save(data);
    return data;
  },
};
