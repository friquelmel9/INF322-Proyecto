/*
 * ResponsibleBadge.jsx — Módulo B
 * Componente reutilizable para mostrar la entidad o rol responsable.
 *
 * Contrato: docs/contrato.md §4
 * Tarea: B05 (docs/tareas.md)
 *
 * Ejemplo de uso:
 *   <ResponsibleBadge responsableId="profesor_guia" />
 *   <ResponsibleBadge responsableId="memorista" />
 */

import { responsables } from "../../data/acciones.js";

export default function ResponsibleBadge({
  responsableId,
  children,
  style = {},
  className = "",
  ...rest
}) {
  const nombreLegible = children ?? responsables[responsableId] ?? responsableId ?? "Sin asignar";
  const esMemorista = responsableId === "memorista";

  const badgeStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "2px 8px",
    borderRadius: "var(--r-sm, 6px)",
    fontSize: "12px",
    fontWeight: 500,
    lineHeight: "1.4",
    border: `1px solid ${esMemorista ? "var(--line-strong)" : "var(--line)"}`,
    color: esMemorista ? "var(--navy-2)" : "var(--ink-2)",
    background: esMemorista ? "var(--navy-wash)" : "var(--surface-2)",
    width: "fit-content",
    verticalAlign: "middle",
    whiteSpace: "nowrap",
    ...style,
  };

  const iconStyle = {
    fontSize: "11px",
    opacity: 0.8,
    display: "inline-block",
    lineHeight: 1,
  };

  return (
    <span
      className={`responsible-badge responsible-badge--${responsableId || "desconocido"} ${className}`.trim()}
      style={badgeStyle}
      {...rest}
    >
      <span style={iconStyle} aria-hidden="true">
        {esMemorista ? "👤" : "🏛️"}
      </span>
      <span>{nombreLegible}</span>
    </span>
  );
}
