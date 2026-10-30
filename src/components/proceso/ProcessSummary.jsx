import { Link } from "react-router-dom";
import { obtenerEstadoEtapa } from "../../data/etapas.js";
import StatusBadge from "../shared/StatusBadge.jsx";

export default function ProcessSummary({ memorista, etapas }) {
  const actual = etapas.find((etapa) => etapa.id === memorista.etapaActualId);
  const completadas = etapas.filter((etapa) => obtenerEstadoEtapa(etapa.id, memorista.etapaActualId) === "completada").length;
  const pendientes = etapas.filter((etapa) => obtenerEstadoEtapa(etapa.id, memorista.etapaActualId) === "pendiente").length;
  return (
    <section className="card" aria-labelledby="proceso-resumen-titulo">
      <div className="card-h"><h2 id="proceso-resumen-titulo">Resumen de tu titulación</h2></div>
      <div className="card-b stack">
        <dl className="proceso-perfil">
          <div><dt>Memorista</dt><dd>{memorista.nombre}</dd></div>
          <div><dt>Carrera</dt><dd>{memorista.carrera}</dd></div>
          <div><dt>Curso</dt><dd>{memorista.curso}</dd></div>
        </dl>
        <div className="proceso-actual stack">
          <div className="proceso-fila">
            <h3>Etapa actual: {actual ? `${actual.id}. ${actual.nombre}` : "Sin etapa asignada"}</h3>
            {actual && <StatusBadge tipo="etapa" valor="actual" />}
          </div>
          {actual && <p>{actual.descripcion}</p>}
          <div><Link to="/pendientes" className="btn">Ver mis próximos pasos</Link></div>
        </div>
        <div className="stack proceso-avance">
          <label htmlFor="proceso-avance">{completadas} de {etapas.length} etapas completadas</label>
          <progress id="proceso-avance" value={completadas} max={etapas.length || 1} />
          <p>{completadas} completadas · {actual ? 1 : 0} en curso · {pendientes} pendientes</p>
        </div>
      </div>
    </section>
  );
}
