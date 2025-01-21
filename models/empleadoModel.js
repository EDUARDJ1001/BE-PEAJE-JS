import connectDB from "../config/db.js";
import bcrypt from 'bcryptjs';

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

export const actualizarEmpleado = async (req, res) => {
    const empleadoId = req.params.id;
    const { Nombre, Apellido, Identidad, Cargo_Id, Genero_Id, Username, Password } = req.body;

    try {
        const connection = await connectDB();

        const campos = [];
        const valores = [];

        if (Nombre) {
            campos.push("Nombre = ?");
            valores.push(Nombre);
        }

        if (Apellido) {
            campos.push("Apellido = ?");
            valores.push(Apellido);
        }

        if (Identidad) {
            campos.push("Identidad = ?");
            valores.push(Identidad);
        }

        if (Cargo_Id) {
            campos.push("Cargo_Id = ?");
            valores.push(Cargo_Id);
        }

        if (Genero_Id) {
            campos.push("Genero_Id = ?");
            valores.push(Genero_Id);
        }

        if (Username) {
            campos.push("Username = ?");
            valores.push(Username);
        }

        if (Password) {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(Password, saltRounds);
            campos.push("Password = ?");
            valores.push(hashedPassword);
        }

        if (campos.length === 0) {
            return res.status(400).json({ message: "No se proporcionaron datos para actualizar." });
        }

        valores.push(empleadoId);

        const query = `UPDATE Empleados SET ${campos.join(", ")} WHERE Id = ?`;

        connection.query(query, valores, (err, result) => {
            if (err) {
                console.error("Error al actualizar empleado:", err);
                return res.status(500).json({ message: "Error al actualizar empleado", error: err });
            }

            if (result.affectedRows > 0) {
                return res.status(200).json({ message: "Empleado actualizado con éxito" });
            } else {
                return res.status(404).json({ message: "Empleado no encontrado o no hubo cambios" });
            }
        });
    } catch (err) {
        console.error("Error al actualizar empleado:", err);
        return res.status(500).json({ message: "Error al actualizar empleado", error: err });
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
