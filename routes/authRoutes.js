import express from 'express';
import { login, logoutVia1, logoutVia2, logoutVia3, logoutVia4, updateSelectedVia } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', login);
router.post('/updateSelectedVia', updateSelectedVia);
router.post('/logoutVia1', logoutVia1);
router.post('/logoutVia2', logoutVia2);
router.post('/logoutVia3', logoutVia3);
router.post('/logoutVia4', logoutVia4);

export default router;
