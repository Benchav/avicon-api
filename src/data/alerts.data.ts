import AlertModel, { AlertLevel } from "../models/alert.model";

export const alertsData: AlertModel[] = [
  new AlertModel(
    "A1",
    "Alta temperatura en Lote L001",
    "Temperatura superior a 40°C...",
    AlertLevel.CRITICAL,
    false,
    new Date("2024-06-10T09:12:00Z"),
    "L001"
  ),
  new AlertModel(
    "A2",
    "Brote de parásitos en pollos B2",
    "Se detectaron parásitos...",
    AlertLevel.WARNING,
    false,
    new Date("2024-07-01T08:00:00Z"),
    "B2"
  ),
];