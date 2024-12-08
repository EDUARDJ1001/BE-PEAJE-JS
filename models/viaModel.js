import connectDB from "../config/db.js";

export const obtenerVias = async () => {
    try {
        const connection = await connectDB();
        const query = 'SELECT * FROM Vias';
        const [rows] = await connection.query(query);
        return rows;
    } catch (err) {
        console.error('Error al obtener vias:', err);
        throw err;
    }
};
