import client from "../models/redisClient";

export const getUserData = async (req, res) => {
    try {
        const userData = await client.get('user');
        if (userData) {
            res.json(JSON.parse(userData));
        } else {
            res.status(404).json({ message: 'Datos de usuario no encontrados'});
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al recuperar datos de usuario', error });
    }
};

export const setUserData = async (req, res) => {
    const userData = req.body;
    try {
        await client.set('user', JSON.stringify(userData));
        res.json({ message: 'Datos de usuario almacenados' });
    } catch (error) {
        res.status(500).json({ message: 'Error al almacenar datos de usuario', error });
    }
};