import express from "express";
import crearModeloConteoBoletos from "../models/conteoBoletoModel.js";
import crearControladorConteoBoletos from "../controllers/conteoBoletoController.js";

const crearRutasConteoBoletos = (nombreTabla) => {
  const modelo = crearModeloConteoBoletos(nombreTabla);
  const controlador = crearControladorConteoBoletos(modelo);

  const router = express.Router();

  router.get("/", controlador.obtenerConteoBoletos);
  router.get("/ultimo-ticket", controlador.obtenerUltimoTicket);
  router.post("/", controlador.actualizarConteoBoletos);
  router.post("/limpiar-conteo-boletos", controlador.limpiarConteoBoletos);

  return router;
};

export default crearRutasConteoBoletos;
