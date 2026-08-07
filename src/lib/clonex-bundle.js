/* @ds-bundle: {"format":4,"namespace":"ClonexDesignSystem_ca55ab","components":[{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"Pill","sourcePath":"components/core/Pill.jsx"},{"name":"NudgeBanner","sourcePath":"components/feedback/NudgeBanner.jsx"},{"name":"KanbanCard","sourcePath":"components/kanban/KanbanCard.jsx"},{"name":"BottomNav","sourcePath":"components/navigation/BottomNav.jsx"},{"name":"PersonCard","sourcePath":"components/people/PersonCard.jsx"},{"name":"PillarDot","sourcePath":"components/people/PillarDot.jsx"},{"name":"StatTrio","sourcePath":"components/people/StatTrio.jsx"},{"name":"Battery","sourcePath":"components/progress/Battery.jsx"},{"name":"ProgressBar","sourcePath":"components/progress/ProgressBar.jsx"}],"sourceHashes":{"components/core/Button.jsx":"06fe74831a1d","components/core/Card.jsx":"8117b4794441","components/core/Icon.jsx":"32b38e9e0567","components/core/Pill.jsx":"31bf90cd4580","components/feedback/NudgeBanner.jsx":"2be9a6b0dac2","components/kanban/KanbanCard.jsx":"2e5da79ee0e2","components/navigation/BottomNav.jsx":"64cf9bfb08f4","components/people/PersonCard.jsx":"22c36296d693","components/people/PillarDot.jsx":"76546e704f14","components/people/StatTrio.jsx":"5e32af41bc42","components/progress/Battery.jsx":"9aed3d8bd506","components/progress/ProgressBar.jsx":"7fd691cb00b0","ui_kits/clonex_app/Insights.jsx":"aebb71afdde2","ui_kits/clonex_app/KanbanScreen.jsx":"0a3201f85567","ui_kits/clonex_app/LeaderExtra.jsx":"4cacdf2de2c3","ui_kits/clonex_app/LeaderScreens.jsx":"3772f90986e2","ui_kits/clonex_app/MemberFlows.jsx":"39681165d7eb","ui_kits/clonex_app/MemberHome.jsx":"e3c12b0cfeaf","ui_kits/clonex_app/MetasScreen.jsx":"3e7cb7362cb6","ui_kits/clonex_app/PeoplePanel.jsx":"a57cc7e0ae66","ui_kits/clonex_app/ReportScreen.jsx":"61267c0aef38","ui_kits/clonex_app/Shell.jsx":"69e62099ccc3"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.ClonexDesignSystem_ca55ab = window.ClonexDesignSystem_ca55ab || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Clonex button — pill-shaped. Primary = ink fill/white text; ghost = hairline
   border; light = white fill (for dark sections). Lifts 1px on hover. */
function Button({
  children,
  variant = "primary",
  size = "md",
  full = false,
  as = "button",
  style,
  ...rest
}) {
  const sizes = {
    md: {
      padding: "13px 24px",
      fontSize: 15
    },
    sm: {
      padding: "10px 19px",
      fontSize: 14
    }
  };
  const variants = {
    primary: {
      background: "var(--ink)",
      color: "#fff",
      borderColor: "var(--ink)"
    },
    ghost: {
      background: "transparent",
      color: "var(--ink)",
      borderColor: "var(--line)"
    },
    light: {
      background: "#fff",
      color: "var(--ink)",
      borderColor: "transparent"
    }
  };
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: {
      display: full ? "flex" : "inline-flex",
      width: full ? "100%" : undefined,
      alignItems: "center",
      justifyContent: "center",
      gap: 9,
      borderRadius: "var(--r-pill)",
      border: "1px solid",
      fontFamily: "var(--font-sans)",
      fontWeight: "var(--w-cta)",
      letterSpacing: "-.012em",
      cursor: "pointer",
      whiteSpace: "nowrap",
      transition: "transform var(--dur-fast) var(--ease), box-shadow var(--dur-fast) var(--ease)",
      ...sizes[size],
      ...variants[variant],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Clonex card — the core surface container. neutral = warm grey fill;
   white = raised surface with a slightly stronger hairline. */
function Card({
  children,
  variant = "neutral",
  pad = 28,
  style,
  ...rest
}) {
  const variants = {
    neutral: {
      background: "var(--card)",
      borderColor: "var(--line2)"
    },
    white: {
      background: "var(--surface)",
      borderColor: "var(--line)"
    }
  };
  const v = variants[variant] || variants.neutral;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: v.background,
      border: `1px solid ${v.borderColor}`,
      borderRadius: "var(--r)",
      padding: pad,
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Lucide-style outline icons (SUBSTITUTION: the Clonex site ships no icon set —
   it uses text glyphs. These outline paths approximate Lucide at stroke ~1.8.
   Flagged in readme ICONOGRAPHY.) */
const PATHS = {
  home: "M3 10.5 12 3l9 7.5M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5",
  users: "M16 20v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1M9.5 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M21 20v-1a4 4 0 0 0-3-3.87M15.5 4.13a4 4 0 0 1 0 7.75",
  kanban: "M4 4h4v12H4zM10 4h4v8h-4zM16 4h4v10h-4M4 4v16M10 4v16M16 4v16",
  report: "M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5M9 13h6M9 17h6M9 9h1",
  search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM21 21l-4.3-4.3",
  chevronRight: "M9 6l6 6-6 6",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 7v5l3 2",
  camera: "M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1ZM12 16.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  bolt: "M13 3 4 14h6l-1 7 9-11h-6z",
  plus: "M12 5v14M5 12h14",
  filter: "M3 5h18l-7 8v6l-4-2v-4z",
  info: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 11v5M12 7.6h.01",
  list: "M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01",
  columns: "M4 4h16v16H4zM10 4v16M16 4v16",
  flag: "M5 21V4M5 4h12l-2.2 4L17 12H5",
  history: "M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 8v4l3 2",
  check: "M4 12.5 9 17.5 20 6.5",
  x: "M6 6l12 12M18 6 6 18",
  edit: "M4 20h4L18.5 9.5a2.1 2.1 0 0 0-3-3L5 17v3ZM14 6.5l3 3",
  box: "M21 8 12 3 3 8v8l9 5 9-5zM3 8l9 5 9-5M12 13v8",
  phone: "M7 3h10a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1ZM11 18h2"
};
function Icon({
  name,
  size = 24,
  stroke = 1.8,
  color = "currentColor",
  fill = "none",
  style,
  ...rest
}) {
  const d = PATHS[name] || "";
  return /*#__PURE__*/React.createElement("svg", _extends({
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: fill,
    stroke: color,
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      display: "block",
      flex: "none",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("path", {
    d: d
  }));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/Pill.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Clonex pill — small rounded tag with a leading dot. accent variant tints
   purple; used for filters, statuses, feature tags. */
function Pill({
  children,
  variant = "neutral",
  dot = true,
  style,
  ...rest
}) {
  const variants = {
    neutral: {
      background: "var(--card)",
      borderColor: "var(--line2)",
      color: "var(--ink2)",
      dot: "var(--ink)"
    },
    accent: {
      background: "var(--accent-soft)",
      borderColor: "var(--accent-line)",
      color: "var(--accent-ink)",
      dot: "var(--accent)"
    },
    warn: {
      background: "var(--warn-soft)",
      borderColor: "var(--warn-line)",
      color: "var(--warn-ink)",
      dot: "var(--warn)"
    }
  };
  const v = variants[variant] || variants.neutral;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 7,
      background: v.background,
      border: `1px solid ${v.borderColor}`,
      borderRadius: "var(--r-pill)",
      padding: "8px 15px",
      fontFamily: "var(--font-sans)",
      fontSize: 13.5,
      fontWeight: "var(--w-medium)",
      color: v.color,
      whiteSpace: "nowrap",
      ...style
    }
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: v.dot,
      flex: "none"
    }
  }), children);
}
Object.assign(__ds_scope, { Pill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Pill.jsx", error: String((e && e.message) || e) }); }

// components/feedback/NudgeBanner.jsx
try { (() => {
/* Clonex nudge banner — the forecast prompt. Soft accent background when the
   person is on pace, soft warn when behind. Leading dot, direct second-person
   text ending in a clear action. */
function NudgeBanner({
  children,
  tone = "accent",
  style
}) {
  const tones = {
    accent: {
      bg: "var(--accent-soft)",
      border: "var(--accent-line)",
      color: "var(--accent-ink)",
      dot: "var(--accent)"
    },
    warn: {
      bg: "var(--warn-soft)",
      border: "var(--warn-line)",
      color: "var(--warn-ink)",
      dot: "var(--warn)"
    }
  };
  const t = tones[tone] || tones.accent;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 11,
      alignItems: "flex-start",
      background: t.bg,
      border: `1px solid ${t.border}`,
      borderRadius: "var(--r-sm)",
      padding: "15px 17px",
      fontFamily: "var(--font-sans)",
      fontSize: 14.2,
      lineHeight: 1.5,
      color: t.color,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: "50%",
      background: t.dot,
      flex: "none",
      marginTop: 6
    }
  }), /*#__PURE__*/React.createElement("div", null, children));
}
Object.assign(__ds_scope, { NudgeBanner });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/NudgeBanner.jsx", error: String((e && e.message) || e) }); }

// components/navigation/BottomNav.jsx
try { (() => {
/* Clonex bottom nav — fixed iOS-style tab bar.
   - variant="flat" (default): active item ink label + accent icon; inactive faint.
     Blurred translucent bg over --bg, hairline top border.
   - variant="glass": soft top-lit "liquid glass" — each tab is a raised frosted
     pebble with a light top rim + gentle shadow; the active pebble sits brighter
     and higher, icon/label in accent. Item set varies per role. */
function BottomNav({
  items = [],
  active,
  onSelect,
  variant = "flat",
  style
}) {
  if (variant === "glass") return /*#__PURE__*/React.createElement(GlassNav, {
    items: items,
    active: active,
    onSelect: onSelect,
    style: style
  });
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "stretch",
      padding: "9px 8px calc(9px + env(safe-area-inset-bottom, 6px))",
      background: "rgba(251,251,249,.82)",
      backdropFilter: "blur(18px)",
      WebkitBackdropFilter: "blur(18px)",
      borderTop: "1px solid var(--line)",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, items.map(it => {
    const on = it.key === active;
    return /*#__PURE__*/React.createElement("button", {
      key: it.key,
      onClick: () => onSelect && onSelect(it.key),
      style: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "4px 2px"
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: it.icon,
      size: 23,
      stroke: 1.8,
      color: on ? "var(--accent)" : "var(--faint)"
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10.5,
        fontWeight: on ? "var(--w-h4)" : "var(--w-medium)",
        letterSpacing: "-.01em",
        color: on ? "var(--ink)" : "var(--faint)"
      }
    }, it.label));
  }));
}
function GlassNav({
  items,
  active,
  onSelect,
  style
}) {
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      gap: 8,
      alignItems: "stretch",
      padding: "10px 12px calc(12px + env(safe-area-inset-bottom, 6px))",
      background: "linear-gradient(180deg, rgba(238,238,234,.78), rgba(222,222,217,.72))",
      backdropFilter: "blur(20px) saturate(1.4)",
      WebkitBackdropFilter: "blur(20px) saturate(1.4)",
      borderTop: "1px solid rgba(255,255,255,.65)",
      boxShadow: "inset 0 1px 0 rgba(255,255,255,.6)",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, items.map(it => {
    const on = it.key === active;
    return /*#__PURE__*/React.createElement("button", {
      key: it.key,
      onClick: () => onSelect && onSelect(it.key),
      style: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
        cursor: "pointer",
        padding: "10px 4px 8px",
        borderRadius: 18,
        border: "1px solid",
        borderColor: on ? "rgba(255,255,255,.85)" : "rgba(255,255,255,.4)",
        background: on ? "linear-gradient(180deg, rgba(255,255,255,.9), rgba(255,255,255,.4))" : "linear-gradient(180deg, rgba(255,255,255,.42), rgba(255,255,255,.12))",
        boxShadow: on ? "inset 0 1px 1px rgba(255,255,255,.95), inset 0 -2px 3px rgba(120,120,120,.18), 0 6px 14px rgba(30,30,35,.16), 0 1px 2px rgba(30,30,35,.12)" : "inset 0 1px 1px rgba(255,255,255,.7), inset 0 -1px 2px rgba(120,120,120,.12), 0 1px 2px rgba(30,30,35,.06)",
        transition: "all var(--dur-fast) var(--ease)"
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: it.icon,
      size: 23,
      stroke: 1.9,
      color: on ? "var(--accent)" : "#4A4A46",
      style: {
        filter: on ? "drop-shadow(0 1px 1px rgba(255,255,255,.7))" : "drop-shadow(0 1px 1px rgba(255,255,255,.55))"
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10.5,
        fontWeight: on ? "var(--w-h4)" : "var(--w-medium)",
        letterSpacing: "-.01em",
        color: on ? "var(--ink)" : "#4A4A46",
        textShadow: "0 1px 0 rgba(255,255,255,.6)"
      }
    }, it.label));
  }));
}
Object.assign(__ds_scope, { BottomNav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/BottomNav.jsx", error: String((e && e.message) || e) }); }

// components/people/PillarDot.jsx
try { (() => {
const PILLARS = {
  quantity: {
    color: "var(--pillar-quantity)",
    label: "Quantidade"
  },
  predict: {
    color: "var(--pillar-predict)",
    label: "Previsibilidade"
  },
  quality: {
    color: "var(--pillar-quality)",
    label: "Qualidade"
  }
};

/* Clonex pillar dot — a colored dot flagging which of the three pillars has a
   problem. coral = Quantidade, teal = Previsibilidade, roxo = Qualidade.
   Renders nothing unless a pillar is given. */
function PillarDot({
  pillar,
  size = 8,
  withLabel = false,
  style
}) {
  const p = PILLARS[pillar];
  if (!p) return null;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: size,
      height: size,
      borderRadius: "50%",
      background: p.color,
      flex: "none"
    }
  }), withLabel && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 12,
      color: "var(--muted)"
    }
  }, p.label));
}
Object.assign(__ds_scope, { PillarDot });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/people/PillarDot.jsx", error: String((e && e.message) || e) }); }

// components/kanban/KanbanCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Clonex kanban card — a draggable lead/person card in the prospecção funnel.
   Name, a sub line (trade/region), and optional tags. */
function KanbanCard({
  name,
  sub,
  tags = [],
  pillar,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: "var(--surface)",
      border: "1px solid var(--line)",
      borderRadius: "var(--r-sm)",
      padding: "13px 14px",
      fontFamily: "var(--font-sans)",
      boxShadow: "0 1px 2px rgba(20,20,20,.04)",
      cursor: "grab",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 7
    }
  }, pillar && /*#__PURE__*/React.createElement(__ds_scope.PillarDot, {
    pillar: pillar,
    size: 7
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14.5,
      fontWeight: "var(--w-h4)",
      letterSpacing: "-.018em",
      color: "var(--ink)"
    }
  }, name)), sub && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4,
      fontSize: 12.5,
      color: "var(--muted)"
    }
  }, sub), tags.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 5,
      marginTop: 10
    }
  }, tags.map((t, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      fontSize: 11,
      fontWeight: "var(--w-medium)",
      color: "var(--ink2)",
      background: "var(--card)",
      border: "1px solid var(--line2)",
      borderRadius: "var(--r-pill)",
      padding: "3px 9px"
    }
  }, t))));
}
Object.assign(__ds_scope, { KanbanCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/kanban/KanbanCard.jsx", error: String((e && e.message) || e) }); }

// components/people/StatTrio.jsx
try { (() => {
/* Clonex stat trio — the quick-stats row used under the batteries (horas hoje /
   média por dia / falta pra meta). Big number, small label, divided by hairlines. */
function StatTrio({
  items = [],
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: `repeat(${items.length}, 1fr)`,
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      padding: "0 14px",
      textAlign: "center",
      borderLeft: i === 0 ? "none" : "1px solid var(--line)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--fs-metric)",
      fontWeight: "var(--w-brand)",
      letterSpacing: "var(--track-metric)",
      lineHeight: 1,
      color: "var(--ink)"
    }
  }, it.value), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6,
      fontSize: 11.5,
      color: "var(--faint)",
      lineHeight: 1.3
    }
  }, it.label))));
}
Object.assign(__ds_scope, { StatTrio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/people/StatTrio.jsx", error: String((e && e.message) || e) }); }

// components/progress/Battery.jsx
try { (() => {
/* Clonex battery — the signature progress component. A horizontal rectangle
   with an ink border and a terminal pin on the right; the interior fills with
   accent proportional to `percent`. Big percentage below + "Xh de Yh" subtitle.
   compact = small inline version used inside person cards. */
function Battery({
  percent = 0,
  label,
  doneH,
  goalH,
  compact = false,
  tone = "accent",
  style
}) {
  const p = Math.max(0, Math.min(100, percent));
  const fill = tone === "warn" ? "var(--warn)" : "var(--accent)";
  const cellH = compact ? 14 : 34;
  const cellW = compact ? 46 : "100%";
  const pinH = compact ? 6 : 14;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: compact ? 10 : "var(--fs-eyebrow)",
      fontWeight: "var(--w-eyebrow)",
      letterSpacing: "var(--track-eyebrow)",
      textTransform: "uppercase",
      color: "var(--faint)",
      marginBottom: compact ? 6 : 12
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: compact ? 3 : 5
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: cellW,
      height: cellH,
      flex: compact ? "none" : 1,
      border: `${compact ? 1.5 : 2}px solid var(--ink)`,
      borderRadius: compact ? 4 : 7,
      padding: compact ? 1.5 : 3,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${p}%`,
      height: "100%",
      background: fill,
      borderRadius: compact ? 2 : 4,
      transition: "width var(--dur-fill) var(--ease-out)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      width: compact ? 3 : 5,
      height: pinH,
      background: "var(--ink)",
      borderRadius: 2,
      flex: "none"
    }
  })), !compact && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--fs-metric-lg)",
      fontWeight: "var(--w-brand)",
      letterSpacing: "var(--track-metric)",
      lineHeight: 1,
      color: "var(--ink)"
    }
  }, p, "%"), doneH != null && goalH != null && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6,
      fontSize: 13,
      color: "var(--muted)"
    }
  }, doneH, "h de ", goalH, "h")), compact && doneH != null && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 5,
      fontSize: 12,
      color: "var(--muted)",
      display: "flex",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: "var(--w-h4)",
      color: "var(--ink)"
    }
  }, p, "%"), goalH != null && /*#__PURE__*/React.createElement("span", null, doneH, "/", goalH, "h")));
}
Object.assign(__ds_scope, { Battery });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/progress/Battery.jsx", error: String((e && e.message) || e) }); }

// components/people/PersonCard.jsx
try { (() => {
/* Clonex person card — one row in the sublíder's Pessoas panel. Name + status,
   compact week/month batteries, approval %, a pillar dot if there's a problem,
   and a short alert line ("parado há 4 dias"). Tap opens the person's detail. */
function PersonCard({
  name,
  status = "ativo",
  weekPct = 0,
  monthPct = 0,
  weekDone,
  weekGoal,
  monthDone,
  monthGoal,
  approval,
  pillar,
  alert,
  onClick,
  style
}) {
  const behind = monthPct < 60;
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      display: "block",
      width: "100%",
      textAlign: "left",
      cursor: "pointer",
      background: "var(--surface)",
      border: "1px solid var(--line)",
      borderRadius: "var(--r-sm)",
      padding: 16,
      fontFamily: "var(--font-sans)",
      transition: "transform var(--dur-fast) var(--ease)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15.5,
      fontWeight: "var(--w-h4)",
      letterSpacing: "-.018em",
      color: "var(--ink)"
    }
  }, name), pillar && /*#__PURE__*/React.createElement(__ds_scope.PillarDot, {
    pillar: pillar,
    size: 7
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto",
      fontSize: 11,
      fontWeight: "var(--w-label)",
      letterSpacing: ".04em",
      textTransform: "uppercase",
      padding: "3px 9px",
      borderRadius: "var(--r-pill)",
      background: status === "ativo" ? "var(--card)" : "var(--warn-soft)",
      color: status === "ativo" ? "var(--muted)" : "var(--warn-ink)"
    }
  }, status)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 16,
      marginBottom: alert ? 12 : 0
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Battery, {
    compact: true,
    label: "Semana",
    percent: weekPct,
    doneH: weekDone,
    goalH: weekGoal
  }), /*#__PURE__*/React.createElement(__ds_scope.Battery, {
    compact: true,
    label: "M\xEAs",
    percent: monthPct,
    doneH: monthDone,
    goalH: monthGoal,
    tone: behind ? "warn" : "accent"
  })), (approval != null || alert) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginTop: 12
    }
  }, approval != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: "var(--muted)"
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--ink)",
      fontWeight: "var(--w-h4)"
    }
  }, approval, "%"), " aprova\xE7\xE3o"), alert && /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto",
      fontSize: 12,
      fontWeight: "var(--w-medium)",
      color: "var(--warn-ink)",
      background: "var(--warn-soft)",
      padding: "3px 10px",
      borderRadius: "var(--r-pill)"
    }
  }, alert)));
}
Object.assign(__ds_scope, { PersonCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/people/PersonCard.jsx", error: String((e && e.message) || e) }); }

// components/progress/ProgressBar.jsx
try { (() => {
/* Clonex thin progress bar — a fully-round pill track with an accent fill.
   Used for "uploads aprovados" (approved vs recorded) and other ratios. */
function ProgressBar({
  percent = 0,
  label,
  value,
  tone = "accent",
  height = 8,
  style
}) {
  const p = Math.max(0, Math.min(100, percent));
  const fill = tone === "warn" ? "var(--warn)" : "var(--accent)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, (label || value) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      marginBottom: 9
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13.5,
      color: "var(--muted)"
    }
  }, label), value && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13.5,
      fontWeight: "var(--w-h4)",
      color: "var(--ink)",
      letterSpacing: "var(--track-metric)"
    }
  }, value)), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      height,
      background: "var(--track-progress)",
      borderRadius: "var(--r-pill)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${p}%`,
      height: "100%",
      background: fill,
      borderRadius: "var(--r-pill)",
      transition: "width var(--dur-fill) var(--ease-out)"
    }
  })));
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/progress/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/clonex_app/Insights.jsx
try { (() => {
// Clonex JF — Insights. Avisos, lembretes, alertas e previsões derivados dos
// dados reais (registros, equipamentos, metas e prazos) — pro sublíder e pro
// líder geral. Tudo reativo ao que já existe no app.
const CI = window.ClonexDesignSystem_ca55ab;
const DIAS_RESTANTES = 9; // dias úteis restantes no mês (demo)

function InsightCard({
  tone = "neutral",
  kind,
  title,
  body,
  meta
}) {
  const tones = {
    warn: {
      bg: "var(--warn-soft)",
      line: "var(--warn-line)",
      dot: "var(--warn)",
      ink: "var(--warn-ink)"
    },
    accent: {
      bg: "var(--accent-soft)",
      line: "var(--accent-line)",
      dot: "var(--accent)",
      ink: "var(--accent-ink)"
    },
    neutral: {
      bg: "var(--surface)",
      line: "var(--line)",
      dot: "var(--faint)",
      ink: "var(--muted)"
    }
  };
  const t = tones[tone];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      background: t.bg,
      border: "1px solid " + t.line,
      borderRadius: "var(--r-sm)",
      padding: "14px 15px",
      fontFamily: "var(--font-sans)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: t.dot,
      flex: "none",
      marginTop: 6
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 3
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10.5,
      fontWeight: 500,
      letterSpacing: ".1em",
      textTransform: "uppercase",
      color: t.ink
    }
  }, kind), meta && /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto",
      fontSize: 11.5,
      color: "var(--faint)"
    }
  }, meta)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14.5,
      fontWeight: 460,
      color: "var(--ink)",
      letterSpacing: "-.012em"
    }
  }, title), body && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "var(--muted)",
      marginTop: 4,
      lineHeight: 1.45
    }
  }, body)));
}
function Group({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      fontWeight: 500,
      letterSpacing: ".13em",
      textTransform: "uppercase",
      color: "var(--faint)",
      margin: "4px 2px 10px"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, children));
}

// ---- Sublíder -------------------------------------------------------------
function SublInsights() {
  const ppl = (window.CLONEX_PEOPLE || []).filter(p => p.status === "ativo");
  const atrasados = ppl.filter(p => p.monthPct < 60);
  const parados = ppl.filter(p => p.alert && p.alert.includes("parado"));
  const baixaQ = ppl.filter(p => p.approval < 75);
  const totalH = ppl.reduce((s, p) => s + p.monthDone, 0);
  const metaEq = 600;
  const ritmoDia = (totalH / 21).toFixed(1);
  const projecao = Math.round(totalH + totalH / 21 * DIAS_RESTANTES);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 0 96px"
    }
  }, /*#__PURE__*/React.createElement(ScreenHeader, {
    eyebrow: "Minha equipe \xB7 JF",
    title: "Insights"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 20px",
      display: "flex",
      flexDirection: "column",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      margin: "-6px 0 -4px",
      fontSize: 11.5,
      color: "var(--faint)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "var(--pillar-predict)"
    }
  }), " Gerado dos registros da equipe \xB7 h\xE1 poucos segundos"), /*#__PURE__*/React.createElement(Group, {
    label: "Alertas"
  }, parados.map(p => /*#__PURE__*/React.createElement(InsightCard, {
    key: p.name,
    tone: "warn",
    kind: "Alerta",
    title: p.name + " está parado",
    body: p.alert + ". Vale um contato pra destravar antes de fechar a semana.",
    meta: "previsibilidade"
  })), atrasados.filter(p => !p.alert || !p.alert.includes("parado")).map(p => /*#__PURE__*/React.createElement(InsightCard, {
    key: p.name,
    tone: "warn",
    kind: "Alerta",
    title: p.name + " abaixo do ritmo",
    body: p.monthDone + "h de " + p.monthGoal + "h — precisa de " + ((p.monthGoal - p.monthDone) / DIAS_RESTANTES).toFixed(1) + "h/dia pra bater a meta.",
    meta: p.monthPct + "%"
  })), baixaQ.map(p => /*#__PURE__*/React.createElement(InsightCard, {
    key: p.name,
    tone: "warn",
    kind: "Qualidade",
    title: p.name + " com aprovação baixa",
    body: p.apr + " de " + p.env + " uploads aprovados. Reforce enquadramento e iluminação.",
    meta: p.approval + "%"
  }))), /*#__PURE__*/React.createElement(Group, {
    label: "Lembretes & prazos"
  }, /*#__PURE__*/React.createElement(InsightCard, {
    tone: "neutral",
    kind: "Prazo",
    title: "Faltam " + DIAS_RESTANTES + " dias úteis pra fechar agosto",
    body: "Mantenha o time no ritmo pra n\xE3o acumular no fim do m\xEAs.",
    meta: "agosto"
  }), /*#__PURE__*/React.createElement(InsightCard, {
    tone: "neutral",
    kind: "Lembrete",
    title: "Confira os equipamentos indispon\xEDveis",
    body: "Quem est\xE1 sem equipamento dispon\xEDvel n\xE3o conta como pronto pra gravar."
  })), /*#__PURE__*/React.createElement(Group, {
    label: "Previs\xF5es"
  }, /*#__PURE__*/React.createElement(InsightCard, {
    tone: projecao >= metaEq ? "accent" : "warn",
    kind: "Previs\xE3o",
    title: "Projeção: " + projecao + "h no fim do mês",
    body: "No ritmo atual (" + ritmoDia + "h/dia somados), a equipe " + (projecao >= metaEq ? "bate" : "fica abaixo") + " da meta de " + metaEq + "h.",
    meta: Math.round(projecao / metaEq * 100) + "%"
  }))));
}
window.SublInsights = SublInsights;

// ---- Líder Geral ----------------------------------------------------------
function LeaderInsights() {
  const roll = window.SUBLIDER_ROLLUP;
  const abaixo = roll.filter(r => r.horas / r.meta < 0.6);
  const boa = roll.filter(r => r.horas / r.meta >= 0.75);
  const totalH = roll.reduce((s, r) => s + r.horas, 0);
  const totalMeta = roll.reduce((s, r) => s + r.meta, 0);
  const projecao = Math.round(totalH + totalH / 21 * DIAS_RESTANTES);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 0 96px"
    }
  }, /*#__PURE__*/React.createElement(ScreenHeader, {
    eyebrow: "L\xEDder Geral \xB7 Relat\xF3rio",
    title: "Insights"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 20px",
      display: "flex",
      flexDirection: "column",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      margin: "-6px 0 -4px",
      fontSize: 11.5,
      color: "var(--faint)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "var(--pillar-predict)"
    }
  }), " Consolidado de ", roll.length, " subl\xEDderes \xB7 h\xE1 poucos segundos"), /*#__PURE__*/React.createElement(Group, {
    label: "Alertas"
  }, abaixo.map(r => /*#__PURE__*/React.createElement(InsightCard, {
    key: r.name,
    tone: "warn",
    kind: "Alerta",
    title: r.name + " abaixo da meta",
    body: r.horas + "h de " + r.meta + "h · previsibilidade " + r.predict + ". Puxe reunião com o sublíder.",
    meta: Math.round(r.horas / r.meta * 100) + "%"
  })), /*#__PURE__*/React.createElement(InsightCard, {
    tone: "warn",
    kind: "LGPD",
    title: "Consentimento pendente em JF-3",
    body: "2 de 4 termos assinados na equipe do Diego. Sem termo, os dados n\xE3o entram no relat\xF3rio geral.",
    meta: "50%"
  })), /*#__PURE__*/React.createElement(Group, {
    label: "Destaques"
  }, boa.map(r => /*#__PURE__*/React.createElement(InsightCard, {
    key: r.name,
    tone: "accent",
    kind: "No ritmo",
    title: r.name + " acima do esperado",
    body: r.horas + "h de " + r.meta + "h · " + r.aprov + "% de aprovação. Bom modelo pra replicar.",
    meta: Math.round(r.horas / r.meta * 100) + "%"
  }))), /*#__PURE__*/React.createElement(Group, {
    label: "Previs\xF5es & prazos"
  }, /*#__PURE__*/React.createElement(InsightCard, {
    tone: projecao >= totalMeta ? "accent" : "warn",
    kind: "Previs\xE3o",
    title: "Cidade projeta " + projecao + "h no mês",
    body: "Meta da cidade é " + totalMeta + "h. No ritmo atual a cidade " + (projecao >= totalMeta ? "bate" : "fica abaixo") + " — priorize os sublíderes atrasados.",
    meta: Math.round(projecao / totalMeta * 100) + "%"
  }), /*#__PURE__*/React.createElement(InsightCard, {
    tone: "neutral",
    kind: "Prazo",
    title: "Relatório geral em " + DIAS_RESTANTES + " dias",
    body: "Feche consentimento e m\xE9tricas antes do envio consolidado."
  }))));
}
window.LeaderInsights = LeaderInsights;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/clonex_app/Insights.jsx", error: String((e && e.message) || e) }); }

// ui_kits/clonex_app/KanbanScreen.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Clonex JF — Kanban. Three tabs: Prospecção (funnel), Ativos (list), Histórico.
const CK = window.ClonexDesignSystem_ca55ab;
const COLUMNS = [{
  title: "Contato",
  cards: [{
    name: "Pet & Cia",
    sub: "Petshop · São Pedro",
    tags: ["1 kit"]
  }, {
    name: "Panificadora Sol",
    sub: "Padaria · Centro",
    tags: ["2 kits"]
  }]
}, {
  title: "Conversando",
  cards: [{
    name: "Dona Ivete",
    sub: "Confeitaria · Centro",
    tags: ["1 kit"]
  }]
}, {
  title: "Kit oferecido",
  cards: [{
    name: "Oficina do Léo",
    sub: "Mecânica · Grama",
    tags: ["2 kits"],
    pillar: "predict"
  }]
}, {
  title: "Fechado",
  cards: [{
    name: "Sítio Bela Vista",
    sub: "Agro · Zona Rural",
    tags: ["3 kits"]
  }, {
    name: "Lavô Lavanderia",
    sub: "Serviços · Santa Luzia",
    tags: ["1 kit"]
  }]
}];
const HISTORY = [{
  who: "Você",
  what: "Cadastrou Camila Ferraz",
  when: "hoje · 14:20"
}, {
  who: "Você",
  what: "Atualizou estimativa de capacidade — Bruno Sales",
  when: "ontem · 09:05"
}, {
  who: "Você",
  what: "Moveu Oficina do Léo → Kit oferecido",
  when: "2 dias atrás"
}, {
  who: "Você",
  what: "Encerrou participação — Vera Lúcia",
  when: "3 dias atrás"
}];
function KanbanScreen() {
  const st = useStore();
  const {
    KanbanCard,
    Button,
    Icon
  } = CK;
  const gBtn = {
    width: 30,
    height: 30,
    borderRadius: 8,
    border: "1px solid var(--line)",
    background: "var(--surface)",
    cursor: "pointer",
    fontSize: 16,
    color: "var(--ink)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 1,
    fontFamily: "var(--font-sans)",
    flex: "none"
  };
  const [tab, setTab] = React.useState("prospec");
  const [view, setView] = React.useState("lista");
  const [cadastro, setCadastro] = React.useState(false);
  const [conversas, setConversas] = React.useState([{
    id: "c1",
    name: "Marcos (lava-jato do Zé)",
    status: "conversando"
  }, {
    id: "c2",
    name: "Duda — estética Bella",
    status: "conversando"
  }]);
  const [novo, setNovo] = React.useState("");
  const [converter, setConverter] = React.useState(null);
  const allLeads = COLUMNS.flatMap(c => c.cards.map(card => ({
    ...card,
    stage: c.title
  })));
  const tabs = [["prospec", "Prospecção"], ["ativos", "Ativos"], ["hist", "Histórico"]];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 0 24px"
    }
  }, /*#__PURE__*/React.createElement(ScreenHeader, {
    eyebrow: "Minha equipe \xB7 JF",
    title: "Kanban"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      padding: "0 20px 16px"
    }
  }, tabs.map(([k, l]) => /*#__PURE__*/React.createElement("button", {
    key: k,
    onClick: () => setTab(k),
    style: {
      flex: 1,
      padding: "9px 0",
      borderRadius: 999,
      cursor: "pointer",
      border: "1px solid " + (tab === k ? "var(--ink)" : "var(--line)"),
      background: tab === k ? "var(--ink)" : "transparent",
      color: tab === k ? "#fff" : "var(--muted)",
      fontSize: 13,
      fontWeight: 460,
      letterSpacing: "-.01em"
    }
  }, l))), tab === "prospec" && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 20px 14px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      fontWeight: 500,
      letterSpacing: ".13em",
      textTransform: "uppercase",
      color: "var(--faint)",
      margin: "0 2px 10px"
    }
  }, "Conversas em andamento"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: novo,
    onChange: e => setNovo(e.target.value),
    onKeyDown: e => {
      if (e.key === "Enter" && novo.trim()) {
        setConversas([{
          id: "c" + Date.now(),
          name: novo.trim(),
          status: "conversando"
        }, ...conversas]);
        setNovo("");
      }
    },
    placeholder: "Escreva o nome de quem est\xE1 conversando",
    style: {
      flex: 1,
      padding: "12px 14px",
      borderRadius: 12,
      border: "1px solid var(--line)",
      background: "var(--surface)",
      fontFamily: "var(--font-sans)",
      fontSize: 14,
      color: "var(--ink)",
      boxSizing: "border-box"
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      if (novo.trim()) {
        setConversas([{
          id: "c" + Date.now(),
          name: novo.trim(),
          status: "conversando"
        }, ...conversas]);
        setNovo("");
      }
    },
    style: {
      padding: "0 16px",
      borderRadius: 12,
      border: "none",
      cursor: "pointer",
      background: "var(--ink)",
      color: "#fff",
      fontFamily: "var(--font-sans)",
      fontSize: 20,
      flex: "none"
    }
  }, "+")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      marginBottom: 6
    }
  }, conversas.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.id,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 11,
      background: "var(--surface)",
      border: "1px solid var(--line)",
      borderRadius: 14,
      padding: "11px 14px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 30,
      height: 30,
      borderRadius: "50%",
      background: "var(--card)",
      color: "var(--ink)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 500,
      fontSize: 12.5,
      flex: "none"
    }
  }, c.name[0].toUpperCase()), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 460,
      color: "var(--ink)",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, c.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: c.status === "convertido" ? "var(--accent-ink)" : "var(--faint)",
      marginTop: 2
    }
  }, c.status === "convertido" ? "convertido · cadastro iniciado" : "conversando")), c.status === "convertido" ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 480,
      padding: "5px 11px",
      borderRadius: 999,
      background: "var(--accent-soft)",
      color: "var(--accent-ink)"
    }
  }, "convertido") : /*#__PURE__*/React.createElement("button", {
    onClick: () => setConverter(c),
    style: {
      fontSize: 12.5,
      fontWeight: 460,
      padding: "7px 13px",
      borderRadius: 999,
      border: "1px solid var(--ink)",
      background: "var(--ink)",
      color: "#fff",
      cursor: "pointer",
      fontFamily: "var(--font-sans)",
      flex: "none"
    }
  }, "Converter"))))), tab === "prospec" && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      padding: "0 20px 12px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      background: "var(--card)",
      border: "1px solid var(--line2)",
      borderRadius: 999,
      padding: 3,
      gap: 2
    }
  }, [["lista", "list", "Lista"], ["colunas", "columns", "Kanban"]].map(([k, ic, l]) => /*#__PURE__*/React.createElement("button", {
    key: k,
    onClick: () => setView(k),
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      border: "none",
      cursor: "pointer",
      padding: "6px 13px",
      borderRadius: 999,
      background: view === k ? "var(--surface)" : "transparent",
      boxShadow: view === k ? "0 1px 2px rgba(20,20,20,.08)" : "none",
      color: view === k ? "var(--ink)" : "var(--muted)",
      fontFamily: "var(--font-sans)",
      fontSize: 12.5,
      fontWeight: 500,
      letterSpacing: "-.01em"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ic,
    size: 15,
    color: view === k ? "var(--accent)" : "var(--faint)"
  }), " ", l)))), tab === "prospec" && view === "colunas" && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      overflowX: "auto",
      padding: "0 20px 4px"
    }
  }, COLUMNS.map(col => /*#__PURE__*/React.createElement("div", {
    key: col.title,
    style: {
      flex: "none",
      width: 200
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      fontWeight: 500,
      color: "var(--ink)"
    }
  }, col.title), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      color: "var(--faint)",
      background: "var(--card)",
      borderRadius: 999,
      padding: "2px 8px"
    }
  }, col.cards.length)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 9
    }
  }, col.cards.map(c => /*#__PURE__*/React.createElement(KanbanCard, _extends({
    key: c.name
  }, c))))))), tab === "prospec" && view === "lista" && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 20px",
      display: "flex",
      flexDirection: "column",
      gap: 2
    }
  }, allLeads.map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: c.name,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "13px 2px",
      borderBottom: i < allLeads.length - 1 ? "1px solid var(--line2)" : "none"
    }
  }, c.pillar ? /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: c.pillar === "predict" ? "var(--pillar-predict)" : c.pillar === "quantity" ? "var(--pillar-quantity)" : "var(--pillar-quality)",
      flex: "none"
    }
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      flex: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14.5,
      fontWeight: 500,
      letterSpacing: "-.018em",
      color: "var(--ink)"
    }
  }, c.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--faint)",
      marginTop: 2
    }
  }, c.sub)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      fontWeight: 480,
      color: "var(--ink2)",
      background: "var(--card)",
      border: "1px solid var(--line2)",
      borderRadius: 999,
      padding: "4px 11px",
      whiteSpace: "nowrap"
    }
  }, c.stage)))), tab === "ativos" && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 20px",
      display: "flex",
      flexDirection: "column",
      gap: 11
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    onClick: () => setCadastro(true)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 16
  }), " Cadastrar pessoa")), window.CLONEX_PEOPLE.filter(p => p.status === "ativo").map(p => /*#__PURE__*/React.createElement("div", {
    key: p.name,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      background: "var(--surface)",
      border: "1px solid var(--line)",
      borderRadius: 14,
      padding: "13px 15px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 36,
      height: 36,
      borderRadius: "50%",
      background: "var(--ink)",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 500,
      fontSize: 14,
      letterSpacing: "-.02em",
      flex: "none"
    }
  }, p.name[0]), /*#__PURE__*/React.createElement("button", {
    onClick: () => window.__openPerson && window.__openPerson(p),
    style: {
      flex: 1,
      minWidth: 0,
      textAlign: "left",
      background: "none",
      border: "none",
      padding: 0,
      cursor: "pointer",
      fontFamily: "var(--font-sans)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14.5,
      fontWeight: 500,
      letterSpacing: "-.018em",
      color: "var(--ink)"
    }
  }, p.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--faint)",
      marginTop: 2
    }
  }, p.monthDone, "h no m\xEAs \xB7 toque pra ver tudo")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => st.setMemberGoal(p.name, st.getGoal(p.name) - 10),
    style: gBtn
  }, "\u2212"), /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: 40,
      textAlign: "center",
      fontSize: 13.5,
      fontWeight: 500,
      color: "var(--ink)"
    }
  }, st.getGoal(p.name), "h"), /*#__PURE__*/React.createElement("button", {
    onClick: () => st.setMemberGoal(p.name, st.getGoal(p.name) + 10),
    style: gBtn
  }, "+"))))), tab === "hist" && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 20px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      fontWeight: 500,
      letterSpacing: ".13em",
      textTransform: "uppercase",
      color: "var(--faint)",
      margin: "0 2px 10px"
    }
  }, "A\xE7\xF5es dos membros"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 2
    }
  }, st.activity.map((h, i) => /*#__PURE__*/React.createElement("div", {
    key: h.id,
    style: {
      display: "flex",
      gap: 12,
      padding: "13px 2px",
      borderBottom: i < st.activity.length - 1 ? "1px solid var(--line2)" : "none"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 30,
      height: 30,
      borderRadius: "50%",
      background: "var(--card)",
      color: "var(--ink)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 500,
      fontSize: 12.5,
      flex: "none"
    }
  }, h.name[0]), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      color: "var(--ink)",
      lineHeight: 1.4
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      fontWeight: 500
    }
  }, h.name), " \u2014 ", h.acao), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: "var(--faint)",
      marginTop: 3
    }
  }, h.when))))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--faint)",
      lineHeight: 1.5,
      padding: "12px 2px 0"
    }
  }, "Tudo o que cada membro faz aparece aqui \u2014 com o nome de quem fez e quando.")), /*#__PURE__*/React.createElement(CadastroPessoaSheet, {
    open: cadastro,
    onClose: () => setCadastro(false)
  }), /*#__PURE__*/React.createElement(ConversaoSheet, {
    conv: converter,
    onClose: () => setConverter(null),
    onDone: id => {
      setConversas(cs => cs.map(c => c.id === id ? {
        ...c,
        status: "convertido"
      } : c));
      setConverter(null);
    }
  }));
}
window.KanbanScreen = KanbanScreen;

// Passo a passo de conversão de um lead em membro ativo.
function ConversaoSheet({
  conv,
  onClose,
  onDone
}) {
  const {
    Button
  } = CK;
  const [step, setStep] = React.useState(0);
  React.useEffect(() => {
    if (conv) setStep(0);
  }, [conv]);
  const steps = [{
    t: "Criar a conta",
    d: "Crie a conta da pessoa no sistema da Clonex e gere o login (email + senha)."
  }, {
    t: "Pegar dados no Minute",
    d: "No Minute Data, pegue o email/usuário e o código (VZ…) que identificam a pessoa."
  }, {
    t: "Cadastro no app",
    d: "Cadastre a pessoa aqui: nome, contato, vínculo (empresa/autônomo) e área de trabalho."
  }, {
    t: "Configurar o app Clonex",
    d: "A pessoa instala o app Clonex, entra com o login e digita o código no perfil pra conectar à sua equipe."
  }];
  const last = step === steps.length - 1;
  return /*#__PURE__*/React.createElement(Sheet, {
    open: !!conv,
    onClose: onClose,
    title: "Converter em membro"
  }, conv && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      color: "var(--muted)",
      margin: "-6px 0 16px"
    }
  }, conv.name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      marginBottom: 18
    }
  }, steps.map((_, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: 1,
      height: 4,
      borderRadius: 999,
      background: i <= step ? "var(--accent)" : "var(--card2)"
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12,
      marginBottom: 22
    }
  }, steps.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      gap: 12,
      opacity: i === step ? 1 : 0.45
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 26,
      height: 26,
      borderRadius: "50%",
      flex: "none",
      background: i < step ? "var(--accent)" : i === step ? "var(--ink)" : "var(--card)",
      color: i <= step ? "#fff" : "var(--muted)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 12.5,
      fontWeight: 500
    }
  }, i + 1), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14.5,
      fontWeight: 500,
      color: "var(--ink)"
    }
  }, s.t), i === step && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "var(--muted)",
      marginTop: 4,
      lineHeight: 1.5
    }
  }, s.d))))), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    full: true,
    onClick: () => {
      if (last) onDone(conv.id);else setStep(step + 1);
    }
  }, last ? "Concluir conversão" : "Próximo passo"));
}

// --- Cadastro de participante (sublíder) ----------------------------------
// sublider_id é OBRIGATÓRIO — sem ele a pessoa não aparece em nenhuma equipe.
// Pré-preenchido com o sublíder logado ("Você").
function CadastroPessoaSheet({
  open,
  onClose
}) {
  const {
    Button,
    Icon
  } = CK;
  const [nome, setNome] = React.useState("");
  const [contato, setContato] = React.useState("");
  const [sublider, setSublider] = React.useState(window.SUBLIDERES[0]);
  const [vinculo, setVinculo] = React.useState("autonomo"); // empresa | autonomo
  const [jornada, setJornada] = React.useState("full"); // full | part
  const [area, setArea] = React.useState("lavajato");
  const [empresa, setEmpresa] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [senha, setSenha] = React.useState("");
  const [code, setCode] = React.useState("");
  const [nCap, setNCap] = React.useState(1);
  const [nCel, setNCel] = React.useState(1);
  const [tamCap, setTamCap] = React.useState("M");
  const [poolOpen, setPoolOpen] = React.useState(false);
  React.useEffect(() => {
    if (open) {
      setNome("");
      setContato("");
      setSublider(window.SUBLIDERES[0]);
      setVinculo("autonomo");
      setArea("lavajato");
      setEmpresa("");
      setEmail("");
      setSenha("");
      setCode("");
      setNCap(1);
      setNCel(1);
      setTamCap("M");
    }
  }, [open]);
  const inp = {
    width: "100%",
    padding: "13px 15px",
    borderRadius: 12,
    border: "1px solid var(--line)",
    background: "var(--surface)",
    fontFamily: "var(--font-sans)",
    fontSize: 14.5,
    color: "var(--ink)",
    marginBottom: 18,
    boxSizing: "border-box"
  };
  const canSave = nome.trim() && contato.trim() && sublider && email.trim() && senha.trim() && code.trim();
  const pickLogin = l => {
    setEmail(l.email);
    setSenha(l.senha);
    setCode(l.code);
    setPoolOpen(false);
  };
  return /*#__PURE__*/React.createElement(Sheet, {
    open: open,
    onClose: onClose,
    title: "Cadastrar participante"
  }, /*#__PURE__*/React.createElement(SheetLabel, null, "Nome"), /*#__PURE__*/React.createElement("input", {
    value: nome,
    onChange: e => setNome(e.target.value),
    placeholder: "Nome completo",
    style: inp
  }), /*#__PURE__*/React.createElement(SheetLabel, null, "Telefone / contato"), /*#__PURE__*/React.createElement("input", {
    value: contato,
    onChange: e => setContato(e.target.value),
    placeholder: "(32) 9 0000-0000",
    style: inp
  }), /*#__PURE__*/React.createElement(SheetLabel, null, "Tipo de v\xEDnculo"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement(Seg, {
    options: [["autonomo", "Autônomo"], ["empresa", "Empresa"]],
    value: vinculo,
    set: setVinculo
  })), /*#__PURE__*/React.createElement(SheetLabel, null, "Jornada"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement(Seg, {
    options: [["full", "Full-time"], ["part", "Part-time"]],
    value: jornada,
    set: setJornada
  })), /*#__PURE__*/React.createElement(SheetLabel, null, "\xC1rea de trabalho"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 8,
      marginBottom: 18
    }
  }, Object.keys(window.NICHE_LABELS).map(k => /*#__PURE__*/React.createElement("button", {
    key: k,
    onClick: () => setArea(k),
    style: {
      border: "none",
      background: "none",
      padding: 0,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 7,
      background: area === k ? "var(--accent-soft)" : "var(--card)",
      border: "1px solid " + (area === k ? "var(--accent-line)" : "var(--line2)"),
      borderRadius: 999,
      padding: "8px 15px",
      fontSize: 13.5,
      fontWeight: 460,
      color: area === k ? "var(--accent-ink)" : "var(--ink2)"
    }
  }, area === k && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "var(--accent)"
    }
  }), window.NICHE_LABELS[k])))), vinculo === "empresa" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SheetLabel, null, "Empresa"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      marginBottom: 14
    }
  }, Object.keys(window.COMPANY_LOGINS).map(c => {
    const on = empresa === c;
    return /*#__PURE__*/React.createElement("button", {
      key: c,
      onClick: () => {
        setEmpresa(c);
        setEmail("");
        setSenha("");
        setCode("");
      },
      style: {
        display: "flex",
        alignItems: "center",
        gap: 11,
        padding: "12px 15px",
        borderRadius: 12,
        cursor: "pointer",
        textAlign: "left",
        fontFamily: "var(--font-sans)",
        background: on ? "var(--accent-soft)" : "var(--surface)",
        border: "1px solid " + (on ? "var(--accent-line)" : "var(--line)")
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        fontWeight: 460,
        color: on ? "var(--accent-ink)" : "var(--ink)"
      }
    }, c), /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: "auto",
        fontSize: 11.5,
        color: "var(--faint)"
      }
    }, window.COMPANY_LOGINS[c].filter(l => !l.usado).length, " logins livres"));
  })), /*#__PURE__*/React.createElement("button", {
    disabled: !empresa,
    onClick: () => setPoolOpen(true),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      width: "100%",
      padding: "13px 15px",
      borderRadius: 12,
      border: "1px solid var(--line)",
      background: "var(--surface)",
      cursor: empresa ? "pointer" : "not-allowed",
      opacity: empresa ? 1 : 0.5,
      fontFamily: "var(--font-sans)",
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "users",
    size: 18,
    color: "var(--ink2)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: email ? "var(--ink)" : "var(--muted)"
    }
  }, email || "Selecionar login da empresa"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto",
      display: "inline-flex"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevronRight",
    size: 16,
    color: "var(--faint)"
  })))), /*#__PURE__*/React.createElement(SheetLabel, null, "Email de acesso (Minute)"), /*#__PURE__*/React.createElement("input", {
    value: email,
    onChange: e => setEmail(e.target.value),
    readOnly: vinculo === "empresa",
    placeholder: "user...@yopmail.com",
    style: {
      ...inp,
      background: vinculo === "empresa" ? "var(--card)" : "var(--surface)"
    }
  }), /*#__PURE__*/React.createElement(SheetLabel, null, "Senha"), /*#__PURE__*/React.createElement("input", {
    value: senha,
    onChange: e => setSenha(e.target.value),
    readOnly: vinculo === "empresa",
    placeholder: "Admin@_0000",
    style: {
      ...inp,
      background: vinculo === "empresa" ? "var(--card)" : "var(--surface)"
    }
  }), /*#__PURE__*/React.createElement(SheetLabel, null, "C\xF3digo (identifica o subl\xEDder)"), /*#__PURE__*/React.createElement("input", {
    value: code,
    onChange: e => setCode(e.target.value.toUpperCase()),
    readOnly: vinculo === "empresa",
    placeholder: "Ex: VZEAE7WC",
    style: {
      ...inp,
      background: vinculo === "empresa" ? "var(--card)" : "var(--surface)",
      letterSpacing: ".04em"
    }
  }), /*#__PURE__*/React.createElement(SheetLabel, null, "Subl\xEDder respons\xE1vel *"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      marginBottom: 8
    }
  }, window.SUBLIDERES.map(s => {
    const on = sublider === s;
    return /*#__PURE__*/React.createElement("button", {
      key: s,
      onClick: () => setSublider(s),
      style: {
        display: "flex",
        alignItems: "center",
        gap: 11,
        padding: "13px 15px",
        borderRadius: 12,
        cursor: "pointer",
        textAlign: "left",
        fontFamily: "var(--font-sans)",
        background: on ? "var(--accent-soft)" : "var(--surface)",
        border: "1px solid " + (on ? "var(--accent-line)" : "var(--line)")
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 16,
        height: 16,
        borderRadius: "50%",
        flex: "none",
        border: "1.5px solid " + (on ? "var(--accent)" : "var(--faint)"),
        background: on ? "var(--accent)" : "transparent",
        boxShadow: on ? "inset 0 0 0 3px var(--accent-soft)" : "none"
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        fontWeight: 460,
        color: on ? "var(--accent-ink)" : "var(--ink)"
      }
    }, s));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--faint)",
      lineHeight: 1.5,
      marginBottom: 20
    }
  }, "Cada login \xE9 \xFAnico \u2014 mesmo 4 pessoas de uma empresa usam logins diferentes. O ", /*#__PURE__*/React.createElement("b", null, "email"), ", a ", /*#__PURE__*/React.createElement("b", null, "senha"), " e o ", /*#__PURE__*/React.createElement("b", null, "c\xF3digo"), " v\xEAm da planilha e \xE9 o que a pessoa usa pra entrar no Minute e no app. O subl\xEDder \xE9 obrigat\xF3rio: sem ele o cadastro n\xE3o \xE9 salvo."), /*#__PURE__*/React.createElement(SheetLabel, null, "Equipamentos no cadastro"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      marginBottom: 12
    }
  }, [["capacete", "Capacetes", nCap, setNCap], ["celular", "Celulares", nCel, setNCel]].map(([tp, l, val, setVal]) => /*#__PURE__*/React.createElement("div", {
    key: tp,
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 8,
      background: "var(--surface)",
      border: "1px solid var(--line)",
      borderRadius: 14,
      padding: "14px 8px"
    }
  }, /*#__PURE__*/React.createElement(window.EquipImg, {
    tipo: tp,
    size: 44
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      color: "var(--muted)"
    }
  }, l), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setVal(Math.max(0, val - 1)),
    style: {
      width: 28,
      height: 28,
      borderRadius: 8,
      border: "1px solid var(--line)",
      background: "var(--surface)",
      cursor: "pointer",
      fontSize: 16,
      color: "var(--ink)"
    }
  }, "\u2212"), /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: 20,
      textAlign: "center",
      fontSize: 15,
      fontWeight: 520,
      color: "var(--ink)"
    }
  }, val), /*#__PURE__*/React.createElement("button", {
    onClick: () => setVal(val + 1),
    style: {
      width: 28,
      height: 28,
      borderRadius: 8,
      border: "1px solid var(--line)",
      background: "var(--surface)",
      cursor: "pointer",
      fontSize: 16,
      color: "var(--ink)"
    }
  }, "+"))))), nCap > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SheetLabel, null, "Tamanho do capacete"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement(window.Seg, {
    options: [["P", "P"], ["M", "M"], ["G", "G"]],
    value: tamCap,
    set: setTamCap
  }))), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    full: true,
    disabled: !canSave,
    style: {
      opacity: canSave ? 1 : 0.4,
      cursor: canSave ? "pointer" : "not-allowed"
    },
    onClick: () => {
      if (canSave) onClose();
    }
  }, "Salvar participante"), poolOpen && /*#__PURE__*/React.createElement("div", {
    onClick: () => setPoolOpen(false),
    style: {
      position: "absolute",
      inset: 0,
      zIndex: 5,
      display: "flex",
      alignItems: "flex-end",
      background: "rgba(20,20,20,.28)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      position: "relative",
      width: "100%",
      maxHeight: "70%",
      overflowY: "auto",
      background: "var(--surface)",
      borderRadius: "22px 22px 0 0",
      padding: "12px 20px 24px",
      fontFamily: "var(--font-sans)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 38,
      height: 4,
      borderRadius: 999,
      background: "var(--line)",
      margin: "0 auto 14px"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      fontWeight: 500,
      letterSpacing: "-.02em",
      color: "var(--ink)",
      marginBottom: 4
    }
  }, "Logins de ", empresa), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: "var(--faint)",
      marginBottom: 14
    }
  }, "Cada funcion\xE1rio usa um login. Escolha um livre."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, (window.COMPANY_LOGINS[empresa] || []).map(l => /*#__PURE__*/React.createElement("button", {
    key: l.emailUser,
    disabled: l.usado,
    onClick: () => pickLogin(l),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 11,
      padding: "12px 14px",
      borderRadius: 12,
      cursor: l.usado ? "not-allowed" : "pointer",
      textAlign: "left",
      fontFamily: "var(--font-sans)",
      background: "var(--surface)",
      border: "1px solid var(--line)",
      opacity: l.usado ? 0.5 : 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      fontWeight: 460,
      color: "var(--ink)"
    }
  }, l.email), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: "var(--faint)",
      marginTop: 2
    }
  }, "Senha ", l.senha, " \xB7 C\xF3digo ", l.code)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 480,
      padding: "3px 10px",
      borderRadius: 999,
      background: l.usado ? "var(--warn-soft)" : "var(--accent-soft)",
      color: l.usado ? "var(--warn-ink)" : "var(--accent-ink)"
    }
  }, l.usado ? "em uso" : "livre")))))));
}
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/clonex_app/KanbanScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/clonex_app/LeaderExtra.jsx
try { (() => {
// Clonex JF — Financeiro (sublíder + líder geral), Planilha visual, e Guia passo a passo.
const CX = window.ClonexDesignSystem_ca55ab;
const brl = n => "R$ " + n.toLocaleString("pt-BR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});
const PG_META = {
  pago: {
    label: "pago",
    bg: "var(--accent-soft)",
    fg: "var(--accent-ink)",
    dot: "var(--accent)"
  },
  adiantado: {
    label: "adiantado",
    bg: "var(--card)",
    fg: "var(--muted)",
    dot: "var(--faint)"
  },
  previsto: {
    label: "previsto",
    bg: "var(--warn-soft)",
    fg: "var(--warn-ink)",
    dot: "var(--warn)"
  }
};

// Barra simples de gráfico (segue a paleta do site).
function Bars({
  data,
  unit
}) {
  const max = Math.max(...data.map(d => d.v), 1);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, data.map(d => /*#__PURE__*/React.createElement("div", {
    key: d.k,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 78,
      fontSize: 12,
      color: "var(--muted)",
      flex: "none",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, d.k), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 20,
      background: "var(--card2)",
      borderRadius: 999,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: d.v / max * 100 + "%",
      height: "100%",
      borderRadius: 999,
      background: d.c || "var(--accent)"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 52,
      textAlign: "right",
      fontSize: 12.5,
      fontWeight: 500,
      color: "var(--ink)",
      flex: "none"
    }
  }, d.v, unit || ""))));
}
function FinanceiroScreen({
  role
}) {
  const st = useStore();
  const {
    Card
  } = CX;
  const isLider = role === "lider";
  const [addOpen, setAddOpen] = React.useState(false);
  const rows = isLider ? st.pagamentos : st.pagamentos.filter(p => p.sub === "Você (JF-1)");
  const pago = rows.filter(p => p.status === "pago").reduce((s, p) => s + p.valor, 0);
  const previsto = rows.filter(p => p.status !== "pago").reduce((s, p) => s + p.valor, 0);
  const nPago = rows.filter(p => p.status === "pago").length;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 0 96px"
    }
  }, /*#__PURE__*/React.createElement(ScreenHeader, {
    eyebrow: isLider ? "Líder Geral · JF" : "Minha equipe · JF",
    title: "Financeiro",
    right: !isLider ? /*#__PURE__*/React.createElement("button", {
      onClick: () => setAddOpen(true),
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        border: "1px solid var(--line)",
        background: "var(--surface)",
        borderRadius: 999,
        padding: "6px 12px",
        cursor: "pointer",
        color: "var(--ink)",
        fontFamily: "var(--font-sans)",
        fontSize: 12.5,
        fontWeight: 460
      }
    }, "+ Pagamento") : null
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 20px",
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--accent-soft)",
      border: "1px solid var(--accent-line)",
      borderRadius: 14,
      padding: "16px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 20,
      fontWeight: 520,
      letterSpacing: "-.02em",
      color: "var(--accent-ink)"
    }
  }, brl(pago)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: "var(--accent-ink)",
      marginTop: 3
    }
  }, "j\xE1 pago \xB7 ", nPago, " pessoas")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--card)",
      border: "1px solid var(--line2)",
      borderRadius: 14,
      padding: "16px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 20,
      fontWeight: 520,
      letterSpacing: "-.02em",
      color: "var(--ink)"
    }
  }, brl(previsto)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: "var(--faint)",
      marginTop: 3
    }
  }, "previsto no ciclo"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      fontWeight: 500,
      letterSpacing: ".13em",
      textTransform: "uppercase",
      color: "var(--faint)",
      margin: "4px 2px 10px"
    }
  }, "Quem j\xE1 recebeu / vai receber"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, rows.map(p => {
    const m = PG_META[p.status];
    return /*#__PURE__*/React.createElement("button", {
      key: p.id,
      onClick: () => openSource({
        title: p.name,
        value: brl(p.valor),
        origin: (p.tipo === "empresa" ? "Empresa" : "Autônomo") + " · sublíder " + p.sub,
        updated: p.data,
        history: [{
          what: p.horas + "h no ciclo × valor/hora",
          when: p.periodo
        }, {
          what: "Status: " + m.label,
          when: p.data
        }, {
          what: "Adiantamento das 1as 10h incluído",
          when: "início do ciclo"
        }]
      }),
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        width: "100%",
        textAlign: "left",
        cursor: "pointer",
        background: "var(--surface)",
        border: "1px solid var(--line)",
        borderRadius: "var(--r-sm)",
        padding: "13px 15px",
        fontFamily: "var(--font-sans)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 34,
        height: 34,
        borderRadius: "50%",
        background: "var(--ink)",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 500,
        fontSize: 13.5,
        flex: "none"
      }
    }, p.name[0]), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14.5,
        fontWeight: 460,
        color: "var(--ink)"
      }
    }, p.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11.5,
        color: "var(--faint)",
        marginTop: 2
      }
    }, p.periodo, " \xB7 ", p.horas, "h", isLider ? " · " + p.sub : "")), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "right",
        flex: "none"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 500,
        color: "var(--ink)"
      }
    }, brl(p.valor)), /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-block",
        marginTop: 4,
        fontSize: 10.5,
        fontWeight: 480,
        padding: "3px 9px",
        borderRadius: 999,
        background: m.bg,
        color: m.fg
      }
    }, m.label)));
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--faint)",
      lineHeight: 1.5,
      padding: "2px 2px 0"
    }
  }, "S\xF3 c\xE1lculo e controle \u2014 sem execu\xE7\xE3o de pagamento nem chave Pix. Toque numa pessoa pra ver o hist\xF3rico.")), !isLider && /*#__PURE__*/React.createElement(PagamentoSheet, {
    open: addOpen,
    onClose: () => setAddOpen(false)
  }));
}
window.FinanceiroScreen = FinanceiroScreen;

// Relatório de equipamentos com gráficos — sublíder e líder geral.
// Registrar pagamento — o sublíder escolhe a pessoa; horas/valor vêm automáticos
// da conta dela (depende do membro marcar tudo no app pra receber por tudo).
function PagamentoSheet({
  open,
  onClose
}) {
  const st = useStore();
  const ppl = window.CLONEX_ALL_PEOPLE || [];
  const mine = ppl.filter(p => p.sub === "Você (JF-1)");
  const [sel, setSel] = React.useState(null);
  React.useEffect(() => {
    if (open) setSel(null);
  }, [open]);
  const vh = 15;
  return /*#__PURE__*/React.createElement(window.Sheet, {
    open: open,
    onClose: onClose,
    title: "Registrar pagamento"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 9,
      alignItems: "flex-start",
      background: "var(--accent-soft)",
      border: "1px solid var(--accent-line)",
      borderRadius: 12,
      padding: "12px 14px",
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "var(--accent)",
      flex: "none",
      marginTop: 6
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: "var(--accent-ink)",
      lineHeight: 1.5
    }
  }, "As horas e m\xE9tricas v\xEAm ", /*#__PURE__*/React.createElement("b", null, "autom\xE1ticas da conta da pessoa"), ". Ela s\xF3 recebe por tudo que marcar no app \u2014 por isso \xE9 essencial usar o app direito; \xE9 assim que chega at\xE9 voc\xEA.")), /*#__PURE__*/React.createElement(window.SheetLabel, null, "Pessoa"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      marginBottom: 18
    }
  }, mine.map(p => {
    const on = sel && sel.name === p.name;
    return /*#__PURE__*/React.createElement("button", {
      key: p.name,
      onClick: () => setSel(p),
      style: {
        display: "flex",
        alignItems: "center",
        gap: 11,
        padding: "12px 14px",
        borderRadius: 12,
        cursor: "pointer",
        textAlign: "left",
        fontFamily: "var(--font-sans)",
        background: on ? "var(--accent-soft)" : "var(--surface)",
        border: "1px solid " + (on ? "var(--accent-line)" : "var(--line)")
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 30,
        height: 30,
        borderRadius: "50%",
        background: "var(--ink)",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 500,
        fontSize: 12.5,
        flex: "none"
      }
    }, p.name[0]), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 460,
        color: "var(--ink)"
      }
    }, p.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11.5,
        color: "var(--faint)",
        marginTop: 2
      }
    }, p.horas, "h \xB7 ", p.aprov, "% aprov. \xB7 ", p.tipo === "empresa" ? p.empresa : "Autônomo")), on && /*#__PURE__*/React.createElement(CX.Icon, {
      name: "check",
      size: 17,
      color: "var(--accent)"
    }));
  })), sel && /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--card)",
      border: "1px solid var(--line2)",
      borderRadius: 14,
      padding: "14px 15px",
      marginBottom: 18
    }
  }, [["Horas (automático)", sel.horas + "h"], ["Aproveitamento", sel.aprov + "%"], ["Valor/hora", brl(vh)], ["Valor calculado", brl(sel.horas * vh)]].map(([k, v], i, a) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      display: "flex",
      justifyContent: "space-between",
      padding: "9px 0",
      borderBottom: i < a.length - 1 ? "1px solid var(--line2)" : "none"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: "var(--muted)"
    }
  }, k), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13.5,
      fontWeight: i === a.length - 1 ? 500 : 460,
      color: "var(--ink)"
    }
  }, v)))), /*#__PURE__*/React.createElement("button", {
    disabled: !sel,
    onClick: () => {
      st.pagamentos.unshift({
        id: "pg" + Date.now(),
        name: sel.name,
        sub: "Você (JF-1)",
        tipo: sel.tipo,
        horas: sel.horas,
        valor: sel.horas * vh,
        status: "pago",
        periodo: "ciclo atual",
        data: "agora"
      });
      st.emit();
      onClose();
    },
    style: {
      width: "100%",
      padding: "14px 0",
      borderRadius: 999,
      border: "none",
      cursor: sel ? "pointer" : "not-allowed",
      opacity: sel ? 1 : 0.4,
      background: "var(--ink)",
      color: "#fff",
      fontFamily: "var(--font-sans)",
      fontSize: 15,
      fontWeight: 460
    }
  }, "Registrar pagamento"));
}

// Gestão de contas — organizador/líder habilita, desabilita, reenvia acesso e cria contas.
function GestaoContasScreen() {
  const st = useStore();
  const [novo, setNovo] = React.useState(false);
  const [nome, setNome] = React.useState("");
  const [papel, setPapel] = React.useState("Sublíder");
  const AS = window.ACC_STATUS;
  const grupos = [["Sublíder", "Sublíderes"], ["Líder geral", "Líderes gerais"], ["Líder geral / Gestor", "Gestor"]];
  const btn = (label, onClick, kind) => /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      fontSize: 12,
      fontWeight: 460,
      padding: "7px 12px",
      borderRadius: 999,
      cursor: "pointer",
      fontFamily: "var(--font-sans)",
      flex: "none",
      border: kind === "primary" ? "none" : "1px solid var(--line)",
      background: kind === "primary" ? "var(--ink)" : "transparent",
      color: kind === "primary" ? "#fff" : kind === "warn" ? "var(--warn)" : "var(--ink)"
    }
  }, label);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 0 96px"
    }
  }, /*#__PURE__*/React.createElement(ScreenHeader, {
    eyebrow: "L\xEDder Geral \xB7 Seguran\xE7a",
    title: "Gest\xE3o de contas",
    right: /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        setNovo(true);
        setNome("");
      },
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        border: "1px solid var(--line)",
        background: "var(--surface)",
        borderRadius: 999,
        padding: "6px 12px",
        cursor: "pointer",
        color: "var(--ink)",
        fontFamily: "var(--font-sans)",
        fontSize: 12.5,
        fontWeight: 460
      }
    }, "+ Conta")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 20px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 9,
      alignItems: "flex-start",
      background: "var(--card)",
      border: "1px solid var(--line2)",
      borderRadius: 12,
      padding: "12px 14px",
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "var(--faint)",
      flex: "none",
      marginTop: 6
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: "var(--muted)",
      lineHeight: 1.5
    }
  }, "Cada conta nasce ", /*#__PURE__*/React.createElement("b", null, "desabilitada"), " com senha tempor\xE1ria. Habilite pra liberar o 1\xBA acesso \u2014 a senha \xE9 trocada na hora e a tempor\xE1ria \xE9 invalidada. Ningu\xE9m v\xEA a senha definitiva de outra pessoa.")), grupos.map(([p, titulo]) => {
    const list = st.accounts.filter(a => a.papel === p);
    if (!list.length) return null;
    return /*#__PURE__*/React.createElement("div", {
      key: p,
      style: {
        marginBottom: 20
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11.5,
        fontWeight: 500,
        letterSpacing: ".13em",
        textTransform: "uppercase",
        color: "var(--faint)",
        margin: "0 2px 10px"
      }
    }, titulo, " \xB7 ", list.length), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 10
      }
    }, list.map(a => {
      const s = AS[a.status];
      return /*#__PURE__*/React.createElement("div", {
        key: a.id,
        style: {
          background: "var(--surface)",
          border: "1px solid var(--line)",
          borderRadius: "var(--r-sm)",
          padding: "14px 15px"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 4
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 15,
          fontWeight: 500,
          letterSpacing: "-.015em",
          color: "var(--ink)"
        }
      }, a.nome), /*#__PURE__*/React.createElement("span", {
        style: {
          marginLeft: "auto",
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontSize: 10.5,
          fontWeight: 480,
          padding: "4px 10px",
          borderRadius: 999,
          background: s.bg,
          color: s.fg
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: s.dot
        }
      }), s.label)), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12.5,
          color: "var(--muted)"
        }
      }, a.login), a.status !== "ativa" && /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11.5,
          color: "var(--faint)",
          marginTop: 3
        }
      }, "Senha tempor\xE1ria: ", /*#__PURE__*/React.createElement("b", {
        style: {
          color: "var(--ink2)",
          fontWeight: 500
        }
      }, a.temp)), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          gap: 7,
          marginTop: 12,
          flexWrap: "wrap"
        }
      }, a.status === "salva" && btn("Habilitar", () => st.enableAccount(a.id), "primary"), a.status === "ativa_temp" && btn("Reenviar acesso", () => st.resendAccess(a.id)), a.status === "ativa_temp" && btn("Marcar como trocada", () => st.markTrocada(a.id)), a.status !== "salva" && btn("Desabilitar", () => st.disableAccount(a.id), "warn")));
    })));
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--faint)",
      lineHeight: 1.5,
      padding: "2px 2px 0"
    }
  }, "Chegando novos subl\xEDderes ou l\xEDderes, gere a conta pelo ", /*#__PURE__*/React.createElement("b", null, "+ Conta"), " \u2014 login e senha tempor\xE1ria s\xE3o criados no padr\xE3o Clonex.")), /*#__PURE__*/React.createElement(window.Sheet, {
    open: novo,
    onClose: () => setNovo(false),
    title: "Criar conta"
  }, /*#__PURE__*/React.createElement(window.SheetLabel, null, "Nome"), /*#__PURE__*/React.createElement("input", {
    value: nome,
    onChange: e => setNome(e.target.value),
    placeholder: "Nome da pessoa",
    style: {
      width: "100%",
      padding: "13px 15px",
      borderRadius: 12,
      border: "1px solid var(--line)",
      background: "var(--surface)",
      fontFamily: "var(--font-sans)",
      fontSize: 14.5,
      color: "var(--ink)",
      marginBottom: 18,
      boxSizing: "border-box"
    }
  }), /*#__PURE__*/React.createElement(window.SheetLabel, null, "Papel"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement(window.Seg, {
    options: [["Sublíder", "Sublíder"], ["Líder geral", "Líder geral"]],
    value: papel,
    set: setPapel
  })), nome.trim() && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: "var(--muted)",
      background: "var(--card)",
      borderRadius: 12,
      padding: "12px 14px",
      marginBottom: 18,
      lineHeight: 1.5
    }
  }, "Login: ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--ink)",
      fontWeight: 500
    }
  }, "clonex.", nome.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z]/g, ""), ".", papel.startsWith("Líder") ? "lider" : "sub", "@clonexlabs.com"), /*#__PURE__*/React.createElement("br", null), "Nasce desabilitada, com senha tempor\xE1ria."), /*#__PURE__*/React.createElement("button", {
    disabled: !nome.trim(),
    onClick: () => {
      st.createAccount(nome, papel);
      setNovo(false);
    },
    style: {
      width: "100%",
      padding: "14px 0",
      borderRadius: 999,
      border: "none",
      cursor: nome.trim() ? "pointer" : "not-allowed",
      opacity: nome.trim() ? 1 : 0.4,
      background: "var(--ink)",
      color: "#fff",
      fontFamily: "var(--font-sans)",
      fontSize: 15,
      fontWeight: 460
    }
  }, "Criar conta")));
}
window.GestaoContasScreen = GestaoContasScreen;
function EquipReport({
  role
}) {
  const st = useStore();
  const {
    Card
  } = CX;
  const pt = st.poolTotals();
  const porSub = window.SUBLIDER_ROLLUP.map(r => ({
    k: r.name.split(" ")[0],
    v: r.capacetes + r.celulares
  }));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 0 24px"
    }
  }, /*#__PURE__*/React.createElement(Card, {
    pad: 18,
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      fontWeight: 500,
      letterSpacing: ".13em",
      textTransform: "uppercase",
      color: "var(--faint)",
      marginBottom: 14
    }
  }, "Status do invent\xE1rio"), /*#__PURE__*/React.createElement(Bars, {
    data: [{
      k: "Em uso",
      v: pt.emUso,
      c: "var(--ink)"
    }, {
      k: "Disponíveis",
      v: pt.disp,
      c: "var(--accent)"
    }, {
      k: "Reserva",
      v: pt.sol,
      c: "var(--warn)"
    }]
  })), /*#__PURE__*/React.createElement(Card, {
    pad: 18
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      fontWeight: 500,
      letterSpacing: ".13em",
      textTransform: "uppercase",
      color: "var(--faint)",
      marginBottom: 14
    }
  }, "Equipamentos por subl\xEDder"), /*#__PURE__*/React.createElement(Bars, {
    data: porSub
  })));
}
window.EquipReport = EquipReport;

// Planilha visual — espelho fiel da "Acompanhamento Geral - JF". Cada mudança no
// app cai na linha/coluna da pessoa; facilita a migração da planilha pro app.
const PLAN_COLS = [["Cidade", 92], ["Sublíder", 92], ["Email user", 108], ["Code", 78], ["Tam. Capacete", 96], ["Qtd Cap.", 62], ["Aparelho", 90], ["Nome do Participante", 150], ["Bairro", 88], ["Ocupação", 108], ["Ramo / Setor", 118], ["Ata", 52], ["Status das tasks", 122], ["Min. GRAVADOS", 100], ["Min. APROVADOS", 104], ["Fins de Sem.", 84], ["Valor/hora", 78], ["Tarefa Central", 130], ["Descontos", 84], ["Dias", 52], ["Horas GRAV.", 84], ["Horas APROV.", 88], ["% Aprov.", 70], ["Méd. GRAV/dia", 96], ["Méd. APROV/dia", 100], ["VALOR TOTAL", 96]];
const PLAN_ROWS = [{
  cid: "Juiz de Fora",
  sub: "Gasparetto",
  email: "420008040616",
  code: "VZEAE7WC",
  tam: "P & M",
  qtd: 2,
  ap: "Iphone 12",
  nome: "Juliana Munck Banho e Tosa",
  bairro: "Aeroporto",
  ocup: "Autônomo(a)",
  ramo: "Banho e Tosa",
  ata: "Sim",
  status: "Em Andamento",
  mg: 573,
  ma: 573,
  fs: 2,
  vh: "R$11,00",
  tarefa: "Banho e Tosa",
  desc: "R$78,28",
  dias: 8,
  hg: "9,55",
  ha: "9,55",
  pct: "100,00%",
  mgd: "1,19",
  mad: "1,19",
  vt: "R$26,77"
}, {
  cid: "Juiz de Fora",
  sub: "Gasparetto",
  email: "420008458554",
  code: "VZEAE7WC",
  tam: "M",
  qtd: 1,
  ap: "Iphone 14",
  nome: "Maria Clara Drummond",
  bairro: "Centro",
  ocup: "Dona(o) de Casa",
  ramo: "Residencial",
  ata: "Sim",
  status: "Encerrado",
  mg: 59,
  ma: 59,
  fs: 1,
  vh: "R$12,00",
  tarefa: "Dona de Casa",
  desc: "—",
  dias: 5,
  hg: "0,98",
  ha: "0,98",
  pct: "100,00%",
  mgd: "0,20",
  mad: "0,20",
  vt: "R$11,80"
}, {
  cid: "Juiz de Fora",
  sub: "Gasparetto",
  email: "420008252975",
  code: "VZEAE7WC",
  tam: "M",
  qtd: 1,
  ap: "S21",
  nome: "Jardel Lopes (lava-jato)",
  bairro: "—",
  ocup: "Autônomo(a)",
  ramo: "Lava a Jato",
  ata: "—",
  status: "Em Andamento",
  mg: 60,
  ma: 60,
  fs: 2,
  vh: "R$10,00",
  tarefa: "Lavagem e Detalhamento",
  desc: "—",
  dias: 11,
  hg: "1,00",
  ha: "1,00",
  pct: "100,00%",
  mgd: "0,09",
  mad: "0,09",
  vt: "R$10,00"
}, {
  cid: "Juiz de Fora",
  sub: "Duda",
  email: "420002144624",
  code: "VZEAE7WC",
  tam: "P",
  qtd: 1,
  ap: "—",
  nome: "Camila",
  bairro: "—",
  ocup: "—",
  ramo: "—",
  ata: "—",
  status: "Em Andamento",
  mg: 1504,
  ma: 0,
  fs: "—",
  vh: "R$12,00",
  tarefa: "—",
  desc: "—",
  dias: "—",
  hg: "25,07",
  ha: "0,00",
  pct: "0,00%",
  mgd: "—",
  mad: "—",
  vt: "R$0,00"
}, {
  cid: "Juiz de Fora",
  sub: "Duda",
  email: "420002019025",
  code: "VZEAE7WC",
  tam: "P",
  qtd: 1,
  ap: "—",
  nome: "Emanuelle",
  bairro: "—",
  ocup: "—",
  ramo: "—",
  ata: "—",
  status: "Em Andamento",
  mg: 225,
  ma: 0,
  fs: "—",
  vh: "R$10,00",
  tarefa: "—",
  desc: "—",
  dias: "—",
  hg: "3,75",
  ha: "0,00",
  pct: "0,00%",
  mgd: "—",
  mad: "—",
  vt: "R$0,00"
}, {
  cid: "Juiz de Fora",
  sub: "Admin",
  email: "420000774371",
  code: "VZEAE7WC",
  tam: "—",
  qtd: "—",
  ap: "—",
  nome: "Lucas Gasparetto",
  bairro: "—",
  ocup: "Estudante",
  ramo: "Psicologia e C. de Dados",
  ata: "—",
  status: "Em Andamento",
  mg: 60,
  ma: 0,
  fs: 2,
  vh: "R$10,00",
  tarefa: "Lavar a Louça",
  desc: "—",
  dias: 1,
  hg: "1,00",
  ha: "0,00",
  pct: "0,00%",
  mgd: "1,00",
  mad: "0,00",
  vt: "R$0,00"
}, {
  cid: "Juiz de Fora",
  sub: "Gasparetto",
  email: "420008719277",
  code: "VZEAE7WC",
  tam: "P",
  qtd: 2,
  ap: "—",
  nome: "Penelope Lava a Jato",
  bairro: "Democrata",
  ocup: "Empresário(a)",
  ramo: "Lava a Jato",
  ata: "—",
  status: "Aguardando equipamento",
  mg: 0,
  ma: 0,
  fs: "—",
  vh: "—",
  tarefa: "—",
  desc: "—",
  dias: "—",
  hg: "0,00",
  ha: "0,00",
  pct: "—",
  mgd: "—",
  mad: "—",
  vt: "R$0,00"
}];
function PlanilhaScreen({
  scope
}) {
  const st = useStore();
  const [, force] = React.useReducer(x => x + 1, 0);
  const [edit, setEdit] = React.useState(null); // {i}
  const isSub = scope === "subleader";
  const SUB = "Gasparetto"; // sublíder logado no mock
  const rows = isSub ? PLAN_ROWS.filter(r => r.sub === SUB) : PLAN_ROWS;
  const cell = (w, v, opts = {}) => /*#__PURE__*/React.createElement("div", {
    style: {
      width: w,
      flex: "none",
      padding: "11px 12px",
      fontSize: 12.5,
      color: opts.c || "var(--ink)",
      fontWeight: opts.b ? 500 : 400,
      borderRight: "1px solid var(--line2)",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, v);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 0 96px"
    }
  }, /*#__PURE__*/React.createElement(ScreenHeader, {
    eyebrow: isSub ? "Minha linha · JF" : "Acompanhamento Geral · JF",
    title: "Planilha"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 20px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      margin: "-6px 0 14px",
      fontSize: 11.5,
      color: "var(--faint)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "var(--pillar-predict)"
    }
  }), " ", isSub ? "Você vê só a sua parte — conectada ao app em tempo real" : "Espelho da planilha oficial — conectado a todo o app"), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: "auto",
      border: "1px solid var(--line)",
      borderRadius: "var(--r-sm)",
      background: "var(--surface)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: PLAN_COLS.reduce((s, c) => s + c[1], 0) + 44
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      background: "var(--card)",
      borderBottom: "1px solid var(--line)",
      position: "sticky",
      top: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      flex: "none"
    }
  }), PLAN_COLS.map(([l, w]) => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: {
      width: w,
      flex: "none",
      padding: "10px 12px",
      fontSize: 10.5,
      fontWeight: 500,
      letterSpacing: ".04em",
      textTransform: "uppercase",
      color: "var(--faint)",
      borderRight: "1px solid var(--line2)",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, l))), rows.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      borderBottom: i < rows.length - 1 ? "1px solid var(--line2)" : "none",
      background: r._editedBy ? "var(--accent-soft)" : "transparent"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setEdit(r),
    "aria-label": "Editar linha",
    style: {
      width: 44,
      flex: "none",
      border: "none",
      background: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRight: "1px solid var(--line2)"
    }
  }, /*#__PURE__*/React.createElement(CX.Icon, {
    name: "edit",
    size: 15,
    color: "var(--faint)"
  })), cell(92, r.cid), cell(92, r.sub, {
    c: "var(--muted)"
  }), cell(108, r.email, {
    c: "var(--faint)"
  }), cell(78, r.code, {
    c: "var(--faint)"
  }), cell(96, r.tam), cell(62, r.qtd), cell(90, r.ap), cell(150, r.nome, {
    b: true
  }), cell(88, r.bairro, {
    c: "var(--muted)"
  }), cell(108, r.ocup, {
    c: "var(--muted)"
  }), cell(118, r.ramo, {
    c: "var(--muted)"
  }), cell(52, r.ata, {
    c: r.ata === "Sim" ? "var(--accent-ink)" : "var(--faint)"
  }), cell(122, r.status, {
    c: r.status === "Encerrado" ? "var(--warn)" : "var(--ink)"
  }), cell(100, r.mg, {
    b: true
  }), cell(104, r.ma), cell(84, r.fs), cell(78, r.vh), cell(130, r.tarefa, {
    c: "var(--muted)"
  }), cell(84, r.desc, {
    c: r.desc !== "—" ? "var(--warn)" : "var(--faint)"
  }), cell(52, r.dias), cell(84, r.hg, {
    b: true
  }), cell(88, r.ha), cell(70, r.pct, {
    c: r.pct === "0,00%" ? "var(--warn)" : "var(--ink)"
  }), cell(96, r.mgd, {
    c: "var(--muted)"
  }), cell(100, r.mad, {
    c: "var(--muted)"
  }), cell(96, r.vt, {
    b: true,
    c: r.vt === "R$0,00" ? "var(--faint)" : "var(--accent-ink)"
  }))))), rows.some(r => r._editedBy) && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      display: "flex",
      flexDirection: "column",
      gap: 6
    }
  }, rows.filter(r => r._editedBy).map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      fontSize: 11.5,
      color: "var(--muted)",
      display: "flex",
      alignItems: "center",
      gap: 7
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "var(--accent)"
    }
  }), /*#__PURE__*/React.createElement("b", {
    style: {
      fontWeight: 500,
      color: "var(--ink)"
    }
  }, r.nome), " editado por ", r._editedBy, " \xB7 ", r._editedAt))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--faint)",
      lineHeight: 1.5,
      padding: "12px 2px 0"
    }
  }, isSub ? "Só a sua linha aparece; o líder geral vê todas." : "Todas as linhas. Toque no lápis pra editar — fica registrado quem editou.", " \xC9 s\xF3 pra apoiar a migra\xE7\xE3o da planilha pro app.")), edit && /*#__PURE__*/React.createElement(PlanEditSheet, {
    row: edit,
    who: isSub ? "Gasparetto (sublíder)" : "Líder Geral",
    onClose: () => setEdit(null),
    onSave: () => {
      force();
      setEdit(null);
    }
  }));
}
window.PlanilhaScreen = PlanilhaScreen;
function PlanEditSheet({
  row,
  who,
  onClose,
  onSave
}) {
  const [mg, setMg] = React.useState(row.mg);
  const [status, setStatus] = React.useState(row.status);
  const [ata, setAta] = React.useState(row.ata);
  const inp = {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 12,
    border: "1px solid var(--line)",
    background: "var(--surface)",
    fontFamily: "var(--font-sans)",
    fontSize: 14.5,
    color: "var(--ink)",
    marginBottom: 16,
    boxSizing: "border-box"
  };
  return /*#__PURE__*/React.createElement(window.Sheet, {
    open: true,
    onClose: onClose,
    title: "Editar — " + row.nome
  }, /*#__PURE__*/React.createElement(window.SheetLabel, null, "Minutos gravados"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: mg,
    onChange: e => setMg(Number(e.target.value)),
    style: inp
  }), /*#__PURE__*/React.createElement(window.SheetLabel, null, "Status das tasks"), /*#__PURE__*/React.createElement("input", {
    value: status,
    onChange: e => setStatus(e.target.value),
    style: inp
  }), /*#__PURE__*/React.createElement(window.SheetLabel, null, "Ata assinada"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement(window.Seg, {
    options: [["Sim", "Sim"], ["—", "Não"]],
    value: ata,
    set: setAta
  })), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      row.mg = mg;
      row.hg = (mg / 60).toFixed(2).replace(".", ",");
      row.status = status;
      row.ata = ata;
      row._editedBy = who;
      row._editedAt = "agora";
      onSave();
    },
    style: {
      width: "100%",
      padding: "14px 0",
      borderRadius: 999,
      border: "none",
      background: "var(--ink)",
      color: "#fff",
      cursor: "pointer",
      fontFamily: "var(--font-sans)",
      fontSize: 15,
      fontWeight: 460
    }
  }, "Salvar altera\xE7\xE3o"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--faint)",
      textAlign: "center",
      marginTop: 12,
      lineHeight: 1.5
    }
  }, "Fica registrado que ", /*#__PURE__*/React.createElement("b", null, who), " editou. A mudan\xE7a reflete no app tamb\xE9m."));
}

// Guia passo a passo por papel — tela independente, fechável, mostra cada função.
const GUIA = {
  membro: {
    title: "Guia do Membro",
    steps: [["Início", "Veja suas baterias de horas (semana e ciclo), o pagamento do ciclo e a previsão de meta."], ["Novo registro", "Registre o que gravou no Minute: duração, tarefa do seu nicho e o equipamento usado."], ["Gravações", "Acompanhe o status de cada envio — pendente, aprovado ou reprovado."], ["Metas", "Sua meta é definida pelo sublíder (base 100h). Veja ranking e selos."], ["Equipamentos", "Cadastre e mantenha seu capacete e celular; aceite os termos LGPD."], ["Perfil", "Cadastre o código que o sublíder te passou e veja seus dados."]]
  },
  subleader: {
    title: "Guia do Sublíder",
    steps: [["Pessoas", "Painel da equipe: metas em bateria, quem está atrasado e ciclos fechando."], ["Kanban", "Prospecção (lista ou kanban), membros ativos e histórico de ações."], ["Equipamentos", "Controle da equipe, filtro por empresa/autônomo, reserva e insights."], ["Metas", "Defina metas por pessoa e crie gamificações por empresa ou autônomo."], ["Financeiro", "Quem já recebeu, valores, período e previsão do ciclo."], ["Relatório", "Pilares (quantidade, previsibilidade, qualidade) com números reais."]]
  },
  lider: {
    title: "Guia do Líder Geral",
    steps: [["Cidade", "Consolidado de todos os sublíderes: baterias, pilares e rollup."], ["Pessoas / Métricas", "Abra cada sublíder e cada membro, empresa ou autônomo, com dados reais."], ["Equipamentos", "Inventário central: totais editáveis, disponibilidade, reservas e relatório."], ["Financeiro", "Controle geral de pagamentos e previsões de toda a cidade."], ["Planilha", "Espelho da planilha oficial, sincronizado com o app."], ["LGPD", "Consentimentos e termos de toda a operação."]]
  }
};
function GuiaScreen({
  role,
  onClose
}) {
  const g = GUIA[role] || GUIA.membro;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      zIndex: 47,
      background: "var(--bg)",
      display: "flex",
      flexDirection: "column",
      fontFamily: "var(--font-sans)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "52px 20px 14px"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Fechar",
    style: {
      width: 34,
      height: 34,
      borderRadius: "50%",
      border: "1px solid var(--line)",
      background: "var(--surface)",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement(CX.Icon, {
    name: "x",
    size: 17,
    color: "var(--muted)"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      fontWeight: 500,
      letterSpacing: ".13em",
      textTransform: "uppercase",
      color: "var(--faint)"
    }
  }, "Passo a passo"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 20,
      fontWeight: 500,
      letterSpacing: "-.02em",
      color: "var(--ink)"
    }
  }, g.title))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: "auto",
      padding: "6px 20px 28px",
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, g.steps.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      gap: 13,
      background: "var(--surface)",
      border: "1px solid var(--line)",
      borderRadius: "var(--r-sm)",
      padding: "15px 16px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 26,
      height: 26,
      borderRadius: "50%",
      background: "var(--ink)",
      color: "#fff",
      flex: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 12.5,
      fontWeight: 500
    }
  }, i + 1), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 500,
      letterSpacing: "-.015em",
      color: "var(--ink)"
    }
  }, s[0]), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      color: "var(--ink2)",
      lineHeight: 1.5,
      marginTop: 3
    }
  }, s[1]))))));
}
window.GuiaScreen = GuiaScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/clonex_app/LeaderExtra.jsx", error: String((e && e.message) || e) }); }

// ui_kits/clonex_app/LeaderScreens.jsx
try { (() => {
// Clonex JF — Líder Geral (organizador de tudo). Controle geral acima dos
// sublíderes: cidade, todas as pessoas, equipamentos (com dono + sublíder +
// vínculo), consentimento/LGPD, métricas dos 3 pilares e relatório geral.
// Tudo com histórico de origem (toque em qualquer card).
const CL = window.ClonexDesignSystem_ca55ab;
const _LR = typeof window !== "undefined" && window.__resources || {};
const EQ_SRC = {
  capacete: _LR.capacete || "../../assets/equip-capacete.png",
  celular: _LR.celular || "../../assets/equip-celular.png"
};
function EqIcon({
  tipo,
  size = 22
}) {
  return /*#__PURE__*/React.createElement("img", {
    src: EQ_SRC[tipo],
    alt: tipo,
    style: {
      width: size,
      height: size,
      objectFit: "contain",
      flex: "none",
      verticalAlign: "middle"
    }
  });
}
const EQ_WORD = {
  capacete: "Capacete",
  celular: "Celular"
};

// Todas as pessoas da cidade, de todos os sublíderes, com vínculo e equipamento.
const ALL_PEOPLE = [{
  name: "Rafael Diniz",
  jornada: "full",
  devOwner: "proprio",
  sub: "Você (JF-1)",
  tipo: "empresa",
  empresa: "Construtora Vale",
  horas: 48,
  aprov: 82,
  env: 94,
  apr: 77,
  dias: "3/5",
  pillar: "quantity",
  equip: ["capacete", "celular"]
}, {
  name: "Bruno Sales",
  jornada: "part",
  devOwner: "proprio",
  sub: "Você (JF-1)",
  tipo: "empresa",
  empresa: "Construtora Vale",
  horas: 55,
  aprov: 71,
  env: 80,
  apr: 57,
  dias: "4/5",
  pillar: "quality",
  equip: ["capacete", "celular"]
}, {
  name: "Camila Ferraz",
  jornada: "full",
  devOwner: "clonex",
  sub: "Você (JF-1)",
  tipo: "empresa",
  empresa: "Construtora Vale",
  horas: 76,
  aprov: 95,
  env: 120,
  apr: 114,
  dias: "5/5",
  equip: ["capacete", "celular"]
}, {
  name: "Elaine Costa",
  jornada: "part",
  devOwner: "clonex",
  sub: "Você (JF-1)",
  tipo: "autonomo",
  empresa: null,
  horas: 63,
  aprov: 88,
  env: 66,
  apr: 58,
  dias: "2/5",
  pillar: "predict",
  equip: ["capacete"]
}, {
  name: "Jonas Prado",
  jornada: "full",
  devOwner: "proprio",
  sub: "Você (JF-1)",
  tipo: "autonomo",
  empresa: null,
  horas: 84,
  aprov: 90,
  env: 100,
  apr: 90,
  dias: "5/5",
  equip: ["celular"]
}, {
  name: "Sônia Braga",
  jornada: "part",
  devOwner: "clonex",
  sub: "Marina Alves (JF-2)",
  tipo: "empresa",
  empresa: "Padaria Central",
  horas: 92,
  aprov: 93,
  env: 130,
  apr: 121,
  dias: "5/5",
  equip: ["capacete", "celular"]
}, {
  name: "Igor Menezes",
  jornada: "part",
  devOwner: "clonex",
  sub: "Marina Alves (JF-2)",
  tipo: "empresa",
  empresa: "Padaria Central",
  horas: 80,
  aprov: 89,
  env: 110,
  apr: 98,
  dias: "5/5",
  equip: ["capacete", "celular"]
}, {
  name: "Paula Reis",
  jornada: "part",
  devOwner: "proprio",
  sub: "Marina Alves (JF-2)",
  tipo: "autonomo",
  empresa: null,
  horas: 74,
  aprov: 90,
  env: 90,
  apr: 81,
  dias: "4/5",
  equip: ["capacete", "celular"]
}, {
  name: "Téo Lima",
  jornada: "part",
  devOwner: "proprio",
  sub: "Diego Ramos (JF-3)",
  tipo: "autonomo",
  empresa: null,
  horas: 41,
  aprov: 74,
  env: 62,
  apr: 46,
  dias: "2/5",
  pillar: "predict",
  equip: ["celular"]
}, {
  name: "Rita Alves",
  jornada: "part",
  devOwner: "proprio",
  sub: "Diego Ramos (JF-3)",
  tipo: "empresa",
  empresa: "Lava-jato Norte",
  horas: 52,
  aprov: 78,
  env: 70,
  apr: 55,
  dias: "3/5",
  equip: ["capacete", "celular"]
}];
window.CLONEX_ALL_PEOPLE = ALL_PEOPLE;
function chip(tipo, empresa) {
  const isE = tipo === "empresa";
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 480,
      padding: "3px 10px",
      borderRadius: 999,
      background: isE ? "var(--accent-soft)" : "var(--card)",
      color: isE ? "var(--accent-ink)" : "var(--muted)"
    }
  }, isE ? empresa : "Autônomo");
}

// ---- Cidade (relatório agregado) -----------------------------------------
function LeaderReport() {
  const {
    Card,
    Battery,
    PillarDot,
    Icon
  } = CL;
  const roll = window.SUBLIDER_ROLLUP;
  const horas = roll.reduce((s, r) => s + r.horas, 0);
  const meta = roll.reduce((s, r) => s + r.meta, 0);
  const pessoas = roll.reduce((s, r) => s + r.pessoas, 0);
  const aprovMed = Math.round(roll.reduce((s, r) => s + r.aprov, 0) / roll.length);
  const monthPct = Math.round(horas / meta * 100);
  const weekPct = Math.round(monthPct * 0.62);
  const weekDone = Math.round(horas * 0.24),
    weekGoal = Math.round(meta * 0.25);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 0 96px"
    }
  }, /*#__PURE__*/React.createElement(ScreenHeader, {
    eyebrow: "L\xEDder Geral \xB7 JF \xB7 Agosto",
    title: "Cidade"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 20px",
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      margin: "-6px 0 0",
      fontSize: 11.5,
      color: "var(--faint)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "var(--pillar-predict)"
    }
  }), " Controle geral \xB7 ", roll.length, " subl\xEDderes \xB7 ", pessoas, " pessoas"), /*#__PURE__*/React.createElement(Card, {
    variant: "white",
    pad: 20
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      fontWeight: 500,
      letterSpacing: ".13em",
      textTransform: "uppercase",
      color: "var(--faint)",
      marginBottom: 14
    }
  }, "Meta da cidade"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 22
    }
  }, /*#__PURE__*/React.createElement(Battery, {
    label: "Semana",
    percent: weekPct,
    doneH: weekDone,
    goalH: weekGoal,
    tone: weekPct < 60 ? "warn" : "accent"
  }), /*#__PURE__*/React.createElement(Battery, {
    label: "M\xEAs",
    percent: monthPct,
    doneH: horas,
    goalH: meta,
    tone: monthPct < 60 ? "warn" : "accent"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement(SourceButton, {
    payload: {
      title: "Meta da cidade",
      value: horas + "h de " + meta + "h",
      origin: "Soma das equipes de todos os sublíderes de JF",
      updated: "há poucos segundos",
      history: roll.map(r => ({
        what: r.name + " · " + r.horas + "h",
        when: "mês"
      }))
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 10
    }
  }, [[pessoas, "pessoas"], [horas + "h", "no mês"], [aprovMed + "%", "aprovação"]].map(([n, l], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      background: "var(--card)",
      border: "1px solid var(--line2)",
      borderRadius: 14,
      padding: "14px 14px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 20,
      fontWeight: 520,
      letterSpacing: "-.02em",
      color: "var(--ink)"
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: "var(--faint)",
      marginTop: 3,
      lineHeight: 1.3
    }
  }, l)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      fontWeight: 500,
      letterSpacing: ".13em",
      textTransform: "uppercase",
      color: "var(--faint)",
      margin: "4px 2px 10px",
      display: "flex",
      alignItems: "center",
      gap: 7
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: "50%",
      background: "var(--pillar-quantity)"
    }
  }), "Equipamentos"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 10
    }
  }, [[4, "capacetes disponíveis", "cap"], [7, "em uso · Full-time", "ftuso"], [3, "em uso · Part-time", "ptuso"]].map(([n, l, key], i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    onClick: () => openSource({
      title: l,
      value: n + " itens",
      origin: "Inventário consolidado de JF",
      updated: "há poucos segundos",
      history: window.SUBLIDER_ROLLUP.map(r => ({
        what: r.name + " · " + r.capacetes + " cap · " + r.celulares + " cel",
        when: "inventário"
      }))
    }),
    style: {
      background: "var(--card)",
      border: "1px solid var(--line2)",
      borderRadius: 14,
      padding: "14px 13px",
      cursor: "pointer",
      textAlign: "left",
      fontFamily: "var(--font-sans)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: 520,
      letterSpacing: "-.02em",
      color: "var(--ink)"
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "var(--faint)",
      marginTop: 3,
      lineHeight: 1.3
    }
  }, l))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      fontWeight: 500,
      letterSpacing: ".13em",
      textTransform: "uppercase",
      color: "var(--faint)",
      margin: "4px 2px 10px",
      display: "flex",
      alignItems: "center",
      gap: 7
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: "50%",
      background: "var(--pillar-quantity)"
    }
  }), "Pessoas"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, [["Full-time · celular próprio", 5, "proprio"], ["Full-time · celular da Clonex", 6, "clonex"], ["Part-time operando", 3, "part"], ["Precisam de celular (Full-time)", 2, "sem", true]].map(([l, n, key, warn], i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    onClick: () => openSource({
      title: l,
      value: n + " pessoas",
      origin: "Consolidado das equipes de JF",
      updated: "há poucos segundos",
      history: key === "sem" ? [{
        what: "Rafael Diniz · Você (JF-1) · solicitou reserva",
        when: "hoje"
      }, {
        what: "Ana Tarsila · Marina Alves (JF-2) · aguardando",
        when: "ontem"
      }] : window.CLONEX_ALL_PEOPLE.filter(p => key === "part" ? p.jornada === "part" : p.jornada === "full" && p.devOwner === key).slice(0, 6).map(p => ({
        what: p.name + " · " + p.sub,
        when: p.horas + "h"
      }))
    }),
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: warn ? "var(--warn-soft)" : "var(--surface)",
      border: "1px solid " + (warn ? "var(--warn-line)" : "var(--line)"),
      borderRadius: 12,
      padding: "12px 15px",
      cursor: "pointer",
      fontFamily: "var(--font-sans)",
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13.5,
      color: warn ? "var(--warn-ink)" : "var(--ink)",
      display: "flex",
      alignItems: "center",
      gap: 7
    }
  }, l, /*#__PURE__*/React.createElement(Icon, {
    name: "chevronRight",
    size: 13,
    color: "var(--faint)"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      fontWeight: 520,
      letterSpacing: "-.02em",
      color: warn ? "var(--warn)" : "var(--ink)"
    }
  }, n))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--accent-soft)",
      border: "1px solid var(--accent-line)",
      borderRadius: 14,
      padding: "16px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 500,
      letterSpacing: ".1em",
      textTransform: "uppercase",
      color: "var(--accent-ink)",
      marginBottom: 8,
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "var(--pillar-quality)"
    }
  }), "Compliance"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 26,
      fontWeight: 520,
      letterSpacing: "-.02em",
      color: "var(--accent-ink)"
    }
  }, "82%"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: "var(--accent-ink)",
      marginTop: 3
    }
  }, "termos assinados")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--card)",
      border: "1px solid var(--line2)",
      borderRadius: 14,
      padding: "16px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 500,
      letterSpacing: ".1em",
      textTransform: "uppercase",
      color: "var(--muted)",
      marginBottom: 8,
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "var(--pillar-predict)"
    }
  }), "Prospec\xE7\xE3o"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 26,
      fontWeight: 520,
      letterSpacing: "-.02em",
      color: "var(--ink)"
    }
  }, "7"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: "var(--faint)",
      marginTop: 3
    }
  }, "novos neg\xF3cios \xB7 ~180h estim."))), /*#__PURE__*/React.createElement("button", {
    onClick: () => openSource({
      title: "Resumo da cidade",
      value: horas + "h · " + pessoas + " pessoas",
      origin: "Consolidado pronto pra enviar",
      updated: "há poucos segundos",
      history: [{
        what: "Equipamentos: 4 livres · 7 FT · 3 PT",
        when: "agora"
      }, {
        what: "Pessoas: 5 próprio · 6 Clonex · 3 PT · 2 sem celular",
        when: "agora"
      }, {
        what: "Compliance: 82% termos assinados",
        when: "agora"
      }, {
        what: "Prospecção: 7 negócios · ~180h",
        when: "próxima semana"
      }]
    }),
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      width: "100%",
      padding: "13px 0",
      borderRadius: 999,
      border: "none",
      cursor: "pointer",
      background: "var(--ink)",
      color: "#fff",
      fontFamily: "var(--font-sans)",
      fontSize: 14,
      fontWeight: 460
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "report",
    size: 16,
    color: "#fff"
  }), " Copiar resumo"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      fontWeight: 500,
      letterSpacing: ".13em",
      textTransform: "uppercase",
      color: "var(--faint)",
      margin: "4px 2px 10px"
    }
  }, "Por subl\xEDder"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 11
    }
  }, roll.map(r => {
    const pct = Math.round(r.horas / r.meta * 100);
    return /*#__PURE__*/React.createElement("button", {
      key: r.name,
      onClick: () => openSource({
        title: r.name,
        value: r.horas + "h de " + r.meta + "h",
        origin: "Equipe de " + r.name + " · " + r.pessoas + " pessoas",
        updated: "há poucos segundos",
        history: [{
          what: r.ativos + " ativos de " + r.pessoas,
          when: "hoje"
        }, {
          what: r.aprov + "% de aprovação",
          when: "mês"
        }, {
          what: "Previsibilidade " + r.predict,
          when: "semana"
        }, {
          what: r.capacetes + " capacetes · " + r.celulares + " celulares",
          when: "inventário"
        }]
      }),
      style: {
        display: "block",
        width: "100%",
        textAlign: "left",
        cursor: "pointer",
        background: "var(--surface)",
        border: "1px solid var(--line)",
        borderRadius: "var(--r-sm)",
        padding: 16,
        fontFamily: "var(--font-sans)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: 12
      }
    }, r.pillar && /*#__PURE__*/React.createElement(PillarDot, {
      pillar: r.pillar,
      size: 7
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15,
        fontWeight: 500,
        letterSpacing: "-.018em",
        color: "var(--ink)"
      }
    }, r.name), /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: "auto",
        fontSize: 11.5,
        color: "var(--faint)"
      }
    }, r.pessoas, " pessoas"), /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "chevronRight",
      size: 16,
      color: "var(--faint)"
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 8,
        borderRadius: 999,
        background: "var(--track-progress)",
        overflow: "hidden",
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: pct + "%",
        height: "100%",
        borderRadius: 999,
        background: pct < 60 ? "var(--warn)" : "var(--accent)"
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 14,
        fontSize: 12,
        color: "var(--muted)"
      }
    }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", {
      style: {
        color: "var(--ink)",
        fontWeight: 500
      }
    }, r.horas, "h"), " / ", r.meta, "h"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", {
      style: {
        color: "var(--ink)",
        fontWeight: 500
      }
    }, r.aprov, "%"), " aprov."), /*#__PURE__*/React.createElement("span", null, "prev. ", /*#__PURE__*/React.createElement("b", {
      style: {
        color: "var(--ink)",
        fontWeight: 500
      }
    }, r.predict))));
  })))));
}
window.LeaderReport = LeaderReport;

// ---- Pessoas (todas, com sublíder + vínculo) ------------------------------
function LeaderPeople() {
  const {
    Icon
  } = CL;
  const [f, setF] = React.useState("todos");
  const [fj, setFj] = React.useState("todos");
  let list = ALL_PEOPLE;
  if (f === "empresa") list = ALL_PEOPLE.filter(p => p.tipo === "empresa");
  if (f === "autonomo") list = ALL_PEOPLE.filter(p => p.tipo === "autonomo");
  if (fj !== "todos") list = list.filter(p => p.jornada === fj);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 0 96px"
    }
  }, /*#__PURE__*/React.createElement(ScreenHeader, {
    eyebrow: "L\xEDder Geral \xB7 JF",
    title: "Pessoas"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 20px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 8
    }
  }, [["todos", "Todos"], ["empresa", "Empresa"], ["autonomo", "Autônomo"]].map(([k, l]) => /*#__PURE__*/React.createElement("button", {
    key: k,
    onClick: () => setF(k),
    style: {
      padding: "8px 15px",
      borderRadius: 999,
      cursor: "pointer",
      border: "1px solid " + (f === k ? "var(--ink)" : "var(--line)"),
      background: f === k ? "var(--ink)" : "transparent",
      color: f === k ? "#fff" : "var(--muted)",
      fontFamily: "var(--font-sans)",
      fontSize: 13,
      fontWeight: 460
    }
  }, l))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 14
    }
  }, [["todos", "Jornada: todas"], ["full", "Full-time"], ["part", "Part-time"]].map(([k, l]) => {
    const n = k === "todos" ? null : ALL_PEOPLE.filter(p => (f === "todos" || p.tipo === f) && p.jornada === k).length;
    return /*#__PURE__*/React.createElement("button", {
      key: k,
      onClick: () => setFj(k),
      style: {
        padding: "8px 14px",
        borderRadius: 999,
        cursor: "pointer",
        border: "1px solid " + (fj === k ? "var(--accent)" : "var(--line)"),
        background: fj === k ? "var(--accent-soft)" : "transparent",
        color: fj === k ? "var(--accent-ink)" : "var(--muted)",
        fontFamily: "var(--font-sans)",
        fontSize: 12.5,
        fontWeight: 460
      }
    }, l, n != null ? " · " + n : "");
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, list.map(p => /*#__PURE__*/React.createElement("button", {
    key: p.name,
    onClick: () => openSource({
      title: p.name,
      value: p.horas + "h no mês",
      origin: "Sublíder " + p.sub + " · " + (p.tipo === "empresa" ? p.empresa : "Autônomo"),
      updated: "há poucos segundos",
      history: [{
        what: p.horas + "h gravadas",
        when: "mês"
      }, {
        what: p.aprov + "% aprovado",
        when: "mês"
      }, {
        what: "Equipamento: " + p.equip.map(e => EQ_WORD[e]).join(" + "),
        when: "cadastro"
      }, {
        what: "Vínculo: " + (p.tipo === "empresa" ? p.empresa : "Autônomo"),
        when: "cadastro"
      }]
    }),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      width: "100%",
      textAlign: "left",
      cursor: "pointer",
      background: "var(--surface)",
      border: "1px solid var(--line)",
      borderRadius: "var(--r-sm)",
      padding: "14px 15px",
      fontFamily: "var(--font-sans)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 38,
      height: 38,
      borderRadius: "50%",
      background: "var(--ink)",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 500,
      fontSize: 14,
      flex: "none"
    }
  }, p.name[0]), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 7
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14.5,
      fontWeight: 500,
      letterSpacing: "-.018em",
      color: "var(--ink)"
    }
  }, p.name), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      gap: 3
    }
  }, p.equip.map(e => /*#__PURE__*/React.createElement(EqIcon, {
    key: e,
    tipo: e,
    size: 18
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 7,
      marginTop: 5
    }
  }, chip(p.tipo, p.empresa), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10.5,
      fontWeight: 480,
      padding: "2px 8px",
      borderRadius: 999,
      background: p.jornada === "full" ? "var(--accent-soft)" : "var(--card)",
      color: p.jornada === "full" ? "var(--accent-ink)" : "var(--muted)"
    }
  }, p.jornada === "full" ? "Full-time" : "Part-time"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      color: "var(--faint)"
    }
  }, p.sub))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "right",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 500,
      letterSpacing: "-.02em",
      color: "var(--ink)"
    }
  }, p.horas, "h"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: "var(--faint)"
    }
  }, p.aprov, "%")), /*#__PURE__*/React.createElement(Icon, {
    name: "chevronRight",
    size: 16,
    color: "var(--faint)"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--faint)",
      lineHeight: 1.5,
      padding: "12px 2px 0"
    }
  }, "Toda a cidade num lugar. Toque numa pessoa pra ver de onde vem cada n\xFAmero, o subl\xEDder e o v\xEDnculo.")));
}
window.LeaderPeople = LeaderPeople;

// ---- Equipamentos (com dono, sublíder e vínculo) --------------------------
function LeaderEquip() {
  const st = useStore();
  const {
    Card
  } = CL;
  const pt = st.poolTotals();
  const items = ALL_PEOPLE.flatMap(p => p.equip.map(e => ({
    tipo: e,
    dono: p.name,
    sub: p.sub,
    tipoV: p.tipo,
    empresa: p.empresa
  })));
  const cap = pt.cap;
  const cel = pt.cel;
  const [f, setF] = React.useState("todos");
  const [addOpen, setAddOpen] = React.useState(false);
  const [showRep, setShowRep] = React.useState(false);
  const totBtn = {
    width: 30,
    height: 30,
    borderRadius: 8,
    border: "1px solid var(--line)",
    background: "var(--surface)",
    cursor: "pointer",
    fontSize: 16,
    color: "var(--ink)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 1,
    fontFamily: "var(--font-sans)",
    flex: "none"
  };
  const totCtl = (tipo, val) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: totBtn,
    onClick: () => st.setPoolTotal(tipo, val - 1)
  }, "\u2212"), /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: 34,
      textAlign: "center",
      fontSize: 15,
      fontWeight: 520,
      color: "var(--ink)"
    }
  }, val), /*#__PURE__*/React.createElement("button", {
    style: totBtn,
    onClick: () => st.setPoolTotal(tipo, val + 1)
  }, "+"));
  const list = f === "todos" ? items : items.filter(i => i.tipo === f);
  const statusCell = (label, uso, disp, sol) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 0,
      marginTop: 12,
      borderRadius: 12,
      overflow: "hidden",
      border: "1px solid var(--line2)"
    }
  }, [["em uso", uso, "var(--ink)"], ["disponíveis", disp, "var(--accent)"], ["reserva", sol, "var(--warn)"]].map(([l, n, c], i) => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: {
      flex: 1,
      padding: "10px 8px",
      textAlign: "center",
      borderLeft: i ? "1px solid var(--line2)" : "none",
      background: "var(--surface)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 520,
      letterSpacing: "-.02em",
      color: c
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10.5,
      color: "var(--faint)",
      marginTop: 2
    }
  }, l))));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 0 96px"
    }
  }, /*#__PURE__*/React.createElement(ScreenHeader, {
    eyebrow: "L\xEDder Geral \xB7 JF",
    title: "Equipamentos",
    right: /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setShowRep(v => !v),
      "aria-label": "Relat\xF3rio",
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        border: "1px solid var(--line)",
        background: showRep ? "var(--ink)" : "var(--surface)",
        borderRadius: 999,
        padding: "6px 12px",
        cursor: "pointer",
        color: showRep ? "#fff" : "var(--ink)",
        fontFamily: "var(--font-sans)",
        fontSize: 12.5,
        fontWeight: 460
      }
    }, "Relat\xF3rio"), /*#__PURE__*/React.createElement("button", {
      onClick: () => setAddOpen(true),
      "aria-label": "Cadastrar no estoque",
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        border: "1px solid var(--line)",
        background: "var(--surface)",
        borderRadius: 999,
        padding: "6px 12px",
        cursor: "pointer",
        color: "var(--ink)",
        fontFamily: "var(--font-sans)",
        fontSize: 12.5,
        fontWeight: 460
      }
    }, "+ Estoque"))
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 20px"
    }
  }, showRep && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 8
    }
  }, React.createElement(window.EquipReport, {
    role: "lider"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      fontWeight: 500,
      letterSpacing: ".13em",
      textTransform: "uppercase",
      color: "var(--faint)",
      margin: "0 2px 10px"
    }
  }, "Totais oficiais \xB7 edit\xE1vel"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      gap: 10,
      background: "var(--card)",
      border: "1px solid var(--line2)",
      borderRadius: 14,
      padding: "12px 14px"
    }
  }, /*#__PURE__*/React.createElement(EqIcon, {
    tipo: "capacete",
    size: 26
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 13,
      color: "var(--muted)"
    }
  }, "Capacetes"), totCtl("capacete", st.capTotal))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      gap: 10,
      background: "var(--card)",
      border: "1px solid var(--line2)",
      borderRadius: 14,
      padding: "12px 14px"
    }
  }, /*#__PURE__*/React.createElement(EqIcon, {
    tipo: "celular",
    size: 26
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 13,
      color: "var(--muted)"
    }
  }, "Celulares"), totCtl("celular", st.celTotal))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      fontWeight: 500,
      letterSpacing: ".13em",
      textTransform: "uppercase",
      color: "var(--faint)",
      margin: "0 2px 10px"
    }
  }, "Controle de invent\xE1rio"), /*#__PURE__*/React.createElement(Card, {
    pad: 16,
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(EqIcon, {
    tipo: "capacete",
    size: 30
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14.5,
      fontWeight: 500,
      color: "var(--ink)"
    }
  }, "Capacetes"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: "var(--faint)"
    }
  }, pt.cap, " no total"))), statusCell("cap", pt.capUso, pt.capDisp, pt.capSol)), /*#__PURE__*/React.createElement(Card, {
    pad: 16,
    style: {
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(EqIcon, {
    tipo: "celular",
    size: 30
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14.5,
      fontWeight: 500,
      color: "var(--ink)"
    }
  }, "Celulares"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: "var(--faint)"
    }
  }, pt.cel, " no total"))), statusCell("cel", pt.celUso, pt.celDisp, pt.celSol)), pt.sol > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      fontWeight: 500,
      letterSpacing: ".13em",
      textTransform: "uppercase",
      color: "var(--faint)",
      margin: "0 2px 10px"
    }
  }, "Reservas solicitadas \xB7 ", pt.sol), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, st.pool.filter(p => p.status === "solicitado").map(p => /*#__PURE__*/React.createElement("div", {
    key: p.id,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      background: "var(--surface)",
      border: "1px solid var(--warn-line)",
      borderRadius: "var(--r-sm)",
      padding: "12px 15px"
    }
  }, /*#__PURE__*/React.createElement(EqIcon, {
    tipo: p.tipo,
    size: 26
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 460,
      color: "var(--ink)"
    }
  }, p.tipo === "capacete" ? "Capacete" : "Celular", p.modelo ? " · " + p.modelo : ""), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: "var(--faint)",
      marginTop: 2
    }
  }, "pedido por ", p.sub)), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      p.status = "em_uso";
      st.emit();
    },
    style: {
      fontSize: 12.5,
      fontWeight: 460,
      padding: "7px 13px",
      borderRadius: 999,
      border: "none",
      background: "var(--ink)",
      color: "#fff",
      cursor: "pointer",
      fontFamily: "var(--font-sans)",
      flex: "none"
    }
  }, "Liberar"))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(2,1fr)",
      gap: 10,
      marginBottom: 14
    }
  }, [["capacete", cap, "capacetes"], ["celular", cel, "celulares"]].map(([k, n, l]) => /*#__PURE__*/React.createElement("button", {
    key: k,
    onClick: () => setF(f === k ? "todos" : k),
    style: {
      textAlign: "left",
      cursor: "pointer",
      background: f === k ? "var(--accent-soft)" : "var(--card)",
      border: "1px solid " + (f === k ? "var(--accent-line)" : "var(--line2)"),
      borderRadius: 14,
      padding: "16px 16px",
      fontFamily: "var(--font-sans)"
    }
  }, /*#__PURE__*/React.createElement(EqIcon, {
    tipo: k,
    size: 34
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: 520,
      letterSpacing: "-.02em",
      color: "var(--ink)",
      marginTop: 6
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: "var(--faint)",
      marginTop: 2
    }
  }, l, " na cidade")))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      fontWeight: 500,
      letterSpacing: ".13em",
      textTransform: "uppercase",
      color: "var(--faint)",
      margin: "6px 2px 10px"
    }
  }, "Quem est\xE1 com o qu\xEA"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, list.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      background: "var(--surface)",
      border: "1px solid var(--line)",
      borderRadius: "var(--r-sm)",
      padding: "12px 15px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: "none",
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement(EqIcon, {
    tipo: it.tipo,
    size: 30
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 460,
      color: "var(--ink)"
    }
  }, it.tipo === "capacete" ? "Capacete" : "Celular", " \xB7 ", it.dono), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 7,
      marginTop: 4
    }
  }, chip(it.tipoV, it.empresa), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      color: "var(--faint)"
    }
  }, it.sub)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--faint)",
      lineHeight: 1.5,
      padding: "12px 2px 0"
    }
  }, "Total de capacetes e celulares pra controle de uso, devolu\xE7\xE3o e disponibiliza\xE7\xE3o.")), /*#__PURE__*/React.createElement(PoolAddSheet, {
    open: addOpen,
    onClose: () => setAddOpen(false)
  }));
}
window.LeaderEquip = LeaderEquip;

// Líder cadastra um equipamento novo no estoque central.
function PoolAddSheet({
  open,
  onClose
}) {
  const st = useStore();
  const [tipo, setTipo] = React.useState("capacete");
  const [modelo, setModelo] = React.useState("");
  React.useEffect(() => {
    if (open) {
      setTipo("capacete");
      setModelo("");
    }
  }, [open]);
  const seg = (k, l) => /*#__PURE__*/React.createElement("button", {
    key: k,
    onClick: () => setTipo(k),
    style: {
      flex: 1,
      padding: "10px 0",
      borderRadius: 999,
      cursor: "pointer",
      border: "none",
      background: tipo === k ? "var(--ink)" : "transparent",
      color: tipo === k ? "#fff" : "var(--muted)",
      fontFamily: "var(--font-sans)",
      fontSize: 13,
      fontWeight: 460
    }
  }, l);
  return /*#__PURE__*/React.createElement(window.Sheet, {
    open: open,
    onClose: onClose,
    title: "Cadastrar no estoque"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      fontWeight: 500,
      letterSpacing: ".13em",
      textTransform: "uppercase",
      color: "var(--faint)",
      marginBottom: 10
    }
  }, "Tipo"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      background: "var(--surface)",
      border: "1px solid var(--line2)",
      borderRadius: 999,
      padding: 3,
      marginBottom: 18
    }
  }, seg("capacete", "Capacete"), seg("celular", "Celular")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      fontWeight: 500,
      letterSpacing: ".13em",
      textTransform: "uppercase",
      color: "var(--faint)",
      marginBottom: 10
    }
  }, tipo === "capacete" ? "Tamanho" : "Modelo"), /*#__PURE__*/React.createElement("input", {
    value: modelo,
    onChange: e => setModelo(e.target.value),
    placeholder: tipo === "capacete" ? "Ex: Tam. M" : "Ex: Galaxy S23",
    style: {
      width: "100%",
      padding: "13px 15px",
      borderRadius: 12,
      border: "1px solid var(--line)",
      background: "var(--surface)",
      fontFamily: "var(--font-sans)",
      fontSize: 14.5,
      color: "var(--ink)",
      marginBottom: 22,
      boxSizing: "border-box"
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      st.addPoolItem({
        tipo,
        modelo
      });
      onClose();
    },
    style: {
      width: "100%",
      padding: "14px 0",
      borderRadius: 999,
      border: "none",
      background: "var(--ink)",
      color: "#fff",
      cursor: "pointer",
      fontFamily: "var(--font-sans)",
      fontSize: 15,
      fontWeight: 460
    }
  }, "Adicionar ao estoque"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--faint)",
      textAlign: "center",
      marginTop: 12,
      lineHeight: 1.5
    }
  }, "Entra como dispon\xEDvel \u2014 os subl\xEDderes passam a poder solicitar reserva."));
}

// ---- Consentimento / LGPD -------------------------------------------------
const CONSENT = [{
  name: "Você (JF-1)",
  pessoas: 6,
  assinados: 6,
  termo: "v2.1",
  atualizado: "1º ago"
}, {
  name: "Marina Alves (JF-2)",
  pessoas: 5,
  assinados: 5,
  termo: "v2.1",
  atualizado: "1º ago"
}, {
  name: "Diego Ramos (JF-3)",
  pessoas: 4,
  assinados: 2,
  termo: "v2.0",
  atualizado: "28 jul"
}];
function LeaderConsent() {
  const {
    Card,
    Icon
  } = CL;
  const totalP = CONSENT.reduce((s, r) => s + r.pessoas, 0);
  const totalA = CONSENT.reduce((s, r) => s + r.assinados, 0);
  const pct = Math.round(totalA / totalP * 100);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 0 96px"
    }
  }, /*#__PURE__*/React.createElement(ScreenHeader, {
    eyebrow: "L\xEDder Geral \xB7 LGPD",
    title: "Consentimento"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 20px",
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      margin: "-6px 0 0",
      fontSize: 11.5,
      color: "var(--faint)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "var(--pillar-predict)"
    }
  }), " LGPD \xB7 base legal do tratamento de dados"), /*#__PURE__*/React.createElement(Card, {
    variant: "white",
    pad: 20
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 34,
      fontWeight: 520,
      letterSpacing: "-.03em",
      color: pct < 100 ? "var(--warn)" : "var(--ink)",
      lineHeight: 1
    }
  }, pct, "%"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "var(--muted)",
      marginTop: 6
    }
  }, totalA, " de ", totalP, " termos assinados")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      fontWeight: 480,
      padding: "5px 12px",
      borderRadius: 999,
      background: pct < 100 ? "var(--warn-soft)" : "var(--accent-soft)",
      color: pct < 100 ? "var(--warn-ink)" : "var(--accent-ink)"
    }
  }, pct < 100 ? totalP - totalA + " pendentes" : "em dia")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 8,
      borderRadius: 999,
      background: "var(--track-progress)",
      overflow: "hidden",
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: pct + "%",
      height: "100%",
      borderRadius: 999,
      background: pct < 100 ? "var(--warn)" : "var(--accent)"
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      fontWeight: 500,
      letterSpacing: ".13em",
      textTransform: "uppercase",
      color: "var(--faint)",
      margin: "2px 2px 0"
    }
  }, "Por subl\xEDder"), CONSENT.map(r => {
    const ok = r.assinados === r.pessoas;
    return /*#__PURE__*/React.createElement("button", {
      key: r.name,
      onClick: () => openSource({
        title: r.name + " · LGPD",
        value: r.assinados + "/" + r.pessoas + " assinados",
        origin: "Termo de consentimento " + r.termo + " (uso de imagem e dados)",
        updated: r.atualizado,
        history: [{
          what: r.assinados + " de " + r.pessoas + " assinaram",
          when: r.atualizado
        }, {
          what: "Termo " + r.termo,
          when: "vigente"
        }, ...(ok ? [] : [{
          what: r.pessoas - r.assinados + " pendente(s)",
          when: "agora"
        }])]
      }),
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        width: "100%",
        textAlign: "left",
        cursor: "pointer",
        background: "var(--surface)",
        border: "1px solid var(--line)",
        borderRadius: "var(--r-sm)",
        padding: "14px 15px",
        fontFamily: "var(--font-sans)"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "report",
      size: 20,
      color: ok ? "var(--accent)" : "var(--warn)"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14.5,
        fontWeight: 460,
        color: "var(--ink)"
      }
    }, r.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "var(--faint)",
        marginTop: 2
      }
    }, "Termo ", r.termo, " \xB7 ", r.atualizado)), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        fontWeight: 480,
        color: ok ? "var(--accent-ink)" : "var(--warn-ink)"
      }
    }, r.assinados, "/", r.pessoas), /*#__PURE__*/React.createElement(Icon, {
      name: "chevronRight",
      size: 16,
      color: "var(--faint)"
    }));
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--faint)",
      lineHeight: 1.5,
      padding: "2px 2px 0"
    }
  }, "Sem termo assinado, os dados da pessoa n\xE3o entram no relat\xF3rio geral. Toque num subl\xEDder pra ver a base legal.")));
}
window.LeaderConsent = LeaderConsent;

// ---- Métricas (3 pilares) + Relatório geral -------------------------------
function LeaderMetrics() {
  const {
    Card,
    Battery,
    PillarDot,
    Icon
  } = CL;
  const roll = window.SUBLIDER_ROLLUP;
  const [openSub, setOpenSub] = React.useState(null);
  const [openCo, setOpenCo] = React.useState(null);
  const horas = roll.reduce((s, r) => s + r.horas, 0);
  const meta = roll.reduce((s, r) => s + r.meta, 0);
  const cap = roll.reduce((s, r) => s + r.capacetes, 0);
  const cel = roll.reduce((s, r) => s + r.celulares, 0);
  const monthPct = Math.round(horas / meta * 100);
  const pilar = r => {
    const [a, b] = r.predict.split("/").map(Number);
    return {
      q: Math.round(r.horas / r.meta * 100),
      pv: Math.round(a / b * 100),
      ql: r.aprov
    };
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 0 96px"
    }
  }, /*#__PURE__*/React.createElement(ScreenHeader, {
    eyebrow: "L\xEDder Geral \xB7 Relat\xF3rio",
    title: "M\xE9tricas",
    right: /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontSize: 12.5,
        fontWeight: 460,
        color: "var(--muted)",
        border: "1px solid var(--line)",
        background: "var(--surface)",
        borderRadius: 999,
        padding: "6px 12px"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "report",
      size: 14,
      color: "var(--faint)"
    }), " Relat\xF3rio")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 20px",
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Card, {
    variant: "white",
    pad: 20
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      fontWeight: 500,
      letterSpacing: ".13em",
      textTransform: "uppercase",
      color: "var(--faint)",
      marginBottom: 14
    }
  }, "Cidade \xB7 m\xEAs"), /*#__PURE__*/React.createElement(Battery, {
    label: null,
    percent: monthPct,
    doneH: horas,
    goalH: meta,
    tone: monthPct < 60 ? "warn" : "accent"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 10,
      marginTop: 18
    }
  }, [[roll.length, "sublíderes"], [cap, "capacetes"], [cel, "celulares"]].map(([n, l], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 20,
      fontWeight: 520,
      letterSpacing: "-.02em",
      color: "var(--ink)"
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "var(--faint)",
      marginTop: 3
    }
  }, l))))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      fontWeight: 500,
      letterSpacing: ".13em",
      textTransform: "uppercase",
      color: "var(--faint)",
      margin: "2px 2px 0"
    }
  }, "3 pilares por subl\xEDder"), roll.map(r => {
    const p = pilar(r);
    const membros = ALL_PEOPLE.filter(m => m.sub === r.name);
    const isOpen = openSub === r.name;
    const bar = (label, val, key) => /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 5,
        marginBottom: 5
      }
    }, /*#__PURE__*/React.createElement(PillarDot, {
      pillar: key,
      size: 6
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10.5,
        color: "var(--faint)"
      }
    }, label)), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 6,
        borderRadius: 999,
        background: "var(--track-progress)",
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: Math.min(100, val) + "%",
        height: "100%",
        borderRadius: 999,
        background: val < 60 ? "var(--warn)" : "var(--accent)"
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        fontWeight: 500,
        color: "var(--ink)",
        marginTop: 4
      }
    }, val, "%"));
    return /*#__PURE__*/React.createElement("button", {
      key: r.name,
      onClick: () => setOpenSub(isOpen ? null : r.name),
      style: {
        display: "block",
        width: "100%",
        textAlign: "left",
        cursor: "pointer",
        background: "var(--card)",
        border: "1px solid var(--line2)",
        borderRadius: "var(--r-sm)",
        padding: 16,
        fontFamily: "var(--font-sans)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: 14
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15,
        fontWeight: 500,
        letterSpacing: "-.018em",
        color: "var(--ink)"
      }
    }, r.name), /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: "auto",
        fontSize: 12,
        color: "var(--muted)"
      }
    }, r.horas, "h \xB7 ", r.capacetes + r.celulares, " equip."), /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        transform: isOpen ? "rotate(90deg)" : "none",
        transition: "transform .18s ease"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "chevronRight",
      size: 16,
      color: "var(--faint)"
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 14
      }
    }, bar("Quantidade", p.q, "quantity"), bar("Previsib.", p.pv, "predict"), bar("Qualidade", p.ql, "quality")), isOpen && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 16,
        borderTop: "1px solid var(--line2)",
        paddingTop: 6
      }
    }, (() => {
      const empresas = {};
      membros.filter(m => m.tipo === "empresa").forEach(m => {
        (empresas[m.empresa] = empresas[m.empresa] || []).push(m);
      });
      const autonomos = membros.filter(m => m.tipo === "autonomo");
      const memberRow = m => /*#__PURE__*/React.createElement("div", {
        key: m.name,
        onClick: e => {
          e.stopPropagation();
          openSource({
            title: m.name,
            value: m.horas + "h · " + m.aprov + "%",
            origin: "Conta de " + m.name + " · sublíder " + r.name + " · " + (m.tipo === "empresa" ? m.empresa : "Autônomo"),
            updated: "há poucos segundos",
            history: [{
              what: "Quantidade · " + m.horas + "h gravadas",
              when: "mês"
            }, {
              what: "Previsibilidade · " + m.dias + " dias",
              when: "semana"
            }, {
              what: "Qualidade · " + m.apr + " de " + m.env + " uploads",
              when: m.aprov + "%"
            }, {
              what: "Equipamento · " + m.equip.map(x => EQ_WORD[x]).join(" + "),
              when: "cadastro"
            }]
          });
        },
        style: {
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "11px 0",
          borderBottom: "1px solid var(--line2)"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1,
          minWidth: 0
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 6
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 13.5,
          fontWeight: 460,
          color: "var(--ink)"
        }
      }, m.name), /*#__PURE__*/React.createElement("span", {
        style: {
          display: "inline-flex",
          gap: 2
        }
      }, m.equip.map(x => /*#__PURE__*/React.createElement(EqIcon, {
        key: x,
        tipo: x,
        size: 15
      })))), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11.5,
          color: "var(--faint)",
          marginTop: 2
        }
      }, m.horas, "h \xB7 ", m.apr, "/", m.env, " uploads \xB7 ", m.dias, " dias")), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 13,
          fontWeight: 500,
          color: m.aprov < 75 ? "var(--warn)" : "var(--ink)"
        }
      }, m.aprov, "%"), /*#__PURE__*/React.createElement(Icon, {
        name: "info",
        size: 14,
        color: "var(--faint)"
      }));
      return /*#__PURE__*/React.createElement(React.Fragment, null, Object.entries(empresas).map(([emp, ms]) => {
        const coKey = r.name + "|" + emp;
        const coOpen = openCo === coKey;
        const h = ms.reduce((s, m) => s + m.horas, 0);
        const av = Math.round(ms.reduce((s, m) => s + m.aprov, 0) / ms.length);
        return /*#__PURE__*/React.createElement("div", {
          key: emp
        }, /*#__PURE__*/React.createElement("div", {
          onClick: e => {
            e.stopPropagation();
            setOpenCo(coOpen ? null : coKey);
          },
          style: {
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "12px 0",
            borderBottom: "1px solid var(--line2)",
            cursor: "pointer"
          }
        }, /*#__PURE__*/React.createElement("span", {
          style: {
            width: 28,
            height: 28,
            borderRadius: 8,
            background: "var(--accent-soft)",
            color: "var(--accent-ink)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 500,
            fontSize: 12,
            flex: "none"
          }
        }, emp[0]), /*#__PURE__*/React.createElement("div", {
          style: {
            flex: 1,
            minWidth: 0
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            fontSize: 13.5,
            fontWeight: 500,
            color: "var(--ink)"
          }
        }, emp), /*#__PURE__*/React.createElement("div", {
          style: {
            fontSize: 11.5,
            color: "var(--faint)",
            marginTop: 2
          }
        }, "Empresa \xB7 ", ms.length, " pessoas \xB7 ", h, "h \xB7 ", av, "% aprov.")), /*#__PURE__*/React.createElement("span", {
          style: {
            display: "inline-flex",
            transform: coOpen ? "rotate(90deg)" : "none",
            transition: "transform .18s ease"
          }
        }, /*#__PURE__*/React.createElement(Icon, {
          name: "chevronRight",
          size: 15,
          color: "var(--faint)"
        }))), coOpen && /*#__PURE__*/React.createElement("div", {
          style: {
            paddingLeft: 14
          }
        }, ms.map(memberRow)));
      }), autonomos.length > 0 && /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 10.5,
          fontWeight: 500,
          letterSpacing: ".1em",
          textTransform: "uppercase",
          color: "var(--faint)",
          padding: "12px 0 2px"
        }
      }, "Aut\xF4nomos"), autonomos.map(memberRow), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11.5,
          color: "var(--faint)",
          paddingTop: 8
        }
      }, "Empresas mostram o geral \u2014 toque pra abrir cada pessoa. Aut\xF4nomos v\xEAm individual."));
    })()));
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--ink)",
      borderRadius: "var(--r-sm)",
      padding: "18px 18px 16px",
      color: "#fff"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      fontWeight: 500,
      letterSpacing: ".13em",
      textTransform: "uppercase",
      color: "rgba(255,255,255,.6)",
      marginBottom: 8
    }
  }, "Relat\xF3rio geral"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      lineHeight: 1.5,
      color: "rgba(255,255,255,.9)",
      marginBottom: 14
    }
  }, "Consolida pessoas, horas, equipamentos, consentimento e os 3 pilares de toda a cidade num relat\xF3rio \xFAnico geral."), /*#__PURE__*/React.createElement("button", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      padding: "11px 18px",
      borderRadius: 999,
      border: "none",
      cursor: "pointer",
      background: "#fff",
      color: "var(--ink)",
      fontFamily: "var(--font-sans)",
      fontSize: 14,
      fontWeight: 460
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "report",
    size: 16,
    color: "var(--ink)"
  }), " Gerar e enviar"))));
}
window.LeaderMetrics = LeaderMetrics;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/clonex_app/LeaderScreens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/clonex_app/MemberFlows.jsx
try { (() => {
// Clonex JF — Member registration flow: Gravações (from store), Novo registro
// sheet, status editor, Meus equipamentos, and the help/onboarding screen.
const CF = window.ClonexDesignSystem_ca55ab;
const TAREFAS = ["Preparo de massa", "Conserto de motor", "Poda de jardim", "Montagem de peça", "Atendimento", "Limpeza"];
const _R = typeof window !== "undefined" && window.__resources || {};
const EQ_IMG = {
  capacete: _R.capacete || "../../assets/equip-capacete.png",
  celular: _R.celular || "../../assets/equip-celular.png",
  ajuda: _R.ajuda || "../../assets/equip-ajuda.png",
  empresa: _R.empresa || "../../assets/equip-empresa.png"
};
function EquipImg({
  tipo,
  size = 46
}) {
  return /*#__PURE__*/React.createElement("img", {
    src: EQ_IMG[tipo],
    alt: tipo,
    style: {
      width: size,
      height: size,
      objectFit: "contain",
      flex: "none"
    }
  });
}

// --- Gravações -------------------------------------------------------------
function GravacoesScreen({
  onEditStatus
}) {
  const st = useStore();
  const {
    Icon,
    Pill
  } = CF;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 0 96px"
    }
  }, /*#__PURE__*/React.createElement(ScreenHeader, {
    eyebrow: "Juiz de Fora \xB7 MG",
    title: "Grava\xE7\xF5es"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 20px",
      display: "flex",
      flexDirection: "column",
      gap: 2
    }
  }, st.sessions.map((r, i) => {
    const m = STATUS_META[r.status];
    return /*#__PURE__*/React.createElement("button", {
      key: r.id,
      onClick: () => onEditStatus(r),
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "15px 2px",
        background: "none",
        border: "none",
        borderBottom: i < st.sessions.length - 1 ? "1px solid var(--line2)" : "none",
        cursor: "pointer",
        textAlign: "left",
        width: "100%",
        fontFamily: "var(--font-sans)"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "camera",
      size: 20,
      color: "var(--faint)"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14.5,
        fontWeight: 460,
        letterSpacing: "-.015em",
        color: "var(--ink)"
      }
    }, r.tarefa), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "var(--faint)",
        marginTop: 2
      }
    }, r.data, " \xB7 ", fmtH(r.min), " \xB7 ", st.equipLabel(r.equip))), /*#__PURE__*/React.createElement(Pill, {
      variant: m.variant
    }, m.label));
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--faint)",
      marginTop: 14,
      lineHeight: 1.5
    }
  }, "Voc\xEA grava no Minute e registra aqui. Todo registro come\xE7a ", /*#__PURE__*/React.createElement("b", null, "pendente"), " \u2014 a aprova\xE7\xE3o vem do processo da Clonex. Toque num registro pra atualizar o status.")));
}

// --- Novo registro (sheet) -------------------------------------------------
function RegisterSheet({
  open,
  onClose
}) {
  const st = useStore();
  const {
    Icon,
    Button,
    Pill
  } = CF;
  const usable = st.equipment.filter(e => e.aprov === "aprovado" && e.disponivel);
  const capacetes = usable.filter(e => e.tipo === "capacete");
  const celulares = usable.filter(e => e.tipo === "celular");
  const [min, setMin] = React.useState(30);
  const [tarefa, setTarefa] = React.useState("");
  const [cap, setCap] = React.useState("");
  const [cel, setCel] = React.useState("");
  const [proprio, setProprio] = React.useState(false);
  React.useEffect(() => {
    if (open) {
      setMin(30);
      setTarefa("");
      setCap(capacetes[0]?.id || "");
      setCel(celulares[0]?.id || "");
      setProprio(false);
    }
  }, [open]);
  const canSave = min > 0 && tarefa.trim() && (cap || cel);
  const stepBtn = {
    width: 44,
    height: 44,
    borderRadius: 12,
    border: "1px solid var(--line)",
    background: "var(--surface)",
    cursor: "pointer",
    fontSize: 22,
    color: "var(--ink)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 1
  };
  const equipRow = (e, sel, setSel) => {
    const on = sel === e.id;
    return /*#__PURE__*/React.createElement("button", {
      key: e.id,
      onClick: () => setSel(on ? "" : e.id),
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "13px 15px",
        borderRadius: 14,
        cursor: "pointer",
        textAlign: "left",
        fontFamily: "var(--font-sans)",
        background: on ? "var(--accent-soft)" : "var(--surface)",
        border: "1px solid " + (on ? "var(--accent-line)" : "var(--line)"),
        width: "100%"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: e.tipo === "capacete" ? "box" : "phone",
      size: 20,
      color: on ? "var(--accent)" : "var(--faint)"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14.5,
        fontWeight: 460,
        color: "var(--ink)"
      }
    }, e.tipo === "capacete" ? "Capacete" : "Celular", e.modelo ? " · " + e.modelo : ""), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "var(--faint)",
        marginTop: 2
      }
    }, e.origem)), on && /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 18,
      color: "var(--accent)"
    }));
  };
  const save = () => {
    const equip = cap || cel;
    st.addSession({
      data: "hoje",
      min,
      tarefa,
      equip,
      cap,
      cel,
      proprio
    });
    onClose();
  };
  return /*#__PURE__*/React.createElement(Sheet, {
    open: open,
    onClose: onClose,
    title: "Novo registro"
  }, /*#__PURE__*/React.createElement(SheetLabel, null, "Dura\xE7\xE3o gravada"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 16,
      margin: "0 0 6px"
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: stepBtn,
    onClick: () => setMin(Math.max(0, min - 30))
  }, "\u2212"), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 120,
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 30,
      fontWeight: 520,
      letterSpacing: "-.03em",
      color: "var(--ink)"
    }
  }, fmtH(min))), /*#__PURE__*/React.createElement("button", {
    style: stepBtn,
    onClick: () => setMin(min + 30)
  }, "+")), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      fontSize: 12,
      color: "var(--faint)",
      marginBottom: 20
    }
  }, "O Minute sobe em blocos de 30 min."), /*#__PURE__*/React.createElement(SheetLabel, null, "Tarefa realizada \xB7 ", window.NICHE_LABELS[st.nicho]), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 8,
      marginBottom: 20
    }
  }, (window.NICHE_ACTIONS[st.nicho] || window.NICHE_ACTIONS.geral).map(t => /*#__PURE__*/React.createElement("button", {
    key: t,
    onClick: () => setTarefa(t),
    style: {
      border: "none",
      background: "none",
      padding: 0,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(Pill, {
    variant: tarefa === t ? "accent" : "neutral",
    dot: tarefa === t
  }, t)))), usable.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "var(--muted)",
      lineHeight: 1.5,
      background: "var(--warn-soft)",
      border: "1px solid var(--warn-line)",
      borderRadius: 12,
      padding: "13px 15px",
      marginBottom: 20
    }
  }, "Voc\xEA n\xE3o tem equipamento aprovado e dispon\xEDvel. Cadastre em ", /*#__PURE__*/React.createElement("b", null, "Equipamentos"), " e aguarde a aprova\xE7\xE3o do subl\xEDder pra registrar."), capacetes.length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SheetLabel, null, "Capacete"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      marginBottom: 18
    }
  }, capacetes.map(e => equipRow(e, cap, setCap)))), celulares.length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SheetLabel, null, "Celular"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      marginBottom: 12
    }
  }, celulares.map(e => equipRow(e, cel, setCel)))), /*#__PURE__*/React.createElement("button", {
    onClick: () => setProprio(!proprio),
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      padding: "12px 15px",
      borderRadius: 12,
      border: "1px solid var(--line)",
      background: "var(--surface)",
      cursor: "pointer",
      fontFamily: "var(--font-sans)",
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: "var(--ink)"
    }
  }, "Gravei com celular pr\xF3prio"), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 46,
      height: 28,
      borderRadius: 999,
      background: proprio ? "var(--accent)" : "var(--card2)",
      position: "relative",
      transition: "background .18s ease",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 3,
      left: proprio ? 21 : 3,
      width: 22,
      height: 22,
      borderRadius: "50%",
      background: "#fff",
      boxShadow: "0 1px 3px rgba(20,20,20,.25)",
      transition: "left .18s ease"
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--faint)",
      marginBottom: 20
    }
  }, "Pode marcar um capacete e um celular por registro. S\xF3 aparecem equipamentos ", /*#__PURE__*/React.createElement("b", null, "aprovados"), "."), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    full: true,
    disabled: !canSave,
    style: {
      opacity: canSave ? 1 : 0.4,
      cursor: canSave ? "pointer" : "not-allowed"
    },
    onClick: save
  }, "Salvar registro"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      fontSize: 12,
      color: "var(--faint)",
      marginTop: 12
    }
  }, "Entra como ", /*#__PURE__*/React.createElement("b", null, "pendente"), ". Seu subl\xEDder v\xEA em poucos segundos."));
}

// --- Status editor (sheet) -------------------------------------------------
function StatusSheet({
  session,
  onClose
}) {
  const st = useStore();
  const {
    Icon
  } = CF;
  const opts = [{
    k: "pendente",
    d: "Aguardando a aprovação da Clonex"
  }, {
    k: "aprovado",
    d: "A Clonex confirmou a aprovação"
  }, {
    k: "reprovado",
    d: "A gravação foi recusada"
  }];
  return /*#__PURE__*/React.createElement(Sheet, {
    open: !!session,
    onClose: onClose,
    title: "Status do registro"
  }, session && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      color: "var(--muted)",
      margin: "-4px 0 16px"
    }
  }, session.tarefa, " \xB7 ", fmtH(session.min), " \xB7 ", session.data), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, opts.map(o => {
    const on = session && session.status === o.k;
    const m = STATUS_META[o.k];
    return /*#__PURE__*/React.createElement("button", {
      key: o.k,
      onClick: () => {
        st.setStatus(session.id, o.k);
        onClose();
      },
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "14px 15px",
        borderRadius: 14,
        cursor: "pointer",
        textAlign: "left",
        fontFamily: "var(--font-sans)",
        background: on ? "var(--card)" : "var(--surface)",
        border: "1px solid " + (on ? "var(--line)" : "var(--line2)")
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 10,
        height: 10,
        borderRadius: "50%",
        flex: "none",
        background: m.variant === "accent" ? "var(--accent)" : m.variant === "warn" ? "var(--warn)" : "var(--faint)"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14.5,
        fontWeight: 460,
        color: "var(--ink)",
        textTransform: "capitalize"
      }
    }, o.k), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "var(--faint)",
        marginTop: 2
      }
    }, o.d)), on && /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 18,
      color: "var(--ink)"
    }));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--faint)",
      marginTop: 16,
      lineHeight: 1.5
    }
  }, "Voc\xEA n\xE3o aprova a pr\xF3pria grava\xE7\xE3o \u2014 s\xF3 reflete aqui o que a Clonex informou."));
}

// --- Meus equipamentos -----------------------------------------------------
function EquipmentScreen() {
  const st = useStore();
  const {
    Icon
  } = CF;
  const [editing, setEditing] = React.useState(null); // {id?} or 'new'
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 0 96px",
      position: "relative",
      minHeight: 420
    }
  }, /*#__PURE__*/React.createElement(ScreenHeader, {
    eyebrow: "Juiz de Fora \xB7 MG",
    title: "Equipamentos"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 20px 12px",
      marginTop: -8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: "var(--muted)"
    }
  }, "Usados por mim")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 20px"
    }
  }, st.equipment.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: "56px 24px",
      color: "var(--muted)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 460,
      color: "var(--ink)",
      marginBottom: 6
    }
  }, "Nenhum equipamento ainda"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      lineHeight: 1.5
    }
  }, "Cadastre o celular e o capacete que voc\xEA usa pra gravar. Toque no ", /*#__PURE__*/React.createElement("b", null, "+"), " abaixo.")) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 11
    }
  }, st.equipment.map(e => /*#__PURE__*/React.createElement("div", {
    key: e.id,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      background: "var(--surface)",
      border: "1px solid var(--line)",
      borderRadius: "var(--r-sm)",
      padding: "12px 15px"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setEditing(e.id),
    "aria-label": "Editar",
    style: {
      border: "none",
      background: "var(--card)",
      borderRadius: 12,
      padding: 6,
      cursor: "pointer",
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement(EquipImg, {
    tipo: e.tipo,
    size: 44
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14.5,
      fontWeight: 460,
      letterSpacing: "-.015em",
      color: "var(--ink)"
    }
  }, e.tipo === "capacete" ? "Capacete" : "Celular", e.modelo ? " · " + e.modelo : ""), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      marginTop: 3
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: "var(--faint)"
    }
  }, e.origem), e.aprov === "pendente" && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10.5,
      fontWeight: 480,
      padding: "2px 8px",
      borderRadius: 999,
      background: "var(--card)",
      color: "var(--muted)"
    }
  }, "aguardando aprova\xE7\xE3o"))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      fontWeight: 480,
      padding: "5px 12px",
      borderRadius: 999,
      background: e.disponivel ? "var(--accent-soft)" : "var(--warn-soft)",
      color: e.disponivel ? "var(--accent-ink)" : "var(--warn-ink)"
    }
  }, e.disponivel ? "Disponível" : "Indisponível")))), st.notifications.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      fontWeight: 500,
      letterSpacing: ".13em",
      textTransform: "uppercase",
      color: "var(--faint)",
      margin: "0 2px 10px"
    }
  }, "Avisos"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 0
    }
  }, st.notifications.slice(0, 6).map((n, i) => /*#__PURE__*/React.createElement("div", {
    key: n.id,
    style: {
      display: "flex",
      gap: 11,
      padding: "11px 2px",
      borderBottom: i < Math.min(st.notifications.length, 6) - 1 ? "1px solid var(--line2)" : "none"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: "50%",
      background: "var(--accent)",
      flex: "none",
      marginTop: 5
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      color: "var(--ink2)",
      lineHeight: 1.4
    }
  }, n.text), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "var(--faint)",
      marginTop: 2
    }
  }, n.when))))))), /*#__PURE__*/React.createElement("button", {
    onClick: () => setEditing("new"),
    "aria-label": "Cadastrar equipamento",
    style: {
      position: "absolute",
      right: 20,
      bottom: 8,
      width: 56,
      height: 56,
      borderRadius: "50%",
      border: "none",
      background: "var(--ink)",
      color: "#fff",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 8px 22px rgba(20,20,20,.28)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 26,
    color: "#fff"
  })), /*#__PURE__*/React.createElement(EquipEditor, {
    open: !!editing,
    item: editing && editing !== "new" ? st.equipment.find(x => x.id === editing) : null,
    onClose: () => setEditing(null)
  }));
}

// --- Editor de equipamento (sheet) ----------------------------------------
// forName: quando o sublíder cadastra pra um membro específico (aparece pra ele).
function EquipEditor({
  open,
  item,
  onClose,
  forName
}) {
  const st = useStore();
  const {
    Button
  } = CF;
  const [tipo, setTipo] = React.useState("capacete");
  const [modelo, setModelo] = React.useState("");
  const [origem, setOrigem] = React.useState("da Clonex");
  const [disp, setDisp] = React.useState(true);
  const [termo, setTermo] = React.useState(false);
  const precisaTermo = tipo === "celular" && origem === "próprio" || tipo === "capacete" && origem === "da Clonex";
  const termoTxt = tipo === "capacete" ? "Termo de uso e condição de devolução (LGPD): o capacete é da Clonex, deve ser devolvido nas condições de uso e os dados captados seguem a política da Clonex." : "Termos e risco (LGPD): ao usar celular próprio, você assume a responsabilidade pelo aparelho e concorda com o tratamento dos dados captados.";
  React.useEffect(() => {
    if (open) {
      setTipo(item?.tipo || "capacete");
      setModelo(item?.modelo || "");
      setOrigem(item?.origem || "da Clonex");
      setDisp(item ? item.disponivel : true);
      setTermo(item ? !!item.termoAceito : false);
    }
  }, [open, item]);
  const save = () => {
    const patch = {
      tipo,
      modelo,
      origem,
      disponivel: disp,
      termoAceito: !precisaTermo || termo
    };
    if (item) st.requestEdit(item.id, patch);else if (forName) st.addTeamEquip(forName, patch);else st.requestAdd(patch);
    onClose();
  };
  const bloqueado = precisaTermo && !termo;
  return /*#__PURE__*/React.createElement(Sheet, {
    open: open,
    onClose: onClose,
    title: item ? "Editar equipamento" : forName ? "Equipamento de " + forName.split(" ")[0] : "Novo equipamento"
  }, /*#__PURE__*/React.createElement(SheetLabel, null, "Tipo"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 10,
      marginBottom: 20
    }
  }, [["capacete", "Capacete"], ["celular", "Celular"]].map(([k, l]) => {
    const on = tipo === k;
    return /*#__PURE__*/React.createElement("button", {
      key: k,
      onClick: () => setTipo(k),
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        padding: "16px 8px",
        borderRadius: 16,
        cursor: "pointer",
        fontFamily: "var(--font-sans)",
        background: on ? "var(--accent-soft)" : "var(--surface)",
        border: "1.5px solid " + (on ? "var(--accent)" : "var(--line)")
      }
    }, /*#__PURE__*/React.createElement(EquipImg, {
      tipo: k,
      size: 62
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        fontWeight: 460,
        color: on ? "var(--accent-ink)" : "var(--ink)"
      }
    }, l));
  })), /*#__PURE__*/React.createElement(SheetLabel, null, tipo === "capacete" ? "Tamanho" : "Modelo do aparelho"), /*#__PURE__*/React.createElement("input", {
    value: modelo,
    onChange: e => setModelo(e.target.value),
    placeholder: tipo === "capacete" ? "Ex: Tam. M" : "Ex: iPhone 13, Galaxy S23",
    style: {
      width: "100%",
      padding: "13px 15px",
      borderRadius: 12,
      border: "1px solid var(--line)",
      background: "var(--surface)",
      fontFamily: "var(--font-sans)",
      fontSize: 14.5,
      color: "var(--ink)",
      marginBottom: tipo === "celular" ? 8 : 20,
      boxSizing: "border-box"
    }
  }), tipo === "celular" && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      alignItems: "flex-start",
      background: "var(--accent-soft)",
      border: "1px solid var(--accent-line)",
      borderRadius: 12,
      padding: "11px 13px",
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "var(--accent)",
      flex: "none",
      marginTop: 6
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: "var(--accent-ink)",
      lineHeight: 1.45
    }
  }, "O celular precisa ser ", /*#__PURE__*/React.createElement("b", null, "Android acima do S21"), " ou ", /*#__PURE__*/React.createElement("b", null, "iPhone acima do 12"), ". Aparelhos mais antigos n\xE3o gravam com a qualidade exigida.")), /*#__PURE__*/React.createElement(SheetLabel, null, "Origem"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement(Seg, {
    options: [["próprio", "Próprio"], ["da Clonex", "Da Clonex"]],
    value: origem,
    set: setOrigem
  })), /*#__PURE__*/React.createElement("button", {
    onClick: () => setDisp(!disp),
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      padding: "14px 15px",
      borderRadius: 14,
      border: "1px solid var(--line)",
      background: "var(--surface)",
      cursor: "pointer",
      fontFamily: "var(--font-sans)",
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14.5,
      fontWeight: 460,
      color: "var(--ink)"
    }
  }, "Dispon\xEDvel agora"), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 46,
      height: 28,
      borderRadius: 999,
      background: disp ? "var(--accent)" : "var(--card2)",
      position: "relative",
      transition: "background .18s ease",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 3,
      left: disp ? 21 : 3,
      width: 22,
      height: 22,
      borderRadius: "50%",
      background: "#fff",
      boxShadow: "0 1px 3px rgba(20,20,20,.25)",
      transition: "left .18s ease"
    }
  }))), precisaTermo && /*#__PURE__*/React.createElement("button", {
    onClick: () => setTermo(!termo),
    style: {
      display: "flex",
      gap: 11,
      alignItems: "flex-start",
      width: "100%",
      textAlign: "left",
      cursor: "pointer",
      background: termo ? "var(--accent-soft)" : "var(--warn-soft)",
      border: "1px solid " + (termo ? "var(--accent-line)" : "var(--warn-line)"),
      borderRadius: 14,
      padding: "14px 15px",
      marginBottom: 20,
      fontFamily: "var(--font-sans)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 22,
      height: 22,
      borderRadius: 6,
      flex: "none",
      marginTop: 1,
      border: "1.5px solid " + (termo ? "var(--accent)" : "var(--warn)"),
      background: termo ? "var(--accent)" : "transparent",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, termo && /*#__PURE__*/React.createElement(CF.Icon, {
    name: "check",
    size: 14,
    color: "#fff"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontSize: 13,
      fontWeight: 500,
      color: termo ? "var(--accent-ink)" : "var(--warn-ink)",
      marginBottom: 3
    }
  }, tipo === "capacete" ? "Assinar termo de uso e devolução" : "Assumir termos e risco do aparelho"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontSize: 12,
      color: "var(--muted)",
      lineHeight: 1.5
    }
  }, termoTxt))), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    full: true,
    disabled: bloqueado,
    style: {
      opacity: bloqueado ? 0.4 : 1,
      cursor: bloqueado ? "not-allowed" : "pointer"
    },
    onClick: save
  }, "Salvar"), item && /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      st.requestRemove(item.id);
      onClose();
    },
    style: {
      display: "block",
      width: "100%",
      textAlign: "center",
      border: "none",
      background: "none",
      cursor: "pointer",
      color: "var(--warn)",
      fontFamily: "var(--font-sans)",
      fontSize: 14,
      fontWeight: 460,
      padding: "14px 0 2px"
    }
  }, "Remover equipamento"), !forName && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--faint)",
      lineHeight: 1.5,
      textAlign: "center",
      marginTop: item ? 6 : 12
    }
  }, "Toda mudan\xE7a passa pela aprova\xE7\xE3o do seu subl\xEDder."));
}

// --- Manual de uso (sheet) -------------------------------------------------
function HelpSheet({
  open,
  onClose
}) {
  const {
    Button
  } = CF;
  const steps = ["Grave normalmente no app Minute, como sempre.", "Cadastre aqui o celular e o capacete que você está usando.", "Sempre que trocar, ganhar ou devolver um equipamento, atualize o cadastro.", "Sem equipamento marcado como disponível, seu sublíder não sabe que você está pronto pra gravar.", "Só conta de verdade o que está cadastrado — é isso que aparece na hora pro seu sublíder."];
  return /*#__PURE__*/React.createElement(Sheet, {
    open: open,
    onClose: onClose,
    title: "Como funciona pra contar de verdade"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement(EquipImg, {
    tipo: "ajuda",
    size: 96
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14,
      marginBottom: 22
    }
  }, steps.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 24,
      height: 24,
      borderRadius: "50%",
      background: "var(--ink)",
      color: "#fff",
      flex: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 12.5,
      fontWeight: 460
    }
  }, i + 1), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: "var(--ink2)",
      lineHeight: 1.5,
      paddingTop: 2
    }
  }, s)))), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    full: true,
    onClick: onClose
  }, "Entendi"));
}

// --- shared bits -----------------------------------------------------------
function Sheet({
  open,
  onClose,
  title,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "absolute",
      inset: 0,
      zIndex: 45,
      display: "flex",
      alignItems: "flex-end",
      pointerEvents: open ? "auto" : "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "rgba(20,20,20,.28)",
      transition: "opacity .28s ease",
      opacity: open ? 1 : 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      position: "relative",
      width: "100%",
      maxHeight: "88%",
      overflowY: "auto",
      background: "var(--surface)",
      borderRadius: "22px 22px 0 0",
      padding: "12px 20px calc(24px + env(safe-area-inset-bottom,6px))",
      boxShadow: "0 -10px 40px rgba(20,20,20,.2)",
      transform: open ? "translateY(0)" : "translateY(102%)",
      transition: "transform .3s cubic-bezier(.22,.61,.36,1)",
      fontFamily: "var(--font-sans)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 38,
      height: 4,
      borderRadius: 999,
      background: "var(--line)",
      margin: "0 auto 14px"
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Fechar",
    style: {
      position: "absolute",
      top: 14,
      right: 16,
      width: 30,
      height: 30,
      borderRadius: "50%",
      border: "none",
      background: "var(--card)",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 0
    }
  }, /*#__PURE__*/React.createElement(CF.Icon, {
    name: "x",
    size: 16,
    color: "var(--muted)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 20,
      fontWeight: 500,
      letterSpacing: "-.02em",
      color: "var(--ink)",
      marginBottom: 16
    }
  }, title), children));
}
function SheetLabel({
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      fontWeight: 500,
      letterSpacing: ".13em",
      textTransform: "uppercase",
      color: "var(--faint)",
      marginBottom: 10
    }
  }, children);
}
function Seg({
  options,
  value,
  set
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      background: "var(--surface)",
      border: "1px solid var(--line2)",
      borderRadius: 999,
      padding: 3
    }
  }, options.map(([k, l]) => /*#__PURE__*/React.createElement("button", {
    key: k,
    onClick: () => set(k),
    style: {
      flex: 1,
      padding: "9px 0",
      borderRadius: 999,
      cursor: "pointer",
      border: "none",
      background: value === k ? "var(--ink)" : "transparent",
      color: value === k ? "#fff" : "var(--muted)",
      fontFamily: "var(--font-sans)",
      fontSize: 13,
      fontWeight: 460,
      letterSpacing: "-.01em"
    }
  }, l)));
}
Object.assign(window, {
  GravacoesScreen,
  RegisterSheet,
  StatusSheet,
  EquipmentScreen,
  TeamEquipScreen,
  EquipEditor,
  Sheet,
  SheetLabel,
  Seg,
  MemberGoalsScreen,
  OnboardingGate,
  LoginGate,
  EquipImg,
  ComoFuncionaSheet
});

// --- Como funciona (Minute) — sheet aberto por clique, fechado com X --------
function ComoFuncionaSheet({
  open,
  onClose,
  role
}) {
  const passos = [["Crie sua conta no Minute", "Baixe o app Minute Data e crie a conta com o email que o sublíder te passou. É lá que a gravação acontece."], ["Grave em blocos de 30 min", "O Minute sobe a gravação de 30 em 30 minutos automaticamente. Ao completar 30 min, continue gravando normalmente — ele fatia e envia sozinho."], ["Ao terminar, salve no Minute", "Quando acabar o trabalho, finalize e salve a gravação no Minute. Confira se subiu (sincronizado)."], ["Registre aqui no Clonex", "Abra Novo registro: selecione a tarefa (as mesmas do Minute), informe o tempo que apareceu na tela e o aparelho usado. Rápido, é só espelhar o que o Minute mostrou."], ["Pronto", role === "subleader" ? "As horas caem no seu painel em poucos segundos. Oriente cada membro a registrar sempre — só conta o que for marcado." : "Suas horas e o pagamento atualizam na hora. Só conta o que você registrar — registre sempre que gravar."]];
  return /*#__PURE__*/React.createElement(Sheet, {
    open: open,
    onClose: onClose,
    title: "Como funciona"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      color: "var(--muted)",
      margin: "-6px 0 18px",
      lineHeight: 1.5
    }
  }, "Do Minute ao registro no Clonex \u2014 passo a passo."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, passos.map((p, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      gap: 13
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 26,
      height: 26,
      borderRadius: "50%",
      background: "var(--ink)",
      color: "#fff",
      flex: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 12.5,
      fontWeight: 500
    }
  }, i + 1), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 500,
      letterSpacing: "-.015em",
      color: "var(--ink)"
    }
  }, p[0]), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      color: "var(--ink2)",
      lineHeight: 1.5,
      marginTop: 3
    }
  }, p[1]))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 9,
      alignItems: "flex-start",
      background: "var(--accent-soft)",
      border: "1px solid var(--accent-line)",
      borderRadius: 12,
      padding: "12px 14px",
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "var(--accent)",
      flex: "none",
      marginTop: 6
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: "var(--accent-ink)",
      lineHeight: 1.5
    }
  }, "Ao completar 30 min gravando, ", /*#__PURE__*/React.createElement("b", null, "n\xE3o pare"), " \u2014 continue; o Minute divide e envia sozinho.")));
}

// --- Login / cadastro (após splash) — estrutura só, acesso liberado ---------
function LoginGate({
  role,
  onEnter,
  device,
  onDevice
}) {
  const {
    Button
  } = CF;
  const isMember = role === "membro";
  const [mode, setMode] = React.useState(isMember ? "login" : "login");
  const inp = {
    width: "100%",
    padding: "13px 15px",
    borderRadius: 12,
    border: "1px solid var(--line)",
    background: "var(--surface)",
    fontFamily: "var(--font-sans)",
    fontSize: 14.5,
    color: "var(--ink)",
    marginBottom: 12,
    boxSizing: "border-box"
  };
  const roleLabel = role === "lider" ? "Líder Geral" : role === "subleader" ? "Sublíder" : "Membro";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      zIndex: 33,
      background: "var(--bg)",
      display: "flex",
      flexDirection: "column",
      padding: "64px 24px 28px",
      fontFamily: "var(--font-sans)",
      overflowY: "auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 14,
      marginBottom: 26
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 22,
      height: 22,
      borderRadius: "50%",
      background: "var(--ink)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 34,
      fontWeight: 500,
      letterSpacing: "-.03em",
      color: "var(--ink)"
    }
  }, "Clonex"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 480,
      letterSpacing: ".08em",
      textTransform: "uppercase",
      color: "var(--faint)"
    }
  }, roleLabel)), !isMember && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      background: "var(--surface)",
      border: "1px solid var(--line2)",
      borderRadius: 999,
      padding: 3,
      marginBottom: 22
    }
  }, [["login", "Entrar"], ["cadastro", "Criar conta"]].map(([k, l]) => /*#__PURE__*/React.createElement("button", {
    key: k,
    onClick: () => setMode(k),
    style: {
      flex: 1,
      padding: "10px 0",
      borderRadius: 999,
      cursor: "pointer",
      border: "none",
      background: mode === k ? "var(--ink)" : "transparent",
      color: mode === k ? "#fff" : "var(--muted)",
      fontFamily: "var(--font-sans)",
      fontSize: 13.5,
      fontWeight: 460
    }
  }, l))), mode === "login" ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SheetLabel, null, "Email"), /*#__PURE__*/React.createElement("input", {
    placeholder: "user...@yopmail.com",
    style: inp
  }), /*#__PURE__*/React.createElement(SheetLabel, null, "Senha"), /*#__PURE__*/React.createElement("input", {
    type: "password",
    placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
    style: inp
  }), isMember && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: "var(--faint)",
      lineHeight: 1.55
    }
  }, "Sua conta \xE9 criada pelo seu subl\xEDder. Entre com o email e a senha que ele te passou.")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      color: "var(--muted)",
      lineHeight: 1.55,
      marginBottom: 16
    }
  }, "Para criar sua conta de ", roleLabel.toLowerCase(), ", informe o ", /*#__PURE__*/React.createElement("b", null, "email recebido"), " e o ", /*#__PURE__*/React.createElement("b", null, "c\xF3digo do respons\xE1vel Clonex"), ". O acesso j\xE1 vem liberado."), /*#__PURE__*/React.createElement(SheetLabel, null, "Email recebido"), /*#__PURE__*/React.createElement("input", {
    placeholder: "voce@clonex.app",
    style: inp
  }), /*#__PURE__*/React.createElement(SheetLabel, null, "C\xF3digo do respons\xE1vel Clonex"), /*#__PURE__*/React.createElement("input", {
    placeholder: "VZ...",
    style: {
      ...inp,
      letterSpacing: ".06em"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    full: true,
    onClick: onEnter
  }, mode === "cadastro" ? "Criar e entrar" : "Acessar"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      fontSize: 12,
      color: "var(--faint)",
      marginTop: 12
    }
  }, "Acesso liberado nesta vers\xE3o \u2014 sem precisar preencher."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20,
      paddingTop: 18,
      borderTop: "1px solid var(--line2)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 500,
      letterSpacing: ".13em",
      textTransform: "uppercase",
      color: "var(--faint)",
      textAlign: "center",
      marginBottom: 10
    }
  }, "Modo de teste do prot\xF3tipo"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, [["mobile", "Celular"], ["desktop", "Desktop"]].map(([k, l]) => /*#__PURE__*/React.createElement("button", {
    key: k,
    onClick: () => onDevice && onDevice(k),
    style: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 7,
      padding: "11px 0",
      borderRadius: 12,
      cursor: "pointer",
      border: "1px solid " + (device === k ? "var(--ink)" : "var(--line)"),
      background: device === k ? "var(--ink)" : "var(--surface)",
      color: device === k ? "#fff" : "var(--muted)",
      fontFamily: "var(--font-sans)",
      fontSize: 13.5,
      fontWeight: 460
    }
  }, /*#__PURE__*/React.createElement(CF.Icon, {
    name: k === "desktop" ? "columns" : "phone",
    size: 16,
    color: device === k ? "#fff" : "var(--faint)"
  }), " ", l))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      fontSize: 11.5,
      color: "var(--faint)",
      marginTop: 9,
      lineHeight: 1.5
    }
  }, "Mesmo conte\xFAdo \u2014 escolha como visualizar o teste. Desktop ocupa a tela inteira."))));
}

// --- Gate de onboarding (ata assinada) — tela cheia antes de liberar o app ---
function OnboardingGate({
  onConfirm
}) {
  const {
    Button
  } = CF;
  const BLOCKS = [["Sobre a gravação", ["Sei que vou gravar **vídeo em primeira pessoa** (câmera na cabeça, apontada para minhas mãos e a tarefa — não para o meu rosto).", "Entendo que minha participação é **voluntária** e posso encerrar a qualquer momento, devolvendo o equipamento.", "Sei que **não posso gravar** atendimento ao público, trabalho sentado, menores de 18 anos, documentos, telas ou dados de terceiros.", "Qualquer pessoa que apareça precisa ter **assinado o Termo de Consentimento de Terceiro** antes — é minha responsabilidade garantir isso."]], ["Sobre os dados e o uso do material", ["Autorizo o uso das gravações para **treinamento de IA** e produtos comerciais, sem remuneração além do pagamento acordado.", "Cedo os **direitos sobre o material gravado** à Clonex e/ou ao seu cliente.", "Sei que não posso revelar a **identidade do cliente**, as instruções do projeto ou capturas de tela do app."]], ["Sobre o equipamento (comodato)", ["Recebi o equipamento (capacete e/ou celular) **em comodato** — continua sendo da Clonex.", "Uso o equipamento **só para as gravações do projeto** e devolvo em até 5 dias úteis quando solicitado ou ao encerrar.", "Em caso de perda, furto ou dano, **comunico a Clonex em até 2 dias úteis** e faço B.O. se necessário."]], ["LGPD e privacidade", ["Fui informado sobre o **tratamento dos meus dados pessoais** com base no art. 7º, I, da Lei 13.709/2018 (LGPD).", "Sei que posso pedir **acesso, correção ou exclusão** dos dados e revogar este consentimento pelo canal da Clonex.", "Entendo que os dados podem ser **transferidos para fora do Brasil** ao cliente da Clonex, com garantias compatíveis com a LGPD."]], ["Confirmação do documento físico", ["**Assinei o Termo de Consentimento** entregue fisicamente pelo meu sublíder.", "Confirmo que **li e compreendi** todas as declarações acima."]]];
  const total = BLOCKS.reduce((s, b) => s + b[1].length, 0);
  const [checked, setChecked] = React.useState({});
  const [data, setData] = React.useState("05/08/2026");
  const [ident, setIdent] = React.useState(false);
  const [foto, setFoto] = React.useState(false);
  const nChecked = Object.values(checked).filter(Boolean).length;
  const allOk = nChecked === total;
  const rich = t => t.split("**").map((p, i) => i % 2 ? /*#__PURE__*/React.createElement("b", {
    key: i,
    style: {
      fontWeight: 500
    }
  }, p) : p);
  const upBtn = (on, set, label, sub) => /*#__PURE__*/React.createElement("button", {
    onClick: () => set(!on),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      width: "100%",
      textAlign: "left",
      cursor: "pointer",
      background: on ? "var(--accent-soft)" : "var(--surface)",
      border: "1px dashed " + (on ? "var(--accent)" : "var(--line)"),
      borderRadius: 14,
      padding: "14px 15px",
      fontFamily: "var(--font-sans)",
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 38,
      height: 38,
      borderRadius: 10,
      background: "var(--card)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement(CF.Icon, {
    name: on ? "check" : "plus",
    size: 18,
    color: on ? "var(--accent)" : "var(--faint)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 460,
      color: "var(--ink)"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: on ? "var(--accent-ink)" : "var(--faint)",
      marginTop: 2
    }
  }, on ? "Enviado" : sub)));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      zIndex: 34,
      background: "var(--bg)",
      display: "flex",
      flexDirection: "column",
      padding: "60px 22px 24px",
      fontFamily: "var(--font-sans)",
      overflowY: "auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 12,
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      borderRadius: "50%",
      background: "var(--ink)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: 500,
      letterSpacing: "-.02em",
      color: "var(--ink)"
    }
  }, "Antes de come\xE7ar")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      color: "var(--muted)",
      lineHeight: 1.55,
      marginBottom: 8
    }
  }, "Voc\xEA recebeu e assinou o Termo de Consentimento f\xEDsico entregue pelo seu subl\xEDder. Confirme aqui que entendeu os pontos principais."), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--faint)",
      marginBottom: 18
    }
  }, nChecked, "/", total, " declara\xE7\xF5es marcadas"), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: "var(--line)",
      marginBottom: 18
    }
  }), BLOCKS.map(([titulo, itens], bi) => /*#__PURE__*/React.createElement("div", {
    key: bi,
    style: {
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      fontWeight: 500,
      letterSpacing: ".13em",
      textTransform: "uppercase",
      color: "var(--faint)",
      marginBottom: 10
    }
  }, titulo), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, itens.map((t, ii) => {
    const key = bi + "-" + ii;
    const on = !!checked[key];
    return /*#__PURE__*/React.createElement("button", {
      key: key,
      onClick: () => setChecked(c => ({
        ...c,
        [key]: !c[key]
      })),
      style: {
        display: "flex",
        gap: 11,
        alignItems: "flex-start",
        width: "100%",
        textAlign: "left",
        cursor: "pointer",
        background: on ? "var(--accent-soft)" : "var(--surface)",
        border: "1px solid " + (on ? "var(--accent-line)" : "var(--line)"),
        borderRadius: 12,
        padding: "12px 13px",
        fontFamily: "var(--font-sans)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 22,
        height: 22,
        borderRadius: 6,
        flex: "none",
        marginTop: 1,
        border: "1.5px solid " + (on ? "var(--accent)" : "var(--faint)"),
        background: on ? "var(--accent)" : "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all .18s ease"
      }
    }, on && /*#__PURE__*/React.createElement(CF.Icon, {
      name: "check",
      size: 13,
      color: "#fff"
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: "var(--ink2)",
        lineHeight: 1.5
      }
    }, rich(t)));
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      fontWeight: 500,
      letterSpacing: ".13em",
      textTransform: "uppercase",
      color: "var(--faint)",
      marginBottom: 10
    }
  }, "Documentos (assinatura legal)"), upBtn(ident, setIdent, "Documento de identidade", "RG ou CNH — foto legível"), upBtn(foto, setFoto, "Foto sua (selfie)", "para registro da assinatura"), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: "var(--line)",
      margin: "10px 0 18px"
    }
  }), /*#__PURE__*/React.createElement(SheetLabel, null, "Data em que assinei o termo f\xEDsico"), /*#__PURE__*/React.createElement("input", {
    value: data,
    onChange: e => setData(e.target.value),
    style: {
      width: "100%",
      padding: "13px 15px",
      borderRadius: 12,
      border: "1px solid var(--line)",
      background: "var(--surface)",
      fontFamily: "var(--font-sans)",
      fontSize: 15,
      color: "var(--ink)",
      marginBottom: 14,
      boxSizing: "border-box"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--faint)",
      lineHeight: 1.5,
      marginBottom: 18
    }
  }, "Este aceite digital complementa o documento f\xEDsico que voc\xEA assinou. Ele n\xE3o o substitui."), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    full: true,
    disabled: !allOk,
    style: {
      opacity: allOk ? 1 : 0.4,
      cursor: allOk ? "pointer" : "not-allowed"
    },
    onClick: () => allOk && onConfirm({
      data,
      itens: total,
      ident,
      foto
    })
  }, "Confirmar e entrar"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      fontSize: 12.5,
      color: "var(--muted)",
      marginTop: 14
    }
  }, "D\xFAvidas? Fale com seu subl\xEDder"));
}

// --- Metas + Gamificação/Ranking (membro) ---------------------------------
function MemberGoalsScreen() {
  const st = useStore();
  const t = st.totals();
  const {
    Card,
    Battery
  } = CF;
  const goal = st.getGoal("Rafael Diniz");
  const pct = Math.round(t.monthH / goal * 100);
  const people = (window.CLONEX_PEOPLE || []).map(p => ({
    name: p.name,
    h: p.monthDone
  }));
  const isEmpresa = st.profile.tipo === "empresa";
  const empresaColegas = ["Rafael Diniz", "Bruno Sales", "Camila Ferraz"]; // mesma empresa do Rafael
  const base = isEmpresa ? people.filter(p => empresaColegas.includes(p.name)) : people;
  const ranking = [...base.filter(p => p.name !== "Rafael Diniz"), {
    name: "Rafael Diniz",
    h: Math.round(t.monthH),
    me: true
  }].sort((a, b) => b.h - a.h);
  const medal = ["#E8B44A", "#B9B9B4", "#C98A5B"];
  const seloCor = {
    ouro: "#E8B44A",
    prata: "#B9B9B4",
    bronze: "#C98A5B"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 0 96px"
    }
  }, /*#__PURE__*/React.createElement(ScreenHeader, {
    eyebrow: "Juiz de Fora \xB7 MG",
    title: "Metas"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 20px",
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Card, {
    variant: "white",
    pad: 20
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      fontWeight: 500,
      letterSpacing: ".13em",
      textTransform: "uppercase",
      color: "var(--faint)",
      marginBottom: 14
    }
  }, "Minha meta do m\xEAs"), /*#__PURE__*/React.createElement(Battery, {
    label: null,
    percent: pct,
    doneH: Math.round(t.monthH),
    goalH: goal,
    tone: pct < 60 ? "warn" : "accent"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginTop: 16,
      fontSize: 12.5,
      color: "var(--muted)",
      background: "var(--card)",
      borderRadius: 10,
      padding: "10px 13px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "var(--faint)",
      flex: "none"
    }
  }), "Meta de ", /*#__PURE__*/React.createElement("b", {
    style: {
      fontWeight: 500,
      color: "var(--ink)"
    }
  }, goal, "h"), " definida pelo seu subl\xEDder. Base da opera\xE7\xE3o \xE9 100h/m\xEAs.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      fontWeight: 500,
      letterSpacing: ".13em",
      textTransform: "uppercase",
      color: "var(--faint)",
      margin: "4px 2px 10px"
    }
  }, "Meus selos"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 10
    }
  }, st.mySelos.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 9,
      background: "var(--surface)",
      border: "1px solid var(--line)",
      borderRadius: 14,
      padding: "10px 14px 10px 11px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 28,
      height: 28,
      borderRadius: "50%",
      flex: "none",
      background: seloCor[s.tipo],
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "inset 0 1px 2px rgba(255,255,255,.5)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 11,
      height: 11,
      borderRadius: "50%",
      background: "rgba(255,255,255,.55)"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13.5,
      fontWeight: 460,
      color: "var(--ink)"
    }
  }, s.nome))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      fontWeight: 500,
      letterSpacing: ".13em",
      textTransform: "uppercase",
      color: "var(--faint)",
      margin: "4px 2px 4px"
    }
  }, isEmpresa ? "Ranking da empresa" : "Ranking geral"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--faint)",
      margin: "0 2px 10px"
    }
  }, isEmpresa ? "Entre os colegas da " + st.profile.empresa : "Entre todos os autônomos da unidade"), /*#__PURE__*/React.createElement(Card, {
    pad: 8
  }, ranking.map((p, i) => /*#__PURE__*/React.createElement("div", {
    key: p.name,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "12px 12px",
      borderBottom: i < ranking.length - 1 ? "1px solid var(--line2)" : "none",
      background: p.me ? "var(--accent-soft)" : "transparent",
      borderRadius: p.me ? 12 : 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 24,
      height: 24,
      borderRadius: "50%",
      flex: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 12.5,
      fontWeight: 500,
      color: i < 3 ? "#fff" : "var(--muted)",
      background: i < 3 ? medal[i] : "var(--card)"
    }
  }, i + 1), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 14.5,
      fontWeight: p.me ? 500 : 460,
      color: p.me ? "var(--accent-ink)" : "var(--ink)"
    }
  }, p.name, p.me ? " (você)" : ""), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 500,
      letterSpacing: "-.02em",
      color: p.me ? "var(--accent-ink)" : "var(--ink)"
    }
  }, p.h, "h"))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      fontWeight: 500,
      letterSpacing: ".13em",
      textTransform: "uppercase",
      color: "var(--faint)",
      margin: "4px 2px 10px"
    }
  }, "Gamifica\xE7\xF5es ativas"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, st.games.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "var(--faint)",
      padding: "0 2px"
    }
  }, "Nenhuma gamifica\xE7\xE3o ativa no momento."), st.games.map(g => /*#__PURE__*/React.createElement(Card, {
    key: g.id,
    pad: 16
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 500,
      letterSpacing: "-.015em",
      color: "var(--ink)"
    }
  }, g.nome), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto",
      fontSize: 10.5,
      fontWeight: 480,
      padding: "3px 9px",
      borderRadius: 999,
      background: "var(--card)",
      color: "var(--muted)",
      textTransform: "capitalize"
    }
  }, g.tipo)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "var(--muted)",
      lineHeight: 1.45
    }
  }, g.criterio), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 7,
      marginTop: 10,
      fontSize: 12.5,
      fontWeight: 480,
      color: "var(--accent-ink)",
      background: "var(--accent-soft)",
      border: "1px solid var(--accent-line)",
      borderRadius: 999,
      padding: "5px 12px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "var(--accent)"
    }
  }), "Selo \xB7 ", g.selo)))))));
}

// --- Equipamentos da equipe (sublíder) ------------------------------------
function TeamEquipScreen() {
  const st = useStore();
  const [addFor, setAddFor] = React.useState(null);
  const [pickOpen, setPickOpen] = React.useState(false);
  const [reserveOpen, setReserveOpen] = React.useState(false);
  const [showRep, setShowRep] = React.useState(false);
  const {
    Icon,
    Button
  } = CF;
  const pend = st.requests.filter(r => r.status === "pendente");
  const reqDesc = r => ({
    add: "Cadastrou",
    edit: "Editou",
    remove: "Quer remover"
  })[r.tipo] + " · " + (r.tipo === "remove" ? "equipamento" : st._eqName(r.payload || {}));
  // Rafael's row is read live from the member store; teammates are seeded.
  const allRows = [{
    name: "Rafael Diniz",
    tipo: st.profile.tipo,
    empresa: st.profile.empresa,
    nicho: st.nicho,
    items: st.equipment
  }, ...window.CLONEX_TEAM_EQUIP];
  const [ftipo, setFtipo] = React.useState("todos"); // capacete | celular
  const [fvinc, setFvinc] = React.useState("todos"); // empresa | autonomo
  const [openEmp, setOpenEmp] = React.useState(null);
  const NL = window.NICHE_LABELS;
  const rows = allRows.filter(r => {
    if (fvinc === "empresa" && r.tipo !== "empresa") return false;
    if (fvinc === "autonomo" && r.tipo !== "autonomo") return false;
    if (NL[fvinc] && r.nicho !== fvinc) return false;
    return true;
  }).map(r => ({
    ...r,
    items: ftipo === "todos" ? r.items : r.items.filter(i => i.tipo === ftipo)
  })).filter(r => r.items.length > 0 || ftipo === "todos");
  const allItems = rows.flatMap(r => r.items);
  const total = allItems.length;
  // Insights de perfil: uso por nicho e por vínculo (base de prospecção).
  const nichoCount = {};
  allRows.forEach(r => {
    nichoCount[r.nicho] = (nichoCount[r.nicho] || 0) + r.items.length;
  });
  const nichoRank = Object.entries(nichoCount).sort((a, b) => b[1] - a[1]);
  const maisNicho = nichoRank[0],
    menosNicho = nichoRank[nichoRank.length - 1];
  const empItems = allRows.filter(r => r.tipo === "empresa").reduce((s, r) => s + r.items.length, 0);
  const autItems = allRows.filter(r => r.tipo === "autonomo").reduce((s, r) => s + r.items.length, 0);
  const capacetes = allItems.filter(i => i.tipo === "capacete").length;
  const celulares = allItems.filter(i => i.tipo === "celular").length;
  const disp = allItems.filter(i => i.disponivel).length;
  const semDisp = rows.filter(r => !r.items.some(i => i.disponivel)).length;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 0 96px"
    }
  }, /*#__PURE__*/React.createElement(ScreenHeader, {
    eyebrow: "Minha equipe \xB7 JF",
    title: "Equipamentos"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 20px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      margin: "-6px 0 14px",
      fontSize: 11.5,
      color: "var(--faint)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "var(--pillar-predict)"
    }
  }), " Atualizado h\xE1 poucos segundos"), pend.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      fontWeight: 500,
      letterSpacing: ".13em",
      textTransform: "uppercase",
      color: "var(--faint)",
      margin: "0 2px 10px"
    }
  }, "Solicita\xE7\xF5es \xB7 ", pend.length), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, pend.map(r => /*#__PURE__*/React.createElement("div", {
    key: r.id,
    style: {
      background: "var(--surface)",
      border: "1px solid var(--accent-line)",
      borderRadius: "var(--r-sm)",
      padding: "14px 15px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 460,
      color: "var(--ink)"
    }
  }, r.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: "var(--muted)",
      marginTop: 3
    }
  }, reqDesc(r)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => st.approveRequest(r.id),
    style: {
      flex: 1,
      padding: "9px 0",
      borderRadius: 999,
      border: "none",
      cursor: "pointer",
      background: "var(--ink)",
      color: "#fff",
      fontFamily: "var(--font-sans)",
      fontSize: 13,
      fontWeight: 460
    }
  }, "Aprovar"), /*#__PURE__*/React.createElement("button", {
    onClick: () => st.rejectRequest(r.id),
    style: {
      flex: 1,
      padding: "9px 0",
      borderRadius: 999,
      border: "1px solid var(--line)",
      cursor: "pointer",
      background: "transparent",
      color: "var(--warn)",
      fontFamily: "var(--font-sans)",
      fontSize: 13,
      fontWeight: 460
    }
  }, "Recusar")))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    full: true,
    onClick: () => setPickOpen(true)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 17,
    color: "#fff"
  }), " Registrar"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    full: true,
    onClick: () => setReserveOpen(true)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "box",
    size: 16
  }), " Solicitar reserva")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowRep(v => !v),
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 7,
      width: "100%",
      marginBottom: 16,
      padding: "11px 0",
      borderRadius: 999,
      cursor: "pointer",
      border: "1px solid " + (showRep ? "var(--ink)" : "var(--line)"),
      background: showRep ? "var(--ink)" : "transparent",
      color: showRep ? "#fff" : "var(--muted)",
      fontFamily: "var(--font-sans)",
      fontSize: 13,
      fontWeight: 460
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "report",
    size: 15,
    color: showRep ? "#fff" : "var(--faint)"
  }), " ", showRep ? "Ocultar relatório" : "Gerar relatório"), showRep && React.createElement(window.EquipReport, {
    role: "subleader"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 10,
      overflowX: "auto"
    }
  }, [["todos", "Todos"], ["capacete", "Capacetes"], ["celular", "Celulares"]].map(([k, l]) => /*#__PURE__*/React.createElement("button", {
    key: k,
    onClick: () => setFtipo(k),
    style: {
      flex: "none",
      padding: "8px 14px",
      borderRadius: 999,
      cursor: "pointer",
      border: "1px solid " + (ftipo === k ? "var(--ink)" : "var(--line)"),
      background: ftipo === k ? "var(--ink)" : "transparent",
      color: ftipo === k ? "#fff" : "var(--muted)",
      fontFamily: "var(--font-sans)",
      fontSize: 13,
      fontWeight: 460
    }
  }, l))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 16,
      overflowX: "auto"
    }
  }, [["todos", "Todos"], ["empresa", "Empresa"], ["autonomo", "Autônomo"]].map(([k, l]) => /*#__PURE__*/React.createElement("button", {
    key: k,
    onClick: () => {
      setFvinc(k);
      setOpenEmp(null);
    },
    style: {
      border: "none",
      background: "none",
      padding: 0,
      cursor: "pointer",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement(CF.Pill, {
    variant: fvinc === k ? "accent" : "neutral",
    dot: fvinc === k
  }, l)))), fvinc === "empresa" && (() => {
    const empresas = {};
    allRows.filter(r => r.tipo === "empresa").forEach(r => {
      (empresas[r.empresa] = empresas[r.empresa] || []).push(r);
    });
    return /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 20
      }
    }, Object.entries(empresas).map(([emp, membros]) => {
      const on = openEmp === emp;
      const itens = membros.reduce((s, m) => s + m.items.length, 0);
      return /*#__PURE__*/React.createElement("div", {
        key: emp,
        style: {
          marginBottom: 10
        }
      }, /*#__PURE__*/React.createElement("button", {
        onClick: () => setOpenEmp(on ? null : emp),
        style: {
          display: "flex",
          alignItems: "center",
          gap: 14,
          width: "100%",
          textAlign: "left",
          cursor: "pointer",
          background: on ? "var(--accent-soft)" : "var(--surface)",
          border: "1px solid " + (on ? "var(--accent-line)" : "var(--line)"),
          borderRadius: "var(--r-sm)",
          padding: "12px 15px",
          fontFamily: "var(--font-sans)"
        }
      }, /*#__PURE__*/React.createElement(EquipImg, {
        tipo: "empresa",
        size: 48
      }), /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 15,
          fontWeight: 500,
          letterSpacing: "-.015em",
          color: "var(--ink)"
        }
      }, emp), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          color: "var(--faint)",
          marginTop: 2
        }
      }, membros.length, " participantes \xB7 ", itens, " equipamentos")), /*#__PURE__*/React.createElement("span", {
        style: {
          display: "inline-flex",
          transform: on ? "rotate(90deg)" : "none",
          transition: "transform .18s ease"
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "chevronRight",
        size: 17,
        color: "var(--faint)"
      }))), on && /*#__PURE__*/React.createElement("div", {
        style: {
          padding: "4px 6px 0 14px"
        }
      }, membros.map(m => /*#__PURE__*/React.createElement("div", {
        key: m.name,
        style: {
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "11px 0",
          borderBottom: "1px solid var(--line2)"
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: "var(--card)",
          color: "var(--ink)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 500,
          fontSize: 12.5,
          flex: "none"
        }
      }, m.name[0]), /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 14,
          fontWeight: 460,
          color: "var(--ink)"
        }
      }, m.name), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11.5,
          color: "var(--faint)",
          marginTop: 2
        }
      }, window.NICHE_LABELS[m.nicho], " \xB7 ", m.jornada === "full" ? "Full-time" : "Part-time", " \xB7 ", m.items.length, " itens")), /*#__PURE__*/React.createElement("span", {
        style: {
          display: "inline-flex",
          gap: 3
        }
      }, m.items.map((it, k) => /*#__PURE__*/React.createElement(EquipImg, {
        key: k,
        tipo: it.tipo,
        size: 22
      })))))));
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "var(--faint)",
        lineHeight: 1.5,
        padding: "6px 2px 0"
      }
    }, "Toque numa empresa pra abrir os participantes dela."));
  })(), fvinc === "autonomo" && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 20,
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, allRows.filter(r => r.tipo === "autonomo").map(m => /*#__PURE__*/React.createElement("div", {
    key: m.name,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      background: "var(--surface)",
      border: "1px solid var(--line)",
      borderRadius: "var(--r-sm)",
      padding: "12px 15px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 48,
      height: 48,
      borderRadius: "50%",
      flex: "none",
      background: "radial-gradient(circle at 35% 30%, #EEEBFF, #C9BEF9)",
      border: "1px solid var(--accent-line)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 19,
      fontWeight: 520,
      color: "var(--accent-ink)",
      boxShadow: "inset 0 2px 4px rgba(255,255,255,.6), 0 2px 5px rgba(110,92,246,.18)"
    }
  }, m.name[0]), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 500,
      letterSpacing: "-.015em",
      color: "var(--ink)"
    }
  }, m.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--faint)",
      marginTop: 2
    }
  }, "Aut\xF4nomo \xB7 ", window.NICHE_LABELS[m.nicho], " \xB7 ", m.jornada === "full" ? "Full-time" : "Part-time", " \xB7 ", m.items.length, " itens")), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      gap: 3
    }
  }, m.items.map((it, k) => /*#__PURE__*/React.createElement(EquipImg, {
    key: k,
    tipo: it.tipo,
    size: 24
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--faint)",
      lineHeight: 1.5,
      padding: "2px 2px 0"
    }
  }, "Somente aut\xF4nomos, cada um com o pr\xF3prio \xEDcone.")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--card)",
      border: "1px solid var(--line2)",
      borderRadius: "var(--r-sm)",
      padding: "16px 16px",
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      fontWeight: 500,
      letterSpacing: ".13em",
      textTransform: "uppercase",
      color: "var(--faint)",
      marginBottom: 12
    }
  }, "Insights de perfil"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 9,
      fontSize: 13.5,
      color: "var(--ink2)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 9
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "var(--accent)",
      flex: "none",
      marginTop: 6
    }
  }), /*#__PURE__*/React.createElement("span", null, "Nicho mais explorado: ", /*#__PURE__*/React.createElement("b", {
    style: {
      fontWeight: 500
    }
  }, NL[maisNicho[0]]), " (", maisNicho[1], " equipamentos ativos).")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 9
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "var(--warn)",
      flex: "none",
      marginTop: 6
    }
  }), /*#__PURE__*/React.createElement("span", null, "Menos explorado: ", /*#__PURE__*/React.createElement("b", {
    style: {
      fontWeight: 500
    }
  }, NL[menosNicho[0]]), " (", menosNicho[1], ") \u2014 espa\xE7o pra prospec\xE7\xE3o.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 9
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "var(--pillar-predict)",
      flex: "none",
      marginTop: 6
    }
  }), /*#__PURE__*/React.createElement("span", null, "Empresa usa ", /*#__PURE__*/React.createElement("b", {
    style: {
      fontWeight: 500
    }
  }, empItems), " \xB7 aut\xF4nomo ", /*#__PURE__*/React.createElement("b", {
    style: {
      fontWeight: 500
    }
  }, autItems), " equipamentos.")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 10,
      marginBottom: 16
    }
  }, [[capacetes, "capacetes"], [celulares, "celulares"], [disp, "disponíveis"]].map(([n, l], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      background: "var(--card)",
      border: "1px solid var(--line2)",
      borderRadius: 14,
      padding: "14px 14px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: 520,
      letterSpacing: "-.02em",
      color: "var(--ink)"
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: "var(--faint)",
      marginTop: 3,
      lineHeight: 1.3
    }
  }, l)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: semDisp > 0 ? "var(--warn-soft)" : "var(--accent-soft)",
      border: "1px solid " + (semDisp > 0 ? "var(--warn-line)" : "var(--accent-line)"),
      borderRadius: 12,
      padding: "11px 15px",
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: semDisp > 0 ? "var(--warn-ink)" : "var(--accent-ink)"
    }
  }, total, " itens no total \xB7 ", rows.length, " pessoas"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 460,
      color: semDisp > 0 ? "var(--warn-ink)" : "var(--accent-ink)"
    }
  }, semDisp > 0 ? semDisp + " sem equipamento" : "todos equipados")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      fontWeight: 500,
      letterSpacing: ".13em",
      textTransform: "uppercase",
      color: "var(--faint)",
      margin: "0 2px 10px"
    }
  }, "Mapa de visibilidade"), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface)",
      border: "1px solid var(--line)",
      borderRadius: "var(--r-sm)",
      padding: "6px 14px 12px",
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr auto auto",
      gap: "0 18px",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10.5,
      fontWeight: 500,
      letterSpacing: ".08em",
      textTransform: "uppercase",
      color: "var(--faint)",
      padding: "10px 0 6px",
      textAlign: "center"
    }
  }, "Capac."), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10.5,
      fontWeight: 500,
      letterSpacing: ".08em",
      textTransform: "uppercase",
      color: "var(--faint)",
      padding: "10px 0 6px",
      textAlign: "center"
    }
  }, "Celular"), rows.map(r => {
    const cap = r.items.find(i => i.tipo === "capacete");
    const cel = r.items.find(i => i.tipo === "celular");
    const cell = it => {
      const bg = !it ? "var(--card2)" : it.disponivel ? "var(--accent)" : "var(--warn)";
      return /*#__PURE__*/React.createElement("span", {
        style: {
          display: "flex",
          justifyContent: "center"
        }
      }, /*#__PURE__*/React.createElement("span", {
        title: !it ? "sem" : it.disponivel ? "disponível" : "indisponível",
        style: {
          width: 13,
          height: 13,
          borderRadius: "50%",
          background: bg
        }
      }));
    };
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: r.name
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: "var(--ink)",
        padding: "9px 0",
        borderTop: "1px solid var(--line2)"
      }
    }, r.name), /*#__PURE__*/React.createElement("span", {
      style: {
        padding: "9px 0",
        borderTop: "1px solid var(--line2)"
      }
    }, cell(cap)), /*#__PURE__*/React.createElement("span", {
      style: {
        padding: "9px 0",
        borderTop: "1px solid var(--line2)"
      }
    }, cell(cel)));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 16,
      marginTop: 12,
      paddingTop: 12,
      borderTop: "1px solid var(--line2)"
    }
  }, [["var(--accent)", "disponível"], ["var(--warn)", "indisponível"], ["var(--card2)", "sem"]].map(([c, l]) => /*#__PURE__*/React.createElement("span", {
    key: l,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      fontSize: 11.5,
      color: "var(--muted)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: "50%",
      background: c
    }
  }), l)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, rows.map(r => {
    const ready = r.items.some(i => i.disponivel);
    return /*#__PURE__*/React.createElement("div", {
      key: r.name,
      style: {
        background: "var(--surface)",
        border: "1px solid var(--line)",
        borderRadius: "var(--r-sm)",
        padding: "14px 15px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: 12
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15,
        fontWeight: 500,
        letterSpacing: "-.018em",
        color: "var(--ink)"
      }
    }, r.name), /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: "auto",
        fontSize: 11,
        fontWeight: 480,
        padding: "4px 11px",
        borderRadius: 999,
        background: ready ? "var(--accent-soft)" : "var(--warn-soft)",
        color: ready ? "var(--accent-ink)" : "var(--warn-ink)"
      }
    }, ready ? "pronto pra gravar" : "sem equipamento"), /*#__PURE__*/React.createElement("button", {
      onClick: () => setAddFor(r.name),
      "aria-label": "Adicionar equipamento pra " + r.name,
      style: {
        width: 28,
        height: 28,
        borderRadius: 8,
        border: "1px solid var(--line)",
        background: "var(--surface)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: "none"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 15,
      color: "var(--ink)"
    }))), r.items.length === 0 ? /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: "var(--faint)"
      }
    }, "Nenhum equipamento cadastrado.") : /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 8
      }
    }, r.items.map((e, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 11
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        background: "var(--card)",
        borderRadius: 10,
        padding: 4,
        display: "flex",
        flex: "none"
      }
    }, /*#__PURE__*/React.createElement(EquipImg, {
      tipo: e.tipo,
      size: 30
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13.5,
        fontWeight: 460,
        color: "var(--ink)"
      }
    }, e.tipo === "capacete" ? "Capacete" : "Celular", e.modelo ? " · " + e.modelo : ""), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11.5,
        color: "var(--faint)"
      }
    }, e.origem)), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        fontWeight: 480,
        padding: "3px 10px",
        borderRadius: 999,
        background: e.disponivel ? "var(--accent-soft)" : "var(--warn-soft)",
        color: e.disponivel ? "var(--accent-ink)" : "var(--warn-ink)"
      }
    }, e.disponivel ? "disponível" : "indisponível")))));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--faint)",
      lineHeight: 1.5,
      padding: "12px 2px 0"
    }
  }, "O membro cadastra o pr\xF3prio equipamento e aparece aqui. Voc\xEA tamb\xE9m pode adicionar pra uma pessoa pelo ", /*#__PURE__*/React.createElement("b", null, "+"), ".")), /*#__PURE__*/React.createElement(EquipEditor, {
    open: !!addFor,
    forName: addFor,
    onClose: () => setAddFor(null)
  }), /*#__PURE__*/React.createElement(Sheet, {
    open: pickOpen,
    onClose: () => setPickOpen(false),
    title: "Registrar equipamento pra quem?"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, rows.map(r => /*#__PURE__*/React.createElement("button", {
    key: r.name,
    onClick: () => {
      setPickOpen(false);
      setAddFor(r.name);
    },
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "13px 15px",
      borderRadius: 12,
      cursor: "pointer",
      textAlign: "left",
      fontFamily: "var(--font-sans)",
      background: "var(--surface)",
      border: "1px solid var(--line)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 34,
      height: 34,
      borderRadius: "50%",
      background: "var(--ink)",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 500,
      fontSize: 13,
      flex: "none"
    }
  }, r.name[0]), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 14.5,
      fontWeight: 460,
      color: "var(--ink)"
    }
  }, r.name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: "var(--faint)"
    }
  }, r.items.length, " itens"), /*#__PURE__*/React.createElement(Icon, {
    name: "chevronRight",
    size: 16,
    color: "var(--faint)"
  }))))), /*#__PURE__*/React.createElement(Sheet, {
    open: reserveOpen,
    onClose: () => setReserveOpen(false),
    title: "Solicitar reserva"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: "var(--muted)",
      margin: "-6px 0 14px",
      lineHeight: 1.5
    }
  }, "Equipamentos dispon\xEDveis no estoque do l\xEDder geral. Solicite a reserva pra usar na sua equipe."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, st.pool.filter(p => p.status === "disponivel").length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "var(--faint)",
      padding: "8px 2px"
    }
  }, "Nenhum equipamento dispon\xEDvel no momento."), st.pool.filter(p => p.status === "disponivel").map(p => /*#__PURE__*/React.createElement("div", {
    key: p.id,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "12px 14px",
      borderRadius: 12,
      background: "var(--surface)",
      border: "1px solid var(--line)"
    }
  }, /*#__PURE__*/React.createElement(EquipImg, {
    tipo: p.tipo,
    size: 38
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 460,
      color: "var(--ink)"
    }
  }, p.tipo === "capacete" ? "Capacete" : "Celular", p.modelo ? " · " + p.modelo : ""), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: "var(--faint)",
      marginTop: 2
    }
  }, "dispon\xEDvel no estoque")), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      st.requestReserve(p.id, "Você (JF-1)");
    },
    style: {
      fontSize: 12.5,
      fontWeight: 460,
      padding: "7px 13px",
      borderRadius: 999,
      border: "1px solid var(--ink)",
      background: "var(--ink)",
      color: "#fff",
      cursor: "pointer",
      fontFamily: "var(--font-sans)",
      flex: "none"
    }
  }, "Solicitar"))))));
}
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/clonex_app/MemberFlows.jsx", error: String((e && e.message) || e) }); }

// ui_kits/clonex_app/MemberHome.jsx
try { (() => {
// Clonex JF — Member Home ("Início"). The person opens the app and in 2s knows
// if they're on pace to hit the month's hour goal.
const CH = window.ClonexDesignSystem_ca55ab;
function MemberHome() {
  const {
    Battery,
    StatTrio,
    ProgressBar,
    NudgeBanner,
    Card
  } = CH;
  const st = useStore();
  const t = st.totals();
  const goal = st.getGoal("Rafael Diniz");
  const weekPct = Math.round(t.weekH / 25 * 100),
    monthPct = Math.round(t.monthH / goal * 100);
  const falta = Math.max(0, goal - t.monthH);
  const behind = monthPct < 60;
  // Financeiro do ciclo (2 etapas): adiantamento das 1as 10h + saldo no fechamento.
  const faixa = st.faixaFor(Math.round(t.monthH));
  const vh = faixa.vh;
  const cumpridas = Math.round(t.monthH);
  const adiantHoras = Math.min(10, cumpridas);
  const valorAdiant = adiantHoras * 10;
  const adiantLiberado = cumpridas >= 10;
  const totalCiclo = cumpridas * vh - st.descontos;
  const saldo = Math.max(0, totalCiclo - valorAdiant);
  const projCumpr = Math.min(goal, Math.round(cumpridas + cumpridas / 12 * st.ciclo.diasRestantes));
  const projTotal = Math.max(0, projCumpr * st.faixaFor(projCumpr).vh - st.descontos);
  const proxLim = faixa.nome === "Full" ? null : faixa.nome === "Básica" ? 61 : 91;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 0 96px"
    }
  }, /*#__PURE__*/React.createElement(ScreenHeader, {
    eyebrow: "Juiz de Fora \xB7 MG",
    title: "Oi, Rafael"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 20px",
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Card, {
    variant: "white",
    pad: 20
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 22
    }
  }, /*#__PURE__*/React.createElement(Battery, {
    label: "Semana",
    percent: weekPct,
    doneH: Math.round(t.weekH),
    goalH: 25
  }), /*#__PURE__*/React.createElement(Battery, {
    label: "Ciclo",
    percent: monthPct,
    doneH: Math.round(t.monthH),
    goalH: goal,
    tone: behind ? "warn" : "accent"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement(SourceButton, {
    payload: {
      title: "Horas gravadas",
      value: Math.round(t.monthH) + "h no mês",
      origin: "Somadas dos seus registros (você informa o que gravou no Minute)",
      updated: "atualizado há poucos segundos",
      history: st.sessions.slice(0, 3).map(s => ({
        what: "+" + fmtH(s.min) + " — " + s.tarefa,
        when: s.data
      }))
    }
  }))), /*#__PURE__*/React.createElement(Card, {
    pad: 18
  }, /*#__PURE__*/React.createElement(StatTrio, {
    items: [{
      value: t.todayH.toFixed(1).replace(".", ",") + "h",
      label: "horas hoje"
    }, {
      value: (t.monthH / 12).toFixed(1).replace(".", ",") + "h",
      label: "média por dia"
    }, {
      value: Math.round(falta) + "h",
      label: "falta pra meta"
    }]
  })), /*#__PURE__*/React.createElement(Card, {
    pad: 18
  }, /*#__PURE__*/React.createElement(ProgressBar, {
    label: "Uploads aprovados",
    value: t.apprPct + "%",
    percent: t.apprPct
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      color: "var(--faint)"
    }
  }, st.sessions.filter(s => s.status === "pendente").length, " registros ainda pendentes."), /*#__PURE__*/React.createElement(SourceButton, {
    payload: {
      title: "Uploads aprovados",
      value: t.apprPct + "%",
      origin: "% dos minutos com status aprovado (revisão da Clonex)",
      updated: "atualizado há poucos segundos",
      history: [{
        what: fmtH(t.apprMin) + " aprovados de " + fmtH(t.min),
        when: "agora"
      }]
    }
  }))), /*#__PURE__*/React.createElement(Card, {
    variant: "white",
    pad: 20
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      justifyContent: "space-between",
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      fontWeight: 500,
      letterSpacing: ".13em",
      textTransform: "uppercase",
      color: "var(--faint)"
    }
  }, "Pagamento deste ciclo"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: "var(--muted)"
    }
  }, fmtBRL(vh), "/h")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      marginBottom: 16
    }
  }, st.FAIXAS.map((f, i) => {
    const atual = f.nome === faixa.nome;
    const cumprida = cumpridas > f.lim;
    return /*#__PURE__*/React.createElement("div", {
      key: f.nome,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 11,
        padding: "11px 13px",
        borderRadius: 12,
        background: atual ? "var(--accent-soft)" : "var(--surface)",
        border: "1px solid " + (atual ? "var(--accent)" : "var(--line2)")
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 22,
        height: 22,
        borderRadius: "50%",
        flex: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: cumprida ? "var(--accent)" : atual ? "var(--accent)" : "transparent",
        border: cumprida || atual ? "none" : "1.5px solid var(--faint)"
      }
    }, (cumprida || atual) && /*#__PURE__*/React.createElement(CH.Icon, {
      name: "check",
      size: 13,
      color: "#fff"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13.5,
        fontWeight: atual ? 500 : 460,
        color: atual ? "var(--accent-ink)" : cumprida ? "var(--ink)" : "var(--faint)"
      }
    }, f.nome), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11.5,
        color: atual ? "var(--accent-ink)" : "var(--faint)"
      }
    }, f.faixa)), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13.5,
        fontWeight: 500,
        color: atual ? "var(--accent-ink)" : cumprida ? "var(--ink)" : "var(--faint)"
      }
    }, fmtBRL(f.vh), "/h"));
  })), proxLim && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: "var(--muted)",
      marginBottom: 14,
      lineHeight: 1.5
    }
  }, "Voc\xEA est\xE1 na faixa ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--ink)",
      fontWeight: 500
    }
  }, faixa.nome), " \u2014 grave mais ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--ink)",
      fontWeight: 500
    }
  }, proxLim - cumpridas, "h"), " para subir de faixa."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "10px 0",
      borderBottom: "1px solid var(--line2)"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: "var(--ink)"
    }
  }, "Valor das 10 primeiras horas"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--faint)",
      marginTop: 2
    }
  }, adiantHoras, "h \xB7 ", fmtBRL(valorAdiant))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 480,
      padding: "5px 11px",
      borderRadius: 999,
      background: adiantLiberado ? "var(--accent-soft)" : "var(--card)",
      color: adiantLiberado ? "var(--accent-ink)" : "var(--muted)"
    }
  }, adiantLiberado ? "liberado" : "faltam " + (10 - cumpridas) + "h")), st.descontos > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "10px 0",
      borderBottom: "1px solid var(--line2)"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: "var(--ink)"
    }
  }, "Desconto"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--faint)",
      marginTop: 2
    }
  }, st.descontoMotivo)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 500,
      color: "var(--warn)",
      whiteSpace: "nowrap",
      flex: "none"
    }
  }, "\u2212 ", fmtBRL(st.descontos))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "12px 0",
      borderBottom: "1px solid var(--line2)"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14.5,
      fontWeight: 500,
      color: "var(--ink)"
    }
  }, "Valor total ao finalizar"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--faint)",
      marginTop: 2
    }
  }, "mediante cumprimento \xB7 ", cumpridas, "h \xD7 ", fmtBRL(vh))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 22,
      fontWeight: 520,
      letterSpacing: "-.02em",
      color: "var(--ink)",
      whiteSpace: "nowrap",
      flex: "none"
    }
  }, fmtBRL(saldo))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 9,
      alignItems: "flex-start",
      background: "var(--accent-soft)",
      border: "1px solid var(--accent-line)",
      borderRadius: 12,
      padding: "12px 14px",
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "var(--accent)",
      flex: "none",
      marginTop: 6
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "var(--accent-ink)",
      lineHeight: 1.5
    }
  }, "Se continuar nesse ritmo, voc\xEA fecha o ciclo com ", /*#__PURE__*/React.createElement("b", null, projCumpr, "h"), " e recebe ", /*#__PURE__*/React.createElement("b", null, fmtBRL(projTotal)), " no total (", st.ciclo.fecha, ").")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: "var(--faint)",
      lineHeight: 1.5,
      marginTop: 12
    }
  }, "Total do ciclo ", fmtBRL(cumpridas * vh), " \u2212 adiantado ", fmtBRL(valorAdiant), st.descontos > 0 ? " − desconto " + fmtBRL(st.descontos) : "", ". Pago no fechamento (", st.ciclo.fecha, ").")), /*#__PURE__*/React.createElement(NudgeBanner, {
    tone: behind ? "warn" : "accent"
  }, behind ? /*#__PURE__*/React.createElement("span", null, "Voc\xEA est\xE1 abaixo do ritmo. Faltam ", /*#__PURE__*/React.createElement("b", null, Math.round(falta), "h"), " pra bater ", goal, "h at\xE9 o fechamento do ciclo em ", st.ciclo.fecha, ".") : /*#__PURE__*/React.createElement("span", null, "No ritmo. Mantendo o passo voc\xEA fecha o ciclo ", /*#__PURE__*/React.createElement("b", null, "acima da meta"), "."))));
}
window.MemberHome = MemberHome;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/clonex_app/MemberHome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/clonex_app/MetasScreen.jsx
try { (() => {
// Clonex JF — Metas (sublíder). Editable team + per-person goals and pillar
// targets, with data provenance on every value.
const CM = window.ClonexDesignSystem_ca55ab;
function Stepper({
  value,
  set,
  step = 1,
  suffix
}) {
  const btn = {
    width: 34,
    height: 34,
    borderRadius: 10,
    border: "1px solid var(--line)",
    background: "var(--surface)",
    cursor: "pointer",
    fontSize: 18,
    fontWeight: 400,
    color: "var(--ink)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 1,
    fontFamily: "var(--font-sans)"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: btn,
    onClick: () => set(Math.max(0, value - step))
  }, "\u2212"), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 62,
      textAlign: "center",
      fontSize: 18,
      fontWeight: 500,
      letterSpacing: "-.02em",
      color: "var(--ink)"
    }
  }, value, suffix), /*#__PURE__*/React.createElement("button", {
    style: btn,
    onClick: () => set(value + step)
  }, "+"));
}
function MetasScreen() {
  const st = useStore();
  const {
    Card,
    Button,
    Icon
  } = CM;
  const [team, setTeam] = React.useState(600);
  const [perPerson, setPerPerson] = React.useState(100);
  const [dias, setDias] = React.useState(5);
  const [aprov, setAprov] = React.useState(85);
  const [novoGame, setNovoGame] = React.useState(false);
  const Row = ({
    title,
    sub,
    children,
    src
  }) => /*#__PURE__*/React.createElement(Card, {
    pad: 18
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 500,
      letterSpacing: "-.015em",
      color: "var(--ink)"
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: "var(--muted)",
      marginTop: 3,
      lineHeight: 1.4
    }
  }, sub), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement(SourceButton, {
    payload: src
  }))), children));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 0 24px"
    }
  }, /*#__PURE__*/React.createElement(ScreenHeader, {
    eyebrow: "Minha equipe \xB7 Agosto",
    title: "Metas"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 20px",
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Row, {
    title: "Meta da equipe",
    sub: "Horas somadas de todos no m\xEAs",
    src: {
      title: "Meta da equipe",
      value: team + "h",
      origin: "Definida por você · pode ser ajustada",
      updated: "hoje · 21:40",
      history: [{
        what: "600h — você",
        when: "hoje"
      }, {
        what: "550h — você",
        when: "1º ago"
      }, {
        what: "Sugestão da Clonex: 100h × 6 pessoas",
        when: "01 ago"
      }]
    }
  }, /*#__PURE__*/React.createElement(Stepper, {
    value: team,
    set: setTeam,
    step: 50,
    suffix: "h"
  })), /*#__PURE__*/React.createElement(Row, {
    title: "Meta por pessoa",
    sub: "Padr\xE3o do projeto: 100h/m\xEAs",
    src: {
      title: "Meta por pessoa",
      value: perPerson + "h",
      origin: "Padrão da Clonex (R$ 1.500 por 100h)",
      updated: "fixo do projeto",
      history: [{
        what: "100h — padrão Clonex",
        when: "sempre"
      }]
    }
  }, /*#__PURE__*/React.createElement(Stepper, {
    value: perPerson,
    set: setPerPerson,
    step: 10,
    suffix: "h"
  })), /*#__PURE__*/React.createElement(Row, {
    title: "Previsibilidade",
    sub: "Dias com grava\xE7\xE3o por semana",
    src: {
      title: "Previsibilidade",
      value: dias + " dias/sem",
      origin: "Meta interna da equipe",
      updated: "hoje",
      history: [{
        what: "5 dias — você",
        when: "hoje"
      }, {
        what: "4 dias",
        when: "jul"
      }]
    }
  }, /*#__PURE__*/React.createElement(Stepper, {
    value: dias,
    set: setDias,
    step: 1,
    suffix: "d"
  })), /*#__PURE__*/React.createElement(Row, {
    title: "Qualidade",
    sub: "Aprova\xE7\xE3o m\xEDnima de uploads",
    src: {
      title: "Qualidade",
      value: aprov + "%",
      origin: "Meta interna da equipe",
      updated: "hoje",
      history: [{
        what: "85% — você",
        when: "hoje"
      }, {
        what: "80%",
        when: "jul"
      }]
    }
  }, /*#__PURE__*/React.createElement(Stepper, {
    value: aprov,
    set: setAprov,
    step: 5,
    suffix: "%"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--faint)",
      lineHeight: 1.5,
      padding: "4px 2px 0"
    }
  }, "As metas valem pra sua equipe neste m\xEAs. Toque em ", /*#__PURE__*/React.createElement("b", null, "origem"), " em qualquer n\xFAmero pra ver de onde ele veio e o hist\xF3rico de mudan\xE7as."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      margin: "14px 2px 2px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      fontWeight: 500,
      letterSpacing: ".13em",
      textTransform: "uppercase",
      color: "var(--faint)"
    }
  }, "Gamifica\xE7\xE3o"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    onClick: () => setNovoGame(true)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 15
  }), " Criar")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--faint)",
      lineHeight: 1.5,
      margin: "0 2px 4px"
    }
  }, "Crie desafios pra estimular a equipe. Escolha se valem por ", /*#__PURE__*/React.createElement("b", null, "empresa"), " (o grupo todo de um contato) ou por ", /*#__PURE__*/React.createElement("b", null, "aut\xF4nomo"), " (pessoa individual)."), st.games.map(g => /*#__PURE__*/React.createElement(Card, {
    key: g.id,
    pad: 16
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 500,
      letterSpacing: "-.015em",
      color: "var(--ink)"
    }
  }, g.nome), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto",
      fontSize: 10.5,
      fontWeight: 480,
      padding: "3px 9px",
      borderRadius: 999,
      background: "var(--card)",
      color: "var(--muted)",
      textTransform: "capitalize"
    }
  }, g.tipo)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "var(--muted)",
      lineHeight: 1.45
    }
  }, g.criterio), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 7,
      fontSize: 12.5,
      fontWeight: 480,
      color: "var(--accent-ink)",
      background: "var(--accent-soft)",
      border: "1px solid var(--accent-line)",
      borderRadius: 999,
      padding: "5px 12px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "var(--accent)"
    }
  }), "Pr\xEAmio \xB7 ", g.premio), /*#__PURE__*/React.createElement("button", {
    onClick: () => st.removeGame(g.id),
    style: {
      marginLeft: "auto",
      border: "none",
      background: "none",
      cursor: "pointer",
      color: "var(--warn)",
      fontFamily: "var(--font-sans)",
      fontSize: 12.5,
      fontWeight: 460
    }
  }, "Encerrar"))))), /*#__PURE__*/React.createElement(CriarGameSheet, {
    open: novoGame,
    onClose: () => setNovoGame(false)
  }));
}
window.MetasScreen = MetasScreen;

// --- Criar gamificação (sublíder) -----------------------------------------
function CriarGameSheet({
  open,
  onClose
}) {
  const st = useStore();
  const {
    Button
  } = CM;
  const [nome, setNome] = React.useState("");
  const [tipo, setTipo] = React.useState("empresa");
  const [criterio, setCriterio] = React.useState("");
  const [premio, setPremio] = React.useState("");
  React.useEffect(() => {
    if (open) {
      setNome("");
      setTipo("empresa");
      setCriterio("");
      setPremio("");
    }
  }, [open]);
  const inp = {
    width: "100%",
    padding: "13px 15px",
    borderRadius: 12,
    border: "1px solid var(--line)",
    background: "var(--surface)",
    fontFamily: "var(--font-sans)",
    fontSize: 14.5,
    color: "var(--ink)",
    marginBottom: 18,
    boxSizing: "border-box"
  };
  const canSave = nome.trim() && criterio.trim() && premio.trim();
  return /*#__PURE__*/React.createElement(Sheet, {
    open: open,
    onClose: onClose,
    title: "Criar gamifica\xE7\xE3o"
  }, /*#__PURE__*/React.createElement(SheetLabel, null, "Nome do desafio"), /*#__PURE__*/React.createElement("input", {
    value: nome,
    onChange: e => setNome(e.target.value),
    placeholder: "Ex: Top gravador da semana",
    style: inp
  }), /*#__PURE__*/React.createElement(SheetLabel, null, "Vale por"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement(Seg, {
    options: [["empresa", "Empresa"], ["autonomo", "Autônomo"]],
    value: tipo,
    set: setTipo
  })), /*#__PURE__*/React.createElement(SheetLabel, null, "Crit\xE9rio"), /*#__PURE__*/React.createElement("input", {
    value: criterio,
    onChange: e => setCriterio(e.target.value),
    placeholder: "Ex: Mais horas gravadas no m\xEAs",
    style: inp
  }), /*#__PURE__*/React.createElement(SheetLabel, null, "Pr\xEAmio"), /*#__PURE__*/React.createElement("input", {
    value: premio,
    onChange: e => setPremio(e.target.value),
    placeholder: "Ex: B\xF4nus R$ 50",
    style: inp
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    full: true,
    disabled: !canSave,
    style: {
      opacity: canSave ? 1 : 0.4,
      cursor: canSave ? "pointer" : "not-allowed"
    },
    onClick: () => {
      if (canSave) {
        st.addGame({
          nome,
          tipo,
          criterio,
          premio
        });
        onClose();
      }
    }
  }, "Criar desafio"));
}
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/clonex_app/MetasScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/clonex_app/PeoplePanel.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Clonex JF — Sublíder's people panel ("Pessoas"). Identify who needs attention
// in seconds. Aggregate summary, search + filters, cards sorted behind-first.
const CP = window.ClonexDesignSystem_ca55ab;
const PEOPLE = [{
  name: "Rafael Diniz",
  jornada: "full",
  status: "ativo",
  weekPct: 40,
  weekDone: 10,
  weekGoal: 25,
  monthPct: 48,
  monthDone: 48,
  monthGoal: 100,
  approval: 82,
  env: 94,
  apr: 77,
  dias: "3/5",
  ata: true,
  ataData: "06/08",
  cicloInicio: "06/08",
  cicloFecha: "06/09",
  cicloDias: 9,
  fimSemana: 1,
  pillar: "quantity",
  alert: "parado há 4 dias"
}, {
  name: "Bruno Sales",
  jornada: "part",
  status: "ativo",
  weekPct: 52,
  weekDone: 13,
  weekGoal: 25,
  monthPct: 55,
  monthDone: 55,
  monthGoal: 100,
  approval: 71,
  env: 80,
  apr: 57,
  dias: "4/5",
  ata: true,
  ataData: "02/08",
  cicloInicio: "02/08",
  cicloFecha: "02/09",
  cicloDias: 2,
  fimSemana: 2,
  pillar: "quality",
  alert: "abaixo do ritmo"
}, {
  name: "Elaine Costa",
  jornada: "part",
  status: "ativo",
  weekPct: 60,
  weekDone: 15,
  weekGoal: 25,
  monthPct: 63,
  monthDone: 63,
  monthGoal: 100,
  approval: 88,
  env: 66,
  apr: 58,
  dias: "2/5",
  ata: true,
  ataData: "11/08",
  cicloInicio: "11/08",
  cicloFecha: "11/09",
  cicloDias: 6,
  fimSemana: 1,
  pillar: "predict"
}, {
  name: "Camila Ferraz",
  jornada: "full",
  status: "ativo",
  weekPct: 88,
  weekDone: 22,
  weekGoal: 25,
  monthPct: 76,
  monthDone: 76,
  monthGoal: 100,
  approval: 95,
  env: 120,
  apr: 114,
  dias: "5/5",
  ata: true,
  ataData: "20/07",
  cicloInicio: "20/07",
  cicloFecha: "20/08",
  cicloDias: 15,
  fimSemana: 1
}, {
  name: "Jonas Prado",
  jornada: "full",
  status: "ativo",
  weekPct: 92,
  weekDone: 23,
  weekGoal: 25,
  monthPct: 84,
  monthDone: 84,
  monthGoal: 100,
  approval: 90,
  env: 100,
  apr: 90,
  dias: "5/5",
  ata: true,
  ataData: "28/07",
  cicloInicio: "28/07",
  cicloFecha: "28/08",
  cicloDias: 23,
  fimSemana: 2
}, {
  name: "Vera Lúcia",
  jornada: "part",
  status: "encerrado",
  weekPct: 0,
  weekDone: 0,
  weekGoal: 25,
  monthPct: 31,
  monthDone: 31,
  monthGoal: 100,
  approval: 60,
  env: 40,
  apr: 24,
  dias: "0/5",
  ata: false,
  ataData: null,
  cicloInicio: "01/08",
  cicloFecha: "01/09",
  cicloDias: 4,
  fimSemana: 1
}];
function PeoplePanel({
  onOpen
}) {
  const {
    PersonCard,
    Pill,
    Icon,
    Battery,
    Card
  } = CP;
  const [filter, setFilter] = React.useState("todos");
  const ativos = PEOPLE.filter(p => p.status === "ativo");
  const noRitmo = ativos.filter(p => p.monthPct >= 60).length;
  const atrasados = ativos.length - noRitmo;
  const totalH = PEOPLE.reduce((s, p) => s + p.monthDone, 0);
  const weekDone = ativos.reduce((s, p) => s + p.weekDone, 0);
  const weekGoal = ativos.reduce((s, p) => s + p.weekGoal, 0);
  const monthDone = ativos.reduce((s, p) => s + p.monthDone, 0);
  const monthGoal = ativos.reduce((s, p) => s + p.monthGoal, 0);
  const weekPct = Math.round(weekDone / weekGoal * 100);
  const monthPct = Math.round(monthDone / monthGoal * 100);
  const fechando = PEOPLE.filter(p => p.status === "ativo" && p.cicloDias <= 5).sort((a, b) => a.cicloDias - b.cicloDias);
  let list = [...PEOPLE];
  if (filter === "atrasado") list = list.filter(p => p.status === "ativo" && p.monthPct < 60);
  if (filter === "encerrado") list = list.filter(p => p.status === "encerrado");
  list.sort((a, b) => a.monthPct - b.monthPct);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 0 24px"
    }
  }, /*#__PURE__*/React.createElement(ScreenHeader, {
    eyebrow: "Minha equipe \xB7 JF",
    title: "Pessoas"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 20px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      margin: "-6px 0 14px",
      fontSize: 11.5,
      color: "var(--faint)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "var(--pillar-predict)"
    }
  }), " Atualizado h\xE1 poucos segundos"), /*#__PURE__*/React.createElement(Card, {
    variant: "white",
    pad: 20,
    style: {
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      fontWeight: 500,
      letterSpacing: ".13em",
      textTransform: "uppercase",
      color: "var(--faint)",
      marginBottom: 14
    }
  }, "Meta da equipe"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 22
    }
  }, /*#__PURE__*/React.createElement(Battery, {
    label: "Semana",
    percent: weekPct,
    doneH: weekDone,
    goalH: weekGoal,
    tone: weekPct < 60 ? "warn" : "accent"
  }), /*#__PURE__*/React.createElement(Battery, {
    label: "M\xEAs",
    percent: monthPct,
    doneH: monthDone,
    goalH: monthGoal,
    tone: monthPct < 60 ? "warn" : "accent"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement(SourceButton, {
    payload: {
      title: "Meta da equipe",
      value: monthDone + "h de " + monthGoal + "h",
      origin: "Soma das horas de todos os ativos (Minute)",
      updated: "há poucos segundos",
      history: ativos.map(p => ({
        what: p.name + " · " + p.monthDone + "h",
        when: "mês"
      }))
    }
  }))), fechando.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--warn-soft)",
      border: "1px solid var(--warn-line)",
      borderRadius: "var(--r-sm)",
      padding: "13px 15px",
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      fontWeight: 500,
      letterSpacing: ".1em",
      textTransform: "uppercase",
      color: "var(--warn-ink)",
      marginBottom: 8
    }
  }, "Ciclo fechando"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6
    }
  }, fechando.map(p => /*#__PURE__*/React.createElement("div", {
    key: p.name,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      fontSize: 13.5,
      color: "var(--ink)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "var(--warn)",
      flex: "none"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, p.name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      color: "var(--warn-ink)"
    }
  }, "fecha ", p.cicloFecha, " \xB7 ", p.cicloDias, "d")))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: "var(--muted)",
      marginTop: 8,
      lineHeight: 1.4
    }
  }, "Confira os dados antes do pagamento do fechamento.")), "        ", /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 10,
      marginBottom: 16
    }
  }, [["6", "pessoas ativas"], [totalH + "h", "no mês"], [atrasados, "atrasadas"]].map(([n, l], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      background: "var(--card)",
      border: "1px solid var(--line2)",
      borderRadius: 14,
      padding: "14px 14px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 20,
      fontWeight: 520,
      letterSpacing: "-.02em",
      color: i === 2 && atrasados > 0 ? "var(--warn)" : "var(--ink)"
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: "var(--faint)",
      marginTop: 3,
      lineHeight: 1.3
    }
  }, l)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 9,
      background: "var(--surface)",
      border: "1px solid var(--line)",
      borderRadius: 999,
      padding: "10px 15px",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 17,
    color: "var(--faint)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: "var(--faint)"
    }
  }, "Buscar por nome")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 16,
      overflowX: "auto"
    }
  }, [["todos", "Todos"], ["atrasado", "Atrasados"], ["encerrado", "Encerrados"]].map(([k, l]) => /*#__PURE__*/React.createElement("button", {
    key: k,
    onClick: () => setFilter(k),
    style: {
      border: "none",
      background: "none",
      padding: 0,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(Pill, {
    variant: filter === k ? "accent" : "neutral",
    dot: filter === k
  }, l)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 11
    }
  }, list.map(p => /*#__PURE__*/React.createElement(PersonCard, _extends({
    key: p.name
  }, p, {
    onClick: () => onOpen && onOpen(p)
  }))))));
}
window.PeoplePanel = PeoplePanel;
window.CLONEX_PEOPLE = PEOPLE;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/clonex_app/PeoplePanel.jsx", error: String((e && e.message) || e) }); }

// ui_kits/clonex_app/ReportScreen.jsx
try { (() => {
// Clonex JF — Relatório consolidado (sublíder). The three pillars with team
// numbers, formatted to copy/send as text. Future module — simple version.
const CR = window.ClonexDesignSystem_ca55ab;
function ReportScreen() {
  const {
    Card,
    ProgressBar,
    Button,
    Icon,
    PillarDot
  } = CR;
  const ppl = window.CLONEX_PEOPLE || [];
  const totEnv = ppl.reduce((s, p) => s + (p.env || 0), 0);
  const totApr = ppl.reduce((s, p) => s + (p.apr || 0), 0);
  const totH = ppl.reduce((s, p) => s + p.monthDone, 0);
  const noRitmo = ppl.filter(p => p.dias && Number(p.dias.split("/")[0]) >= 4).length;
  const pillars = [{
    key: "quantity",
    label: "Quantidade",
    value: totH + "h",
    note: "de 600h de meta da equipe",
    pct: 58,
    origin: "Soma das horas gravadas de cada pessoa (Minute)",
    history: ppl.map(p => ({
      what: p.name + " · " + p.monthDone + "h de " + p.monthGoal + "h",
      when: Math.round(p.monthDone / p.monthGoal * 100) + "%"
    }))
  }, {
    key: "predict",
    label: "Previsibilidade",
    value: noRitmo + " de " + ppl.length,
    note: "pessoas gravando todo dia",
    pct: 67,
    origin: "Dias com gravação por pessoa na semana",
    history: ppl.map(p => ({
      what: p.name + " · " + p.dias + " dias",
      when: Math.round(Number(p.dias.split("/")[0]) / Number(p.dias.split("/")[1]) * 100) + "%"
    }))
  }, {
    key: "quality",
    label: "Qualidade",
    value: Math.round(totApr / totEnv * 100) + "%",
    note: totApr + " de " + totEnv + " uploads aprovados",
    pct: 87,
    origin: "Revisão de qualidade da Clonex — todas as aprovações",
    history: ppl.map(p => ({
      what: p.name + " · " + p.apr + " de " + p.env + " aprovados",
      when: p.approval + "%"
    }))
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 0 24px"
    }
  }, /*#__PURE__*/React.createElement(ScreenHeader, {
    eyebrow: "Minha equipe \xB7 JF \xB7 Agosto",
    title: "Relat\xF3rio",
    right: /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "report",
      size: 16
    }), " Copiar")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 20px",
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, pillars.map(p => /*#__PURE__*/React.createElement(Card, {
    key: p.key,
    pad: 18,
    style: {
      cursor: "pointer"
    },
    onClick: () => openSource({
      title: p.label,
      value: p.value,
      origin: p.origin,
      updated: "há poucos segundos",
      history: p.history
    })
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement(PillarDot, {
    pillar: p.key,
    size: 9
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      fontWeight: 500,
      letterSpacing: ".13em",
      textTransform: "uppercase",
      color: "var(--faint)"
    }
  }, p.label), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto",
      display: "inline-flex"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevronRight",
    size: 16,
    color: "var(--faint)"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 30,
      fontWeight: 520,
      letterSpacing: "-.03em",
      lineHeight: 1,
      color: "var(--ink)"
    }
  }, p.value), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "var(--muted)",
      margin: "7px 0 14px"
    }
  }, p.note), /*#__PURE__*/React.createElement(ProgressBar, {
    percent: p.pct,
    tone: p.key === "quantity" && p.pct < 60 ? "warn" : "accent"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: "var(--faint)",
      marginTop: 12
    }
  }, "Toque pra ver de onde vem \u2014 pessoa por pessoa."))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: "var(--faint)",
      lineHeight: 1.5,
      padding: "2px 2px 0"
    }
  }, "Fechamento parcial de agosto. O relat\xF3rio completo por cidade \xE9 gerado pelo Agente Bra\xE7o Direito e enviado ao l\xEDder geral.")));
}
window.ReportScreen = ReportScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/clonex_app/ReportScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/clonex_app/Shell.jsx
try { (() => {
// Clonex JF app — shared UI-kit primitives (phone chrome, headers, data-source sheet).
// App-wide weights are de-bolded via the .phone CSS var overrides in index.html;
// literal weights here are kept in the non-bold 400–540 range to match the wordmark.
const C = window.ClonexDesignSystem_ca55ab;
function ScreenHeader({
  eyebrow,
  title,
  right
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      padding: "8px 20px 16px",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, eyebrow && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      fontWeight: 540,
      letterSpacing: ".13em",
      textTransform: "uppercase",
      color: "var(--faint)",
      marginBottom: 6
    }
  }, eyebrow), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: 500,
      letterSpacing: "-.02em",
      color: "var(--ink)",
      lineHeight: 1.1
    }
  }, title)), right && /*#__PURE__*/React.createElement("div", {
    style: {
      marginRight: 140,
      marginTop: 2
    }
  }, right));
}
function SectionLabel({
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      fontWeight: 540,
      letterSpacing: ".13em",
      textTransform: "uppercase",
      color: "var(--faint)",
      margin: "0 0 10px",
      ...style
    }
  }, children);
}
function StatusBar() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 22px 2px",
      fontSize: 13,
      fontWeight: 500,
      color: "var(--ink)",
      letterSpacing: "-.01em"
    }
  }, /*#__PURE__*/React.createElement("span", null, "9:41"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      gap: 6,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "17",
    height: "11",
    viewBox: "0 0 17 11",
    fill: "var(--ink)"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "6",
    width: "3",
    height: "5",
    rx: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "4.5",
    y: "4",
    width: "3",
    height: "7",
    rx: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "9",
    y: "2",
    width: "3",
    height: "9",
    rx: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "13.5",
    y: "0",
    width: "3",
    height: "11",
    rx: "1"
  })), /*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "11",
    viewBox: "0 0 22 11"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0.5",
    y: "0.5",
    width: "18",
    height: "10",
    rx: "2.5",
    fill: "none",
    stroke: "var(--ink)",
    strokeOpacity: "0.4"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "2",
    width: "13",
    height: "7",
    rx: "1.2",
    fill: "var(--ink)"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "20",
    y: "3.5",
    width: "1.5",
    height: "4",
    rx: "0.75",
    fill: "var(--ink)",
    fillOpacity: "0.4"
  }))));
}

// --- Data provenance -------------------------------------------------------
// Any datum can be tapped to reveal where it came from + its change history.
let _srcCb = null;
function registerSource(cb) {
  _srcCb = cb;
}
function openSource(payload) {
  _srcCb && _srcCb(payload);
}

// Small "origem" affordance placed next to a shown value.
function SourceButton({
  payload,
  style
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      openSource(payload);
    },
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      border: "1px solid var(--line)",
      background: "var(--surface)",
      borderRadius: 999,
      padding: "3px 9px 3px 7px",
      cursor: "pointer",
      color: "var(--muted)",
      fontFamily: "var(--font-sans)",
      fontSize: 11,
      fontWeight: 480,
      letterSpacing: "-.005em",
      ...style
    }
  }, /*#__PURE__*/React.createElement(C.Icon, {
    name: "info",
    size: 13,
    color: "var(--faint)"
  }), " origem");
}
function SourceSheet({
  source,
  onClose
}) {
  const open = !!source;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "absolute",
      inset: 0,
      zIndex: 40,
      display: "flex",
      alignItems: "flex-end",
      pointerEvents: open ? "auto" : "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "rgba(20,20,20,.28)",
      transition: "opacity .28s ease",
      opacity: open ? 1 : 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      position: "relative",
      width: "100%",
      background: "var(--surface)",
      borderRadius: "22px 22px 0 0",
      padding: "12px 20px calc(24px + env(safe-area-inset-bottom,6px))",
      boxShadow: "0 -10px 40px rgba(20,20,20,.2)",
      transform: open ? "translateY(0)" : "translateY(102%)",
      transition: "transform .3s cubic-bezier(.22,.61,.36,1)",
      fontFamily: "var(--font-sans)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 38,
      height: 4,
      borderRadius: 999,
      background: "var(--line)",
      margin: "0 auto 16px"
    }
  }), source && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      fontWeight: 540,
      letterSpacing: ".13em",
      textTransform: "uppercase",
      color: "var(--faint)",
      marginBottom: 6
    }
  }, "De onde vem"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 19,
      fontWeight: 500,
      letterSpacing: "-.02em",
      color: "var(--ink)"
    }
  }, source.title), source.value != null && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 28,
      fontWeight: 540,
      letterSpacing: "-.03em",
      color: "var(--ink)",
      margin: "8px 0 2px"
    }
  }, source.value), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 7,
      margin: "12px 0 4px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "var(--accent)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13.5,
      color: "var(--ink2)"
    }
  }, source.origin)), source.updated && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--faint)",
      marginBottom: 16
    }
  }, "\xDAltima atualiza\xE7\xE3o: ", source.updated), source.history && source.history.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid var(--line2)",
      paddingTop: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 7,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement(C.Icon, {
    name: "history",
    size: 15,
    color: "var(--faint)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      fontWeight: 500,
      color: "var(--muted)"
    }
  }, "Hist\xF3rico")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 0
    }
  }, source.history.map((h, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      gap: 12,
      padding: "10px 0",
      borderBottom: i < source.history.length - 1 ? "1px solid var(--line2)" : "none"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: "var(--ink)",
      flex: 1,
      lineHeight: 1.4
    }
  }, h.what), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      color: "var(--faint)",
      whiteSpace: "nowrap"
    }
  }, h.when))))))));
}
Object.assign(window, {
  ScreenHeader,
  SectionLabel,
  StatusBar,
  SourceButton,
  SourceSheet,
  registerSource,
  openSource
});

// --- Shared data store -----------------------------------------------------
// Sessions (registros) + equipment. All metrics are derived, never stored.
const store = {
  // earlier-in-period accumulated minutes (before the seeded recent sessions)
  baseMonthMin: 2280,
  baseWeekMin: 540,
  myCode: null,
  // código VZ3033… que o membro recebe do sublíder
  setCode(c) {
    this.myCode = c ? c.toUpperCase().trim() : null;
    this.emit();
  },
  // Financeiro + ciclo pessoal + onboarding (membro Rafael)
  valorHora: 15,
  // R$/hora definido no cadastro
  // Faixas de remuneração por horas no ciclo
  faixaFor(horas) {
    if (horas > 90) return {
      nome: "Full",
      vh: 15,
      min: 91,
      max: Infinity
    };
    if (horas > 60) return {
      nome: "Intermediária",
      vh: 12,
      min: 61,
      max: 90
    };
    return {
      nome: "Básica",
      vh: 10,
      min: 0,
      max: 60
    };
  },
  FAIXAS: [{
    nome: "Básica",
    faixa: "Até 60h",
    vh: 10,
    lim: 60
  }, {
    nome: "Intermediária",
    faixa: "61h a 90h",
    vh: 12,
    lim: 90
  }, {
    nome: "Full",
    faixa: "Acima de 90h",
    vh: 15,
    lim: Infinity
  }],
  descontos: 25,
  // R$ descontados antes do pagamento final
  descontoMotivo: "adiantamento de equipamento",
  ciclo: {
    inicio: "06/08",
    fecha: "06/09",
    diasRestantes: 9
  },
  // ciclo ancorado na data de entrada
  fimDeSemana: 1,
  // 1 = sáb+dom · 2 = dom+seg
  ataAssinada: false,
  // gate de onboarding
  dataAssinatura: null,
  confirmAta(info) {
    this.ataAssinada = true;
    this.dataAssinatura = info && info.data || info;
    this.aceiteDigital = {
      data: info && info.data || info,
      hora: "09:41",
      itens: info && info.itens || 0,
      ident: !!(info && info.ident),
      foto: !!(info && info.foto)
    };
    this.emit();
  },
  aceiteDigital: null,
  // Inventário central de equipamentos — cadastrado pelo líder geral, disponibilizado
  // a todos os sublíderes. status: disponivel | em_uso | solicitado.
  pool: [{
    id: "p1",
    tipo: "capacete",
    modelo: "Tam. M",
    status: "em_uso",
    quem: "Rafael Diniz",
    sub: "Você (JF-1)"
  }, {
    id: "p2",
    tipo: "capacete",
    modelo: "Tam. G",
    status: "em_uso",
    quem: "Bruno Sales",
    sub: "Você (JF-1)"
  }, {
    id: "p3",
    tipo: "capacete",
    modelo: "Tam. M",
    status: "disponivel",
    quem: null,
    sub: null
  }, {
    id: "p4",
    tipo: "capacete",
    modelo: "Tam. P",
    status: "disponivel",
    quem: null,
    sub: null
  }, {
    id: "p5",
    tipo: "capacete",
    modelo: "Tam. G",
    status: "solicitado",
    quem: "Marina Alves (JF-2)",
    sub: "Marina Alves (JF-2)"
  }, {
    id: "p6",
    tipo: "celular",
    modelo: "Galaxy S23",
    status: "em_uso",
    quem: "Camila Ferraz",
    sub: "Você (JF-1)"
  }, {
    id: "p7",
    tipo: "celular",
    modelo: "iPhone 13",
    status: "disponivel",
    quem: null,
    sub: null
  }, {
    id: "p8",
    tipo: "celular",
    modelo: "Moto G84",
    status: "disponivel",
    quem: null,
    sub: null
  }, {
    id: "p9",
    tipo: "celular",
    modelo: "iPhone 12",
    status: "solicitado",
    quem: "Você (JF-1)",
    sub: "Você (JF-1)"
  }],
  addPoolItem(it) {
    this.pool.push({
      id: "p" + Date.now(),
      status: "disponivel",
      quem: null,
      sub: null,
      ...it
    });
    this.emit();
  },
  requestReserve(id, sub) {
    const p = this.pool.find(x => x.id === id);
    if (p && p.status === "disponivel") {
      p.status = "solicitado";
      p.quem = sub;
      p.sub = sub;
      this.logActivity(sub, "Solicitou reserva de " + this._eqName(p));
      this.emit();
    }
  },
  poolTotals() {
    const by = t => this.pool.filter(p => p.tipo === t);
    const st = (arr, s) => arr.filter(p => p.status === s).length;
    const cap = by("capacete"),
      cel = by("celular");
    return {
      cap: cap.length,
      cel: cel.length,
      capUso: st(cap, "em_uso"),
      capDisp: st(cap, "disponivel"),
      capSol: st(cap, "solicitado"),
      celUso: st(cel, "em_uso"),
      celDisp: st(cel, "disponivel"),
      celSol: st(cel, "solicitado"),
      emUso: st(this.pool, "em_uso"),
      disp: st(this.pool, "disponivel"),
      sol: st(this.pool, "solicitado")
    };
  },
  capTotal: 12,
  celTotal: 12,
  // totais oficiais editáveis pelo líder geral
  setPoolTotal(tipo, n) {
    if (tipo === "capacete") this.capTotal = Math.max(0, n);else this.celTotal = Math.max(0, n);
    this.emit();
  },
  // Pagamentos realizados / previstos — controle do sublíder e do líder geral.
  pagamentos: [{
    id: "pg1",
    name: "Camila Ferraz",
    sub: "Você (JF-1)",
    tipo: "empresa",
    horas: 76,
    valor: 1140,
    status: "pago",
    periodo: "20/07–20/08",
    data: "20/08"
  }, {
    id: "pg2",
    name: "Jonas Prado",
    sub: "Você (JF-1)",
    tipo: "autonomo",
    horas: 84,
    valor: 1260,
    status: "pago",
    periodo: "28/07–28/08",
    data: "28/08"
  }, {
    id: "pg3",
    name: "Rafael Diniz",
    sub: "Você (JF-1)",
    tipo: "empresa",
    horas: 48,
    valor: 720,
    status: "previsto",
    periodo: "06/08–06/09",
    data: "06/09"
  }, {
    id: "pg4",
    name: "Bruno Sales",
    sub: "Você (JF-1)",
    tipo: "empresa",
    horas: 55,
    valor: 825,
    status: "previsto",
    periodo: "02/08–02/09",
    data: "02/09"
  }, {
    id: "pg5",
    name: "Elaine Costa",
    sub: "Marina Alves (JF-2)",
    tipo: "autonomo",
    horas: 63,
    valor: 945,
    status: "adiantado",
    periodo: "11/08–11/09",
    data: "11/09"
  }],
  myGoal: 100,
  // meta pessoal do membro (horas/mês) — definida pelo sublíder
  setGoal(h) {
    this.myGoal = Math.max(0, h);
    this.emit();
  },
  memberGoals: {},
  // metas por pessoa, definidas pelo sublíder (base 100h)
  getGoal(name) {
    return this.memberGoals[name] != null ? this.memberGoals[name] : 100;
  },
  setMemberGoal(name, h) {
    this.memberGoals[name] = Math.max(0, h);
    if (name === "Rafael Diniz") this.myGoal = this.memberGoals[name];
    this.logActivity(name, "Meta do mês definida pelo sublíder: " + this.memberGoals[name] + "h");
    this.emit();
  },
  nicho: "lavajato",
  // nicho do trabalho — dirige as ações no Novo registro
  setNicho(n) {
    this.nicho = n;
    this.emit();
  },
  profile: {
    nome: "Rafael Diniz",
    papel: "Membro da equipe",
    tipo: "empresa",
    empresa: "Construtora Vale",
    email: "user420018163470@yopmail.com",
    sublider: "Você (Sublíder JF-1)"
  },
  pessoal: {
    telefone: "",
    cpf: "",
    nascimento: "",
    endereco: "",
    pix: ""
  },
  savePessoal(p) {
    this.pessoal = {
      ...this.pessoal,
      ...p
    };
    this.emit();
  },
  mySelos: [{
    nome: "Constância 7 dias",
    tipo: "ouro"
  }, {
    nome: "1ª meta batida",
    tipo: "prata"
  }, {
    nome: "Qualidade 90%+",
    tipo: "bronze"
  }],
  games: [{
    id: "g1",
    nome: "Top gravador da semana",
    tipo: "empresa",
    criterio: "Mais horas gravadas",
    selo: "Selo Ouro"
  }, {
    id: "g2",
    nome: "Constância",
    tipo: "autonomo",
    criterio: "Gravar todos os dias úteis",
    selo: "Selo Constância"
  }],
  addGame(g) {
    this.games.unshift({
      id: "g" + Date.now(),
      ...g
    });
    this.emit();
  },
  removeGame(id) {
    this.games = this.games.filter(x => x.id !== id);
    this.emit();
  },
  equipment: [{
    id: "eq1",
    tipo: "capacete",
    modelo: "Tam. M",
    origem: "da Clonex",
    disponivel: true,
    aprov: "aprovado"
  }, {
    id: "eq2",
    tipo: "celular",
    modelo: "iPhone 12",
    origem: "próprio",
    disponivel: true,
    aprov: "aprovado"
  }],
  requests: [],
  // solicitações do membro aguardando o sublíder
  notifications: [],
  // avisos de cada ação, pro membro
  activity: [
  // histórico de ações dos membros, pro sublíder
  {
    id: "a1",
    name: "Rafael Diniz",
    acao: "Registrou gravação · Preparo de massa (2h 24m)",
    when: "hoje · 16:40"
  }, {
    id: "a2",
    name: "Camila Ferraz",
    acao: "Registrou gravação · Lavagem externa (3h)",
    when: "hoje · 15:02"
  }, {
    id: "a3",
    name: "Bruno Sales",
    acao: "Cadastrou celular · Galaxy A54 (próprio)",
    when: "hoje · 11:20"
  }, {
    id: "a4",
    name: "Elaine Costa",
    acao: "Atualizou status pra aprovado · Poda de jardim",
    when: "ontem · 18:11"
  }, {
    id: "a5",
    name: "Jonas Prado",
    acao: "Marcou capacete como indisponível",
    when: "ontem · 09:05"
  }],
  logActivity(name, acao) {
    this.activity.unshift({
      id: "a" + Date.now() + Math.random().toString(36).slice(2, 5),
      name,
      acao,
      when: "agora"
    });
  },
  // Notificações in-app por papel (destinatário de cada ação).
  notifByRole: {
    membro: [{
      id: "nm1",
      texto: "Seu sublíder aprovou seu equipamento · capacete Tam. M",
      when: "hoje · 17:10"
    }, {
      id: "nm2",
      texto: "Meta do mês definida pelo seu sublíder: 100h",
      when: "hoje · 09:30"
    }, {
      id: "nm3",
      texto: "Upload aprovado · Preparo de massa (2h 24m)",
      when: "ontem · 16:40"
    }],
    subleader: [{
      id: "ns1",
      texto: "Rafael Diniz registrou gravação · Preparo de massa (2h 24m)",
      when: "agora"
    }, {
      id: "ns2",
      texto: "Bruno Sales solicitou aprovação de celular · Galaxy A54",
      when: "hoje · 11:20"
    }, {
      id: "ns3",
      texto: "Camila Ferraz está com ciclo fechando em 2 dias",
      when: "hoje · 08:00"
    }],
    lider: [{
      id: "nl1",
      texto: "Sublíder Gasparetto criou 2 novas contas de membro",
      when: "hoje · 14:05"
    }, {
      id: "nl2",
      texto: "Equipe Duda: 5 membros abaixo do ritmo do ciclo",
      when: "hoje · 10:12"
    }, {
      id: "nl3",
      texto: "2 pessoas Full-time sem celular — reserva pendente",
      when: "ontem · 19:40"
    }]
  },
  notify(role, texto) {
    (this.notifByRole[role] = this.notifByRole[role] || []).unshift({
      id: "n" + Date.now() + Math.random().toString(36).slice(2, 5),
      texto,
      when: "agora"
    });
    this.emit();
  },
  sessions: [{
    id: "s1",
    data: "hoje",
    min: 144,
    tarefa: "Preparo de massa",
    equip: "eq1",
    status: "aprovado",
    upd: "hoje · 16:40"
  }, {
    id: "s2",
    data: "hoje",
    min: 48,
    tarefa: "Conserto de motor",
    equip: "eq1",
    status: "pendente",
    upd: null
  }, {
    id: "s3",
    data: "ontem",
    min: 186,
    tarefa: "Poda de jardim",
    equip: "eq1",
    status: "aprovado",
    upd: "ontem"
  }, {
    id: "s4",
    data: "ontem",
    min: 96,
    tarefa: "Montagem de peça",
    equip: "eq2",
    status: "aprovado",
    upd: "ontem"
  }, {
    id: "s5",
    data: "2 dias",
    min: 120,
    tarefa: "Preparo de massa",
    equip: "eq1",
    status: "reprovado",
    upd: "ontem · enquadramento"
  }],
  listeners: new Set(),
  emit() {
    this.listeners.forEach(l => l());
  },
  addSession(s) {
    this.sessions.unshift({
      id: "s" + Date.now(),
      status: "pendente",
      upd: null,
      ...s
    });
    this.logActivity("Rafael Diniz", "Registrou gravação · " + s.tarefa + " (" + fmtH(s.min) + ")");
    this.emit();
  },
  setStatus(id, status) {
    const x = this.sessions.find(s => s.id === id);
    if (x) {
      x.status = status;
      x.upd = status === "pendente" ? null : "agora";
      this.logActivity("Rafael Diniz", "Mudou status pra " + status + " · " + x.tarefa);
      this.emit();
    }
  },
  addEquip(e) {
    this.equipment.push({
      id: "eq" + Date.now(),
      disponivel: true,
      aprov: "aprovado",
      ...e
    });
    this.emit();
  },
  _eqName(i) {
    return (i.tipo === "capacete" ? "Capacete" : "Celular") + (i.modelo ? " · " + i.modelo : "");
  },
  _req(tipo, equipId, payload) {
    this.requests.unshift({
      id: "r" + Date.now() + Math.random().toString(36).slice(2, 5),
      tipo,
      equipId,
      payload,
      name: "Rafael Diniz",
      status: "pendente",
      when: "agora"
    });
  },
  _notify(text) {
    this.notifications.unshift({
      id: "n" + Date.now() + Math.random().toString(36).slice(2, 5),
      text,
      when: "agora"
    });
  },
  _reqLabel(r) {
    return {
      add: "cadastro",
      edit: "edição",
      remove: "remoção"
    }[r.tipo] + " de equipamento";
  },
  requestAdd(item) {
    const id = "eq" + Date.now();
    this.equipment.push({
      id,
      disponivel: true,
      aprov: "pendente",
      ...item
    });
    this._req("add", id, item);
    this._notify("Você cadastrou " + this._eqName(item) + ". Enviado pro sublíder aprovar.");
    this.logActivity("Rafael Diniz", "Cadastrou " + this._eqName(item) + " (" + item.origem + ")");
    this.emit();
  },
  requestEdit(id, patch) {
    this._req("edit", id, patch);
    this._notify("Edição de " + this.equipLabel(id) + " enviada pro sublíder aprovar.");
    this.emit();
  },
  requestRemove(id) {
    this._req("remove", id, null);
    this._notify("Remoção de " + this.equipLabel(id) + " enviada pro sublíder aprovar.");
    this.emit();
  },
  approveRequest(rid) {
    const r = this.requests.find(x => x.id === rid);
    if (!r) return;
    if (r.tipo === "add") {
      const e = this.equipment.find(x => x.id === r.equipId);
      if (e) e.aprov = "aprovado";
    }
    if (r.tipo === "edit") {
      const e = this.equipment.find(x => x.id === r.equipId);
      if (e) Object.assign(e, r.payload);
    }
    if (r.tipo === "remove") {
      this.equipment = this.equipment.filter(x => x.id !== r.equipId);
    }
    r.status = "aprovado";
    this._notify("Seu sublíder aprovou a " + this._reqLabel(r) + ".");
    this.emit();
  },
  rejectRequest(rid) {
    const r = this.requests.find(x => x.id === rid);
    if (!r) return;
    if (r.tipo === "add") {
      this.equipment = this.equipment.filter(x => x.id !== r.equipId);
    }
    r.status = "reprovado";
    this._notify("Seu sublíder recusou a " + this._reqLabel(r) + ".");
    this.emit();
  },
  addTeamEquip(name, item) {
    if (name === "Rafael Diniz") {
      this.addEquip(item);
      return;
    }
    const row = (window.CLONEX_TEAM_EQUIP || []).find(r => r.name === name);
    if (row) {
      row.items.push({
        disponivel: true,
        ...item
      });
      this.emit();
    }
  },
  updateEquip(id, patch) {
    const e = this.equipment.find(x => x.id === id);
    if (e) {
      Object.assign(e, patch);
      this.emit();
    }
  },
  removeEquip(id) {
    this.equipment = this.equipment.filter(x => x.id !== id);
    this.emit();
  },
  toggleEquip(id) {
    const e = this.equipment.find(x => x.id === id);
    if (e) {
      e.disponivel = !e.disponivel;
      this.emit();
    }
  },
  equipLabel(id) {
    const e = this.equipment.find(x => x.id === id);
    return e ? (e.tipo === "capacete" ? "Capacete" : "Celular") + (e.modelo ? " · " + e.modelo : "") : "—";
  },
  totals() {
    const min = this.sessions.reduce((s, x) => s + x.min, 0);
    const apprMin = this.sessions.filter(x => x.status === "aprovado").reduce((s, x) => s + x.min, 0);
    const todayMin = this.sessions.filter(x => x.data === "hoje").reduce((s, x) => s + x.min, 0);
    const monthMin = this.baseMonthMin + min,
      weekMin = this.baseWeekMin + min;
    return {
      monthH: monthMin / 60,
      weekH: weekMin / 60,
      todayH: todayMin / 60,
      apprPct: min ? Math.round(apprMin / min * 100) : 0,
      apprMin,
      min
    };
  }
};
function useStore() {
  const [, force] = React.useReducer(x => x + 1, 0);
  React.useEffect(() => {
    store.listeners.add(force);
    return () => store.listeners.delete(force);
  }, []);
  return store;
}
function fmtH(min) {
  const h = Math.floor(min / 60),
    m = Math.round(min % 60);
  return m ? `${h}h ${m}m` : `${h}h`;
}
function fmtBRL(v) {
  return "R$ " + v.toFixed(2).replace(".", ",");
}
const STATUS_META = {
  pendente: {
    label: "pendente",
    variant: "neutral"
  },
  aprovado: {
    label: "aprovado",
    variant: "accent"
  },
  reprovado: {
    label: "reprovado",
    variant: "warn"
  }
};
// Sublíderes da operação de JF — usados no cadastro de participante (sublider_id).
const SUBLIDERES = ["Você (Sublíder JF-1)", "Marina Alves (JF-2)", "Diego Ramos (JF-3)"];
// Ações por nicho — o Novo registro mostra as ações do nicho do trabalhador.
const NICHE_LABELS = {
  lavajato: "Lava-jato",
  estetica: "Estética",
  padaria: "Padaria",
  mecanica: "Mecânica",
  geral: "Geral"
};
const NICHE_ACTIONS = {
  lavajato: ["Lavagem externa", "Lavagem interna", "Higienização", "Enceramento", "Aspiração", "Secagem"],
  estetica: ["Corte de cabelo", "Manicure", "Design de sobrancelha", "Maquiagem", "Limpeza de pele", "Massagem"],
  padaria: ["Preparo de massa", "Modelagem de pão", "Forneamento", "Confeitaria", "Atendimento no balcão"],
  mecanica: ["Conserto de motor", "Troca de óleo", "Alinhamento", "Diagnóstico", "Montagem de peça"],
  geral: ["Preparo de massa", "Conserto de motor", "Poda de jardim", "Montagem de peça", "Atendimento", "Limpeza"]
};
// Rollup por sublíder — usado na visão do Líder Geral (acima dos sublíderes).
const SUBLIDER_ROLLUP = [{
  name: "Você (JF-1)",
  pessoas: 6,
  ativos: 5,
  horas: 347,
  meta: 600,
  aprov: 87,
  predict: "4/6",
  capacetes: 6,
  celulares: 6,
  pillar: "quantity"
}, {
  name: "Marina Alves (JF-2)",
  pessoas: 5,
  ativos: 5,
  horas: 402,
  meta: 500,
  aprov: 91,
  predict: "5/5",
  capacetes: 5,
  celulares: 5
}, {
  name: "Diego Ramos (JF-3)",
  pessoas: 4,
  ativos: 3,
  horas: 188,
  meta: 400,
  aprov: 74,
  predict: "2/4",
  capacetes: 3,
  celulares: 4,
  pillar: "predict"
}];
// Pools de login por empresa — cada funcionário usa um login diferente (email+senha+code
// da planilha). Empresa puxa desse pool; autônomo cadastra o próprio.
const COMPANY_LOGINS = {
  "Construtora Vale": [{
    email: "user420018099078@yopmail.com",
    emailUser: "420018099078",
    senha: "Admin@_9485",
    code: "VZEAE7WC",
    usado: true
  }, {
    email: "user420018163470@yopmail.com",
    emailUser: "420018163470",
    senha: "Admin@_6639",
    code: "VZEAE7WC",
    usado: false
  }, {
    email: "user420018296445@yopmail.com",
    emailUser: "420018296445",
    senha: "Admin@_7657",
    code: "VZEAE7WC",
    usado: false
  }, {
    email: "user420018426663@yopmail.com",
    emailUser: "420018426663",
    senha: "Admin@_3205",
    code: "VZEAE7WC",
    usado: false
  }],
  "Padaria Central": [{
    email: "user420018598544@yopmail.com",
    emailUser: "420018598544",
    senha: "Admin@_4644",
    code: "VZEAE7WC",
    usado: false
  }, {
    email: "user420018672301@yopmail.com",
    emailUser: "420018672301",
    senha: "Admin@_9528",
    code: "VZEAE7WC",
    usado: false
  }, {
    email: "user420018783349@yopmail.com",
    emailUser: "420018783349",
    senha: "Admin@_5707",
    code: "VZEAE7WC",
    usado: false
  }]
};
Object.assign(window, {
  ClonexStore: store,
  useStore,
  fmtH,
  fmtBRL,
  STATUS_META,
  SUBLIDERES,
  COMPANY_LOGINS,
  NICHE_LABELS,
  NICHE_ACTIONS,
  SUBLIDER_ROLLUP
});

// --- Contas da plataforma (novo padrão Clonex) -----------------------------
// Login fixo + senha temporária (Clonex@[nome][2díg]) trocada no 1º acesso.
// Contas nascem "salva" (desabilitada) até o organizador habilitar.
store.accounts = [{
  id: "ac1",
  nome: "Pedro",
  login: "clonex.pedro.sub@clonexlabs.com",
  temp: "Clonex@Pedro01",
  papel: "Sublíder",
  status: "salva"
}, {
  id: "ac2",
  nome: "Lucas",
  login: "clonex.lucas.sub@clonexlabs.com",
  temp: "Clonex@Lucas01",
  papel: "Sublíder",
  status: "salva"
}, {
  id: "ac3",
  nome: "Mateus",
  login: "clonex.mateus.sub@clonexlabs.com",
  temp: "Clonex@Mateus01",
  papel: "Sublíder",
  status: "salva"
}, {
  id: "ac4",
  nome: "Duda",
  login: "clonex.duda.sub@clonexlabs.com",
  temp: "Clonex@Duda01",
  papel: "Sublíder",
  status: "salva"
}, {
  id: "ac5",
  nome: "Camarota",
  login: "clonex.camarota.sub@clonexlabs.com",
  temp: "Clonex@Camarota01",
  papel: "Sublíder",
  status: "salva"
}, {
  id: "ac6",
  nome: "Gasparetto",
  login: "clonex.gasparetto.sub@clonexlabs.com",
  temp: "Clonex@Gaspar01",
  papel: "Sublíder",
  status: "salva"
}, {
  id: "ac7",
  nome: "Thomás",
  login: "clonex.thomas.sub@clonexlabs.com",
  temp: "Clonex@Thomas01",
  papel: "Sublíder",
  status: "salva"
}, {
  id: "ac8",
  nome: "Pedro",
  login: "clonex.pedro.lider@clonexlabs.com",
  temp: "Clonex@PedroLid01",
  papel: "Líder geral",
  status: "salva"
}, {
  id: "ac9",
  nome: "Lucas",
  login: "clonex.lucas.lider@clonexlabs.com",
  temp: "Clonex@LucasLid01",
  papel: "Líder geral",
  status: "salva"
}, {
  id: "ac10",
  nome: "Mateus",
  login: "clonex.mateus.lider@clonexlabs.com",
  temp: "Clonex@MateusLid01",
  papel: "Líder geral",
  status: "salva"
}, {
  id: "ac11",
  nome: "Otto",
  login: "clonex.otto.lider@clonexlabs.com",
  temp: "Clonex@OttoLid01",
  papel: "Líder geral / Gestor",
  status: "salva"
}];
store.enableAccount = function (id) {
  const a = this.accounts.find(x => x.id === id);
  if (a) {
    a.status = "ativa_temp";
    this.emit();
  }
};
store.disableAccount = function (id) {
  const a = this.accounts.find(x => x.id === id);
  if (a) {
    a.status = "salva";
    this.emit();
  }
};
store.resendAccess = function (id) {
  const a = this.accounts.find(x => x.id === id);
  if (a) {
    a.temp = "Clonex@" + a.nome.replace(/[^A-Za-z]/g, "").slice(0, 6) + String(Math.floor(Math.random() * 90) + 10);
    a.status = "ativa_temp";
    this.emit();
  }
};
store.markTrocada = function (id) {
  const a = this.accounts.find(x => x.id === id);
  if (a) {
    a.status = "ativa";
    this.emit();
  }
};
store.createAccount = function (nome, papel) {
  const slug = nome.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z]/g, "");
  const suf = papel.startsWith("Líder") ? "lider" : "sub";
  this.accounts.push({
    id: "ac" + Date.now(),
    nome: nome.trim(),
    login: "clonex." + slug + "." + suf + "@clonexlabs.com",
    temp: "Clonex@" + (nome.trim()[0].toUpperCase() + slug.slice(1, 6)) + "01",
    papel,
    status: "salva"
  });
  this.emit();
};
const ACC_STATUS = {
  salva: {
    label: "Salva · desabilitada",
    bg: "var(--card)",
    fg: "var(--muted)",
    dot: "var(--faint)"
  },
  ativa_temp: {
    label: "Ativa · senha temporária",
    bg: "var(--warn-soft)",
    fg: "var(--warn-ink)",
    dot: "var(--warn)"
  },
  ativa: {
    label: "Ativa",
    bg: "var(--accent-soft)",
    fg: "var(--accent-ink)",
    dot: "var(--accent)"
  }
};
Object.assign(window, {
  ACC_STATUS
});

// --- Profile modal (top-right, iPhone-style sheet) -------------------------
// Perfil do usuário logado. Membro cadastra aqui o código que recebe do sublíder.
function ProfileModal({
  role,
  open,
  onClose,
  onGuia
}) {
  const st = useStore();
  const {
    Icon
  } = window.ClonexDesignSystem_ca55ab;
  const [code, setCode] = React.useState(st.myCode || "");
  React.useEffect(() => {
    if (open) setCode(st.myCode || "");
  }, [open]);
  const isMember = role === "membro";
  const p = st.profile;
  const info = isMember ? {
    nome: p.nome,
    papel: "Membro · " + NICHE_LABELS[st.nicho],
    sub: p.tipo === "empresa" ? p.empresa : "Autônomo",
    email: p.email,
    sublider: p.sublider
  } : role === "lider" ? {
    nome: "Matheus Gasparetto",
    papel: "Líder Geral · organizador da cidade",
    sub: "3 sublíderes · relatório geral",
    email: "matheus@clonex.app",
    sublider: null
  } : {
    nome: "Você",
    papel: "Sublíder · JF-1",
    sub: "6 pessoas na equipe",
    email: "subjf1@clonex.app",
    sublider: null
  };
  const row = (label, val) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      gap: 12,
      padding: "13px 0",
      borderBottom: "1px solid var(--line2)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13.5,
      color: "var(--muted)"
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13.5,
      fontWeight: 460,
      color: "var(--ink)",
      textAlign: "right"
    }
  }, val));
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "absolute",
      inset: 0,
      zIndex: 48,
      display: "flex",
      flexDirection: "column",
      pointerEvents: open ? "auto" : "none",
      background: "var(--bg)",
      transform: open ? "translateX(0)" : "translateX(100%)",
      transition: "transform .3s cubic-bezier(.22,.61,.36,1)",
      fontFamily: "var(--font-sans)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      display: "flex",
      flexDirection: "column",
      height: "100%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "52px 20px 14px"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Fechar",
    style: {
      width: 34,
      height: 34,
      borderRadius: "50%",
      border: "1px solid var(--line)",
      background: "var(--surface)",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 17,
    color: "var(--muted)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      fontWeight: 540,
      letterSpacing: ".13em",
      textTransform: "uppercase",
      color: "var(--faint)"
    }
  }, "Meu perfil")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: "auto",
      padding: "6px 20px calc(28px + env(safe-area-inset-bottom,6px))"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 56,
      height: 56,
      borderRadius: "50%",
      background: "var(--ink)",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 22,
      fontWeight: 500,
      letterSpacing: "-.02em",
      flex: "none"
    }
  }, info.nome[0]), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 19,
      fontWeight: 500,
      letterSpacing: "-.02em",
      color: "var(--ink)"
    }
  }, info.nome), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "var(--muted)",
      marginTop: 2
    }
  }, info.papel))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 20
    }
  }, row("Vínculo", info.sub), row("Email de acesso", info.email), info.sublider && row("Sublíder", info.sublider)), isMember && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      fontWeight: 540,
      letterSpacing: ".13em",
      textTransform: "uppercase",
      color: "var(--faint)",
      marginBottom: 10
    }
  }, "Meu c\xF3digo"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: "var(--muted)",
      lineHeight: 1.5,
      marginBottom: 10
    }
  }, "Digite o c\xF3digo que seu subl\xEDder te passou (ex: VZEAE7WC). Ele conecta suas grava\xE7\xF5es \xE0 sua equipe."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: code,
    onChange: e => setCode(e.target.value.toUpperCase()),
    placeholder: "VZ...",
    style: {
      flex: 1,
      padding: "13px 15px",
      borderRadius: 12,
      border: "1px solid var(--line)",
      background: "var(--surface)",
      fontFamily: "var(--font-sans)",
      fontSize: 15,
      color: "var(--ink)",
      letterSpacing: ".06em",
      boxSizing: "border-box"
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      st.setCode(code);
      onClose();
    },
    style: {
      padding: "0 20px",
      borderRadius: 12,
      border: "none",
      cursor: "pointer",
      background: "var(--ink)",
      color: "#fff",
      fontFamily: "var(--font-sans)",
      fontSize: 14,
      fontWeight: 460
    }
  }, "Salvar")), st.myCode && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 7,
      marginTop: 12,
      fontSize: 12.5,
      color: "var(--accent-ink)",
      background: "var(--accent-soft)",
      border: "1px solid var(--accent-line)",
      borderRadius: 999,
      padding: "5px 12px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "var(--accent)"
    }
  }), "C\xF3digo ", st.myCode, " salvo no perfil"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      fontWeight: 540,
      letterSpacing: ".13em",
      textTransform: "uppercase",
      color: "var(--faint)",
      margin: "22px 0 10px"
    }
  }, "Documentos assinados"), st.aceiteDigital ? /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--card)",
      border: "1px solid var(--line2)",
      borderRadius: 14,
      padding: "14px 15px"
    }
  }, [["Aceite digital", st.aceiteDigital.itens + " declarações · " + st.aceiteDigital.data], ["Termo de Consentimento", "assinado (físico + digital)"], ["Documento de identidade", st.aceiteDigital.ident ? "enviado" : "pendente"], ["Foto (selfie)", st.aceiteDigital.foto ? "enviada" : "pendente"]].map(([k, v], i, a) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      display: "flex",
      justifyContent: "space-between",
      gap: 12,
      padding: "10px 0",
      borderBottom: i < a.length - 1 ? "1px solid var(--line2)" : "none"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: "var(--muted)"
    }
  }, k), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 460,
      color: /pendente/.test(v) ? "var(--warn)" : "var(--ink)",
      textAlign: "right"
    }
  }, v)))) : /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: "var(--faint)",
      lineHeight: 1.5
    }
  }, "Voc\xEA ainda n\xE3o completou o aceite digital.")), /*#__PURE__*/React.createElement(PessoalEditor, null), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      onClose();
      onGuia && onGuia();
    },
    style: {
      display: "flex",
      alignItems: "center",
      gap: 11,
      width: "100%",
      textAlign: "left",
      cursor: "pointer",
      background: "var(--card)",
      border: "1px solid var(--line2)",
      borderRadius: 14,
      padding: "14px 15px",
      marginTop: 18,
      fontFamily: "var(--font-sans)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 34,
      height: 34,
      borderRadius: 10,
      background: "var(--surface)",
      border: "1px solid var(--line)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "report",
    size: 17,
    color: "var(--ink)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14.5,
      fontWeight: 500,
      color: "var(--ink)"
    }
  }, "Guia passo a passo"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--faint)",
      marginTop: 2
    }
  }, "Como usar cada fun\xE7\xE3o do seu app")), /*#__PURE__*/React.createElement(Icon, {
    name: "chevronRight",
    size: 17,
    color: "var(--faint)"
  })))));
}

// Notificações in-app — bell no cabeçalho, sheet por papel.
function NotificacoesSheet({
  open,
  onClose,
  role
}) {
  const st = useStore();
  const list = st.notifByRole[role] || [];
  return /*#__PURE__*/React.createElement(Sheet, {
    open: open,
    onClose: onClose,
    title: "Notifica\xE7\xF5es"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      color: "var(--muted)",
      margin: "-6px 0 16px",
      lineHeight: 1.5
    }
  }, "A\xE7\xF5es e permiss\xF5es que chegam pra voc\xEA."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 0
    }
  }, list.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "var(--faint)"
    }
  }, "Sem notifica\xE7\xF5es por enquanto."), list.map((n, i) => /*#__PURE__*/React.createElement("div", {
    key: n.id,
    style: {
      display: "flex",
      gap: 12,
      padding: "13px 0",
      borderBottom: i < list.length - 1 ? "1px solid var(--line2)" : "none"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: "var(--accent)",
      flex: "none",
      marginTop: 6
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: "var(--ink)",
      lineHeight: 1.45
    }
  }, n.texto), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: "var(--faint)",
      marginTop: 3
    }
  }, n.when))))));
}

// Editor de informações pessoais — qualquer usuário preenche e salva.
function PessoalEditor() {
  const st = useStore();
  const [v, setV] = React.useState(st.pessoal);
  const [saved, setSaved] = React.useState(false);
  const f = (k, label, ph) => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      fontWeight: 500,
      letterSpacing: ".06em",
      textTransform: "uppercase",
      color: "var(--faint)",
      margin: "0 0 6px"
    }
  }, label), /*#__PURE__*/React.createElement("input", {
    value: v[k] || "",
    onChange: e => {
      setV({
        ...v,
        [k]: e.target.value
      });
      setSaved(false);
    },
    placeholder: ph,
    style: {
      width: "100%",
      padding: "12px 14px",
      borderRadius: 12,
      border: "1px solid var(--line)",
      background: "var(--surface)",
      fontFamily: "var(--font-sans)",
      fontSize: 14,
      color: "var(--ink)",
      marginBottom: 12,
      boxSizing: "border-box"
    }
  }));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      fontWeight: 540,
      letterSpacing: ".13em",
      textTransform: "uppercase",
      color: "var(--faint)",
      marginBottom: 12
    }
  }, "Minhas informa\xE7\xF5es"), f("telefone", "Telefone / WhatsApp", "(32) 9 0000-0000"), f("cpf", "CPF", "000.000.000-00"), f("nascimento", "Nascimento", "DD/MM/AAAA"), f("endereco", "Endereço", "Rua, nº, bairro"), f("pix", "Chave Pix", "email, telefone ou CPF"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      st.savePessoal(v);
      setSaved(true);
    },
    style: {
      width: "100%",
      padding: "13px 0",
      borderRadius: 999,
      border: "none",
      cursor: "pointer",
      background: "var(--ink)",
      color: "#fff",
      fontFamily: "var(--font-sans)",
      fontSize: 14.5,
      fontWeight: 460,
      marginTop: 4
    }
  }, "Salvar informa\xE7\xF5es"), saved && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 7,
      marginTop: 12,
      fontSize: 12.5,
      color: "var(--accent-ink)",
      background: "var(--accent-soft)",
      border: "1px solid var(--accent-line)",
      borderRadius: 999,
      padding: "5px 12px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "var(--accent)"
    }
  }), "Informa\xE7\xF5es salvas no seu perfil"));
}

// Avatar button that opens the profile modal (top-right of the phone).
function ProfileButton({
  role,
  onClick
}) {
  const label = role === "lider" ? "M" : role === "membro" ? "R" : "V";
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    "aria-label": "Perfil",
    style: {
      position: "absolute",
      top: 46,
      right: 18,
      zIndex: 26,
      width: 38,
      height: 38,
      borderRadius: "50%",
      border: "1px solid var(--line)",
      background: "var(--ink)",
      color: "#fff",
      cursor: "pointer",
      fontFamily: "var(--font-sans)",
      fontSize: 15,
      fontWeight: 500,
      letterSpacing: "-.02em",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, label);
}
Object.assign(window, {
  ProfileModal,
  ProfileButton,
  NotificacoesSheet
});

// Team equipment for the sublíder view. Rafael (me) is read live from store.equipment;
// the rest are seeded teammates.
const TEAM_EQUIP = [{
  name: "Bruno Sales",
  jornada: "full",
  tipo: "empresa",
  empresa: "Construtora Vale",
  nicho: "mecanica",
  items: [{
    tipo: "capacete",
    modelo: "Tam. G",
    origem: "da Clonex",
    disponivel: true
  }, {
    tipo: "celular",
    modelo: "Galaxy A54",
    origem: "próprio",
    disponivel: true
  }]
}, {
  name: "Elaine Costa",
  jornada: "part",
  tipo: "autonomo",
  empresa: null,
  nicho: "estetica",
  items: [{
    tipo: "capacete",
    modelo: "Tam. P",
    origem: "da Clonex",
    disponivel: true
  }, {
    tipo: "celular",
    modelo: "iPhone 13",
    origem: "próprio",
    disponivel: false
  }]
}, {
  name: "Camila Ferraz",
  jornada: "full",
  tipo: "empresa",
  empresa: "Construtora Vale",
  nicho: "mecanica",
  items: [{
    tipo: "capacete",
    modelo: "Tam. M",
    origem: "da Clonex",
    disponivel: true
  }, {
    tipo: "celular",
    modelo: "Moto G84",
    origem: "próprio",
    disponivel: true
  }]
}, {
  name: "Jonas Prado",
  jornada: "full",
  tipo: "autonomo",
  empresa: null,
  nicho: "lavajato",
  items: [{
    tipo: "celular",
    modelo: "iPhone 12",
    origem: "próprio",
    disponivel: true
  }]
}, {
  name: "Vera Lúcia",
  jornada: "part",
  tipo: "autonomo",
  empresa: null,
  nicho: "padaria",
  items: [{
    tipo: "capacete",
    modelo: "Tam. M",
    origem: "da Clonex",
    disponivel: false
  }]
}];
Object.assign(window, {
  CLONEX_TEAM_EQUIP: TEAM_EQUIP
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/clonex_app/Shell.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.Pill = __ds_scope.Pill;

__ds_ns.NudgeBanner = __ds_scope.NudgeBanner;

__ds_ns.KanbanCard = __ds_scope.KanbanCard;

__ds_ns.BottomNav = __ds_scope.BottomNav;

__ds_ns.PersonCard = __ds_scope.PersonCard;

__ds_ns.PillarDot = __ds_scope.PillarDot;

__ds_ns.StatTrio = __ds_scope.StatTrio;

__ds_ns.Battery = __ds_scope.Battery;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

})();
