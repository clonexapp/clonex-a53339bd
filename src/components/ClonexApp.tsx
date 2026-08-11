import { useEffect, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import {
  AlertTriangle,
  Activity,
  BarChart3,
  Bell,
  Camera,
  ChevronRight,
  CircleDollarSign,
  Flag,
  HardHat,
  HelpCircle,
  Lightbulb,
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
import { buildDeviceEmailSequence, clonexDeviceNumber } from "@/lib/device-email";
import { useDialogBehavior } from "@/hooks/use-dialog-behavior";
import { buildOperationalActions, membersForRole } from "@/lib/operations";
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
import { InstallPrompt } from "@/components/clonex/install-prompt";
import { ReportsScreen } from "@/components/clonex/reports-screen";
import {
  CompanyDialog,
  MemberDetailScreen,
  PendingScreen,
  PeopleOperationsScreen,
} from "@/components/clonex/operations-screens";
import { MemberRegistrationDialog, PaymentDialog } from "@/components/clonex/operations-dialogs";
import {
  ActivitiesScreen,
  CaptureDetailPanel,
  ConsentKpis,
  EquipmentDetailPanel,
  InsightsScreen,
  LeaderOverview,
  SupervisorsScreen,
  TeamPanel,
} from "@/components/clonex/management-screens";

type TabKey =
  | "overview"
  | "captures"
  | "goals"
  | "profile"
  | "people"
  | "equipment"
  | "finance"
  | "reports"
  | "pending"
  | "activities"
  | "insights"
  | "supervisors";

const OPERATION_IMAGE_PATHS = [
  "/images/clonex-helmet-3d.png",
  "/images/clonex-phone-3d.png",
  "/images/clonex-company-3d.png",
  "/images/clonex-how-it-works-3d.png",
] as const;

function warmOperationImages() {
  if (typeof window === "undefined") return;
  OPERATION_IMAGE_PATHS.forEach((src) => {
    const image = new Image();
    image.decoding = "async";
    image.src = src;
  });
}

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
    { key: "insights", label: "Insights", icon: Lightbulb },
    { key: "activities", label: "Atividades", icon: Activity },
  ],
  lider: [
    { key: "overview", label: "Visão geral", icon: BarChart3 },
    { key: "people", label: "Pessoas", icon: Users },
    { key: "captures", label: "Capturas", icon: Camera },
    { key: "equipment", label: "Equipamentos", icon: HardHat },
    { key: "finance", label: "Financeiro", icon: CircleDollarSign },
    { key: "reports", label: "Relatórios", icon: ScrollText },
    { key: "activities", label: "Atividades", icon: Activity },
    { key: "pending", label: "Pendências", icon: AlertTriangle },
    { key: "supervisors", label: "Sublíderes", icon: Users },
  ],
};

function ClonexWorkspace() {
  const { data, activeAccount, selectAccount, markNoticesRead, recordAccess, resetDemo } =
    useAppData();
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
  const [selectedCaptureId, setSelectedCaptureId] = useState<string | null>(null);
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<string | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [splashReady, setSplashReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setSplashReady(true), 3000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if ("serviceWorker" in navigator) void navigator.serviceWorker.register("/sw.js");
  }, []);

  useEffect(() => {
    if (role === "membro" && activeAccount?.personId) recordAccess(activeAccount.personId);
  }, [role, activeAccount?.personId, recordAccess]);

  if (!data || !splashReady) return <LoadingScreen />;
  if (!role || !activeAccount)
    return (
      <>
        <AccessScreen
          data={data}
          onEnter={(accountId, nextRole) => {
            warmOperationImages();
            setTab("overview");
            setSelectedPersonId(null);
            selectAccount(accountId);
            setRole(nextRole);
          }}
        />
        <InstallPrompt />
      </>
    );

  const nav = NAVIGATION[role];
  const currentTeam = data.teams.find((team) => team.id === activeAccount.teamId)?.name;
  const mobilePrimaryNav =
    role === "membro"
      ? nav
      : nav.filter(
          (item) =>
            item.key !== "finance" &&
            item.key !== "reports" &&
            item.key !== "pending" &&
            item.key !== "activities" &&
            item.key !== "insights" &&
            item.key !== "supervisors",
        );
  const notices = data.notices.filter((notice) => notice.role === role);
  const operationalActions =
    role === "membro"
      ? []
      : buildOperationalActions(data, membersForRole(data, role, activeAccount.teamId));
  const seenEvents = new Set(
    data.activitySeen.filter((item) => item.role === role).map((item) => item.eventId),
  );
  const activityUnread =
    role === "membro"
      ? 0
      : data.auditEvents.filter(
          (event) =>
            !seenEvents.has(event.id) &&
            (role === "lider" || !event.team || event.team === currentTeam),
        ).length;
  const unread =
    notices.filter((notice) => !notice.read).length + activityUnread + operationalActions.length;

  function switchRole(nextRole: Role) {
    void nextRole;
    setTab("overview");
    setSelectedPersonId(null);
    setRole(null);
    selectAccount(null);
  }

  const screenProps = {
    data,
    role,
    currentPersonId: activeAccount.personId ?? "",
    currentTeam: currentTeam ?? "",
    onAddCapture: () => {
      if (
        activeAccount.personId &&
        data.consentDeclarations.some((item) => item.personId === activeAccount.personId)
      )
        setCaptureOpen(true);
      else
        window.alert(
          "Declare no seu Perfil que o termo foi assinado antes de registrar uma captura.",
        );
    },
    onAddEquipment: () => setEquipmentOpen(true),
    onOpenSource: setMetricSource,
    onOpenEquipment: setSelectedEquipmentId,
    onOpenCapture: setSelectedCaptureId,
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
          <button
            onClick={() => {
              setRole(null);
              selectAccount(null);
            }}
          >
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
          <div className="cx-topbar-actions">
            <button
              className="cx-help-button"
              onClick={() => {
                setNoticesOpen(false);
                setHowOpen(true);
              }}
              aria-label="Abrir Como funciona"
            >
              <HelpCircle size={18} />
              <span>Como funciona</span>
            </button>
            <div className="cx-notice-wrap">
              <button
                className="cx-icon-button"
                aria-label={`${unread} notificações não lidas`}
                onClick={() => {
                  setHowOpen(false);
                  setNoticesOpen((open) => !open);
                  markNoticesRead(role);
                }}
              >
                <Bell size={19} />
                {unread > 0 && <span>{unread}</span>}
              </button>
              {noticesOpen ? (
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
                  {operationalActions.slice(0, 4).map((action) => (
                    <article key={action.id} className={`is-${action.status}`}>
                      <p>
                        <strong>{action.title}</strong>
                        <br />
                        {action.detail}
                      </p>
                      <span>Padrão operacional · {action.team}</span>
                    </article>
                  ))}
                  {role !== "membro" ? (
                    <button
                      className="cx-notice-all"
                      onClick={() => {
                        setNoticesOpen(false);
                        setTab("activities");
                      }}
                    >
                      Ver todas as atividades ({activityUnread} novas)
                    </button>
                  ) : null}
                </div>
              ) : null}
            </div>
            <button
              className="cx-user-chip"
              onClick={() => {
                setNoticesOpen(false);
                setHowOpen(false);
                setSelectedPersonId(null);
                setTab("profile");
              }}
              aria-label="Abrir meu perfil"
            >
              <span>
                {activeAccount.name
                  .split(" ")
                  .map((part) => part[0])
                  .slice(0, 2)
                  .join("")}
              </span>
              <div>
                <strong>{activeAccount.name}</strong>
                <small>{ROLE_LABELS[role]}</small>
              </div>
            </button>
          </div>
        </header>

        <main className="cx-content">
          {tab === "overview" && role !== "lider" && (
            <>
              <OverviewScreen {...screenProps} />
              {role === "subleader" ? (
                <div className="cx-overview-consents">
                  <h2>Consentimentos da equipe</h2>
                  <ConsentKpis
                    data={data}
                    members={data.people.filter(
                      (person) => person.role === "membro" && person.team === currentTeam,
                    )}
                  />
                </div>
              ) : null}
            </>
          )}
          {tab === "overview" && role === "lider" && (
            <LeaderOverview
              data={data}
              onOpenTeam={setSelectedTeam}
              onOpenSource={setMetricSource}
            />
          )}
          {tab === "captures" && <CapturesScreen {...screenProps} />}
          {tab === "goals" && <GoalsScreen {...screenProps} />}
          {selectedPersonId ? (
            <MemberDetailScreen
              data={data}
              personId={selectedPersonId}
              role={role}
              onBack={() => setSelectedPersonId(null)}
              onOpenCapture={setSelectedCaptureId}
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
          {!selectedPersonId && tab === "profile" && role !== "lider" && (
            <MemberDetailScreen
              data={data}
              personId={activeAccount.personId ?? ""}
              role={role}
              onBack={() => setTab("overview")}
              onOpenCapture={setSelectedCaptureId}
            />
          )}
          {!selectedPersonId && tab === "profile" && role === "lider" && (
            <div className="cx-page-stack">
              <button className="cx-back-button" onClick={() => setTab("overview")}>
                Voltar à visão geral
              </button>
              <section className="cx-card cx-account-profile">
                <span className="cx-eyebrow">Meu perfil</span>
                <h1>{activeAccount.name}</h1>
                <p>{activeAccount.email} · Líder geral</p>
              </section>
              <LeaderOverview
                data={data}
                onOpenTeam={setSelectedTeam}
                onOpenSource={setMetricSource}
              />
            </div>
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
          {!selectedPersonId && tab === "insights" && role === "subleader" && (
            <InsightsScreen
              data={data}
              onOpenPerson={(id) => {
                setSelectedPersonId(id);
                setTab("people");
              }}
            />
          )}
          {!selectedPersonId && tab === "activities" && role !== "membro" && (
            <ActivitiesScreen
              data={data}
              role={role}
              onOpenCapture={setSelectedCaptureId}
              onOpenPerson={(id) => {
                setSelectedPersonId(id);
                setTab("people");
              }}
            />
          )}
          {!selectedPersonId && tab === "supervisors" && role === "lider" && (
            <SupervisorsScreen data={data} onOpenTeam={setSelectedTeam} />
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
                tab === "finance" ||
                tab === "reports" ||
                tab === "pending" ||
                tab === "activities" ||
                tab === "insights" ||
                tab === "supervisors"
                  ? "is-active"
                  : ""
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
      {selectedCaptureId ? (
        <CaptureDetailPanel
          data={data}
          captureId={selectedCaptureId}
          onClose={() => setSelectedCaptureId(null)}
        />
      ) : null}
      {selectedEquipmentId ? (
        <EquipmentDetailPanel
          data={data}
          equipmentId={selectedEquipmentId}
          onClose={() => setSelectedEquipmentId(null)}
          onOpenCapture={(id) => {
            setSelectedEquipmentId(null);
            setSelectedCaptureId(id);
          }}
        />
      ) : null}
      {selectedTeam ? (
        <TeamPanel
          data={data}
          teamName={selectedTeam}
          onClose={() => setSelectedTeam(null)}
          onOpenPerson={(id) => {
            setSelectedTeam(null);
            setSelectedPersonId(id);
            setTab("people");
          }}
        />
      ) : null}
    </div>
  );
}

function AccessScreen({
  data,
  onEnter,
}: {
  data: import("@/domain/types").AppData;
  onEnter(accountId: string, role: Role): void;
}) {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
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
        {!selectedRole
          ? roles.map((item) => (
              <button key={item.key} onClick={() => setSelectedRole(item.key)}>
                <span className="cx-role-icon cx-role-icon-3d">
                  <img src={item.image} alt="" loading="eager" />
                </span>
                <span>
                  <strong>{item.title}</strong>
                  <small>{item.description}</small>
                </span>
                <ChevronRight />
              </button>
            ))
          : data.accounts
              .filter((account) => account.role === selectedRole && account.status !== "desativada")
              .map((account) => (
                <button
                  key={account.id}
                  onClick={() => onEnter(account.id, account.role)}
                  className="cx-account-option"
                >
                  <span className="cx-account-avatar">{account.name.slice(0, 1)}</span>
                  <span>
                    <strong>{account.name}</strong>
                    <small>{account.email}</small>
                    <em>
                      {account.status}
                      {account.teamId
                        ? ` · ${data.teams.find((team) => team.id === account.teamId)?.name ?? "Equipe"}`
                        : ""}
                    </em>
                  </span>
                  <ChevronRight />
                </button>
              ))}
      </div>
      {selectedRole ? (
        <button className="cx-access-back" onClick={() => setSelectedRole(null)}>
          ← Voltar aos perfis
        </button>
      ) : null}
      <p className="cx-access-note">Nenhuma senha é necessária nesta versão local.</p>
    </main>
  );
}

function CaptureDialog({ onClose }: { onClose(): void }) {
  const { data, activeAccount, addCapture } = useAppData();
  const personId = activeAccount?.personId;
  const [activity, setActivity] = useState("");
  const [minutes, setMinutes] = useState("30");
  const [equipmentId, setEquipmentId] = useState(
    data?.equipment.find((item) => item.assignedTo === personId)?.id ?? "",
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
      <form className="cx-form cx-equipment-form" onSubmit={submit}>
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
                .filter((item) => item.assignedTo === personId)
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
  const { data, activeAccount, addEquipment } = useAppData();
  const [type, setType] = useState<EquipmentType>("capacete");
  const [model, setModel] = useState("");
  const [owner, setOwner] = useState<"clonex" | "proprio">("clonex");
  const [color, setColor] = useState("Roxo");
  const [size, setSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [firstDeviceNumber, setFirstDeviceNumber] = useState(
    () => Math.max(0, ...(data?.equipment.map((item) => item.deviceNumber ?? 0) ?? [0])) + 1,
  );
  const [firstDeviceEmail, setFirstDeviceEmail] = useState(
    () => `clonex.cel.${firstDeviceNumber}@gmail.com`,
  );
  const [allocations, setAllocations] = useState<
    Array<{ personId?: string; workload: "full_time" | "part_time" }>
  >([{ workload: "full_time" }]);
  const teamName = data?.teams.find((team) => team.id === activeAccount?.teamId)?.name;
  const members =
    data?.people.filter(
      (person) => person.role === "membro" && (role === "lider" || person.team === teamName),
    ) ?? [];
  function changeQuantity(next: number) {
    const safe = Math.min(50, Math.max(1, next));
    setQuantity(safe);
    setAllocations((current) =>
      Array.from({ length: safe }, (_, index) => current[index] ?? { workload: "full_time" }),
    );
  }
  function submit(event: FormEvent) {
    event.preventDefault();
    if (!model.trim()) return;
    const deviceEmails =
      type === "celular" && owner === "clonex"
        ? buildDeviceEmailSequence(firstDeviceEmail, quantity)
        : [];
    if (type === "celular" && owner === "clonex" && !deviceEmails) {
      window.alert(
        quantity > 1
          ? "Para cadastrar um lote, o e-mail precisa terminar com um número antes do @."
          : "Informe um e-mail válido para o celular Clonex.",
      );
      return;
    }
    if (
      deviceEmails?.some((email) =>
        data?.equipment.some((item) => item.deviceEmail?.toLowerCase() === email),
      )
    ) {
      window.alert("A sequência escolhida já contém um e-mail de aparelho cadastrado.");
      return;
    }
    addEquipment(
      {
        type,
        model: model.trim(),
        owner,
        color,
        quantity,
        ...(activeAccount?.teamId ? { teamId: activeAccount.teamId } : {}),
        ...(type === "celular" && owner === "clonex"
          ? {
              firstDeviceNumber,
              firstDeviceEmail: firstDeviceEmail.trim().toLowerCase(),
            }
          : {}),
        allocations,
        ...(type === "capacete" ? { size } : {}),
      },
      role,
    );
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
            <strong>{type === "capacete" ? "Capacete" : "Celular"}</strong>
          </div>
        </div>
        {type === "celular" && owner === "clonex" ? (
          <label>
            E-mail/código do primeiro celular
            <input
              type="email"
              value={firstDeviceEmail}
              onChange={(event) => {
                const email = event.target.value;
                setFirstDeviceEmail(email);
                const number = clonexDeviceNumber(email);
                if (number) setFirstDeviceNumber(number);
              }}
              placeholder="clonex.cel.8@gmail.com"
              required
            />
            <small>O e-mail identifica o aparelho e pode ser corrigido antes do cadastro.</small>
          </label>
        ) : null}
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
        <div className="cx-form-row">
          {type === "capacete" ? (
            <label>
              Tamanho
              <select value={size} onChange={(event) => setSize(event.target.value)}>
                <option>P</option>
                <option>M</option>
                <option>G</option>
                <option>GG</option>
              </select>
            </label>
          ) : null}
          <label>
            Cor
            <input value={color} onChange={(event) => setColor(event.target.value)} required />
          </label>
        </div>
        <div className="cx-quantity-control">
          <span>Quantidade do lote</span>
          <div>
            <button
              type="button"
              onClick={() => changeQuantity(quantity - 1)}
              aria-label="Diminuir quantidade"
            >
              −
            </button>
            <strong>{quantity}</strong>
            <button
              type="button"
              onClick={() => changeQuantity(quantity + 1)}
              aria-label="Aumentar quantidade"
            >
              +
            </button>
          </div>
          <small>Serão criados {quantity} patrimônios individuais.</small>
        </div>
        {type === "celular" && owner === "clonex" ? (
          <div className="cx-device-preview">
            <strong>Contas dos aparelhos</strong>
            {(buildDeviceEmailSequence(firstDeviceEmail, quantity) ?? []).map((email, index) => (
              <span key={email}>
                Celular {index + 1}: {email}
              </span>
            ))}
            {!buildDeviceEmailSequence(firstDeviceEmail, quantity) ? (
              <span>Use um e-mail numerado para gerar a sequência do lote.</span>
            ) : null}
          </div>
        ) : null}
        <div className="cx-batch-allocations">
          <strong>Alocação por unidade</strong>
          {allocations.map((allocation, index) => (
            <div key={index}>
              <span>#{index + 1}</span>
              <select
                value={allocation.personId ?? ""}
                onChange={(event) =>
                  setAllocations((current) =>
                    current.map((item, itemIndex) =>
                      itemIndex === index
                        ? event.target.value
                          ? { ...item, personId: event.target.value }
                          : { workload: item.workload }
                        : item,
                    ),
                  )
                }
              >
                <option value="">Disponível</option>
                {members.map((person) => (
                  <option key={person.id} value={person.id}>
                    {person.name}
                  </option>
                ))}
              </select>
              <select
                value={allocation.workload}
                onChange={(event) =>
                  setAllocations((current) =>
                    current.map((item, itemIndex) =>
                      itemIndex === index
                        ? { ...item, workload: event.target.value as "full_time" | "part_time" }
                        : item,
                    ),
                  )
                }
              >
                <option value="full_time">Full time</option>
                <option value="part_time">Part time</option>
              </select>
            </div>
          ))}
        </div>
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
  const memberSteps = [
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
  const subleaderSteps = [
    [
      "Cadastre o membro",
      "Defina serviço, vínculo, jornada, ciclo, meta, tarifa, equipe e código Minute.",
    ],
    [
      "Entregue o código Minute",
      "O código individual conecta a rotina registrada à pessoa certa, sem login nesta etapa.",
    ],
    ["Aloque equipamentos", "Registre patrimônio, tamanho, cor e regime full ou part time."],
    [
      "Valide e revise",
      "Registre o consentimento por arquivo ou assinatura e revise cada captura pendente.",
    ],
    [
      "Gerencie metas e pagamentos",
      "Acompanhe ritmo, projeção, regra de 10h, risco de 60h e pagamentos sugeridos.",
    ],
  ];
  const leaderSteps = [
    [
      "Acompanhe a cidade",
      "Use o consolidado para horas, metas, consentimentos, jornadas e equipamentos.",
    ],
    ["Compare Sublíderes", "Abra cada equipe para consultar bateria, projeção, riscos e membros."],
    [
      "Garanta governança",
      "Use Atividades para consultar ações e histórico auditado de toda a operação.",
    ],
    [
      "Controle qualidade",
      "Monitore revisões, pendências e a origem de cada indicador dos relatórios.",
    ],
    [
      "Antecipe o fechamento",
      "Use a projeção para atuar antes das regras de 10h, 60h e meta completa.",
    ],
  ];
  const steps =
    role === "membro" ? memberSteps : role === "subleader" ? subleaderSteps : leaderSteps;
  const minuteStepIndex = steps.findIndex(([title, text]) => `${title} ${text}`.includes("Minute"));
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
            <div
              className={
                index === minuteStepIndex ? "cx-how-step-copy has-minute-logo" : "cx-how-step-copy"
              }
            >
              <strong>{title}</strong>
              <p>{text}</p>
              {index === minuteStepIndex ? (
                <img
                  className="cx-minute-logo"
                  src="/images/clonex-minute-logo.png"
                  alt="Logo do aplicativo Minute"
                />
              ) : null}
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
    ...(role === "subleader"
      ? [{ key: "insights" as const, label: "Insights", icon: Lightbulb }]
      : []),
    { key: "activities", label: "Atividades", icon: Activity },
    ...(role === "lider"
      ? [
          { key: "pending" as const, label: "Pendências", icon: AlertTriangle },
          { key: "supervisors" as const, label: "Sublíderes", icon: Users },
        ]
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
  useDialogBehavior(onClose);

  if (typeof document === "undefined") return null;
  return createPortal(
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
    </div>,
    document.body,
  );
}

function LoadingScreen() {
  return (
    <div className="cx-loading">
      <span className="cx-brand-mark" />
      <strong>Clonex</strong>
      <span className="cx-loading-dots" role="status" aria-label="Carregando">
        <i aria-hidden="true" />
        <i aria-hidden="true" />
        <i aria-hidden="true" />
      </span>
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
