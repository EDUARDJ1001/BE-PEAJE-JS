import { obtenerReportesVentas as obtenerReportesVentasModel } from "../models/reporteVentasModel.js";

export const obtenerReportesVentas = async (req, res) => {
    try {
        const reporte_Ventas = await obtenerReportesVentasModel();
        res.status(200).json(reporte_Ventas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener reportes de ventas', error});
    }
}