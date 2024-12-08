import { obtenerVias as obtenerViasModel } from "../models/viaModel.js";

export const obtenerVias = async (req, res) => {
    try {
        const vias = await obtenerViasModel();
        res.status(200).json(vias);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener vias', error});
    }
}
