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
 *  - name: Salud
 *    description: API para gestión de registros de salud
 */

router.get("/", saludController.getAll);
router.get("/:id", saludController.getById);
router.post("/", saludController.create);
router.put("/:id", saludController.update);
router.delete("/:id", saludController.delete);

export default router;