import LoteModel, { LoteStatus } from "../../Domain.Endpoint/models/lote.model";

export const lotesData: LoteModel[] = [
  new LoteModel(
    "L1",
    "A1",
    "Lote Norte",
    "Managua",
    120,
    new Date("2023-01-01"),
    LoteStatus.ACTIVO,
    "Lote principal de producción"
  ),
  new LoteModel(
    "L2",
    "B1",
    "Lote Sur",
    "Masaya",
    80,
    new Date("2023-02-15"),
    LoteStatus.ACTIVO
  ),
];