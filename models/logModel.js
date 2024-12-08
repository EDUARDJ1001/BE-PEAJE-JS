import connectDB from "../config/db.js";

export const obtenerLogs = async () => {
    try {
        const connection = await connectDB();
        const query = 'SELECT * FROM Logs_Usuarios';
        const [rows] = await connection.query(query);
        return rows;
    } catch (err) {
        console.error('Error al obtener logs de usuarios:', err);
        throw err;
    }
};
