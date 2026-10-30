/*
 * main.jsx — Módulo A
 * Punto de entrada. Envuelve <App/> en <BrowserRouter> (contrato §2)
 * e importa las hojas de estilo de la aplicación.
 *
 * El orden de carga importa: accessibility.css define el aspecto base del
 * modal y responsive.css lo ajusta bajo 767px (lo ancla abajo). Como ambos
 * usan la misma especificidad y las media queries no la aumentan, gana el
 * que se carga último, así que responsive.css va al final.
 *
 * Propiedad: solo el Módulo A edita este archivo.
 */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

import "./styles/global.css";
import "./styles/layout.css";
import "./styles/accessibility.css";
import "./styles/responsive.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
