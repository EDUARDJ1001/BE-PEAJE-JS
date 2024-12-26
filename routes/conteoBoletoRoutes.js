import express from "express";
import { obtenerConteoBoletos, actualizarConteoBoletos, limpiarConteoBoletos } from "../controllers/conteoBoletoController.js";

const router = express.Router();

router.get("/", obtenerConteoBoletos);
router.post("/", actualizarConteoBoletos);
router.post('/limpiar-conteo-boletos', limpiarConteoBoletos);

export default router;
