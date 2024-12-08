import connectDB from "../config/db.js";

export const obtenerConteoBilletes = async () => {
    try {
        const connection = await connectDB();
        const query = 'SELECT * FROM Conteo_Billetes';
        const [rows] = await connection.query(query);
        return rows;
    } catch (err) {
        console.error('Error al obtener conteo de billetes:', err);
        throw err;
    }
};
