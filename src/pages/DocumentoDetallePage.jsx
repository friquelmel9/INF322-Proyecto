/*
 * ⚠️ PLACEHOLDER creado por el Módulo A solo para que la app compile y el
 * router funcione de punta a punta.
 *
 * DUEÑO REAL: Módulo E — ficha de documento (/documentos/:id).
 * → Reemplaza TODO el contenido de este archivo por la página real.
 * → Muestra nombre, versión, vigencia y enlace a la versión que lo reemplazó
 *   (contrato §2, §3.4 y §6). Un :id inexistente debe mostrar un mensaje
 *   comprensible y enlace de regreso (contrato §7.2).
 * → No modifiques App.jsx, main.jsx ni components/layout/ (son del Módulo A).
 */
import { useParams, Link } from "react-router-dom";

export default function DocumentoDetallePage() {
  const { id } = useParams();
  return (
    <>
      <div className="pagehead">
        <div>
          <div className="eyebrow">H5 · Módulo E</div>
          <h1>Ficha de documento</h1>
          <p>
            Detalle del documento <code className="mono">{id}</code>.
          </p>
        </div>
      </div>
      <div className="note">
        <span>🚧</span>
        <div>
          <b>Página en construcción (Módulo E).</b> Placeholder del Módulo A.{" "}
          <Link to="/documentos">Volver a Documentos</Link>.
        </div>
      </div>
    </>
  );
}
