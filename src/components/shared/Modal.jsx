/*
 * Modal.jsx — Módulo F
 * Componente reutilizable de ventana modal accesible.
 * Se cierra con el botón «Cerrar», con la tecla Escape o con clic en el fondo.
 * Atrapa el foco mientras está abierto y lo devuelve al elemento que lo abrió.
 *
 * Contrato: docs/contrato.md §5 (ubicación en components/shared/)
 * Tarea: F01 (docs/tareas.md)
 * Estilos: src/styles/accessibility.css (.modal, .modal-fondo)
 *
 * Props:
 *   abierto   boolean   controla si se muestra
 *   onCerrar  function  se llama al cerrar (botón, Escape o fondo)
 *   titulo    string    título visible; nombra el diálogo para lectores de pantalla
 *   children            contenido del modal
 *   className string    clases extra para el diálogo (opcional)
 *
 * Ejemplo de uso:
 *   const [abierto, setAbierto] = useState(false);
 *   <button className="btn" onClick={() => setAbierto(true)}>Ver detalle</button>
 *   <Modal abierto={abierto} onCerrar={() => setAbierto(false)} titulo="Detalle">
 *     <p>Contenido</p>
 *   </Modal>
 */

import { useEffect, useRef, useId } from "react";
import { createPortal } from "react-dom";

const FOCUSABLES =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export default function Modal({
  abierto,
  onCerrar,
  titulo,
  children,
  className = "",
  ...rest
}) {
  const dialogRef = useRef(null);
  const elementoPrevio = useRef(null);
  const tituloId = useId();

  useEffect(() => {
    if (!abierto) return undefined;

    // Recordar quién tenía el foco para devolvérselo al cerrar.
    elementoPrevio.current = document.activeElement;

    const dialogo = dialogRef.current;
    const primero = dialogo.querySelector(FOCUSABLES);
    (primero || dialogo).focus();

    // Evita que la página de fondo se desplace.
    const overflowOriginal = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(e) {
      if (e.key === "Escape") {
        e.stopPropagation();
        onCerrar();
        return;
      }
      if (e.key !== "Tab") return;

      // Focus trap: el foco no sale del modal.
      const items = Array.from(dialogo.querySelectorAll(FOCUSABLES));
      if (items.length === 0) {
        e.preventDefault();
        return;
      }
      const ultimo = items[items.length - 1];
      const inicial = items[0];
      if (e.shiftKey && document.activeElement === inicial) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        inicial.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflowOriginal;
      if (elementoPrevio.current && elementoPrevio.current.focus) {
        elementoPrevio.current.focus();
      }
    };
  }, [abierto, onCerrar]);

  if (!abierto) return null;

  return createPortal(
    <div
      className="modal-fondo"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onCerrar();
      }}
    >
      <div
        ref={dialogRef}
        className={`modal ${className}`.trim()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={tituloId}
        tabIndex={-1}
        {...rest}
      >
        <header className="modal__encabezado">
          <h2 id={tituloId} className="modal__titulo">
            {titulo}
          </h2>
        </header>
        <div className="modal__cuerpo">{children}</div>
        <footer className="modal__pie">
          <button type="button" className="btn modal__cerrar" onClick={onCerrar}>
            Cerrar
          </button>
        </footer>
      </div>
    </div>,
    document.body
  );
}