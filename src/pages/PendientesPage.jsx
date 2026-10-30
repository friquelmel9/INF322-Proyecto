import { memorista } from "../data/memorista.js";
import { acciones } from "../data/acciones.js";

export default function PendientesPage() {
  const accionesEtapa = acciones
    .filter((accion) => accion.etapaId === memorista.etapaActualId)
    .sort((a, b) => a.prioridad - b.prioridad);

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

        <section className="card">
          <div className="card-h">
            <h2>Acciones de tu etapa actual</h2>
          </div>

          <div className="card-b">
            <ol className="stack">
              {accionesEtapa.map((accion) => (
                <li key={accion.id}>
                  <h3>{accion.titulo}</h3>
                  <p>{accion.descripcion}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>
    </>
  );
}