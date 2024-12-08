import express from 'express';
import { obtenerLogs } from '../controllers/logController.js';

const router = express.Router();

router.get('/', obtenerLogs);

export default router;
