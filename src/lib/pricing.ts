import type { AppData, PaymentPlan, Person } from "@/domain/types";

export interface PaymentRateResult {
  plan: PaymentPlan;
  hours: number;
  hourlyRate: number;
  bandLabel: string;
  nextBandLabel?: string;
  hoursToNextBand: number;
  projectedAmount: number;
}

export function approvedCycleHours(data: AppData, person: Person): number {
  const cycle = data.cycles.find((item) => item.personId === person.id && item.status === "ativo");
  return (
    data.captures
      .filter(
        (capture) =>
          capture.personId === person.id &&
          capture.status === "aprovado" &&
          (!cycle ||
            (capture.recordedAt.slice(0, 10) >= cycle.startsAt &&
              capture.recordedAt.slice(0, 10) <= cycle.endsAt)),
      )
      .reduce((sum, capture) => sum + capture.minutes, 0) / 60
  );
}

export function calculatePaymentRate(plan: PaymentPlan, hours: number): PaymentRateResult {
  const safeHours = Math.max(0, hours);
  if (plan === "celular_proprio") {
    const higherBand = safeHours >= 30;
    const hourlyRate = higherBand ? 15 : 12;
    return {
      plan,
      hours: safeHours,
      hourlyRate,
      bandLabel: higherBand ? "30h ou mais" : "Até 29h",
      ...(higherBand ? {} : { nextBandLabel: "R$ 15/h a partir de 30h" }),
      hoursToNextBand: higherBand ? 0 : Math.max(0, 30 - safeHours),
      projectedAmount: safeHours * hourlyRate,
    };
  }

  const rate = safeHours > 70 ? 15 : safeHours >= 50 ? 12 : 10;
  const bandLabel = safeHours > 70 ? "Acima de 70h" : safeHours >= 50 ? "De 50h a 70h" : "Até 49h";
  const nextThreshold = safeHours > 70 ? 0 : safeHours >= 50 ? 71 : 50;
  return {
    plan,
    hours: safeHours,
    hourlyRate: rate,
    bandLabel,
    ...(nextThreshold
      ? {
          nextBandLabel: `${nextThreshold === 50 ? "R$ 12/h" : "R$ 15/h"} a partir de ${nextThreshold}h`,
        }
      : {}),
    hoursToNextBand: nextThreshold ? Math.max(0, nextThreshold - safeHours) : 0,
    projectedAmount: safeHours * rate,
  };
}

export function paymentRateForPerson(data: AppData, person: Person): PaymentRateResult {
  return calculatePaymentRate(person.paymentPlan, approvedCycleHours(data, person));
}
