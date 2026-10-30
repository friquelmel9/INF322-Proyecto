/*
 * DocumentList.jsx — Módulo E
 * Listado de documentos ya filtrados.
 *
 * Contrato: docs/contrato.md §4
 * Tarea: E01 (docs/tareas.md)
 */
import DocumentCard from "./DocumentCard.jsx";

export default function DocumentList({ documentos }) {
  if (documentos.length === 0) {
    return (
      <div className="note">
        <span aria-hidden="true">🔎</span>
        <div>No hay documentos que coincidan con la búsqueda.</div>
      </div>
    );
  }

  return (
    <ul className="stack" style={{ listStyle: "none", padding: 0, margin: 0, gap: "10px" }}>
      {documentos.map((documento) => (
        <li key={documento.id}>
          <DocumentCard documento={documento} />
        </li>
      ))}
    </ul>
  );
}
