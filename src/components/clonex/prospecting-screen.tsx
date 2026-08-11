import {
  Ban,
  Building2,
  CheckCircle2,
  ChevronRight,
  Columns3,
  History,
  List,
  MapPin,
  Plus,
  Search,
  Target,
  UserRound,
  X,
} from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";

import type {
  AppData,
  NewProspect,
  Prospect,
  ProspectPlaceType,
  ProspectStatus,
  Role,
} from "@/domain/types";
import { useDialogBehavior } from "@/hooks/use-dialog-behavior";
import { useAppData } from "@/state/use-app-data";

const STATUS_ORDER: ProspectStatus[] = ["novo", "contatado", "negociacao", "convertido", "negado"];
const STATUS_LABELS: Record<ProspectStatus, string> = {
  novo: "Novo",
  contatado: "Contatado",
  negociacao: "Em negociação",
  convertido: "Convertido",
  negado: "Negado",
};
const TYPE_LABELS: Record<ProspectPlaceType, string> = {
  empresa: "Empresa",
  comercio: "Comércio",
  industria: "Indústria",
  servico: "Serviço",
  autonomo: "Autônomo",
  outro: "Outro",
};

function normalize(value: string) {
  return value.trim().toLocaleLowerCase("pt-BR");
}

function shortDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function ProspectStatusBadge({ status }: { status: ProspectStatus }) {
  return <span className={`cx-prospect-status is-${status}`}>{STATUS_LABELS[status]}</span>;
}

function ProspectCard({
  prospect,
  data,
  compact = false,
  onClick,
}: {
  prospect: Prospect;
  data: AppData;
  compact?: boolean;
  onClick(): void;
}) {
  const team = data.teams.find((item) => item.id === prospect.teamId);
  const owner = data.accounts.find((item) => item.id === prospect.ownerAccountId);
  return (
    <button className={`cx-prospect-card${compact ? " is-compact" : ""}`} onClick={onClick}>
      <div className="cx-prospect-card-heading">
        <span className="cx-prospect-place-icon">
          <Building2 size={18} />
        </span>
        <div>
          <strong>{prospect.placeName}</strong>
          <small>{TYPE_LABELS[prospect.placeType]}</small>
        </div>
        <ChevronRight size={17} />
      </div>
      <div className="cx-prospect-card-meta">
        <span>
          <UserRound size={14} /> {prospect.contactName}
        </span>
        <span>
          <MapPin size={14} /> {prospect.city} · {prospect.state}
        </span>
      </div>
      {!compact ? (
        <div className="cx-prospect-card-footer">
          <ProspectStatusBadge status={prospect.status} />
          <span>{owner?.name ?? "Responsável não encontrado"}</span>
          <small>{team?.name}</small>
        </div>
      ) : (
        <small className="cx-prospect-owner">{owner?.name ?? team?.name}</small>
      )}
    </button>
  );
}

function ProspectEditorDialog({
  data,
  role,
  onClose,
  onDuplicate,
}: {
  data: AppData;
  role: Role;
  onClose(): void;
  onDuplicate(id: string): void;
}) {
  const { activeAccount, addProspect } = useAppData();
  const defaultTeam = role === "subleader" ? activeAccount?.teamId : data.teams[0]?.id;
  const selectedTeam = data.teams.find((team) => team.id === defaultTeam);
  const [teamId, setTeamId] = useState(defaultTeam ?? "");
  const [contactName, setContactName] = useState("");
  const [placeName, setPlaceName] = useState("");
  const [placeType, setPlaceType] = useState<ProspectPlaceType>("empresa");
  const [contact, setContact] = useState("");
  const [city, setCity] = useState(selectedTeam?.city ?? "Juiz de Fora");
  const [state, setState] = useState(selectedTeam?.state ?? "MG");
  const [notes, setNotes] = useState("");
  const [duplicateId, setDuplicateId] = useState<string | null>(null);
  useDialogBehavior(onClose);

  const placeSuggestions = useMemo(
    () =>
      [...new Set(data.prospects.map((item) => item.placeName))].sort((a, b) => a.localeCompare(b)),
    [data.prospects],
  );
  const liveDuplicate = data.prospects.find(
    (item) => placeName.trim().length > 2 && normalize(item.placeName) === normalize(placeName),
  );

  function submit(event: FormEvent) {
    event.preventDefault();
    const result = addProspect({
      contactName,
      placeName,
      placeType,
      contact,
      city,
      state,
      teamId,
      notes,
    });
    if (!result.ok) {
      setDuplicateId(result.duplicateId ?? null);
      return;
    }
    onClose();
  }

  if (typeof document === "undefined") return null;
  return createPortal(
    <div
      className="cx-dialog-layer cx-prospect-dialog-layer"
      role="presentation"
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) onClose();
      }}
    >
      <section
        className="cx-dialog cx-prospect-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="prospect-editor-title"
      >
        <div className="cx-dialog-heading">
          <div>
            <span className="cx-eyebrow">Controle comercial</span>
            <h2 id="prospect-editor-title">Nova prospecção</h2>
            <p>Consulte locais já registrados antes de iniciar um novo contato.</p>
          </div>
          <button onClick={onClose} aria-label="Fechar nova prospecção">
            <X size={18} />
          </button>
        </div>
        <form className="cx-form cx-prospect-form" onSubmit={submit}>
          <div className="cx-prospect-form-scroll">
            <label>
              Nome do local
              <input
                value={placeName}
                onChange={(event) => {
                  setPlaceName(event.target.value);
                  setDuplicateId(null);
                }}
                list="clonex-prospect-places"
                placeholder="Ex.: Oficina Central JF"
                autoFocus
                required
              />
              <datalist id="clonex-prospect-places">
                {placeSuggestions.map((place) => (
                  <option key={place} value={place} />
                ))}
              </datalist>
            </label>
            {liveDuplicate || duplicateId ? (
              <button
                type="button"
                className="cx-prospect-duplicate"
                onClick={() => onDuplicate(liveDuplicate?.id ?? duplicateId ?? "")}
              >
                <History size={17} />
                <span>
                  <strong>Este local já foi prospectado.</strong>
                  <small>Abrir cadastro e histórico para evitar contato repetido.</small>
                </span>
                <ChevronRight size={17} />
              </button>
            ) : null}
            <div className="cx-form-row">
              <label>
                Pessoa com quem conversou
                <input
                  value={contactName}
                  onChange={(event) => setContactName(event.target.value)}
                  required
                />
              </label>
              <label>
                Telefone, e-mail ou referência
                <input
                  value={contact}
                  onChange={(event) => setContact(event.target.value)}
                  required
                />
              </label>
            </div>
            <div className="cx-form-row">
              <label>
                Tipo de perfil
                <select
                  value={placeType}
                  onChange={(event) => setPlaceType(event.target.value as ProspectPlaceType)}
                >
                  {Object.entries(TYPE_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Equipe responsável
                <select
                  value={teamId}
                  onChange={(event) => {
                    const nextTeam = data.teams.find((team) => team.id === event.target.value);
                    setTeamId(event.target.value);
                    if (nextTeam) {
                      setCity(nextTeam.city);
                      setState(nextTeam.state ?? state);
                    }
                  }}
                  disabled={role === "subleader"}
                >
                  {data.teams.map((team) => (
                    <option key={team.id} value={team.id}>
                      {team.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="cx-form-row">
              <label>
                Cidade
                <input value={city} onChange={(event) => setCity(event.target.value)} required />
              </label>
              <label>
                Estado
                <input
                  value={state}
                  onChange={(event) => setState(event.target.value)}
                  maxLength={2}
                  required
                />
              </label>
            </div>
            <label>
              Observações iniciais
              <textarea value={notes} onChange={(event) => setNotes(event.target.value)} rows={3} />
            </label>
          </div>
          <div className="cx-dialog-actions">
            <button type="button" className="cx-button cx-button--ghost" onClick={onClose}>
              Cancelar
            </button>
            <button
              className="cx-button"
              type="submit"
              disabled={Boolean(liveDuplicate || duplicateId)}
            >
              Salvar prospecção
            </button>
          </div>
        </form>
      </section>
    </div>,
    document.body,
  );
}

function ProspectDetailDialog({
  data,
  prospect,
  onClose,
}: {
  data: AppData;
  prospect: Prospect;
  onClose(): void;
}) {
  const { updateProspect } = useAppData();
  const [status, setStatus] = useState(prospect.status);
  const [note, setNote] = useState("");
  const [rejectionReason, setRejectionReason] = useState(prospect.rejectionReason ?? "");
  const [active, setActive] = useState(prospect.active);
  useDialogBehavior(onClose);
  const team = data.teams.find((item) => item.id === prospect.teamId);
  const owner = data.accounts.find((item) => item.id === prospect.ownerAccountId);
  const history = data.prospectHistory.filter((item) => item.prospectId === prospect.id);

  function submit(event: FormEvent) {
    event.preventDefault();
    if (status === "negado" && !rejectionReason.trim()) return;
    updateProspect({ id: prospect.id, status, note, rejectionReason, active });
    onClose();
  }

  if (typeof document === "undefined") return null;
  return createPortal(
    <div
      className="cx-dialog-layer cx-prospect-dialog-layer"
      role="presentation"
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) onClose();
      }}
    >
      <section
        className="cx-dialog cx-prospect-detail"
        role="dialog"
        aria-modal="true"
        aria-labelledby="prospect-detail-title"
      >
        <div className="cx-dialog-heading">
          <div>
            <span className="cx-eyebrow">
              {team?.name} · {TYPE_LABELS[prospect.placeType]}
            </span>
            <h2 id="prospect-detail-title">{prospect.placeName}</h2>
            <p>
              {prospect.contactName} · {prospect.contact}
            </p>
          </div>
          <button onClick={onClose} aria-label="Fechar detalhes da prospecção">
            <X size={18} />
          </button>
        </div>
        <div className="cx-prospect-detail-scroll">
          <div className="cx-prospect-summary-strip">
            <ProspectStatusBadge status={prospect.status} />
            <span>
              <UserRound size={15} /> {owner?.name ?? "Sem responsável"}
            </span>
            <span>
              <MapPin size={15} /> {prospect.city} · {prospect.state}
            </span>
          </div>
          <p className="cx-prospect-notes">{prospect.notes || "Sem observações registradas."}</p>
          {prospect.rejectionReason ? (
            <div className="cx-prospect-rejection">
              <Ban size={17} />
              <span>
                <strong>Motivo da negativa</strong>
                {prospect.rejectionReason}
              </span>
            </div>
          ) : null}
          <form className="cx-form cx-prospect-update" onSubmit={submit}>
            <div className="cx-form-row">
              <label>
                Etapa atual
                <select
                  value={status}
                  onChange={(event) => {
                    const nextStatus = event.target.value as ProspectStatus;
                    setStatus(nextStatus);
                    setActive(nextStatus !== "convertido" && nextStatus !== "negado");
                  }}
                >
                  {STATUS_ORDER.map((item) => (
                    <option key={item} value={item}>
                      {STATUS_LABELS[item]}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Controle
                <select
                  value={active ? "ativo" : "encerrado"}
                  onChange={(event) => setActive(event.target.value === "ativo")}
                >
                  <option value="ativo">Ativo para acompanhamento</option>
                  <option value="encerrado">Encerrado</option>
                </select>
              </label>
            </div>
            {status === "negado" ? (
              <label>
                Motivo da negativa
                <input
                  value={rejectionReason}
                  onChange={(event) => setRejectionReason(event.target.value)}
                  required
                />
              </label>
            ) : null}
            <label>
              Registro da conversa
              <textarea
                value={note}
                onChange={(event) => setNote(event.target.value)}
                rows={3}
                placeholder="O que foi conversado e qual é o próximo passo?"
              />
            </label>
            <button className="cx-button" type="submit">
              Atualizar prospecção
            </button>
          </form>
          <div className="cx-prospect-history">
            <strong>
              <History size={17} /> Histórico
            </strong>
            {history.length ? (
              history.map((event) => (
                <article key={event.id}>
                  <span className="cx-prospect-timeline-dot" />
                  <div>
                    <strong>{STATUS_LABELS[event.toStatus]}</strong>
                    <p>{event.note}</p>
                    <small>
                      {event.actorName} · {shortDate(event.occurredAt)}
                    </small>
                  </div>
                </article>
              ))
            ) : (
              <p className="cx-muted">Nenhuma movimentação adicional.</p>
            )}
          </div>
        </div>
      </section>
    </div>,
    document.body,
  );
}

export function ProspectingScreen({ data, role }: { data: AppData; role: Role }) {
  const { activeAccount } = useAppData();
  const [view, setView] = useState<"list" | "kanban">("list");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<ProspectStatus | "todos">("todos");
  const [activity, setActivity] = useState<"ativos" | "encerrados" | "todos">("ativos");
  const [teamId, setTeamId] = useState(
    role === "subleader" ? (activeAccount?.teamId ?? "") : "todos",
  );
  const [creating, setCreating] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const scoped = useMemo(
    () =>
      data.prospects.filter((item) => role === "lider" || item.teamId === activeAccount?.teamId),
    [data.prospects, role, activeAccount?.teamId],
  );
  const filtered = useMemo(() => {
    const term = normalize(search);
    return scoped.filter((item) => {
      const matchesSearch =
        !term ||
        [item.placeName, item.contactName, item.contact, item.city].some((value) =>
          normalize(value).includes(term),
        );
      const matchesStatus = status === "todos" || item.status === status;
      const matchesActivity = activity === "todos" || item.active === (activity === "ativos");
      const matchesTeam = teamId === "todos" || item.teamId === teamId;
      return matchesSearch && matchesStatus && matchesActivity && matchesTeam;
    });
  }, [activity, scoped, search, status, teamId]);

  const converted = scoped.filter((item) => item.status === "convertido").length;
  const conversion = scoped.length ? Math.round((converted / scoped.length) * 100) : 0;
  const activeCount = scoped.filter((item) => item.active).length;
  const typePerformance = Object.entries(TYPE_LABELS)
    .map(([type, label]) => {
      const items = scoped.filter((item) => item.placeType === type);
      const conversions = items.filter((item) => item.status === "convertido").length;
      return {
        type,
        label,
        total: items.length,
        conversions,
        rate: items.length ? Math.round((conversions / items.length) * 100) : 0,
      };
    })
    .filter((item) => item.total)
    .sort((a, b) => b.rate - a.rate || b.total - a.total);
  const selected = data.prospects.find((item) => item.id === selectedId);

  return (
    <div className="cx-page-stack cx-prospecting-page">
      <div className="cx-page-heading">
        <div>
          <span className="cx-eyebrow">Relacionamento e expansão</span>
          <h1>Prospecção</h1>
          <p>
            Controle contatos, evite abordagens repetidas e descubra os perfis com melhor conversão.
          </p>
        </div>
        <button className="cx-button cx-add-action" onClick={() => setCreating(true)}>
          <Plus size={18} /> Nova prospecção
        </button>
      </div>

      <div className="cx-prospect-kpis">
        <article>
          <Target size={19} />
          <span>
            Ativos<strong>{activeCount}</strong>
            <small>em acompanhamento</small>
          </span>
        </article>
        <article>
          <CheckCircle2 size={19} />
          <span>
            Convertidos<strong>{converted}</strong>
            <small>{conversion}% da base</small>
          </span>
        </article>
        <article>
          <Building2 size={19} />
          <span>
            Locais únicos
            <strong>{new Set(scoped.map((item) => normalize(item.placeName))).size}</strong>
            <small>histórico preservado</small>
          </span>
        </article>
      </div>

      {role === "lider" ? (
        <section className="cx-card cx-prospect-team-progress">
          <div>
            <span className="cx-eyebrow">Acompanhamento dos Sublíderes</span>
            <h2>Progresso por equipe</h2>
          </div>
          <div className="cx-prospect-team-grid">
            {data.teams.map((team) => {
              const items = scoped.filter((item) => item.teamId === team.id);
              const account = data.accounts.find(
                (item) => item.teamId === team.id && item.role === "subleader",
              );
              const teamConverted = items.filter((item) => item.status === "convertido").length;
              return (
                <button key={team.id} onClick={() => setTeamId(team.id)}>
                  <strong>{account?.name ?? team.name}</strong>
                  <span>
                    {items.filter((item) => item.active).length} ativos · {teamConverted}{" "}
                    convertidos
                  </span>
                  <div>
                    <i
                      style={{
                        width: `${items.length ? (teamConverted / items.length) * 100 : 0}%`,
                      }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      ) : null}

      <section className="cx-card cx-prospect-insights">
        <div>
          <span className="cx-eyebrow">Insights de perfil</span>
          <h2>Onde vale concentrar esforço</h2>
        </div>
        <div>
          {typePerformance.length ? (
            typePerformance.map((item) => (
              <article key={item.type}>
                <span>
                  <strong>{item.label}</strong>
                  <small>
                    {item.conversions} de {item.total} convertidos
                  </small>
                </span>
                <div>
                  <i style={{ width: `${item.rate}%` }} />
                </div>
                <b>{item.rate}%</b>
              </article>
            ))
          ) : (
            <p className="cx-muted">Cadastre prospecções para gerar os primeiros insights.</p>
          )}
        </div>
      </section>

      <div className="cx-prospect-toolbar">
        <label className="cx-prospect-search">
          <Search size={17} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar local, pessoa ou contato"
          />
        </label>
        {role === "lider" ? (
          <select value={teamId} onChange={(event) => setTeamId(event.target.value)}>
            <option value="todos">Todas as equipes</option>
            {data.teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        ) : null}
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value as ProspectStatus | "todos")}
        >
          <option value="todos">Todos os status</option>
          {STATUS_ORDER.map((item) => (
            <option key={item} value={item}>
              {STATUS_LABELS[item]}
            </option>
          ))}
        </select>
        <select
          value={activity}
          onChange={(event) => setActivity(event.target.value as typeof activity)}
        >
          <option value="ativos">Ativos</option>
          <option value="encerrados">Encerrados</option>
          <option value="todos">Todos</option>
        </select>
        <div className="cx-prospect-view-switch" aria-label="Modo de visualização">
          <button
            className={view === "list" ? "is-active" : ""}
            onClick={() => setView("list")}
            aria-label="Visualizar lista"
          >
            <List size={18} />
          </button>
          <button
            className={view === "kanban" ? "is-active" : ""}
            onClick={() => setView("kanban")}
            aria-label="Visualizar Kanban"
          >
            <Columns3 size={18} />
          </button>
        </div>
      </div>

      {view === "list" ? (
        <div className="cx-prospect-list">
          {filtered.length ? (
            filtered.map((prospect) => (
              <ProspectCard
                key={prospect.id}
                prospect={prospect}
                data={data}
                onClick={() => setSelectedId(prospect.id)}
              />
            ))
          ) : (
            <div className="cx-card cx-empty-state">
              <Search size={24} />
              <strong>Nenhuma prospecção encontrada</strong>
              <p>Ajuste os filtros ou cadastre um novo contato.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="cx-prospect-kanban">
          {STATUS_ORDER.map((columnStatus) => {
            const items = filtered.filter((item) => item.status === columnStatus);
            return (
              <section key={columnStatus}>
                <header>
                  <ProspectStatusBadge status={columnStatus} />
                  <b>{items.length}</b>
                </header>
                <div>
                  {items.map((prospect) => (
                    <ProspectCard
                      key={prospect.id}
                      prospect={prospect}
                      data={data}
                      compact
                      onClick={() => setSelectedId(prospect.id)}
                    />
                  ))}
                  {!items.length ? <p>Nenhum contato nesta etapa.</p> : null}
                </div>
              </section>
            );
          })}
        </div>
      )}

      {creating ? (
        <ProspectEditorDialog
          data={data}
          role={role}
          onClose={() => setCreating(false)}
          onDuplicate={(id) => {
            setCreating(false);
            setSelectedId(id);
          }}
        />
      ) : null}
      {selected ? (
        <ProspectDetailDialog data={data} prospect={selected} onClose={() => setSelectedId(null)} />
      ) : null}
    </div>
  );
}
