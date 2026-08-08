export type Role = "membro" | "subleader" | "lider";

export type CaptureStatus = "pendente" | "aprovado" | "reprovado";
export type EquipmentStatus = "disponivel" | "em_uso" | "manutencao";
export type EquipmentType = "capacete" | "celular";
export type ReportPeriod = "week" | "month";
export type ReportMetric =
  "quantity" | "predictability" | "quality" | "active_people" | "pending_reviews";

export type AuditEntity = "capture" | "person" | "equipment" | "payment" | "goal";

export interface ReportScope {
  kind: "person" | "team" | "city";
  value: string;
}

export interface Person {
  id: string;
  name: string;
  role: Role;
  team: string;
  city: string;
  goalHours: number;
  targetDaysPerWeek: number;
  active: boolean;
}

export interface Capture {
  id: string;
  personId: string;
  activity: string;
  minutes: number;
  equipmentId: string;
  status: CaptureStatus;
  recordedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
}

export interface Equipment {
  id: string;
  type: EquipmentType;
  model: string;
  owner: "clonex" | "proprio";
  status: EquipmentStatus;
  assignedTo?: string;
}

export interface Payment {
  id: string;
  personId: string;
  period: string;
  hours: number;
  amount: number;
  status: "previsto" | "pago";
}

export interface Notice {
  id: string;
  role: Role;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface AuditEvent {
  id: string;
  entity: AuditEntity;
  entityId: string;
  action: string;
  actorId?: string;
  actorName: string;
  actorRole: Role;
  occurredAt: string;
  details: string;
}

export interface MetricHistoryItem {
  id: string;
  personId?: string;
  actorName: string;
  summary: string;
  value: string;
  percentage?: number;
  occurredAt: string;
  captureIds: string[];
}

export interface MetricSource {
  metric: ReportMetric;
  title: string;
  value: string;
  percentage: number;
  actual: string;
  formula: string;
  origin: string;
  updatedAt: string;
  history: MetricHistoryItem[];
  secondary?: {
    label: string;
    value: string;
    percentage: number;
  };
}

export interface AppData {
  people: Person[];
  captures: Capture[];
  equipment: Equipment[];
  payments: Payment[];
  notices: Notice[];
  auditEvents: AuditEvent[];
}

export interface NewCapture {
  activity: string;
  minutes: number;
  equipmentId: string;
}

export interface NewEquipment {
  type: EquipmentType;
  model: string;
  owner: "clonex" | "proprio";
}
