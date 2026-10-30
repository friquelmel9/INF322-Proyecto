import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Configuración base de Vite para el MVP. Módulo A.
export default defineConfig({
  plugins: [react()],
});
