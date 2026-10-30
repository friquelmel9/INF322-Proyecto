import { useId, useState } from "react";

export default function ActionInstructions({ instrucciones }) {
  const [estanAbiertas, setEstanAbiertas] = useState(false);
  const instruccionesId = useId();

  return (
    <div className="stack pendientes-instrucciones">
      <h4 className="pendientes-etiqueta">Cómo continuar</h4>
      {instrucciones.length === 0 ? (
        <p>No hay instrucciones disponibles para esta acción.</p>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
