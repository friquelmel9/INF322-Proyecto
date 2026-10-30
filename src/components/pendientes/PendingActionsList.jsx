import StatusBadge from "../shared/StatusBadge.jsx";
import ResponsibilityFlow from "./ResponsibilityFlow.jsx";
import ActionInstructions from "./ActionInstructions.jsx";

export default function PendingActionsList({ acciones }) {
  if (acciones.length === 0) {
    return null;
  }

  return (
    <section className="card">
      <div className="card-h">
        <h2>Otras acciones de tu etapa</h2>
      </div>

      <div className="card-b">
        <ul className="stack">
          {acciones.map((accion) => (
            <li key={accion.id}>
              <div className="stack">
                <h3>{accion.titulo}</h3>

                <div>
                  <StatusBadge tipo="accion" valor={accion.estado} />
                </div>

                <p>{accion.descripcion}</p>

                <ResponsibilityFlow
                  responsableActualId={accion.responsableActualId}
                  siguienteResponsableId={accion.siguienteResponsableId}
                />

                <ActionInstructions instrucciones={accion.instrucciones} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
