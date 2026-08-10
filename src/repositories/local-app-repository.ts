import { seedData } from "@/data/seed";
import type { AccessAccount, AppData, Person } from "@/domain/types";
import type { AppRepository } from "@/repositories/app-repository";

const STORAGE_KEY = "clonex:app-data:v6";
const PREVIOUS_KEYS = [
  "clonex:app-data:v5",
  "clonex:app-data:v4",
  "clonex:app-data:v3",
  "clonex:app-data:v2",
  "clonex:app-data:v1",
];

function cloneSeed(): AppData {
  const data = structuredClone(seedData);
  data.people = data.people.map((person, index) => ({
    ...person,
    region: person.region ?? "Sudeste",
    state: person.state ?? "MG",
    memberCode:
      person.memberCode ??
      `${person.role === "membro" ? "MG-JDF" : "SUB-MG"}-${String(index + 1).padStart(4, "0")}`,
  }));
  data.teams = data.teams.map((team) => ({
    ...team,
    region: team.region ?? "Sudeste",
    state: team.state ?? "MG",
  }));
  data.people = data.people.map((person) => ({
    ...person,
    ...(() => {
      const teamId = person.teamId ?? data.teams.find((team) => team.name === person.team)?.id;
      return teamId ? { teamId } : {};
    })(),
  }));
  data.companies = data.companies.map((company) => ({
    ...company,
    region: company.region ?? "Sudeste",
    state: company.state ?? "MG",
  }));
  return data;
}

function migratedTeam(name: string) {
  if (name === "JF-1") return "Equipe Pedro";
  if (name === "JF-2") return "Equipe Gasparetto";
  return name;
}

function normalizeData(value: Partial<AppData>): AppData {
  const fallback = cloneSeed();
  const sourcePeople = value.people ?? fallback.people;
  const people: Person[] = sourcePeople.map((person, index) => {
    const team = migratedTeam(person.team);
    return {
      ...person,
      team,
      region: person.region ?? "Sudeste",
      state: person.state ?? "MG",
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
      memberCode:
        person.memberCode ??
        `${person.role === "membro" ? "MG-JDF" : "SUB-MG"}-${String(index + 1).padStart(4, "0")}`,
      weekendAvailability: person.weekendAvailability ?? "nenhum",
    };
  });
  for (const supervisor of fallback.people.filter((person) => person.role === "subleader")) {
    const existing = people.find((person) => person.id === supervisor.id);
    if (existing) {
      const storedSupervisor = { ...existing };
      Object.assign(existing, supervisor, storedSupervisor);
    } else people.push(supervisor);
  }

  const teamSources = [...fallback.teams];
  for (const storedTeam of value.teams ?? []) {
    if (!teamSources.some((team) => team.id === storedTeam.id)) teamSources.push(storedTeam);
  }
  const teams = teamSources.map((team) => {
    const stored = value.teams?.find(
      (item) => item.id === team.id || migratedTeam(item.name) === team.name,
    );
    return {
      ...team,
      ...stored,
      name: team.name,
      region: stored?.region ?? team.region ?? "Sudeste",
      state: stored?.state ?? team.state ?? "MG",
      supervisorId: stored?.supervisorId ?? team.supervisorId,
    };
  });
  for (const person of people) {
    const teamId = person.teamId ?? teams.find((team) => team.name === person.team)?.id;
    if (teamId) person.teamId = teamId;
  }

  const baseAccounts = value.accounts ?? [];
  const accounts: AccessAccount[] = fallback.accounts.map((account) => {
    const existing = baseAccounts.find(
      (item) => item.email.toLowerCase() === account.email.toLowerCase(),
    );
    return { ...account, ...existing, email: existing?.email ?? account.email };
  });
  for (const account of baseAccounts) {
    if (!accounts.some((item) => item.email.toLowerCase() === account.email.toLowerCase())) {
      accounts.push(account);
    }
  }
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
      assetCode: isClonexPhone
        ? (item.deviceEmail ?? item.assetCode ?? `clonex.cel.${deviceNumber}@gmail.com`)
        : "",
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
    companies: (value.companies ?? fallback.companies).map((company) => ({
      ...company,
      region: company.region ?? "Sudeste",
      state: company.state ?? "MG",
    })),
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
