import { RequestHandler } from "express";
import ReportService from "../../Domain.Endpoint/services/report.service";
import { ReportDTO } from "../../Domain.Endpoint/dtos/report.dto";

type IdParam = { id: string };

export default class ReportController {
  private service: ReportService;

  constructor() {
    this.service = new ReportService();
  }

  getAll: RequestHandler = async (req, res) => {
    try {
      const items = await this.service.getReports();
      res.status(200).json({ success: true, data: items });
    } catch (err) {
      console.error("getAll reports error:", err);
      res.status(500).json({ success: false, message: "Failed to get reports" });
    }
  };

  getById: RequestHandler<IdParam> = async (req, res) => {
    try {
      const item = await this.service.getById(req.params.id);
      if (!item) return res.status(404).json({ success: false, message: "Report not found" });
      res.status(200).json({ success: true, data: item });
    } catch (err) {
      console.error("getById report error:", err);
      res.status(500).json({ success: false, message: "Failed to get report" });
    }
  };

  addReport: RequestHandler = async (req, res) => {
    try {
      const dto = req.body as ReportDTO;
      if (!dto.title || !dto.description || !dto.type) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
      }
      const result = await this.service.addReport(dto);
      if (result.success) return res.status(201).json({ success: true, data: result.data, message: result.message });
      return res.status(400).json({ success: false, message: result.message });
    } catch (err) {
      console.error("addReport error:", err);
      res.status(500).json({ success: false, message: "Failed to create report" });
    }
  };

  updateReport: RequestHandler<IdParam> = async (req, res) => {
    const dto = req.body as Partial<ReportDTO>;
    if (Object.keys(dto).length === 0) {
      return res.status(400).json({ success: false, message: "No fields provided for update" });
    }
    try {
      const result = await this.service.updateReport(req.params.id, dto);
      if (result.success) return res.status(200).json({ success: true, data: result.data, message: result.message });
      return res.status(404).json({ success: false, message: result.message });
    } catch (err) {
      console.error("updateReport error:", err);
      res.status(500).json({ success: false, message: "Failed to update report" });
    }
  };

  deleteReport: RequestHandler<IdParam> = async (req, res) => {
    try {
      const result = await this.service.deleteReport(req.params.id);
      if (result.success) return res.status(200).json({ success: true, message: result.message });
      return res.status(404).json({ success: false, message: result.message });
    } catch (err) {
      console.error("deleteReport error:", err);
      res.status(500).json({ success: false, message: "Failed to delete report" });
    }
  };
}