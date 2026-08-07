import { createContext } from "react";

import type { AppData, CaptureStatus, NewCapture, NewEquipment, Role } from "@/domain/types";

export interface AppDataContextValue {
  data: AppData | null;
  addCapture(input: NewCapture): void;
  addEquipment(input: NewEquipment): void;
  updateCaptureStatus(id: string, status: CaptureStatus): void;
  updatePersonGoal(id: string, goalHours: number): void;
  markNoticesRead(role: Role): void;
  resetDemo(): Promise<void>;
}

export const AppDataContext = createContext<AppDataContextValue | null>(null);
