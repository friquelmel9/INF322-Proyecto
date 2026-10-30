/*
 * DocumentosPage.jsx — Módulo E
 * H5: listado y buscador de documentos, separado en vigentes y no vigentes.
 * Admite el filtro por etapa vía query param: /documentos?etapa=5
 *
 * Contrato: docs/contrato.md §2, §3.4 y §6
 * Tareas: E01, E02, E05 (docs/tareas.md)
 */
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { documentos } from "../data/documentos.js";
import { etapas } from "../data/etapas.js";
import DocumentSearch from "../components/documentos/DocumentSearch.jsx";
import DocumentList from "../components/documentos/DocumentList.jsx";

function normalizar(texto) {
  return texto.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

export default function DocumentosPage() {
  const [busqueda, setBusqueda] = useState("");
  const [searchParams] = useSearchParams();

  const etapaParam = searchParams.get("etapa");
  const etapaId = Number(etapaParam);
  const etapa = etapaParam ? etapas.find((e) => e.id === etapaId) : null;
  const etapaInvalida = etapaParam !== null && !etapa;

  const termino = normalizar(busqueda.trim());
  const filtrados = documentos.filter((doc) => {
    if (etapa && !doc.etapaIds.includes(etapa.id)) return false;
    if (!termino) return true;
    return normalizar(doc.nombre).includes(termino) || normalizar(doc.nombreArchivo).includes(termino);
  });

  const vigentes = filtrados.filter((doc) => doc.estado === "vigente");
  const noVigentes = filtrados.filter((doc) => doc.estado === "no_vigente");

  return (
    <>
      <div className="pagehead">
        <div>
          <div className="eyebrow">Documentación y reglamentos</div>
          <h1>Documentos</h1>
          <p>Consulta qué documentos están vigentes y cuáles fueron reemplazados.</p>
        </div>
      </div>

      <div className="stack">
        <div className="note warn">
          <span aria-hidden="true">ℹ️</span>
          <div>
            <b>Escenario de demostración.</b> Los nombres, versiones y fechas son simulados y no
            acreditan la vigencia oficial de documentos de la UTFSM.
          </div>
        </div>

        {etapa && (
          <div className="note" role="status">
            <span aria-hidden="true">🧭</span>
            <div>
              Mostrando documentos de la etapa <b>{etapa.id}: {etapa.nombre}</b>.{" "}
              <Link to="/documentos">Ver todos los documentos</Link>
            </div>
          </div>
        )}
        {etapaInvalida && (
          <div className="note bad" role="status">
            <span aria-hidden="true">⚠️</span>
            <div>
              La etapa «{etapaParam}» no existe; se muestran todos los documentos.{" "}
              <Link to="/documentos">Quitar filtro</Link>
            </div>
          </div>
        )}

        <DocumentSearch value={busqueda} onChange={setBusqueda} />

        <section className="card" aria-labelledby="titulo-vigentes">
          <div className="card-h">
            <h2 id="titulo-vigentes">Vigentes</h2>
            <span className="sub">{vigentes.length} documento(s)</span>
          </div>
          <div className="card-b">
            <DocumentList documentos={vigentes} />
          </div>
        </section>

        <section className="card" aria-labelledby="titulo-no-vigentes">
          <div className="card-h">
            <h2 id="titulo-no-vigentes">No vigentes</h2>
            <span className="sub">{noVigentes.length} documento(s) · versiones anteriores</span>
          </div>
          <div className="card-b">
            <DocumentList documentos={noVigentes} />
          </div>
        </section>
      </div>
    </>
  );
}
