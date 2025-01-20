import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import connectDB from '../config/db.js';

// Función para manejar el inicio de sesión
export const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Usuario y contraseña son requeridos.' });
    }

    try {
        const db = await connectDB();

        const [rows] = await db.execute(
            'SELECT * FROM Empleados WHERE Username = ?',
            [username]
        );

        if (rows.length === 0) {
            return res.status(401).json({ message: 'Usuario no encontrado.' });
        }

        const user = rows[0];

        const isPasswordValid = await bcrypt.compare(password, user.Password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Contraseña incorrecta.' });
        }

        const token = jwt.sign(
            { id: user.Id, username: user.Username, cargoId: user.Cargo_Id, nombre: user.Nombre, apellido: user.Apellido },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        let dashboardRoute;
        if (user.Cargo_Id === 1 || user.Cargo_Id === 2) {
            dashboardRoute = '/pages/admin/dashboardAdmin';
        } else if (user.Cargo_Id === 3) {
            dashboardRoute = '/pages/empleado/select';
        } else {
            return res.status(403).json({ message: 'Rol no autorizado.' });
        }

        return res.json({
            message: 'Inicio de sesión exitoso.',
            token,
            user: {
                id: user.Id,
                username: user.Username,
                cargoId: user.Cargo_Id,
                nombre: user.Nombre,
                apellido: user.Apellido,
            },
            dashboardRoute,
            loginTime: new Date().toISOString(),
        });
    } catch (error) {
        console.error('Error en el login:', error);
        return res.status(500).json({ message: 'Error en el servidor.' });
    }
};

export const updateSelectedVia = async (req, res) => {
    const { selectedVia } = req.body;
    const token = req.headers.authorization.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const newToken = jwt.sign(
            { ...decoded, selectedVia },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.json({
            message: 'Vía seleccionada actualizada.',
            token: newToken,
        });
    } catch (error) {
        console.error('Error al actualizar la vía:', error);
        return res.status(500).json({ message: 'Error en el servidor.' });
    }
};
