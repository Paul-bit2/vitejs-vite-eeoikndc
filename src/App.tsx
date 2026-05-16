import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Boxes,
  Camera,
  CheckCircle2,
  Cpu,
  Database,
  Gauge,
  Layers3,
  ShieldCheck,
  Sparkles,
  Upload,
  Warehouse,
  Zap,
} from "lucide-react";

const GASO_LOGO = "/LOGO.jpg";
const C = {
  navy: "#0D1B3E",
  blue: "#1A2F5A",
  mid: "#2D4B89",
  light: "#3A6AB5",
  orange: "#F26A21",
  gray: "#8BA3C4",
};

const achievements = [
  {
    id: "01",
    title: "Implementación de Racks",
    short: "Racks",
    subtitle: "Optimización de almacenamiento con racks",
    value: 100,
    icon: Warehouse,
    color: C.orange,
    kpis: [["33%", "Espacio ahorrado"], ["64", "Tarimas en racks"], ["195", "Antes en piso"], ["100%", "Estado"]],
    details: ["Racks al 100% del plan", "64 tarimas elevadas — 32.8% de piso liberado", "Pasillos de maniobra habilitados", "Riesgo de daño a material reducido"],
    ops: ["Pasillos operativos para apilador", "Localización de material en menos tiempo"],
    admin: ["Ahorro 32.8% reportado a dirección", "Distribución documentada en planos"],
    risks: ["Sobrecarga si se excede capacidad de racks", "Personal requiere capacitación"],
    next: ["Mantenimiento preventivo semestral", "Etiquetado para sistema alfanumérico"],
  },
  {
    id: "02",
    title: "Cierre de 2 Bodegas",
    short: "Bodegas",
    subtitle: "Los Mochis + Culiacán — traslado pendiente",
    value: 70,
    icon: Boxes,
    color: C.light,
    kpis: [["2/2", "Bodegas cerradas"], ["OK", "Clasificado"], ["30%", "Pendiente"], ["HMO", "Destino"]],
    details: ["Cierre físico y administrativo completado", "Material entarimado, limpiado y clasificado", "Pendiente: traslado a Hermosillo", "Al 100% con el envío a HMO"],
    ops: ["Material clasificado en CrossDock", "Espacio de bodegas liberado al cliente"],
    admin: ["Contratos de arrendamiento finiquitados", "Inventario de cierre documentado"],
    risks: ["Retraso por disponibilidad de transporte", "Deterioro de material de L.I."],
    next: ["Coordinar traslado a Hermosillo", "Cierre documental al completar envío"],
  },
  {
    id: "03",
    title: "Tiempos de Entrega",
    short: "Entregas",
    subtitle: "Reducción del 33% en tiempo de despacho",
    value: 100,
    icon: Zap,
    color: C.orange,
    kpis: [["60min", "Antes"], ["42min", "Ahora"], ["-33%", "Reducción"], ["OK", "Sostenido"]],
    details: ["Material localizable en menor tiempo por sitio", "Pasillos libres: sin maniobras extra", "Proceso estandarizado sin pasos innecesarios", "Mejora sostenida semanas consecutivas"],
    ops: ["Mayor número de entregas por turno", "Operación más fluida y predecible"],
    admin: ["KPI de tiempo en seguimiento mensual", "Satisfacción del cliente mejorada"],
    risks: ["Mayor volumen puede presionar los tiempos", "Depende del orden del layout"],
    next: ["Documentar KPI mensual de entrega", "Optimizar con sistema alfanumérico completo"],
  },
  {
    id: "04",
    title: "Clasificación Alfanumérica",
    short: "Alfanumérico",
    subtitle: "Sistema de ubicación por zonas",
    value: 60,
    icon: Layers3,
    color: C.orange,
    kpis: [["OK", "Sistema diseñado"], ["OK", "Señalización"], ["0%", "Pallets capturados"], ["60%", "Avance"]],
    details: ["Nomenclatura definida en todas las zonas", "Señalización física en racks instalada", "Pendiente: captura de ubicación en inventario", "Localización instantánea al completarse"],
    ops: ["Zonas visibles y delimitadas", "Reducción de errores de ubicación"],
    admin: ["Sistema documentado y compartido con cliente", "Base para integración con ERP"],
    risks: ["Sin captura en inventario, beneficio parcial", "Material en zona incorrecta sin capacitación"],
    next: ["Captura de ubicación de pallets", "Capacitación al equipo", "Integración con ERP"],
  },
  {
    id: "05",
    title: "Aire Acondicionado",
    short: "A/C",
    subtitle: "Climatización del CrossDock",
    value: 70,
    icon: Activity,
    color: C.light,
    kpis: [["OK", "Equipo adquirido"], ["OK", "Cotización"], ["Pago", "En trámite"], ["70%", "Avance"]],
    details: ["Equipo disponible físicamente en CrossDock", "Cotización validada técnicamente", "Único pendiente: liberación del pago", "Mejorará condiciones y protegerá equipos"],
    ops: ["Proveedor listo para instalación", "Equipo resguardado sin daños"],
    admin: ["Cotización tramitada y aprobada", "Solicitud de pago enviada a finanzas"],
    risks: ["Retraso del pago prolonga operación sin A/C", "Calor afecta material y productividad"],
    next: ["Seguimiento a liberación de pago", "Agendar instalación con proveedor", "Verificar garantías post-instalación"],
  },
  {
    id: "06",
    title: "Precisión de Inventario",
    short: "Inventario",
    subtitle: "Auditorías y control de existencias",
    value: 100,
    icon: ShieldCheck,
    color: C.orange,
    kpis: [["100%", "Precisión actual"], ["OK", "Telcel"], ["OK", "AT&T"], ["100%", "Meta lograda"]],
    details: ["Auditoría y conciliación completada", "100% de precisión post-auditoría", "Controles de entrada/salida implementados", "Base lista para seguimiento mensual"],
    ops: ["Inventario físico conciliado con sistema", "Conteo cíclico iniciado por zonas"],
    admin: ["Resultado entregado al cliente", "Discrepancias identificadas y corregidas"],
    risks: ["La precisión depende de disciplina operativa", "Rotación de personal compromete captura"],
    next: ["Conteos cíclicos semanales por zona", "Alertas de discrepancias en ERP"],
  },
  {
    id: "07",
    title: "Herramientas y BD",
    short: "BD + Herramientas",
    subtitle: "Calculadora m² + base de datos unificada",
    value: 100,
    icon: Database,
    color: C.orange,
    kpis: [["OK", "Calculadora m²"], ["OK", "BD estándar"], ["OK", "Reportes"], ["Uso", "Diario"]],
    details: ["Herramienta de m² disponibles y ocupados", "BD con estructura única para movimientos", "Reportes ejecutivos con formato unificado", "En uso activo diario por el equipo"],
    ops: ["Reportes en tiempo real de ocupación", "Sin hojas de cálculo duplicadas"],
    admin: ["Reportes mensuales para dirección", "BD disponible para auditorías"],
    risks: ["Dependencia de una persona para actualización", "Capacitación requerida en rotación"],
    next: ["Actualización mensual de ocupación", "Capacitar operadores en nuevas zonas"],
  },
  {
    id: "08",
    title: "Proceso Recepción/Entrega",
    short: "Recepción",
    subtitle: "0 errores en 2 semanas consecutivas",
    value: 100,
    icon: CheckCircle2,
    color: C.orange,
    kpis: [["0", "Errores proceso"], ["0", "Errores doc."], ["OK", "Acuerdo cliente"], ["OK", "Sostenido"]],
    details: ["Acuerdo formal con cliente: proceso definido", "Cero errores de proceso en 2 semanas", "Cero errores de documentación", "Reduce disputas y tiempos de revisión"],
    ops: ["Checklist al 100% de movimientos", "Personal capacitado en proceso acordado"],
    admin: ["Cero reclamaciones del cliente", "Proceso documentado como referencia"],
    risks: ["Rotación requiere re-capacitación", "Cambio en requerimientos sin actualizar proceso"],
    next: ["Registro semanal de incidencias", "Documentar SOP formal", "Revisión trimestral con cliente"],
  },
  {
    id: "09",
    title: "Acomodo con Pasillos",
    short: "Pasillos",
    subtitle: "Layout optimizado incluyendo logística inversa",
    value: 100,
    icon: Camera,
    color: C.orange,
    kpis: [["OK", "Pasillos"], ["OK", "L.I. clasificada"], ["Óptimo", "Aprovechamiento"], ["100%", "Completado"]],
    details: ["L.I. acomodada sin obstruir pasillos", "Apilador opera en todos los pasillos", "Layout optimiza almacenamiento y operación", "Logro destacado por volumen extra"],
    ops: ["Maniobras sin restricciones", "Tiempos de maniobra reducidos"],
    admin: ["Layout documentado en plano actualizado", "Capacidad reportada a dirección"],
    risks: ["Nueva L.I. puede comprometer espacio", "Sin traslado a HMO, espacio se reduce"],
    next: ["Pasillos libres como norma operativa", "Revisión semanal de layout"],
  },
  {
    id: "10",
    title: "BD Manual = ERP",
    short: "ERP",
    subtitle: "Datos consistentes en ambos sistemas",
    value: 100,
    icon: Cpu,
    color: C.orange,
    kpis: [["OK", "Excel actualizado"], ["OK", "ERP sincronizado"], ["0", "Discrepancias"], ["100%", "Completado"]],
    details: ["Excel coincide exactamente con ERP", "Discrepancias corregidas en conciliación", "Proceso definido para sincronía futura", "Elimina decisiones con datos contradictorios"],
    ops: ["Un único sistema de referencia", "Errores en pedidos eliminados"],
    admin: ["Auditorías aceptan inventario sin reconstrucción", "Reportes con datos validados"],
    risks: ["Captura dual aumenta riesgo de discrepancias", "Requiere disciplina operativa constante"],
    next: ["Protocolo doble captura", "Revisión mensual de sincronía", "Evaluar automatización a mediano plazo"],
  },
];

const slides = [
  { type: "cover", label: "Portada" },
  { type: "summary", label: "Resumen" },
  ...achievements.map((a) => ({ type: "achievement", label: a.short, item: a })),
  { type: "closing", label: "Cierre" },
];

function Styles() {
  return (
    <style>{`
      *{box-sizing:border-box} html,body,#root{width:100%;height:100%;margin:0;overflow:hidden;background:#050914} body{font-family:Inter,Segoe UI,system-ui,sans-serif}
      .app{width:100vw;height:100vh;background:linear-gradient(135deg,#0D1B3E 0%,#050914 54%,#09090b 100%);color:white;display:grid;grid-template-columns:214px 1fr;overflow:hidden;position:relative}
      .app:before{content:"";position:fixed;inset:0;pointer-events:none;background:radial-gradient(circle at 70% 8%,rgba(242,106,33,.16),transparent 30%),radial-gradient(circle at 40% 0%,rgba(58,106,181,.25),transparent 35%);opacity:.95}
      .app:after{content:"";position:fixed;inset:0;pointer-events:none;opacity:.08;background-image:linear-gradient(rgba(255,255,255,.25) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.25) 1px,transparent 1px);background-size:42px 42px}
      .sidebar{position:relative;z-index:2;border-right:1px solid rgba(58,106,181,.28);background:rgba(13,27,62,.72);padding:14px;display:flex;flex-direction:column;gap:12px;min-height:0;overflow:hidden}
      .logoBox{height:92px;border-radius:18px;background:white;display:grid;place-items:center;padding:10px;box-shadow:0 0 34px rgba(58,106,181,.18)}
      .logoBox img{max-width:100%;max-height:100%;object-fit:contain}.sideTitle{font-size:9px;letter-spacing:.38em;color:#7edbff;text-transform:uppercase;font-weight:900;margin-top:4px}
      .nav{display:flex;flex-direction:column;gap:7px;overflow:hidden}.navBtn{height:39px;border-radius:14px;border:1px solid transparent;background:transparent;color:#9eb5d9;display:flex;align-items:center;gap:9px;padding:0 10px;font-size:12px;font-weight:800;cursor:pointer;transition:.2s}.navBtn.active{border-color:#3A6AB5;background:rgba(58,106,181,.22);color:white}.num{width:28px;height:28px;border-radius:11px;display:grid;place-items:center;background:rgba(58,106,181,.18);color:#9ee8ff;font-size:11px}.navBtn.active .num{background:#F26A21;color:white}.navLabel{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.main{position:relative;z-index:2;display:flex;flex-direction:column;min-width:0;min-height:0;overflow:hidden}.top{height:42px;border-bottom:1px solid rgba(58,106,181,.25);background:rgba(0,0,0,.20);display:flex;align-items:center;gap:16px;padding:0 18px;flex-shrink:0}.topMeta{flex:1;min-width:0}.report{font-size:9px;letter-spacing:.32em;text-transform:uppercase;color:#7edbff;font-weight:900}.label{font-size:13px;font-weight:800;color:white;margin-top:2px}.progText{font-size:10px;letter-spacing:.3em;color:#7edbff;font-weight:900;white-space:nowrap}.bar{width:245px;height:7px;border-radius:99px;background:rgba(255,255,255,.13);overflow:hidden}.barFill{height:100%;border-radius:99px;background:linear-gradient(90deg,#3A6AB5,#fff,#F26A21)}.pct{width:42px;text-align:right;font-weight:900}.stage{position:relative;flex:1;min-height:0;overflow:hidden}.bottom{height:45px;border-top:1px solid rgba(58,106,181,.25);background:rgba(0,0,0,.26);display:flex;align-items:center;justify-content:center;gap:18px;flex-shrink:0}.circleBtn{width:34px;height:34px;border-radius:50%;border:1px solid rgba(126,219,255,.35);background:rgba(58,106,181,.15);color:#bff2ff;display:grid;place-items:center;cursor:pointer}.circleBtn:disabled{opacity:.35}.dots{display:flex;gap:7px}.dot{width:7px;height:7px;border-radius:99px;background:rgba(126,219,255,.35);border:0}.dot.active{width:28px;background:#F26A21;box-shadow:0 0 16px rgba(242,106,33,.8)}
      .slide{position:absolute;inset:0;padding:16px;min-height:0;overflow:hidden}.panel{border:1px solid rgba(58,106,181,.26);border-radius:22px;background:rgba(255,255,255,.045);box-shadow:0 0 34px rgba(58,106,181,.09);backdrop-filter:blur(10px);overflow:hidden}.coverGrid{height:100%;display:grid;grid-template-columns:1.18fr .82fr;gap:14px}.coverLeft{padding:28px;display:flex;flex-direction:column;justify-content:space-between;min-height:0}.brandRow{display:flex;align-items:center;gap:14px}.miniLogo{width:112px;height:72px;border-radius:14px;background:white;padding:9px;display:grid;place-items:center}.miniLogo img{max-width:100%;max-height:100%;object-fit:contain}.brandText{font-size:10px;letter-spacing:.34em;text-transform:uppercase;color:#9ee8ff;font-weight:900}.orangeTitle{font-size:11px;letter-spacing:.34em;text-transform:uppercase;color:#F26A21;font-weight:900;margin-top:28px}.coverTitle{font-size:68px;line-height:.88;font-weight:950;letter-spacing:-.06em;margin:14px 0;color:white}.coverTitle span{color:#82bde2;font-weight:300}.desc{max-width:650px;color:#cfd8e8;font-size:16px;line-height:1.55}.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}.stat{height:72px;border-radius:16px;border:1px solid rgba(255,255,255,.1);background:rgba(0,0,0,.18);display:flex;align-items:center;gap:10px;padding:12px}.statIcon{color:#F26A21}.statVal{font-size:24px;font-weight:950}.statLab{font-size:9px;text-transform:uppercase;letter-spacing:.14em;color:#a9b9d6}.coverRight{display:grid;grid-template-rows:1fr 180px;gap:14px}.ringPanel{display:grid;grid-template-columns:220px 1fr;place-items:center;padding:22px}.ring{width:190px;height:190px;border-radius:50%;display:grid;place-items:center;background:conic-gradient(#F26A21 0 80%,rgba(255,255,255,.12) 80% 100%);position:relative;box-shadow:0 0 35px rgba(242,106,33,.25)}.ring:before{content:"";position:absolute;inset:13px;border-radius:50%;background:#081226;border:1px solid rgba(58,106,181,.35)}.ringText{position:relative;text-align:center}.ringPct{font-size:44px;font-weight:950}.ringLbl{font-size:10px;letter-spacing:.24em;text-transform:uppercase;color:#7edbff}.ringCopy{font-size:15px;line-height:1.6;color:#d5def1}.ringCopy b{color:white}.chartPanel{padding:18px}.chartTitle{display:flex;align-items:center;gap:10px;font-size:17px;font-weight:950;color:#c8fbff;margin-bottom:12px}.bars{height:106px;display:flex;align-items:end;gap:8px}.barItem{flex:1;display:flex;flex-direction:column;align-items:center;gap:5px}.barCol{width:100%;border-radius:10px 10px 2px 2px;background:linear-gradient(180deg,#F26A21,#3A6AB5);min-height:16px}.barName{font-size:8px;color:#b6c5de;text-transform:uppercase;white-space:nowrap}.summary{height:100%;display:grid;grid-template-columns:320px 1fr;gap:14px}.summaryLeft{padding:18px;display:grid;grid-template-rows:1fr 150px;gap:14px}.summaryCards{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;min-height:0}.summaryCard{padding:13px;border-radius:18px;border:1px solid rgba(58,106,181,.22);background:rgba(255,255,255,.045)}.summaryCardTitle{font-weight:950}.summarySub{font-size:11px;color:#9eb5d9;margin-top:4px}.summaryGrid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;overflow:hidden}.achievement{height:100%;display:grid;grid-template-columns:190px 1fr;min-height:0}.achSide{background:rgba(26,47,90,.62);border-right:1px solid rgba(58,106,181,.24);padding:14px;display:flex;flex-direction:column;gap:10px;min-height:0}.iconBox{width:48px;height:48px;border-radius:16px;border:1px solid rgba(242,106,33,.45);display:grid;place-items:center;color:#F26A21;background:rgba(242,106,33,.08)}.sidePct{height:104px;border-radius:20px;border:1px solid rgba(58,106,181,.28);display:flex;align-items:center;justify-content:center;text-align:center;background:rgba(0,0,0,.16)}.sidePct strong{font-size:34px}.sidePct span{display:block;font-size:9px;letter-spacing:.22em;color:#9ee8ff;text-transform:uppercase}.kpiList{display:flex;flex-direction:column;gap:7px}.kpi{height:36px;border-radius:12px;background:rgba(255,255,255,.055);display:flex;align-items:center;justify-content:space-between;padding:0 10px}.kpi small{font-size:8px;text-transform:uppercase;color:#b4c1d8;letter-spacing:.08em}.kpi b{color:#F26A21;font-size:13px}.achLogo{margin-top:auto;height:64px;background:white;border-radius:10px;padding:7px;display:grid;place-items:center}.achLogo img{max-height:100%;max-width:100%;object-fit:contain}.achMain{display:flex;flex-direction:column;min-height:0}.achHead{height:102px;flex-shrink:0;padding:18px 22px;border-bottom:1px solid rgba(58,106,181,.22);background:rgba(255,255,255,.035);display:flex;align-items:center;justify-content:space-between;gap:16px}.eyebrow{font-size:10px;letter-spacing:.34em;text-transform:uppercase;color:#8fdcff;font-weight:950}.achTitle{font-size:27px;font-weight:950;letter-spacing:-.02em;margin-top:5px}.achSub{font-size:12px;color:#b9c6dc;margin-top:3px}.pctBox{width:118px;height:64px;border:1px solid rgba(242,106,33,.5);border-radius:18px;background:rgba(242,106,33,.10);display:grid;place-items:center;text-align:center;flex-shrink:0}.pctBox strong{font-size:27px;color:#F26A21}.pctBox span{font-size:8px;letter-spacing:.2em;text-transform:uppercase;color:#e7d8cb}.achBody{flex:1;min-height:0;padding:12px;display:grid;grid-template-rows:198px 1fr;gap:12px}.infoGrid{display:grid;grid-template-columns:1fr 1fr;gap:12px;min-height:0}.leftInfo{display:grid;grid-template-rows:1fr 1fr;gap:12px;min-height:0}.rightInfo{display:grid;grid-template-rows:1fr 1fr 1fr;gap:12px;min-height:0}.infoCard{padding:12px;border-radius:17px;border:1px solid rgba(58,106,181,.22);background:rgba(255,255,255,.045);overflow:hidden}.infoTitle{display:flex;align-items:center;gap:7px;font-size:10px;text-transform:uppercase;letter-spacing:.25em;font-weight:950;margin-bottom:8px;color:#8fdcff}.bullet{font-size:11px;line-height:1.45;color:#e0e6f2;display:flex;gap:7px;margin:3px 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.bullet:before{content:"";width:5px;height:5px;border-radius:50%;background:currentColor;flex-shrink:0;margin-top:6px}.photosPanel{padding:12px;border-radius:18px;border:1px solid rgba(58,106,181,.24);background:rgba(255,255,255,.045);min-height:0}.photoHeader{height:24px;display:flex;align-items:center;justify-content:space-between;color:#c8fbff;font-weight:950;font-size:10px;letter-spacing:.25em;text-transform:uppercase}.photoGrid{height:calc(100% - 26px);display:grid;grid-template-columns:1fr 1fr;gap:12px}.photoSlot{position:relative;border-radius:16px;border:1px dashed rgba(143,220,255,.36);background:rgba(0,0,0,.18);overflow:hidden;cursor:pointer;min-height:0}.photoSlot img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}.photoPlaceholder{position:absolute;inset:0;display:grid;place-items:center;color:#9fb2cf;text-align:center}.tag{position:absolute;top:10px;left:10px;background:rgba(0,0,0,.62);border:1px solid rgba(255,255,255,.16);border-radius:12px;padding:7px 12px;font-size:10px;letter-spacing:.22em;text-transform:uppercase;font-weight:950;color:white}.closing{height:100%;display:grid;place-items:center}.closingPanel{width:min(850px,90%);padding:45px;text-align:center}.closing h1{font-size:64px;line-height:.95;margin:20px 0}.closing h1 span{font-weight:300;color:#82bde2}.closingStats{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:26px}
      @media(max-height:720px){.top{height:38px}.bottom{height:38px}.slide{padding:10px}.logoBox{height:76px}.navBtn{height:34px}.coverLeft{padding:20px}.coverTitle{font-size:54px}.desc{font-size:13px}.stat{height:58px}.statVal{font-size:20px}.coverRight{grid-template-rows:1fr 150px}.ring{width:150px;height:150px}.ringPanel{grid-template-columns:170px 1fr;padding:16px}.ringPct{font-size:36px}.bars{height:78px}.chartPanel{padding:14px}.achievement{grid-template-columns:175px 1fr}.achSide{padding:10px}.sidePct{height:80px}.sidePct strong{font-size:28px}.kpi{height:30px}.achLogo{display:none}.achHead{height:82px;padding:13px 18px}.achTitle{font-size:21px}.pctBox{height:54px;width:100px}.achBody{grid-template-rows:160px 1fr;padding:10px;gap:10px}.infoGrid{gap:10px}.leftInfo,.rightInfo{gap:10px}.infoCard{padding:9px}.bullet{font-size:10px;line-height:1.25}.infoTitle{font-size:9px;margin-bottom:5px}.photoHeader{height:20px}.photoGrid{height:calc(100% - 22px)}.summary{grid-template-columns:270px 1fr}.summaryLeft{grid-template-rows:1fr 120px}.summaryGrid{gap:8px}.summaryCard{padding:10px}.closing h1{font-size:48px}}
    `}</style>
  );
}

function useEntrance(ref: React.RefObject<HTMLDivElement | null>, dep: unknown) {
  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current.querySelectorAll(".anim"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.04, ease: "power2.out" });
  }, [dep]);
}

function Stat({ value, label, icon: Icon }: { value: string; label: string; icon: any }) {
  return <div className="stat"><Icon className="statIcon" size={22}/><div><div className="statVal">{value}</div><div className="statLab">{label}</div></div></div>;
}

function Ring({ value }: { value: number }) {
  return <div className="ring"><div className="ringText"><div className="ringPct">{value}%</div><div className="ringLbl">Avance</div></div></div>;
}

function MiniBars() {
  return <div className="bars">{achievements.map(a => <div className="barItem" key={a.id}><div className="barCol" style={{height:`${a.value}%`, background:`linear-gradient(180deg,${a.color},${C.light})`}}/><div className="barName">{a.short}</div></div>)}</div>;
}

function Cover({ avg }: { avg: number }) {
  const ref = useRef<HTMLDivElement>(null); useEntrance(ref, "cover");
  return <div ref={ref} className="slide"><div className="coverGrid">
    <div className="panel coverLeft anim"><div><div className="brandRow"><div className="miniLogo"><img src={GASO_LOGO}/></div><div className="brandText">CrossDock Culiacán</div></div><div className="orangeTitle">Reporte de logros · Abril-Mayo 2026</div><div className="coverTitle">CrossDock<br/><span>Culiacán</span></div><div className="desc">Presentación de avances, riesgos, evidencia fotográfica y seguimiento operativo del área logística.</div></div><div className="stats"><Stat value="10" label="Implementaciones" icon={Sparkles}/><Stat value="7/10" label="Al 100%" icon={CheckCircle2}/><Stat value="100%" label="Inventario" icon={ShieldCheck}/><Stat value="33%" label="Espacio" icon={Gauge}/></div></div>
    <div className="coverRight"><div className="panel ringPanel anim"><Ring value={avg}/><div className="ringCopy"><b>Avance global del periodo</b><br/>Excelente progreso en los objetivos establecidos para abril–mayo 2026.<br/><br/>6 logros completados · 4 en seguimiento.</div></div><div className="panel chartPanel anim"><div className="chartTitle"><BarChart3 size={19}/> Avance por implementación</div><MiniBars/></div></div>
  </div></div>;
}

function Summary({ avg }: { avg: number }) {
  const ref = useRef<HTMLDivElement>(null); useEntrance(ref, "summary");
  return <div ref={ref} className="slide"><div className="summary"><div className="summaryLeft"><div className="panel ringPanel anim" style={{gridTemplateColumns:"1fr", textAlign:"center"}}><Ring value={avg}/></div><div className="stats" style={{gridTemplateColumns:"1fr 1fr"}}><Stat value="7/10" label="Completadas" icon={CheckCircle2}/><Stat value="3" label="Riesgos" icon={AlertTriangle}/></div></div><div className="summaryGrid">{achievements.map(a=>{const Icon=a.icon;return <div className="summaryCard anim" key={a.id}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:10}}><div style={{display:"flex",gap:10,alignItems:"center"}}><Icon size={20} color={a.color}/><div><div className="summaryCardTitle">{a.short}</div><div className="summarySub">{a.subtitle}</div></div></div><b style={{color:a.color}}>{a.value}%</b></div><div style={{height:6,borderRadius:99,background:"rgba(255,255,255,.12)",marginTop:11,overflow:"hidden"}}><div style={{height:"100%",width:`${a.value}%`,background:`linear-gradient(90deg,${a.color},${C.light})`}}/></div></div>})}</div></div></div>;
}

function InfoCard({ title, items, icon: Icon, color }: { title: string; items: string[]; icon: any; color: string }) {
  return <div className="infoCard"><div className="infoTitle" style={{color}}><Icon size={14}/>{title}</div>{items.slice(0,4).map((x,i)=><div className="bullet" style={{color:i===0?color:"#e0e6f2"}} key={i}>{x}</div>)}</div>;
}

function PhotoSlot({ label, src }: { label: string; src: string }) {
  return (
    <div className="photoSlot">
      <img src={src} alt={label} />
      <div className="tag">{label}</div>
    </div>
  );
}

function Achievement({ item }: { item: any }) {
  const ref = useRef<HTMLDivElement>(null); useEntrance(ref, item.id); const Icon = item.icon;
  return <div ref={ref} className="slide"><div className="panel achievement">
    <aside className="achSide anim"><div className="iconBox"><Icon size={25}/></div><div className="sidePct"><div><strong>{item.value}%</strong><span>Completado</span></div></div><div className="kpiList">{item.kpis.map(([v,l]:string[])=><div className="kpi" key={l}><small>{l}</small><b>{v}</b></div>)}</div><div className="achLogo"><img src={GASO_LOGO}/></div></aside>
    <main className="achMain"><header className="achHead anim"><div><div className="eyebrow">Logro {item.id} de 10</div><div className="achTitle">{item.title}</div><div className="achSub">{item.subtitle}</div></div><div className="pctBox"><div><strong>{item.value}%</strong><span>Avance</span></div></div></header>
      <section className="achBody"><div className="infoGrid"><div className="leftInfo anim"><InfoCard title="Detalles de implementación" items={item.details} icon={Activity} color={C.light}/><InfoCard title="Siguientes pasos" items={item.next} icon={ArrowRight} color={C.gray}/></div><div className="rightInfo anim"><InfoCard title="Logros operativos" items={item.ops} icon={Zap} color={C.orange}/><InfoCard title="Logros administrativos" items={item.admin} icon={Database} color={C.light}/><InfoCard title="Riesgos" items={item.risks} icon={AlertTriangle} color={C.orange}/></div></div>
      <div className="photosPanel anim"><div className="photoHeader"><span><Camera size={14}/> Evidencia fotográfica</span><span><Upload size={12}/> Local</span></div><div className="photoGrid"><PhotoSlot label="Antes" src={`/fotos/${(Number(item.id) - 1) * 2 + 1}.jpeg`} /><PhotoSlot label="Después" src={`/fotos/${(Number(item.id) - 1) * 2 + 2}.jpeg`} /></div></div></section></main>
  </div></div>;
}

function Closing() {
  return <div className="slide"><div className="closing"><div className="panel closingPanel"><img src={GASO_LOGO} style={{height:90,background:"white",borderRadius:18,padding:10}}/><h1>Un equipo,<br/><span>resultados reales.</span></h1><div className="closingStats"><Stat value="10" label="Implementaciones" icon={Sparkles}/><Stat value="7/10" label="Al 100%" icon={CheckCircle2}/><Stat value="33%" label="Espacio" icon={Gauge}/><Stat value="100%" label="Inventario" icon={ShieldCheck}/></div></div></div></div>;
}

export default function CrossdockSciFiDashboard() {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const avg = useMemo(()=>Math.round(achievements.reduce((s,a)=>s+a.value,0)/achievements.length),[]);
  const go=(n:number)=>{const safe=Math.max(0,Math.min(slides.length-1,n)); if(safe===idx)return; setDir(safe>idx?1:-1); setIdx(safe);};
  useEffect(()=>{const f=(e:KeyboardEvent)=>{if(e.key==="ArrowRight")go(idx+1); if(e.key==="ArrowLeft")go(idx-1)}; window.addEventListener("keydown",f); return()=>window.removeEventListener("keydown",f)},[idx]);
  const current = slides[idx]; const progress = Math.round((idx/(slides.length-1))*100);
  return <><Styles/><div className="app"><aside className="sidebar"><div className="logoBox"><img src={GASO_LOGO}/></div><div className="sideTitle">.</div><div className="nav">{slides.map((s,i)=><button key={i} onClick={()=>go(i)} className={`navBtn ${i===idx?"active":""}`}><span className="num">{i+1}</span><span className="navLabel">{s.label}</span></button>)}</div></aside><main className="main"><header className="top"><div className="topMeta"><div className="report">Reporte de logros · Abril-Mayo 2026</div><div className="label">{current.label}</div></div><div className="progText">Diapositiva {idx+1} de {slides.length}</div><div className="bar"><div className="barFill" style={{width:`${progress}%`}}/></div><div className="pct">{progress}%</div></header><section className="stage"><AnimatePresence mode="wait" custom={dir}>{<motion.div key={idx} initial={{opacity:0,x:dir>0?40:-40}} animate={{opacity:1,x:0}} exit={{opacity:0,x:dir>0?-40:40}} transition={{duration:.28}} style={{position:"absolute",inset:0}}>{current.type==="cover"&&<Cover avg={avg}/>} {current.type==="summary"&&<Summary avg={avg}/>} {current.type==="achievement" && "item" in current && <Achievement item={current.item}/>} {current.type==="closing"&&<Closing/>}</motion.div>}</AnimatePresence></section><footer className="bottom"><button className="circleBtn" onClick={()=>go(idx-1)} disabled={idx===0}><ArrowLeft size={17}/></button><div className="dots">{slides.map((_,i)=><button className={`dot ${i===idx?"active":""}`} key={i} onClick={()=>go(i)}/>)}</div><button className="circleBtn" onClick={()=>go(idx+1)} disabled={idx===slides.length-1}><ArrowRight size={17}/></button></footer></main></div></>;
}
