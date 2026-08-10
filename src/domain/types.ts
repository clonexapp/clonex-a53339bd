export type Role = "membro" | "subleader" | "lider";

export type CaptureStatus = "pendente" | "aprovado" | "reprovado" | "cancelado";
export type EquipmentStatus = "disponivel" | "em_uso" | "manutencao";
export type EquipmentType = "capacete" | "celular";
export type WorkloadType = "full_time" | "part_time";
export type AffiliationType = "autonomo" | "empresa";
export type CycleStatus = "ativo" | "encerrado" | "planejado";
export type ReportPeriod = "week" | "month";
export type ReportMetric =
  | "quantity"
  | "predictability"
  | "quality"
  | "active_people"
  | "pending_reviews"
  | "consent_coverage";

export type AuditCategory =
  "captura" | "pessoa" | "equipamento" | "consentimento" | "meta" | "pagamento" | "ciclo" | "conta";
export type ConsentMode = "upload" | "fisico" | "digital";
export type AccountStatus = "pendente" | "ativa" | "desativada";
export type WeekendAvailability = "nenhum" | "sabado" | "domingo" | "ambos";
export type GeographicRegion =
  "Norte" | "Nordeste" | "Centro-Oeste" | "Sudeste" | "Sul" | "Internacional";

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
  kind: "person" | "team" | "city" | "state" | "region" | "country";
  value: string;
}

export interface Person {
  id: string;
  name: string;
  role: Role;
  team: string;
  teamId?: string;
  region?: GeographicRegion;
  state?: string;
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
  serviceName: string;
  supervisorId?: string | undefined;
  minuteCode: string;
  memberCode?: string;
  weekendAvailability: WeekendAvailability;
  archivedAt?: string;
  archivedBy?: string;
}

export interface Team {
  id: string;
  name: string;
  region?: GeographicRegion;
  state?: string;
  city: string;
  supervisorId?: string | undefined;
}

export interface AccessAccount {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: AccountStatus;
  personId?: string | undefined;
  teamId?: string | undefined;
  createdAt: string;
}

export interface Company {
  id: string;
  name: string;
  region?: GeographicRegion;
  state?: string;
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
  minuteReference?: string;
}

export interface CaptureChangeRequest {
  id: string;
  captureId: string;
  type: "correcao" | "cancelamento";
  reason: string;
  requestedBy: string;
  requestedAt: string;
  status: "pendente" | "aprovada" | "rejeitada" | "retirada";
  original: Pick<Capture, "activity" | "minutes" | "equipmentId" | "recordedAt">;
  proposed?: Partial<Pick<Capture, "activity" | "minutes" | "equipmentId" | "recordedAt">>;
  resolvedBy?: string;
  resolvedAt?: string;
  resolutionNote?: string;
}

export interface Equipment {
  id: string;
  type: EquipmentType;
  model: string;
  owner: "clonex" | "proprio";
  status: EquipmentStatus;
  assignedTo?: string | undefined;
  size?: string;
  color: string;
  batchId: string;
  assetCode: string;
  teamId?: string | undefined;
  deviceNumber?: number | undefined;
  deviceEmail?: string | undefined;
}

export interface EquipmentAssignment {
  id: string;
  equipmentId: string;
  personId: string;
  workload: WorkloadType;
  startsAt: string;
  endsAt?: string;
  active: boolean;
  confirmedAt?: string | undefined;
  confirmedBy?: string | undefined;
}

export interface ConsentDeclaration {
  id: string;
  personId: string;
  declaredAt: string;
  declaredBy: string;
}

export interface MemberTriage {
  id: string;
  personId: string;
  status: "pendente" | "concluida";
  decision?: "continuar" | "pausar" | "encerrar";
  notes?: string;
  completedAt?: string;
  completedBy?: string;
}

export interface WeeklyBusinessForecast {
  id: string;
  teamId: string;
  weekStartsAt: string;
  expectedPeople: number;
  expectedHours: number;
  notes: string;
  updatedAt: string;
  updatedBy: string;
}

export interface ConsentRecord {
  id: string;
  personId: string;
  mode: ConsentMode;
  storageKey?: string | undefined;
  fileName?: string | undefined;
  mimeType?: string | undefined;
  size?: number | undefined;
  uploadedAt: string;
  uploadedBy: string;
  validUntil?: string;
  active: boolean;
  signedAt: string;
  signedBy: string;
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
  category: AuditCategory;
  team?: string | undefined;
  targetRole?: Role | undefined;
  targetPersonId?: string | undefined;
}

export interface AppAccessEvent {
  id: string;
  personId: string;
  accessedAt: string;
}

export interface ActivitySeen {
  id: string;
  role: Role;
  eventId: string;
  seenAt: string;
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
  accounts: AccessAccount[];
  teams: Team[];
  companies: Company[];
  cycles: MemberCycle[];
  captures: Capture[];
  captureChangeRequests: CaptureChangeRequest[];
  equipment: Equipment[];
  equipmentAssignments: EquipmentAssignment[];
  consentRecords: ConsentRecord[];
  consentDeclarations: ConsentDeclaration[];
  policyAcceptances: PolicyAcceptance[];
  payments: Payment[];
  notices: Notice[];
  auditEvents: AuditEvent[];
  accessEvents: AppAccessEvent[];
  activitySeen: ActivitySeen[];
  memberTriages: MemberTriage[];
  weeklyForecasts: WeeklyBusinessForecast[];
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
  size?: string;
  color: string;
  quantity: number;
  teamId?: string;
  firstDeviceNumber?: number;
  firstDeviceEmail?: string;
  allocations?: Array<{ personId?: string; workload: WorkloadType }>;
}

export interface NewPerson {
  name: string;
  email: string;
  phone: string;
  team: string;
  teamId: string;
  region: GeographicRegion;
  state: string;
  city: string;
  affiliation: AffiliationType;
  companyId?: string;
  workload: WorkloadType;
  hourlyRate: number;
  goalHours: number;
  targetDaysPerWeek: number;
  cycleStartsAt: string;
  equipmentIds: string[];
  serviceName: string;
  supervisorId?: string;
  minuteCode: string;
  memberCode: string;
  weekendAvailability: WeekendAvailability;
}

export interface NewCompany {
  name: string;
  region: GeographicRegion;
  state: string;
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
