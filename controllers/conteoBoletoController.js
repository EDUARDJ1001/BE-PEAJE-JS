import { obtenerConteoBoletos as obtenerConteoBoletosModel } from "../models/conteoBoletoModel.js";

export const obtenerConteoBoletos = async (req, res) => {
    try {
        const conteo_Billetes = await obtenerConteoBoletosModel();
        res.status(200).json(conteo_Billetes);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener conteo de boletos', error});
    }
}
