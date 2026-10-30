/*
 * StatusBadge.jsx — Módulo B
 * Componente reutilizable para etiquetas de estado (etapa, acción y documento).
 *
 * Contrato: docs/contrato.md §4
 * Tarea: B05 (docs/tareas.md)
 *
 * Ejemplos de uso:
 *   <StatusBadge tipo="etapa" valor="actual" />
 *   <StatusBadge tipo="etapa" valor="completada" />
 *   <StatusBadge tipo="accion" valor="pendiente" />
 *   <StatusBadge tipo="accion" valor="en_espera" />
 *   <StatusBadge tipo="documento" valor="vigente" />
 *   <StatusBadge tipo="documento" valor="no_vigente" />
 */

const CONFIGURACION_ESTADOS = {
  etapa: {
    completada: {
      etiqueta: "Completada",
      color: "var(--ok)",
      background: "var(--ok-wash)",
      borderColor: "var(--ok-line)",
    },
    actual: {
      etiqueta: "En curso",
      color: "var(--navy-2)",
      background: "var(--navy-wash)",
      borderColor: "var(--line-strong)",
    },
    pendiente: {
      etiqueta: "Pendiente",
      color: "var(--ink-3)",
      background: "var(--surface-2)",
      borderColor: "var(--line)",
    },
  },
  accion: {
    pendiente: {
      etiqueta: "Pendiente",
      color: "var(--wait)",
      background: "var(--wait-wash)",
      borderColor: "var(--wait-line)",
    },
    en_espera: {
      etiqueta: "En espera",
      color: "var(--wait)",
      background: "var(--wait-wash)",
      borderColor: "var(--wait-line)",
    },
    completada: {
      etiqueta: "Completada",
      color: "var(--ok)",
      background: "var(--ok-wash)",
      borderColor: "var(--ok-line)",
    },
  },
  documento: {
    vigente: {
      etiqueta: "Vigente",
      color: "var(--ok)",
      background: "var(--ok-wash)",
      borderColor: "var(--ok-line)",
    },
    no_vigente: {
      etiqueta: "No vigente",
      color: "var(--bad)",
      background: "var(--bad-wash)",
      borderColor: "var(--bad-line)",
    },
  },
};

export default function StatusBadge({ tipo, valor, children, style = {}, className = "", ...rest }) {
  const claveTipo = String(tipo || "").toLowerCase();
  const claveValor = String(valor || "").toLowerCase();

  const cfg =
    CONFIGURACION_ESTADOS[claveTipo]?.[claveValor] || {
      etiqueta: valor || "Desconocido",
      color: "var(--ink-3)",
      background: "var(--surface-2)",
      borderColor: "var(--line)",
    };

  const badgeStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
    padding: "2px 8px",
    borderRadius: "var(--r-sm, 6px)",
    fontSize: "12px",
    fontWeight: 600,
    lineHeight: "1.4",
    border: `1px solid ${cfg.borderColor}`,
    color: cfg.color,
    background: cfg.background,
    width: "fit-content",
    verticalAlign: "middle",
    whiteSpace: "nowrap",
    ...style,
  };

  const dotStyle = {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    backgroundColor: "currentColor",
    display: "inline-block",
    flexShrink: 0,
  };

  return (
    <span
      className={`status-badge status-badge--${claveTipo}-${claveValor} ${className}`.trim()}
      style={badgeStyle}
      {...rest}
    >
      <span style={dotStyle} aria-hidden="true" />
      <span>{children ?? cfg.etiqueta}</span>
    </span>
  );
}
