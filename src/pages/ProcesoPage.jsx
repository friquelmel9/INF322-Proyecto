/*
 * Módulo C — H1 «Mi proceso» (/proceso).
 * Perfil, avance y consulta de las ocho etapas con los datos de B.
 * Criterios C01–C05 de docs/tareas.md y contrato compartido.
 */
import { memorista } from "../data/memorista.js";
import { etapas } from "../data/etapas.js";
import ProcessSummary from "../components/proceso/ProcessSummary.jsx";
import ProcessTimeline from "../components/proceso/ProcessTimeline.jsx";
import "../components/proceso/proceso.css";

export default function ProcesoPage() {
  return (
    <>
      <div className="pagehead">
        <div>
          <div className="eyebrow">Tu ruta de titulación</div>
          <h1>Mi proceso</h1>
          <p>Perfil del memorista, etapa actual y las ocho etapas de titulación.</p>
        </div>
      </div>
      <div className="stack">
        <div className="note warn">
          <p><b>Escenario de demostración.</b> El perfil y los estados son datos simulados; no representan información oficial de la UTFSM.</p>
        </div>
        <ProcessSummary memorista={memorista} etapas={etapas} />
        <ProcessTimeline etapas={etapas} etapaActualId={memorista.etapaActualId} />
      </div>
    </>
  );
}
