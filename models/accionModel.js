import connectDB from "../config/db.js";

export const obtenerAcciones = async () => {
    try {
        const connection = await connectDB();
        const query = 'SELECT * FROM Acciones';
        const [rows] = await connection.query(query);
        return rows;
    } catch (err) {
        console.error('Error al obtener acciones:', err);
        throw err;
    }
};
