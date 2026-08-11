import type { AlertPolicyValues, AppData, Person } from "@/domain/types";

export const SYSTEM_ALERT_POLICY: AlertPolicyValues = {
  inactivityDays: 3,
  reviewDeadlineHours: 48,
  minimumConsentCoveragePercent: 100,
  minimumQualityPercent: 90,
  minimumProjectedGoalPercent: 100,
  firstPaymentHours: 10,
  equipmentRetentionHours: 60,
};

export interface EffectiveAlertPolicy {
  values: AlertPolicyValues;
  sources: Record<keyof AlertPolicyValues, "Sistema" | "Cidade" | "Equipe">;
}

export function effectiveAlertPolicy(
  data: AppData,
  personOrTeam?: Person | { teamId?: string; city: string },
): EffectiveAlertPolicy {
  const city = personOrTeam?.city ?? "Juiz de Fora";
  const teamId = personOrTeam && "teamId" in personOrTeam ? personOrTeam.teamId : undefined;
  const cityPolicy = data.alertPolicies.find(
    (policy) => policy.scope === "city" && policy.city === city,
  );
  const teamPolicy = teamId
    ? data.alertPolicies.find((policy) => policy.scope === "team" && policy.teamId === teamId)
    : undefined;
  const values = { ...SYSTEM_ALERT_POLICY, ...cityPolicy?.values, ...teamPolicy?.values };
  const sources = Object.fromEntries(
    (Object.keys(SYSTEM_ALERT_POLICY) as Array<keyof AlertPolicyValues>).map((key) => [
      key,
      teamPolicy?.values[key] !== undefined
        ? "Equipe"
        : cityPolicy?.values[key] !== undefined
          ? "Cidade"
          : "Sistema",
    ]),
  ) as EffectiveAlertPolicy["sources"];
  return { values, sources };
}
