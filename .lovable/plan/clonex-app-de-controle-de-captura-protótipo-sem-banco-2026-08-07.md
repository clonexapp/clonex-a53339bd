# Clonex — app de controle de captura (protótipo sem banco)

Recriar o protótipo enviado como app real em React/TanStack, respeitando fielmente o design system, a hierarquia de acessos e as telas. Sem banco de dados: dados mockados em um store em memória, iguais aos do arquivo.

## Design system (extraído do arquivo, usado verbatim)

- **Tipografia:** Inter, com os pesos "quebrados" da marca (400/440/460/480/500/520/560), tracking negativo em títulos. Nunca 700.
- **Cores (tokens):**
  - Base: `--bg #FBFBF9`, `--surface #FFFFFF`, `--card #F5F5F2`, `--card2 #EFEFEB`
  - Texto: `--ink #141414`, `--ink2 #2A2A28`, `--muted #63635E`, `--faint #8C8C86`
  - Linhas: `--line` 10% / `--line2` 6% do preto
  - Marca (roxo): `--accent #6E5CF6`, `--accent-soft #EEEBFF`, `--accent-ink #3E2FB0`
  - Alerta (coral): `--warn #B4453C`, `--warn-soft #F7E9E7`, `--warn-ink #8F332B`
  - Pilares: Quantidade `#B4453C`, Previsibilidade `#2E9E8F`, Qualidade `#6E5CF6`
  - Escuro (splash): `--dark #0A0A09`
- **Componentes base:** Card, Pill, Button, ProgressBar, Battery, StatTrio, PillarDot, Icon, Sheet (bottom-sheet), ScreenHeader (eyebrow + título), KanbanCard, TabBar inferior.
- **Chrome:** moldura de celular 390×788 com notch, barra de troca de papel no topo e modo desktop, exatamente como o protótipo.

## Hierarquia de acesso e telas

**Membro** (início: Início)
Início · Gravações · Metas · Equipamentos — mais Novo registro (sheet), editor de status, ajuda/onboarding, login/cadastro.

**Sublíder** (início: Pessoas)
Pessoas · Kanban (Prospecção / Ativos / Histórico) · Equipamentos da equipe · Financeiro · Planilha visual · Relatório · Metas · Insights.

**Líder Geral** (início: Cidade)
Cidade · Pessoas (todas, com sublíder e vínculo) · Equipamentos (dono + sublíder) · Financeiro · Planilha · Contas/consentimento (LGPD) · Métricas dos 3 pilares · Relatório geral.

Toque em qualquer card abre a folha de "origem do dado" (histórico/proveniência), como no original.

## Estrutura técnica

- Tokens no `src/styles.css` (`:root` + `@theme inline`), Inter carregada via `<link>` no `__root.tsx`.
- Rotas: `/` (splash → login → app). Papel e tela controlados por estado + rota (`/app/$role/$screen`), com a barra de papéis para alternar.
- Store mockado em Context (`src/lib/store.tsx`) com pessoas, equipamentos, sessões, metas, pagamentos e leads — os mesmos dados do arquivo. Mutações funcionam em memória (registrar gravação, mudar status, editar meta, adicionar pagamento).
- Componentes do kit em `src/components/ui-kit/`, telas em `src/components/screens/<papel>/`.
- Ícones dos equipamentos (capacete/celular) gerados como imagens em `src/assets`.
- Sem Lovable Cloud nesta etapa; a troca para banco real depois é só substituir o store.

## Escopo desta primeira entrega

Protótipo navegável completo nos 3 papéis, visual fiel, dados mockados. Sem autenticação real (login é só estrutura, acesso liberado, como no arquivo).
