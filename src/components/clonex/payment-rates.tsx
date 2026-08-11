import type { AppData, Person } from "@/domain/types";
import { paymentRateForPerson } from "@/lib/pricing";
import { Card } from "./dashboard-ui";

export function PaymentRates({ data, person }: { data: AppData; person?: Person }) {
  const current = person ? paymentRateForPerson(data, person) : null;
  return (
    <Card className="cx-payment-rates">
      <div className="cx-payment-rate-hero">
        <div>
          <span className="cx-eyebrow">Tabela automática</span>
          <strong>até R$ 15</strong>
          <small>por hora aprovada no ciclo mensal</small>
        </div>
        <p>
          O valor/hora acompanha as horas aprovadas. Cada pagamento preserva a faixa aplicada no
          momento do registro.
        </p>
      </div>
      <div className="cx-payment-plans">
        <section className={person?.paymentPlan === "celular_proprio" ? "is-current" : ""}>
          <span>Você usa o seu celular</span>
          <h3>Celular próprio</h3>
          <p>
            <b>Até 29 horas</b>
            <strong>R$ 12/h</strong>
          </p>
          <p>
            <b>30 horas ou mais</b>
            <strong>R$ 15/h</strong>
          </p>
        </section>
        <section className={person?.paymentPlan === "celular_clonex" ? "is-current" : ""}>
          <span>A Clonex fornece o celular</span>
          <h3>Kit Clonex</h3>
          <p>
            <b>Até 49 horas</b>
            <strong>R$ 10/h</strong>
          </p>
          <p>
            <b>De 50 a 70 horas</b>
            <strong>R$ 12/h</strong>
          </p>
          <p>
            <b>Acima de 70 horas</b>
            <strong>R$ 15/h</strong>
          </p>
        </section>
      </div>
      {current ? (
        <div className="cx-current-rate">
          <span>
            <small>Seu plano</small>
            <strong>{current.plan === "celular_proprio" ? "Celular próprio" : "Kit Clonex"}</strong>
          </span>
          <span>
            <small>Faixa atual</small>
            <strong>{current.bandLabel}</strong>
          </span>
          <span>
            <small>Horas aprovadas</small>
            <strong>{current.hours.toFixed(1)}h</strong>
          </span>
          <span>
            <small>Valor atual</small>
            <strong>R$ {current.hourlyRate}/h</strong>
          </span>
          <span>
            <small>Projeção</small>
            <strong>
              {current.projectedAmount.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </strong>
          </span>
          {current.nextBandLabel ? (
            <p>
              Faltam {current.hoursToNextBand.toFixed(1)}h para {current.nextBandLabel}.
            </p>
          ) : (
            <p>Faixa máxima alcançada.</p>
          )}
        </div>
      ) : null}
    </Card>
  );
}
