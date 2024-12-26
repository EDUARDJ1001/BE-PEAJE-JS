import connectDB from "../config/db.js";
import bcrypt from 'bcrypt';

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

export const obtenerEmpleadoPorId = async (id) => {
    try {
        const connection = await connectDB();
        const query = 'SELECT * FROM Empleados WHERE Id = ?';
        const [rows] = await connection.query(query, [id]);
        return rows[0];
    } catch (err) {
        console.error('Error al obtener empleado por ID:', err);
        throw err;
    }
};

export const registrarEmpleado = async (nombre, apellido, identidad, cargoId, generoId, username, password) => {
    try {
        const connection = await connectDB();
        
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const query = `
            INSERT INTO Empleados (Nombre, Apellido, Identidad, Cargo_Id, Genero_Id, Username, Password)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        const [result] = await connection.query(query, [nombre, apellido, identidad, cargoId, generoId, username, hashedPassword]);
        
        return result.insertId;
    } catch (err) {
        console.error('Error al registrar empleado:', err);
        throw err;
    }
};

export const actualizarEmpleado = async (id, datos) => {
    try {
        const connection = await connectDB();
        const campos = [];
        const valores = [];

        if (datos.cargoId) {
            campos.push("Cargo_Id = ?");
            valores.push(datos.cargoId);
        }

        if (datos.password) {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(datos.password, saltRounds);
            campos.push("Password = ?");
            valores.push(hashedPassword);
        }

        if (campos.length === 0) {
            return 0;
        }

        valores.push(id);

        const query = `UPDATE Empleados SET ${campos.join(", ")} WHERE Id = ?`;
        const [result] = await connection.query(query, valores);

        return result.affectedRows;
    } catch (err) {
        console.error("Error al actualizar empleado:", err);
        throw err;
    }
};

export const eliminarEmpleado = async (id) => {
    try {
        const connection = await connectDB();
        const query = 'DELETE FROM Empleados WHERE Id = ?';
        const [result] = await connection.query(query, [id]);
        return result.affectedRows > 0;
    } catch (err) {
        console.error('Error al eliminar empleado:', err);
        throw err;
    }
};
