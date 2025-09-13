import express from "express";
import SaludController from "../controllers/salud.controller";

const router = express.Router();
const saludController = new SaludController();

/**
 * @swagger
 * components:
 *   schemas:
 *     Salud:
 *       type: object
 *       required:
 *         - id
 *         - loteId
 *         - disease
 *         - treatment
 *         - status
 *         - createdAt
 *       properties:
 *         id:
 *           type: string
 *         loteId:
 *           type: string
 *         disease:
 *           type: string
 *         treatment:
 *           type: string
 *         status:
 *           type: string
 *           enum: [sano, enfermo, recuperacion]
 *         createdAt:
 *           type: string
 *           format: date-time
 *         observations:
 *           type: string
 *
 *     SaludDTO:
 *       type: object
 *       required:
 *         - loteId
 *         - disease
 *         - treatment
 *         - status
 *       properties:
 *         loteId:
 *           type: string
 *         disease:
 *           type: string
 *         treatment:
 *           type: string
 *         status:
 *           type: string
 *           enum: [sano, enfermo, recuperacion]
 *         createdAt:
 *           type: string
 *           format: date-time
 *         observations:
 *           type: string
 */

/**
 * @swagger
 * tags:
 *   - name: Salud
 *     description: API para gestión de registros de salud
 */

/**
 * @swagger
 * /salud:
 *   get:
 *     summary: Obtener todos los registros de salud
 *     tags: [Salud]
 *     responses:
 *       200:
 *         description: Lista de registros de salud
 *   post:
 *     summary: Crear un nuevo registro de salud
 *     tags: [Salud]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SaludDTO'
 *     responses:
 *       201:
 *         description: Registro creado
 *
 * /salud/{id}:
 *   get:
 *     summary: Obtener un registro de salud por ID
 *     tags: [Salud]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del registro de salud
 *     responses:
 *       200:
 *         description: Registro encontrado
 *       404:
 *         description: No encontrado
 *   put:
 *     summary: Actualizar un registro de salud por ID
 *     tags: [Salud]
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
 *             $ref: '#/components/schemas/SaludDTO'
 *     responses:
 *       200:
 *         description: Registro actualizado
 *       404:
 *         description: No encontrado
 *   delete:
 *     summary: Eliminar un registro de salud por ID
 *     tags: [Salud]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Registro eliminado
 *       404:
 *         description: No encontrado
 */

router.get("/", saludController.getAll);
router.get("/:id", saludController.getById);
router.post("/", saludController.create);
router.put("/:id", saludController.update);
router.delete("/:id", saludController.delete);

export default router;