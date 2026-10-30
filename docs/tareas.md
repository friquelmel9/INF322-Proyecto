## Módulo A — Configuración y estructura de React

| ID | Tarea | Criterio de finalización |
|---|---|---|
| A01 | Inicializar el proyecto React. | El proyecto inicia correctamente mediante `npm run dev`. |
| A02 | Migrar los estilos globales del HTML anterior. | Se conservan colores, tipografías y estilos base. |
| A03 | Implementar el layout principal. | Existen encabezado, menú lateral y contenedor de contenido. |
| A04 | Configurar la navegación con React Router. | Se puede navegar entre Mi proceso, Próximos pasos y Documentos. |

**Archivos principales:**

```text
src/
├── App.jsx
├── main.jsx
├── components/
│   └── layout/
│       ├── Header.jsx
│       └── Sidebar.jsx
└── styles/
    ├── global.css
    └── layout.css
```

Este módulo debería integrarse primero porque proporciona la estructura que utilizarán los demás.

## Módulo B — Datos y componentes compartidos

Como no se requiere backend, utilizaremos datos de prueba definidos en archivos JavaScript.

| ID | Tarea | Criterio de finalización |
|---|---|---|
| B01 | Crear los datos del memorista de prueba. | Existe un perfil consistente con nombre, carrera, curso y etapa actual. |
| B02 | Definir las ocho etapas de titulación. | Cada etapa tiene identificador, nombre, descripción y estado. |
| B03 | Definir los datos de las acciones pendientes. | Cada acción incluye descripción, responsable y siguiente responsable. |
| B04 | Definir los documentos del sistema. | Cada documento tiene nombre, versión, vigencia y etapa asociada. |
| B05 | Crear componentes reutilizables para mostrar estados y responsables. | Los demás módulos pueden importar las etiquetas de estado y responsable. |

**Archivos principales:**

```text
src/
├── data/
│   ├── memorista.js
│   ├── etapas.js
│   ├── acciones.js
│   └── documentos.js
└── components/
    └── shared/
        ├── StatusBadge.jsx
        └── ResponsibleBadge.jsx
```

El prototipo HTML anterior ya contiene datos para las ocho etapas, distintos escenarios y un listado de documentos. Podemos reutilizar esa estructura en lugar de inventar todo desde cero.

Eso sí, los documentos y fechas que no estén verificados deben identificarse como datos de demostración, no como información oficial.

---

## Módulo C — H1: Visualización del proceso de titulación

| ID | Tarea | Criterio de finalización |
|---|---|---|
| C01 | Crear la página principal «Mi proceso». | Muestra el perfil del memorista y la información general de su titulación. |
| C02 | Implementar el componente de línea de tiempo. | Se visualizan las ocho etapas del proceso. |
| C03 | Diferenciar visualmente las etapas. | Se distinguen claramente las completadas, la actual y las pendientes. |
| C04 | Implementar el detalle de cada etapa. | Al seleccionar una etapa, se muestran descripción, pasos y responsables. |
| C05 | Agregar acceso contextual a los documentos de cada etapa. | El usuario puede dirigirse a Documentos desde el detalle de una etapa. |

**Archivos principales:**

```text
src/
├── pages/
│   └── ProcesoPage.jsx
└── components/
    └── proceso/
        ├── ProcessTimeline.jsx
        ├── ProcessStage.jsx
        ├── StageDetail.jsx
        └── ProcessSummary.jsx
```

### Resultado esperado

Un usuario de TT2 debe poder entrar a «Mi proceso» e identificar:

- Su etapa actual.
- Las etapas completadas.
- Las etapas restantes.
- Qué implica cada etapa.

---

## Módulo D — H2: Próximas acciones y responsables

**Este es el módulo de mayor prioridad**, debido a los problemas identificados durante el testing.

| ID | Tarea | Criterio de finalización |
|---|---|---|
| D01 | Crear la página «Próximos pasos». | Muestra las acciones asociadas a la etapa actual del memorista. |
| D02 | Implementar una tarjeta de acción prioritaria. | Destaca claramente qué debe hacerse a continuación. |
| D03 | Implementar indicadores de responsabilidad. | Se distingue si debe actuar el estudiante o un tercero. |
| D04 | Mostrar quién interviene después del memorista. | Se identifica explícitamente al siguiente responsable del proceso. |
| D05 | Implementar la interacción «Ver instrucciones». | Al presionar el botón se despliegan los pasos concretos para completar la acción. |

**Archivos principales:**

```text
src/
├── pages/
│   └── PendientesPage.jsx
└── components/
    └── pendientes/
        ├── NextActionCard.jsx
        ├── ResponsibilityFlow.jsx
        ├── PendingActionsList.jsx
        └── ActionInstructions.jsx
```

### Mejora respecto del prototipo anterior

En la Entrega 2 detectamos problemas con textos como:

- «12 días de espera».
- «¿Qué está pasando ahora?».

El informe recomendó aclarar esos mensajes y destacar quién es responsable de avanzar el proceso.

Por ejemplo, el nuevo diseño podría mostrar:

**Estado actual:** Solicitud en revisión.

**Responsable actual:** Jefatura de Carrera.

**¿Qué debes hacer?** No tienes acciones pendientes.

**¿Qué sucede después?** Una vez aprobada la solicitud, podrás continuar con la siguiente etapa.

---

## Módulo E — H5: Documentación y reglamentos

| ID | Tarea | Criterio de finalización |
|---|---|---|
| E01 | Crear la página «Documentos». | Se muestra un listado de documentos organizados. |
| E02 | Diferenciar documentos vigentes y obsoletos. | Las versiones actuales y antiguas tienen indicadores visuales claros. |
| E03 | Implementar la vista de detalle de un documento. | Se muestran nombre, versión, fecha de vigencia y descripción. |
| E04 | Implementar la navegación hacia el documento vigente. | Desde una versión antigua se puede abrir directamente la ficha de la versión actual. |
| E05 | Implementar un filtro de búsqueda. | El usuario puede buscar documentos por nombre. |

**Archivos principales:**

```text
src/
├── pages/
│   ├── DocumentosPage.jsx
│   └── DocumentoDetallePage.jsx
└── components/
    └── documentos/
        ├── DocumentList.jsx
        ├── DocumentCard.jsx
        └── DocumentSearch.jsx
```

---

## Módulo F — Componentes auxiliares, pruebas y entrega

| ID | Tarea | Criterio de finalización |
|---|---|---|
| F01 | Crear un componente reutilizable de ventana modal. | Permite abrir información y cerrarla mediante botones o Escape. |
| F02 | Crear un componente para mensajes de confirmación. | Las acciones del MVP entregan retroalimentación visible cuando corresponde. |
| F03 | Implementar estilos responsivos. | Las tres páginas principales funcionan en escritorio y móvil. |
| F04 | Incorporar mejoras básicas de accesibilidad. | Los controles tienen etiquetas, foco visible y pueden utilizarse con teclado. |
| F05 | Crear un README con instrucciones de ejecución. | Cualquier integrante puede instalar las dependencias e iniciar el proyecto. |
| F06 | Preparar el informe y capturas de los tres flujos. | El informe contiene el repositorio, las tres metas y sus respectivas capturas. |

**Archivos principales:**

```text
src/
├── components/
│   └── shared/
│       ├── Modal.jsx
│       └── FeedbackMessage.jsx
└── styles/
    ├── responsive.css
    └── accessibility.css

README.md
docs/
└── informe-mvp.md
```

---

Revisar contrato.md