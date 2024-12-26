import express from 'express';
import { obtenerEmpleados, registrarEmpleadoController, obtenerOpcionesParaEmpleado, actualizarEmpleadoController, eliminarEmpleadoController, obtenerEmpleadoPorIdController } from '../controllers/empleadoController.js';

const router = express.Router();

router.get('/', obtenerEmpleados);
router.get("/opciones", obtenerOpcionesParaEmpleado);
router.get("/:id", obtenerEmpleadoPorIdController);
router.post("/", registrarEmpleadoController);
router.put("/:id", actualizarEmpleadoController);
router.delete("/:id", eliminarEmpleadoController);

export default router;
