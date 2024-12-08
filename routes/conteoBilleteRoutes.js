import express from 'express';
import { obtenerConteoBilletes } from '../controllers/conteoBilleteController.js';

const router = express.Router();

router.get('/', obtenerConteoBilletes);

export default router;
