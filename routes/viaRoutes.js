import express from 'express';
import { obtenerVias } from '../controllers/viaController.js';

const router = express.Router();

router.get('/', obtenerVias);

export default router;
