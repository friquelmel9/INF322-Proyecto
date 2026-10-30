import { useId } from "react";
import { Link } from "react-router-dom";
import ResponsibleBadge from "../shared/ResponsibleBadge.jsx";

export default function StageDetail({ etapa }) {
  const tituloId = useId();
  return (
    <section className="card proceso-detalle" aria-labelledby={tituloId}>
      <div className="card-h"><h2 id={tituloId}>Etapa {etapa.id}: {etapa.nombre}</h2></div>
      <div className="card-b stack">
        <p>{etapa.descripcion}</p>
        <div className="stack proceso-grupo">
          <h3>Pasos de esta etapa</h3>
          {etapa.pasos.length > 0 ? (
            <ol className="proceso-pasos">{etapa.pasos.map((paso, indice) => <li key={indice}>{paso}</li>)}</ol>
          ) : <p>No hay pasos registrados para esta etapa.</p>}
        </div>
        <div className="stack proceso-grupo">
          <h3>Quiénes intervienen</h3>
          {etapa.responsableIds.length > 0 ? (
            <ul className="proceso-responsables">
              {etapa.responsableIds.map((id) => <li key={id}><ResponsibleBadge responsableId={id} /></li>)}
            </ul>
          ) : <p>No hay responsables registrados para esta etapa.</p>}
        </div>
        <div><Link to={`/documentos?etapa=${etapa.id}`} className="btn">Ver documentos de esta etapa</Link></div>
      </div>
    </section>
  );
}
