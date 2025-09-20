import express from "express";
import AlertController from "../controllers/alert.controller";
import { container } from "tsyringe";

const router = express.Router();
const alertController = container.resolve(AlertController);

/**
 * @swagger
 * components:
 *   schemas:
 *     Alert:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - message
 *         - level
 *         - isResolved
 *         - createdAt
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *         message:
 *           type: string
 *         loteId:
 *           type: string
 *         chickenId:
 *           type: string
 *         level:
 *           type: string
 *           enum: [info, warning, critical]
 *         isResolved:
 *           type: boolean
 *         createdAt:
 *           type: string
 *           format: date-time
 *         resolvedAt:
 *           type: string
 *           format: date-time
 *
 *     AlertDTO:
 *       type: object
 *       required:
 *         - title
 *         - message
 *         - level
 *       properties:
 *         title:
 *           type: string
 *         message:
 *           type: string
 *         loteId:
 *           type: string
 *         chickenId:
 *           type: string
 *         level:
 *           type: string
 *           enum: [info, warning, critical]
 *         isResolved:
 *           type: boolean
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
 *  - name: Alerts
 *    description: API para gestión de alertas
 */

/**
 * @swagger
 * /alerts:
 *   get:
 *     summary: Obtener todas las alertas
 *     tags: [Alerts]
 *     responses:
 *       200:
 *         description: Lista de alertas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Alert'
 *   post:
 *     summary: Crear una alerta
 *     tags: [Alerts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AlertDTO'
 *     responses:
 *       201:
 *         description: Alerta creada exitosamente
 *
 * /alerts/{id}:
 *   get:
 *     summary: Obtener alerta por ID
 *     tags: [Alerts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Alerta encontrada
 *       404:
 *         description: No encontrada
 *   put:
 *     summary: Actualizar una alerta por ID
 *     tags: [Alerts]
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
 *             $ref: '#/components/schemas/AlertDTO'
 *     responses:
 *       200:
 *         description: Actualizada
 *       404:
 *         description: No encontrada
 *   delete:
 *     summary: Eliminar una alerta por ID
 *     tags: [Alerts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Eliminada
 *       404:
 *         description: No encontrada
 */

router.get("/", alertController.getAll);
router.get("/:id", alertController.getById);
router.post("/", alertController.addAlert);
router.put("/:id", alertController.updateAlert);
router.delete("/:id", alertController.deleteAlert);

export default router;