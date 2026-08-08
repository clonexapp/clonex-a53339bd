import { seedData } from "@/data/seed";
import type { AppData } from "@/domain/types";
import type { AppRepository } from "@/repositories/app-repository";

const STORAGE_KEY = "clonex:app-data:v3";
const PREVIOUS_STORAGE_KEY = "clonex:app-data:v2";
const LEGACY_STORAGE_KEY = "clonex:app-data:v1";

function cloneSeed(): AppData {
  return structuredClone(seedData);
}

function normalizeData(value: Partial<AppData>): AppData {
  const fallback = cloneSeed();
  const people = (value.people ?? fallback.people).map((person) => ({
    ...person,
    targetDaysPerWeek: person.targetDaysPerWeek ?? 5,
    email: person.email ?? "",
    phone: person.phone ?? "",
    affiliation: person.affiliation ?? "autonomo",
    workload: person.workload ?? "full_time",
    hourlyRate: person.hourlyRate ?? 15,
  }));
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
    companies: value.companies ?? fallback.companies,
    cycles,
    captures: value.captures ?? fallback.captures,
    equipment: value.equipment ?? fallback.equipment,
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
    consentRecords: value.consentRecords ?? fallback.consentRecords,
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
    auditEvents: value.auditEvents ?? fallback.auditEvents,
  };
}

export const localAppRepository: AppRepository = {
  async load() {
    if (typeof window === "undefined") return cloneSeed();

    const stored =
      window.localStorage.getItem(STORAGE_KEY) ??
      window.localStorage.getItem(PREVIOUS_STORAGE_KEY) ??
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
