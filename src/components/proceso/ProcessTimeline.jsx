import { useId, useState } from "react";
import { obtenerEstadoEtapa } from "../../data/etapas.js";
import ProcessStage from "./ProcessStage.jsx";
import StageDetail from "./StageDetail.jsx";

export default function ProcessTimeline({ etapas, etapaActualId }) {
  const [seleccionId, setSeleccionId] = useState(etapaActualId);
  const detalleId = useId();
  const seleccionada = etapas.find((etapa) => etapa.id === seleccionId)
    ?? etapas.find((etapa) => etapa.id === etapaActualId) ?? etapas[0];
  return (
    <section className="stack" aria-labelledby="proceso-etapas-titulo">
      <div>
        <h2 id="proceso-etapas-titulo">Etapas de tu proceso</h2>
        <p className="proceso-ayuda">Selecciona una etapa para conocer sus pasos y responsables. Consultar otra etapa no modifica tu avance.</p>
      </div>
      <ol className="proceso-timeline" aria-label="Etapas de titulación">
        {etapas.map((etapa) => (
          <ProcessStage key={etapa.id} etapa={etapa}
            estado={obtenerEstadoEtapa(etapa.id, etapaActualId)}
            onSelect={(elegida) => setSeleccionId(elegida.id)}
            seleccionada={etapa.id === seleccionada?.id} detalleId={detalleId} />
        ))}
      </ol>
      <div id={detalleId} aria-live="polite" aria-atomic="true">
        {seleccionada ? <StageDetail etapa={seleccionada} /> : <p className="note">No hay etapas disponibles.</p>}
      </div>
    </section>
  );
}
