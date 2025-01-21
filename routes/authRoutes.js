import express from 'express';
import { login, storeToken, updateSelectedVia } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', login);
router.post('/store-token', storeToken);
router.post('/updateSelectedVia', updateSelectedVia);

export default router;
