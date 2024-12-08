import connectDB from "../config/db.js";

export const obtenerReportesVentas = async () => {
    try {
        const connection = await connectDB();
        const query = 'SELECT * FROM Reportes_Ventas';
        const [rows] = await connection.query(query);
        return rows;
    } catch (err) {
        console.error('Error al obtener reportes de ventas:', err);
        throw err;
    }
};
