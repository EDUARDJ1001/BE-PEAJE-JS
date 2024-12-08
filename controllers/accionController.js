import { obtenerAcciones as obtenerAccionesModel } from "../models/accionModel.js";

export const obtenerAcciones = async (req, res) => {
    try {
        const acciones = await obtenerAccionesModel();
        res.status(200).json(acciones);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener acciones', error});
    }
}
