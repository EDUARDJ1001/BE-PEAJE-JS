import connectDB from "../config/db.js";

export const obtenerEmpleados = async () => {
    try {
        const connection = await connectDB();
        const query = 'SELECT * FROM Empleados';
        const [rows] = await connection.query(query);
        return rows;
    } catch (err) {
        console.error('Error al obtener empleados:', err);
        throw err;
    }
};

export const registrarEmpleado = async (nombre, apellido, identidad, cargoId, generoId) => {
    try {
        const connection = await connectDB();
        const query = `
            INSERT INTO Empleados (Nombre, Apellido, Identidad, Cargo_Id, Genero_Id)
            VALUES (?, ?, ?, ?, ?)
        `;
        const [result] = await connection.query(query, [nombre, apellido, identidad, cargoId, generoId]);
        return result.insertId; 
    } catch (err) {
        console.error('Error al registrar empleado:', err);
        throw err;
    }
};

