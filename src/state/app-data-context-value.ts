import { createContext } from "react";

import type { AppData, CaptureStatus, NewCapture, NewEquipment, Role } from "@/domain/types";

export interface AppDataContextValue {
  data: AppData | null;
  addCapture(input: NewCapture): void;
  addEquipment(input: NewEquipment, actorRole: Role): void;
  updateCaptureStatus(id: string, status: CaptureStatus, actorRole: Role): void;
  updatePersonGoal(id: string, goalHours: number, actorRole: Role): void;
  markNoticesRead(role: Role): void;
  resetDemo(): Promise<void>;
}

export const AppDataContext = createContext<AppDataContextValue | null>(null);
