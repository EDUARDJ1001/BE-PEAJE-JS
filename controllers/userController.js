import client from "../models/redisClient.js";

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

export const getTokens = async (req, res) => {
    try {
        const keys = await redisClient.keys('user:*:token');
        
        const tokens = {};
        for (const key of keys) {
            const token = await redisClient.get(key);
            tokens[key] = token;
        }

        res.json(tokens);
    } catch (error) {
        console.error('Error al recuperar los tokens:', error);
        res.status(500).json({ message: 'Error al recuperar los tokens', error });
    }
};