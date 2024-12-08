import connectDB from "../config/db.js";

export const obtenerEstado = async () => {
    try {
        const connection = await connectDB();
        const query = 'SELECT * FROM Estado_Via';
        const [rows] = await connection.query(query);
        return rows;
    } catch (err) {
        console.error('Error al obtener estados de las vias:', err);
        throw err;
    }
};
