/*
 * DocumentSearch.jsx — Módulo E
 * Campo de búsqueda local por nombre o nombre de archivo.
 *
 * Contrato: docs/contrato.md §4
 * Tarea: E05 (docs/tareas.md)
 */

export default function DocumentSearch({ value, onChange }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label htmlFor="document-search" style={{ fontSize: "13px", fontWeight: 600 }}>
        Buscar documento
      </label>
      <input
        id="document-search"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Ej.: Reglamento, Plantilla_Memoria…"
        style={{
          padding: "9px 12px",
          borderRadius: "var(--r-sm)",
          border: "1px solid var(--line-strong)",
          background: "var(--surface)",
          color: "var(--ink)",
          font: "inherit",
          fontSize: "14px",
        }}
      />
    </div>
  );
}
