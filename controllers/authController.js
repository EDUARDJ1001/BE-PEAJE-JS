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
             SET LoginTime = ?, Token = ?, ExpirationToken = ?, isLoggedIn = true ${user.Cargo_Id === 3 ? ', SelectedVia = NULL' : ''}
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

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const db = await connectDB();

        const username = decoded.username;

        const [rows] = await db.execute(
            `SELECT Cargo_Id FROM Empleados 
             WHERE Username = ?`,
            [username]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        const user = rows[0];

        if (user.Cargo_Id !== 3) {
            return res.status(400).json({ message: 'Este usuario no necesita seleccionar una vía.' });
        }

        await db.execute(
            `UPDATE Empleados 
             SET SelectedVia = ? 
             WHERE Username = ?`,
            [selectedVia, username]
        );

        return res.json({
            message: 'Vía seleccionada actualizada.',
        });
    } catch (error) {
        console.error('Error al actualizar la vía:', error);
        return res.status(500).json({ message: 'Error en el servidor.' });
    }
};

export const logoutVia1 = async (req, res) => {
    try {
        const db = await connectDB();

        const [rows] = await db.execute(
            'SELECT * FROM Empleados WHERE IsLoggedIn = 1 AND SelectedVia = 1 LIMIT 1'
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: 'No hay usuarios en la vía 1.' });
        }

        const user = rows[0];

        await db.execute(
            'UPDATE Empleados SET IsLoggedIn = NULL, SelectedVia = NULL WHERE Id = ?',
            [user.Id]
        );

        return res.status(200).json({ message: 'Usuario actualizado correctamente.' });
    } catch (error) {
        console.error('Error al cerrar sesión en vía 1:', error);
        return res.status(500).json({ message: 'Error en el servidor.' });
    }
};

export const logoutVia2 = async (req, res) => {
    try {
        const db = await connectDB();

        const [rows] = await db.execute(
            'SELECT * FROM Empleados WHERE IsLoggedIn = 1 AND SelectedVia = 2 LIMIT 1'
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: 'No hay usuarios en la vía 2.' });
        }

        const user = rows[0];

        await db.execute(
            'UPDATE Empleados SET IsLoggedIn = NULL, SelectedVia = NULL WHERE Id = ?',
            [user.Id]
        );

        return res.status(200).json({ message: 'Usuario actualizado correctamente.' });
    } catch (error) {
        console.error('Error al cerrar sesión en vía 2:', error);
        return res.status(500).json({ message: 'Error en el servidor.' });
    }
};

export const logoutVia3 = async (req, res) => {
    try {
        const db = await connectDB();

        const [rows] = await db.execute(
            'SELECT * FROM Empleados WHERE IsLoggedIn = 1 AND SelectedVia = 3 LIMIT 1'
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: 'No hay usuarios en la vía 3.' });
        }

        const user = rows[0];

        await db.execute(
            'UPDATE Empleados SET IsLoggedIn = NULL, SelectedVia = NULL WHERE Id = ?',
            [user.Id]
        );

        return res.status(200).json({ message: 'Usuario actualizado correctamente.' });
    } catch (error) {
        console.error('Error al cerrar sesión en vía 3:', error);
        return res.status(500).json({ message: 'Error en el servidor.' });
    }
};

export const logoutVia4 = async (req, res) => {
    try {
        const db = await connectDB();

        const [rows] = await db.execute(
            'SELECT * FROM Empleados WHERE IsLoggedIn = 1 AND SelectedVia = 4 LIMIT 1'
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: 'No hay usuarios en la vía 4.' });
        }

        const user = rows[0];

        await db.execute(
            'UPDATE Empleados SET IsLoggedIn = NULL, SelectedVia = NULL WHERE Id = ?',
            [user.Id]
        );

        return res.status(200).json({ message: 'Usuario actualizado correctamente.' });
    } catch (error) {
        console.error('Error al cerrar sesión en vía 4:', error);
        return res.status(500).json({ message: 'Error en el servidor.' });
    }
};

