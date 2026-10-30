import { useId, useState } from "react";

export default function ActionInstructions({ instrucciones }) {
  const [estanAbiertas, setEstanAbiertas] = useState(false);
  const instruccionesId = useId();

  if (instrucciones.length === 0) {
    return <p>No hay instrucciones disponibles para esta acción.</p>;
  }

  return (
    <div className="stack">
      <div>
        <button
          type="button"
          className="btn"
          aria-expanded={estanAbiertas}
          aria-controls={instruccionesId}
          onClick={() => setEstanAbiertas((actual) => !actual)}
        >
          {estanAbiertas ? "Ocultar instrucciones" : "Ver instrucciones"}
        </button>
      </div>

      <ol
        className="pendientes-lista"
        id={instruccionesId}
        hidden={!estanAbiertas}
      >
        {instrucciones.map((instruccion, indice) => (
          <li key={indice}>{instruccion}</li>
        ))}
      </ol>
    </div>
  );
}
