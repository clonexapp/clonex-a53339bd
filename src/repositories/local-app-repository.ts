import { seedData } from "@/data/seed";
import type { AppData } from "@/domain/types";
import type { AppRepository } from "@/repositories/app-repository";

const STORAGE_KEY = "clonex:app-data:v2";
const LEGACY_STORAGE_KEY = "clonex:app-data:v1";

function cloneSeed(): AppData {
  return structuredClone(seedData);
}

function normalizeData(value: Partial<AppData>): AppData {
  const fallback = cloneSeed();
  return {
    people: (value.people ?? fallback.people).map((person) => ({
      ...person,
      targetDaysPerWeek: person.targetDaysPerWeek ?? 5,
    })),
    captures: value.captures ?? fallback.captures,
    equipment: value.equipment ?? fallback.equipment,
    payments: value.payments ?? fallback.payments,
    notices: value.notices ?? fallback.notices,
    auditEvents: value.auditEvents ?? fallback.auditEvents,
  };
}

export const localAppRepository: AppRepository = {
  async load() {
    if (typeof window === "undefined") return cloneSeed();

    const stored =
      window.localStorage.getItem(STORAGE_KEY) ?? window.localStorage.getItem(LEGACY_STORAGE_KEY);
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
