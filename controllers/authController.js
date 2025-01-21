import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import connectDB from '../config/db.js';
import redisClient from '../models/redisClient.js';

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

        await redisClient.set(`user:${user.Id}:token`, token, { EX: 3600 }); 

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

export const storeToken = async (req, res) => {
    const { token } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;
        
        await redisClient.set(`userToken:${userId}`, token, {
            EX: 3600,
        });

        res.status(200).json({ message: 'Token almacenado correctamente.' });
    } catch (error) {
        console.error('Error al almacenar el token en Redis:', error);
        res.status(500).json({ message: 'Error al almacenar el token.' });
    }
};

export const updateSelectedVia = async (req, res) => {
    const { selectedVia } = req.body;
    const token = req.headers.authorization.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const redisToken = await redisClient.get(`user:${decoded.id}:token`);
        if (!redisToken || redisToken !== token) {
            return res.status(401).json({ message: 'Token no válido o expirado.' });
        }

        const newToken = jwt.sign(
            { ...decoded, selectedVia },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        await redisClient.set(`user:${decoded.id}:token`, newToken, { EX: 3600 });

        return res.json({
            message: 'Vía seleccionada actualizada.',
            token: newToken,
        });
    } catch (error) {
        console.error('Error al actualizar la vía:', error);
        return res.status(500).json({ message: 'Error en el servidor.' });
    }
};
