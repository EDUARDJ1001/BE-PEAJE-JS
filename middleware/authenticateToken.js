import jwt from 'jsonwebtoken';
import redisClient from '../models/redisClient.js';

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.sendStatus(401);

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const redisToken = await redisClient.get(`user:${decoded.id}:token`);
        if (!redisToken || redisToken !== token) {
            return res.status(401).json({ message: 'Token no válido o expirado.' });
        }

        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Token no válido.' });
    }
};

export default authenticateToken;
