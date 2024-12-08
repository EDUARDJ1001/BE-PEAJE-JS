import { obtenerConteoBilletes as obtenerConteoBilletesModel } from "../models/conteoBilleteModel.js";

export const obtenerConteoBilletes = async (req, res) => {
    try {
        const conteo_Billetes = await obtenerConteoBilletesModel();
        res.status(200).json(conteo_Billetes);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener conteo de billetes', error});
    }
}
