import ResponsibleBadge from "../shared/ResponsibleBadge.jsx";

export default function ResponsibilityFlow({
  responsableActualId,
  siguienteResponsableId,
}) {
  const esTurnoDelMemorista = responsableActualId === "memorista";

  return (
    <dl className="pendientes-responsables">
      <div className="pendientes-responsable">
        <dt>Responsable actual</dt>
        <dd className="pendientes-responsable-valor">
          {esTurnoDelMemorista ? (
            <>
              <ResponsibleBadge responsableId={responsableActualId} />
              <p className="pendientes-ayuda">
                <strong>Te toca a ti:</strong> realiza esta acción siguiendo las
                instrucciones.
              </p>
            </>
          ) : (
            <>
              <p className="pendientes-estado">
                <span>Esperando a:</span>
                <ResponsibleBadge responsableId={responsableActualId} />
              </p>
              <p className="pendientes-ayuda">
                Esta acción avanza cuando interviene este responsable.
              </p>
            </>
          )}
        </dd>
      </div>

      {siguienteResponsableId !== null && (
        <div className="pendientes-responsable">
          <dt>Después interviene:</dt>
          <dd className="pendientes-responsable-valor">
            <ResponsibleBadge responsableId={siguienteResponsableId} />
            <p className="pendientes-ayuda">
              Cuando se complete la acción actual.
            </p>
          </dd>
        </div>
      )}
    </dl>
  );
}
