import type { AppData, GeographicRegion, Role } from "@/domain/types";

export interface RepositoryScope {
  accountId: string;
  role: Role;
  teamIds: string[];
  region?: GeographicRegion;
  state?: string;
  city?: string;
  cursor?: string;
  limit?: number;
}

export interface EntityMutation<K extends keyof AppData = keyof AppData> {
  collection: K;
  operation: "insert" | "update" | "archive";
  entityId: string;
  value?: AppData[K] extends Array<infer T> ? Partial<T> : never;
}

/**
 * Contrato único de persistência do aplicativo.
 * A implementação local é usada agora. No próximo passo, uma implementação
 * Supabase pode cumprir este mesmo contrato sem alterar as telas.
 */
export interface AppRepository {
  load(scope?: RepositoryScope): Promise<AppData>;
  save(data: AppData): Promise<void>;
  reset(): Promise<AppData>;
}

/**
 * Extensão para o futuro adaptador Supabase. Permite consultas paginadas e
 * mutações por entidade sem obrigar a interface a carregar a base inteira.
 */
export interface ScalableAppRepository extends AppRepository {
  loadScope(scope: RepositoryScope): Promise<AppData>;
  mutate(mutations: EntityMutation[]): Promise<void>;
}
