import express from 'express';
import { printBoleto } from '../controllers/printController.js';

const router = express.Router();

router.post('/', printBoleto);

export default router;
