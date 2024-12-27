import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

let pool;

const connectDB = async () => {
    if (!pool) {
        try {
            pool = mysql.createPool({
                host: process.env.MYSQL_ADDON_HOST,
                user: process.env.MYSQL_ADDON_USER,
                password: process.env.MYSQL_ADDON_PASSWORD,
                database: process.env.MYSQL_ADDON_DB,
                port: process.env.MYSQL_ADDON_PORT,
                waitForConnections: true,
                connectionLimit: 10,
                queueLimit: 0
            });
            console.log('Conexión exitosa al pool de base de datos.');
        } catch (err) {
            console.error('Error al conectar al pool de base de datos:', err);
            throw err;
        }
    }
    return pool;
};

export default connectDB;
