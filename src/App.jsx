/*
 * App.jsx — Módulo A
 * Definición de rutas EXACTA del contrato (docs/contrato.md §2).
 *
 * Propiedad: SOLO el Módulo A modifica rutas y layout. Si algún módulo
 * necesita una ruta nueva, se acuerda con el grupo (contrato §5).
 *
 * Las páginas de C/D/E se importan aquí pero sus archivos son, por ahora,
 * placeholders creados por A para que la app compile. Cada módulo
 * reemplaza el contenido de SU página sin tocar este archivo.
 */
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout.jsx";
import ProcesoPage from "./pages/ProcesoPage.jsx"; // Módulo C
import PendientesPage from "./pages/PendientesPage.jsx"; // Módulo D
import DocumentosPage from "./pages/DocumentosPage.jsx"; // Módulo E
import DocumentoDetallePage from "./pages/DocumentoDetallePage.jsx"; // Módulo E
import NotFoundPage from "./pages/NotFoundPage.jsx"; // Módulo A

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Navigate to="/proceso" replace />} />
        <Route path="proceso" element={<ProcesoPage />} />
        <Route path="pendientes" element={<PendientesPage />} />
        <Route path="documentos" element={<DocumentosPage />} />
        <Route path="documentos/:id" element={<DocumentoDetallePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
