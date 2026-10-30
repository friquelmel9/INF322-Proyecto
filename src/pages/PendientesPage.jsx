import { memorista } from "../data/memorista.js";
import { acciones } from "../data/acciones.js";
import NextActionCard from "../components/pendientes/NextActionCard.jsx";
import ResponsibilityFlow from "../components/pendientes/ResponsibilityFlow.jsx";

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

        {otrasAcciones.length > 0 && (
          <section className="card">
            <div className="card-h">
              <h2>Otras acciones de tu etapa</h2>
            </div>

            <div className="card-b">
              <ul className="stack">
                {otrasAcciones.map((accion) => (
                  <li key={accion.id}>
                    <h3>{accion.titulo}</h3>
                    <p>{accion.descripcion}</p>

                    <ResponsibilityFlow
                      responsableActualId={accion.responsableActualId}
                      siguienteResponsableId={accion.siguienteResponsableId}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
