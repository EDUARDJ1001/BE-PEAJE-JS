import { obtenerEstado as obtenerEstadoModel } from "../models/estadoModel.js";

export const obtenerEstado = async (req, res) => {
    try {
        const estados = await obtenerEstadoModel();
        res.status(200).json(estados);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener estados de vias', error});
    }
}
