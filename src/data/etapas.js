/*
 * etapas.js — Módulo B
 * Secuencia ordenada de las ocho etapas de titulación y función de cálculo de estado.
 *
 * Contrato: docs/contrato.md §3.2
 * Tarea: B02 (docs/tareas.md)
 */

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

/**
 * Calcula el estado de una etapa con base en la etapa activa del memorista.
 *
 * @param {number} etapaId - Identificador de la etapa (1 a 8).
 * @param {number} etapaActualId - Identificador de la etapa actual del estudiante.
 * @returns {"completada" | "actual" | "pendiente"}
 */
export function obtenerEstadoEtapa(etapaId, etapaActualId) {
  if (etapaId < etapaActualId) return "completada";
  if (etapaId === etapaActualId) return "actual";
  return "pendiente";
}
