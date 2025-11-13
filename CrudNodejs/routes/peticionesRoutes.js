import { Router } from 'express';
import  PeticionesController  from '../controllers/peticionesController.js'

const router = Router();
const peticionesController = new PeticionesController();

router.post('/', peticionesController.procesarPeticion); 

export default router; 