import { useEffect, useState, type FormEvent } from "react";
import {
  AlertTriangle,
  BarChart3,
  Bell,
  Camera,
  ChevronRight,
  CircleDollarSign,
  Flag,
  HardHat,
  HelpCircle,
  Home,
  LogOut,
  Menu,
  MoreHorizontal,
  ScrollText,
  RotateCcw,
  Users,
  UserRound,
  X,
} from "lucide-react";

import type { EquipmentType, MetricSource, Role } from "@/domain/types";
import { AppDataProvider } from "@/state/app-data-context";
import { useAppData } from "@/state/use-app-data";
import {
  CapturesScreen,
  EquipmentScreen,
  FinanceScreen,
  GoalsScreen,
  OverviewScreen,
} from "@/components/clonex/screens";
import { MetricSourcePanel } from "@/components/clonex/metric-source-panel";
import { ReportsScreen } from "@/components/clonex/reports-screen";
import {
  CompanyDialog,
  MemberDetailScreen,
  PendingScreen,
  PeopleOperationsScreen,
} from "@/components/clonex/operations-screens";
import { MemberRegistrationDialog, PaymentDialog } from "@/components/clonex/operations-dialogs";

type TabKey =
  | "overview"
  | "captures"
  | "goals"
  | "profile"
  | "people"
  | "equipment"
  | "finance"
  | "reports"
  | "pending";

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
    { key: "profile", label: "Perfil", icon: UserRound },
  ],
  subleader: [
    { key: "overview", label: "Visão geral", icon: BarChart3 },
    { key: "people", label: "Pessoas", icon: Users },
    { key: "captures", label: "Capturas", icon: Camera },
    { key: "equipment", label: "Equipamentos", icon: HardHat },
    { key: "finance", label: "Financeiro", icon: CircleDollarSign },
    { key: "reports", label: "Relatórios", icon: ScrollText },
  ],
  lider: [
    { key: "overview", label: "Visão geral", icon: BarChart3 },
    { key: "people", label: "Pessoas", icon: Users },
    { key: "captures", label: "Capturas", icon: Camera },
    { key: "equipment", label: "Equipamentos", icon: HardHat },
    { key: "finance", label: "Financeiro", icon: CircleDollarSign },
    { key: "reports", label: "Relatórios", icon: ScrollText },
    { key: "pending", label: "Pendências", icon: AlertTriangle },
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
  const [howOpen, setHowOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [metricSource, setMetricSource] = useState<MetricSource | null>(null);
  const [selectedPersonId, setSelectedPersonId] = useState<string | null>(null);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const [memberRegistrationOpen, setMemberRegistrationOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);

  if (!data) return <LoadingScreen />;
  if (!role) return <AccessScreen onEnter={setRole} />;

  const nav = NAVIGATION[role];
  const mobilePrimaryNav =
    role === "membro"
      ? nav
      : nav.filter(
          (item) => item.key !== "finance" && item.key !== "reports" && item.key !== "pending",
        );
  const notices = data.notices.filter((notice) => notice.role === role);
  const unread = notices.filter((notice) => !notice.read).length;

  function switchRole(nextRole: Role) {
    setRole(nextRole);
    setTab("overview");
    setMobileMenu(false);
    setSelectedPersonId(null);
  }

  const screenProps = {
    data,
    role,
    onAddCapture: () => setCaptureOpen(true),
    onAddEquipment: () => setEquipmentOpen(true),
    onOpenSource: setMetricSource,
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
                setSelectedPersonId(null);
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
              className="cx-help-button"
              onClick={() => setHowOpen(true)}
              aria-label="Abrir Como funciona"
            >
              <HelpCircle size={18} />
              <span>Como funciona</span>
            </button>
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
          {selectedPersonId ? (
            <MemberDetailScreen
              data={data}
              personId={selectedPersonId}
              role={role}
              onBack={() => setSelectedPersonId(null)}
            />
          ) : null}
          {!selectedPersonId && tab === "people" && (
            <PeopleOperationsScreen
              data={data}
              role={role}
              onSelectPerson={setSelectedPersonId}
              onSelectCompany={setSelectedCompanyId}
              onAddPerson={() => setMemberRegistrationOpen(true)}
            />
          )}
          {!selectedPersonId && tab === "profile" && (
            <MemberDetailScreen
              data={data}
              personId="p1"
              role={role}
              onBack={() => setTab("overview")}
            />
          )}
          {!selectedPersonId && tab === "equipment" && <EquipmentScreen {...screenProps} />}
          {!selectedPersonId && tab === "finance" && (
            <FinanceScreen {...screenProps} onAddPayment={() => setPaymentOpen(true)} />
          )}
          {!selectedPersonId && tab === "pending" && role === "lider" && (
            <PendingScreen
              data={data}
              onSelectPerson={(id) => {
                setSelectedPersonId(id);
                setTab("people");
              }}
            />
          )}
          {!selectedPersonId && tab === "reports" && role !== "membro" && (
            <ReportsScreen data={data} role={role} onOpenSource={setMetricSource} />
          )}
        </main>

        <nav className="cx-bottom-nav" aria-label="Navegação móvel">
          {mobilePrimaryNav.map((item) => (
            <button
              key={item.key}
              className={tab === item.key ? "is-active" : ""}
              onClick={() => {
                setTab(item.key);
                setSelectedPersonId(null);
              }}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
          {role !== "membro" ? (
            <button
              className={
                tab === "finance" || tab === "reports" || tab === "pending" ? "is-active" : ""
              }
              onClick={() => setMoreOpen(true)}
            >
              <MoreHorizontal size={20} />
              <span>Mais</span>
            </button>
          ) : null}
        </nav>
      </div>

      {captureOpen && <CaptureDialog onClose={() => setCaptureOpen(false)} />}
      {equipmentOpen && <EquipmentDialog role={role} onClose={() => setEquipmentOpen(false)} />}
      {howOpen && <HowItWorksDialog role={role} onClose={() => setHowOpen(false)} />}
      {moreOpen && (
        <MoreDialog
          role={role}
          activeTab={tab}
          onSelect={(nextTab) => {
            setTab(nextTab);
            setSelectedPersonId(null);
            setMoreOpen(false);
          }}
          onClose={() => setMoreOpen(false)}
        />
      )}
      {metricSource && (
        <MetricSourcePanel
          source={metricSource}
          data={data}
          onClose={() => setMetricSource(null)}
        />
      )}
      {selectedCompanyId ? (
        <CompanyDialog
          data={data}
          companyId={selectedCompanyId}
          onClose={() => setSelectedCompanyId(null)}
          onSelectPerson={(id) => {
            setSelectedCompanyId(null);
            setSelectedPersonId(id);
          }}
        />
      ) : null}
      {memberRegistrationOpen ? (
        <MemberRegistrationDialog role={role} onClose={() => setMemberRegistrationOpen(false)} />
      ) : null}
      {paymentOpen ? <PaymentDialog role={role} onClose={() => setPaymentOpen(false)} /> : null}
    </div>
  );
}

function AccessScreen({ onEnter }: { onEnter(role: Role): void }) {
  const roles: { key: Role; title: string; description: string; image: string }[] = [
    {
      key: "membro",
      title: "Membro",
      description: "Registre capturas, acompanhe metas e equipamentos.",
      image: "/images/clonex-member-access-3d.png",
    },
    {
      key: "subleader",
      title: "Sublíder",
      description: "Gerencie pessoas, revise capturas e acompanhe a equipe.",
      image: "/images/clonex-subleader-access-3d.png",
    },
    {
      key: "lider",
      title: "Líder geral",
      description: "Visualize toda a operação, inventário e financeiro.",
      image: "/images/clonex-leader-access-3d.png",
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
            <span className="cx-role-icon cx-role-icon-3d">
              <img src={item.image} alt="" loading="eager" />
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

function EquipmentDialog({ role, onClose }: { role: Role; onClose(): void }) {
  const { addEquipment } = useAppData();
  const [type, setType] = useState<EquipmentType>("capacete");
  const [model, setModel] = useState("");
  const [owner, setOwner] = useState<"clonex" | "proprio">("clonex");
  function submit(event: FormEvent) {
    event.preventDefault();
    if (!model.trim()) return;
    addEquipment({ type, model: model.trim(), owner }, role);
    onClose();
  }
  return (
    <Dialog
      title="Cadastrar equipamento"
      description="O item ficará disponível no inventário local."
      onClose={onClose}
    >
      <form className="cx-form" onSubmit={submit}>
        <div className="cx-equipment-dialog-art" aria-hidden="true">
          <img
            src={
              type === "capacete" ? "/images/clonex-helmet-3d.png" : "/images/clonex-phone-3d.png"
            }
            alt=""
          />
          <div>
            <span className="cx-eyebrow">Visualização 3D</span>
            <strong>{type === "capacete" ? "Capacete" : "Celular"}</strong>
          </div>
        </div>
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

function HowItWorksDialog({ role, onClose }: { role: Role; onClose(): void }) {
  const steps = [
    [
      "Crie sua conta no Minute",
      "Use o email fornecido pelo responsável Clonex. A gravação acontece no Minute Data.",
    ],
    [
      "Grave em blocos de 30 minutos",
      "Continue trabalhando normalmente; o Minute divide e envia os blocos automaticamente.",
    ],
    [
      "Confira a sincronização",
      "Ao terminar, finalize no Minute e confirme que a gravação foi enviada.",
    ],
    [
      "Registre no Clonex",
      "Informe atividade, duração e equipamento para ligar o registro à operação.",
    ],
    [
      "Acompanhe a revisão",
      role === "membro"
        ? "Suas horas, qualidade e previsão são atualizadas a partir do que foi registrado."
        : "Os indicadores da equipe são recalculados e cada número mantém sua origem e histórico.",
    ],
  ];
  return (
    <Dialog
      title="Como funciona"
      description="Do Minute ao relatório do Clonex, passo a passo."
      onClose={onClose}
    >
      <div className="cx-how-hero">
        <img
          src="/images/clonex-how-it-works-3d.png"
          alt="Mãos utilizando um celular para registrar uma atividade"
        />
        <div>
          <span className="cx-eyebrow">Fluxo de captura</span>
          <strong>Grave, registre e acompanhe.</strong>
        </div>
      </div>
      <ol className="cx-how-steps">
        {steps.map(([title, text], index) => (
          <li key={title}>
            <span>{index + 1}</span>
            <div>
              <strong>{title}</strong>
              <p>{text}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="cx-how-tip">
        Ao completar 30 minutos, não pare: o Minute separa e envia o bloco sozinho.
      </div>
    </Dialog>
  );
}

function MoreDialog({
  role,
  activeTab,
  onSelect,
  onClose,
}: {
  role: Role;
  activeTab: TabKey;
  onSelect(tab: TabKey): void;
  onClose(): void;
}) {
  const items: NavItem[] = [
    { key: "finance", label: "Financeiro", icon: CircleDollarSign },
    { key: "reports", label: "Relatórios", icon: ScrollText },
    ...(role === "lider"
      ? [{ key: "pending" as const, label: "Pendências", icon: AlertTriangle }]
      : []),
  ];
  return (
    <Dialog
      title="Mais áreas"
      description="Acesse financeiro, relatórios e prioridades."
      onClose={onClose}
    >
      <div className="cx-more-grid">
        {items.map((item) => (
          <button
            key={item.key}
            className={activeTab === item.key ? "is-active" : ""}
            onClick={() => onSelect(item.key)}
          >
            <item.icon size={22} />
            <span>
              <strong>{item.label}</strong>
              <small>
                {item.key === "reports"
                  ? "Quantidade, previsibilidade e qualidade"
                  : item.key === "pending"
                    ? "Ações, riscos e alertas importantes"
                    : "Pagamentos realizados e previstos"}
              </small>
            </span>
            <ChevronRight size={17} />
          </button>
        ))}
      </div>
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
  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

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
