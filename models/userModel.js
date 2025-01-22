import connectDB from "../config/db.js";

export const obtenerUserToken = async () => {
    try {
        const connection = await connectDB();
        const query = 'SELECT * FROM Users';
        const [rows] = await connection.query(query);
        return rows;
    } catch (err) {
        console.error('Error al obtener los tokens de usuarios', err);
        throw err;
    }
};

export const obtenerUserPorVia = async (selectedVia) => {
    try {
        const connection = await connectDB();
        const query = 'SELECT * FROM Users WHERE SelectedVia = ?';
        const [rows] = await connection.query(query, [selectedVia]);
        return rows;
    } catch (err) {
        console.error('Error al obtener usuario por SelectedVia', err);
        throw err;
    }
};

export const generarUserToken = async (username, cargo_id, nombre, apellido, selectedVia, loginTime) => {
    try {
        const connection = await connectDB();
        const query = `
            INSERT INTO Users (Username, Cargo_Id, Nombre, Apellido, SelectedVia, LoginTime)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const [result] = await connection.query(query, [username, cargo_id, nombre, apellido, selectedVia, loginTime]);
        return result;
    } catch (err) {
        console.error('Error al generar token', err);
        throw err;
    }
};
