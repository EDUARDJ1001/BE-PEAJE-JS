import express from 'express';
import { generarUserToken, obtenerUserToken, obtenerUserPorVia } from '../controllers/userController';

const router = express.Router();

router.get('/', obtenerUserToken);
router.get('/user/selectedvia/:selectedVia', obtenerUserPorVia); 
router.post('/token', generarUserToken);

export default router;
