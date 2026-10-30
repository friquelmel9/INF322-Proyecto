/*
 * acciones.js — Módulo B
 * Acciones pendientes y diccionario de responsables legibles.
 *
 * Contrato: docs/contrato.md §3.3
 * Tarea: B03 (docs/tareas.md)
 */

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
