import StatusBadge from "../shared/StatusBadge.jsx";
import ResponsibilityFlow from "./ResponsibilityFlow.jsx";

export default function NextActionCard({ accion }) {
  return (
    <section className="card">
      <div className="card-h">
        <h2>Acción prioritaria</h2>
      </div>

      <div className="card-b stack">
        <div>
          <p className="eyebrow">Prioridad {accion.prioridad}</p>
          <h3>{accion.titulo}</h3>
        </div>

        <div>
          <StatusBadge tipo="accion" valor={accion.estado} />
        </div>

        <p>{accion.descripcion}</p>

        <ResponsibilityFlow
          responsableActualId={accion.responsableActualId}
          siguienteResponsableId={accion.siguienteResponsableId}
        />
      </div>
    </section>
  );
}
