import BaseModel from "./base.model";

export enum ReportType {
  PRODUCCION = "produccion",
  SALUD = "salud",
  OPERACIONAL = "operacional",
}

export enum ReportStatus {
  PENDIENTE = "pendiente",
  EN_PROCESO = "en_proceso",
  COMPLETADO = "completado",
}

export default class ReportModel extends BaseModel {
  title: string;
  description: string;
  type: ReportType;
  status: ReportStatus;
  loteId?: string | undefined;    
  createdBy?: string | undefined; 
  createdAt: Date;
  resolvedAt?: Date | undefined;

  constructor(
    id: string,
    title: string,
    description: string,
    type: ReportType,
    status: ReportStatus,
    createdAt: Date,
    loteId?: string,
    createdBy?: string,
    resolvedAt?: Date
  ) {
    super(id);
    this.title = title;
    this.description = description;
    this.type = type;
    this.status = status;
    this.loteId = loteId;
    this.createdBy = createdBy;
    this.createdAt = createdAt;
    this.resolvedAt = resolvedAt;
  }
}