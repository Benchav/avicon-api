import { AlertLevel } from "../models/alert.model";

export interface AlertDTO {
  title: string;
  message: string;
  loteId?: string | undefined;
  chickenId?: string | undefined;
  level: AlertLevel;
  isResolved?: boolean | undefined;
  createdAt?: Date | string | undefined;
  resolvedAt?: Date | string | undefined;
}