import express from 'express';
import { obtenerEstado } from '../controllers/estadoController.js';

import { seleccionarVia } from '../controllers/estadoController.js';

const router = express.Router();

router.get('/', obtenerEstado);
router.post('/seleccionar-via', seleccionarVia);

export default router;
