import express from 'express';
import { obtenerEstado } from '../controllers/estadoController.js';

const router = express.Router();

router.get('/', obtenerEstado);

export default router;
