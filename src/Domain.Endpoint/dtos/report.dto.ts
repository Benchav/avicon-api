import { ReportType, ReportStatus } from "../models/report.model";

export interface ReportDTO {
  title: string;
  description: string;
  type: ReportType;
  status?: ReportStatus | undefined;
  loteId?: string | undefined;
  createdBy?: string | undefined;
  createdAt?: Date | string | undefined;
  resolvedAt?: Date | string | undefined;
}