import StatusBadge from "../shared/StatusBadge.jsx";

export default function ProcessStage({ etapa, estado, onSelect, seleccionada = false, detalleId }) {
  return (
    <li className={`proceso-etapa proceso-etapa--${estado}`}>
      <button type="button" className="proceso-etapa-boton"
        onClick={() => onSelect(etapa)} aria-pressed={seleccionada}
        aria-current={estado === "actual" ? "step" : undefined} aria-controls={detalleId}>
        <span className="proceso-numero" aria-hidden="true">{estado === "completada" ? "✓" : etapa.id}</span>
        <span className="proceso-etapa-texto">
          <span className="proceso-etapa-nombre">{etapa.id}. {etapa.nombre}</span>
          <StatusBadge tipo="etapa" valor={estado} />
          <span className="proceso-seleccion">{seleccionada ? "Detalle seleccionado" : "Ver detalle"}</span>
        </span>
      </button>
    </li>
  );
}
