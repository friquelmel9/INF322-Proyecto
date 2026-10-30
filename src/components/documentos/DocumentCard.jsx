/*
 * DocumentCard.jsx — Módulo E
 * Tarjeta de un documento: vigencia, versión y acceso a su ficha.
 *
 * Contrato: docs/contrato.md §4
 * Tareas: E01, E02 (docs/tareas.md)
 */
import { Link } from "react-router-dom";
import StatusBadge from "../shared/StatusBadge.jsx";

export function formatearFecha(fechaIso) {
  const [anio, mes, dia] = fechaIso.split("-");
  return `${dia}-${mes}-${anio}`;
}

export default function DocumentCard({ documento }) {
  const vigente = documento.estado === "vigente";

  return (
    <article
      className="card"
      style={{
        borderLeft: `4px solid ${vigente ? "var(--ok-line)" : "var(--bad-line)"}`,
        opacity: vigente ? 1 : 0.85,
      }}
    >
      <div className="card-b" style={{ display: "flex", gap: "14px", alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 260px", display: "flex", flexDirection: "column", gap: "4px" }}>
          <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
            <h3 style={{ fontSize: "15px", fontWeight: 600 }}>{documento.nombre}</h3>
            <StatusBadge tipo="documento" valor={documento.estado} />
          </div>
          <span className="mono" style={{ fontSize: "12.5px", color: "var(--ink-3)" }}>
            {documento.nombreArchivo}
          </span>
          <span style={{ fontSize: "12.5px", color: "var(--ink-2)" }}>
            Versión {documento.version} · Vigente desde {formatearFecha(documento.vigenciaDesde)}
          </span>
        </div>
        <Link to={`/documentos/${documento.id}`} className="btn sm">
          Abrir ficha
        </Link>
      </div>
    </article>
  );
}
