import express from 'express';
import { obtenerAcciones } from '../controllers/accionController.js';

const router = express.Router();

router.get('/', obtenerAcciones);

export default router;
