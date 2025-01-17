import express from "express";
import { getUserData, setUserData } from "../controllers/userController";

const router = express.Router();

router.get('/user-data', getUserData);
router.post('/user-data', setUserData);

export default router;