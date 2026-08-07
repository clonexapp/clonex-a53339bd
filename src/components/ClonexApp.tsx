import { useState, type FormEvent } from "react";
import {
  BarChart3,
  Bell,
  Camera,
  ChevronRight,
  CircleDollarSign,
  Flag,
  HardHat,
  Home,
  LogOut,
  Menu,
  RotateCcw,
  Users,
  X,
} from "lucide-react";

import type { EquipmentType, Role } from "@/domain/types";
import { AppDataProvider } from "@/state/app-data-context";
import { useAppData } from "@/state/use-app-data";
import {
  CapturesScreen,
  EquipmentScreen,
  FinanceScreen,
  GoalsScreen,
  OverviewScreen,
  PeopleScreen,
} from "@/components/clonex/screens";

type TabKey = "overview" | "captures" | "goals" | "people" | "equipment" | "finance";

interface NavItem {
  key: TabKey;
  label: string;
  icon: typeof Home;
}

const ROLE_LABELS: Record<Role, string> = {
  membro: "Membro",
  subleader: "Sublíder",
  lider: "Líder geral",
};

const NAVIGATION: Record<Role, NavItem[]> = {
  membro: [
    { key: "overview", label: "Início", icon: Home },
    { key: "captures", label: "Capturas", icon: Camera },
    { key: "goals", label: "Metas", icon: Flag },
    { key: "equipment", label: "Equipamentos", icon: HardHat },
  ],
  subleader: [
    { key: "overview", label: "Visão geral", icon: BarChart3 },
    { key: "people", label: "Pessoas", icon: Users },
    { key: "captures", label: "Capturas", icon: Camera },
    { key: "equipment", label: "Equipamentos", icon: HardHat },
    { key: "finance", label: "Financeiro", icon: CircleDollarSign },
  ],
  lider: [
    { key: "overview", label: "Visão geral", icon: BarChart3 },
    { key: "people", label: "Pessoas", icon: Users },
    { key: "captures", label: "Capturas", icon: Camera },
    { key: "equipment", label: "Equipamentos", icon: HardHat },
    { key: "finance", label: "Financeiro", icon: CircleDollarSign },
  ],
};

function ClonexWorkspace() {
  const { data, markNoticesRead, resetDemo } = useAppData();
  const [role, setRole] = useState<Role | null>(null);
  const [tab, setTab] = useState<TabKey>("overview");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [noticesOpen, setNoticesOpen] = useState(false);
  const [captureOpen, setCaptureOpen] = useState(false);
  const [equipmentOpen, setEquipmentOpen] = useState(false);

  if (!data) return <LoadingScreen />;
  if (!role) return <AccessScreen onEnter={setRole} />;

  const nav = NAVIGATION[role];
  const notices = data.notices.filter((notice) => notice.role === role);
  const unread = notices.filter((notice) => !notice.read).length;

  function switchRole(nextRole: Role) {
    setRole(nextRole);
    setTab("overview");
    setMobileMenu(false);
  }

  const screenProps = {
    data,
    role,
    onAddCapture: () => setCaptureOpen(true),
    onAddEquipment: () => setEquipmentOpen(true),
  };

  return (
    <div className="cx-app">
      <aside className={`cx-sidebar ${mobileMenu ? "is-open" : ""}`}>
        <div className="cx-brand">
          <span className="cx-brand-mark" />
          <span>Clonex</span>
        </div>
        <button
          className="cx-close-menu"
          onClick={() => setMobileMenu(false)}
          aria-label="Fechar menu"
        >
          <X />
        </button>
        <div className="cx-role-select">
          <span>Visualização</span>
          <select
            value={role}
            onChange={(event) => switchRole(event.target.value as Role)}
            aria-label="Perfil de demonstração"
          >
            <option value="membro">Membro</option>
            <option value="subleader">Sublíder</option>
            <option value="lider">Líder geral</option>
          </select>
        </div>
        <nav className="cx-nav" aria-label="Navegação principal">
          {nav.map((item) => (
            <button
              key={item.key}
              className={tab === item.key ? "is-active" : ""}
              onClick={() => {
                setTab(item.key);
                setMobileMenu(false);
              }}
            >
              <item.icon size={19} />
              <span>{item.label}</span>
              <ChevronRight className="cx-nav-arrow" size={16} />
            </button>
          ))}
        </nav>
        <div className="cx-sidebar-footer">
          <button onClick={() => void resetDemo()}>
            <RotateCcw size={17} /> Restaurar demonstração
          </button>
          <button onClick={() => setRole(null)}>
            <LogOut size={17} /> Sair
          </button>
          <p>Dados salvos somente neste dispositivo.</p>
        </div>
      </aside>
      {mobileMenu && (
        <button
          className="cx-menu-backdrop"
          onClick={() => setMobileMenu(false)}
          aria-label="Fechar menu"
        />
      )}

      <div className="cx-main">
        <header className="cx-topbar">
          <button
            className="cx-menu-button"
            onClick={() => setMobileMenu(true)}
            aria-label="Abrir menu"
          >
            <Menu />
          </button>
          <div className="cx-mobile-brand">
            <span className="cx-brand-mark" />
            Clonex
          </div>
          <div className="cx-topbar-context">
            <span>Clonex Operações</span>
            <strong>{ROLE_LABELS[role]}</strong>
          </div>
          <div className="cx-notice-wrap">
            <button
              className="cx-icon-button"
              aria-label={`${unread} notificações não lidas`}
              onClick={() => {
                setNoticesOpen((open) => !open);
                markNoticesRead(role);
              }}
            >
              <Bell size={19} />
              {unread > 0 && <span>{unread}</span>}
            </button>
            {noticesOpen && (
              <div className="cx-notice-panel">
                <div>
                  <strong>Notificações</strong>
                  <button onClick={() => setNoticesOpen(false)} aria-label="Fechar notificações">
                    <X size={17} />
                  </button>
                </div>
                {notices.length ? (
                  notices.map((notice) => (
                    <article key={notice.id}>
                      <p>{notice.message}</p>
                      <span>{notice.createdAt}</span>
                    </article>
                  ))
                ) : (
                  <p className="cx-muted">Nenhuma notificação.</p>
                )}
              </div>
            )}
          </div>
          <div className="cx-user-chip">
            <span>RD</span>
            <div>
              <strong>Rafael Diniz</strong>
              <small>{ROLE_LABELS[role]}</small>
            </div>
          </div>
        </header>

        <main className="cx-content">
          {tab === "overview" && <OverviewScreen {...screenProps} />}
          {tab === "captures" && <CapturesScreen {...screenProps} />}
          {tab === "goals" && <GoalsScreen {...screenProps} />}
          {tab === "people" && <PeopleScreen {...screenProps} />}
          {tab === "equipment" && <EquipmentScreen {...screenProps} />}
          {tab === "finance" && <FinanceScreen {...screenProps} />}
        </main>

        <nav className="cx-bottom-nav" aria-label="Navegação móvel">
          {nav.slice(0, 5).map((item) => (
            <button
              key={item.key}
              className={tab === item.key ? "is-active" : ""}
              onClick={() => setTab(item.key)}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {captureOpen && <CaptureDialog onClose={() => setCaptureOpen(false)} />}
      {equipmentOpen && <EquipmentDialog onClose={() => setEquipmentOpen(false)} />}
    </div>
  );
}

function AccessScreen({ onEnter }: { onEnter(role: Role): void }) {
  const roles: { key: Role; title: string; description: string; icon: typeof Home }[] = [
    {
      key: "membro",
      title: "Membro",
      description: "Registre capturas, acompanhe metas e equipamentos.",
      icon: Camera,
    },
    {
      key: "subleader",
      title: "Sublíder",
      description: "Gerencie pessoas, revise capturas e acompanhe a equipe.",
      icon: Users,
    },
    {
      key: "lider",
      title: "Líder geral",
      description: "Visualize toda a operação, inventário e financeiro.",
      icon: BarChart3,
    },
  ];
  return (
    <main className="cx-access">
      <div className="cx-access-brand">
        <span className="cx-brand-mark" />
        <strong>Clonex</strong>
      </div>
      <div className="cx-access-copy">
        <span className="cx-eyebrow">Ambiente de demonstração</span>
        <h1>Controle de captura para embodied AI.</h1>
        <p>
          Escolha um perfil para acessar. A autenticação real será conectada ao Supabase no próximo
          passo.
        </p>
      </div>
      <div className="cx-role-grid">
        {roles.map((item) => (
          <button key={item.key} onClick={() => onEnter(item.key)}>
            <span className="cx-role-icon">
              <item.icon />
            </span>
            <span>
              <strong>{item.title}</strong>
              <small>{item.description}</small>
            </span>
            <ChevronRight />
          </button>
        ))}
      </div>
      <p className="cx-access-note">Nenhuma senha é necessária nesta versão local.</p>
    </main>
  );
}

function CaptureDialog({ onClose }: { onClose(): void }) {
  const { data, addCapture } = useAppData();
  const [activity, setActivity] = useState("");
  const [minutes, setMinutes] = useState("30");
  const [equipmentId, setEquipmentId] = useState(
    data?.equipment.find((item) => item.assignedTo === "p1")?.id ?? "",
  );
  function submit(event: FormEvent) {
    event.preventDefault();
    if (!activity.trim() || !equipmentId) return;
    addCapture({ activity: activity.trim(), minutes: Math.max(1, Number(minutes)), equipmentId });
    onClose();
  }
  return (
    <Dialog
      title="Nova captura"
      description="Registre a atividade realizada. Ela ficará pendente para revisão."
      onClose={onClose}
    >
      <form className="cx-form" onSubmit={submit}>
        <label>
          Atividade
          <input
            value={activity}
            onChange={(event) => setActivity(event.target.value)}
            placeholder="Ex.: montagem de peça"
            autoFocus
            required
          />
        </label>
        <div className="cx-form-row">
          <label>
            Duração em minutos
            <input
              type="number"
              min="1"
              value={minutes}
              onChange={(event) => setMinutes(event.target.value)}
              required
            />
          </label>
          <label>
            Equipamento
            <select
              value={equipmentId}
              onChange={(event) => setEquipmentId(event.target.value)}
              required
            >
              <option value="">Selecione</option>
              {data?.equipment
                .filter((item) => item.assignedTo === "p1" || item.status === "disponivel")
                .map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.type} · {item.model}
                  </option>
                ))}
            </select>
          </label>
        </div>
        <div className="cx-dialog-actions">
          <button type="button" className="cx-button cx-button--ghost" onClick={onClose}>
            Cancelar
          </button>
          <button className="cx-button" type="submit">
            Salvar captura
          </button>
        </div>
      </form>
    </Dialog>
  );
}

function EquipmentDialog({ onClose }: { onClose(): void }) {
  const { addEquipment } = useAppData();
  const [type, setType] = useState<EquipmentType>("capacete");
  const [model, setModel] = useState("");
  const [owner, setOwner] = useState<"clonex" | "proprio">("clonex");
  function submit(event: FormEvent) {
    event.preventDefault();
    if (!model.trim()) return;
    addEquipment({ type, model: model.trim(), owner });
    onClose();
  }
  return (
    <Dialog
      title="Cadastrar equipamento"
      description="O item ficará disponível no inventário local."
      onClose={onClose}
    >
      <form className="cx-form" onSubmit={submit}>
        <div className="cx-form-row">
          <label>
            Tipo
            <select value={type} onChange={(event) => setType(event.target.value as EquipmentType)}>
              <option value="capacete">Capacete</option>
              <option value="celular">Celular</option>
            </select>
          </label>
          <label>
            Origem
            <select
              value={owner}
              onChange={(event) => setOwner(event.target.value as "clonex" | "proprio")}
            >
              <option value="clonex">Clonex</option>
              <option value="proprio">Próprio</option>
            </select>
          </label>
        </div>
        <label>
          Modelo ou tamanho
          <input
            value={model}
            onChange={(event) => setModel(event.target.value)}
            placeholder={type === "capacete" ? "Ex.: Tamanho M" : "Ex.: Galaxy S23"}
            autoFocus
            required
          />
        </label>
        <div className="cx-dialog-actions">
          <button type="button" className="cx-button cx-button--ghost" onClick={onClose}>
            Cancelar
          </button>
          <button className="cx-button" type="submit">
            Cadastrar
          </button>
        </div>
      </form>
    </Dialog>
  );
}

function Dialog({
  title,
  description,
  onClose,
  children,
}: {
  title: string;
  description: string;
  onClose(): void;
  children: React.ReactNode;
}) {
  return (
    <div
      className="cx-dialog-layer"
      role="presentation"
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) onClose();
      }}
    >
      <section className="cx-dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
        <div className="cx-dialog-heading">
          <div>
            <h2 id="dialog-title">{title}</h2>
            <p>{description}</p>
          </div>
          <button onClick={onClose} aria-label="Fechar">
            <X />
          </button>
        </div>
        {children}
      </section>
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="cx-loading">
      <span className="cx-brand-mark" />
      <strong>Clonex</strong>
      <p>Preparando sua operação…</p>
    </div>
  );
}

export default function ClonexApp() {
  return (
    <AppDataProvider>
      <ClonexWorkspace />
    </AppDataProvider>
  );
}
