import type { GeographicRegion } from "@/domain/types";

export const GEOGRAPHIC_REGIONS: GeographicRegion[] = [
  "Norte",
  "Nordeste",
  "Centro-Oeste",
  "Sudeste",
  "Sul",
  "Internacional",
];

export const BRAZIL_STATES = [
  ["AC", "Acre", "Norte"],
  ["AL", "Alagoas", "Nordeste"],
  ["AP", "Amapá", "Norte"],
  ["AM", "Amazonas", "Norte"],
  ["BA", "Bahia", "Nordeste"],
  ["CE", "Ceará", "Nordeste"],
  ["DF", "Distrito Federal", "Centro-Oeste"],
  ["ES", "Espírito Santo", "Sudeste"],
  ["GO", "Goiás", "Centro-Oeste"],
  ["MA", "Maranhão", "Nordeste"],
  ["MT", "Mato Grosso", "Centro-Oeste"],
  ["MS", "Mato Grosso do Sul", "Centro-Oeste"],
  ["MG", "Minas Gerais", "Sudeste"],
  ["PA", "Pará", "Norte"],
  ["PB", "Paraíba", "Nordeste"],
  ["PR", "Paraná", "Sul"],
  ["PE", "Pernambuco", "Nordeste"],
  ["PI", "Piauí", "Nordeste"],
  ["RJ", "Rio de Janeiro", "Sudeste"],
  ["RN", "Rio Grande do Norte", "Nordeste"],
  ["RS", "Rio Grande do Sul", "Sul"],
  ["RO", "Rondônia", "Norte"],
  ["RR", "Roraima", "Norte"],
  ["SC", "Santa Catarina", "Sul"],
  ["SP", "São Paulo", "Sudeste"],
  ["SE", "Sergipe", "Nordeste"],
  ["TO", "Tocantins", "Norte"],
] as const satisfies ReadonlyArray<
  readonly [string, string, Exclude<GeographicRegion, "Internacional">]
>;

export function regionForState(state: string): GeographicRegion {
  return BRAZIL_STATES.find(([code]) => code === state)?.[2] ?? "Internacional";
}

export function locationCode(state: string, city: string) {
  const cityCode = city
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-Za-z0-9]/g, "")
    .slice(0, 3)
    .toUpperCase()
    .padEnd(3, "X");
  return `${state.toUpperCase()}-${cityCode}`;
}
