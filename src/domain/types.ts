export type Role = "membro" | "subleader" | "lider";

export type CaptureStatus = "pendente" | "aprovado" | "reprovado";
export type EquipmentStatus = "disponivel" | "em_uso" | "manutencao";
export type EquipmentType = "capacete" | "celular";
export type WorkloadType = "full_time" | "part_time";
export type AffiliationType = "autonomo" | "empresa";
export type CycleStatus = "ativo" | "encerrado" | "planejado";
export type ReportPeriod = "week" | "month";
export type ReportMetric =
  "quantity" | "predictability" | "quality" | "active_people" | "pending_reviews";

export type AuditEntity =
  | "capture"
  | "person"
  | "equipment"
  | "payment"
  | "goal"
  | "company"
  | "cycle"
  | "consent"
  | "assignment";

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
  email: string;
  phone: string;
  affiliation: AffiliationType;
  companyId?: string;
  workload: WorkloadType;
  hourlyRate: number;
}

export interface Company {
  id: string;
  name: string;
  city: string;
  cnpj?: string;
  contact?: string;
  logoStorageKey?: string;
  active: boolean;
}

export interface MemberCycle {
  id: string;
  personId: string;
  startsAt: string;
  endsAt: string;
  goalHours: number;
  targetDaysPerWeek: number;
  status: CycleStatus;
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

export interface EquipmentAssignment {
  id: string;
  equipmentId: string;
  personId: string;
  workload: WorkloadType;
  startsAt: string;
  endsAt?: string;
  active: boolean;
}

export interface ConsentRecord {
  id: string;
  personId: string;
  storageKey: string;
  fileName: string;
  mimeType: string;
  size: number;
  uploadedAt: string;
  uploadedBy: string;
  validUntil?: string;
  active: boolean;
}

export interface PolicyAcceptance {
  id: string;
  personId: string;
  policy: "lgpd" | "privacidade" | "termos_de_uso";
  version: string;
  acceptedAt: string;
}

export interface Payment {
  id: string;
  personId: string;
  period: string;
  hours: number;
  amount: number;
  status: "previsto" | "pago";
  cycleId?: string;
  captureIds: string[];
  equipmentIds: string[];
  hourlyRate: number;
  registeredAt: string;
  registeredBy: string;
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
  companies: Company[];
  cycles: MemberCycle[];
  captures: Capture[];
  equipment: Equipment[];
  equipmentAssignments: EquipmentAssignment[];
  consentRecords: ConsentRecord[];
  policyAcceptances: PolicyAcceptance[];
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

export interface NewPerson {
  name: string;
  email: string;
  phone: string;
  team: string;
  city: string;
  affiliation: AffiliationType;
  companyId?: string;
  workload: WorkloadType;
  hourlyRate: number;
  goalHours: number;
  targetDaysPerWeek: number;
  cycleStartsAt: string;
  equipmentIds: string[];
}

export interface NewCompany {
  name: string;
  city: string;
  cnpj?: string;
  contact?: string;
}

export interface NewPayment {
  personId: string;
  cycleId?: string;
  hours: number;
  amount: number;
  hourlyRate: number;
  captureIds: string[];
  equipmentIds: string[];
  status: "previsto" | "pago";
}
