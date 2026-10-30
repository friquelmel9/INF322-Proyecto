import ResponsibleBadge from "../shared/ResponsibleBadge.jsx";

export default function ResponsibilityFlow({
  responsableActualId,
  siguienteResponsableId,
}) {
  const esTurnoDelMemorista = responsableActualId === "memorista";

  return (
    <div className="stack">
      <p>
        {esTurnoDelMemorista ? (
          <strong>Te toca a ti</strong>
        ) : (
          <>
            <strong>Esperando a: </strong>
            <ResponsibleBadge responsableId={responsableActualId} />
          </>
        )}
      </p>

      {siguienteResponsableId !== null && (
        <p>
          Después interviene:{" "}
          <ResponsibleBadge responsableId={siguienteResponsableId} />
        </p>
      )}
    </div>
  );
}
