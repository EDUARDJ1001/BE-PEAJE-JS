import { obtenerLogs as obtenerLogsModel } from "../models/logModel.js";

export const obtenerLogs = async (req, res) => {
    try {
        const logs = await obtenerLogsModel();
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener logs de usuarios', error});
    }
}
