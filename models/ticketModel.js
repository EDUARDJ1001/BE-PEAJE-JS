import connectDB from "../config/db.js";

export const obtenerTickets = async () => {
    try {
        const connection = await connectDB();
        const query = 'SELECT * FROM Tickets';
        const [rows] = await connection.query(query);
        return rows;
    } catch (err) {
        console.error('Error al obtener tickets:', err);
        throw err;
    }
};