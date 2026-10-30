/*
 * Header.jsx — Módulo A
 * Barra superior institucional (topbar del prototipo).
 *
 * El perfil mostrado (nombre/rol) usa el escenario de demostración del
 * contrato: Camila Fuentealba, memorista de TT2. Cuando el Módulo B
 * publique src/data/memorista.js, este dato puede leerse desde ahí;
 * por ahora se deja fijo para no acoplar A con datos aún inexistentes.
 *
 * Propiedad: solo el Módulo A edita el layout.
 */
export default function Header() {
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
          <div className="who-am-i">
            <div className="av" aria-hidden="true">CF</div>
            <div>
              <b>Camila Fuentealba</b>
              <small>Memorista · TT2</small>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
