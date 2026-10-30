import { memorista } from "../data/memorista.js";
import { acciones } from "../data/acciones.js";
import NextActionCard from "../components/pendientes/NextActionCard.jsx";
import PendingActionsList from "../components/pendientes/PendingActionsList.jsx";

import "../components/pendientes/pendientes.css";

export default function PendientesPage() {
  const accionesEtapa = acciones
    .filter((accion) => accion.etapaId === memorista.etapaActualId)
    .sort((a, b) => a.prioridad - b.prioridad);

  const accionPrioritaria = accionesEtapa[0];
  const otrasAcciones = accionesEtapa.slice(1);

  return (
    <>
      <div className="pagehead">
        <div>
          <h1>Próximos pasos</h1>
          <p>
            {memorista.nombre} · {memorista.curso} · Etapa{" "}
            {memorista.etapaActualId}
          </p>
        </div>
      </div>

      <div className="stack">
        <p className="note">
          Escenario de demostración: los datos son simulados.
        </p>

        {accionPrioritaria ? (
          <NextActionCard accion={accionPrioritaria} />
        ) : (
          <p className="note">
            No hay acciones registradas para tu etapa actual.
          </p>
        )}

        <PendingActionsList acciones={otrasAcciones} />
      </div>
    </>
  );
}
