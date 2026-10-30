# Módulo B — Datos y componentes compartidos (guía de integración)

> Responsable: **Módulo B**  
> Este documento explica los datos simulados y los componentes compartidos creados por el Módulo B de acuerdo con el [Contrato definitivo (`docs/contrato.md`)](./contrato.md) y el plan de tareas (`docs/tareas.md`).

---

## 1. Qué entrega el Módulo B

1. **Datos del memorista de prueba (`src/data/memorista.js`)** [Criterio B01]  
   Perfil de Camila Fuentealba (`mem-001`), carrera «Ingeniería Civil Informática», curso `TT2` y etapa activa `5`.
2. **Definición de las ocho etapas (`src/data/etapas.js`)** [Criterio B02]  
   Listado ordenado de las 8 etapas con pasos y responsables, junto con la función `obtenerEstadoEtapa(etapaId, etapaActualId)`.
3. **Acciones pendientes del escenario (`src/data/acciones.js`)** [Criterio B03]  
   Acciones prioritarias asociadas a la etapa 5, con descripción, responsables actual y siguiente, instrucciones y el mapa de nombres legibles `responsables`.
4. **Documentos del sistema (`src/data/documentos.js`)** [Criterio B04]  
   Documentos vigentes y no vigentes con versionado, fechas simuladas y referencias de reemplazo para H5.
5. **Componentes compartidos (`src/components/shared/`)** [Criterio B05]  
   - `StatusBadge.jsx`: renderiza insignias de estado para etapas, acciones y documentos con estilos y tokens coherentes.
   - `ResponsibleBadge.jsx`: renderiza insignias con el nombre legible del responsable a partir de su identificador.

---

## 2. Mapa de archivos creados

```text
src/
├── data/
│   ├── memorista.js           # B01: export const memorista
│   ├── etapas.js              # B02: export const etapas, export function obtenerEstadoEtapa
│   ├── acciones.js            # B03: export const acciones, export const responsables
│   └── documentos.js          # B04: export const documentos
└── components/
    └── shared/
        ├── StatusBadge.jsx      # B05: <StatusBadge tipo="..." valor="..." />
        └── ResponsibleBadge.jsx # B05: <ResponsibleBadge responsableId="..." />
```

---

## 3. Guía de uso para Módulos C, D y E

### Módulo C — «Mi proceso» (`ProcesoPage.jsx` y `components/proceso/`)

```jsx
import { memorista } from "../data/memorista";
import { etapas, obtenerEstadoEtapa } from "../data/etapas";
import StatusBadge from "../components/shared/StatusBadge";
import ResponsibleBadge from "../components/shared/ResponsibleBadge";

// Obtener estado dinámico de cada etapa
const estado = obtenerEstadoEtapa(etapa.id, memorista.etapaActualId); // "completada" | "actual" | "pendiente"

// Mostrar badge de estado
<StatusBadge tipo="etapa" valor={estado} />

// Mostrar badge de responsable
<ResponsibleBadge responsableId="profesor_guia" />
```

### Módulo D — «Próximos pasos» (`PendientesPage.jsx` y `components/pendientes/`)

```jsx
import { memorista } from "../data/memorista";
import { acciones, responsables } from "../data/acciones";
import StatusBadge from "../components/shared/StatusBadge";
import ResponsibleBadge from "../components/shared/ResponsibleBadge";

// Filtrar y ordenar acciones de la etapa actual por prioridad (1 = más alta)
const accionesEtapa = acciones
  .filter((a) => a.etapaId === memorista.etapaActualId)
  .sort((a, b) => a.prioridad - b.prioridad);

// Badges de estado y responsables
<StatusBadge tipo="accion" valor={accion.estado} />
<ResponsibleBadge responsableId={accion.responsableActualId} />
<ResponsibleBadge responsableId={accion.siguienteResponsableId} />
```

### Módulo E — «Documentos» (`DocumentosPage.jsx`, `DocumentoDetallePage.jsx` y `components/documentos/`)

```jsx
import { documentos } from "../data/documentos";
import StatusBadge from "../components/shared/StatusBadge";

// Filtrar documentos vigentes o no vigentes
const vigentes = documentos.filter((d) => d.estado === "vigente");

// Mostrar badge de vigencia
<StatusBadge tipo="documento" valor={documento.estado} />
```

---

## 4. Notas sobre los datos

- Todos los datos representan un **escenario de demostración** para pruebas de interfaz de usuario (Camila Fuentealba, TT2, agosto de 2026), no información institucional vigente de la UTFSM.
- El contrato de campos establecido en `docs/contrato.md` se cumple estrictamente sin campos alternativos.
