import express from "express";
import { getTokens, getUserData, setUserData } from "../controllers/userController.js";
import authenticateToken from "../middleware/authenticateToken.js";

const router = express.Router();

router.get('/user-data', authenticateToken, getUserData);
router.post('/user-data', authenticateToken, setUserData);
router.get('/tokens', authenticateToken, getTokens);

export default router;