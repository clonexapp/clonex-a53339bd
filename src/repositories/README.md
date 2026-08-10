# Persistência e escala

O aplicativo usa `localAppRepository` enquanto não há backend. As telas dependem do contrato em
`app-repository.ts`, e não de `localStorage`, permitindo substituir a implementação por Supabase.

## Modelo futuro no Supabase

- Tabelas separadas para contas, pessoas, equipes, empresas, ciclos, capturas, equipamentos,
  alocações, consentimentos, pagamentos e auditoria.
- IDs UUID estáveis e arquivamento lógico (`archived_at`) para preservar histórico.
- Localidade normalizada em `region`, `state` (UF) e `city`; equipe identificada por `team_id`.
- Índices mínimos em `(team_id, active)`, `(state, city)`, `(person_id, recorded_at)` e
  `(category, occurred_at)`.
- Consultas paginadas pelo `RepositoryScope`, evitando carregar todos os usuários no navegador.
- RLS: Membro acessa o próprio perfil; Sublíder acessa somente suas equipes; Líder Geral acessa o
  escopo nacional autorizado.
- E-mails são metadados operacionais. Senhas nunca pertencem às tabelas do Clonex e serão tratadas
  exclusivamente pelo Supabase Auth quando essa etapa for ativada.

O armazenamento local permanece adequado apenas para demonstração. Crescimento real entre estados
exige o adaptador remoto, paginação, RLS e índices acima.
