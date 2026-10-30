/*
 * NotFoundPage.jsx — Módulo A
 * Ruta comodín "*". Muestra un mensaje comprensible y un enlace de
 * regreso a /proceso (definición de terminado del contrato §7.2).
 *
 * Propiedad: Módulo A.
 */
import { useLocation, Link } from "react-router-dom";

export default function NotFoundPage() {
  const { pathname } = useLocation();
  return (
    <div className="pagehead" style={{ flexDirection: "column", alignItems: "flex-start" }}>
      <div className="eyebrow">Error 404</div>
      <h1>No encontramos esta página</h1>
      <p>
        La ruta <code className="mono">{pathname}</code> no existe en la Ruta de Titulación.
      </p>
      <Link className="btn primary" to="/proceso" style={{ marginTop: 16 }}>
        Volver a Mi proceso
      </Link>
    </div>
  );
}
