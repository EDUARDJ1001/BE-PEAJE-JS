import connectDB from "../config/db.js";

export const obtenerTurnos = async () => {
    try {
        const connection = await connectDB();
        const query = 'SELECT * FROM Turnos';
        const [rows] = await connection.query(query);
        return rows;
    } catch (err) {
        console.error('Error al obtener turnos:', err);
        throw err;
    }
};
