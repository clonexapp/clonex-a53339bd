import type { AccessAccount } from "@/domain/types";

/** Contrato para a futura implementação com Supabase Auth. Não armazena credenciais. */
export interface AuthGateway {
  provision(account: AccessAccount): Promise<{ providerUserId: string }>;
  deactivate(providerUserId: string): Promise<void>;
}

export class AuthNotConfiguredError extends Error {
  constructor() {
    super("Autenticação ainda não configurada. A conta operacional permanece pendente.");
  }
}
