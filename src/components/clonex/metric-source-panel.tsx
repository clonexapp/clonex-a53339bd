import { ArrowLeft, ChevronRight, Clock3, History, Info, X } from "lucide-react";
import { useEffect, useState } from "react";

import type { AppData, MetricHistoryItem, MetricSource } from "@/domain/types";
import { formatHours } from "@/lib/formatters";
import { StatusBadge } from "./dashboard-ui";

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function MetricSourcePanel({
  source,
  data,
  onClose,
}: {
  source: MetricSource;
  data: AppData;
  onClose(): void;
}) {
  const [selected, setSelected] = useState<MetricHistoryItem | null>(null);

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  const captures = selected
    ? selected.captureIds
        .map((id) => data.captures.find((capture) => capture.id === id))
        .filter((capture): capture is AppData["captures"][number] => Boolean(capture))
    : [];
  const auditEvents = selected
    ? data.auditEvents.filter(
        (event) =>
          selected.captureIds.includes(event.entityId) || event.entityId === selected.personId,
      )
    : [];

  return (
    <div
      className="cx-source-layer"
      role="presentation"
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) onClose();
      }}
    >
      <section
        className="cx-source-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="source-panel-title"
      >
        <div className="cx-source-handle" />
        <header className="cx-source-header">
          {selected ? (
            <button onClick={() => setSelected(null)} aria-label="Voltar para o histórico">
              <ArrowLeft size={18} />
            </button>
          ) : (
            <span className="cx-source-icon">
              <Info size={17} />
            </span>
          )}
          <div>
            <span className="cx-eyebrow">{selected ? "Detalhes da pessoa" : "De onde vem"}</span>
            <h2 id="source-panel-title">{selected?.actorName ?? source.title}</h2>
          </div>
          <button onClick={onClose} aria-label="Fechar origem e histórico">
            <X size={19} />
          </button>
        </header>

        {selected ? (
          <div className="cx-source-body">
            <div className="cx-source-person-summary">
              <strong>{selected.value}</strong>
              {selected.percentage !== undefined ? <span>{selected.percentage}%</span> : null}
              <p>{selected.summary}</p>
            </div>
            <div className="cx-source-section-title">
              <Clock3 size={16} /> Registros que formam este número
            </div>
            <div className="cx-source-records">
              {captures.length ? (
                captures.map((capture) => {
                  const equipment = data.equipment.find((item) => item.id === capture.equipmentId);
                  return (
                    <article key={capture.id}>
                      <div>
                        <strong>{capture.activity}</strong>
                        <span>{formatDateTime(capture.recordedAt)}</span>
                      </div>
                      <div className="cx-source-record-meta">
                        <span>{formatHours(capture.minutes)}</span>
                        <span>
                          {equipment ? `${equipment.type} · ${equipment.model}` : "Sem equipamento"}
                        </span>
                        <StatusBadge status={capture.status} />
                      </div>
                      {capture.reviewedBy ? (
                        <p>
                          Revisado por {capture.reviewedBy}
                          {capture.reviewedAt ? ` em ${formatDateTime(capture.reviewedAt)}` : ""}.
                        </p>
                      ) : (
                        <p>Aguardando responsável pela revisão.</p>
                      )}
                    </article>
                  );
                })
              ) : (
                <p className="cx-source-empty">Nenhuma captura ligada a este indicador.</p>
              )}
            </div>
            {auditEvents.length ? (
              <>
                <div className="cx-source-section-title">
                  <History size={16} /> Ações registradas
                </div>
                <div className="cx-audit-list">
                  {auditEvents.map((event) => (
                    <article key={event.id}>
                      <strong>{event.actorName}</strong>
                      <span>{formatDateTime(event.occurredAt)}</span>
                      <p>{event.details}</p>
                    </article>
                  ))}
                </div>
              </>
            ) : null}
          </div>
        ) : (
          <div className="cx-source-body">
            <div className="cx-source-value">
              <strong>{source.value}</strong>
              <span>{source.percentage}%</span>
              <p>{source.actual}</p>
            </div>
            {source.secondary ? (
              <div className="cx-source-secondary">
                <span>{source.secondary.label}</span>
                <strong>{source.secondary.value}</strong>
                <b>{source.secondary.percentage}%</b>
              </div>
            ) : null}
            <dl className="cx-source-definition">
              <div>
                <dt>Fórmula</dt>
                <dd>{source.formula}</dd>
              </div>
              <div>
                <dt>Origem</dt>
                <dd>{source.origin}</dd>
              </div>
              <div>
                <dt>Última atualização</dt>
                <dd>{source.updatedAt}</dd>
              </div>
            </dl>
            <div className="cx-source-section-title">
              <History size={16} /> Histórico por pessoa
            </div>
            <div className="cx-source-history">
              {source.history.length ? (
                source.history.map((item) => (
                  <button key={item.id} onClick={() => setSelected(item)}>
                    <div>
                      <strong>{item.actorName}</strong>
                      <span>{item.summary}</span>
                    </div>
                    <div>
                      <strong>{item.value}</strong>
                      {item.percentage !== undefined ? <span>{item.percentage}%</span> : null}
                    </div>
                    <ChevronRight size={17} />
                  </button>
                ))
              ) : (
                <p className="cx-source-empty">Nenhum registro encontrado para este período.</p>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
