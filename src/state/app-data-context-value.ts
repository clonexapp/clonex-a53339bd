import { createContext } from "react";

import type {
  AppData,
  CaptureStatus,
  NewCapture,
  NewCompany,
  NewEquipment,
  NewPayment,
  NewPerson,
  ConsentMode,
  Role,
} from "@/domain/types";

export interface AppDataContextValue {
  data: AppData | null;
  addCapture(input: NewCapture): void;
  addEquipment(input: NewEquipment, actorRole: Role): void;
  addCompany(input: NewCompany, actorRole: Role): string;
  addPerson(input: NewPerson, actorRole: Role): void;
  addConsent(
    personId: string,
    file: File,
    validUntil: string | undefined,
    actorRole: Role,
  ): Promise<void>;
  addSignedConsent(
    personId: string,
    mode: Exclude<ConsentMode, "upload">,
    validUntil: string | undefined,
    actorRole: Role,
  ): void;
  downloadConsent(storageKey: string, fileName: string): Promise<boolean>;
  addPayment(input: NewPayment, actorRole: Role): void;
  updateCycle(
    id: string,
    input: { startsAt: string; endsAt: string; goalHours: number; targetDaysPerWeek: number },
    actorRole: Role,
  ): void;
  updateCaptureStatus(id: string, status: CaptureStatus, actorRole: Role): void;
  updatePersonGoal(id: string, goalHours: number, actorRole: Role): void;
  markNoticesRead(role: Role): void;
  recordAccess(personId: string): void;
  markActivitiesSeen(role: Role): void;
  resetDemo(): Promise<void>;
}

export const AppDataContext = createContext<AppDataContextValue | null>(null);
