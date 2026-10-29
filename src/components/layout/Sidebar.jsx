/*
 * Sidebar.jsx — Módulo A
 * Menú lateral de navegación (.sidenav del prototipo).
 * Los tres destinos y sus nombres visibles son los del contrato §2:
 * «Mi proceso», «Próximos pasos» y «Documentos».
 *
 * Se usa NavLink de React Router: aplica la clase .active al enlace de la
 * ruta vigente (contrato: navegar SOLO con React Router, nunca window.location).
 *
 * Propiedad: solo el Módulo A edita el layout/navegación.
 */
import { NavLink } from "react-router-dom";

const ITEMS = [
  { to: "/proceso", label: "Mi proceso" },
  { to: "/pendientes", label: "Próximos pasos" },
  { to: "/documentos", label: "Documentos" },
];

export default function Sidebar() {
  return (
    <aside className="sidenav" aria-label="Navegación principal">
      <div className="navlabel">Titulación</div>
      <nav>
        {ITEMS.map((item) => (
          <NavLink key={item.to} to={item.to} className="navitem" end={item.to === "/documentos" ? false : true}>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
