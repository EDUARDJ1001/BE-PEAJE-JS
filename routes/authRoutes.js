import express from 'express';
import { login, updateSelectedVia } from './authController.js';

const router = express.Router();

router.post('/login', login);
router.post('/updateSelectedVia', updateSelectedVia);

export default router;
