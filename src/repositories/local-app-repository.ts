import { seedData } from "@/data/seed";
import type { AccessAccount, AppData, Person } from "@/domain/types";
import type { AppRepository } from "@/repositories/app-repository";

const STORAGE_KEY = "clonex:app-data:v5";
const PREVIOUS_KEYS = [
  "clonex:app-data:v4",
  "clonex:app-data:v3",
  "clonex:app-data:v2",
  "clonex:app-data:v1",
];

function cloneSeed(): AppData {
  return structuredClone(seedData);
}

function migratedTeam(name: string) {
  if (name === "JF-1") return "Equipe Pedro";
  if (name === "JF-2") return "Equipe Gasparetto";
  return name;
}

function normalizeData(value: Partial<AppData>): AppData {
  const fallback = cloneSeed();
  const sourcePeople = value.people ?? fallback.people;
  const people: Person[] = sourcePeople.map((person) => {
    const team = migratedTeam(person.team);
    return {
      ...person,
      team,
      targetDaysPerWeek: person.targetDaysPerWeek ?? 5,
      email: person.email ?? "",
      phone: person.phone ?? "",
      affiliation: person.affiliation ?? "autonomo",
      workload: person.workload ?? "full_time",
      hourlyRate: person.hourlyRate ?? 15,
      serviceName: person.serviceName ?? "Captura de atividades operacionais",
      supervisorId:
        person.supervisorId ??
        (person.role === "membro" ? (team === "Equipe Pedro" ? "p6" : "p7") : undefined),
      minuteCode: person.minuteCode ?? `MIN-${person.id.toUpperCase()}`,
      weekendAvailability: person.weekendAvailability ?? "nenhum",
    };
  });
  for (const supervisor of fallback.people.filter((person) => person.role === "subleader")) {
    const existing = people.find((person) => person.id === supervisor.id);
    if (existing) Object.assign(existing, supervisor);
    else people.push(supervisor);
  }

  const teams = fallback.teams.map((team) => {
    const stored = value.teams?.find(
      (item) => item.id === team.id || migratedTeam(item.name) === team.name,
    );
    return {
      ...team,
      ...stored,
      name: team.name,
      supervisorId: stored?.supervisorId ?? team.supervisorId,
    };
  });

  const baseAccounts = value.accounts ?? [];
  const accounts: AccessAccount[] = fallback.accounts.map((account) => {
    const existing = baseAccounts.find(
      (item) => item.email.toLowerCase() === account.email.toLowerCase(),
    );
    return { ...account, ...existing, email: account.email };
  });
  for (const person of people.filter((item) => item.role === "membro")) {
    if (
      !person.email ||
      accounts.some((account) => account.email.toLowerCase() === person.email.toLowerCase())
    )
      continue;
    const teamId = teams.find((team) => team.name === person.team)?.id;
    accounts.push({
      id: `member-account-${person.id}`,
      name: person.name,
      email: person.email,
      role: "membro",
      status: "pendente",
      personId: person.id,
      teamId,
      createdAt: new Date().toISOString(),
    });
  }

  const equipmentSource = value.equipment ?? fallback.equipment;
  let nextDeviceNumber = 1;
  const equipment = equipmentSource.map((item, index) => {
    const person = people.find((candidate) => candidate.id === item.assignedTo);
    const teamId = item.teamId ?? teams.find((team) => team.name === person?.team)?.id;
    const isClonexPhone = item.type === "celular" && item.owner === "clonex";
    const deviceNumber = isClonexPhone
      ? (item.deviceNumber ?? nextDeviceNumber)
      : item.deviceNumber;
    if (deviceNumber) nextDeviceNumber = Math.max(nextDeviceNumber, deviceNumber + 1);
    return {
      ...item,
      color: item.color ?? (item.type === "capacete" ? "Roxo" : "Preto"),
      batchId: item.batchId ?? `migrated-batch-${item.id}`,
      assetCode: item.assetCode ?? `CX-${String(index + 1).padStart(4, "0")}`,
      teamId,
      deviceNumber,
      deviceEmail: isClonexPhone
        ? (item.deviceEmail ?? `clonex.cel.${deviceNumber}@gmail.com`)
        : item.deviceEmail,
      ...(item.type === "capacete" && !item.size
        ? { size: item.model.replace("Tamanho ", "") }
        : {}),
    };
  });

  const consentRecords = (value.consentRecords ?? fallback.consentRecords).map((record) => ({
    ...record,
    mode: record.mode ?? ("upload" as const),
    signedAt: record.signedAt ?? record.uploadedAt,
    signedBy: record.signedBy ?? record.uploadedBy,
  }));
  const consentDeclarations =
    value.consentDeclarations ??
    consentRecords.map((record) => ({
      id: `migrated-declaration-${record.id}`,
      personId: record.personId,
      declaredAt: record.signedAt,
      declaredBy: record.signedBy,
    }));

  return {
    people,
    accounts,
    teams,
    companies: value.companies ?? fallback.companies,
    cycles: value.cycles ?? fallback.cycles,
    captures: value.captures ?? fallback.captures,
    captureChangeRequests: (value.captureChangeRequests ?? []).flatMap((request) => {
      const capture = (value.captures ?? fallback.captures).find(
        (item) => item.id === request.captureId,
      );
      if (!capture) return [];
      return [
        {
          ...request,
          original: request.original ?? {
            activity: capture.activity,
            minutes: capture.minutes,
            equipmentId: capture.equipmentId,
            recordedAt: capture.recordedAt,
          },
        },
      ];
    }),
    equipment,
    equipmentAssignments: (value.equipmentAssignments ?? fallback.equipmentAssignments).map(
      (assignment) => ({
        ...assignment,
        confirmedAt: assignment.confirmedAt,
        confirmedBy: assignment.confirmedBy,
      }),
    ),
    consentRecords,
    consentDeclarations,
    policyAcceptances: value.policyAcceptances ?? [],
    payments: value.payments ?? fallback.payments,
    notices: value.notices ?? fallback.notices,
    auditEvents: (value.auditEvents ?? fallback.auditEvents).map((event) => ({
      ...event,
      team: event.team ? migratedTeam(event.team) : event.team,
    })),
    accessEvents: value.accessEvents ?? fallback.accessEvents,
    activitySeen: value.activitySeen ?? [],
    memberTriages: value.memberTriages ?? [],
    weeklyForecasts: value.weeklyForecasts ?? fallback.weeklyForecasts,
  };
}

export const localAppRepository: AppRepository = {
  async load() {
    if (typeof window === "undefined") return cloneSeed();
    const stored =
      window.localStorage.getItem(STORAGE_KEY) ??
      PREVIOUS_KEYS.map((key) => window.localStorage.getItem(key)).find(Boolean);
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
    if (typeof window !== "undefined")
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },
  async reset() {
    const data = cloneSeed();
    await this.save(data);
    return data;
  },
};
