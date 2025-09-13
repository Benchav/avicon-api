import BaseModel from "./base.model";

export enum HealthStatus {
  SANO = "sano",
  ENFERMO = "enfermo",
  RECUPERACION = "recuperacion",
}

export default class SaludModel extends BaseModel {
  loteId: string; 
  disease: string;
  treatment: string;
  observations?: string | undefined; ;
  status: HealthStatus;
  createdAt: Date;

  constructor(
    id: string,
    loteId: string,
    disease: string,
    treatment: string,
    status: HealthStatus,
    createdAt: Date,
    observations?: string
  ) {
    super(id);
    this.loteId = loteId;
    this.disease = disease;
    this.treatment = treatment;
    this.status = status;
    this.createdAt = createdAt;
    this.observations = observations;
  }
}