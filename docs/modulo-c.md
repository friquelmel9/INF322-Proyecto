# Módulo C — Visualización del proceso de titulación

Implementa C01–C05 de `tareas.md` en `/proceso`, utilizando los datos de B y las rutas existentes de A.

| Criterio | Implementación |
|---|---|
| C01 | `ProcesoPage` y `ProcessSummary`: perfil, curso, etapa actual y conteo de etapas completadas, en curso y pendientes. |
| C02 | `ProcessTimeline`: lista ordenada de las ocho etapas. |
| C03 | `ProcessStage`: número, texto de estado mediante `StatusBadge` y colores del tema compartido. El estado se calcula con `obtenerEstadoEtapa`. |
| C04 | `StageDetail`: descripción, pasos y responsables mediante `ResponsibleBadge`. |
| C05 | Enlace de React Router a `/documentos?etapa=<id>` desde el detalle seleccionado. |

## Integración

La página importa `components/proceso/proceso.css`. No requiere cambios en rutas, layout, datos o dependencias. Todos los componentes tienen exportación por defecto.

- `ProcessSummary({ memorista, etapas })` recibe el perfil y las etapas; cuenta únicamente etapas completadas para la barra de avance.
- `ProcessTimeline({ etapas, etapaActualId })` administra la selección local e inicia en la etapa actual.
- `ProcessStage({ etapa, estado, onSelect, seleccionada, detalleId })` recibe la selección y el identificador del detalle como props adicionales de C. Invoca `onSelect(etapa)` al activarse.
- `StageDetail({ etapa })` presenta los datos de la etapa recibida.

Consultar una etapa no modifica el progreso del memorista. Al salir y volver a la página, la selección comienza nuevamente en la etapa actual. Los botones se activan con clic, Enter o Espacio y exponen la selección mediante `aria-pressed`; `aria-current="step"` identifica la etapa real en curso. Los cambios del detalle se anuncian mediante una región `aria-live`.

Las etapas se distribuyen en cuatro columnas en escritorio amplio, dos en anchos intermedios y una en móvil. Los estilos utilizan variables del tema existente y clases con prefijo `proceso-`.

## Comprobación manual del flujo H1

1. Abrir `/proceso`: comprobar el perfil de Camila Fuentealba, TT2 y etapa 5.
2. Verificar cuatro etapas completadas, una en curso y tres pendientes; el avance muestra 4 de 8 completadas.
3. Seleccionar etapas completadas y pendientes: comprobar descripción, pasos y responsables sin cambiar la etapa actual.
4. Repetir la selección usando Tab y Enter o Espacio; comprobar el foco visible.
5. Desde la etapa 5, abrir «Ver documentos de esta etapa»: comprobar `/documentos?etapa=5` y su filtro. Repetir con otra etapa.
6. Revisar la disposición en móvil y en los temas claro y oscuro.

Los datos son de demostración, tal como se indica en la página.
