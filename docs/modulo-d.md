# Módulo D — Próximas acciones y responsables (guía de integración)

> Responsable: **Módulo D**.
>
> Esta guía describe cómo integrar y comprobar H2 sobre la base de A y B. Los acuerdos compartidos están en [`contrato.md`](./contrato.md) y los criterios D01–D05 en [`tareas.md`](./tareas.md). Los ajustes de presentación documentados aquí son decisiones de implementación de D, no requisitos textuales del profesor.

## 1. Qué entrega el Módulo D

| Criterio | Implementación |
|---|---|
| D01 | Página «Próximos pasos» en `/pendientes`, con las acciones de la etapa actual del memorista. |
| D02 | Tarjeta que destaca la acción de mayor prioridad. |
| D03 | Bloque «Responsable actual», con «Te toca a ti» o «Esperando a: …», según corresponda. |
| D04 | Bloque «Después interviene», que identifica al siguiente responsable cuando existe. |
| D05 | Sección «Cómo continuar», con un botón para mostrar y ocultar instrucciones. |

El escenario acordado corresponde a Camila Fuentealba, TT2, etapa 5. Incluye una acción propia pendiente y otra en espera de Jefatura de Carrera. El encabezado muestra **«Datos de demostración»**, conforme al contrato §7.5.

## 2. Archivos del módulo

```text
src/
├── pages/
│   └── PendientesPage.jsx
└── components/
    └── pendientes/
        ├── NextActionCard.jsx
        ├── PendingActionsList.jsx
        ├── ResponsibilityFlow.jsx
        ├── ActionInstructions.jsx
        └── pendientes.css
```

[`PendientesPage.jsx`](../src/pages/PendientesPage.jsx) reemplaza el placeholder creado por A. Al integrar ramas que todavía incluyan ese placeholder, conservar la implementación de D.

## 3. Dependencias y punto de integración

Se necesita la base de los siguientes módulos:

| Módulo | Elementos utilizados por D |
|---|---|
| A | Ruta `/pendientes`, `MainLayout`, navegación, estilos globales y variables CSS. Ver [`modulo-a.md`](./modulo-a.md). |
| B | Exports con nombre `memorista` y `acciones`; componentes con exportación por defecto `StatusBadge` y `ResponsibleBadge`. Este último utiliza el diccionario `responsables` de B. Ver [`modulo-b.md`](./modulo-b.md). |

La ruta ya está declarada en `App.jsx` y el menú ya contiene «Próximos pasos». Para integrar D basta incorporar sus archivos sobre A y B; se conservan las rutas y el layout existentes.

C y E pueden seguir con sus páginas provisionales mientras se verifica D. El despliegue de instrucciones funciona dentro de la página y no depende del modal ni de los mensajes de confirmación de F. Se utilizan las dependencias existentes del proyecto y datos locales, sin conexión a un backend.

Para ofrecer un acceso desde otra página, utilizar un `Link` de React Router dirigido a `/pendientes`, respetando la navegación acordada en el contrato §2.

## 4. Responsabilidades y props de los componentes

Todos los componentes de D utilizan **exportación por defecto**.

| Componente | Props | Responsabilidad |
|---|---|---|
| [`NextActionCard`](../src/components/pendientes/NextActionCard.jsx) | `accion`: objeto con la estructura del contrato §3.3. | Presenta título, prioridad, estado, descripción, responsables e instrucciones de la acción prioritaria. |
| [`PendingActionsList`](../src/components/pendientes/PendingActionsList.jsx) | `acciones`: arreglo de acciones ya seleccionadas y ordenadas. | Presenta las acciones restantes. Devuelve `null` cuando el arreglo está vacío. |
| [`ResponsibilityFlow`](../src/components/pendientes/ResponsibilityFlow.jsx) | `responsableActualId`: clave de `responsables`; `siguienteResponsableId`: clave o `null`. | Explica quién actúa ahora y después, reutilizando `ResponsibleBadge`. |
| [`ActionInstructions`](../src/components/pendientes/ActionInstructions.jsx) | `instrucciones`: arreglo de textos (`string[]`). | Administra el despliegue de pasos de una acción. |

`PendientesPage` importa los datos de B, filtra por `etapaId === memorista.etapaActualId` y ordena por `prioridad` ascendente: **1 es la prioridad más alta**. La primera acción se pasa a `NextActionCard` y las restantes a `PendingActionsList`, evitando duplicados.

La selección permanece en la página. Los componentes reciben los datos mediante props y respetan el orden recibido. La prop `acciones` de `PendingActionsList` es una interfaz local de D; las demás props coinciden con el contrato §4.

## 5. Comportamiento y casos límite

| Caso | Comportamiento |
|---|---|
| Ninguna acción de la etapa actual | La página muestra «No hay acciones registradas para tu etapa actual», sin tarjetas. |
| Una sola acción | Se muestra la tarjeta prioritaria y se omite la sección de otras acciones. |
| Responsable actual `memorista` | Se identifica al Memorista y se aclara «Te toca a ti: realiza esta acción siguiendo las instrucciones». |
| Responsable actual distinto de `memorista` | Se muestra «Esperando a: …» para esa acción; las demás acciones mantienen sus propios responsables. |
| Siguiente responsable `null` | Se omite el bloque «Después interviene». |
| Instrucciones vacías (`[]`) | Se conserva «Cómo continuar» y aparece un mensaje de ausencia de instrucciones, sin botón. |

Cada instancia de `ActionInstructions` mantiene su propio estado con `useState`. Comienza cerrada y permite abrir o cerrar sus pasos sin afectar a las otras acciones. El estado se reinicia cuando la instancia se desmonta, por ejemplo al salir de la página.

Los campos de las props deben respetar el contrato: los arreglos vacíos se representan con `[]` y la ausencia de siguiente responsable con `null`, no omitiendo la propiedad.

El filtro actual es por etapa, sin un filtro adicional por `estado`. El escenario de B contiene estados `pendiente` y `en_espera`; la interfaz consulta las acciones y sus instrucciones, sin modificar su estado. No se calculan tiempos relativos desde la fecha actual ni se simulan envíos, aprobaciones o cargas de archivos.

## 6. Estilos y coordinación con F

[`pendientes.css`](../src/components/pendientes/pendientes.css) se importa desde `PendientesPage.jsx`. Sus clases tienen el prefijo `pendientes-` y reutilizan las variables de color, bordes y superficies de A para mantener los temas claro y oscuro.

- La acción prioritaria tiene un borde de énfasis y las tarjetas separan estado, descripción, responsabilidades e instrucciones.
- Los bloques de responsables ocupan dos columnas y pasan a una columna para anchos de 640 px o menores.
- Si se utiliza un componente de D fuera de esta página, incluir también su hoja de estilos, además de los estilos globales de A.
- Los botones nativos tienen `type="button"`, `aria-expanded` y `aria-controls`. `useId` genera identificadores distintos para cada lista de instrucciones.
- El atributo `hidden` controla la visibilidad de los pasos. Al ajustar los estilos, conservar ese comportamiento: asignar `display` a la lista puede anular su ocultamiento.
- Los cambios sobre los datos, componentes compartidos y estilos globales se coordinan con sus responsables, según el contrato §5. F puede completar la revisión global de presentación y accesibilidad sobre esta base.