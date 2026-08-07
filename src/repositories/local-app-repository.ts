import { seedData } from "@/data/seed";
import type { AppData } from "@/domain/types";
import type { AppRepository } from "@/repositories/app-repository";

const STORAGE_KEY = "clonex:app-data:v1";

function cloneSeed(): AppData {
  return structuredClone(seedData);
}

export const localAppRepository: AppRepository = {
  async load() {
    if (typeof window === "undefined") return cloneSeed();

    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return cloneSeed();

    try {
      return JSON.parse(stored) as AppData;
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
