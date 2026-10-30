/*
 * main.jsx — Módulo A
 * Punto de entrada. Envuelve <App/> en <BrowserRouter> (contrato §2)
 * e importa los estilos base globales.
 *
 * Propiedad: solo el Módulo A edita este archivo.
 */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

import "./styles/global.css";
import "./styles/layout.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
