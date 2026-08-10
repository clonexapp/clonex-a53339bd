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
  AccessAccount,
  CaptureChangeRequest,
  WeekendAvailability,
} from "@/domain/types";

export interface AppDataContextValue {
  data: AppData | null;
  activeAccount: AccessAccount | null;
  selectAccount(id: string | null): void;
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
  requestCaptureChange(input: {
    captureId: string;
    type: CaptureChangeRequest["type"];
    reason: string;
    proposed?: CaptureChangeRequest["proposed"];
  }): void;
  withdrawCaptureChange(id: string): void;
  resolveCaptureChange(id: string, approved: boolean, note?: string): void;
  declareConsent(personId: string): void;
  confirmEquipment(personId: string, assetCode: string): boolean;
  completeTriage(id: string, decision: "continuar" | "pausar" | "encerrar", notes: string): void;
  saveWeeklyForecast(input: {
    teamId: string;
    weekStartsAt: string;
    expectedPeople: number;
    expectedHours: number;
    notes: string;
  }): void;
  saveSupervisor(input: {
    accountId?: string;
    personId?: string;
    name: string;
    email: string;
    teamId: string;
    status: "pendente" | "ativa" | "desativada";
  }): void;
  updateWeekendAvailability(personId: string, value: WeekendAvailability): void;
  markNoticesRead(role: Role): void;
  recordAccess(personId: string): void;
  markActivitiesSeen(role: Role): void;
  resetDemo(): Promise<void>;
}

export const AppDataContext = createContext<AppDataContextValue | null>(null);
