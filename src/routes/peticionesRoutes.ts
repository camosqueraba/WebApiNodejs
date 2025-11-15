import { Router } from "express";
import { createTask } from "../controllers/peticionesController.js";

const router = Router();

router.post("/peticiones", createTask);

export default router;