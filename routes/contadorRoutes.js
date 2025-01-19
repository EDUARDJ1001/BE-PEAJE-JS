import express from "express";
import crearModeloContador from "../models/contadorModel.js";
import crearControladorContador from "../controllers/contadorController.js";


const crearRutasContador = (nombreTabla) => {
  const modelo = crearModeloContador(nombreTabla);
  const controlador = crearControladorContador(modelo);

  const router = express.Router();

  router.post("/insert", controlador.insertarNuevoId);
  router.get("/ultimo-id", controlador.obtenerUltimoId);

  return router;
};

export default crearRutasContador;
