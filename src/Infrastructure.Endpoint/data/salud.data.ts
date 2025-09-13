import SaludModel, { HealthStatus } from "../../Domain.Endpoint/models/salud.model";

export const saludData: SaludModel[] = [
  new SaludModel(
    "1",
    "L001",
    "Gripe aviar",
    "Antibióticos",
    HealthStatus.ENFERMO,
    new Date("2024-01-10"),
    "Se detectaron síntomas leves"
  ),
  new SaludModel(
    "2",
    "L002",
    "Ninguna",
    "Ninguno",
    HealthStatus.SANO,
    new Date("2024-02-15"),
    "Ave en perfecto estado"
  ),
  new SaludModel(
    "3",
    "L001",
    "Parásitos",
    "Desparasitante",
    HealthStatus.RECUPERACION,
    new Date("2024-03-01"),
    "Respondiendo bien al tratamiento"
  ),
];