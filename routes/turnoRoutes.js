import express from 'express';
import { obtenerTurnos } from '../controllers/turnoController.js';

const router = express.Router();

router.get('/', obtenerTurnos);

export default router;
