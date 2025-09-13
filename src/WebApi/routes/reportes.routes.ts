import express from "express";
import ReportController from "../controllers/report.controller";

const router = express.Router();
const reportController = new ReportController();

/**
 * @swagger
 * components:
 *   schemas:
 *     Report:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - description
 *         - type
 *         - status
 *         - createdAt
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         type:
 *           type: string
 *           enum: [produccion, salud, operacional]
 *         status:
 *           type: string
 *           enum: [pendiente, en_proceso, completado]
 *         loteId:
 *           type: string
 *         createdBy:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         resolvedAt:
 *           type: string
 *           format: date-time
 *
 *     ReportDTO:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - type
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         type:
 *           type: string
 *           enum: [produccion, salud, operacional]
 *         status:
 *           type: string
 *           enum: [pendiente, en_proceso, completado]
 *         loteId:
 *           type: string
 *         createdBy:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         resolvedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * tags:
 *  - name: Reportes
 *    description: API para gestión de reportes
 */

/**
 * @swagger
 * /reportes:
 *   get:
 *     summary: Obtener todos los reportes
 *     tags: [Reportes]
 *     responses:
 *       200:
 *         description: Lista de reportes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Report'
 *   post:
 *     summary: Crear un nuevo reporte
 *     tags: [Reportes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReportDTO'
 *     responses:
 *       201:
 *         description: Reporte creado correctamente
 *
 * /reportes/{id}:
 *   get:
 *     summary: Obtener un reporte por ID
 *     tags: [Reportes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del reporte
 *     responses:
 *       200:
 *         description: Reporte encontrado
 *       404:
 *         description: Reporte no encontrado
 *   put:
 *     summary: Actualizar un reporte existente
 *     tags: [Reportes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReportDTO'
 *     responses:
 *       200:
 *         description: Reporte actualizado correctamente
 *       404:
 *         description: Reporte no encontrado
 *   delete:
 *     summary: Eliminar un reporte por ID
 *     tags: [Reportes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Reporte eliminado correctamente
 *       404:
 *         description: Reporte no encontrado
 */

router.get("/", reportController.getAll);
router.get("/:id", reportController.getById);
router.post("/", reportController.addReport);
router.put("/:id", reportController.updateReport);
router.delete("/:id", reportController.deleteReport);

export default router;