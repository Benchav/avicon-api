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

router.get("/", loteController.getLotes);
router.get("/:id", loteController.getLoteById);
router.post("/", loteController.addLote);
router.put("/:id", loteController.updateLote);
router.delete("/:id", loteController.deleteLote);

export default router;