/*
 * DocumentoDetallePage.jsx — Módulo E
 * Ficha de un documento (/documentos/:id): nombre, versión, vigencia,
 * descripción, etapas relacionadas y acceso a la versión vigente.
 *
 * Contrato: docs/contrato.md §2, §3.4, §6 y §7.2
 * Tareas: E03, E04 (docs/tareas.md)
 */
import { Link, useNavigate, useParams } from "react-router-dom";
import { documentos } from "../data/documentos.js";
import { etapas } from "../data/etapas.js";
import StatusBadge from "../components/shared/StatusBadge.jsx";
import { formatearFecha } from "../components/documentos/DocumentCard.jsx";

const filaStyle = { display: "grid", gridTemplateColumns: "170px 1fr", gap: "12px", padding: "8px 0" };
const etiquetaStyle = { fontSize: "12.5px", color: "var(--ink-3)", fontWeight: 600 };

export default function DocumentoDetallePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const documento = documentos.find((doc) => doc.id === id);

  if (!documento) {
    return (
      <>
        <div className="pagehead">
          <div>
            <div className="eyebrow">Documentos</div>
            <h1>Documento no encontrado</h1>
          </div>
        </div>
        <div className="note bad">
          <span aria-hidden="true">⚠️</span>
          <div>
            No existe un documento con identificador <code className="mono">{id}</code>.{" "}
            <Link to="/documentos">Volver a Documentos</Link>
          </div>
        </div>
      </>
    );
  }

  const reemplazo = documento.reemplazadoPorId
    ? documentos.find((doc) => doc.id === documento.reemplazadoPorId)
    : null;
  const versionesAnteriores = documentos.filter((doc) => doc.reemplazadoPorId === documento.id);
  const etapasRelacionadas = etapas.filter((e) => documento.etapaIds.includes(e.id));

  return (
    <>
      <div className="pagehead">
        <div>
          <div className="eyebrow">
            <Link to="/documentos">Documentos</Link> / Ficha
          </div>
          <h1>{documento.nombre}</h1>
          <p className="mono">{documento.nombreArchivo}</p>
        </div>
      </div>

      <div className="stack">
        {documento.estado === "no_vigente" ? (
          <div className="note bad" role="status">
            <span aria-hidden="true">⛔</span>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <div>
                <b>Este documento no está vigente.</b>{" "}
                {reemplazo ? `Fue reemplazado por «${reemplazo.nombre}» (versión ${reemplazo.version}).` : ""}
              </div>
              {reemplazo && (
                <div>
                  <button
                    type="button"
                    className="btn primary sm"
                    onClick={() => navigate(`/documentos/${reemplazo.id}`)}
                  >
                    Ver versión vigente
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="note" role="status" style={{ background: "var(--ok-wash)", borderColor: "var(--ok-line)", color: "var(--ok)" }}>
            <span aria-hidden="true">✅</span>
            <div>
              <b style={{ color: "var(--ok)" }}>Documento vigente</b> en el escenario de demostración.
            </div>
          </div>
        )}

        <section className="card" aria-labelledby="titulo-ficha">
          <div className="card-h">
            <h2 id="titulo-ficha">Ficha del documento</h2>
            <StatusBadge tipo="documento" valor={documento.estado} />
          </div>
          <div className="card-b">
            <dl style={{ margin: 0 }}>
              <div style={filaStyle}>
                <dt style={etiquetaStyle}>Nombre</dt>
                <dd style={{ margin: 0 }}>{documento.nombre}</dd>
              </div>
              <div style={filaStyle}>
                <dt style={etiquetaStyle}>Versión</dt>
                <dd style={{ margin: 0 }}>{documento.version}</dd>
              </div>
              <div style={filaStyle}>
                <dt style={etiquetaStyle}>Vigente desde</dt>
                <dd style={{ margin: 0 }}>{formatearFecha(documento.vigenciaDesde)}</dd>
              </div>
              <div style={filaStyle}>
                <dt style={etiquetaStyle}>Descripción</dt>
                <dd style={{ margin: 0 }}>{documento.descripcion}</dd>
              </div>
              <div style={filaStyle}>
                <dt style={etiquetaStyle}>Etapas relacionadas</dt>
                <dd style={{ margin: 0, display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {etapasRelacionadas.map((e) => (
                    <Link key={e.id} to={`/documentos?etapa=${e.id}`} className="btn ghost sm">
                      {e.id}. {e.nombre}
                    </Link>
                  ))}
                </dd>
              </div>
              {versionesAnteriores.length > 0 && (
                <div style={filaStyle}>
                  <dt style={etiquetaStyle}>Versiones anteriores</dt>
                  <dd style={{ margin: 0, display: "flex", flexDirection: "column", gap: "4px" }}>
                    {versionesAnteriores.map((doc) => (
                      <Link key={doc.id} to={`/documentos/${doc.id}`}>
                        {doc.nombre} (versión {doc.version})
                      </Link>
                    ))}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </section>

        <div className="note warn">
          <span aria-hidden="true">ℹ️</span>
          <div>
            <b>Escenario de demostración.</b> Esta ficha no descarga ni abre un archivo real; los datos
            son simulados.
          </div>
        </div>

        <div>
          <Link to="/documentos" className="btn">
            ← Volver a Documentos
          </Link>
        </div>
      </div>
    </>
  );
}
