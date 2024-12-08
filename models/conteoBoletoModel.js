import connectDB from "../config/db.js";

export const obtenerConteoBoletos = async () => {
    try {
        const connection = await connectDB();
        const query = 'SELECT * FROM Conteo_Boletos';
        const [rows] = await connection.query(query);
        return rows;
    } catch (err) {
        console.error('Error al obtener conteo de boletos:', err);
        throw err;
    }
};
