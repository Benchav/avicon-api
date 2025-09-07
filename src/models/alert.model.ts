import BaseModel from "./base.model";

export enum AlertLevel {
  INFO = "info",
  WARNING = "warning",
  CRITICAL = "critical",
}

export default class AlertModel extends BaseModel {
  title: string;
  message: string;
  loteId?: string | undefined;       // opcional: si aplica a un lote
  chickenId?: string | undefined;    // opcional: si aplica a un pollo específico
  level: AlertLevel;
  isResolved: boolean;
  createdAt: Date;
  resolvedAt?: Date | undefined;

  constructor(
    id: string,
    title: string,
    message: string,
    level: AlertLevel,
    isResolved: boolean,
    createdAt: Date,
    loteId?: string,
    chickenId?: string,
    resolvedAt?: Date
  ) {
    super(id);
    this.title = title;
    this.message = message;
    this.loteId = loteId;
    this.chickenId = chickenId;
    this.level = level;
    this.isResolved = isResolved;
    this.createdAt = createdAt;
    this.resolvedAt = resolvedAt;
  }
}