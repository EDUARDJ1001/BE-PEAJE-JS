import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

let connection;

const connectDB = async () => {
    if (!connection) {
        try {
            connection = await mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                port: process.env.DB_PORT,
            });
            console.log('Conexión exitosa a la base de datos.');
        } catch (err) {
            console.error('Error al conectar a la base de datos:', err);
            throw err;
        }
    }
    return connection;
};

export default connectDB;
