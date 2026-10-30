/*
 * documentos.js — Módulo B
 * Listado de documentos simulados para contrastar vigencia y etapas asociadas.
 *
 * Contrato: docs/contrato.md §3.4
 * Tarea: B04 (docs/tareas.md)
 */

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
