import AlertModel, { AlertLevel } from "../models/alert.model";

export const alertsData: AlertModel[] = [
  new AlertModel(
    "A1",
    "Alta temperatura en Lote L001",
    "Temperatura superior a 40°C en el galpón del lote L001. Revisar sistema de ventilación.",
    AlertLevel.CRITICAL,
    false,
    new Date("2024-06-10T09:12:00Z"),
    "L001",
    undefined
  ),
  new AlertModel(
    "A2",
    "Brote de parásitos en pollos B2",
    "Se detectaron parásitos en varios pollos del lote B2, iniciar desparasitación.",
    AlertLevel.WARNING,
    false,
    new Date("2024-07-01T08:00:00Z"),
    "B2",
    undefined
  ),
  new AlertModel(
    "A3",
    "Vacunación completada en C3",
    "Vacunación programada completada en lote C3.",
    AlertLevel.INFO,
    true,
    new Date("2024-07-10T12:00:00Z"),
    "C3",
    undefined,
    new Date("2024-07-10T14:30:00Z")
  ),
];