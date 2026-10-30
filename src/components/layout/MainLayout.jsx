/*
 * MainLayout.jsx — Módulo A
 * Marco común de todas las páginas: Header (topbar) + Sidebar + <Outlet/>.
 * Equivale a la estructura .shell del prototipo de la Entrega 2.
 *
 * Incluye el enlace «Saltar al contenido», que permite a quien navega con
 * teclado pasar por alto el menú. Se muestra solo al recibir el foco; sus
 * estilos están en styles/accessibility.css.
 *
 * Propiedad: solo el Módulo A edita el layout.
 */
import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";

export default function MainLayout() {
  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <Header />
      <div className="shell">
        <Sidebar />
        <main id="contenido" tabIndex={-1}>
          {/* Cada página (Módulos C/D/E) se renderiza aquí vía React Router */}
          <Outlet />
        </main>
      </div>
    </>
  );
}
