import { obtenerTurnos as obtenerTurnosModel } from "../models/turnoModel.js";

export const obtenerTurnos = async (req, res) => {
    try {
        const turnos = await obtenerTurnosModel();
        res.status(200).json(turnos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener turnos', error});
    }
}
