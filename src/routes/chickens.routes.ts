import express from 'express'
import ChickenController from '../controllers/chicken.controller'

const router=express.Router();
const chickenController= new ChickenController();

router.get("/", chickenController.getChickens);

export default router;