import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";

import type { AccessAccount, AppData, Role } from "@/domain/types";
import { buildDeviceEmailSequence, clonexDeviceNumber } from "@/lib/device-email";
import { effectiveAlertPolicy } from "@/lib/alert-policies";
import { paymentRateForPerson } from "@/lib/pricing";
import { localAppRepository } from "@/repositories/local-app-repository";
import { localAssetRepository } from "@/repositories/local-asset-repository";
import { AppDataContext, type AppDataContextValue } from "@/state/app-data-context-value";

function canManagePerson(
  data: AppData,
  account: AccessAccount | undefined,
  personId: string,
): boolean {
  if (!account || account.role === "membro") return false;
  if (account.role === "lider") return true;
  const person = data.people.find((item) => item.id === personId);
  return Boolean(person && account.teamId && person.teamId === account.teamId);
}

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AppData | null>(null);
  const [activeAccountId, setActiveAccountId] = useState<string | null>(null);

  useEffect(() => {
    void localAppRepository.load().then(setData);
  }, []);

  function update(updater: (current: AppData) => AppData) {
    setData((current) => {
      if (!current) return current;
      const next = updater(current);
      void localAppRepository.save(next);
      return next;
    });
  }

  const actorFor = useCallback(
    (role: Role): { actorName: string; actorId?: string } => {
      const account = data?.accounts.find(
        (item) => item.id === activeAccountId && item.role === role,
      );
      return {
        actorName: account?.name ?? "Conta demonstrativa",
        ...(account?.personId ? { actorId: account.personId } : {}),
      };
    },
    [data?.accounts, activeAccountId],
  );

  function nextMonth(dateValue: string): string {
    const [year = 2026, month = 1, day = 1] = dateValue.split("-").map(Number);
    const lastDay = new Date(year, month + 1, 0).getDate();
    return `${month === 12 ? year + 1 : year}-${String(month === 12 ? 1 : month + 1).padStart(2, "0")}-${String(Math.min(day, lastDay)).padStart(2, "0")}`;
  }

  const value = useMemo<AppDataContextValue>(
    () => ({
      data,
      activeAccount: data?.accounts.find((account) => account.id === activeAccountId) ?? null,
      selectAccount: setActiveAccountId,
      addCapture(input) {
        update((current) => {
          const account = current.accounts.find((item) => item.id === activeAccountId);
          const personId = account?.personId;
          const person = current.people.find((item) => item.id === personId);
          if (
            account?.role !== "membro" ||
            !personId ||
            !person ||
            !Number.isFinite(input.minutes) ||
            input.minutes <= 0 ||
            !current.equipment.some(
              (item) => item.id === input.equipmentId && item.assignedTo === personId,
            ) ||
            !current.consentDeclarations.some((item) => item.personId === personId)
          )
            return current;
          const id = crypto.randomUUID();
          const occurredAt = new Date().toISOString();
          return {
            ...current,
            captures: [
              {
                id,
                personId,
                status: "pendente",
                recordedAt: occurredAt,
                ...input,
              },
              ...current.captures,
            ],
            auditEvents: [
              {
                id: crypto.randomUUID(),
                entity: "capture",
                entityId: id,
                action: "capture.created",
                actorId: personId,
                actorName: person.name,
                actorRole: "membro",
                occurredAt,
                details: `Registrou ${input.minutes} minutos de ${input.activity}.`,
                category: "captura",
                team: person.team,
                targetRole: "membro",
                targetPersonId: personId,
              },
              ...current.auditEvents,
            ],
          };
        });
      },
      addEquipment(input) {
        update((current) => {
          const activeAccount = current.accounts.find((item) => item.id === activeAccountId);
          const targetTeamId = input.teamId ?? activeAccount?.teamId;
          if (
            !activeAccount ||
            activeAccount.role === "membro" ||
            !input.model.trim() ||
            !input.color.trim() ||
            !Number.isFinite(input.quantity) ||
            (activeAccount.role === "subleader" && targetTeamId !== activeAccount.teamId) ||
            input.allocations?.some((allocation) => {
              if (!allocation.personId) return false;
              const person = current.people.find((item) => item.id === allocation.personId);
              return !person || person.teamId !== targetTeamId;
            })
          )
            return current;
          const actualRole = activeAccount.role;
          const actor = actorFor(actualRole);
          const occurredAt = new Date().toISOString();
          const batchId = crypto.randomUUID();
          const quantity = Math.min(50, Math.max(1, input.quantity));
          const firstNumber =
            input.firstDeviceNumber ??
            Math.max(0, ...current.equipment.map((item) => item.deviceNumber ?? 0)) + 1;
          const firstDeviceEmail = input.firstDeviceEmail ?? `clonex.cel.${firstNumber}@gmail.com`;
          const deviceEmails = buildDeviceEmailSequence(firstDeviceEmail, quantity);
          const createsClonexPhone = input.type === "celular" && input.owner === "clonex";
          if (
            createsClonexPhone &&
            (!deviceEmails ||
              deviceEmails.some((email) =>
                current.equipment.some(
                  (item) => item.deviceEmail?.toLowerCase() === email.toLowerCase(),
                ),
              ))
          )
            return current;
          const created = Array.from({ length: quantity }, (_, index) => {
            const allocation = input.allocations?.[index];
            const isClonexPhone = input.type === "celular" && input.owner === "clonex";
            const deviceEmail = isClonexPhone ? deviceEmails?.[index] : undefined;
            const deviceNumber = deviceEmail ? clonexDeviceNumber(deviceEmail) : undefined;
            return {
              id: crypto.randomUUID(),
              type: input.type,
              model: input.model,
              owner: input.owner,
              status: allocation?.personId ? ("em_uso" as const) : ("disponivel" as const),
              ...(allocation?.personId ? { assignedTo: allocation.personId } : {}),
              color: input.color,
              batchId,
              assetCode: isClonexPhone ? (deviceEmail ?? "") : "",
              ...(targetTeamId ? { teamId: targetTeamId } : {}),
              ...(deviceNumber ? { deviceNumber } : {}),
              ...(deviceEmail ? { deviceEmail } : {}),
              ...(input.size ? { size: input.size } : {}),
            };
          });
          const assignments = created.flatMap((item, index) =>
            item.assignedTo
              ? [
                  {
                    id: crypto.randomUUID(),
                    equipmentId: item.id,
                    personId: item.assignedTo,
                    workload: input.allocations?.[index]?.workload ?? ("full_time" as const),
                    startsAt: occurredAt.slice(0, 10),
                    active: true,
                  },
                ]
              : [],
          );
          return {
            ...current,
            equipment: [...current.equipment, ...created],
            equipmentAssignments: [...current.equipmentAssignments, ...assignments],
            auditEvents: [
              {
                id: crypto.randomUUID(),
                entity: "equipment",
                entityId: batchId,
                action: "equipment.created",
                ...actor,
                actorRole: actualRole,
                occurredAt,
                details: `Cadastrou lote com ${quantity} ${input.type}(s), ${input.model}, cor ${input.color}.`,
                category: "equipamento",
              },
              ...current.auditEvents,
            ],
          };
        });
      },
      addCompany(input) {
        const id = crypto.randomUUID();
        update((current) => {
          const account = current.accounts.find((item) => item.id === activeAccountId);
          if (!account || account.role === "membro") return current;
          const actor = actorFor(account.role);
          const occurredAt = new Date().toISOString();
          return {
            ...current,
            companies: [...current.companies, { id, active: true, ...input }],
            auditEvents: [
              {
                id: crypto.randomUUID(),
                entity: "company",
                entityId: id,
                action: "company.created",
                ...actor,
                actorRole: account.role,
                occurredAt,
                details: `Cadastrou a empresa ${input.name}.`,
                category: "pessoa",
              },
              ...current.auditEvents,
            ],
          };
        });
        return id;
      },
      addPerson(input) {
        update((current) => {
          const activeAccount = current.accounts.find((item) => item.id === activeAccountId);
          const targetTeam = current.teams.find((team) => team.id === input.teamId);
          if (
            !activeAccount ||
            activeAccount.role === "membro" ||
            (activeAccount.role === "subleader" && activeAccount.teamId !== input.teamId) ||
            !targetTeam ||
            current.accounts.some(
              (account) => account.email.toLowerCase() === input.email.trim().toLowerCase(),
            ) ||
            current.people.some(
              (person) =>
                person.memberCode?.toLowerCase() === input.memberCode.trim().toLowerCase(),
            ) ||
            input.equipmentIds.some((equipmentId) => {
              const equipment = current.equipment.find((item) => item.id === equipmentId);
              return (
                !equipment ||
                equipment.status !== "disponivel" ||
                (equipment.teamId && equipment.teamId !== input.teamId)
              );
            })
          )
            return current;
          const id = crypto.randomUUID();
          const cycleId = crypto.randomUUID();
          const actor = actorFor(activeAccount.role);
          const occurredAt = new Date().toISOString();
          const assignments = input.equipmentIds.map((equipmentId) => ({
            id: crypto.randomUUID(),
            equipmentId,
            personId: id,
            workload: input.workload,
            startsAt: input.cycleStartsAt,
            active: true,
          }));
          return {
            ...current,
            people: [
              ...current.people,
              {
                id,
                name: input.name,
                role: "membro",
                team: input.team,
                teamId: input.teamId,
                region: input.region,
                state: input.state,
                city: input.city,
                goalHours: input.goalHours,
                targetDaysPerWeek: input.targetDaysPerWeek,
                active: true,
                email: input.email,
                phone: input.phone,
                affiliation: input.affiliation,
                ...(input.companyId ? { companyId: input.companyId } : {}),
                workload: input.workload,
                hourlyRate: input.hourlyRate,
                paymentPlan: input.paymentPlan,
                serviceName: input.serviceName,
                minuteCode: input.minuteCode,
                memberCode: input.memberCode.trim().toUpperCase(),
                weekendAvailability: input.weekendAvailability,
                ...((input.supervisorId ?? targetTeam.supervisorId)
                  ? { supervisorId: input.supervisorId ?? targetTeam.supervisorId }
                  : {}),
              },
            ],
            cycles: [
              ...current.cycles,
              {
                id: cycleId,
                personId: id,
                startsAt: input.cycleStartsAt,
                endsAt: nextMonth(input.cycleStartsAt),
                goalHours: input.goalHours,
                targetDaysPerWeek: input.targetDaysPerWeek,
                status: "ativo",
              },
            ],
            accounts: [
              ...current.accounts,
              {
                id: crypto.randomUUID(),
                name: input.name,
                email: input.email,
                role: "membro",
                status: "pendente",
                personId: id,
                teamId: input.teamId,
                createdAt: occurredAt,
              },
            ],
            equipmentAssignments: [...current.equipmentAssignments, ...assignments],
            equipment: current.equipment.map((item) =>
              input.equipmentIds.includes(item.id)
                ? { ...item, assignedTo: id, status: "em_uso" }
                : item,
            ),
            auditEvents: [
              {
                id: crypto.randomUUID(),
                entity: "person",
                entityId: id,
                action: "person.created",
                category: "pessoa",
                team: input.team,
                targetRole: "membro",
                targetPersonId: id,
                ...actor,
                actorRole: activeAccount.role,
                occurredAt,
                details: `Cadastrou ${input.name} como ${input.affiliation === "empresa" ? "membro de empresa" : "autônomo"}.`,
              },
              ...current.auditEvents,
            ],
          };
        });
      },
      async addConsent(personId, file, validUntil) {
        const account = data?.accounts.find((item) => item.id === activeAccountId);
        if (!data || !canManagePerson(data, account, personId)) return;
        const storageKey = `consent-${personId}-${crypto.randomUUID()}`;
        await localAssetRepository.save(storageKey, file);
        update((current) => {
          const currentAccount = current.accounts.find((item) => item.id === activeAccountId);
          if (!canManagePerson(current, currentAccount, personId)) return current;
          const actualRole = currentAccount!.role as "subleader" | "lider";
          const actor = actorFor(actualRole);
          const occurredAt = new Date().toISOString();
          return {
            ...current,
            consentRecords: [
              ...current.consentRecords.map((record) =>
                record.personId === personId ? { ...record, active: false } : record,
              ),
              {
                id: crypto.randomUUID(),
                personId,
                storageKey,
                fileName: file.name,
                mimeType: file.type || "application/octet-stream",
                size: file.size,
                uploadedAt: occurredAt,
                uploadedBy: actor.actorName,
                ...(validUntil ? { validUntil } : {}),
                active: true,
                mode: "upload",
                signedAt: occurredAt,
                signedBy: actor.actorName,
              },
            ],
            auditEvents: [
              {
                id: crypto.randomUUID(),
                entity: "consent",
                entityId: personId,
                action: "consent.uploaded",
                category: "consentimento",
                team: current.people.find((person) => person.id === personId)?.team,
                targetRole: "membro",
                targetPersonId: personId,
                ...actor,
                actorRole: actualRole,
                occurredAt,
                details: `Registrou o termo ${file.name}.`,
              },
              ...current.auditEvents,
            ],
          };
        });
      },
      downloadConsent(storageKey, fileName) {
        return localAssetRepository.open(storageKey, fileName);
      },
      addSignedConsent(personId, mode, validUntil) {
        update((current) => {
          const account = current.accounts.find((item) => item.id === activeAccountId);
          if (!canManagePerson(current, account, personId)) return current;
          const actualRole = account!.role as "subleader" | "lider";
          const actor = actorFor(actualRole);
          const occurredAt = new Date().toISOString();
          const person = current.people.find((item) => item.id === personId);
          const id = crypto.randomUUID();
          return {
            ...current,
            consentRecords: [
              ...current.consentRecords.map((record) =>
                record.personId === personId ? { ...record, active: false } : record,
              ),
              {
                id,
                personId,
                mode,
                uploadedAt: occurredAt,
                uploadedBy: actor.actorName,
                signedAt: occurredAt,
                signedBy: person?.name ?? actor.actorName,
                ...(validUntil ? { validUntil } : {}),
                active: true,
              },
            ],
            auditEvents: [
              {
                id: crypto.randomUUID(),
                entity: "consent",
                entityId: id,
                action: `consent.${mode}`,
                ...actor,
                actorRole: actualRole,
                occurredAt,
                details: `Marcou o termo de ${person?.name ?? "membro"} como assinado ${mode === "fisico" ? "fisicamente" : "digitalmente"}.`,
                category: "consentimento",
                team: person?.team,
                targetRole: "membro",
                targetPersonId: personId,
              },
              ...current.auditEvents,
            ],
          };
        });
      },
      addPayment(input) {
        update((current) => {
          const account = current.accounts.find((item) => item.id === activeAccountId);
          const person = current.people.find((item) => item.id === input.personId);
          if (
            !canManagePerson(current, account, input.personId) ||
            !person ||
            !Number.isFinite(input.hours) ||
            !Number.isFinite(input.amount) ||
            !Number.isFinite(input.hourlyRate) ||
            input.hours < 0 ||
            input.amount < 0 ||
            input.hourlyRate < 0 ||
            (input.cycleId &&
              !current.cycles.some(
                (cycle) => cycle.id === input.cycleId && cycle.personId === input.personId,
              )) ||
            input.captureIds.some(
              (captureId) =>
                !current.captures.some(
                  (capture) =>
                    capture.id === captureId &&
                    capture.personId === input.personId &&
                    capture.status === "aprovado",
                ),
            )
          )
            return current;
          const actualRole = account!.role as "subleader" | "lider";
          const actor = actorFor(actualRole);
          const occurredAt = new Date().toISOString();
          const cycle = current.cycles.find((item) => item.id === input.cycleId);
          const rate = paymentRateForPerson(current, person);
          const period = cycle
            ? `${cycle.startsAt.split("-").reverse().slice(0, 2).join("/")}–${cycle.endsAt.split("-").reverse().slice(0, 2).join("/")}`
            : "Período informado";
          const id = crypto.randomUUID();
          return {
            ...current,
            payments: [
              {
                id,
                period,
                registeredAt: occurredAt,
                registeredBy: actor.actorName,
                ...input,
                hourlyRate: rate.hourlyRate,
                amount: input.hours * rate.hourlyRate,
                paymentPlan: person.paymentPlan,
                rateBand: rate.bandLabel,
              },
              ...current.payments,
            ],
            auditEvents: [
              {
                id: crypto.randomUUID(),
                entity: "payment",
                entityId: id,
                action: "payment.created",
                category: "pagamento",
                team: current.people.find((person) => person.id === input.personId)?.team,
                targetRole: "membro",
                targetPersonId: input.personId,
                ...actor,
                actorRole: actualRole,
                occurredAt,
                details: `Registrou pagamento de ${input.hours}h pela faixa ${rate.bandLabel}, a R$ ${rate.hourlyRate.toFixed(2)}/h.`,
              },
              ...current.auditEvents,
            ],
          };
        });
      },
      updateCycle(id, input) {
        update((current) => {
          const cycle = current.cycles.find((item) => item.id === id);
          const account = current.accounts.find((item) => item.id === activeAccountId);
          if (
            !cycle ||
            !canManagePerson(current, account, cycle.personId) ||
            input.endsAt < input.startsAt ||
            !Number.isFinite(input.goalHours) ||
            !Number.isFinite(input.targetDaysPerWeek)
          )
            return current;
          const actualRole = account!.role as "subleader" | "lider";
          const actor = actorFor(actualRole);
          const occurredAt = new Date().toISOString();
          return {
            ...current,
            cycles: current.cycles.map((item) =>
              item.id === id
                ? {
                    ...item,
                    ...input,
                    goalHours: Math.max(0, input.goalHours),
                    targetDaysPerWeek: Math.min(7, Math.max(1, input.targetDaysPerWeek)),
                  }
                : item,
            ),
            people: cycle
              ? current.people.map((person) =>
                  person.id === cycle.personId
                    ? {
                        ...person,
                        goalHours: Math.max(0, input.goalHours),
                        targetDaysPerWeek: Math.min(7, Math.max(1, input.targetDaysPerWeek)),
                      }
                    : person,
                )
              : current.people,
            auditEvents: [
              {
                id: crypto.randomUUID(),
                entity: "cycle",
                entityId: id,
                action: "cycle.updated",
                category: "ciclo",
                targetRole: "membro",
                targetPersonId: cycle?.personId,
                ...actor,
                actorRole: actualRole,
                occurredAt,
                details: `Atualizou o ciclo para ${input.startsAt} a ${input.endsAt}, com meta de ${input.goalHours}h.`,
              },
              ...current.auditEvents,
            ],
          };
        });
      },
      updateCaptureStatus(id, status) {
        update((current) => {
          const capture = current.captures.find((item) => item.id === id);
          const account = current.accounts.find((item) => item.id === activeAccountId);
          if (!capture || !canManagePerson(current, account, capture.personId)) return current;
          const actualRole = account!.role as "subleader" | "lider";
          const actor = actorFor(actualRole);
          const occurredAt = new Date().toISOString();
          const nextCaptures = current.captures.map((item) =>
            item.id === id
              ? { ...item, status, reviewedAt: occurredAt, reviewedBy: actor.actorName }
              : item,
          );
          const approvedMinutes = capture
            ? nextCaptures
                .filter((item) => item.personId === capture.personId && item.status === "aprovado")
                .reduce((sum, item) => sum + item.minutes, 0)
            : 0;
          const needsTriage = Boolean(
            capture &&
            status === "aprovado" &&
            approvedMinutes >=
              effectiveAlertPolicy(
                current,
                current.people.find((person) => person.id === capture.personId),
              ).values.firstPaymentHours *
                60 &&
            !current.memberTriages.some((item) => item.personId === capture.personId),
          );
          return {
            ...current,
            captures: nextCaptures,
            memberTriages:
              needsTriage && capture
                ? [
                    { id: crypto.randomUUID(), personId: capture.personId, status: "pendente" },
                    ...current.memberTriages,
                  ]
                : current.memberTriages,
            auditEvents: capture
              ? [
                  {
                    id: crypto.randomUUID(),
                    entity: "capture",
                    entityId: id,
                    action: status === "aprovado" ? "capture.approved" : "capture.rejected",
                    category: "captura",
                    team: current.people.find((person) => person.id === capture.personId)?.team,
                    targetRole: "membro",
                    targetPersonId: capture.personId,
                    ...actor,
                    actorRole: actualRole,
                    occurredAt,
                    details: `${status === "aprovado" ? "Aprovou" : "Reprovou"} ${capture.activity}.`,
                  },
                  ...current.auditEvents,
                ]
              : current.auditEvents,
          };
        });
      },
      updatePersonGoal(id, goalHours) {
        update((current) => {
          const account = current.accounts.find((item) => item.id === activeAccountId);
          if (!canManagePerson(current, account, id) || !Number.isFinite(goalHours)) return current;
          const actualRole = account!.role as "subleader" | "lider";
          const actor = actorFor(actualRole);
          const nextGoal = Math.max(0, goalHours);
          return {
            ...current,
            people: current.people.map((person) =>
              person.id === id ? { ...person, goalHours: nextGoal } : person,
            ),
            auditEvents: [
              {
                id: crypto.randomUUID(),
                entity: "goal",
                entityId: id,
                action: "goal.updated",
                category: "meta",
                team: current.people.find((person) => person.id === id)?.team,
                targetRole: "membro",
                targetPersonId: id,
                ...actor,
                actorRole: actualRole,
                occurredAt: new Date().toISOString(),
                details: `Alterou a meta mensal para ${nextGoal} horas.`,
              },
              ...current.auditEvents,
            ],
          };
        });
      },
      requestCaptureChange(input) {
        update((current) => {
          if (
            current.captureChangeRequests.some(
              (item) => item.captureId === input.captureId && item.status === "pendente",
            )
          )
            return current;
          const capture = current.captures.find((item) => item.id === input.captureId);
          const account = current.accounts.find((item) => item.id === activeAccountId);
          if (
            !capture ||
            !account?.personId ||
            capture.personId !== account.personId ||
            !input.reason.trim()
          )
            return current;
          const occurredAt = new Date().toISOString();
          const id = crypto.randomUUID();
          return {
            ...current,
            captureChangeRequests: [
              {
                id,
                captureId: input.captureId,
                type: input.type,
                reason: input.reason.trim(),
                requestedBy: account.personId,
                requestedAt: occurredAt,
                status: "pendente",
                original: {
                  activity: capture.activity,
                  minutes: capture.minutes,
                  equipmentId: capture.equipmentId,
                  recordedAt: capture.recordedAt,
                },
                ...(input.proposed ? { proposed: input.proposed } : {}),
              },
              ...current.captureChangeRequests,
            ],
            notices: [
              {
                id: crypto.randomUUID(),
                role: "subleader",
                message: `${account.name} solicitou ${input.type} de uma captura.`,
                createdAt: "Agora",
                read: false,
              },
              ...current.notices,
            ],
            auditEvents: [
              {
                id: crypto.randomUUID(),
                entity: "capture",
                entityId: input.captureId,
                action: "capture.change_requested",
                ...(account.personId ? { actorId: account.personId } : {}),
                actorName: account.name,
                actorRole: "membro",
                occurredAt,
                details: `Solicitou ${input.type}: ${input.reason.trim()}`,
                category: "captura",
                team: current.people.find((person) => person.id === account.personId)?.team,
                targetRole: "membro",
                targetPersonId: account.personId,
              },
              ...current.auditEvents,
            ],
          };
        });
      },
      withdrawCaptureChange(id) {
        update((current) => {
          const account = current.accounts.find((item) => item.id === activeAccountId);
          const request = current.captureChangeRequests.find((item) => item.id === id);
          if (
            !request ||
            request.status !== "pendente" ||
            request.requestedBy !== account?.personId
          )
            return current;
          return {
            ...current,
            captureChangeRequests: current.captureChangeRequests.map((item) =>
              item.id === id
                ? {
                    ...item,
                    status: "retirada" as const,
                    resolvedAt: new Date().toISOString(),
                    resolvedBy: account.name,
                  }
                : item,
            ),
          };
        });
      },
      resolveCaptureChange(id, approved, note) {
        update((current) => {
          const account = current.accounts.find((item) => item.id === activeAccountId);
          const request = current.captureChangeRequests.find((item) => item.id === id);
          const capture = request && current.captures.find((item) => item.id === request.captureId);
          if (
            !account ||
            account.role !== "subleader" ||
            !request ||
            request.status !== "pendente" ||
            !capture
          )
            return current;
          const occurredAt = new Date().toISOString();
          return {
            ...current,
            captures: current.captures.map((item) =>
              item.id !== capture.id || !approved
                ? item
                : request.type === "cancelamento"
                  ? {
                      ...item,
                      status: "cancelado" as const,
                      reviewedAt: occurredAt,
                      reviewedBy: account.name,
                    }
                  : { ...item, ...request.proposed },
            ),
            captureChangeRequests: current.captureChangeRequests.map((item) =>
              item.id === id
                ? {
                    ...item,
                    status: approved ? ("aprovada" as const) : ("rejeitada" as const),
                    resolvedAt: occurredAt,
                    resolvedBy: account.name,
                    ...(note ? { resolutionNote: note } : {}),
                  }
                : item,
            ),
            auditEvents: [
              {
                id: crypto.randomUUID(),
                entity: "capture",
                entityId: capture.id,
                action: approved ? "capture.change_approved" : "capture.change_rejected",
                ...(account.personId ? { actorId: account.personId } : {}),
                actorName: account.name,
                actorRole: account.role,
                occurredAt,
                details: `${approved ? "Aprovou" : "Rejeitou"} a solicitação de ${request.type}.${note ? ` ${note}` : ""}`,
                category: "captura",
                team: current.people.find((person) => person.id === capture.personId)?.team,
                targetRole: "membro",
                targetPersonId: capture.personId,
              },
              ...current.auditEvents,
            ],
          };
        });
      },
      declareConsent(personId) {
        update((current) => {
          const account = current.accounts.find((item) => item.id === activeAccountId);
          if (
            !account ||
            account.personId !== personId ||
            current.consentDeclarations.some((item) => item.personId === personId)
          )
            return current;
          const occurredAt = new Date().toISOString();
          return {
            ...current,
            consentDeclarations: [
              {
                id: crypto.randomUUID(),
                personId,
                declaredAt: occurredAt,
                declaredBy: account.name,
              },
              ...current.consentDeclarations,
            ],
            auditEvents: [
              {
                id: crypto.randomUUID(),
                entity: "consent",
                entityId: personId,
                action: "consent.declared",
                actorId: personId,
                actorName: account.name,
                actorRole: "membro",
                occurredAt,
                details: "Declarou que assinou o termo. Aguarda validação do Sublíder.",
                category: "consentimento",
                team: current.people.find((person) => person.id === personId)?.team,
                targetRole: "membro",
                targetPersonId: personId,
              },
              ...current.auditEvents,
            ],
          };
        });
      },
      confirmEquipment(personId, assetCode) {
        let confirmed = false;
        update((current) => {
          const account = current.accounts.find((item) => item.id === activeAccountId);
          const normalizedCode = assetCode.trim().toLowerCase();
          const equipment = current.equipment.find(
            (item) =>
              item.type === "celular" &&
              item.owner === "clonex" &&
              Boolean(normalizedCode) &&
              item.deviceEmail?.toLowerCase() === normalizedCode &&
              item.assignedTo === personId,
          );
          if (!equipment || account?.role !== "membro" || account.personId !== personId)
            return current;
          confirmed = true;
          const occurredAt = new Date().toISOString();
          return {
            ...current,
            equipmentAssignments: current.equipmentAssignments.map((item) =>
              item.equipmentId === equipment.id && item.personId === personId && item.active
                ? { ...item, confirmedAt: occurredAt, confirmedBy: account.name }
                : item,
            ),
          };
        });
        return confirmed;
      },
      completeTriage(id, decision, notes) {
        update((current) => {
          const account = current.accounts.find((item) => item.id === activeAccountId);
          const triage = current.memberTriages.find((item) => item.id === id);
          if (!triage || !canManagePerson(current, account, triage.personId)) return current;
          return {
            ...current,
            memberTriages: current.memberTriages.map((item) =>
              item.id === id
                ? {
                    ...item,
                    status: "concluida" as const,
                    decision,
                    notes,
                    completedAt: new Date().toISOString(),
                    completedBy: account!.name,
                  }
                : item,
            ),
          };
        });
      },
      saveWeeklyForecast(input) {
        update((current) => {
          const account = current.accounts.find((item) => item.id === activeAccountId);
          if (
            !account ||
            account.role === "membro" ||
            (account.role === "subleader" && account.teamId !== input.teamId) ||
            !current.teams.some((team) => team.id === input.teamId)
          )
            return current;
          const occurredAt = new Date().toISOString();
          const existing = current.weeklyForecasts.find(
            (item) => item.teamId === input.teamId && item.weekStartsAt === input.weekStartsAt,
          );
          const record = {
            id: existing?.id ?? crypto.randomUUID(),
            ...input,
            expectedPeople: Math.max(0, input.expectedPeople),
            expectedHours: Math.max(0, input.expectedHours),
            updatedAt: occurredAt,
            updatedBy: account.name,
          };
          return {
            ...current,
            weeklyForecasts: [
              record,
              ...current.weeklyForecasts.filter((item) => item.id !== existing?.id),
            ],
          };
        });
      },
      saveSupervisor(input) {
        update((current) => {
          const account = current.accounts.find((item) => item.id === activeAccountId);
          if (
            account?.role !== "lider" ||
            current.accounts.some(
              (item) =>
                item.email.toLowerCase() === input.email.toLowerCase() &&
                item.id !== input.accountId,
            )
          )
            return current;
          const existingTeam = current.teams.find((item) => item.id === input.teamId);
          const newTeamName = input.teamName?.trim();
          if (
            (existingTeam?.supervisorId && existingTeam.supervisorId !== input.personId) ||
            (!existingTeam &&
              (!newTeamName ||
                current.teams.some(
                  (item) => item.name.toLowerCase() === newTeamName.toLowerCase(),
                )))
          )
            return current;
          const team = existingTeam
            ? {
                ...existingTeam,
                region: input.region,
                state: input.state.trim().toUpperCase(),
                city: input.city.trim(),
              }
            : ({
                id: crypto.randomUUID(),
                name: newTeamName!,
                region: input.region,
                state: input.state.trim().toUpperCase(),
                city: input.city.trim(),
              } satisfies AppData["teams"][number]);
          const personId = input.personId ?? crypto.randomUUID();
          const accountId = input.accountId ?? crypto.randomUUID();
          const occurredAt = new Date().toISOString();
          const person = {
            id: personId,
            name: input.name,
            role: "subleader" as const,
            team: team.name,
            teamId: team.id,
            region: team.region ?? input.region,
            state: team.state ?? input.state.trim().toUpperCase(),
            city: team.city,
            goalHours: 0,
            targetDaysPerWeek: 5,
            active: input.status !== "desativada",
            email: input.email,
            phone: "",
            affiliation: "autonomo" as const,
            workload: "full_time" as const,
            hourlyRate: 0,
            paymentPlan: "celular_proprio" as const,
            serviceName: `Gestão da ${team.name}`,
            minuteCode: `SUB-${input.name.toUpperCase().replace(/[^A-Z0-9]/g, "-")}`,
            memberCode: `SUB-${(team.state ?? input.state).toUpperCase()}-${personId.slice(0, 6).toUpperCase()}`,
            weekendAvailability: "ambos" as const,
          };
          return {
            ...current,
            people: input.personId
              ? current.people.map((item) => (item.id === personId ? { ...item, ...person } : item))
              : [...current.people, person],
            accounts: input.accountId
              ? current.accounts.map((item) =>
                  item.id === accountId
                    ? {
                        ...item,
                        name: input.name,
                        email: input.email,
                        status: input.status,
                        teamId: team.id,
                        personId,
                      }
                    : item,
                )
              : [
                  ...current.accounts,
                  {
                    id: accountId,
                    name: input.name,
                    email: input.email,
                    role: "subleader",
                    status: input.status,
                    teamId: team.id,
                    personId,
                    createdAt: occurredAt,
                  },
                ],
            teams: [
              ...current.teams
                .filter((item) => item.id !== team.id)
                .map((item) =>
                  item.supervisorId === personId ? { ...item, supervisorId: undefined } : item,
                ),
              {
                ...team,
                supervisorId: input.status === "desativada" ? undefined : personId,
              },
            ],
            auditEvents: [
              {
                id: crypto.randomUUID(),
                entity: "person",
                entityId: personId,
                action: input.accountId ? "supervisor.updated" : "supervisor.created",
                ...(account.personId ? { actorId: account.personId } : {}),
                actorName: account.name,
                actorRole: "lider",
                occurredAt,
                details: `${input.name} · ${team.name} · ${team.state ?? input.state}/${team.city}.`,
                category: "conta",
                team: team.name,
                targetRole: "subleader",
                targetPersonId: personId,
              },
              ...current.auditEvents,
            ],
          };
        });
      },
      updateMemberProfile(personId, input, actorRole) {
        update((current) => {
          const account = current.accounts.find((item) => item.id === activeAccountId);
          const person = current.people.find(
            (item) => item.id === personId && item.role === "membro",
          );
          const code = input.memberCode.trim().toUpperCase();
          if (
            !account ||
            !person ||
            account.role === "membro" ||
            (account.role === "subleader" && account.teamId !== person.teamId) ||
            !code ||
            current.people.some(
              (item) => item.id !== personId && item.memberCode?.toUpperCase() === code,
            )
          )
            return current;
          const actor = actorFor(actorRole);
          const occurredAt = new Date().toISOString();
          return {
            ...current,
            people: current.people.map((item) =>
              item.id === personId
                ? {
                    ...item,
                    memberCode: code,
                    region: input.region,
                    state: input.state.trim().toUpperCase(),
                    city: input.city.trim(),
                  }
                : item,
            ),
            auditEvents: [
              {
                id: crypto.randomUUID(),
                entity: "person",
                entityId: personId,
                action: "person.profile_updated",
                category: "pessoa",
                team: person.team,
                targetRole: "membro",
                targetPersonId: personId,
                ...actor,
                actorRole,
                occurredAt,
                details: `Atualizou código e localização de ${person.name}.`,
              },
              ...current.auditEvents,
            ],
          };
        });
      },
      setMemberActive(personId, active, actorRole) {
        update((current) => {
          const account = current.accounts.find((item) => item.id === activeAccountId);
          const person = current.people.find(
            (item) => item.id === personId && item.role === "membro",
          );
          if (
            !account ||
            !person ||
            person.archivedAt ||
            account.role === "membro" ||
            (account.role === "subleader" && account.teamId !== person.teamId)
          )
            return current;
          const actor = actorFor(actorRole);
          const occurredAt = new Date().toISOString();
          return {
            ...current,
            people: current.people.map((item) =>
              item.id === personId ? { ...item, active } : item,
            ),
            accounts: current.accounts.map((item) =>
              item.personId === personId
                ? { ...item, status: active ? "pendente" : "desativada" }
                : item,
            ),
            auditEvents: [
              {
                id: crypto.randomUUID(),
                entity: "person",
                entityId: personId,
                action: active ? "person.reactivated" : "person.deactivated",
                category: "pessoa",
                team: person.team,
                targetRole: "membro",
                targetPersonId: personId,
                ...actor,
                actorRole,
                occurredAt,
                details: `${active ? "Reativou" : "Desativou"} ${person.name}.`,
              },
              ...current.auditEvents,
            ],
          };
        });
      },
      archiveMember(personId, actorRole) {
        update((current) => {
          const account = current.accounts.find((item) => item.id === activeAccountId);
          const person = current.people.find(
            (item) => item.id === personId && item.role === "membro",
          );
          if (
            !account ||
            !person ||
            account.role === "membro" ||
            (account.role === "subleader" && account.teamId !== person.teamId)
          )
            return current;
          const actor = actorFor(actorRole);
          const occurredAt = new Date().toISOString();
          return {
            ...current,
            people: current.people.map((item) =>
              item.id === personId
                ? {
                    ...item,
                    active: false,
                    archivedAt: occurredAt,
                    archivedBy: actor.actorName,
                  }
                : item,
            ),
            accounts: current.accounts.map((item) =>
              item.personId === personId ? { ...item, status: "desativada" } : item,
            ),
            cycles: current.cycles.map((item) =>
              item.personId === personId && item.status === "ativo"
                ? { ...item, status: "encerrado" }
                : item,
            ),
            equipmentAssignments: current.equipmentAssignments.map((item) =>
              item.personId === personId && item.active
                ? { ...item, active: false, endsAt: occurredAt.slice(0, 10) }
                : item,
            ),
            equipment: current.equipment.map((item) =>
              item.assignedTo === personId
                ? { ...item, assignedTo: undefined, status: "disponivel" }
                : item,
            ),
            auditEvents: [
              {
                id: crypto.randomUUID(),
                entity: "person",
                entityId: personId,
                action: "person.archived",
                category: "pessoa",
                team: person.team,
                targetRole: "membro",
                targetPersonId: personId,
                ...actor,
                actorRole,
                occurredAt,
                details: `Excluiu logicamente ${person.name}, preservando o histórico para auditoria.`,
              },
              ...current.auditEvents,
            ],
          };
        });
      },
      updateWeekendAvailability(personId, weekendAvailability) {
        update((current) => ({
          ...current,
          people: current.people.map((item) =>
            item.id === personId ? { ...item, weekendAvailability } : item,
          ),
        }));
      },
      saveAlertPolicy(input) {
        update((current) => {
          const account = current.accounts.find((item) => item.id === activeAccountId);
          if (!account || account.role === "membro") return current;
          if (
            account.role === "subleader" &&
            (input.scope !== "team" || input.teamId !== account.teamId)
          )
            return current;
          const team = input.teamId
            ? current.teams.find((item) => item.id === input.teamId)
            : undefined;
          if (input.scope === "team" && !team) return current;
          const existing = current.alertPolicies.find(
            (policy) =>
              policy.scope === input.scope &&
              (input.scope === "team"
                ? policy.teamId === input.teamId
                : policy.city === input.city),
          );
          const occurredAt = new Date().toISOString();
          const actor = actorFor(account.role);
          const policy = {
            id: existing?.id ?? crypto.randomUUID(),
            scope: input.scope,
            city: team?.city ?? input.city,
            ...(input.teamId ? { teamId: input.teamId } : {}),
            values: input.values,
            updatedAt: occurredAt,
            updatedBy: actor.actorName,
          };
          return {
            ...current,
            alertPolicies: existing
              ? current.alertPolicies.map((item) => (item.id === existing.id ? policy : item))
              : [...current.alertPolicies, policy],
            auditEvents: [
              {
                id: crypto.randomUUID(),
                entity: "alert_policy",
                entityId: `${input.scope}:${input.teamId ?? input.city}`,
                action: "alert_policy.updated",
                category: "meta",
                ...actor,
                actorRole: account.role,
                occurredAt,
                details: `Atualizou os padrões de alerta de ${team?.name ?? input.city}.`,
                ...(team ? { team: team.name } : {}),
              },
              ...current.auditEvents,
            ],
          };
        });
      },
      resetAlertPolicy(scope, city, teamId) {
        update((current) => {
          const account = current.accounts.find((item) => item.id === activeAccountId);
          if (!account || account.role === "membro") return current;
          if (account.role === "subleader" && (scope !== "team" || teamId !== account.teamId))
            return current;
          const team = teamId ? current.teams.find((item) => item.id === teamId) : undefined;
          const actor = actorFor(account.role);
          const occurredAt = new Date().toISOString();
          return {
            ...current,
            alertPolicies: current.alertPolicies.filter(
              (policy) =>
                !(
                  policy.scope === scope &&
                  (scope === "team" ? policy.teamId === teamId : policy.city === city)
                ),
            ),
            auditEvents: [
              {
                id: crypto.randomUUID(),
                entity: "alert_policy",
                entityId: `${scope}:${teamId ?? city}`,
                action: "alert_policy.reset",
                category: "meta",
                ...actor,
                actorRole: account.role,
                occurredAt,
                details: `Restaurou os padrões herdados de ${team?.name ?? city}.`,
                ...(team ? { team: team.name } : {}),
              },
              ...current.auditEvents,
            ],
          };
        });
      },
      markNoticesRead(role) {
        update((current) => ({
          ...current,
          notices: current.notices.map((notice) =>
            notice.role === role ? { ...notice, read: true } : notice,
          ),
        }));
      },
      recordAccess(personId) {
        update((current) => {
          const today = new Date().toISOString().slice(0, 10);
          if (
            current.accessEvents.some(
              (event) => event.personId === personId && event.accessedAt.startsWith(today),
            )
          )
            return current;
          return {
            ...current,
            accessEvents: [
              { id: crypto.randomUUID(), personId, accessedAt: new Date().toISOString() },
              ...current.accessEvents,
            ],
          };
        });
      },
      markActivitiesSeen(role) {
        update((current) => {
          const existing = new Set(
            current.activitySeen.filter((item) => item.role === role).map((item) => item.eventId),
          );
          const seenAt = new Date().toISOString();
          const additions = current.auditEvents
            .filter((event) => !existing.has(event.id))
            .map((event) => ({
              id: crypto.randomUUID(),
              role,
              eventId: event.id,
              seenAt,
            }));
          if (!additions.length) return current;
          return { ...current, activitySeen: [...current.activitySeen, ...additions] };
        });
      },
      async resetDemo() {
        setData(await localAppRepository.reset());
      },
    }),
    [data, activeAccountId, actorFor],
  );

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}
