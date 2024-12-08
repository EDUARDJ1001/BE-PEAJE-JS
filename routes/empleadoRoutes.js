import express from 'express';
import { obtenerEmpleados, registrarEmpleadoController, obtenerOpcionesParaEmpleado } from '../controllers/empleadoController.js';

const router = express.Router();

router.get('/', obtenerEmpleados);
router.post("/", registrarEmpleadoController);
router.get("/opciones", obtenerOpcionesParaEmpleado);

export default router;
