import express from "express";
import LoteController from "../controllers/lote.controller";

const router = express.Router();
const loteController = new LoteController();

/**
 * @swagger
 * components:
 *   schemas:
 *     Lote:
 *       type: object
 *       required:
 *         - id
 *         - code
 *         - name
 *         - location
 *         - capacity
 *         - createdAt
 *         - status
 *       properties:
 *         id:
 *           type: string
 *         code:
 *           type: string
 *         name:
 *           type: string
 *         location:
 *           type: string
 *         capacity:
 *           type: integer
 *         createdAt:
 *           type: string
 *           format: date-time
 *         status:
 *           type: string
 *           enum: [activo, inactivo]
 *         description:
 *           type: string
 *
 *     LoteDTO:
 *       type: object
 *       required:
 *         - code
 *         - name
 *         - location
 *         - capacity
 *         - status
 *       properties:
 *         code:
 *           type: string
 *         name:
 *           type: string
 *         location:
 *           type: string
 *         capacity:
 *           type: integer
 *         createdAt:
 *           type: string
 *           format: date-time
 *         status:
 *           type: string
 *           enum: [activo, inactivo]
 *         description:
 *           type: string
 */

/**
 * @swagger
 * tags:
 *  - name: Lotes
 *    description: API para gestión de lotes
 */

/**
 * @swagger
 * /lotes:
 *   get:
 *     summary: Obtener todos los lotes
 *     tags: [Lotes]
 *     responses:
 *       200:
 *         description: Lista de lotes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Lote'
 */
router.get("/", loteController.getLotes);

/**
 * @swagger
 * /lotes/{id}:
 *   get:
 *     summary: Obtener un lote por ID
 *     tags: [Lotes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del lote
 *     responses:
 *       200:
 *         description: Lote encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Lote'
 *       404:
 *         description: Lote no encontrado
 */
router.get("/:id", loteController.getLoteById);

/**
 * @swagger
 * /lotes:
 *   post:
 *     summary: Crear un nuevo lote
 *     tags: [Lotes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoteDTO'
 *     responses:
 *       201:
 *         description: Lote creado correctamente
 *       400:
 *         description: Datos inválidos o incompletos
 */
router.post("/", loteController.addLote);

/**
 * @swagger
 * /lotes/{id}:
 *   put:
 *     summary: Actualizar un lote existente
 *     tags: [Lotes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del lote
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoteDTO'
 *     responses:
 *       200:
 *         description: Lote actualizado correctamente
 *       400:
 *         description: No se proporcionaron campos para actualizar
 *       404:
 *         description: Lote no encontrado
 */
router.put("/:id", loteController.updateLote);

/**
 * @swagger
 * /lotes/{id}:
 *   delete:
 *     summary: Eliminar un lote por ID
 *     tags: [Lotes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del lote
 *     responses:
 *       200:
 *         description: Lote eliminado correctamente
 *       404:
 *         description: Lote no encontrado
 */
router.delete("/:id", loteController.deleteLote);

export default router;