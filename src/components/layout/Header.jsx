/*
 * Header.jsx — Módulo A
 * Barra superior institucional (topbar del prototipo).
 *
 * El perfil se lee de src/data/memorista.js (Módulo B, contrato §3.1) en vez
 * de repetir el dato aquí, para que exista una sola fuente del escenario.
 *
 * Incluye además el aviso «Escenario de demostración» que pide el contrato
 * §7.5: abre el Modal del Módulo F advirtiendo que los datos no son
 * información oficial.
 *
 * Propiedad: solo el Módulo A edita el layout.
 */
import { useState } from "react";
import { memorista } from "../../data/memorista.js";
import Modal from "../shared/Modal.jsx";

// "Camila Fuentealba" -> "CF"
function iniciales(nombre) {
  return nombre
    .split(" ")
    .slice(0, 2)
    .map((parte) => parte.charAt(0))
    .join("")
    .toUpperCase();
}

export default function Header() {
  const [avisoAbierto, setAvisoAbierto] = useState(false);

  return (
    <header className="topbar">
      <div className="topbar-in">
        <div className="brand">
          <div className="crest" aria-hidden="true">DI</div>
          <div className="brand-txt">
            <b>Ruta de Titulación</b>
            <span>Depto. de Informática · UTFSM</span>
          </div>
        </div>
        <div className="top-right">
          <button
            type="button"
            className="btn sm"
            onClick={() => setAvisoAbierto(true)}
          >
            Escenario de demostración
          </button>
          <div className="who-am-i">
            <div className="av" aria-hidden="true">
              {iniciales(memorista.nombre)}
            </div>
            <div>
              <b>{memorista.nombre}</b>
              <small>Memorista · {memorista.curso}</small>
            </div>
          </div>
        </div>
      </div>

      <Modal
        abierto={avisoAbierto}
        onCerrar={() => setAvisoAbierto(false)}
        titulo="Escenario de demostración"
      >
        <div className="stack">
          <p>
            Esta aplicación es un prototipo. El perfil del memorista, las
            fechas, las acciones pendientes y los documentos con sus versiones
            son datos de prueba, creados para mostrar cómo funcionaría la Ruta
            de Titulación.
          </p>
          <p>
            No corresponden a información oficial del Departamento de
            Informática ni reemplazan el Reglamento de Titulación vigente. Para
            cualquier trámite real, revisa los canales oficiales del
            Departamento.
          </p>
        </div>
      </Modal>
    </header>
  );
}
