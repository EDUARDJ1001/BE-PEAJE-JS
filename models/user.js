import client from './redisClient.js';

export const getUserDataFromSession = async (userId) => {
    try {
        const userData = await client.get(userId);
        if (!userData) {
            throw new Error('Usuario no encontrado');
        }

        return JSON.parse(userData);
    } catch (error) {
        throw new Error(`Error al obtener los datos del usuario: ${error.message}`);
    }
};
