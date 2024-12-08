import express from 'express';
import { obtenerReportesVentas } from '../controllers/reporteVentasController.js';

const router = express.Router();

router.get('/', obtenerReportesVentas);

export default router;
