# Módulo A — Configuración y estructura (guía de integración)

> Responsable: **Sebastián Durán (`sduranv`)**.
> Este documento explica **cómo conectar tu módulo** sobre el esqueleto que dejó el Módulo A, sin romper lo de los demás. Léelo antes de empezar tu parte. El contrato completo está en [`contrato.md`](./contrato.md) y el desglose de tareas en [`tareas.md`](./tareas.md).

## 1. Qué entrega el Módulo A

- Proyecto **React + Vite** que arranca con `npm run dev` (criterio A01).
- **Navegación con React Router** entre las tres páginas (criterio A04), rutas exactas del contrato §2.
- **Layout**: barra superior, menú lateral y contenedor de contenido (criterio A03).
- **Estilos base** migrados del prototipo de la Entrega 2: tokens, tema claro/oscuro y tipografías (criterio A02).
- **Placeholders** de las páginas de C/D/E para que la app compile de punta a punta.

El Módulo A **no** implementa datos, páginas de contenido ni componentes de H1/H2/H5: eso es de B/C/D/E/F.

## 2. Cómo ejecutar

```bash
npm install
npm run dev
```

Abre la URL que imprime Vite (por defecto `http://localhost:5173`). La ruta `/` redirige a `/proceso`.

## 3. Mapa de archivos: definitivos vs. placeholders

| Archivo | Estado | Dueño | Qué hacer |
|---|---|---|---|
| `src/main.jsx` | **Definitivo** | A | No tocar. |
| `src/App.jsx` | **Definitivo** | A | No tocar (rutas). Ruta nueva ⇒ coordinar con el grupo. |
| `src/components/layout/*` | **Definitivo** | A | No tocar. |
| `src/pages/NotFoundPage.jsx` | **Definitivo** | A | No tocar. |
| `src/styles/global.css` | **Definitivo** | A | No tocar (tokens/base). |
| `src/styles/layout.css` | **Definitivo** | A | No tocar (estructura). |
| `src/pages/ProcesoPage.jsx` | ⚠️ Placeholder | **C** | Reemplazar TODO el archivo. |
| `src/pages/PendientesPage.jsx` | ⚠️ Placeholder | **D** | Reemplazar TODO el archivo. |
| `src/pages/DocumentosPage.jsx` | ⚠️ Placeholder | **E** | Reemplazar TODO el archivo. |
| `src/pages/DocumentoDetallePage.jsx` | ⚠️ Placeholder | **E** | Reemplazar TODO el archivo. |

Cada placeholder lleva un comentario de cabecera indicando a quién pertenece.

## 4. Punto de enganche de cada módulo

- **B (datos + badges):** crea `src/data/memorista.js`, `etapas.js`, `acciones.js`, `documentos.js` y los componentes `src/components/shared/StatusBadge.jsx` y `ResponsibleBadge.jsx` con los nombres de campo EXACTOS del contrato §3 y §4. A no toca `src/data/`.
- **C (H1):** reemplaza `ProcesoPage.jsx` y crea `src/components/proceso/` (`ProcessTimeline`, `ProcessStage`, `StageDetail`, `ProcessSummary`).
- **D (H2):** reemplaza `PendientesPage.jsx` y crea `src/components/pendientes/` (`NextActionCard`, `ResponsibilityFlow`, `PendingActionsList`, `ActionInstructions`).
- **E (H5):** reemplaza `DocumentosPage.jsx` + `DocumentoDetallePage.jsx` y crea `src/components/documentos/` (`DocumentList`, `DocumentCard`, `DocumentSearch`).
- **F (auxiliares/entrega):** crea `src/components/shared/Modal.jsx` y `FeedbackMessage.jsx`, `src/styles/responsive.css` y `accessibility.css`, el `README.md` de ejecución y el informe.

## 5. Reglas para no chocar entre ramas

1. **Una rama por módulo** (`modulo-a`, `modulo-b`, …). Ramifica desde la rama donde ya esté integrado A (ver abajo), no desde cero.
2. **Edita solo los archivos de tu módulo.** La tabla de propiedad del contrato §5 es la fuente de verdad.
3. **Solo A modifica `App.jsx`, `main.jsx` y `components/layout/`.** ¿Necesitas una ruta nueva? Se acuerda con el grupo y lo cambia A en un único commit.
4. **Un único commit de B** para fijar los `src/data/*`. Si hay que cambiar un campo del contrato, se acuerda con todos antes.
5. Cada integrante hace **sus propios commits** (requisito de la entrega: commits de todos).

## 6. Orden de integración recomendado

1. **A** (este módulo) → esqueleto, rutas y estilos.
2. **B** → datos y badges compartidos.
3. **C / D / E** en paralelo → cada uno reemplaza su página.
4. **F** → modal/feedback, responsive, accesibilidad, README e informe.

A y B son la base: conviene que entren primero a la rama de integración para que C/D/E trabajen sobre el mismo esqueleto y mocks, y no se reconstruya nada.

## 7. Estilos disponibles para reutilizar

`global.css` ya trae tokens y primitivas base que puedes usar en tu módulo sin crear CSS nuevo: `.card`/`.card-h`/`.card-b`, `.btn` (`.primary`, `.ghost`, `.sm`), `.note` (`.warn`, `.bad`), `.pagehead`, `.eyebrow`, `.grid`, `.stack`, `.mono`, `.serif`. Las etiquetas visuales de estado y responsable salen de los componentes de B (`StatusBadge`, `ResponsibleBadge`), no de clases sueltas.

---

**Nota sobre los datos:** todo el escenario (Camila Fuentealba, fechas, documentos) es de **demostración**, no información oficial de la UTFSM. Mantener esa aclaración visible en la interfaz es parte de la definición de terminado (contrato §7.5).
