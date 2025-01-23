import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import connectDB from '../config/db.js';

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
        switch (user.Cargo_Id) {
            case 1:
            case 2:
                dashboardRoute = '/pages/admin/dashboardAdmin';
                break;
            case 3:
                dashboardRoute = '/pages/empleado/select';
                break;
            default:
                return res.status(403).json({ message: 'Rol no autorizado.' });
        }

        const loginTime = new Date();
        const expirationTime = new Date(Date.now() + 3600 * 1000);

        await db.execute(
            `UPDATE Empleados 
             SET LoginTime = ?, Token = ?, ExpirationToken = ?, isLoggedIn = true 
             WHERE Username = ?`,
            [loginTime, token, expirationTime, username]
        );

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
            loginTime: loginTime.toISOString(),
        });
    } catch (error) {
        console.error('Error en el login:', error);
        return res.status(500).json({ message: 'Error en el servidor.' });
    }
};

export const updateSelectedVia = async (req, res) => {
    const { selectedVia } = req.body;

    if (!selectedVia) {
        return res.status(400).json({ message: 'La vía seleccionada es requerida.' });
    }

    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token no proporcionado o inválido.' });
    }

    const token = authorizationHeader.split(' ')[1];

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        console.error('Error en la verificación del token:', err);
        return res.status(401).json({ message: 'Token inválido o expirado.' });
    }

    const username = decoded.username;

    if (!username) {
        return res.status(400).json({ message: 'El token no contiene un nombre de usuario válido.' });
    }

    try {
        const db = await connectDB();

        if (!db) {
            return res.status(500).json({ message: 'Error al conectar con la base de datos.' });
        }

        const [result] = await db.execute(
            `UPDATE Empleados 
             SET SelectedVia = ? 
             WHERE Username = ?`,
            [selectedVia, username]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

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
        console.error('Error al actualizar la vía:', {
            token,
            decoded,
            selectedVia,
            error: error.message,
        });
        return res.status(500).json({ message: 'Error en el servidor.' });
    }
};

