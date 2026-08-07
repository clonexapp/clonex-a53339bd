export type Role = "membro" | "subleader" | "lider";

export type CaptureStatus = "pendente" | "aprovado" | "reprovado";
export type EquipmentStatus = "disponivel" | "em_uso" | "manutencao";
export type EquipmentType = "capacete" | "celular";

export interface Person {
  id: string;
  name: string;
  role: Role;
  team: string;
  city: string;
  goalHours: number;
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

export interface AppData {
  people: Person[];
  captures: Capture[];
  equipment: Equipment[];
  payments: Payment[];
  notices: Notice[];
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
