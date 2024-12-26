import express from "express";
import {
    getAllTickets
} from "../controllers/ticketController.js";

const router = express.Router();

router.get("/", getAllTickets);

export default router;
