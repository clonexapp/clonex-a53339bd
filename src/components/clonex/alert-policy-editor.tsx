import { RotateCcw, SlidersHorizontal } from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";

import type { AlertPolicyValues, AppData, Role } from "@/domain/types";
import { effectiveAlertPolicy } from "@/lib/alert-policies";
import { useAppData } from "@/state/use-app-data";
import { Card } from "./dashboard-ui";

const FIELDS: Array<{
  key: keyof AlertPolicyValues;
  label: string;
  suffix: string;
  min: number;
  max: number;
}> = [
  { key: "inactivityDays", label: "Sem atividade", suffix: "dias", min: 1, max: 90 },
  { key: "reviewDeadlineHours", label: "Prazo de revisão", suffix: "horas", min: 1, max: 720 },
  {
    key: "minimumConsentCoveragePercent",
    label: "Cobertura de termos",
    suffix: "%",
    min: 0,
    max: 100,
  },
  { key: "minimumQualityPercent", label: "Qualidade mínima", suffix: "%", min: 0, max: 100 },
  {
    key: "minimumProjectedGoalPercent",
    label: "Projeção mínima da meta",
    suffix: "%",
    min: 0,
    max: 200,
  },
  { key: "firstPaymentHours", label: "Primeiro pagamento", suffix: "horas", min: 0, max: 500 },
  {
    key: "equipmentRetentionHours",
    label: "Manutenção do equipamento",
    suffix: "horas",
    min: 0,
    max: 500,
  },
];

export function AlertPolicyEditor({
  data,
  role,
}: {
  data: AppData;
  role: Exclude<Role, "membro">;
}) {
  const { activeAccount, saveAlertPolicy, resetAlertPolicy } = useAppData();
  const accountTeam = data.teams.find((team) => team.id === activeAccount?.teamId);
  const cities = useMemo(
    () => [...new Set(data.teams.map((team) => team.city))].sort(),
    [data.teams],
  );
  const [scopeKey, setScopeKey] = useState(
    role === "subleader" ? `team:${accountTeam?.id ?? ""}` : `city:${cities[0] ?? "Juiz de Fora"}`,
  );
  const [scope, identifier] = scopeKey.split(":", 2) as ["city" | "team", string];
  const team = scope === "team" ? data.teams.find((item) => item.id === identifier) : undefined;
  const city = team?.city ?? identifier;
  const effective = effectiveAlertPolicy(
    data,
    team ? { city: team.city, teamId: team.id } : { city },
  );

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const values = Object.fromEntries(
      FIELDS.map((field) => [field.key, Number(form.get(field.key))]),
    ) as unknown as AlertPolicyValues;
    saveAlertPolicy({ scope, city, ...(team ? { teamId: team.id } : {}), values });
  }

  return (
    <Card className="cx-alert-policy-card">
      <div className="cx-card-heading">
        <div>
          <span className="cx-eyebrow">Controle do sistema</span>
          <h2>Padrões dos alertas</h2>
          <p>As ações e os Insights são recalculados com estes limites.</p>
        </div>
        <SlidersHorizontal aria-hidden="true" />
      </div>
      <label className="cx-policy-scope">
        Aplicar em
        <select value={scopeKey} onChange={(event) => setScopeKey(event.target.value)}>
          {role === "lider"
            ? cities.map((item) => (
                <option key={`city:${item}`} value={`city:${item}`}>
                  Cidade · {item}
                </option>
              ))
            : null}
          {data.teams
            .filter((item) => role === "lider" || item.id === activeAccount?.teamId)
            .map((item) => (
              <option key={`team:${item.id}`} value={`team:${item.id}`}>
                Equipe · {item.name}
              </option>
            ))}
        </select>
      </label>
      <form className="cx-policy-grid" key={scopeKey} onSubmit={submit}>
        {FIELDS.map((field) => (
          <label key={field.key}>
            <span>{field.label}</span>
            <span className="cx-policy-input">
              <input
                name={field.key}
                type="number"
                min={field.min}
                max={field.max}
                step="1"
                defaultValue={effective.values[field.key]}
                required
              />
              <small>{field.suffix}</small>
            </span>
            <em>Origem: {effective.sources[field.key]}</em>
          </label>
        ))}
        <div className="cx-policy-actions">
          <button type="submit" className="cx-button">
            Salvar padrões
          </button>
          <button
            type="button"
            className="cx-button cx-button-secondary"
            onClick={() => resetAlertPolicy(scope, city, team?.id)}
          >
            <RotateCcw size={16} /> Restaurar herdado
          </button>
        </div>
      </form>
    </Card>
  );
}
