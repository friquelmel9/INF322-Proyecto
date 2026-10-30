import StatusBadge from "../shared/StatusBadge.jsx";
import ResponsibilityFlow from "./ResponsibilityFlow.jsx";
import ActionInstructions from "./ActionInstructions.jsx";

export default function NextActionCard({ accion }) {
  return (
    <section className="card pendientes-prioritaria">
      <div className="card-h pendientes-cabecera">
        <h2>Acción prioritaria</h2>
        <span className="pendientes-etiqueta">Prioridad {accion.prioridad}</span>
      </div>

      <div className="card-b stack">
        <div className="pendientes-encabezado-accion">
          <h3 className="pendientes-titulo">{accion.titulo}</h3>
          <div className="pendientes-estado">
            <span className="pendientes-etiqueta">Estado actual:</span>
            <StatusBadge tipo="accion" valor={accion.estado} />
          </div>
        </div>

        <p className="pendientes-descripcion">{accion.descripcion}</p>

        <ResponsibilityFlow
          responsableActualId={accion.responsableActualId}
          siguienteResponsableId={accion.siguienteResponsableId}
        />

        <ActionInstructions instrucciones={accion.instrucciones} />
      </div>
    </section>
  );
}
