# Clonex

Aplicação responsiva para controle de equipes, equipamentos, capturas de vídeo,
metas e pagamentos em operações de coleta de dados para embodied AI.

## Estado atual

- Interface desktop e mobile.
- Perfis de membro, sublíder e líder geral.
- Dados de demonstração persistidos no `localStorage` do dispositivo.
- Nenhuma credencial ou senha de demonstração no frontend.
- Camada de repositório preparada para uma implementação Supabase.

Esta versão ainda não possui autenticação nem banco remoto. O seletor de perfil
da entrada é exclusivamente uma demonstração dos níveis de acesso.

## Desenvolvimento

```sh
npm install
npm run dev
```

Validação completa:

```sh
npm run check
```

## Estrutura

- `src/domain`: tipos e regras centrais.
- `src/data`: dados iniciais da demonstração.
- `src/repositories`: contrato de persistência e implementação local.
- `src/state`: estado compartilhado e operações da aplicação.
- `src/components/clonex`: telas e componentes visuais do produto.
- `src/routes`: rotas do TanStack Start.

## Próximo passo: Supabase

Criar um `SupabaseAppRepository` que implemente `AppRepository`, configurar as
tabelas com Row Level Security e substituir a implementação local no provider.
As telas não precisam conhecer o cliente do Supabase.

Este repositório continua conectado ao Lovable. Evite reescrever o histórico
Git já publicado.
