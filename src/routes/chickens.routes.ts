import express from 'express'
import ChickenController from '../controllers/chicken.controller'

const router = express.Router();
const chickenController = new ChickenController();

/**
 * @swagger
 * components:
 *   schemas:
 *     Chicken:
 *       type: object
 *       required:
 *         - id
 *         - loteId
 *         - race
 *         - birthdate
 *         - currentWeight
 *         - healthStatus
 *         - dateReadyForMeat
 *         - diseaseHistory
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the Chicken.
 *         loteId:
 *           type: string
 *           description: The ID of the lot the chicken belongs to.
 *         name:
 *           type: string
 *           description: The name of the chicken (optional).
 *         race:
 *           type: string
 *           description: The chicken's breed or race.
 *         birthdate:
 *           type: string
 *           format: date
 *           description: The date the chicken was born.
 *         currentWeight:
 *           type: string
 *           description: The chicken's current weight.
 *         healthStatus:
 *           type: string
 *           enum: [sano, enfermo, muerto]
 *           description: The chicken's health status.
 *         dateReadyForMeat:
 *           type: string
 *           format: date-time
 *           description: The date the chicken is ready for meat.
 *         diseaseHistory:
 *           type: string
 *           description: The history of diseases the chicken has had.
 * 
 *     ChickenDTO:
 *       type: object
 *       required:
 *         - loteId
 *         - race
 *         - birthdate
 *         - currentWeight
 *         - healthStatus
 *         - dateReadyForMeat
 *         - diseaseHistory
 *       properties:
 *         loteId:
 *           type: string
 *           description: The ID of the lot the chicken belongs to.
 *         name:
 *           type: string
 *           description: The name of the chicken (optional).
 *         race:
 *           type: string
 *           description: The chicken's breed or race.
 *         birthdate:
 *           type: string
 *           format: date
 *           description: The date the chicken was born.
 *         currentWeight:
 *           type: string
 *           description: The chicken's current weight.
 *         healthStatus:
 *           type: string
 *           enum: [sano, enfermo, muerto]
 *           description: The chicken's health status.
 *         dateReadyForMeat:
 *           type: string
 *           format: date-time
 *           description: The date the chicken is ready for meat.
 *         diseaseHistory:
 *           type: string
 *           description: The history of diseases the chicken has had.
 */

/**
 * @swagger
 * tags:
 *   - name: Chickens
 *     description: The Chickens managing API
 */

/**
 * @swagger
 * /chickens:
 *   get:
 *     summary: Returns a list of all chickens
 *     tags: [Chickens]
 *     responses:
 *       200:
 *         description: The list of chickens
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Chicken'
 *       500:
 *         description: Server error
 */
router.get("/", chickenController.getChickens);

export default router;
