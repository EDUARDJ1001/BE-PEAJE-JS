import express from 'express';
import { obtenerConteoBoletos } from '../controllers/conteoBoletoController.js';

const router = express.Router();

router.get('/', obtenerConteoBoletos);

export default router;
