/*
 * FeedbackMessage.jsx — Módulo F
 * Componente reutilizable para mensajes de retroalimentación visibles.
 * Solo para acciones reales del frontend (por ejemplo «Instrucciones
 * desplegadas» o «Filtro aplicado»). No debe aparentar que se envió,
 * descargó o aprobó algo institucional (contrato §7, punto 4).
 *
 * Contrato: docs/contrato.md §5 (ubicación en components/shared/)
 * Tarea: F02 (docs/tareas.md)
 * Estilos: src/styles/accessibility.css (.feedback, .feedback--<tipo>)
 *
 * Props:
 *   tipo          "exito" | "info" | "error"   (por defecto "info")
 *   mensaje       string; si está vacío no se muestra nada
 *   onCerrar      function opcional; si existe aparece el botón «Cerrar aviso»
 *   autoCerrarMs  number opcional; cierra solo tras esos milisegundos (requiere onCerrar)
 *   className     string; clases extra (opcional)
 *
 * Accesibilidad: "exito" e "info" usan role="status" (aria-live polite);
 * "error" usa role="alert" (aria-live assertive).
 *
 * Ejemplo de uso:
 *   const [aviso, setAviso] = useState("");
 *   <FeedbackMessage tipo="info" mensaje={aviso} onCerrar={() => setAviso("")} />
 *   <FeedbackMessage tipo="error" mensaje="Documento no encontrado" />
 */

import { useEffect } from "react";

const ETIQUETAS = {
  exito: "Listo",
  info: "Información",
  error: "Error",
};

export default function FeedbackMessage({
  tipo = "info",
  mensaje,
  onCerrar,
  autoCerrarMs,
  className = "",
  ...rest
}) {
  useEffect(() => {
    if (!mensaje || !onCerrar || !autoCerrarMs) return undefined;
    const t = setTimeout(onCerrar, autoCerrarMs);
    return () => clearTimeout(t);
  }, [mensaje, onCerrar, autoCerrarMs]);

  if (!mensaje) return null;

  const tipoValido = ETIQUETAS[tipo] ? tipo : "info";

  return (
    <div
      className={`feedback feedback--${tipoValido} ${className}`.trim()}
      role={tipoValido === "error" ? "alert" : "status"}
      aria-live={tipoValido === "error" ? "assertive" : "polite"}
      {...rest}
    >
      <p className="feedback__texto">
        <strong>{ETIQUETAS[tipoValido]}: </strong>
        {mensaje}
      </p>
      {onCerrar && (
        <button
          type="button"
          className="feedback__cerrar"
          onClick={onCerrar}
          aria-label="Cerrar aviso"
        >
          ×
        </button>
      )}
    </div>
  );
}