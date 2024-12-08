import connect from "../config/db.js";

export const obtenerUsuarios = async () => {
    try {
        const connection = await connect();
        const query = `
            SELECT 
                u.Id, 
                u.User, 
                e.Nombre AS NombreEmpleado, 
                e.Apellido AS ApellidoEmpleado 
            FROM 
                Usuarios u
            JOIN 
                Empleados e 
            ON 
                u.Empleado_Id = e.Id
        `;
        const [rows] = await connection.query(query);
        return rows;
    } catch (err) {
        console.error('Error al obtener usuarios:', err);
        throw err;
    }
};
