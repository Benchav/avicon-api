import ReportModel, { ReportType, ReportStatus } from "../../Domain.Endpoint/models/report.model";

export const reportesData: ReportModel[] = [
  new ReportModel(
    "R1",
    "Baja producción en Lote L001",
    "Producción de huevos 20% por debajo del promedio esperado durante la última semana.",
    ReportType.PRODUCCION,
    ReportStatus.PENDIENTE,
    new Date("2024-08-01T09:00:00Z"),
    "L001",
    "sistema",
  ),
  new ReportModel(
    "R2",
    "Casos de enfermedad en Lote B2",
    "Se han identificado síntomas compatibles con infección respiratoria en varios animales.",
    ReportType.SALUD,
    ReportStatus.EN_PROCESO,
    new Date("2024-08-05T11:30:00Z"),
    "B2",
    "veterinario",
  ),
  new ReportModel(
    "R3",
    "Mantenimiento ventilación galpón C3",
    "Revisión del sistema de ventilación tras aumento de temperatura.",
    ReportType.OPERACIONAL,
    ReportStatus.COMPLETADO,
    new Date("2024-07-20T08:00:00Z"),
    "C3",
    "mecanico",
    new Date("2024-07-20T12:00:00Z")
  ),
];