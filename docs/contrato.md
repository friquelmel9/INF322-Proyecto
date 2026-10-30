# Contrato definitivo de datos y rutas — MVP React

**Proyecto:** Ruta de Titulación — Diseño de Interfaces Usuarias, INF322 2026-2  
**Versión acordada:** 1.0  
**Alcance:** H1 (estado del proceso), H2 (próxima acción y responsables) y H5 (documentos vigentes).  
**Uso:** especificación compartida para los seis módulos A–F; se debe respetar antes de desarrollar en paralelo.

> **Procedencia.** Las tres metas, el flujo TT1–TT2 y la necesidad de aclarar responsables y vigencia documental provienen del informe de la Entrega 2. La secuencia de ocho etapas y el caso ilustrativo de Camila Fuentealba se toman del prototipo HTML anterior. La estructura de objetos, nombres de campos, rutas y reglas de integración de este archivo son **decisiones de implementación propuestas para el MVP**, no requisitos textuales del profesor. Los nombres, fechas, versiones y estados del escenario de prueba son **datos simulados**, no información oficial actualizada de la UTFSM.

## 1. Decisiones cerradas

| Tema | Acuerdo |
|---|---|
| Framework | React, componentes `.jsx`, datos JavaScript `.js`. |
| Navegación | `react-router-dom` con `BrowserRouter` y rutas definidas abajo. |
| Persona probada | **Un memorista de TT2**: Camila Fuentealba, personaje del prototipo. |
| Etapa activa | Etapa **5**, Trabajo de Título 2. |
| Funciones comprometidas | H1, H2 y H5, con navegación real entre ellas. |
| Backend | No se implementa. Los datos se importan desde `src/data/`. |
| Estado de prueba | Escenario único y coherente: memorista con una acción propia pendiente y otra en espera de un tercero. |
| Documento | «Abrir» dirige a una **página funcional de detalle**, no simula abrir un PDF inexistente. |
| Acciones | «Ver instrucciones» despliega pasos; no se simulan envíos institucionales. |
| Fuera de alcance | Inicio de sesión, roles profesor/coordinación, calendario, notificaciones, subida real de archivos y API. |
| Idioma del contenido | Español. |

## 2. Rutas definitivas

| Ruta | Componente | Módulo | Descripción |
|---|---|---|---|
| `/` | Redirección | A | Redirige a `/proceso`. |
| `/proceso` | `ProcesoPage.jsx` | C | Perfil del memorista, etapa actual, ocho etapas y detalle de cada etapa. |
| `/pendientes` | `PendientesPage.jsx` | D | Próxima acción, instrucciones, responsable actual y siguiente responsable. |
| `/documentos` | `DocumentosPage.jsx` | E | Listado y buscador; distingue documentos vigentes y no vigentes. |
| `/documentos?etapa=5` | `DocumentosPage.jsx` | E | Misma página, filtrada por la etapa indicada (`1` a `8`). Es **un parámetro de consulta**, no otra ruta React. |
| `/documentos/:id` | `DocumentoDetallePage.jsx` | E | Ficha del documento, su vigencia y enlace a la versión que lo reemplazó, si existe. |
| `*` | `NotFoundPage.jsx` | A | Muestra ruta desconocida y un enlace para volver a `/proceso`. |

**Nombres visibles del menú lateral:** `Mi proceso`, `Próximos pasos`, `Documentos`.  
**Regla de navegación:** utilizar `Link`, `NavLink` o `useNavigate` de React Router en lugar de cambiar vistas manualmente con `innerHTML` o `window.location`.

### `src/App.jsx` — estructura base

```jsx
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import ProcesoPage from "./pages/ProcesoPage";
import PendientesPage from "./pages/PendientesPage";
import DocumentosPage from "./pages/DocumentosPage";
import DocumentoDetallePage from "./pages/DocumentoDetallePage";
import NotFoundPage from "./pages/NotFoundPage";

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
```

**Regla:** `MainLayout` contiene `Header`, `Sidebar` y `<Outlet />`. `main.jsx` envuelve `<App />` en `<BrowserRouter>`. **Solo el responsable A modifica rutas y layout.**

## 3. Contrato de datos

Los archivos de `src/data/` deben exportar exactamente los nombres mostrados a continuación. **No usar otros nombres de propiedades para representar lo mismo** (por ejemplo, evitar mezclar `stageId`, `etapa`, `step` y `etapaId`).

### 3.1 `src/data/memorista.js`

```js
export const memorista = {
  id: "mem-001",
  nombre: "Camila Fuentealba",
  carrera: "Ingeniería Civil Informática",
  curso: "TT2", // "TT1" | "TT2"
  etapaActualId: 5,
};
```

**Campos obligatorios:** `id: string`, `nombre: string`, `carrera: string`, `curso: "TT1" | "TT2"`, `etapaActualId: number` (entero del 1 al 8).

### 3.2 `src/data/etapas.js`

**Orden y nombres de las ocho etapas (se conservan del prototipo):**

| `id` | `nombre` | Estado calculado con `etapaActualId = 5` |
|---:|---|---|
| 1 | Tema y profesor guía | `completada` |
| 2 | Propuesta de tema | `completada` |
| 3 | Inscripción del tema | `completada` |
| 4 | Trabajo de Título 1 | `completada` |
| 5 | Trabajo de Título 2 | `actual` |
| 6 | Entrega del escrito | `pendiente` |
| 7 | Solicitud de examen | `pendiente` |
| 8 | Examen de título | `pendiente` |

```js
export const etapas = [
  {
    id: 1,
    nombre: "Tema y profesor guía",
    descripcion: "Se define el tema y se acuerda quién guiará la memoria.",
    pasos: ["Revisar temas", "Contactar a un profesor guía", "Acordar el tema"],
    responsableIds: ["memorista", "profesor_guia"],
  },
  {
    id: 2,
    nombre: "Propuesta de tema",
    descripcion: "Se redacta la propuesta y se revisa con el profesor guía.",
    pasos: ["Redactar la propuesta", "Solicitar revisión", "Corregir y obtener aprobación"],
    responsableIds: ["memorista", "profesor_guia"],
  },
  {
    id: 3,
    nombre: "Inscripción del tema",
    descripcion: "Se tramita la inscripción formal del tema aprobado.",
    pasos: ["Presentar la propuesta aprobada", "Obtener vistos buenos", "Registrar el tema"],
    responsableIds: ["profesor_guia", "jefatura_carrera", "secretaria"],
  },
  {
    id: 4,
    nombre: "Trabajo de Título 1",
    descripcion: "Se trabaja en la formulación y el avance inicial de la memoria.",
    pasos: ["Desarrollar los capítulos iniciales", "Registrar avances", "Cumplir las entregas del curso"],
    responsableIds: ["memorista", "profesor_guia"],
  },
  {
    id: 5,
    nombre: "Trabajo de Título 2",
    descripcion: "Desarrollo, validación, redacción y revisión del trabajo de memoria.",
    pasos: [
      "Desarrollar y validar la solución",
      "Entregar capítulos para revisión",
      "Corregir las observaciones de la profesora guía",
    ],
    responsableIds: ["memorista", "profesor_guia"],
  },
  {
    id: 6,
    nombre: "Entrega del escrito",
    descripcion: "Se entrega el documento completo para su revisión final.",
    pasos: ["Completar el escrito", "Enviar a guía y correferente", "Incorporar observaciones"],
    responsableIds: ["memorista", "profesor_guia"],
  },
  {
    id: 7,
    nombre: "Solicitud de examen",
    descripcion: "Se prepara la solicitud de fecha y se coordinan sus participantes.",
    pasos: ["Verificar requisitos", "Proponer fechas", "Esperar confirmación"],
    responsableIds: ["memorista", "profesor_guia", "secretaria"],
  },
  {
    id: 8,
    nombre: "Examen de título",
    descripcion: "Se presenta y defiende el trabajo ante la comisión.",
    pasos: ["Preparar la presentación", "Rendir el examen", "Completar trámites finales"],
    responsableIds: ["memorista", "secretaria"],
  },
];

export function obtenerEstadoEtapa(etapaId, etapaActualId) {
  if (etapaId < etapaActualId) return "completada";
  if (etapaId === etapaActualId) return "actual";
  return "pendiente";
}
```

**Campos obligatorios por etapa:** `id: number`, `nombre: string`, `descripcion: string`, `pasos: string[]`, `responsableIds: string[]`.

**Decisión importante:** el estado **no se guarda duplicado** en cada etapa. Se calcula mediante `obtenerEstadoEtapa(etapa.id, memorista.etapaActualId)` para evitar contradicciones al cambiar la etapa de prueba. Los únicos valores posibles son `completada`, `actual` y `pendiente`.

### 3.3 `src/data/acciones.js`

```js
export const responsables = {
  memorista: "Memorista",
  profesor_guia: "Profesor/a guía",
  jefatura_carrera: "Jefatura de Carrera",
  secretaria: "Secretaría",
};

export const acciones = [
  {
    id: "accion-corregir-cap4",
    etapaId: 5,
    titulo: "Corregir el capítulo 4",
    descripcion: "Incorporar las observaciones recibidas en la revisión del capítulo 4.",
    estado: "pendiente",
    prioridad: 1,
    responsableActualId: "memorista",
    siguienteResponsableId: "profesor_guia",
    instrucciones: [
      "Revisar las observaciones de la profesora guía",
      "Corregir el capítulo 4",
      "Preparar una nueva versión para revisión",
    ],
    fechaReferencia: "2026-08-28",
  },
  {
    id: "accion-revision-propuesta",
    etapaId: 5,
    titulo: "Esperar revisión de cambio de propuesta",
    descripcion: "La solicitud se encuentra pendiente de revisión por Jefatura de Carrera.",
    estado: "en_espera",
    prioridad: 2,
    responsableActualId: "jefatura_carrera",
    siguienteResponsableId: "memorista",
    instrucciones: ["Esperar la resolución de Jefatura de Carrera"],
    fechaReferencia: "2026-08-20",
  },
];
```

**Campos obligatorios por acción:**

| Campo | Tipo / valores |
|---|---|
| `id` | `string`, identificador único y estable. |
| `etapaId` | `number`, referencia a una etapa existente. |
| `titulo` | `string`. |
| `descripcion` | `string`. |
| `estado` | `"pendiente" \| "en_espera" \| "completada"`. |
| `prioridad` | `number`; **1 es la más alta**. |
| `responsableActualId` | `string`; clave de `responsables`. |
| `siguienteResponsableId` | `string \| null`; clave de `responsables`, o `null` si no aplica. |
| `instrucciones` | `string[]`, los pasos que muestra «Ver instrucciones». |
| `fechaReferencia` | `string` en formato `AAAA-MM-DD`; fecha del escenario simulado. |

**Reglas:** `/pendientes` muestra las acciones con `etapaId === memorista.etapaActualId`; presenta primero la de menor `prioridad` numérica. Si `responsableActualId === "memorista"`, mostrar «Te toca a ti»; en caso contrario, mostrar «Esperando a: [responsable]». **No calcular «hace X días» desde la fecha real**, porque este escenario está fijado en 2026 para el test.

### 3.4 `src/data/documentos.js`

```js
export const documentos = [
  {
    id: "reglamento-2026",
    nombre: "Reglamento de Titulación INF",
    nombreArchivo: "Reglamento_Titulacion_INF_v2026.pdf",
    version: "2026",
    vigenciaDesde: "2026-08-12",
    estado: "vigente",
    etapaIds: [1, 2, 3, 4, 5, 6, 7, 8],
    reemplazadoPorId: null,
    descripcion: "Ficha de demostración del reglamento de titulación.",
  },
  {
    id: "reglamento-2019",
    nombre: "Reglamento de Titulación INF (versión anterior)",
    nombreArchivo: "Reglamento_Titulacion_INF_2019.pdf",
    version: "2019",
    vigenciaDesde: "2019-01-01",
    estado: "no_vigente",
    etapaIds: [1, 2, 3, 4, 5, 6, 7, 8],
    reemplazadoPorId: "reglamento-2026",
    descripcion: "Versión histórica conservada para contrastar la vigencia.",
  },
  {
    id: "plantilla-memoria-2026",
    nombre: "Plantilla de memoria",
    nombreArchivo: "Plantilla_Memoria_2026.docx",
    version: "2026",
    vigenciaDesde: "2026-03-04",
    estado: "vigente",
    etapaIds: [4, 5, 6],
    reemplazadoPorId: null,
    descripcion: "Plantilla de demostración asociada a la redacción de memoria.",
  },
];
```

**Campos obligatorios por documento:**

| Campo | Tipo / valores |
|---|---|
| `id` | `string`, identificador único que se usa en `/documentos/:id`. |
| `nombre` | `string`. |
| `nombreArchivo` | `string`, identificador visible, **no** promesa de descarga. |
| `version` | `string`. |
| `vigenciaDesde` | `string` con formato `AAAA-MM-DD`. |
| `estado` | `"vigente" \| "no_vigente"`. |
| `etapaIds` | `number[]`, etapas relacionadas. |
| `reemplazadoPorId` | `string \| null`, referencia a otro documento existente. |
| `descripcion` | `string`, texto mostrado en la ficha funcional. |

**Reglas:** el listado «Vigentes» filtra `estado === "vigente"`; «No vigentes», `estado === "no_vigente"`. El botón «Ver versión vigente» de un documento antiguo navega a `/documentos/${reemplazadoPorId}`. No usar enlaces ficticios a PDFs. Los nombres y fechas de esta maqueta **no acreditan la vigencia oficial real**.

## 4. Contratos de componentes compartidos

| Componente | Props definitivas | Comportamiento |
|---|---|---|
| `StatusBadge` | `tipo`, `valor` | `tipo`: `"etapa"`, `"accion"` o `"documento"`; `valor`: cualquiera de los estados admitidos en ese tipo. Renderiza etiqueta y estilo coherente. |
| `ResponsibleBadge` | `responsableId` | Recibe clave de `responsables` y presenta el nombre legible. |
| `ProcessTimeline` | `etapas`, `etapaActualId` | Visualiza ocho etapas y utiliza `obtenerEstadoEtapa`. |
| `ProcessStage` | `etapa`, `estado`, `onSelect` | Elemento de la línea de tiempo, accesible con teclado y seleccionable. |
| `StageDetail` | `etapa` | Presenta descripción, pasos, responsables y vínculo a `/documentos?etapa=<id>`. |
| `NextActionCard` | `accion` | Presenta título, estado, prioridad y responsables. |
| `ResponsibilityFlow` | `responsableActualId`, `siguienteResponsableId` | Explica quién actúa ahora y después. |
| `ActionInstructions` | `instrucciones` | Lista expandible de pasos. |
| `DocumentList` | `documentos` | Listado de documentos filtrados. |
| `DocumentCard` | `documento` | Muestra vigencia, versión y navega a `/documentos/:id`. |
| `DocumentSearch` | `value`, `onChange` | Búsqueda local por `nombre` o `nombreArchivo`. |

**Ejemplos de uso:**

```jsx
<StatusBadge tipo="etapa" valor="actual" />
<StatusBadge tipo="documento" valor="no_vigente" />
<ResponsibleBadge responsableId="profesor_guia" />
<ProcessTimeline etapas={etapas} etapaActualId={memorista.etapaActualId} />
<ActionInstructions instrucciones={accion.instrucciones} />
```

## 5. Importaciones y propiedad de los archivos

```text
src/
├── main.jsx                         # A: BrowserRouter
├── App.jsx                          # A: rutas
├── components/
│   ├── layout/                      # A: layout y navegación
│   │   ├── MainLayout.jsx
│   │   ├── Header.jsx
│   │   └── Sidebar.jsx
│   ├── shared/                      # B: componentes de estado; F: modal/feedback
│   │   ├── StatusBadge.jsx
│   │   ├── ResponsibleBadge.jsx
│   │   ├── Modal.jsx
│   │   └── FeedbackMessage.jsx
│   ├── proceso/                     # C: H1
│   ├── pendientes/                  # D: H2
│   └── documentos/                  # E: H5
├── data/                            # B: única fuente de datos
│   ├── memorista.js
│   ├── etapas.js
│   ├── acciones.js
│   └── documentos.js
├── pages/
│   ├── ProcesoPage.jsx              # C
│   ├── PendientesPage.jsx           # D
│   ├── DocumentosPage.jsx           # E
│   ├── DocumentoDetallePage.jsx     # E
│   └── NotFoundPage.jsx             # A
└── styles/
    ├── global.css                   # A
    ├── layout.css                   # A
    ├── responsive.css               # F
    └── accessibility.css            # F
```

| Módulo | Puede editar | Debe evitar editar |
|---|---|---|
| A | `App.jsx`, `main.jsx`, `components/layout/`, `NotFoundPage.jsx`, estilos base. | `src/data/` y páginas de C/D/E. |
| B | `src/data/`, `StatusBadge.jsx`, `ResponsibleBadge.jsx`. | `App.jsx` y páginas. |
| C | `ProcesoPage.jsx`, `components/proceso/`. | `App.jsx`, datos y componentes D/E. |
| D | `PendientesPage.jsx`, `components/pendientes/`. | `App.jsx`, datos y componentes C/E. |
| E | `DocumentosPage.jsx`, `DocumentoDetallePage.jsx`, `components/documentos/`. | `App.jsx`, datos y componentes C/D. |
| F | `Modal.jsx`, `FeedbackMessage.jsx`, `responsive.css`, `accessibility.css`, `README.md` e informe. | `App.jsx` y `src/data/` sin acuerdo previo. |

**Dependencia única antes de integrar:** A publica estructura y rutas; B publica exports y componentes compartidos. C/D/E trabajan sobre contratos y mocks idénticos desde ese momento. Si se necesita cambiar un campo, se acuerda con todos y se hace **un único commit de B** antes de modificar sus consumidores.

## 6. Flujos obligatorios de aceptación

| ID | Desde | Secuencia funcional | Resultado verificable |
|---|---|---|---|
| H1 | `/proceso` | Ver etapa 5 → distinguir 1–4 completadas y 6–8 pendientes → seleccionar una etapa. | El detalle indica qué implica y quién interviene. |
| H2 | `/pendientes` | Identificar «Corregir el capítulo 4» → ver «Te toca a ti» → desplegar instrucciones → leer «Después interviene: Profesor/a guía». | La siguiente acción y la transición de responsabilidad son inequívocas. |
| H5 | `/documentos` | Buscar «Reglamento» → abrir ficha de versión anterior → seleccionar «Ver versión vigente». | Se abre `/documentos/reglamento-2026` y se ve identificada como vigente **en el escenario de demostración**. |
| Enlace cruzado | `/proceso` | Abrir detalle de etapa 5 → seleccionar «Ver documentos de esta etapa». | Se abre `/documentos?etapa=5` y solo aparecen documentos relacionados. |

## 7. Definición de terminado

1. Se puede acceder directamente a todas las rutas, incluyendo el detalle de un documento válido.
2. Un identificador de documento inexistente presenta un mensaje comprensible y enlace de regreso.
3. Los tres flujos H1, H2 y H5 funcionan íntegramente con los mismos datos compartidos.
4. Todo control con apariencia interactiva tiene una acción real en el frontend; no existen botones que aparentan haber enviado, descargado o aprobado algo sin hacerlo.
5. La interfaz indica cuándo la información es parte de un **escenario de demostración**.
6. El proyecto se ejecuta sin backend, desde la instalación de dependencias indicada en el `README.md`.
7. Los seis integrantes pueden aportar commits propios al repositorio público.
8. El informe describe las tres metas y presenta screenshots de sus flujos.

**Conclusión del acuerdo:** no añadir campos, estados o rutas distintas sin coordinación. Esta especificación define la interfaz compartida entre módulos, no un compromiso de implementar funciones adicionales.