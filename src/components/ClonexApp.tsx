/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { loadClonex, g } from "@/lib/clonex-runtime";

type RoleKey = "membro" | "subleader" | "lider";

const ROLES: Record<RoleKey, { label: string; start: string; nav: { key: string; label: string; icon: string }[] }> = {
  membro: {
    label: "Membro",
    start: "inicio",
    nav: [
      { key: "inicio", label: "Início", icon: "home" },
      { key: "gravacoes", label: "Gravações", icon: "camera" },
      { key: "metas_m", label: "Metas", icon: "flag" },
      { key: "equip", label: "Equipam.", icon: "box" },
    ],
  },
  subleader: {
    label: "Sublíder",
    start: "pessoas",
    nav: [
      { key: "pessoas", label: "Pessoas", icon: "users" },
      { key: "kanban", label: "Kanban", icon: "kanban" },
      { key: "equipe_eq", label: "Equip.", icon: "box" },
      { key: "financeiro", label: "R$", icon: "report" },
      { key: "subl_planilha", label: "Planilha", icon: "kanban" },
      { key: "relatorio", label: "Relat.", icon: "report" },
    ],
  },
  lider: {
    label: "Líder Geral",
    start: "cidade",
    nav: [
      { key: "cidade", label: "Cidade", icon: "report" },
      { key: "lider_pessoas", label: "Pessoas", icon: "users" },
      { key: "lider_eq", label: "Equip.", icon: "box" },
      { key: "lider_fin", label: "R$", icon: "report" },
      { key: "lider_planilha", label: "Planilha", icon: "kanban" },
      { key: "lider_contas", label: "Contas", icon: "users" },
      { key: "lider_metricas", label: "Métricas", icon: "bolt" },
    ],
  },
};

function Splash({ done }: { done: () => void }) {
  const [gone, setGone] = React.useState(false);
  React.useEffect(() => {
    const a = setTimeout(() => setGone(true), 1100);
    const b = setTimeout(done, 1650);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, [done]);
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "var(--bg)",
        zIndex: 30,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 18,
        transition: "opacity .5s ease",
        opacity: gone ? 0 : 1,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        <span style={{ width: 26, height: 26, borderRadius: "50%", background: "var(--ink)" }} />
        <div style={{ fontSize: 42, fontWeight: 500, letterSpacing: "-.03em", color: "var(--ink)" }}>Clonex</div>
      </div>
    </div>
  );
}

function PersonDetail({ person, onBack }: { person: any; onBack: () => void }) {
  const C: any = (window as any).ClonexDesignSystem_ca55ab;
  const { Battery, StatTrio, ProgressBar, Card, Icon, PillarDot } = C;
  const ScreenHeader = g("ScreenHeader") as any;
  const SourceButton = g("SourceButton") as any;
  const st: any = (g("useStore") as any)();
  const goal = st.getGoal(person.name);
  const gBtn: React.CSSProperties = {
    width: 38,
    height: 38,
    borderRadius: 10,
    border: "1px solid var(--line)",
    background: "var(--surface)",
    cursor: "pointer",
    fontSize: 19,
    color: "var(--ink)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 1,
    fontFamily: "var(--font-sans)",
  };
  return (
    <div style={{ padding: "0 0 24px" }}>
      <div style={{ padding: "4px 20px 10px" }}>
        <button
          onClick={onBack}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            border: "none",
            background: "none",
            cursor: "pointer",
            color: "var(--muted)",
            fontSize: 14,
            fontWeight: 460,
            padding: 0,
            fontFamily: "var(--font-sans)",
          }}
        >
          <span style={{ transform: "scaleX(-1)", display: "inline-flex" }}>
            <Icon name="chevronRight" size={17} />
          </span>{" "}
          Pessoas
        </button>
      </div>
      <ScreenHeader
        eyebrow={person.status === "ativo" ? "Ativo · leitura" : "Encerrado"}
        title={person.name}
        right={person.pillar ? <PillarDot pillar={person.pillar} withLabel /> : null}
      />
      <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 16 }}>
        <Card variant="white" pad={20}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
            <Battery label="Semana" percent={person.weekPct} doneH={person.weekDone} goalH={person.weekGoal} />
            <Battery
              label="Mês"
              percent={person.monthPct}
              doneH={person.monthDone}
              goalH={person.monthGoal}
              tone={person.monthPct < 60 ? "warn" : "accent"}
            />
          </div>
        </Card>
        <Card pad={18}>
          <StatTrio
            items={[
              { value: person.monthDone + "h", label: "no mês" },
              { value: (person.approval || 0) + "%", label: "aprovação" },
              { value: Math.max(0, 100 - person.monthDone) + "h", label: "falta" },
            ]}
          />
        </Card>
        <Card variant="white" pad={18}>
          <div
            style={{
              fontSize: 11.5,
              fontWeight: 500,
              letterSpacing: ".13em",
              textTransform: "uppercase",
              color: "var(--faint)",
              marginBottom: 4,
            }}
          >
            Meta do mês · você define
          </div>
          <div style={{ fontSize: 12.5, color: "var(--muted)", marginBottom: 14 }}>
            Base da operação é 100h. O membro só visualiza.
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 13.5, color: "var(--muted)" }}>Meta de {person.name.split(" ")[0]}</span>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <button style={gBtn} onClick={() => st.setMemberGoal(person.name, goal - 10)}>
                −
              </button>
              <div style={{ minWidth: 58, textAlign: "center", fontSize: 18, fontWeight: 500, letterSpacing: "-.02em" }}>
                {goal}h
              </div>
              <button style={gBtn} onClick={() => st.setMemberGoal(person.name, goal + 10)}>
                +
              </button>
            </div>
          </div>
        </Card>
        <Card pad={18}>
          <ProgressBar label="Uploads aprovados" value={(person.approval || 0) + "%"} percent={person.approval || 0} />
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}>
            <SourceButton
              payload={{
                title: person.name + " · dados",
                value: person.monthDone + "h no mês",
                origin: "Gravações do Minute + revisão da Clonex",
                updated: "hoje",
                history: [
                  { what: person.monthDone + "h acumuladas no mês", when: "hoje" },
                  { what: (person.approval || 0) + "% de aprovação", when: "hoje" },
                  ...(person.alert ? [{ what: person.alert, when: "recente" }] : []),
                ],
              }}
            />
          </div>
        </Card>
        {person.alert && (
          <div
            style={{
              background: "var(--warn-soft)",
              border: "1px solid var(--warn-line)",
              borderRadius: 14,
              padding: "14px 16px",
              fontSize: 13.5,
              color: "var(--warn-ink)",
            }}
          >
            Atenção: {person.alert}. Vale um contato pra destravar.
          </div>
        )}
        <Card pad={18}>
          <div
            style={{
              fontSize: 11.5,
              fontWeight: 500,
              letterSpacing: ".13em",
              textTransform: "uppercase",
              color: "var(--faint)",
              marginBottom: 14,
            }}
          >
            Documentação e ciclo
          </div>
          {!person.ata && (
            <div
              style={{
                display: "flex",
                gap: 9,
                alignItems: "flex-start",
                background: "var(--warn-soft)",
                border: "1px solid var(--warn-line)",
                borderRadius: 12,
                padding: "11px 13px",
                marginBottom: 12,
              }}
            >
              <span
                style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--warn)", flex: "none", marginTop: 5 }}
              />
              <span style={{ fontSize: 12.5, color: "var(--warn-ink)", lineHeight: 1.45 }}>
                Ata não assinada — a pessoa não deveria estar produzindo dados ainda.
              </span>
            </div>
          )}
          {(
            [
              ["Ata assinada", person.ata ? "Sim · " + person.ataData : "Não"],
              [
                "Aceite digital",
                person.name === "Rafael Diniz" && st.aceiteDigital
                  ? st.aceiteDigital.itens + " decl. · " + st.aceiteDigital.data
                  : person.ata
                    ? "Concluído"
                    : "Pendente",
              ],
              [
                "Docs (ID + foto)",
                person.name === "Rafael Diniz" && st.aceiteDigital
                  ? (st.aceiteDigital.ident ? "ID " : "") + (st.aceiteDigital.foto ? "+ foto" : "") || "pendente"
                  : person.ata
                    ? "enviados"
                    : "pendente",
              ],
              ["Início do ciclo", person.cicloInicio],
              ["Fecha em", person.cicloFecha + " · " + person.cicloDias + " dias"],
              ["Fim de semana", person.fimSemana === 2 ? "Domingo e segunda" : "Sábado e domingo"],
            ] as [string, string][]
          ).map(([k, v], i, a) => (
            <div
              key={k}
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 12,
                padding: "11px 0",
                borderBottom: i < a.length - 1 ? "1px solid var(--line2)" : "none",
              }}
            >
              <span style={{ fontSize: 13.5, color: "var(--muted)" }}>{k}</span>
              <span
                style={{
                  fontSize: 13.5,
                  fontWeight: 460,
                  color: (k === "Ata assinada" && !person.ata) || /Pendente|pendente/.test(v) ? "var(--warn)" : "var(--ink)",
                  textAlign: "right",
                }}
              >
                {v}
              </span>
            </div>
          ))}
          <div style={{ fontSize: 11.5, color: "var(--faint)", marginTop: 10, lineHeight: 1.4 }}>
            A ata reflete o que o membro declarou no app — leitura, você não edita.
          </div>
        </Card>
      </div>
    </div>
  );
}

function Phone() {
  const C: any = (window as any).ClonexDesignSystem_ca55ab;
  const st: any = (g("useStore") as any)();
  const [role, setRole] = React.useState<RoleKey>("subleader");
  const [tab, setTab] = React.useState(ROLES.subleader.start);
  const [splash, setSplash] = React.useState(true);
  const [logged, setLogged] = React.useState(false);
  const [detail, setDetail] = React.useState<any>(null);
  const [source, setSource] = React.useState<any>(null);
  const [register, setRegister] = React.useState(false);
  const [statusFor, setStatusFor] = React.useState<any>(null);
  const [profileOpen, setProfileOpen] = React.useState(false);
  const [guiaOpen, setGuiaOpen] = React.useState(false);
  const [comoOpen, setComoOpen] = React.useState(false);
  const [notifOpen, setNotifOpen] = React.useState(false);
  const [device, setDevice] = React.useState<"mobile" | "desktop">("mobile");

  React.useEffect(() => {
    (g("registerSource") as any)(setSource);
    (window as any).__openStatus = setStatusFor;
    (window as any).__openPerson = setDetail;
  }, []);

  function switchRole(k: RoleKey) {
    setRole(k);
    setTab(ROLES[k].start);
    setDetail(null);
    setSplash(true);
    setLogged(false);
  }

  const S = (name: string) => g(name) as any;
  const StatusBar = S("StatusBar");
  const SourceSheet = S("SourceSheet");
  const RegisterSheet = S("RegisterSheet");
  const StatusSheet = S("StatusSheet");
  const ProfileModal = S("ProfileModal");
  const ProfileButton = S("ProfileButton");
  const NotificacoesSheet = S("NotificacoesSheet");
  const ComoFuncionaSheet = S("ComoFuncionaSheet");
  const GuiaScreen = S("GuiaScreen");
  const LoginGate = S("LoginGate");
  const OnboardingGate = S("OnboardingGate");

  const nav = ROLES[role].nav;
  const roleKey = role;

  let screen: React.ReactNode = null;
  if (detail) screen = <PersonDetail person={detail} onBack={() => setDetail(null)} />;
  else if (tab === "inicio") screen = React.createElement(S("MemberHome"));
  else if (tab === "gravacoes") screen = React.createElement(S("GravacoesScreen"), { onEditStatus: setStatusFor });
  else if (tab === "metas_m") screen = React.createElement(S("MemberGoalsScreen"));
  else if (tab === "equip") screen = React.createElement(S("EquipmentScreen"));
  else if (tab === "pessoas") screen = React.createElement(S("PeoplePanel"), { onOpen: setDetail });
  else if (tab === "kanban") screen = React.createElement(S("KanbanScreen"));
  else if (tab === "equipe_eq") screen = React.createElement(S("TeamEquipScreen"));
  else if (tab === "insights") screen = React.createElement(S("SublInsights"));
  else if (tab === "financeiro") screen = React.createElement(S("FinanceiroScreen"), { role: "subleader" });
  else if (tab === "subl_planilha") screen = React.createElement(S("PlanilhaScreen"), { scope: "subleader" });
  else if (tab === "metas") screen = React.createElement(S("MetasScreen"));
  else if (tab === "relatorio") screen = React.createElement(S("ReportScreen"));
  else if (tab === "cidade") screen = React.createElement(S("LeaderReport"));
  else if (tab === "lider_pessoas") screen = React.createElement(S("LeaderPeople"));
  else if (tab === "lider_eq") screen = React.createElement(S("LeaderEquip"));
  else if (tab === "lider_fin") screen = React.createElement(S("FinanceiroScreen"), { role: "lider" });
  else if (tab === "lider_planilha") screen = React.createElement(S("PlanilhaScreen"));
  else if (tab === "lider_contas") screen = React.createElement(S("GestaoContasScreen"));
  else if (tab === "lider_insights") screen = React.createElement(S("LeaderInsights"));
  else if (tab === "lider_consent") screen = React.createElement(S("LeaderConsent"));
  else if (tab === "lider_metricas") screen = React.createElement(S("LeaderMetrics"));

  const showFab = role === "membro" && (tab === "inicio" || tab === "gravacoes");

  return (
    <div className={"clonex-stage" + (device === "desktop" ? " desktop" : "")}>
      <div className="rolebar">
        {(Object.keys(ROLES) as RoleKey[]).map((k) => (
          <button key={k} className={k === role ? "on" : ""} onClick={() => switchRole(k)}>
            {ROLES[k].label}
          </button>
        ))}
      </div>
      <div className={"phone" + (device === "desktop" ? " desktop" : "")}>
        <div className="notch" />
        {splash && <Splash done={() => setSplash(false)} />}
        {!splash && !logged && (
          <LoginGate role={roleKey} onEnter={() => setLogged(true)} device={device} onDevice={setDevice} />
        )}
        {!splash && logged && role === "membro" && !st.ataAssinada && (
          <OnboardingGate onConfirm={(d: any) => st.confirmAta(d)} />
        )}
        <StatusBar />
        <ProfileButton role={roleKey} onClick={() => setProfileOpen(true)} />
        {!splash && logged && (
          <button
            onClick={() => setNotifOpen(true)}
            aria-label="Notificações"
            style={{
              position: "absolute",
              top: 46,
              right: role === "membro" || roleKey === "subleader" ? 110 : 64,
              zIndex: 26,
              width: 38,
              height: 38,
              borderRadius: "50%",
              border: "1px solid var(--line)",
              background: "var(--surface)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: 18 }}>◉</span>
            <span
              style={{
                position: "absolute",
                top: 7,
                right: 8,
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "var(--warn)",
                border: "1.5px solid var(--surface)",
              }}
            />
          </button>
        )}
        {!splash && logged && (role === "membro" || roleKey === "subleader") && (
          <button
            onClick={() => setComoOpen(true)}
            aria-label="Como funciona"
            style={{
              position: "absolute",
              top: 46,
              right: 64,
              zIndex: 26,
              width: 38,
              height: 38,
              borderRadius: "50%",
              border: "1px solid var(--line)",
              background: "var(--surface)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 4,
              overflow: "hidden",
            }}
          >
            <img src={(window as any).__resources?.ajuda} alt="" style={{ width: 28, height: 28, objectFit: "contain" }} />
          </button>
        )}
        <div className="scroll" key={role + tab + (detail ? detail.name : "")}>
          {screen}
        </div>
        {showFab && (
          <button
            onClick={() => setRegister(true)}
            style={{
              position: "absolute",
              right: 18,
              bottom: 96,
              zIndex: 25,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "14px 20px",
              borderRadius: 999,
              border: "none",
              cursor: "pointer",
              background: "var(--ink)",
              color: "#fff",
              fontFamily: "var(--font-sans)",
              fontSize: 14.5,
              fontWeight: 460,
              letterSpacing: "-.012em",
              boxShadow: "0 8px 22px rgba(20,20,20,.28)",
            }}
          >
            <C.Icon name="plus" size={19} color="#fff" /> Novo registro
          </button>
        )}
        <C.BottomNav
          variant="glass"
          items={nav}
          active={detail ? "pessoas" : tab}
          onSelect={(k: string) => {
            setDetail(null);
            setTab(k);
          }}
        />
        <SourceSheet source={source} onClose={() => setSource(null)} />
        <RegisterSheet open={register} onClose={() => setRegister(false)} />
        <StatusSheet session={statusFor} onClose={() => setStatusFor(null)} />
        <ProfileModal role={roleKey} open={profileOpen} onClose={() => setProfileOpen(false)} onGuia={() => setGuiaOpen(true)} />
        {guiaOpen && <GuiaScreen role={roleKey} onClose={() => setGuiaOpen(false)} />}
        <ComoFuncionaSheet open={comoOpen} onClose={() => setComoOpen(false)} role={roleKey} />
        <NotificacoesSheet open={notifOpen} onClose={() => setNotifOpen(false)} role={roleKey} />
      </div>
    </div>
  );
}

export default function ClonexApp() {
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => {
    let alive = true;
    loadClonex().then(() => alive && setReady(true));
    return () => {
      alive = false;
    };
  }, []);

  if (!ready) {
    return (
      <div className="clonex-stage">
        <div className="phone">
          <div className="notch" />
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
            }}
          >
            <span style={{ width: 26, height: 26, borderRadius: "50%", background: "var(--ink)" }} />
            <div style={{ fontSize: 42, fontWeight: 500, letterSpacing: "-.03em", color: "var(--ink)" }}>Clonex</div>
          </div>
        </div>
      </div>
    );
  }
  return <Phone />;
}
