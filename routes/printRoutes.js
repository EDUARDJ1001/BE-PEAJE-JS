import express from 'express';
import { printBoleto } from '../controllers/printController';

const router = express.Router();

router.post('/', printBoleto);

export default router;
