import { useState, type FormEvent } from "react";
import { BookOpen, Copy, Printer } from "lucide-react";

import type { AppData } from "@/domain/types";
import { useAppData } from "@/state/use-app-data";
import { Card } from "./dashboard-ui";

const chapters = [
  [
    "1. O que é o seu papel",
    "Você lidera pessoas que gravam pelo Minute. Monte a equipe, acompanhe ritmo e bloqueios e reporte semanalmente ao Líder geral. A plataforma organiza os números; você cuida das pessoas.",
  ],
  [
    "2. Começando: montar sua equipe",
    "Cadastre em Pessoas → Adicionar membro: nome, e-mail pendente, e-mail do aparelho Clonex, regime, fim de semana, ciclo, meta e equipamentos. A senha permanente só será criada quando o Supabase Auth for ativado. Entregue o termo físico e valide-o após a declaração do membro.",
  ],
  [
    "3. O que o membro faz",
    "O membro declara que assinou o termo, confirma o kit pelo patrimônio, grava no Minute e registra as horas no Clonex. Ele não recria equipamentos do inventário. Só entra na meta o que for registrado e aprovado.",
  ],
  [
    "4. Acompanhando no dia a dia",
    "Use Pessoas como mapa: bateria, ritmo e alertas. A lista e Atividades mostram quem parou, está sem equipamento ou aguarda validação. Clique em qualquer evento para abrir a origem.",
  ],
  [
    "5. Como ajudar a bater a meta",
    "Remova bloqueios e use o número: horas restantes e ritmo diário. Ao atingir 10h, conclua a triagem de continuidade. A projeção abaixo de 60h indica risco de manutenção do equipamento.",
  ],
  [
    "6. Reportar para cima",
    "O relatório consolida quantidade, previsibilidade e qualidade. Confira capacetes e celulares, full/part time, termos validados, necessidade de aparelhos e preencha a expectativa semanal de novos negócios e horas.",
  ],
  [
    "7. Rotina semanal",
    "Todo dia: veja notificações. No meio da semana: fale com atrasados. No domingo: confira os números, preencha a expectativa semanal e copie o relatório para o Líder geral.",
  ],
  [
    "8. Resumo em 6 frases",
    "Crie o cadastro pendente ligado à equipe. Entregue termo e equipamento. Ensine a confirmar o patrimônio e registrar horas. Acompanhe Pessoas e Atividades. Ajude com uma meta clara. Consolide e reporte toda semana.",
  ],
] as const;

export function SupervisorManual({ data, teamId }: { data: AppData; teamId: string }) {
  const { activeAccount, saveWeeklyForecast } = useAppData();
  const [copied, setCopied] = useState(false);
  const latest = data.weeklyForecasts.find((item) => item.teamId === teamId);
  const text = `Manual do Sublíder — Clonex JF\n\n${chapters.map(([title, body]) => `${title}\n${body}`).join("\n\n")}`;
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      window.prompt("Copie o manual:", text);
    }
    setCopied(true);
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    saveWeeklyForecast({
      teamId,
      weekStartsAt: String(form.get("weekStartsAt")),
      expectedPeople: Number(form.get("expectedPeople")),
      expectedHours: Number(form.get("expectedHours")),
      notes: String(form.get("notes")),
    });
  }
  return (
    <>
      <Card className="cx-supervisor-manual">
        <div className="cx-card-heading">
          <div>
            <span className="cx-eyebrow">Manual prático</span>
            <h2>
              <BookOpen /> Manual do Sublíder — Clonex JF
            </h2>
            <p>Guia simples para liderar a equipe e bater as metas.</p>
          </div>
          <div className="cx-manual-actions">
            <button onClick={() => void copy()}>
              <Copy /> {copied ? "Copiado" : "Copiar"}
            </button>
            <button onClick={() => window.print()}>
              <Printer /> Imprimir
            </button>
          </div>
        </div>
        <nav className="cx-manual-index">
          {chapters.map(([title], index) => (
            <a key={title} href={`#manual-${index + 1}`}>
              {title}
            </a>
          ))}
        </nav>
        <div className="cx-manual-chapters">
          {chapters.map(([title, body], index) => (
            <details key={title} id={`manual-${index + 1}`} open={index === 0}>
              <summary>{title}</summary>
              <p>{body}</p>
            </details>
          ))}
        </div>
      </Card>
      <Card>
        <span className="cx-eyebrow">Consolidação semanal</span>
        <h2>Expectativa de novos negócios</h2>
        <form className="cx-forecast-form" onSubmit={submit}>
          <label>
            Semana
            <input
              name="weekStartsAt"
              type="date"
              defaultValue={latest?.weekStartsAt ?? new Date().toISOString().slice(0, 10)}
              required
            />
          </label>
          <label>
            Novas pessoas/negócios
            <input
              name="expectedPeople"
              type="number"
              min="0"
              defaultValue={latest?.expectedPeople ?? 0}
              required
            />
          </label>
          <label>
            Horas estimadas
            <input
              name="expectedHours"
              type="number"
              min="0"
              step="0.5"
              defaultValue={latest?.expectedHours ?? 0}
              required
            />
          </label>
          <label>
            Observações
            <textarea name="notes" defaultValue={latest?.notes} />
          </label>
          <button className="cx-button">Salvar expectativa</button>
        </form>
        <small>Atualizado por {latest?.updatedBy ?? activeAccount?.name ?? "—"}</small>
      </Card>
    </>
  );
}
