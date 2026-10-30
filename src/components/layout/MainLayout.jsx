/*
 * MainLayout.jsx — Módulo A
 * Marco común de todas las páginas: Header (topbar) + Sidebar + <Outlet/>.
 * Equivale a la estructura .shell del prototipo de la Entrega 2.
 *
 * Propiedad: solo el Módulo A edita el layout.
 */
import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";

export default function MainLayout() {
  return (
    <>
      <Header />
      <div className="shell">
        <Sidebar />
        <main>
          {/* Cada página (Módulos C/D/E) se renderiza aquí vía React Router */}
          <Outlet />
        </main>
      </div>
    </>
  );
}
