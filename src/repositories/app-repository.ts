import type { AppData } from "@/domain/types";

/**
 * Contrato único de persistência do aplicativo.
 * A implementação local é usada agora. No próximo passo, uma implementação
 * Supabase pode cumprir este mesmo contrato sem alterar as telas.
 */
export interface AppRepository {
  load(): Promise<AppData>;
  save(data: AppData): Promise<void>;
  reset(): Promise<AppData>;
}
